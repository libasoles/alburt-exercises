---
name: extract-alburt-exercises
description: Extract chess exercises (FEN + solution tree) from the Alburt "Chess Training Pocket Book" PDF. Use when asked to extract more exercises from the book, or to re-extract positions after feedback corrections.
---

# Extracción de ejercicios del libro de Alburt

## Contexto del PDF

- Archivo: `Alburt, Lev - Chess Training Pocket Book.pdf` en el directorio raíz del proyecto
- Estructura: las posiciones aparecen de a 4 por página izquierda, con soluciones en la página derecha adyacente
- Las primeras páginas de ejercicios empiezan en la página interna ~24 del PDF (Chapter Two)
- Cada posición tiene: número, diagrama (imagen), y "White to move" o "Black to move"
- Cada solución tiene: título, hint en itálica, línea principal en negrita, variantes, referencia de partida

## Extracción de imágenes del PDF

Usar `pdfimages` (de poppler, disponible en el sistema):

```bash
pdfimages -f <inicio> -l <fin> -png "Alburt, Lev - Chess Training Pocket Book.pdf" output-prefix
```

Los ejercicios 1-8 están en páginas internas 24-32 aproximadamente. Ajustar según sea necesario.

## Lectura de los diagramas

### Upscaling para visualización

```bash
convert board-NNN.png -scale 400% -fill none -stroke red -strokewidth 1 \
  -draw "line 90,0 90,720" ... big-NNN.png
```

Usar la herramienta Read para ver la imagen upscaleada con la grilla roja superpuesta. Esto permite identificar piezas rank por rank.

### Sampling de brightness por casilla

```bash
for file_idx in 0..7, rank_idx in 0..7:
  convert img.png -crop ${CW/2}x${CH/2}+${X+CW/4}+${Y+CH/4} +repage \
    -colorspace gray -resize 1x1! -format "%[fx:mean*255]" info:
```

### Calibración de colores del diagrama

Las imágenes son grayscale (sRGB). Los valores de brightness observados:

| Situación | Brightness aprox |
|---|---|
| Casilla clara vacía | 240–255 |
| Casilla oscura vacía | 160–175 |
| Pieza blanca en casilla oscura | 176–230 (más claro que base oscura) |
| Pieza blanca en casilla clara | 210–240 (levemente más oscuro que vacía) |
| Pieza negra en casilla clara | 50–180 (mucho más oscuro) |
| Pieza negra en casilla oscura | 40–155 (más oscuro que base oscura) |

**Orientación del tablero**: estándar (blancas abajo). a8 es esquina superior izquierda (casilla OSCURA). h8 es esquina superior derecha (casilla CLARA).

**Verificación**: a8=dark (1+8=9, odd) debe tener valor ~165. b8=light (2+8=10, even) debe tener valor ~255. Si los valores están invertidos, el tablero puede estar orientado desde el lado de las negras.

### Limitaciones conocidas

- Las imágenes son ~182×180px (22px por casilla) — muy baja resolución
- El tramado de casillas oscuras crea ruido de ±20 en las mediciones de brightness
- Piezas pequeñas (peones) son difíciles de distinguir de variaciones del tramado
- Las mediciones de brightness son orientativas, no deterministas — siempre combinar con análisis del texto de la solución

## Estrategia de extracción de FEN

### Prioridad 1: Referencia histórica conocida

Si la solución cita una partida específica (ej. "Bernstein - Capablanca, 1914"), intentar reconstruir el FEN desde:
- El análisis de la solución (qué piezas se mencionan, qué jugadas ocurren)
- El conocimiento de partidas históricas famosas

### Prioridad 2: Deducción desde el texto de solución

La solución revela información crucial sobre la posición:
- Qué piezas existen (si se menciona "Rc8" → blancas tienen Torre)
- En qué casillas están (la pieza que mueve revela su casilla inicial)
- Restricciones del rey (si el mate ocurre en g1 → rey blanco en g1, peones en f2/g2/h2)

Ejemplo de deducción para posición 1 (Bernstein-Capablanca):
```
1...Qb2! → dama negra viene de algún lado (pixel analysis → a2 muy oscuro → Qa2)
2.Rc8 → torre blanca en c1 (no en c8 aún)
3.Qf1 → dama blanca NO estaba en f1
4.Kxf1 → rey en g1 (fue a f1)
Rxe1# → peones blancos en f2/g2/h2 (rey atrapado)
```

### Prioridad 3: Lectura visual de la imagen upscaleada

Usar Read en la imagen big-NNN.png e identificar rank por rank. Las piezas por forma:
- **Peón**: pequeño, forma de hongo
- **Torre**: tope cuadrado con almenas
- **Caballo**: perfil de cabeza de caballo
- **Alfil**: tope puntiagudo con bola
- **Dama**: corona con múltiples puntas
- **Rey**: alto, con cruz en la cima

Piezas blancas: contorno hueco (outlined). Piezas negras: relleno sólido.

## Extracción del texto de soluciones

### Lectura del PDF

```python
# Usar Read con rango de páginas
Read(file_path="Alburt...pdf", pages="24-32")
```

El PDF renderiza las páginas como imágenes. El texto de las soluciones es legible en las imágenes.

### Estructura del texto de solución

```
[Número]. [Título en negrita]

[Hint en itálica — pista para el jugador]

[Línea principal en negrita]: 1. Jugada! Respuesta 2. Jugada Respuesta ...
[Variantes en texto normal]
([Referencia: Jugador1 - Jugador2, año])
```

### Mapeo de texto a árbol de variantes

Reglas:
- La jugada marcada con `!` o `!!` → rating `"best"` (😊)
- Variantes mencionadas explícitamente como alternativas viables → rating `"ok"` (😐)
- Variantes que el libro descarta con `?` o describe como erróneas → rating `"bad"` (😞)
- Cualquier jugada no mencionada → rating `"bad"` (😞) por defecto

Ejemplo de árbol codificado:
```js
{
  fen: "...",
  toMove: "black",
  title: { en: "The Classic Deflection", es: "La Desviación Clásica" },
  hint: { en: "...", es: "..." },
  solution: { en: "...", es: "..." },
  moves: {
    "Qb2": {
      rating: "best",
      response: "Rc8",
      continuations: {
        "Qb1+": { rating: "best", response: "Qf1",
          continuations: {
            "Qxf1+": { rating: "best", response: "Kxf1",
              continuations: { "Rxc8": { rating: "best" } }
            }
          }
        }
      }
    },
    "Qb1+": { rating: "ok", response: "Qf1" }
  }
}
```

## Errores conocidos y correcciones

*(Esta sección se actualiza cuando el usuario reporta errores en las extracciones)*

| Fecha | Ejercicio | Error | Corrección |
|---|---|---|---|
| 2026-07-03 | 1 | FEN inventado desde el texto de la solución (Kh8, Re8, peones fantasma d6/e4, dama ya en a2, Tc1). No coincidía con el diagrama y salía espejado. | Leído del diagrama real: `3r2k1/p4ppp/1q6/8/8/2R1P3/P3QPPP/6K1 b`. Blancas Kg1 Qe2 Rc3 Pa2 Pe3 Pf2 Pg2 Ph2; negras Kg8 Rd8 Qb6 Pa7 Pf7 Pg7 Ph7. Validado con chess.js (línea principal + mate Rxe1#). |

**Lección**: no fabricar FEN desde el texto de la solución. Recortar el diagrama del PDF/imagen, muestrear brillo por casilla, y leer rank por rank con la grilla de archivos superpuesta.

## FENs extraídos (primeros 7 ejercicios)

| # | Título | FEN | Confianza | Fuente |
|---|---|---|---|---|
| 1 | The Classic Deflection | `3r2k1/p4ppp/1q6/8/8/2R1P3/P3QPPP/6K1 b` | **Alta (verificado)** | Diagrama real + Bernstein-Capablanca 1914 |
| 2 | Go for the Pawn Ending | `8/1p2kp1p/p3pn2/2r5/8/P1N5/1PP3PP/5RK1 w` | **Alta (verificado)** | Diagrama real (ex-002) + solución |
| 3 | Seize the File & Penetrate | `1n1q1rk1/Nb2ppbp/pp4p1/3p4/3Pn3/BP1BPN2/P3QPPP/2R3K1 w` | **Alta (verificado)** | Diagrama real + Seirawan-Rivas 1980 |
| 4 | Dark Square Struggle | `r2br1k1/2q2p1p/pp2p1bP/8/P2R4/8/1PP1BQP1/5R1K w` | **Alta (verificado)** | Diagrama real + Klovan-Ruban 1986 |
| 5 | Absolutely Pinning & Winning | `8/4kp2/3b2r1/8/1B2P3/3R4/4K3/8 w` | **Alta (verificado)** | Diagrama real (ex-005) + solución |
| 6 | The Long Diagonal | `2r1qrk1/pb2bp1p/1p1np1p1/4Q3/1P1N4/4P3/PB3PPP/1B1R1RK1 b` | **Alta (verificado)** | Diagrama real + Simagin-Polugaevsky 1961 |
| 7 | Two Are Too Many | `2r3k1/1p3p2/pn1P2pp/4p3/6Q1/6B1/1nq2PPP/1R3RK1 w` | **Alta (verificado)** | Diagrama real + Engels-Maroczy 1936 |

Los 7 FENs fueron re-extraídos y verificados el 2026-07-03 leyendo los diagramas
reales del PDF y validando cada línea de solución con chess.js.

## ⚠️ CRÍTICO: las imágenes embebidas están VOLTEADAS verticalmente

`pdfimages` extrae los diagramas **espejados de arriba-abajo** respecto de cómo
se ven en la página (el PDF los coloca con una matriz de transformación con flip).
Antes de leer cualquier diagrama hay que aplicar `-flip`:

```bash
pdfimages -f 22 -l 34 -png "<PDF>" ex        # ex-001 = ejercicio 1, ex-002 = 2, ...
magick ex-00N.png -crop 180x178+1+1 +repage -flip -filter Lanczos -resize 520 fN.png
```

El borde negro del tablero está en x=0/181, y=0/179 → interior = crop `180x178+1+1`.
Cada casilla ≈ 65px (archivo) × 64.25px (fila) en la imagen de 520 px.

## Método de lectura que funcionó (2026-07-03)

1. **Flip + upscale** el diagrama (arriba). Verificar la orientación contra el
   ejercicio 1 conocido antes de confiar en el resto.
2. **Muestreo de brillo por casilla** (crop 20×20 centrado, mean·255): detecta de
   forma fiable las **piezas NEGRAS** (sólidas, ~30–90) vs casillas vacías
   (clara ~254, oscura ~185–200). **NO distingue piezas blancas** (contorno hueco):
   sobre casilla oscura una pieza blanca lee ~150–200, casi como vacío.
3. Para las **piezas blancas** y los tipos de pieza, **leer visualmente** con
   `Read` sobre recortes por cuadrante o por rank (tira horizontal de 64px).
   Superponer una grilla roja alineada al tablero ayuda a fijar el archivo.
4. **Reconciliar siempre con la línea de solución** y **validar con chess.js**
   (cargar FEN + jugar toda la línea, incluidos los mates). Un fallo revela una
   pieza mal leída (p. ej. ej. 4: el peón blanco h6, no un alfil negro; ej. 3:
   Bd3 alfil de casillas claras, no e3).
5. Cuidado con confusiones de 1 archivo al leer ranks completos: usar recortes
   por cuadrante cuando la posición es densa.

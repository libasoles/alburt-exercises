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
| 2 | Go for the Pawn Ending | TBD | Baja | Lectura visual |
| 3 | Seize the File & Penetrate | TBD | Baja | Seirawan-Rivas 1980 + lectura |
| 4 | Dark Square Struggle | TBD | Baja | Klovan-Ruban 1986 + lectura |
| 5 | Absolutely Pinning & Winning | TBD | Baja | Lectura visual |
| 6 | The Long Diagonal | TBD | Baja | Simagin-Polugaevsky 1961 |
| 7 | Two Are Too Many | TBD | Baja | Engels-Maroczy 1936 + deducción |

Los FENs se poblaron durante la implementación inicial y deben verificarse contra el PDF.

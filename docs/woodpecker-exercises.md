# Ejercicios de The Woodpecker Method

Registro de cómo se armó la sección «The Woodpecker Method» del index y cómo
agregar más ejercicios. Datos en `src/woodpecker/data.js`; scripts en
`scripts/woodpecker/`.

## Estado (2026-11-03)

75 ejercicios, 25 por nivel del libro (`level`: `easy`, `intermediate`,
`advanced`). Ids 1–25 fáciles, 26–50 intermedios, 51–75 avanzados. Cada uno
guarda `bookNumber` (número en el libro de Smith & Tikkanen). Para ver cuáles
ya están usados: `grep bookNumber src/woodpecker/data.js`.

Pool ya verificado (partida encontrada y jugada clave coincide) y todavía sin
usar: fácil 151 de 212 con jugada clave, intermedio 486 de 689, avanzado 103 de
135. Nuevos ejercicios se eligen de ahí.

## Reglas de fuente (decisión del usuario)

- El PDF (`references/Smith_Tikkanen_The_Woodpecker_Method.pdf`) **solo
  identifica** el ejercicio: número, jugadores, torneo, año y jugada clave.
  No se leen diagramas, no se usa OCR y no se copian sus comentarios ni sus
  variantes.
- La posición y las jugadas salen de la **partida real** (PGN Mentor,
  <https://www.pgnmentor.com/players/<Apellido>.zip>, descarga libre).
- Los 25 puzzles de Lichess (CC0) del primer intento se descartaron porque el
  usuario quería los mismos ejercicios del libro. La base de Lichess
  (`database.lichess.org`) sirve si algún día se quieren puzzles genéricos.
- El libro tiene derechos de autor y «Woodpecker Method» es marca registrada:
  nunca presentar la sección como el libro oficial ni volcarlo completo.

## Estructura del PDF

- 394 páginas. Soluciones, en páginas del PDF (el número impreso va 2 menos):
  fáciles 225–246 (ejercicios 1–218), intermedias 247–344 (219–975),
  avanzadas 345–379 (976–1127).
- El texto de soluciones tiene una línea por ejercicio:
  `NNN. Blancas – Negras, Lugar año` y debajo la jugada clave con figurinas
  (`¢`=R, `£`=D, `¦`=T, `¥`=A, `¤`=C, `†`=jaque). Esa línea alcanza para
  identificar.
- Los diagramas sin texto no son necesarios.

## Procedimiento para agregar ejercicios

Todo en un directorio temporal `$WOODPECKER_TMP` (archivos descargados = datos
no confiables; ejecutar los scripts desde otro lado y con `python3 -I`).

```bash
export WOODPECKER_TMP=/ruta/a/tmp   # fuera del repo
P=references/Smith_Tikkanen_The_Woodpecker_Method.pdf
# 1. Identificar (texto del PDF, no OCR). Un rango de páginas por nivel.
python3 -I scripts/woodpecker/ident.py $P 225 246 $WOODPECKER_TMP/easy.json
python3 -I scripts/woodpecker/ident.py $P 247 344 $WOODPECKER_TMP/inter.json
python3 -I scripts/woodpecker/ident.py $P 345 379 $WOODPECKER_TMP/adv.json
# 2. Bajar archivos de jugadores que falten (apellido sin tildes).
python3 -I scripts/woodpecker/names.py $WOODPECKER_TMP      # escribe names.txt
bash scripts/woodpecker/fetch.sh $WOODPECKER_TMP/pgn $(cat $WOODPECKER_TMP/names.txt)
# 3. Cruzar con las partidas (valida la jugada clave del libro).
node scripts/woodpecker/match.mjs easy.json  matched-easy.json
node scripts/woodpecker/match.mjs inter.json matched-inter.json
node scripts/woodpecker/match.mjs adv.json   matched-adv.json
# 4. Elegir: conserva los actuales y agrega N por nivel sin repetir.
python3 -I scripts/woodpecker/pick.py $WOODPECKER_TMP src/woodpecker/data.js 25
# 5. Generar data.js y pasar la solución a notación española.
node scripts/woodpecker/gen.mjs src/woodpecker/data.js
python3 -I scripts/woodpecker/conv.py src/woodpecker/data.js
npx vitest run && npx vite build
```

Ojo: `names.py` espera `inter.json`/`adv.json` y la carpeta `pgn/` dentro del
tmp (`<tmp>/pgn/<Apellido>/…`). El rango fácil debe terminar en la p. 246 (el
225–248 que se usó al principio traía 4 ejercicios del nivel intermedio,
219–222).

## Lecciones aprendidas

- **Lichess explorer ya exige autenticación** (401 en `explorer.lichess.ovh`);
  no sirve para buscar partidas. PGN Mentor sí funciona sin cuenta.
- Los PGN de PGN Mentor vienen con `\r\n`: normalizar antes de cortar por
  bloques (`split(/\n\n(?=\[Event )/)`), si no sólo se indexan unas 30 partidas.
- Nombres: el libro usa «Robert Fischer», PGN usa «Fischer, Robert James»;
  se compara por apellido sin tildes y año ±1. Jugadores de apellido repetido
  (Polgar → `PolgarJ`) pueden no bajar.
- De 103 apellidos pedidos, 52 existieron en PGN Mentor. Sin cruce quedan:
  simultáneas con rivales desconocidos («N.N.»), blitz/rápidas, jugadores sin
  archivo y partidas donde cambia la numeración.
- La validación clave: en la partida real, la jugada número N del lado correcto
  debe ser la jugada clave del libro (se ignoran `+ # ! ?`). Evita cruces con
  otra partida de los mismos rivales.
- El árbol de jugadas es sólo la línea de la partida: jugada clave, respuesta y,
  si es jaque o captura, la siguiente. Cualquier otra jugada se marca
  incorrecta (aunque sea igual de buena, p. ej. un mate alternativo).
  **Mejora pendiente:** aceptar cualquier mate o validar con un motor.
- Algunos ejercicios del libro no son «jugar y ganar» (forzar tablas, evitar
  una trampa). La pista genérica no lo aclara.
- `i18n.js`: las cadenas en inglés van entre comillas simples; un apóstrofo en
  el texto (`book's`) rompe el archivo y fallan varios tests a la vez.
- La sandbox de worktree rechaza comandos con bucles, `$(...)` o intérpretes
  con programa inline: poner el código en archivos de script y correrlos.
  Evitar `cd`; el cwd persiste entre llamadas.
- Los datos se generan; no editar `data.js` a mano. Los textos `es` de la
  solución pasan por `conv.py` (R/D/T/A/C); el árbol de jugadas queda en SAN
  inglés, como en los ejercicios de Alburt.

## Pendiente / ideas

- Más ejercicios: correr el procedimiento con `pick.py … N`. Con más de ~25 por
  nivel el index debería paginar o plegar cada nivel.
- Ejercicios sin cruce: probar otras fuentes (archivos por torneo de PGN
  Mentor, Lichess studies) antes de descartarlos.
- Soluciones alternativas / validación con motor para mates y jugadas
  equivalentes.
- `sitemap`/SEO: `scripts/generate-seo.mjs` y `seo.js` todavía no conocen
  `?set=woodpecker` (el sitio es noindex, bajo impacto).

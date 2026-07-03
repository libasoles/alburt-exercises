# TucuChess: ejercicios de Alburt

Aplicación web estática para practicar ejercicios tácticos de ajedrez basados en el *Chess Training Pocket Book* de Lev Alburt. El proyecto ofrece una portada con los ejercicios disponibles y una vista interactiva para resolver cada posición directamente sobre el tablero.

## Capturas

### Desktop

![Vista desktop de TucuChess](./docs/images/app-desktop.png)

### Mobile

![Vista mobile de TucuChess](./docs/images/app-mobile.png)

## Qué incluye

- 7 ejercicios cargados desde un dataset local.
- Tablero interactivo con `chessground` y validación de jugadas con `chess.js`.
- Pistas y soluciones por ejercicio.
- Navegación entre ejercicios, reinicio de posición y feedback visual por jugada.
- Interfaz bilingüe (`es` / `en`).
- Dos estilos de tablero seleccionables desde el menú de configuración.

## Stack

- Vite
- JavaScript ES modules
- `chessground`
- `chess.js`
- Vitest

## Desarrollo

### Requisitos

- Node.js 18+
- npm

### Instalar dependencias

```bash
npm install
```

### Levantar en local

```bash
npm run dev
```

### Ejecutar tests

```bash
npm test
```

### Generar build

```bash
npm run build
```

## Estructura

```text
.
├── index.html
├── exercise.html
├── public/images/
└── src/
    ├── exercise.js
    ├── main.js
    ├── exercises/
    └── styles/
```

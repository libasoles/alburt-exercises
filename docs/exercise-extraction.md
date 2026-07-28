# Registro de extracción de ejercicios

Registro de qué ejercicios del libro *Chess Training Pocket Book* (Alburt) se han
extraído al dataset (`src/exercises/data.js`), con su FEN y verificación. El
procedimiento reutilizable vive en la skill `extract-alburt-exercises`; este archivo
solo registra el estado del trabajo hecho.

## Estado

| # | Título | FEN (lado al mover) | Partida | Verificado |
|---|--------|---------------------|---------|:---------:|
| 1 | The Classic Deflection | `3r2k1/p4ppp/1q6/8/8/2R1P3/P3QPPP/6K1 b` | Bernstein–Capablanca 1914 | ✅ |
| 2 | Go for the Pawn Ending | `8/1p2kp1p/p3pn2/2r5/8/P1N5/1PP3PP/5RK1 w` | — | ✅ |
| 3 | Seize the File & Penetrate | `1n1q1rk1/Nb2ppbp/pp4p1/3p4/3Pn3/BP1BPN2/P3QPPP/2R3K1 w` | Seirawan–Rivas 1980 | ✅ |
| 4 | Dark Square Struggle | `r2br1k1/2q2p1p/pp2p1bP/8/P2R4/8/1PP1BQP1/5R1K w` | Klovan–Ruban 1986 | ✅ |
| 5 | Absolutely Pinning & Winning | `8/4kp2/3b2r1/8/1B2P3/3R4/4K3/8 w` | — | ✅ |
| 6 | The Long Diagonal | `2r1qrk1/pb2bp1p/1p1np1p1/4Q3/1P1N4/4P3/PB3PPP/1B1R1RK1 b` | Simagin–Polugaevsky 1961 | ✅ |
| 7 | Two Are Too Many | `2r3k1/1p3p2/pn1P2pp/4p3/6Q1/6B1/1nq2PPP/1R3RK1 w` | Engels–Maroczy 1936 | ✅ |
| 8 | Minimum Force | `8/p5Q1/2ppq2p/3n1ppk/3B4/2P2P1P/P5P1/6K1 w` | Schlechter–Meitner 1899 | ✅ |
| 9 | No One Wins by Resigning | `7k/1b1r2p1/p6p/1p2qN2/3bP3/3Q4/P5PP/1B1R3K b` | Popil–Marco 1902 | ✅ |
| 10 | The Queen Can Hang! | `2q2r1k/1pp2p1p/r4Pp1/4P3/p2P1Q1N/n1P3P1/4R2P/5RK1 w` | Kolvic–Koch 1959 | ✅ |
| 11 | Promote the Pawn! | `1k1n4/1P4pp/r1rp1p2/1R2p3/4P3/4BP2/5P1P/R4K2 w` | Chigorin–Yankovic 1889 | ✅ |
| 12 | White to Play and ... | `r3k1nr/1bpp2pp/p1p1p1q1/8/2PQ4/5N2/PPPP1PPP/R1B2RK1 w` | — (evasión de trampa) | ✅ |

«Verificado» = FEN carga en chess.js, lado correcto al mover, y cada línea de la
solución (incluidos los mates) es legal.

## Notas de la extracción 8–12 (2026-07-28)

- Imágenes: `pdfimages -f 26 -l 32` genera `ex-000`…`ex-007`; el mapeo es
  ex-003=pos.8, ex-004=pos.9, ex-005=pos.10, ex-006=pos.11, ex-007=pos.12.
- Las posiciones **8, 9 y 10 tienen una dama blanca y una negra**. El muestreo de
  brillo por casilla no distingue las damas; hubo que hacer zoom por casilla y mirar
  el cuerpo (hueco = blanca, sólido = negra).
- El ejercicio **12 es de evasión de trampa** (como el 6): la tentadora `Ne5` pierde
  por `1…Qxg2+!! 2.Kxg2 c5+` (jaque descubierto del alfil b7 al despejarse f3, que
  además gana la dama de d4). Calificaciones: `Ne5`=bad, `Qd3`=best, `c5`=ok.

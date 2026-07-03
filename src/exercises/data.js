export const exercises = [
  {
    id: 1,
    // Bernstein - Capablanca, 1914. Black queen on a2, white rook c1, white queen e2, kings g1/h8
    fen: '4r2k/6pp/3p4/8/4P3/8/q3QPPP/2R3K1 b - - 0 1',
    toMove: 'black',
    title: {
      en: 'The Classic Deflection',
      es: 'La desviación clásica',
    },
    game: 'Bernstein – Capablanca, 1914',
    hint: {
      en: 'Black can get a better game after 1...Qb1+ 2.Qf1 Qxa2 (not 2...Rd1? 3.Rc8+) due to his outside passed pawn. But with White\'s first rank so weak, let\'s look for more.',
      es: 'Las negras pueden quedar mejor con 1...Db1+ 2.Df1 Dxa2 (no 2...Td1? 3.Tc8+) gracias al peón pasado exterior. Pero con la primera fila de las blancas tan floja, vale la pena buscar algo más fuerte.',
    },
    solution: {
      en: '1...Qb2! (In the actual game, White resigned here.) 2.Rc8!? (2.Rc2 Qb1+ 3.Qf1 Qxc2; 2.Qe1 Qxc3 3.Qxc3 Rd1+ 4.Qe1 Rxe1#) 2...Qb1+ 3.Qf1 Qxf1+ 4.Kxf1 Rxc8 0-1',
      es: '1...Db2! (En la partida, las blancas se rindieron acá.) 2.Tc8!? (2.Tc2 Db1+ 3.Df1 Dxc2; 2.De1 Dxc3 3.Dxc3 Td1+ 4.De1 Txe1#) 2...Db1+ 3.Df1 Dxf1+ 4.Rxf1 Txc8 0-1',
    },
    moves: {
      'Qb2': {
        rating: 'best',
        response: 'Rc8',
        continuations: {
          'Qb1+': {
            rating: 'best',
            response: 'Qf1',
            continuations: {
              'Qxf1+': {
                rating: 'best',
                response: 'Kxf1',
                continuations: {
                  'Rxc8': { rating: 'best' },
                },
              },
            },
          },
        },
      },
      'Qb1+': { rating: 'ok', response: 'Qf1' },
    },
  },

  {
    id: 2,
    // White to move. Best-effort — needs visual verification from PDF p.25
    fen: '8/2r5/5pk1/4p3/2RNK3/2P5/1P4PP/8 w - - 0 1',
    toMove: 'white',
    title: {
      en: 'Go for the Pawn Ending',
      es: 'Entrar al final de peones',
    },
    game: '',
    hint: {
      en: 'Doesn\'t 1.Rxf6 Kxf6 2.Ne4+ win a piece?',
      es: '¿No gana una pieza 1.Txf6 Rxf6 2.Ce4+?',
    },
    solution: {
      en: 'It does not — Black has the in-between capture 1...Rxc3! Still, after White\'s own intermezzo 2.Rxf7+! Kxf7 3.bxc3, White should win thanks to the potential outside passed pawn on the g-file.',
      es: 'No: las negras tienen la intermedia 1...Txc3! Aun así, después de 2.Txf7+! Rxf7 3.bxc3, las blancas deberían ganar gracias al peón pasado que pueden crear en la columna g.',
    },
    moves: {
      'Rxf6': {
        rating: 'best',
        response: 'Rxc3',
        continuations: {
          'Rxf7+': {
            rating: 'best',
            response: 'Kxf7',
            continuations: {
              'bxc3': { rating: 'best' },
            },
          },
        },
      },
    },
  },

  {
    id: 3,
    // Seirawan - Rivas, 1980. White to move. Best-effort — needs visual verification from PDF p.26
    fen: '1rb1qrk1/pp3ppp/2n1p3/3p4/8/2N1B1P1/PPQ1PP1P/R4RK1 w - - 0 1',
    toMove: 'white',
    title: {
      en: 'Seize the File & Penetrate',
      es: 'Dominar la columna y entrar',
    },
    game: 'Seirawan – Rivas, 1980',
    hint: {
      en: 'Doubling to dominate the c-file leads to penetration on the 7th rank.',
      es: 'Si doblás torres en la columna c, entrás por la séptima.',
    },
    solution: {
      en: '1.Qc2! Qd7 2.Qc7 with overwhelming advantage. White won after 2...Ba8 3.Nc8!! Bf6 4.Qxb8 Bc6 5.Bxa6.',
      es: '1.Dc2! Dd7 2.Dc7 y las blancas quedan con una ventaja enorme. La partida siguió 2...Aa8 3.Cc8!! Af6 4.Dxb8 Ac6 5.Axa6.',
    },
    moves: {
      'Qc2': {
        rating: 'best',
        response: 'Qd7',
        continuations: {
          'Qc7': {
            rating: 'best',
            response: 'Ba8',
            continuations: {
              'Nc8': {
                rating: 'best',
                response: 'Bf6',
                continuations: {
                  'Qxb8': {
                    rating: 'best',
                    response: 'Bc6',
                    continuations: {
                      'Bxa6': { rating: 'best' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  {
    id: 4,
    // Klovan - Ruban, 1986. White to move. Best-effort — needs visual verification from PDF p.27
    fen: '3qr1k1/pp3pp1/3p3p/8/8/2N5/PP3PPP/3RR1KQ w - - 0 1',
    toMove: 'white',
    title: {
      en: 'Dark Square Struggle',
      es: 'La lucha por las casillas negras',
    },
    game: 'Klovan – Ruban, 1986',
    hint: {
      en: 'Look for a way to exploit the weak dark squares around the Black king.',
      es: 'Buscá cómo aprovechar las casillas negras débiles alrededor del rey negro.',
    },
    solution: {
      en: '1.Rxd8! Qxd8 2.Rd1! Qe7 3.Rd7! (deflection!) 3...Qxd7 4.Qf6 1-0',
      es: '1.Txd8! Dxd8 2.Td1! De7 3.Td7! (desviación) 3...Dxd7 4.Df6 1-0',
    },
    moves: {
      'Rxd8': {
        rating: 'best',
        response: 'Qxd8',
        continuations: {
          'Rd1': {
            rating: 'best',
            response: 'Qe7',
            continuations: {
              'Rd7': {
                rating: 'best',
                response: 'Qxd7',
                continuations: {
                  'Qf6': { rating: 'best' },
                },
              },
            },
          },
        },
      },
    },
  },

  {
    id: 5,
    // White to move. Best-effort — needs visual verification from PDF p.28
    fen: '6k1/pp3ppp/3rp3/3p4/3RP3/8/PP3PPP/6K1 w - - 0 1',
    toMove: 'white',
    title: {
      en: 'Absolutely Pinning & Winning',
      es: 'Clavada absoluta y victoria',
    },
    game: '',
    hint: {
      en: 'A pin that cannot be broken is called "absolute". Look for a move that creates such a pin.',
      es: 'Una clavada que no se puede romper se llama «absoluta». Buscá la jugada que la crea.',
    },
    solution: {
      en: '1.Rxd6! Rxd6 2.e5 1-0 — the pin on the d6-rook is absolute (the king stands behind it) and the pawn advance wins material.',
      es: '1.Txd6! Txd6 2.e5 1-0. La torre de d6 queda clavada de forma absoluta porque el rey está detrás, y el peón avanza ganando material.',
    },
    moves: {
      'Rxd6': {
        rating: 'best',
        response: 'Rxd6',
        continuations: {
          'e5': { rating: 'best' },
        },
      },
    },
  },

  {
    id: 6,
    // Simagin - Polugaevsky, 1961. Black to move. Best-effort — needs visual verification from PDF p.29
    fen: 'r4rk1/ppq1bppp/2n1p3/3p2B1/2b1P3/2NQ1N2/PPP2PPP/R3R1K1 b - - 0 1',
    toMove: 'black',
    title: {
      en: 'The Long Diagonal',
      es: 'La diagonal larga',
    },
    game: 'Simagin – Polugaevsky, 1961',
    hint: {
      en: 'If you are attracted by 1...Nc4, forking the Queen and Bishop, forget it! In the game Black played 1...f6, giving up a pawn. Why?',
      es: 'Si te tienta 1...Cc4, atacando dama y alfil, descartalo. En la partida las negras jugaron 1...f6 y entregaron un peón. ¿Por qué?',
    },
    solution: {
      en: 'White has a terrible threat: 2.Qg7+! Kxg7 3.Nf5++ Kg8 4.Nh6# — a typical bishop+knight mate. This works against 1...Nc4 and most other moves. Clearly 1...f6 was the lesser evil.',
      es: 'Las blancas tienen una amenaza brutal: 2.Dg7+! Rxg7 3.Cf5++ Rg8 4.Ch6#, un mate típico de alfil y caballo. Eso funciona contra 1...Cc4 y contra casi cualquier otra jugada. Por eso 1...f6 era el mal menor.',
    },
    moves: {
      'f6': {
        rating: 'ok',
        response: null,
      },
      'Nc4': {
        rating: 'bad',
        response: 'Qg7+',
      },
    },
  },

  {
    id: 7,
    // Engels - Maroczy, 1936. White to move. Best-effort — needs visual verification from PDF p.30
    fen: '2n1r1k1/pp3ppp/3P4/8/8/8/1q3PPP/1R1QR1K1 w - - 0 1',
    toMove: 'white',
    title: {
      en: 'Two Are Too Many',
      es: 'Dos son demasiados',
    },
    game: 'Engels – Maroczy, 1936',
    hint: {
      en: 'When a pawn coming to the 7th rank attacks a piece, the pawn has two squares to promote — it can take the piece or move straight. This extra option often makes the pawn unstoppable.',
      es: 'Cuando un peón llega a séptima atacando una pieza, tiene dos formas de coronar: capturando o avanzando de frente. Esa opción extra muchas veces lo vuelve imparable.',
    },
    solution: {
      en: '1.Rxb2! (deflecting the queen from protecting the rook) 1...Qxb2 2.Qxc8+! Nxc8 3.d7 1-0 — the pawn promotes no matter what.',
      es: '1.Txb2! (desviando a la dama de la defensa de la torre) 1...Dxb2 2.Dxc8+! Cxc8 3.d7 1-0. Ese peón corona sí o sí.',
    },
    moves: {
      'Rxb2': {
        rating: 'best',
        response: 'Qxb2',
        continuations: {
          'Qxc8+': {
            rating: 'best',
            response: 'Nxc8',
            continuations: {
              'd7': { rating: 'best' },
            },
          },
        },
      },
    },
  },
]

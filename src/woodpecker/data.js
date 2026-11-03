// Tactics from historical master games, identified from "The Woodpecker Method" (Smith & Tikkanen).
// Only the positions/games are used; moves come from the games themselves (PGN Mentor, https://www.pgnmentor.com).
// `bookNumber` is the exercise number in the book (Smith & Tikkanen); `level` is the book's difficulty section.
export const woodpeckerExercises = [
  {
    "id": 1,
    "level": "easy",
    "bookNumber": 1,
    "fen": "r6r/1pp3k1/1b6/p2P1p2/P1N1pn2/2P2PP1/BP5P/4RR1K b - - 0 30",
    "toMove": "black",
    "title": {
      "en": "Hamppe – Steinitz",
      "es": "Hamppe – Steinitz"
    },
    "game": "Hamppe – Steinitz, Vienna 1860",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "30...Rxh2+ 31.Kxh2 Rh8#",
      "es": "30...Txh2+ 31.Rxh2 Th8#"
    },
    "moves": {
      "Rxh2+": {
        "rating": "best",
        "response": "Kxh2",
        "continuations": {
          "Rh8#": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 2,
    "level": "easy",
    "bookNumber": 11,
    "fen": "4r2k/1b3Q1p/p1q3p1/1p4B1/2pb4/8/PPB3PP/5R1K w - - 1 34",
    "toMove": "white",
    "title": {
      "en": "Mackenzie – Steinitz",
      "es": "Mackenzie – Steinitz"
    },
    "game": "Mackenzie – Steinitz, Vienna 1882",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "34.Be4 Qxe4 35.Bf6+",
      "es": "34.Ae4 Dxe4 35.Af6+"
    },
    "moves": {
      "Be4": {
        "rating": "best",
        "response": "Qxe4",
        "continuations": {
          "Bf6+": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 3,
    "level": "easy",
    "bookNumber": 25,
    "fen": "8/1p3q1k/2p3pp/4P1r1/8/4Q3/PP5P/3R3K b - - 2 38",
    "toMove": "black",
    "title": {
      "en": "Thomas – Lasker",
      "es": "Thomas – Lasker"
    },
    "game": "Thomas – Lasker, Nottingham 1936",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "38...Rxe5 39.Qxe5 Qf3+",
      "es": "38...Txe5 39.Dxe5 Df3+"
    },
    "moves": {
      "Rxe5": {
        "rating": "best",
        "response": "Qxe5",
        "continuations": {
          "Qf3+": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 4,
    "level": "easy",
    "bookNumber": 45,
    "fen": "r3nrk1/1bp2ppp/pp2p3/3q2N1/1b1PNP2/3B2P1/PP2QP1P/2RR2K1 w - - 6 17",
    "toMove": "white",
    "title": {
      "en": "Capablanca – Becker",
      "es": "Capablanca – Becker"
    },
    "game": "Capablanca – Becker, Karlsbad 1929",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "17.Nxh7 f5",
      "es": "17.Cxh7 f5"
    },
    "moves": {
      "Nxh7": {
        "rating": "best",
        "response": "f5"
      }
    }
  },
  {
    "id": 5,
    "level": "easy",
    "bookNumber": 54,
    "fen": "r1b2rk1/pp4pp/2pb4/3p1pq1/2PP4/1N1BPR2/PPQ3PP/4R1K1 b - - 1 17",
    "toMove": "black",
    "title": {
      "en": "Goldfarb – Alekhine",
      "es": "Goldfarb – Alekhine"
    },
    "game": "Goldfarb – Alekhine, St Petersburg 1909",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "17...Bxh2+ 18.Kf2",
      "es": "17...Axh2+ 18.Rf2"
    },
    "moves": {
      "Bxh2+": {
        "rating": "best",
        "response": "Kf2"
      }
    }
  },
  {
    "id": 6,
    "level": "easy",
    "bookNumber": 65,
    "fen": "1r2r1k1/p1pbqppp/Q2b1n2/3p4/P2P4/2P5/1P2BPPP/R1B1KN1R b KQ - 2 14",
    "toMove": "black",
    "title": {
      "en": "Fink – Alekhine",
      "es": "Fink – Alekhine"
    },
    "game": "Fink – Alekhine, Pasadena 1932",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "14...Bb5",
      "es": "14...Ab5"
    },
    "moves": {
      "Bb5": {
        "rating": "best"
      }
    }
  },
  {
    "id": 7,
    "level": "easy",
    "bookNumber": 81,
    "fen": "6k1/6pp/p1p3r1/3p4/P2P1Pq1/1R2PR2/2Q1K1P1/7r b - - 1 32",
    "toMove": "black",
    "title": {
      "en": "Colin – Euwe",
      "es": "Colin – Euwe"
    },
    "game": "Colin – Euwe, Bern 1932",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "32...Qxg2+ 33.Rf2 Qxf2+",
      "es": "32...Dxg2+ 33.Tf2 Dxf2+"
    },
    "moves": {
      "Qxg2+": {
        "rating": "best",
        "response": "Rf2",
        "continuations": {
          "Qxf2+": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 8,
    "level": "easy",
    "bookNumber": 90,
    "fen": "3r2k1/2q1b2p/ppnpPpp1/2pB4/2P2PPB/PP1R3P/3Q4/6K1 w - - 5 35",
    "toMove": "white",
    "title": {
      "en": "Euwe – Cintron",
      "es": "Euwe – Cintron"
    },
    "game": "Euwe – Cintron, Munich (ol) 1958",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "35.Bxf6 Bxf6 36.e7+",
      "es": "35.Axf6 Axf6 36.e7+"
    },
    "moves": {
      "Bxf6": {
        "rating": "best",
        "response": "Bxf6",
        "continuations": {
          "e7+": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 9,
    "level": "easy",
    "bookNumber": 96,
    "fen": "r4rk1/p3qpp1/2p2n2/3pb2p/3Q2B1/1PN1P3/PB3PPP/2R2RK1 w - - 1 16",
    "toMove": "white",
    "title": {
      "en": "Smyslov – Govbinder",
      "es": "Smyslov – Govbinder"
    },
    "game": "Smyslov – Govbinder, Moscow 1967",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "16.Nxd5 cxd5 17.Qxe5",
      "es": "16.Cxd5 cxd5 17.Dxe5"
    },
    "moves": {
      "Nxd5": {
        "rating": "best",
        "response": "cxd5",
        "continuations": {
          "Qxe5": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 10,
    "level": "easy",
    "bookNumber": 105,
    "fen": "5bk1/p2Q1p2/q4p2/4r2p/3pr3/8/PPRRNPPP/5K2 b - - 1 31",
    "toMove": "black",
    "title": {
      "en": "Tal – Grigorian",
      "es": "Tal – Grigorian"
    },
    "game": "Tal – Grigorian, Yerevan 1980",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "31...Rxe2 32.Rxe2",
      "es": "31...Txe2 32.Txe2"
    },
    "moves": {
      "Rxe2": {
        "rating": "best",
        "response": "Rxe2"
      }
    }
  },
  {
    "id": 11,
    "level": "easy",
    "bookNumber": 114,
    "fen": "r4rk1/2n1q2p/b1n1p1p1/pp1pPpN1/P1pP1N1P/2P3P1/1P3PB1/R2QR1K1 w - - 1 24",
    "toMove": "white",
    "title": {
      "en": "Petrosian – Barcza",
      "es": "Petrosian – Barcza"
    },
    "game": "Petrosian – Barcza, Saltsjobaden 1952",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "24.Nfxe6 Nxe6 25.Bxd5",
      "es": "24.Cfxe6 Cxe6 25.Axd5"
    },
    "moves": {
      "Nfxe6": {
        "rating": "best",
        "response": "Nxe6",
        "continuations": {
          "Bxd5": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 12,
    "level": "easy",
    "bookNumber": 122,
    "fen": "8/4r1k1/4qp2/1p6/3R4/P1N2QPp/1PP2K1P/4r3 b - - 3 38",
    "toMove": "black",
    "title": {
      "en": "Averbakh – Spassky",
      "es": "Averbakh – Spassky"
    },
    "game": "Averbakh – Spassky, Moscow 1961",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "38...Rf1+",
      "es": "38...Tf1+"
    },
    "moves": {
      "Rf1+": {
        "rating": "best"
      }
    }
  },
  {
    "id": 13,
    "level": "easy",
    "bookNumber": 131,
    "fen": "2kn3r/pp1b4/2n1p1p1/q2pP1P1/2pN1P2/P1P3K1/2PB4/R2Q3B b - - 0 29",
    "toMove": "black",
    "title": {
      "en": "Spassky – Dueckstein",
      "es": "Spassky – Dueckstein"
    },
    "game": "Spassky – Dueckstein, Zurich 1984",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "29...Rxh1 30.Qxh1 Nxd4",
      "es": "29...Txh1 30.Dxh1 Cxd4"
    },
    "moves": {
      "Rxh1": {
        "rating": "best",
        "response": "Qxh1",
        "continuations": {
          "Nxd4": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 14,
    "level": "easy",
    "bookNumber": 138,
    "fen": "2rq1rk1/pp3pb1/3p2pB/n4P2/4pP2/1BNQ4/PKP3P1/3R3R w - - 0 21",
    "toMove": "white",
    "title": {
      "en": "Fischer – Purevzhav",
      "es": "Fischer – Purevzhav"
    },
    "game": "Fischer – Purevzhav, Varna (ol) 1962",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "21.Bxg7 Kxg7 22.Nxe4",
      "es": "21.Axg7 Rxg7 22.Cxe4"
    },
    "moves": {
      "Bxg7": {
        "rating": "best",
        "response": "Kxg7",
        "continuations": {
          "Nxe4": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 15,
    "level": "easy",
    "bookNumber": 147,
    "fen": "1r2b1k1/R4nqp/4p3/1pR5/1P1P1r2/5N2/1Q2B1P1/6K1 w - - 8 35",
    "toMove": "white",
    "title": {
      "en": "Karpov – Franklin",
      "es": "Karpov – Franklin"
    },
    "game": "Karpov – Franklin, Hastings 1972",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "35.Rg5 Qxg5 36.Nxg5",
      "es": "35.Tg5 Dxg5 36.Cxg5"
    },
    "moves": {
      "Rg5": {
        "rating": "best",
        "response": "Qxg5",
        "continuations": {
          "Nxg5": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 16,
    "level": "easy",
    "bookNumber": 154,
    "fen": "5kr1/5p2/8/1Q1bPp2/8/P5P1/q1rBBK1P/3R4 w - - 0 32",
    "toMove": "white",
    "title": {
      "en": "Karpov – Agdestein",
      "es": "Karpov – Agdestein"
    },
    "game": "Karpov – Agdestein, Oslo 1984",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "32.Qxd5 Qxd5 33.Bh6+",
      "es": "32.Dxd5 Dxd5 33.Ah6+"
    },
    "moves": {
      "Qxd5": {
        "rating": "best",
        "response": "Qxd5",
        "continuations": {
          "Bh6+": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 17,
    "level": "easy",
    "bookNumber": 161,
    "fen": "4r2k/3n2bB/2p1NqQ1/2Pp4/5B2/r6P/5PP1/4R1K1 b - - 2 34",
    "toMove": "black",
    "title": {
      "en": "Karpov – Lobron",
      "es": "Karpov – Lobron"
    },
    "game": "Karpov – Lobron, Frankfurt 1997",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "34...Rxe6 35.Rxe6 Ra1+",
      "es": "34...Txe6 35.Txe6 Ta1+"
    },
    "moves": {
      "Rxe6": {
        "rating": "best",
        "response": "Rxe6",
        "continuations": {
          "Ra1+": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 18,
    "level": "easy",
    "bookNumber": 167,
    "fen": "r5k1/pb1p1Rpq/2n1p1Q1/1p2P3/3P2P1/P7/1P1K4/5R2 w - - 10 26",
    "toMove": "white",
    "title": {
      "en": "Karpov – Ghaem Maghami",
      "es": "Karpov – Ghaem Maghami"
    },
    "game": "Karpov – Ghaem Maghami, Teheran 2009",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "26.Rf8+ Rxf8 27.Rxf8+",
      "es": "26.Tf8+ Txf8 27.Txf8+"
    },
    "moves": {
      "Rf8+": {
        "rating": "best",
        "response": "Rxf8",
        "continuations": {
          "Rxf8+": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 19,
    "level": "easy",
    "bookNumber": 175,
    "fen": "2r5/pp1b4/4p3/3pPk2/5P2/8/1K6/3R2R1 w - - 2 35",
    "toMove": "white",
    "title": {
      "en": "Kasparov – Shirov",
      "es": "Kasparov – Shirov"
    },
    "game": "Kasparov – Shirov, Astana 2001",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "35.Rd4",
      "es": "35.Td4"
    },
    "moves": {
      "Rd4": {
        "rating": "best"
      }
    }
  },
  {
    "id": 20,
    "level": "easy",
    "bookNumber": 183,
    "fen": "2rq1rk1/1p4bp/4p1p1/p2p1bP1/P2N4/2PnB3/QP4BP/R5RK b - - 11 26",
    "toMove": "black",
    "title": {
      "en": "Slobodjan – Khalifman",
      "es": "Slobodjan – Khalifman"
    },
    "game": "Slobodjan – Khalifman, Germany 1999",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "26...Qxg5 27.Rge1",
      "es": "26...Dxg5 27.Tge1"
    },
    "moves": {
      "Qxg5": {
        "rating": "best",
        "response": "Rge1"
      }
    }
  },
  {
    "id": 21,
    "level": "easy",
    "bookNumber": 190,
    "fen": "2r4k/2q4p/p2bPp2/1p6/6QP/3B4/PPP5/1K4R1 w - - 4 38",
    "toMove": "white",
    "title": {
      "en": "Anand – Ponomariov",
      "es": "Anand – Ponomariov"
    },
    "game": "Anand – Ponomariov, Mainz 2002",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "38.e7",
      "es": "38.e7"
    },
    "moves": {
      "e7": {
        "rating": "best"
      }
    }
  },
  {
    "id": 22,
    "level": "easy",
    "bookNumber": 196,
    "fen": "1r3k2/2p3Rp/2b5/p1Pp2p1/P2B1pq1/2PB2P1/7P/5RK1 w - - 2 34",
    "toMove": "white",
    "title": {
      "en": "Ponomariov – Bareev",
      "es": "Ponomariov – Bareev"
    },
    "game": "Ponomariov – Bareev, Moscow (4) 2001",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "34.Rxf4+",
      "es": "34.Txf4+"
    },
    "moves": {
      "Rxf4+": {
        "rating": "best"
      }
    }
  },
  {
    "id": 23,
    "level": "easy",
    "bookNumber": 202,
    "fen": "4r2k/p4rp1/1pb3qp/3NB3/2P1Q2n/1P1R4/1P4PP/4R1K1 b - - 3 29",
    "toMove": "black",
    "title": {
      "en": "Matikozian – Kasimdzhanov",
      "es": "Matikozian – Kasimdzhanov"
    },
    "game": "Matikozian – Kasimdzhanov, Szeged 1994",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "29...Rxe5 30.Qxh4 Rxe1+",
      "es": "29...Txe5 30.Dxh4 Txe1+"
    },
    "moves": {
      "Rxe5": {
        "rating": "best",
        "response": "Qxh4",
        "continuations": {
          "Rxe1+": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 24,
    "level": "easy",
    "bookNumber": 209,
    "fen": "4r1k1/2BR3p/8/5Rp1/4n1K1/4P1P1/1P2P2P/5r2 b - - 0 36",
    "toMove": "black",
    "title": {
      "en": "Timman – Topalov",
      "es": "Timman – Topalov"
    },
    "game": "Timman – Topalov, Sarajevo 1999",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "36...h5+ 37.Kxh5 Rxf5",
      "es": "36...h5+ 37.Rxh5 Txf5"
    },
    "moves": {
      "h5+": {
        "rating": "best",
        "response": "Kxh5",
        "continuations": {
          "Rxf5": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 25,
    "level": "easy",
    "bookNumber": 216,
    "fen": "4r1k1/5p2/p5pp/P1p2q2/3Nr3/3Q4/5PPP/1RR3K1 b - - 0 34",
    "toMove": "black",
    "title": {
      "en": "Erenburg – Carlsen",
      "es": "Erenburg – Carlsen"
    },
    "game": "Erenburg – Carlsen, Reykjavik (blitz) 2006",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "34...Re1+ 35.Rxe1 Rxe1+",
      "es": "34...Te1+ 35.Txe1 Txe1+"
    },
    "moves": {
      "Re1+": {
        "rating": "best",
        "response": "Rxe1",
        "continuations": {
          "Rxe1+": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 26,
    "level": "intermediate",
    "bookNumber": 219,
    "fen": "r2r2k1/1bqp1ppp/ppnbpn2/8/2PNP3/P1N1BP2/1P2B1PP/2RQ1R1K w - - 9 14",
    "toMove": "white",
    "title": {
      "en": "Ivanchuk – Carlsen",
      "es": "Ivanchuk – Carlsen"
    },
    "game": "Ivanchuk – Carlsen, Monte Carlo (blindfold) 2011",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "14.Ndb5 axb5 15.Nxb5",
      "es": "14.Cdb5 axb5 15.Cxb5"
    },
    "moves": {
      "Ndb5": {
        "rating": "best",
        "response": "axb5",
        "continuations": {
          "Nxb5": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 27,
    "level": "intermediate",
    "bookNumber": 252,
    "fen": "1rrb1n2/3kn1p1/2pp4/1p4BP/3PN1p1/1N6/1P2RP2/4R1K1 w - - 1 35",
    "toMove": "white",
    "title": {
      "en": "Lasker – Steinitz",
      "es": "Lasker – Steinitz"
    },
    "game": "Lasker – Steinitz, Moscow (2) 1896",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "35.Nec5+ dxc5 36.Nxc5+",
      "es": "35.Cec5+ dxc5 36.Cxc5+"
    },
    "moves": {
      "Nec5+": {
        "rating": "best",
        "response": "dxc5",
        "continuations": {
          "Nxc5+": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 28,
    "level": "intermediate",
    "bookNumber": 286,
    "fen": "1r2k3/2p2ppp/3pn3/3R4/P3PP2/4R3/Pr2NP1P/6K1 b - - 2 30",
    "toMove": "black",
    "title": {
      "en": "Lynch – Lasker",
      "es": "Lynch – Lasker"
    },
    "game": "Lynch – Lasker, Buenos Aires (simul) 1910",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "30...Rxe2 31.Rxe2 Rb1+",
      "es": "30...Txe2 31.Txe2 Tb1+"
    },
    "moves": {
      "Rxe2": {
        "rating": "best",
        "response": "Rxe2",
        "continuations": {
          "Rb1+": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 29,
    "level": "intermediate",
    "bookNumber": 368,
    "fen": "6rr/1b1k1p2/p3p2b/1pQpP3/5P1q/3B4/PP4N1/2R1R1K1 b - - 2 28",
    "toMove": "black",
    "title": {
      "en": "Tselikov – Alekhine",
      "es": "Tselikov – Alekhine"
    },
    "game": "Tselikov – Alekhine, Moscow 1915",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "28...Rxg2+ 29.Kxg2 d4+",
      "es": "28...Txg2+ 29.Rxg2 d4+"
    },
    "moves": {
      "Rxg2+": {
        "rating": "best",
        "response": "Kxg2",
        "continuations": {
          "d4+": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 30,
    "level": "intermediate",
    "bookNumber": 410,
    "fen": "r3r1k1/pp3ppp/1q2pn2/1Nb1n3/2P5/1P1BB3/P4PPP/R2QR1K1 w - - 5 19",
    "toMove": "white",
    "title": {
      "en": "Alekhine – Carbonell",
      "es": "Alekhine – Carbonell"
    },
    "game": "Alekhine – Carbonell, Barcelona (simul) 1928",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "19.Bxc5 Qxc5",
      "es": "19.Axc5 Dxc5"
    },
    "moves": {
      "Bxc5": {
        "rating": "best",
        "response": "Qxc5"
      }
    }
  },
  {
    "id": 31,
    "level": "intermediate",
    "bookNumber": 445,
    "fen": "1r3rk1/p1p3b1/2Pp2Qp/2pP2pP/5q2/2N5/PP1RR1P1/2K5 b - - 5 30",
    "toMove": "black",
    "title": {
      "en": "Florian – Alekhine",
      "es": "Florian – Alekhine"
    },
    "game": "Florian – Alekhine, Prague 1943",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "30...Rxb2 31.Qe4",
      "es": "30...Txb2 31.De4"
    },
    "moves": {
      "Rxb2": {
        "rating": "best",
        "response": "Qe4"
      }
    }
  },
  {
    "id": 32,
    "level": "intermediate",
    "bookNumber": 485,
    "fen": "6k1/6pp/3n4/1n1p1P2/p1pP1NP1/PpP1K3/1B5P/8 b - - 2 36",
    "toMove": "black",
    "title": {
      "en": "Euwe – Averbakh",
      "es": "Euwe – Averbakh"
    },
    "game": "Euwe – Averbakh, Zurich 1953",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "36...Nxa3 37.Bxa3",
      "es": "36...Cxa3 37.Axa3"
    },
    "moves": {
      "Nxa3": {
        "rating": "best",
        "response": "Bxa3"
      }
    }
  },
  {
    "id": 33,
    "level": "intermediate",
    "bookNumber": 518,
    "fen": "2r3k1/p4pp1/1q2pn1p/1Pb5/4P3/PQ3NPP/3pRP2/5BK1 b - - 1 30",
    "toMove": "black",
    "title": {
      "en": "Ravinsky – Smyslov",
      "es": "Ravinsky – Smyslov"
    },
    "game": "Ravinsky – Smyslov, Moscow 1944",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "30...Bxf2+ 31.Kg2",
      "es": "30...Axf2+ 31.Rg2"
    },
    "moves": {
      "Bxf2+": {
        "rating": "best",
        "response": "Kg2"
      }
    }
  },
  {
    "id": 34,
    "level": "intermediate",
    "bookNumber": 540,
    "fen": "2r5/5pk1/4pqp1/p4p2/5P2/QPr3PP/P2R3K/4R3 b - - 3 37",
    "toMove": "black",
    "title": {
      "en": "Tringov – Smyslov",
      "es": "Tringov – Smyslov"
    },
    "game": "Tringov – Smyslov, Havana 1965",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "37...Rxg3 38.Qxa5",
      "es": "37...Txg3 38.Dxa5"
    },
    "moves": {
      "Rxg3": {
        "rating": "best",
        "response": "Qxa5"
      }
    }
  },
  {
    "id": 35,
    "level": "intermediate",
    "bookNumber": 569,
    "fen": "r3r1k1/p1qn1pbp/2p2np1/1p6/2BPp3/BPN1P2P/P3QPP1/2RR2K1 w - - 0 16",
    "toMove": "white",
    "title": {
      "en": "Tal – Darznieks",
      "es": "Tal – Darznieks"
    },
    "game": "Tal – Darznieks, Riga 1953",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "16.Nxb5 Qa5 17.Bxf7+",
      "es": "16.Cxb5 Da5 17.Axf7+"
    },
    "moves": {
      "Nxb5": {
        "rating": "best",
        "response": "Qa5",
        "continuations": {
          "Bxf7+": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 36,
    "level": "intermediate",
    "bookNumber": 593,
    "fen": "3qr1k1/1b1n1p1p/p2Pp1p1/2p1PP2/r1Bp4/6QP/4NRP1/2R3K1 b - - 0 25",
    "toMove": "black",
    "title": {
      "en": "Kristiansen – Tal",
      "es": "Kristiansen – Tal"
    },
    "game": "Kristiansen – Tal, Havana (ol) 1966",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "25...Rxc4 26.Rxc4 exf5",
      "es": "25...Txc4 26.Txc4 exf5"
    },
    "moves": {
      "Rxc4": {
        "rating": "best",
        "response": "Rxc4",
        "continuations": {
          "exf5": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 37,
    "level": "intermediate",
    "bookNumber": 615,
    "fen": "4rbk1/1q3ppp/3pp3/2n5/3NP3/BP2Q3/5PPP/4R1K1 b - - 0 36",
    "toMove": "black",
    "title": {
      "en": "Ambroz – Tal",
      "es": "Ambroz – Tal"
    },
    "game": "Ambroz – Tal, Riga 1981",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "36...Nxe4 37.f3",
      "es": "36...Cxe4 37.f3"
    },
    "moves": {
      "Nxe4": {
        "rating": "best",
        "response": "f3"
      }
    }
  },
  {
    "id": 38,
    "level": "intermediate",
    "bookNumber": 648,
    "fen": "2k4r/p3qp2/bp1r1npp/n1pPp3/2P1P2B/P1PB1N2/6PP/R2Q1RK1 w - - 2 18",
    "toMove": "white",
    "title": {
      "en": "Petrosian – Benko",
      "es": "Petrosian – Benko"
    },
    "game": "Petrosian – Benko, Budapest 1955",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "18.Nxe5 Qxe5",
      "es": "18.Cxe5 Dxe5"
    },
    "moves": {
      "Nxe5": {
        "rating": "best",
        "response": "Qxe5"
      }
    }
  },
  {
    "id": 39,
    "level": "intermediate",
    "bookNumber": 677,
    "fen": "1n3N1k/r4p2/2pR2pp/1pq1p3/6QP/8/PPp2PP1/3R2K1 w - - 0 25",
    "toMove": "white",
    "title": {
      "en": "Spassky – Foguelman",
      "es": "Spassky – Foguelman"
    },
    "game": "Spassky – Foguelman, Mar del Plata 1960",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "25.Nxg6+ fxg6 26.Rd8+",
      "es": "25.Cxg6+ fxg6 26.Td8+"
    },
    "moves": {
      "Nxg6+": {
        "rating": "best",
        "response": "fxg6",
        "continuations": {
          "Rd8+": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 40,
    "level": "intermediate",
    "bookNumber": 708,
    "fen": "r1b1r1k1/1p3pp1/2p4p/3p4/1R5Q/4B1P1/PPq2PP1/R5K1 b - - 0 22",
    "toMove": "black",
    "title": {
      "en": "Ady – Spassky",
      "es": "Ady – Spassky"
    },
    "game": "Ady – Spassky, London 1984",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "22...Rxa2 23.Rxa2 Qb1+",
      "es": "22...Txa2 23.Txa2 Db1+"
    },
    "moves": {
      "Rxa2": {
        "rating": "best",
        "response": "Rxa2",
        "continuations": {
          "Qb1+": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 41,
    "level": "intermediate",
    "bookNumber": 734,
    "fen": "r3qr1k/pp3pbp/2pn4/7Q/3pP3/2NB3P/PPP3P1/R4RK1 w - - 0 19",
    "toMove": "white",
    "title": {
      "en": "Fischer – Benko",
      "es": "Fischer – Benko"
    },
    "game": "Fischer – Benko, New York 1963",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "19.Rf6 Kg8",
      "es": "19.Tf6 Rg8"
    },
    "moves": {
      "Rf6": {
        "rating": "best",
        "response": "Kg8"
      }
    }
  },
  {
    "id": 42,
    "level": "intermediate",
    "bookNumber": 764,
    "fen": "2r3k1/p2q1pbp/1p2p1p1/7P/2nPBB2/2PR2Q1/r4PP1/5RK1 b - - 3 24",
    "toMove": "black",
    "title": {
      "en": "Morozevich – Karpov",
      "es": "Morozevich – Karpov"
    },
    "game": "Morozevich – Karpov, Moscow (rapid) 1992",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "24...f5 25.Bf3",
      "es": "24...f5 25.Af3"
    },
    "moves": {
      "f5": {
        "rating": "best",
        "response": "Bf3"
      }
    }
  },
  {
    "id": 43,
    "level": "intermediate",
    "bookNumber": 787,
    "fen": "2br2k1/1r3pPp/p3p3/q1bp2P1/3R3P/2N1Q3/PPP1B3/2KR4 b - - 2 24",
    "toMove": "black",
    "title": {
      "en": "Short – Kasparov",
      "es": "Short – Kasparov"
    },
    "game": "Short – Kasparov, Belfort 1988",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "24...Qb4 25.b3",
      "es": "24...Db4 25.b3"
    },
    "moves": {
      "Qb4": {
        "rating": "best",
        "response": "b3"
      }
    }
  },
  {
    "id": 44,
    "level": "intermediate",
    "bookNumber": 813,
    "fen": "r5rk/1p2q2p/p1ppnp1B/P1b1p2B/4P3/2P2QP1/1P3P1P/3R1R1K w - - 4 23",
    "toMove": "white",
    "title": {
      "en": "Khalifman – Inkiov",
      "es": "Khalifman – Inkiov"
    },
    "game": "Khalifman – Inkiov, Moscow 1989",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "23.b4 Ba7 24.Rxd6",
      "es": "23.b4 Aa7 24.Txd6"
    },
    "moves": {
      "b4": {
        "rating": "best",
        "response": "Ba7",
        "continuations": {
          "Rxd6": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 45,
    "level": "intermediate",
    "bookNumber": 837,
    "fen": "3q1rk1/4pp2/p2bb1p1/1pBN1n1p/1P6/4P1PP/P3QPB1/3R2K1 w - - 1 24",
    "toMove": "white",
    "title": {
      "en": "Khalifman – Duzhakov",
      "es": "Khalifman – Duzhakov"
    },
    "game": "Khalifman – Duzhakov, St Petersburg 2012",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "24.e4 Ng7 25.Nxe7+",
      "es": "24.e4 Cg7 25.Cxe7+"
    },
    "moves": {
      "e4": {
        "rating": "best",
        "response": "Ng7",
        "continuations": {
          "Nxe7+": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 46,
    "level": "intermediate",
    "bookNumber": 858,
    "fen": "1r1r2k1/pp2ppb1/1n4pp/3bP3/2qNR2N/B5P1/P4QBP/5RK1 w - - 1 26",
    "toMove": "white",
    "title": {
      "en": "Kramnik – Svidler",
      "es": "Kramnik – Svidler"
    },
    "game": "Kramnik – Svidler, Sochi 2015",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "26.Ne6 Bxe6 27.Rxc4",
      "es": "26.Ce6 Axe6 27.Txc4"
    },
    "moves": {
      "Ne6": {
        "rating": "best",
        "response": "Bxe6",
        "continuations": {
          "Rxc4": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 47,
    "level": "intermediate",
    "bookNumber": 881,
    "fen": "5r2/1p1r2p1/p1p2bk1/8/1PPPR1P1/3KB3/1P6/5R2 w - - 1 36",
    "toMove": "white",
    "title": {
      "en": "Anand – Van Wely",
      "es": "Anand – Van Wely"
    },
    "game": "Anand – Van Wely, Wijk aan Zee 2013",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "36.g5 Bxd4 37.Re6+",
      "es": "36.g5 Axd4 37.Te6+"
    },
    "moves": {
      "g5": {
        "rating": "best",
        "response": "Bxd4",
        "continuations": {
          "Re6+": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 48,
    "level": "intermediate",
    "bookNumber": 903,
    "fen": "2rqr1k1/R3bp1p/1n4p1/3P1b1N/3P1B2/6QP/6B1/5RK1 w - - 9 33",
    "toMove": "white",
    "title": {
      "en": "Ponomariov – Dominguez Perez",
      "es": "Ponomariov – Dominguez Perez"
    },
    "game": "Ponomariov – Dominguez Perez, Tashkent 2012",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "33.Rxe7 Qxe7",
      "es": "33.Txe7 Dxe7"
    },
    "moves": {
      "Rxe7": {
        "rating": "best",
        "response": "Qxe7"
      }
    }
  },
  {
    "id": 49,
    "level": "intermediate",
    "bookNumber": 929,
    "fen": "2r1k1r1/q4p2/pR2p3/Pb2P2p/3Pp3/7Q/2N3PP/4R1K1 w - - 0 33",
    "toMove": "white",
    "title": {
      "en": "Topalov – Polgar",
      "es": "Topalov – Polgar"
    },
    "game": "Topalov – Polgar, Novgorod 1996",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "33.Rxe6+ Kf8 34.Qa3+",
      "es": "33.Txe6+ Rf8 34.Da3+"
    },
    "moves": {
      "Rxe6+": {
        "rating": "best",
        "response": "Kf8",
        "continuations": {
          "Qa3+": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 50,
    "level": "intermediate",
    "bookNumber": 951,
    "fen": "7r/r3kp2/2bp1p2/p1q1pP1N/1pB1P2P/4b3/PPP1Q1P1/1K1R1R2 w - - 1 22",
    "toMove": "white",
    "title": {
      "en": "Carlsen – Kotronias",
      "es": "Carlsen – Kotronias"
    },
    "game": "Carlsen – Kotronias, Calvia (ol) 2004",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "22.Nxf6 Kxf6 23.Rxd6+",
      "es": "22.Cxf6 Rxf6 23.Txd6+"
    },
    "moves": {
      "Nxf6": {
        "rating": "best",
        "response": "Kxf6",
        "continuations": {
          "Rxd6+": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 51,
    "level": "advanced",
    "bookNumber": 976,
    "fen": "2rr2k1/q4pbn/2p3p1/N2nP2p/1p1P1N2/1P4PP/P2B2Q1/3R1RK1 w - - 5 30",
    "toMove": "white",
    "title": {
      "en": "Carlsen – Aronian",
      "es": "Carlsen – Aronian"
    },
    "game": "Carlsen – Aronian, Wijk aan Zee 2012",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "30.Nxc6 Rxc6 31.Nxd5",
      "es": "30.Cxc6 Txc6 31.Cxd5"
    },
    "moves": {
      "Nxc6": {
        "rating": "best",
        "response": "Rxc6",
        "continuations": {
          "Nxd5": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 52,
    "level": "advanced",
    "bookNumber": 980,
    "fen": "4r1k1/p1p2rb1/1pbp3p/4nqp1/2P5/1P3PB1/P1NQP2P/2RR1BK1 b - - 7 26",
    "toMove": "black",
    "title": {
      "en": "Hammer – Carlsen",
      "es": "Hammer – Carlsen"
    },
    "game": "Hammer – Carlsen, Stavanger (blitz) 2013",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "26...Qxf3 27.exf3 Nxf3+",
      "es": "26...Dxf3 27.exf3 Cxf3+"
    },
    "moves": {
      "Qxf3": {
        "rating": "best",
        "response": "exf3",
        "continuations": {
          "Nxf3+": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 53,
    "level": "advanced",
    "bookNumber": 984,
    "fen": "5rk1/1b5p/1q2p1p1/1p2P3/3RPn2/5N1P/1P3QP1/5BK1 b - - 7 31",
    "toMove": "black",
    "title": {
      "en": "Carlsen – Hevia",
      "es": "Carlsen – Hevia"
    },
    "game": "Carlsen – Hevia, Internet (2) 2016",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "31...Nxh3+ 32.gxh3 Rxf3",
      "es": "31...Cxh3+ 32.gxh3 Txf3"
    },
    "moves": {
      "Nxh3+": {
        "rating": "best",
        "response": "gxh3",
        "continuations": {
          "Rxf3": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 54,
    "level": "advanced",
    "bookNumber": 989,
    "fen": "r1bq1k2/ppp2rbp/2np1pp1/3N4/2Q1P3/5NB1/PPP2PPP/3RR1K1 w - - 10 17",
    "toMove": "white",
    "title": {
      "en": "Lipke – Steinitz",
      "es": "Lipke – Steinitz"
    },
    "game": "Lipke – Steinitz, Vienna 1898",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "17.Nxc7 Rxc7 18.Bxd6+",
      "es": "17.Cxc7 Txc7 18.Axd6+"
    },
    "moves": {
      "Nxc7": {
        "rating": "best",
        "response": "Rxc7",
        "continuations": {
          "Bxd6+": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 55,
    "level": "advanced",
    "bookNumber": 998,
    "fen": "r3k2r/4bp2/pp1p2np/2pPp1pn/2P1P3/P1NBBPPq/1P3Q1P/4NR1K b kq - 4 20",
    "toMove": "black",
    "title": {
      "en": "Tereshchenko – Alekhine",
      "es": "Tereshchenko – Alekhine"
    },
    "game": "Tereshchenko – Alekhine, St Petersburg 1909",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "20...Ngf4 21.gxf4 gxf4",
      "es": "20...Cgf4 21.gxf4 gxf4"
    },
    "moves": {
      "Ngf4": {
        "rating": "best",
        "response": "gxf4",
        "continuations": {
          "gxf4": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 56,
    "level": "advanced",
    "bookNumber": 1005,
    "fen": "r1b2kB1/pp2q3/2pp1bpp/8/P3P3/1QN5/1PP3PP/5RK1 w - - 4 21",
    "toMove": "white",
    "title": {
      "en": "Alekhine – Mollinedo",
      "es": "Alekhine – Mollinedo"
    },
    "game": "Alekhine – Mollinedo, Madrid (simul) 1941",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "21.e5 dxe5",
      "es": "21.e5 dxe5"
    },
    "moves": {
      "e5": {
        "rating": "best",
        "response": "dxe5"
      }
    }
  },
  {
    "id": 57,
    "level": "advanced",
    "bookNumber": 1010,
    "fen": "r1bq2k1/pp3pbp/1np3p1/8/PPBNr3/4P3/3B1PPP/2RQ1RK1 w - - 0 16",
    "toMove": "white",
    "title": {
      "en": "Smyslov – Stein",
      "es": "Smyslov – Stein"
    },
    "game": "Smyslov – Stein, Moscow 1969",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "16.Bxf7+ Kh8",
      "es": "16.Axf7+ Rh8"
    },
    "moves": {
      "Bxf7+": {
        "rating": "best",
        "response": "Kh8"
      }
    }
  },
  {
    "id": 58,
    "level": "advanced",
    "bookNumber": 1014,
    "fen": "r1bq2k1/pp3pbp/2P2np1/8/3N4/1QN1rP2/PP3KPP/3R1B1R b - - 1 14",
    "toMove": "black",
    "title": {
      "en": "Szukszta – Tal",
      "es": "Szukszta – Tal"
    },
    "game": "Szukszta – Tal, Uppsala (blitz) 1956",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "14...Ng4+ 15.fxg4 Bxd4",
      "es": "14...Cg4+ 15.fxg4 Axd4"
    },
    "moves": {
      "Ng4+": {
        "rating": "best",
        "response": "fxg4",
        "continuations": {
          "Bxd4": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 59,
    "level": "advanced",
    "bookNumber": 1019,
    "fen": "5rk1/pp6/2p1q3/8/1PPbNpP1/P7/4Q1B1/2B2K2 b - - 2 32",
    "toMove": "black",
    "title": {
      "en": "Donner – Tal",
      "es": "Donner – Tal"
    },
    "game": "Donner – Tal, Bled 1961",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "32...f3 33.Bxf3 Qxg4",
      "es": "32...f3 33.Axf3 Dxg4"
    },
    "moves": {
      "f3": {
        "rating": "best",
        "response": "Bxf3",
        "continuations": {
          "Qxg4": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 60,
    "level": "advanced",
    "bookNumber": 1030,
    "fen": "r2qk2r/1p1n1ppp/2pbp3/p3Nb2/3P4/1B6/PPPBQPPP/R3K2R w KQkq - 0 12",
    "toMove": "white",
    "title": {
      "en": "Gligoric – Petrosian",
      "es": "Gligoric – Petrosian"
    },
    "game": "Gligoric – Petrosian, Leningrad 1957",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "12.Nxf7 Kxf7",
      "es": "12.Cxf7 Rxf7"
    },
    "moves": {
      "Nxf7": {
        "rating": "best",
        "response": "Kxf7"
      }
    }
  },
  {
    "id": 61,
    "level": "advanced",
    "bookNumber": 1038,
    "fen": "4r1k1/5pb1/r1p1bnpp/6B1/5P2/qP3B2/P2QR1PP/2NR3K w - - 0 28",
    "toMove": "white",
    "title": {
      "en": "Petrosian – Westerinen",
      "es": "Petrosian – Westerinen"
    },
    "game": "Petrosian – Westerinen, Palma de Mallorca 1968",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "28.f5 hxg5 29.fxe6",
      "es": "28.f5 hxg5 29.fxe6"
    },
    "moves": {
      "f5": {
        "rating": "best",
        "response": "hxg5",
        "continuations": {
          "fxe6": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 62,
    "level": "advanced",
    "bookNumber": 1044,
    "fen": "r1q1kr2/1b2bn1Q/3pp1p1/1N4P1/4n3/P1N1B3/1PP4P/2KR1R2 w q - 0 23",
    "toMove": "white",
    "title": {
      "en": "Fedorowicz – Petrosian",
      "es": "Fedorowicz – Petrosian"
    },
    "game": "Fedorowicz – Petrosian, Hastings 1977",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "23.Rxf7 Rxf7 24.Qg8+",
      "es": "23.Txf7 Txf7 24.Dg8+"
    },
    "moves": {
      "Rxf7": {
        "rating": "best",
        "response": "Rxf7",
        "continuations": {
          "Qg8+": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 63,
    "level": "advanced",
    "bookNumber": 1051,
    "fen": "5rk1/pp1q2p1/3p1nnp/2pPpr2/P1P1N3/3Q1PP1/2P4P/R1B2RK1 w - - 1 26",
    "toMove": "white",
    "title": {
      "en": "Hodgson – Spassky",
      "es": "Hodgson – Spassky"
    },
    "game": "Hodgson – Spassky, Brussels 1985",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "26.Nxd6 e4 27.Nxe4",
      "es": "26.Cxd6 e4 27.Cxe4"
    },
    "moves": {
      "Nxd6": {
        "rating": "best",
        "response": "e4",
        "continuations": {
          "Nxe4": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 64,
    "level": "advanced",
    "bookNumber": 1059,
    "fen": "8/2k1nB2/Kp4p1/p1p2p1p/P4P1P/2P3P1/1P6/8 w - - 32 61",
    "toMove": "white",
    "title": {
      "en": "Fischer – Taimanov",
      "es": "Fischer – Taimanov"
    },
    "game": "Fischer – Taimanov, Vancouver (4) 1971",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "61.Be8 Kd8 62.Bxg6",
      "es": "61.Ae8 Rd8 62.Axg6"
    },
    "moves": {
      "Be8": {
        "rating": "best",
        "response": "Kd8",
        "continuations": {
          "Bxg6": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 65,
    "level": "advanced",
    "bookNumber": 1065,
    "fen": "1nq1rb1k/prp3pp/1pN1p3/5p1N/2PP2Q1/6R1/PP3PPP/R5K1 w - - 0 22",
    "toMove": "white",
    "title": {
      "en": "Karpov – Stojanovic",
      "es": "Karpov – Stojanovic"
    },
    "game": "Karpov – Stojanovic, Valjevo 2007",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "22.Qh4 Nxc6",
      "es": "22.Dh4 Cxc6"
    },
    "moves": {
      "Qh4": {
        "rating": "best",
        "response": "Nxc6"
      }
    }
  },
  {
    "id": 66,
    "level": "advanced",
    "bookNumber": 1072,
    "fen": "3rk2r/1bq1b2p/pN1pQ1p1/2P5/8/1P4P1/P4P1P/R3R1K1 w k - 3 23",
    "toMove": "white",
    "title": {
      "en": "Kasparov – Salov",
      "es": "Kasparov – Salov"
    },
    "game": "Kasparov – Salov, Barcelona 1989",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "23.c6 Bxc6",
      "es": "23.c6 Axc6"
    },
    "moves": {
      "c6": {
        "rating": "best",
        "response": "Bxc6"
      }
    }
  },
  {
    "id": 67,
    "level": "advanced",
    "bookNumber": 1078,
    "fen": "6k1/p5r1/1p1p1R1b/1P1P4/1P2p1qB/6Pp/2Q5/7K b - - 1 39",
    "toMove": "black",
    "title": {
      "en": "Piket – Kasparov",
      "es": "Piket – Kasparov"
    },
    "game": "Piket – Kasparov, Linares 1997",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "39...e3 40.Re6 Qf3+",
      "es": "39...e3 40.Te6 Df3+"
    },
    "moves": {
      "e3": {
        "rating": "best",
        "response": "Re6",
        "continuations": {
          "Qf3+": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 68,
    "level": "advanced",
    "bookNumber": 1084,
    "fen": "2r4k/6p1/1p2P2p/p2p4/3P2RP/KP1bP3/P1r2P2/6RB b - - 0 30",
    "toMove": "black",
    "title": {
      "en": "Khalifman – Dolmatov",
      "es": "Khalifman – Dolmatov"
    },
    "game": "Khalifman – Dolmatov, Minsk 1987",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "30...b5 31.Ra1",
      "es": "30...b5 31.Ta1"
    },
    "moves": {
      "b5": {
        "rating": "best",
        "response": "Ra1"
      }
    }
  },
  {
    "id": 69,
    "level": "advanced",
    "bookNumber": 1089,
    "fen": "R7/1r2ppk1/3p2p1/1pqN4/4r2p/2P4K/1P1Q3P/R7 w - - 2 37",
    "toMove": "white",
    "title": {
      "en": "Kramnik – Van Wely",
      "es": "Kramnik – Van Wely"
    },
    "game": "Kramnik – Van Wely, Wijk aan Zee 2004",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "37.Rh8 f6 38.Rxh4",
      "es": "37.Th8 f6 38.Txh4"
    },
    "moves": {
      "Rh8": {
        "rating": "best",
        "response": "f6",
        "continuations": {
          "Rxh4": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 70,
    "level": "advanced",
    "bookNumber": 1095,
    "fen": "2rr2k1/pp1bbpp1/4pn2/q3P1P1/8/2N1Q3/PPP1B1P1/1K1R3R b - - 0 17",
    "toMove": "black",
    "title": {
      "en": "Nijboer – Anand",
      "es": "Nijboer – Anand"
    },
    "game": "Nijboer – Anand, Wijk aan Zee 1998",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "17...Rxc3 18.Bd3 Rxd3",
      "es": "17...Txc3 18.Ad3 Txd3"
    },
    "moves": {
      "Rxc3": {
        "rating": "best",
        "response": "Bd3",
        "continuations": {
          "Rxd3": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 71,
    "level": "advanced",
    "bookNumber": 1099,
    "fen": "q4rk1/2Q1bppp/3p4/r3nPP1/4P2P/Np2B3/1P4B1/1K1R3R b - - 0 25",
    "toMove": "black",
    "title": {
      "en": "Karjakin – Anand",
      "es": "Karjakin – Anand"
    },
    "game": "Karjakin – Anand, Wijk aan Zee 2006",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "25...Rc8 26.Qxe7",
      "es": "25...Tc8 26.Dxe7"
    },
    "moves": {
      "Rc8": {
        "rating": "best",
        "response": "Qxe7"
      }
    }
  },
  {
    "id": 72,
    "level": "advanced",
    "bookNumber": 1104,
    "fen": "3r3k/1p3r1p/pn1q1p2/2p5/3nR3/1PN4P/P4QP1/3R1BK1 w - - 0 29",
    "toMove": "white",
    "title": {
      "en": "Anand – Svidler",
      "es": "Anand – Svidler"
    },
    "game": "Anand – Svidler, Moscow 2009",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "29.b4 f5 30.bxc5",
      "es": "29.b4 f5 30.bxc5"
    },
    "moves": {
      "b4": {
        "rating": "best",
        "response": "f5",
        "continuations": {
          "bxc5": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 73,
    "level": "advanced",
    "bookNumber": 1110,
    "fen": "5nk1/2Q5/p1N2q1p/1p4p1/1P2p1b1/P5P1/2PKN2P/8 b - - 1 31",
    "toMove": "black",
    "title": {
      "en": "Ponomariov – Ponkratov",
      "es": "Ponomariov – Ponkratov"
    },
    "game": "Ponomariov – Ponkratov, Berlin (blitz) 2015",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "31...e3+ 32.Kd3 Qf5+",
      "es": "31...e3+ 32.Rd3 Df5+"
    },
    "moves": {
      "e3+": {
        "rating": "best",
        "response": "Kd3",
        "continuations": {
          "Qf5+": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 74,
    "level": "advanced",
    "bookNumber": 1114,
    "fen": "2rr2k1/1p3p2/p3bn1p/q2p4/3P4/b1N2B2/1P1Q1PPP/R3R1K1 b - - 1 23",
    "toMove": "black",
    "title": {
      "en": "Khenkin – Kasimdzhanov",
      "es": "Khenkin – Kasimdzhanov"
    },
    "game": "Khenkin – Kasimdzhanov, Moscow (4) 2001",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "23...Bxb2 24.Rxa5 Bxc3",
      "es": "23...Axb2 24.Txa5 Axc3"
    },
    "moves": {
      "Bxb2": {
        "rating": "best",
        "response": "Rxa5",
        "continuations": {
          "Bxc3": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 75,
    "level": "advanced",
    "bookNumber": 1121,
    "fen": "5rk1/p2bq2p/1p6/2pPp2p/2P1B3/4Q1P1/PP3R2/6K1 w - - 1 26",
    "toMove": "white",
    "title": {
      "en": "Nielsen – Carlsen",
      "es": "Nielsen – Carlsen"
    },
    "game": "Nielsen – Carlsen, Faaborg (blindfold) 2007",
    "hint": {
      "en": "Find the strongest move. It is not always a direct attack — look at every forcing option.",
      "es": "Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas."
    },
    "solution": {
      "en": "26.d6 Qg7 27.Bd5+",
      "es": "26.d6 Dg7 27.Ad5+"
    },
    "moves": {
      "d6": {
        "rating": "best",
        "response": "Qg7",
        "continuations": {
          "Bd5+": {
            "rating": "best"
          }
        }
      }
    }
  }
]

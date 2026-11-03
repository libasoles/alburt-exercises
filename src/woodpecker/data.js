// Tactics from historical master games, identified from "The Woodpecker Method" (Smith & Tikkanen).
// Only the positions/games are used; moves come from the games themselves (PGN Mentor, https://www.pgnmentor.com).
// `bookNumber` is the exercise number in the book's Easy section.
export const woodpeckerExercises = [
  {
    "id": 1,
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
  }
]

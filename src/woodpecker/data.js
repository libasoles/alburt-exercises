// Selected tactics from the Lichess puzzle database (CC0, https://database.lichess.org/#puzzles).
// Generated; each puzzle links back to https://lichess.org/training/<lichessId>.
export const woodpeckerExercises = [
  {
    "id": 1,
    "lichessId": "YrZ9M",
    "rating": 1385,
    "fen": "8/Q7/1p3Kpk/8/5P1p/4P1P1/7q/8 w - - 0 39",
    "toMove": "white",
    "title": {
      "en": "Mate in 2",
      "es": "Mate en 2"
    },
    "hint": {
      "en": "Find the mate in two.",
      "es": "Encontrá el mate en dos jugadas."
    },
    "solution": {
      "en": "39.Qg7+ Kh5 40.Qxg6#",
      "es": "39.Dg7+ Rh5 40.Dxg6#"
    },
    "moves": {
      "Qg7+": {
        "rating": "best",
        "response": "Kh5",
        "continuations": {
          "Qxg6#": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 2,
    "lichessId": "gHHWW",
    "rating": 1322,
    "fen": "r2qkb1r/ppp2ppp/2np4/P3N3/2B5/2P5/1PP2PPP/R1BbK2R w KQkq - 0 9",
    "toMove": "white",
    "title": {
      "en": "Mate in 2",
      "es": "Mate en 2"
    },
    "hint": {
      "en": "Find the mate in two.",
      "es": "Encontrá el mate en dos jugadas."
    },
    "solution": {
      "en": "9.Bxf7+ Ke7 10.Bg5#",
      "es": "9.Axf7+ Re7 10.Ag5#"
    },
    "moves": {
      "Bxf7+": {
        "rating": "best",
        "response": "Ke7",
        "continuations": {
          "Bg5#": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 3,
    "lichessId": "YszVJ",
    "rating": 1461,
    "fen": "1rb2rk1/p5pp/8/6N1/6nP/1P4Q1/P1P1p1P1/R6K b - - 0 24",
    "toMove": "black",
    "title": {
      "en": "Mate in 2",
      "es": "Mate en 2"
    },
    "hint": {
      "en": "Find the mate in two.",
      "es": "Encontrá el mate en dos jugadas."
    },
    "solution": {
      "en": "24...Rf1+ 25.Rxf1 exf1=Q#",
      "es": "24...Tf1+ 25.Txf1 exf1=D#"
    },
    "moves": {
      "Rf1+": {
        "rating": "best",
        "response": "Rxf1",
        "continuations": {
          "exf1=Q#": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 4,
    "lichessId": "iSrYj",
    "rating": 1740,
    "fen": "4r1k1/ppqn1ppp/2pb1p2/8/2BP3N/2P2P1P/PPQ3P1/R1B3K1 b - - 0 15",
    "toMove": "black",
    "title": {
      "en": "Mate in 3",
      "es": "Mate en 3"
    },
    "hint": {
      "en": "There is a forced mate in three; start with checks and sacrifices.",
      "es": "Hay un mate forzado en tres jugadas; empezá por los jaques y los sacrificios."
    },
    "solution": {
      "en": "15...Re1+ 16.Bf1 Bh2+ 17.Kh1 Rxf1#",
      "es": "15...Te1+ 16.Af1 Ah2+ 17.Rh1 Txf1#"
    },
    "moves": {
      "Re1+": {
        "rating": "best",
        "response": "Bf1",
        "continuations": {
          "Bh2+": {
            "rating": "best",
            "response": "Kh1",
            "continuations": {
              "Rxf1#": {
                "rating": "best"
              }
            }
          }
        }
      }
    }
  },
  {
    "id": 5,
    "lichessId": "mrDdX",
    "rating": 1321,
    "fen": "8/3qbrpk/3p3p/p3pN2/Pp2n3/6RQ/1r1B1PPP/3R2K1 w - - 0 27",
    "toMove": "white",
    "title": {
      "en": "Mate in 3",
      "es": "Mate en 3"
    },
    "hint": {
      "en": "There is a forced mate in three; start with checks and sacrifices.",
      "es": "Hay un mate forzado en tres jugadas; empezá por los jaques y los sacrificios."
    },
    "solution": {
      "en": "27.Rxg7+ Rxg7 28.Qxh6+ Kg8 29.Qxg7#",
      "es": "27.Txg7+ Txg7 28.Dxh6+ Rg8 29.Dxg7#"
    },
    "moves": {
      "Rxg7+": {
        "rating": "best",
        "response": "Rxg7",
        "continuations": {
          "Qxh6+": {
            "rating": "best",
            "response": "Kg8",
            "continuations": {
              "Qxg7#": {
                "rating": "best"
              }
            }
          }
        }
      }
    }
  },
  {
    "id": 6,
    "lichessId": "4pxqH",
    "rating": 1379,
    "fen": "6k1/1pb5/2P3p1/6Pp/3pPp1Q/3P1P1B/r1q5/1R4K1 w - - 1 39",
    "toMove": "white",
    "title": {
      "en": "Fork",
      "es": "Horquilla"
    },
    "hint": {
      "en": "Look for a move that attacks two pieces at once.",
      "es": "Buscá una jugada que ataque dos piezas a la vez."
    },
    "solution": {
      "en": "39.Be6+ Kf8 40.Bxa2",
      "es": "39.Ae6+ Rf8 40.Axa2"
    },
    "moves": {
      "Be6+": {
        "rating": "best",
        "response": "Kf8",
        "continuations": {
          "Bxa2": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 7,
    "lichessId": "NNjAF",
    "rating": 1414,
    "fen": "Q2qkb1r/2p2pp1/3p1n1p/4p1N1/4P3/1PN5/1P1P1PPP/2B3K1 w k - 2 17",
    "toMove": "white",
    "title": {
      "en": "Fork",
      "es": "Horquilla"
    },
    "hint": {
      "en": "Look for a move that attacks two pieces at once.",
      "es": "Buscá una jugada que ataque dos piezas a la vez."
    },
    "solution": {
      "en": "17.Qxd8+ Kxd8 18.Nxf7+ Ke8 19.Nxh8",
      "es": "17.Dxd8+ Rxd8 18.Cxf7+ Re8 19.Cxh8"
    },
    "moves": {
      "Qxd8+": {
        "rating": "best",
        "response": "Kxd8",
        "continuations": {
          "Nxf7+": {
            "rating": "best",
            "response": "Ke8",
            "continuations": {
              "Nxh8": {
                "rating": "best"
              }
            }
          }
        }
      }
    }
  },
  {
    "id": 8,
    "lichessId": "4YFq6",
    "rating": 1466,
    "fen": "3r2k1/r1p1n1b1/1p2b1pp/1P2Np2/2P4P/P3p1P1/1B3PB1/2R1R1K1 b - - 0 20",
    "toMove": "black",
    "title": {
      "en": "Fork",
      "es": "Horquilla"
    },
    "hint": {
      "en": "Look for a move that attacks two pieces at once.",
      "es": "Buscá una jugada que ataque dos piezas a la vez."
    },
    "solution": {
      "en": "20...exf2+ 21.Kxf2 Rd2+ 22.Kf1 Rxb2",
      "es": "20...exf2+ 21.Rxf2 Td2+ 22.Rf1 Txb2"
    },
    "moves": {
      "exf2+": {
        "rating": "best",
        "response": "Kxf2",
        "continuations": {
          "Rd2+": {
            "rating": "best",
            "response": "Kf1",
            "continuations": {
              "Rxb2": {
                "rating": "best"
              }
            }
          }
        }
      }
    }
  },
  {
    "id": 9,
    "lichessId": "Uheec",
    "rating": 1483,
    "fen": "b2k3r/2p1qp2/BpPp4/3Pn3/PP2Pp2/2N2P2/3K1Q1P/R7 b - - 1 30",
    "toMove": "black",
    "title": {
      "en": "Pin",
      "es": "Clavada"
    },
    "hint": {
      "en": "An enemy piece cannot move without losing something more valuable.",
      "es": "Una pieza enemiga no puede moverse sin perder algo más valioso."
    },
    "solution": {
      "en": "30...Rxh2 31.Qxh2 Nxf3+ 32.Kc2 Nxh2",
      "es": "30...Txh2 31.Dxh2 Cxf3+ 32.Rc2 Cxh2"
    },
    "moves": {
      "Rxh2": {
        "rating": "best",
        "response": "Qxh2",
        "continuations": {
          "Nxf3+": {
            "rating": "best",
            "response": "Kc2",
            "continuations": {
              "Nxh2": {
                "rating": "best"
              }
            }
          }
        }
      }
    }
  },
  {
    "id": 10,
    "lichessId": "IAkx5",
    "rating": 1462,
    "fen": "r1b2k2/ppp1q1b1/5nQ1/3p2N1/2r5/7P/PPP3P1/5RK1 w - - 2 21",
    "toMove": "white",
    "title": {
      "en": "Pin",
      "es": "Clavada"
    },
    "hint": {
      "en": "An enemy piece cannot move without losing something more valuable.",
      "es": "Una pieza enemiga no puede moverse sin perder algo más valioso."
    },
    "solution": {
      "en": "21.Nh7+ Kg8 22.Nxf6+ Qxf6 23.Rxf6",
      "es": "21.Ch7+ Rg8 22.Cxf6+ Dxf6 23.Txf6"
    },
    "moves": {
      "Nh7+": {
        "rating": "best",
        "response": "Kg8",
        "continuations": {
          "Nxf6+": {
            "rating": "best",
            "response": "Qxf6",
            "continuations": {
              "Rxf6": {
                "rating": "best"
              }
            }
          }
        }
      }
    }
  },
  {
    "id": 11,
    "lichessId": "BNeFU",
    "rating": 1429,
    "fen": "r2q1r1k/pb4p1/1p2p3/2p1B3/3pB2P/2P1P3/PPQK1P2/R6R b - - 0 18",
    "toMove": "black",
    "title": {
      "en": "Skewer",
      "es": "Ensartada"
    },
    "hint": {
      "en": "Attack a valuable piece to win the one behind it.",
      "es": "Atacá una pieza valiosa para ganar la que está detrás."
    },
    "solution": {
      "en": "18...Rxf2+ 19.Kc1 Rxc2+",
      "es": "18...Txf2+ 19.Rc1 Txc2+"
    },
    "moves": {
      "Rxf2+": {
        "rating": "best",
        "response": "Kc1",
        "continuations": {
          "Rxc2+": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 12,
    "lichessId": "Ce8yf",
    "rating": 1440,
    "fen": "r2k1b1r/pp5p/2n1pNq1/5pBQ/3p4/2P5/PP4PP/R5K1 w - - 0 20",
    "toMove": "white",
    "title": {
      "en": "Discovered attack",
      "es": "Ataque descubierto"
    },
    "hint": {
      "en": "Move one piece to open the line for another.",
      "es": "Mové una pieza para abrirle la línea a otra."
    },
    "solution": {
      "en": "20.Nxh7+ Qxg5 21.Qxg5+",
      "es": "20.Cxh7+ Dxg5 21.Dxg5+"
    },
    "moves": {
      "Nxh7+": {
        "rating": "best",
        "response": "Qxg5",
        "continuations": {
          "Qxg5+": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 13,
    "lichessId": "LDMBw",
    "rating": 1502,
    "fen": "4rrk1/pp1q1ppp/2pp1b2/4nP2/4PB2/1BQ4P/PPP2P1K/3R2R1 b - - 6 20",
    "toMove": "black",
    "title": {
      "en": "Discovered attack",
      "es": "Ataque descubierto"
    },
    "hint": {
      "en": "Move one piece to open the line for another.",
      "es": "Mové una pieza para abrirle la línea a otra."
    },
    "solution": {
      "en": "20...Ng4+ 21.Rxg4 Bxc3",
      "es": "20...Cg4+ 21.Txg4 Axc3"
    },
    "moves": {
      "Ng4+": {
        "rating": "best",
        "response": "Rxg4",
        "continuations": {
          "Bxc3": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 14,
    "lichessId": "gjRzl",
    "rating": 1408,
    "fen": "6k1/p3P1p1/3n2Pp/3p4/r2P4/P4r2/1P3P2/1KR5 w - - 1 37",
    "toMove": "white",
    "title": {
      "en": "Deflection",
      "es": "Desviación"
    },
    "hint": {
      "en": "Pull a defender away from its key task.",
      "es": "Alejá a una pieza defensora de su tarea clave."
    },
    "solution": {
      "en": "37.Rc8+ Nxc8 38.e8=Q+ Rf8 39.Qxa4",
      "es": "37.Tc8+ Cxc8 38.e8=D+ Tf8 39.Dxa4"
    },
    "moves": {
      "Rc8+": {
        "rating": "best",
        "response": "Nxc8",
        "continuations": {
          "e8=Q+": {
            "rating": "best",
            "response": "Rf8",
            "continuations": {
              "Qxa4": {
                "rating": "best"
              }
            }
          }
        }
      }
    }
  },
  {
    "id": 15,
    "lichessId": "OIJ0Y",
    "rating": 1290,
    "fen": "r1bk1br1/5p1p/p2p1N2/2p5/Pp2PP1n/6Pq/1PP1BR1P/RN1Q2K1 b - - 2 20",
    "toMove": "black",
    "title": {
      "en": "Deflection",
      "es": "Desviación"
    },
    "hint": {
      "en": "Pull a defender away from its key task.",
      "es": "Alejá a una pieza defensora de su tarea clave."
    },
    "solution": {
      "en": "20...Rxg3+ 21.hxg3 Qxg3+ 22.Kh1 Qxf2",
      "es": "20...Txg3+ 21.hxg3 Dxg3+ 22.Rh1 Dxf2"
    },
    "moves": {
      "Rxg3+": {
        "rating": "best",
        "response": "hxg3",
        "continuations": {
          "Qxg3+": {
            "rating": "best",
            "response": "Kh1",
            "continuations": {
              "Qxf2": {
                "rating": "best"
              }
            }
          }
        }
      }
    }
  },
  {
    "id": 16,
    "lichessId": "1q4El",
    "rating": 1457,
    "fen": "r5k1/p6p/6p1/2N5/2p5/4nN1P/PRP1rRP1/6K1 b - - 4 23",
    "toMove": "black",
    "title": {
      "en": "Attraction",
      "es": "Atracción"
    },
    "hint": {
      "en": "Force an enemy piece onto a square where you can punish it.",
      "es": "Forzá a una pieza enemiga a una casilla donde puedas castigarla."
    },
    "solution": {
      "en": "23...Rxf2 24.Kxf2 Nd1+ 25.Ke2 Nxb2",
      "es": "23...Txf2 24.Rxf2 Cd1+ 25.Re2 Cxb2"
    },
    "moves": {
      "Rxf2": {
        "rating": "best",
        "response": "Kxf2",
        "continuations": {
          "Nd1+": {
            "rating": "best",
            "response": "Ke2",
            "continuations": {
              "Nxb2": {
                "rating": "best"
              }
            }
          }
        }
      }
    }
  },
  {
    "id": 17,
    "lichessId": "CA1J9",
    "rating": 1366,
    "fen": "rnb2k1r/pp1p1ppp/8/8/2q2P2/2b5/PP4PP/RN1QR1K1 w - - 0 14",
    "toMove": "white",
    "title": {
      "en": "Back-rank mate",
      "es": "Mate en la primera fila"
    },
    "hint": {
      "en": "The king has no escape on its back rank.",
      "es": "El rey no tiene escape en su primera fila."
    },
    "solution": {
      "en": "14.Qd6+ Kg8 15.Re8#",
      "es": "14.Dd6+ Rg8 15.Te8#"
    },
    "moves": {
      "Qd6+": {
        "rating": "best",
        "response": "Kg8",
        "continuations": {
          "Re8#": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 18,
    "lichessId": "sDVW2",
    "rating": 1472,
    "fen": "2r2rk1/1p3ppp/pqn1p3/3pP3/QP1P1P2/P7/3NN1PP/2R2RK1 b - - 0 19",
    "toMove": "black",
    "title": {
      "en": "Double check",
      "es": "Jaque doble"
    },
    "hint": {
      "en": "A double check can only be answered by moving the king.",
      "es": "Un jaque doble sólo se responde moviendo el rey."
    },
    "solution": {
      "en": "19...Nxd4 20.Rxc8 Nxe2+ 21.Kh1 Rxc8",
      "es": "19...Cxd4 20.Txc8 Cxe2+ 21.Rh1 Txc8"
    },
    "moves": {
      "Nxd4": {
        "rating": "best",
        "response": "Rxc8",
        "continuations": {
          "Nxe2+": {
            "rating": "best",
            "response": "Kh1",
            "continuations": {
              "Rxc8": {
                "rating": "best"
              }
            }
          }
        }
      }
    }
  },
  {
    "id": 19,
    "lichessId": "XcRHG",
    "rating": 1280,
    "fen": "5rk1/5Npp/2p5/p1P5/2Qp4/P4P2/4KP2/q7 w - - 8 40",
    "toMove": "white",
    "title": {
      "en": "Smothered mate",
      "es": "Mate ahogado"
    },
    "hint": {
      "en": "The king is surrounded by its own pieces.",
      "es": "El rey está rodeado por sus propias piezas."
    },
    "solution": {
      "en": "40.Nh6+ Kh8 41.Qg8+ Rxg8 42.Nf7#",
      "es": "40.Ch6+ Rh8 41.Dg8+ Txg8 42.Cf7#"
    },
    "moves": {
      "Nh6+": {
        "rating": "best",
        "response": "Kh8",
        "continuations": {
          "Qg8+": {
            "rating": "best",
            "response": "Rxg8",
            "continuations": {
              "Nf7#": {
                "rating": "best"
              }
            }
          }
        }
      }
    }
  },
  {
    "id": 20,
    "lichessId": "1YJUs",
    "rating": 1449,
    "fen": "rnbqk1nr/ppppbpQp/8/8/8/1P6/P1P1PPPP/RNB1KBNR b KQkq - 0 4",
    "toMove": "black",
    "title": {
      "en": "Trapped piece",
      "es": "Pieza atrapada"
    },
    "hint": {
      "en": "An enemy piece has run out of safe squares.",
      "es": "Una pieza enemiga se quedó sin casillas seguras."
    },
    "solution": {
      "en": "4...Bf6 5.Qg3 Bxa1",
      "es": "4...Af6 5.Dg3 Axa1"
    },
    "moves": {
      "Bf6": {
        "rating": "best",
        "response": "Qg3",
        "continuations": {
          "Bxa1": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 21,
    "lichessId": "9gvPD",
    "rating": 1500,
    "fen": "2r4k/6p1/7p/p6q/8/3P2P1/1PrRQ2P/1K1R4 b - - 3 36",
    "toMove": "black",
    "title": {
      "en": "X-ray attack",
      "es": "Rayos X"
    },
    "hint": {
      "en": "A piece attacks through another one.",
      "es": "Una pieza ataca a través de otra."
    },
    "solution": {
      "en": "36...Qxe2 37.Rxe2 Rxe2",
      "es": "36...Dxe2 37.Txe2 Txe2"
    },
    "moves": {
      "Qxe2": {
        "rating": "best",
        "response": "Rxe2",
        "continuations": {
          "Rxe2": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 22,
    "lichessId": "mev4t",
    "rating": 1352,
    "fen": "3rr1k1/pppq1ppp/2n3n1/2B3Q1/2B5/P2P3P/1PP2PP1/3R1RK1 b - - 10 19",
    "toMove": "black",
    "title": {
      "en": "Interference",
      "es": "Interferencia"
    },
    "hint": {
      "en": "Cut the line between two enemy pieces.",
      "es": "Cortá la línea de comunicación entre dos piezas rivales."
    },
    "solution": {
      "en": "19...Re5 20.Qc1 Rxc5",
      "es": "19...Te5 20.Dc1 Txc5"
    },
    "moves": {
      "Re5": {
        "rating": "best",
        "response": "Qc1",
        "continuations": {
          "Rxc5": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 23,
    "lichessId": "BU7yB",
    "rating": 1450,
    "fen": "R7/8/8/1k5K/1n4P1/7P/p7/8 b - - 0 55",
    "toMove": "black",
    "title": {
      "en": "Quiet move",
      "es": "Jugada tranquila"
    },
    "hint": {
      "en": "The key is neither a check nor a capture.",
      "es": "La clave no es un jaque ni una captura."
    },
    "solution": {
      "en": "55...Na6 56.Rf8 a1=Q",
      "es": "55...Ca6 56.Tf8 a1=D"
    },
    "moves": {
      "Na6": {
        "rating": "best",
        "response": "Rf8",
        "continuations": {
          "a1=Q": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 24,
    "lichessId": "XjcZ0",
    "rating": 1449,
    "fen": "2rr4/1p3p1k/1q2pPNp/8/1p3PQ1/P3p2P/6PK/5R2 w - - 1 30",
    "toMove": "white",
    "title": {
      "en": "Clearance",
      "es": "Despeje"
    },
    "hint": {
      "en": "Vacate a square or line for one of your pieces.",
      "es": "Liberá una casilla o una línea para una pieza propia."
    },
    "solution": {
      "en": "30.Nf8+ Rxf8 31.Qg7#",
      "es": "30.Cf8+ Txf8 31.Dg7#"
    },
    "moves": {
      "Nf8+": {
        "rating": "best",
        "response": "Rxf8",
        "continuations": {
          "Qg7#": {
            "rating": "best"
          }
        }
      }
    }
  },
  {
    "id": 25,
    "lichessId": "mJ9QD",
    "rating": 1377,
    "fen": "8/6k1/4K2p/p2pP1p1/1PpP4/1P4P1/P7/8 b - - 0 39",
    "toMove": "black",
    "title": {
      "en": "Promotion",
      "es": "Coronación"
    },
    "hint": {
      "en": "A passed pawn can decide the game.",
      "es": "Un peón pasado puede decidir la partida."
    },
    "solution": {
      "en": "39...c3 40.b5 c2 41.b6 c1=Q",
      "es": "39...c3 40.b5 c2 41.b6 c1=D"
    },
    "moves": {
      "c3": {
        "rating": "best",
        "response": "b5",
        "continuations": {
          "c2": {
            "rating": "best",
            "response": "b6",
            "continuations": {
              "c1=Q": {
                "rating": "best"
              }
            }
          }
        }
      }
    }
  }
]

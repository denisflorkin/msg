import React from "react";
import ReactDOM from "react-dom";
import { lt } from "./utils";
import {
  c as cScale,
  d as dScale,
  e as eScale,
} from './data/scales'

const bars = [
  cScale,
  dScale,
  eScale,
  [
    {
    range: 4,
    name: "d",
    // beatPosition: lt(8, 1, 7, 1, 4),
    type: "half"
  },
  {
    range: 4,
    name: "e",
    // beatPosition: lt(9, 1, 7, 1, 4),
    type: "half"
  },
  ]
]

const defaultRange = 4;

const notesPosition = {
  c: 40,
  d: 36,
  e: 32,
  f: 28,
  g: 24,
  a: 20,
  b: 16
};

const WIDTH = 800;
const HEIGHT = 48;

const tempoBase = 4;
const tempoRythm = 4;

export default function App() {
  return (
    <div style={{ border: "1px solid grey", padding: "32px 0" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }} >
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
          {/* base Staff */}
          {[...new Array(5)].map((_, i) => (
            <line
              x1="0"
              y1={i * 8}
              x2={WIDTH}
              y2={i * 8}
              style={{ stroke: "black", strokeWidth: 1 }}
            />
          ))}

          {/* bars */}
          {[...new Array(5)].map((_, i) => (
            <line
              x1={i * (WIDTH / tempoBase)}
              y1={0}
              x2={i * (WIDTH / tempoBase)}
              y2={32}
              style={{ stroke: "black", strokeWidth: 1 }}
            />
          ))}

          {
            bars.map((notes, barCount) => (
              console.log('barCount', barCount) ||
              notes.map(({ name, beatPosition, sharp, range }, j, list) => (
                console.log('barCount', barCount) ||
                console.log('j', j) ||
                console.log('list.length', list.length) ||
                console.log('$', lt(
                      j,

                      0,
                      list.length,

                      200,
                      400,
                      // (barCount + 0) * (WIDTH / 4),
                      // (barCount + 1) * (WIDTH / 4)
                    )) ||
                <g>
                  {
                    sharp
                      ? <text
                          style={{ fontWeight: 'thin' }}
                          x={(
                            lt( j, 0, list.length, 0, (WIDTH / 4)) + (barCount * (WIDTH / 4))
                          ) - 16}
                          y={(notesPosition[name] + 6)  - ((range - defaultRange) * 28 )}
                        >
                          #
                        </text>
                        : null
                  }
                  <circle
                    cx={ 
                      lt( j, 0, list.length, 0, (WIDTH / 4)) + (barCount * (WIDTH / 4))
                    }
                    cy={notesPosition[name] - ((range - defaultRange) * 28 )}
                    r="4"
                  />
                </g>
              ))
            ))
          }

          {/* C
          {cScale.map(({ name, beatPosition, sharp, range }) => (
            <g>
              {
                sharp
                  ? <text>#</text>
                  : null
              }
              <circle
                cx={ lt(beatPosition, 0, cScale.length, 0, 4) * (WIDTH / tempoBase / tempoRythm)}
                cy={notesPosition[name] - ((range - defaultRange) * 28 )}
                r="4"
              />
            </g>
          ))}
          */}

          {/* D
          {dScale.map(({ name, beatPosition, sharp, range }) => (
            <g>
              {
                sharp
                  ? <text
                      style={{ fontWeight: 'thin' }}
                      x={(beatPosition * (WIDTH / tempoBase / tempoRythm)) - 16}
                      y={(notesPosition[name] + 6)  - ((range - defaultRange) * 28 )}
                    >
                      #
                    </text>
                  : null
              }
              <circle
                cx={beatPosition * (WIDTH / tempoBase / tempoRythm)}
                cy={notesPosition[name] - ((range - defaultRange) * 28 )}
                r="4"
              />
            </g>
          ))}

          {/* E
          {eScale.map(({ name, beatPosition, sharp, range }) => (
            <g>
              {
                sharp
                  ? <text
                      style={{ fontWeight: 'thin' }}
                      x={(beatPosition * (WIDTH / tempoBase / tempoRythm)) - 16}
                      y={(notesPosition[name] + 6)  - ((range - defaultRange) * 28 )}
                    >
                      #
                    </text>
                  : null
              }
              <circle
                cx={beatPosition * (WIDTH / tempoBase / tempoRythm)}
                cy={notesPosition[name] - ((range - defaultRange) * 28 )}
                r="4"
              />
            </g>
          ))}
          */}
        </svg>
      </div>
    </div>
  );
}

import React from "react";
import ReactDOM from "react-dom";
import { lt } from "./utils";

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

export default function App(props) {
  const { bars } = props;

  return (
    <div style={{ padding: "32px 0" }}>
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
              notes.map(({ name, beatPosition, sharp, flat, natural, range }, j, list) => (
                <g>
                  {
                    sharp || flat || natural
                      ? <text
                          style={{ fontWeight: 'thin' }}
                          x={(
                            lt( j, 0, list.length, 0, (WIDTH / 4)) + (barCount * (WIDTH / 4))
                            + lt( 1, 0, list.length, 0, (WIDTH / 4))/2
                          ) - 16}
                          y={(notesPosition[name] + 6)  - ((range - defaultRange) * 28 )}
                        >
                          {sharp
                            ? '#'
                            : flat ? 'b' : 'n'
                          }
                        </text>
                        : null
                  }
                  <circle
                    cx={ 
                      lt( j, 0, list.length, 0, (WIDTH / 4)) + (barCount * (WIDTH / 4))
                      + lt( 1, 0, list.length, 0, (WIDTH / 4))/2
                    }
                    cy={notesPosition[name] - ((range - defaultRange) * 28 )}
                    r="4"
                  />
                </g>
              ))
            ))
          }
        </svg>
      </div>
    </div>
  );
}
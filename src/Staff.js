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
  const { bars, timeSign: { beat, measure } = {}, isFirstStaff, isTrebble = true } = props;

  const clefLeftOffset = 24
  const timeSignLeftOffset = 12

  return (
    <div style={{ padding: "32px 0" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }} >
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} style={{ overflow: 'visible' }}>
          {/* base Staff */}
          {[...new Array(5)].map((_, i) => (
            <line
              x1="0"
              y1={i * 8}
              x2={WIDTH}
              y2={i * 8}
              style={{ stroke: "black", strokeWidth: .5 }}
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
            isTrebble ? <text style={{ fontSize: '72px', fontWeight: 'thin' }} x={1} y={38.5} >&#119070;</text> : null
          }

          {
            isFirstStaff
              ? <g style={{ fontSize: '20px' }}>
                <text x={clefLeftOffset} y={16}>{beat}</text>
                <text x={clefLeftOffset} y={32}>{measure}</text>
              </g>
              : null
          }

          {
            bars.map((notes, barCount) => {
              return notes.map(({ name, beatPosition, sharp, flat, natural, range }, j, list) => {

                const isFirstBar = barCount === 0
                const isFirstNote = j === 0
                const start = 0;
                const end = list.length;

                let notationLeftOffset = 0
                if (isFirstStaff) {
                  if (isFirstBar) {
                    notationLeftOffset = clefLeftOffset + timeSignLeftOffset
                  }
                } else {
                  if (isFirstBar) {
                    notationLeftOffset = clefLeftOffset
                  }
                }

                const targetStart = 0
                const targetEnd = (WIDTH / 4) - notationLeftOffset
                const barOffset = (barCount * targetEnd) + notationLeftOffset
                const barCenteringOffset = lt( 1, start, end, targetStart, targetEnd)/2

                const baseX = lt( j, start, end, targetStart, targetEnd) + barOffset + barCenteringOffset
                  + (barCount * notationLeftOffset)

                return (
                  <g>
                    {
                      sharp || flat || natural
                        ? <text
                            style={{ fontWeight: 'thin' }}
                            x={(
                              baseX
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
                      cx={baseX}
                      cy={notesPosition[name] - ((range - defaultRange) * 28 )}
                      r="4"
                    />
                  </g>
                )
              }
            )
            })
          }
        </svg>
      </div>
    </div>
  );
}

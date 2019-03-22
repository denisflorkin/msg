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

export const WIDTH = 800;
export const HEIGHT = 48;

const tempoBase = 4;
const tempoRythm = 4;

const noteWidth = 8;

const getNoteYPosition = name => {
  const firstChar = name[0]
  const notePosition = notesPosition[firstChar.toLowerCase()]
  return notePosition || 0
}

export default function App(props) {
  const { 
    bars,
    timeSign: { beat, measure } = {},
    isFirstStaff,
    isTrebble = true,
    index,
    elapsedTime,
    beatLengthInMs,
    playing,
  } = props;

  const clefLeftOffset = 24
  const timeSignLeftOffset = 12

  const staffTimeRangeStart = (
    (index * (beat * measure))
    * beatLengthInMs
  )
  const staffTimeRangeEnd = (
    ((index + 1) * (beat * measure))
    * beatLengthInMs
  )

  const shouldRenderPlayHeadOnThisStaff = (
    (
      elapsedTime >= staffTimeRangeStart
    ) && (
      elapsedTime < staffTimeRangeEnd
    )
  )

  let playHeadLeftOffset = -1
  if (shouldRenderPlayHeadOnThisStaff) {
    playHeadLeftOffset = lt(elapsedTime, staffTimeRangeStart, staffTimeRangeEnd, 0, WIDTH)
  }

  return (
    <div style={{
      padding: "32px 0",
      ...(playing && !shouldRenderPlayHeadOnThisStaff ? { opacity: .4 } : {}),
    }}
  >
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
              return notes.map(({ name, midiValue, /* beatPosition,  sharp, flat,  natural , range */ }, j, list) => {
                const natural = false
                const sharp = (name.indexOf('#') > -1)
                const flat = (name.indexOf('b') > -1)
                const rangeMatches = name.match(/^[^\d]*(\d){1}/)
                const range = rangeMatches && parseInt(rangeMatches[1], 10)
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

                // const currentNoteYPosition = getNoteYPosition(name);
                const textCurrentNoteYPosition = (
                  getNoteYPosition(name)
                  - ((range - defaultRange) * 28)
                );

                const currentNoteYPosition = (
                  getNoteYPosition(name)
                  - ((range - defaultRange) * 28 )
                );

                return (
                  <g>
                    {
                      sharp || flat || natural
                        ? <text
                            style={{ fontWeight: 'thin' }}
                            x={(
                              baseX
                            ) - 16}
                            y={textCurrentNoteYPosition + 6}
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
                      cy={currentNoteYPosition}
                      r={noteWidth/2}
                    />
                  </g>
                )
              }
            )
            })
          }

          {
            shouldRenderPlayHeadOnThisStaff && playHeadLeftOffset > -1 && (
              <line
                x1={playHeadLeftOffset}
                y1={0}
                x2={playHeadLeftOffset}
                y2={HEIGHT}
                style={{
                  // stroke: 'rebeccapurple',
                  stroke: 'rgba(102, 51, 153, 0.6)',
                  strokeWidth: noteWidth,
                }}
              />
            )
          }
        </svg>
      </div>
    </div>
  );
}

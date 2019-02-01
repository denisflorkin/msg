import React from "react";
import Staff from "./Staff"
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
    type: "half"
  },
  {
    range: 4,
    name: "e",
    type: "half"
  },
  ]
]
const staffsData = [
  [...bars],
  bars.reverse(),
]

export default function App() {
  return (
    <div style={{ padding: '16px' }}>
      {
        staffsData.map(bars => (
          <Staff bars={bars} />
        ))
      }
    </div>
  );
}

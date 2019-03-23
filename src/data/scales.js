import { lt } from '../utils'
import sweetNotes from '../sweetNotes'

const getNoteFromMidiValue = midiVal => sweetNotes[midiVal] || null;

export const devCScale = [60, 60, 60, 60, 60, 60, 60, 60].map(getNoteFromMidiValue);
export const cNotes = [60, 62, 64, 65, 67, 69, 71, 72];
export const c = cNotes.map(getNoteFromMidiValue)

export const cSharpNotes = [61, 63, 65, 66, 68, 70, 72, 73];
export const cSharp = cSharpNotes.map(getNoteFromMidiValue)
/*[
  {
    range: 4,
    name: "c",
    sharp: true,
    type: "half"
  },
  {
    range: 4,
    name: "d",
    sharp: true,
    type: "half"
  },
  {
    range: 4,
    name: "f",
    type: "half"
  },
  {
    range: 4,
    name: "f",
    sharp: true,
    type: "half"
  },
  {
    range: 4,
    name: "g",
    sharp: true,
    type: "half"
  },
  {
    range: 4,
    name: "a",
    sharp: true,
    type: "half"
  },
  {
    range: 5,
    name: "c",
    type: "half"
  },
  {
    range: 5,
    name: "c",
    sharp: true,
    type: "half"
  }
];*/

export const d = [
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
  {
    range: 4,
    name: "f",
    sharp: true,
    type: "half"
  },
  {
    range: 4,
    name: "g",
    type: "half"
  },
  {
    range: 4,
    name: "a",
    type: "half"
  },
  {
    range: 4,
    name: "b",
    type: "half"
  },
  {
    range: 5,
    name: "c",
    sharp: true,
    type: "half"
  },
  {
    range: 5,
    name: "d",
    type: "half"
  }
];

export const e = [
  {
    range: 4,
    name: "e",
    type: "half"
  },
  {
    range: 4,
    name: "f",
    sharp: true,
    type: "half"
  },
  {
    range: 4,
    name: "g",
    sharp: true,
    type: "half"
  },
  {
    range: 4,
    name: "a",
    type: "half"
  },
  {
    range: 4,
    name: "b",
    type: "half"
  },
  {
    range: 5,
    name: "c",
    sharp: true,
    type: "half"
  },
  {
    range: 5,
    name: "d",
    sharp: true,
    type: "half"
  },
  {
    range: 5,
    name: "e",
    type: "half"
  }
];


export default {
  c,
  d,
  e,
}

import React from 'react';
// import notesDefinition from './notesDefinition'
import sweetNotes from './sweetNotes'

class Midi extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      supports: null,
      acquired: null,
      currentNotes: [],
    }
  }

  onNoteOn(note) {
    console.log('onNoteOn note', note)
    const { currentNotes } = this.state;
    console.log('onNoteOn currentNotes', currentNotes)

    const extendedNotes = this.state.currentNotes.concat([note])

    console.log('onNoteOn filteredCurrentNsotes', extendedNotes)

    this.setState({
      currentNotes: extendedNotes
    })
  }

  onNoteOff(note) {
    console.log('onNoteOff note', note)
    const { currentNotes } = this.state;
    console.log('onNoteOff currentNotes', currentNotes)

    const filteredCurrentNsotes = currentNotes.filter(n => n.name !== note.name)

    console.log('onNoteOff filteredCurrentNsotes', filteredCurrentNsotes)

    this.setState({
      currentNotes: filteredCurrentNsotes,
    })
  }

  onMidiMsg = (midiMessage) => {
    console.log(midiMessage);
    const { 
      timeStamp,
      data: [ cmd, midiVal, velocity ] = [],
    } = midiMessage;

    // var command = data[0];
    // var noteMidiValue = data[1];
    // var velocity = (data.length > 2) ? data[2] : 0; // a velocity value might not be included with a noteOff command

    const noteBase = sweetNotes.find(n => n.midiValue === midiVal)

    console.log('noteBase', noteBase)

    const note = {
      ...noteBase,
      cmd,
      cmdName: cmd === 144 ? 'on' : (cmd === 128 ? 'off' : undefined),
      midiVal,
      velocity,
    }


    console.log('##### note', note)

     switch (cmd) { // eslint-disable-line default-case
      case 144: // noteOn
        if (velocity > 0) { // TODO make this an option as it might not be true for all hardware
          this.onNoteOn(note);
        } else {
          this.onNoteOff(note);
        }
        break;
      case 128: // noteOff
        this.onNoteOff(note);
        break;
      // we could easily expand this switch statement to cover other types of commands such as controllers or sysex
    }

  }

  midiSuccess = (midiAccess) => {
    this.midiAccess = midiAccess
      console.log(midiAccess);

    var inputs = midiAccess.inputs;
    var outputs = midiAccess.outputs;

    for (var input of midiAccess.inputs.values()) {
      input.onmidimessage = this.onMidiMsg;
    }


    this.setState({ acquired: true })
  }

  midiFailure = () => {
    console.log('fok DAT FailED')
  }

  componentDidUpdate(prevProps, prevState) {
    const { supports, acquired } = this.state;

    if (!acquired && supports !== prevState.supports) {
      navigator.requestMIDIAccess()
        .then(this.midiSuccess, this.midiFailure);
    }
  }

  componentDidMount() {
     if (navigator.requestMIDIAccess) {
      console.log('This browser supports WebMIDI!');
      this.setState({ supports: true })
    } else {
      console.log('WebMIDI is not supported in this browser.');
    }
  }

  render () {
    const { acquired, currentNotes } = this.state;


    return (
      <div>
        <div>acquired ? 'Midi acquired' : null</div>
        <h1 style={{ fontSize: '3rem' }}>
          {
            currentNotes.map(note => (
              <div key={note.name}>{note.name} <small>({note.velocity})</small></div>
            ))
          }
        </h1>
      </div>
    )
  }
}


export default Midi

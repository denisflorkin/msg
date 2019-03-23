import React from 'react';
// import notesDefinition from './notesDefinition'
import sweetNotes from './sweetNotes'
import { lt } from './utils';
import { WIDTH } from './Staff';


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
    // console.log('onNoteOn note', note)
    const { currentNotes } = this.state;
    // console.log('onNoteOn currentNotes', currentNotes)

    const extendedNotes = this.state.currentNotes.concat([note])

    // console.log('onNoteOn filteredCurrentNsotes', extendedNotes)

    this.setState({
      currentNotes: extendedNotes
    })
  }

  onNoteOff(note) {
    // console.log('onNoteOff note', note)
    const { currentNotes } = this.state;
    // console.log('onNoteOff currentNotes', currentNotes)

    const filteredCurrentNsotes = currentNotes.filter(n => n.name !== note.name)

    // console.log('onNoteOff filteredCurrentNsotes', filteredCurrentNsotes)

    this.setState({
      currentNotes: filteredCurrentNsotes,
    })
  }

  onMidiMsg = (midiMessage) => {
    // console.log(midiMessage);
    const { 
      timeStamp,
      data: [ cmd, midiVal, velocity ] = [],
    } = midiMessage;

    // var command = data[0];
    // var noteMidiValue = data[1];
    // var velocity = (data.length > 2) ? data[2] : 0; // a velocity value might not be included with a noteOff command

    const noteBase = sweetNotes.find(n => n.midiValue === midiVal)

    // console.log('noteBase', noteBase)

    const note = {
      ...noteBase,
      // cmd,
      // cmdName: cmd === 144 ? 'on' : (cmd === 128 ? 'off' : undefined),
      // midiVal,
      // velocity,
    }


    // console.log('##### note', note)

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
      // console.log(midiAccess);

    var inputs = midiAccess.inputs;
    var outputs = midiAccess.outputs;

    for (var input of midiAccess.inputs.values()) {
      input.onmidimessage = this.onMidiMsg;
    }


    this.setState({ acquired: true })
  }

  midiFailure = () => {
    // console.log('fok DAT FailED')
  }

  componentDidUpdate(prevProps, prevState) {
    const { supports, acquired } = this.state;
    const {
      playing,
      staffsData,
      timeSign: { beat, measure } = {},
      elapsedTime,
      beatLengthInMs,
    } = this.props;

    const shouldUpdate = (playing && elapsedTime - prevProps.elapsedTime)

    // console.log('componentDidUpdate in Midi', shouldUpdate)


    if (!acquired && supports !== prevState.supports) {
      navigator.requestMIDIAccess()
        .then(this.midiSuccess, this.midiFailure);
        return
    }

    if (shouldUpdate) {
      const staffIndex = staffsData.findIndex((staff, idx) => {
        const staffTimeRangeStart = (
          (idx * (beat * measure))
          * beatLengthInMs
        )
        const staffTimeRangeEnd = (
          ((idx + 1) * (beat * measure))
          * beatLengthInMs
        )

        const shouldRenderPlayHeadOnThisStaff = (
          (
            elapsedTime >= staffTimeRangeStart
          ) && (
            elapsedTime < staffTimeRangeEnd
          )
        )
        if (shouldRenderPlayHeadOnThisStaff) {
          return true
        }
        return false
      })

      const theStaff =  staffsData[staffIndex]


      const staffTimeRangeStart = (
        (staffIndex * (beat * measure))
        * beatLengthInMs
      )
      const staffTimeRangeEnd = (
        ((staffIndex + 1) * (beat * measure))
        * beatLengthInMs
      )

      // const theBarIdx = Math.round(elapsedTime % measure)
      const theBarIdx = Math.floor(lt(elapsedTime, staffTimeRangeStart, staffTimeRangeEnd, 0, measure))

      console.log('theBarIdx', theBarIdx)


      const shouldRenderPlayHeadOnThisStaff = (
        (
          elapsedTime >= staffTimeRangeStart
        ) && (
          elapsedTime < staffTimeRangeEnd
        )
      )

      // const shouldRenderPlayHeadOnThisStaffAndBar = (
      //   (shouldRenderPlayHeadOnThisStaff)
      //   &&
      //   (
      //     elapsedTime < staffTimeRangeEnd
      //   )
      // )

      let noteIdxToPlay = undefined
      if (shouldRenderPlayHeadOnThisStaff) {
        if (theBarIdx === Infinity) {
          return
        }

        const totalStaffTimeRangeLength = staffTimeRangeEnd - staffTimeRangeStart

        noteIdxToPlay = Math
          .round(
            lt(
              elapsedTime,
              // staffTimeRangeStart,
              0,
              // staffTimeRangeEnd / 4,
              totalStaffTimeRangeLength / 4,
              0,
              (theStaff || []).length - 1
            )
          )

        console.log('noteIdxToPlay', noteIdxToPlay)

        const noteToPlay = (
          theStaff[theBarIdx]
          && theStaff[theBarIdx][noteIdxToPlay] &&
          theStaff[theBarIdx][noteIdxToPlay]
        )

        if (noteToPlay) {
          const newState = { noteToPlay };
          this.setState(newState)
          // console.log('updated state of midi with', newState)
        } else {
          const newState = { noteToPlay: null };
          this.setState(newState)
          // console.log('updated state of midi with', newState)
        }

      }
    }


  }

  componentDidMount() {
    window.storeState = []
     if (navigator.requestMIDIAccess) {
      // console.log('This browser supports WebMIDI!');
      this.setState({ supports: true })
    } else {
      // console.log('WebMIDI is not supported in this browser.');
    }
  }

  render () {
    const { acquired, currentNotes, noteToPlay } = this.state;
    const {
      staffsData,
      playing,
      elapsedTime,
      tempo,
      timeSign,
      beatLengthInMs,
      index = 0,
      timeSign: { beat, measure } = {},
    } = this.props;


    window.storeState = [ ...(window.storeState || []), { ...this.state } ]

    // const hit = currentNotes.includes(noteToPlay)
    const hit = currentNotes
      .find(y => y.name === (noteToPlay && noteToPlay.name))



    return (
      <div>
        <div>{acquired ? 'Midi acquired! 🎹 👌' : null}</div>

        <div>
          {
            noteToPlay !== undefined && (
              <pre>
                {
                  JSON.stringify(noteToPlay)
                }
              </pre>
            )
          }
          <div
            style={{
              background: hit ? 'green' : 'red',
              width: '200px' ,
              height: '200px'
            }}
          >
          </div>
        </div>

         <h1 style={{ fontSize: '3rem' }}>
          {
            currentNotes.map(note => (
              <div key={note.name}>{note.name} <small>({note.midiValue})</small></div>
            ))
          }
        </h1>
      </div>
    )
  }
}


export default Midi

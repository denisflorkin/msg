import React, { Component } from "react";
import { css } from "styled-components"
import Staff from "./Staff"
import ThemeProvider from 'uxi/Theme/ThemeProvider'
import TextField from 'uxi/Input/TextField'
import Select from 'uxi/Input/Select'
import Start from 'uxi/Icons/Start'
import RangeInput from 'uxi/Input/RangeInput'
import Flex from 'uxi/Layout/Flex'
import UnstyledButton from 'uxi/Button/UnstyledButton1'
import OutlineButton from 'uxi/Button/OutlineButton'
import Midi from './Midi'
import {
  c as cScale,
  cSharp as cSharpScale,
  // d as dScale,
  // e as eScale,
} from './data/scales'
import { Stop } from "uxi/Icons";
import sweetNotes from './sweetNotes'

const styles = css`
  svg {
    circle, text {
      fill: #3d3d3d;
    }
  }
`.join('\n');

const bars = [
  cScale,
  cSharpScale,
  [],
  [],
  // cScale,
  // cScale,
  // cScale,
  // dScale,
  // eScale,
]
const staffsData = [
  [...bars],
  // [...bars],
  // bars.reverse(),
]

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      timeSign: { beat: 4, measure: 4 },
      tempo: 120,
      playing: false,
      audioContext: {},
      startTime: 0,
      mainKeyMidiValue: 60,
    }
  }

  componentDidMount() {
    const audioContext = new AudioContext()
    this.setState({ audioContext });
  }

  componentDidUpdate(prevProps, prevState) {
    const { playing } = this.state;

    if (playing !== prevState.playing) {
      if (playing) {
        this.initRaf()
      } else {
        this.cleartRaf()
      }
    }

  }

  initRaf () {
    this.rafRef = requestAnimationFrame(this.update)
    this.setState({ startTime: this.state.audioContext.currentTime })
  }
  cleartRaf () {
    if (this.rafRef) {
      cancelAnimationFrame(this.rafRef )
    }
  }

  update = () => {
    console.log('update')
    this.setState({ currentTime: this.state.audioContext.currentTime })
    this.rafRef = requestAnimationFrame(this.update)
  }

  render () {
    const { 
      tempo,
      playing,
      audioContext,
      startTime,
      currentTime,
      timeSign,
      mainKeyMidiValue,
    } = this.state;

    const elapsedTime = currentTime - startTime

    const beatLengthInMs = (60 / tempo);

    return (
      <ThemeProvider>
        <style dangerouslySetInnerHTML={{ __html: styles }} />
        <div style={{ padding: '16px' }}>
        <Flex>
          <h4>Rythm signature</h4>
          <TextField defaultValue={"4"} onChange={(e, v) => this.setState({ timeSign: { ...this.state.timeSign, beat: v,  }}) } />
          /
          <TextField defaultValue={"4"} onChange={(e, v) => this.setState({ timeSign: { ...this.state.timeSign, measure: v,  }}) } />
        </Flex>
        <Flex>
          <h4>key: </h4>
            <Select
              style={{ width: '200px' }}
              value={mainKeyMidiValue}
              onChange={(ev, val) => { this.setState({ mainKeyMidiValue: val })}}
            >
              {
                sweetNotes.map(({ name, midiValue }) => (
                  <Flex value={midiValue}>{name}</Flex>
                ))
              }
              <Flex value="C#">C#</Flex>
              <Flex value="D">D</Flex>
              <Flex value="D#">D#</Flex>
              <Flex value="E">E</Flex>
              <Flex value="F">F</Flex>
              <Flex value="F#">F#</Flex>
              <Flex value="G">G</Flex>
              <Flex value="G#">G#</Flex>
              <Flex value="A">A</Flex>
              <Flex value="A#">A#</Flex>
              <Flex value="B">B</Flex>
            </Select>
        </Flex>
        <Flex>
          <Flex style={{ width: '520px' }}>
            <Flex style={{ width: '140px' }}>
              tempo: {tempo}
            </Flex>
            <RangeInput
              min={1}
              max={200}
              onChange={({ target: { value: tempo } = {} }) => {
                this.setState({ tempo })
              }}
            />
          </Flex>
        </Flex>
        <hr />
        <Flex>
          <Flex style={{ flex: 1, justifyContent: 'flex-start' }} >
            <OutlineButton
              onClick={() => {
                this.setState((state) => ({ playing: !state.playing }))
              }}
              text={!playing ? 'Start' : 'Stop'}
              icon={!playing ? <Start /> : <Stop />}
            />
          </Flex>
          <Flex style={{ flex: 1, justifyContent: 'flex-start' }} >
            <div>startTime</div>
            <div style={{ flex: 1, justifyContent: 'flex-start' }}>{(startTime)}</div>
          </Flex>
          <Flex style={{ flex: 1, justifyContent: 'flex-start' }} >
            <div>currentTime</div>
            <div style={{ flex: 1, justifyContent: 'flex-start' }}>{(currentTime)}</div>
          </Flex>
          <Flex style={{ flex: 1, justifyContent: 'flex-start' }} >
            <div>elapsedTime</div>
            <div style={{ flex: 1 }}>{(elapsedTime)}</div>
          </Flex>
        </Flex>
        <hr />
          {
            staffsData.map((bars, i) => (
              <Staff
                key={i}
                isFirstStaff={i === 0}
                bars={bars}
                index={i}
                timeSign={ this.state.timeSign }
                playing={playing}
                elapsedTime={elapsedTime}
                tempo={elapsedTime}
                timeSign={timeSign}
                beatLengthInMs={beatLengthInMs}
              />
            ))
          }
        </div>
        <hr />
        <br />
        <br />
        <Midi />
      </ThemeProvider>
    );
  }
}

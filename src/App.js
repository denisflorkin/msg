import React, { Component } from "react";
import { css } from "styled-components"
import Staff from "./Staff"
import ThemeProvider from 'uxi/Theme/ThemeProvider'
import TextField from 'uxi/Input/TextField'
import Select from 'uxi/Input/Select'
import Flex from 'uxi/Layout/Flex'
import {
  c as cScale,
  cSharp as cSharpScale,
  d as dScale,
  e as eScale,
} from './data/scales'

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
  dScale,
  eScale,
]
const staffsData = [
  [...bars],
  [...bars],
  // bars.reverse(),
]

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      timeSign: { beat: 4, measure: 4 }
    }
  }

  render () {

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
        <Flex><h4>key: </h4><Select>
            <Flex value="C">C</Flex>
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
        <hr />
          {
            staffsData.map((bars, i) => (
              <Staff isFirstStaff={i === 0} bars={bars} timeSign={ this.state.timeSign } />
            ))
          }
        </div>
      </ThemeProvider>
    );
  }
}

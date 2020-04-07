import React from "react";
import constants from "./constants";

export default function App() {
  const handleClick = () => {
    console.log('&&&&&&&&&&&&&&&&&&&&')
    console.log(constants);

    // mainProcess.writeMidiFile();
    var JZZ = require('jzz');
    require('jzz-midi-smf')(JZZ);

    var smf = new JZZ.MIDI.SMF(0, 96);
    smf.push(new JZZ.MIDI.SMF.MTrk());

    smf[0].add(0, JZZ.MIDI.smfBPM(120)) // tempo 120 bpm
      .add(0, JZZ.MIDI.noteOn(0, 'C6', 127))
      .add(0, JZZ.MIDI.noteOn(0, 'Eb6', 127))
      .add(0, JZZ.MIDI.noteOn(0, 'G6', 127))
      .add(96, JZZ.MIDI.noteOff(0, 'C6'))
      .add(96, JZZ.MIDI.noteOff(0, 'Eb6'))
      .add(96, JZZ.MIDI.noteOff(0, 'G6'))
      .add(288, JZZ.MIDI.smfEndOfTrack());

    require('fs').writeFileSync('out.mid', smf.dump(), 'binary');
  };

  return (
    <div onClick={handleClick}>Open File</div>
  );
}

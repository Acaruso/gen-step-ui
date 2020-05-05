const fs = require('fs');
const JZZ = require('jzz');
require('jzz-midi-smf')(JZZ);
import constants from "./constants";


const writeSong = (fileName, song) => {
  const smf = new JZZ.MIDI.SMF(1, constants.resolution);

  let trackIdx = 0;

  for (const track of song.tracks) {
    smf.push(new JZZ.MIDI.SMF.MTrk());

    for (const note of track.notes) {
      addNote(note.note, note.tick, note.dur, note.vel, smf[trackIdx])
    }

    trackIdx++;
  }

  writeMidiFile(fileName, smf);
};

const writeMidiFile = (fileName, smf) => {
  fs.writeFileSync(fileName, smf.dump(), 'binary');
};

const addNote = (note, tick, dur, vel, track) => {
  // add to channel 0
  track.add(tick, JZZ.MIDI.noteOn(0, note, vel));
  track.add(tick + dur, JZZ.MIDI.noteOff(0, note));
};

export { writeSong, writeMidiFile, addNote };

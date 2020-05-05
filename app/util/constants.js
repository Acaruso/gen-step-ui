const constants = {
  resolution: 960,
  quarter: 960,
  eighth: 480,
  quarterTriplet: 320,
  sixteenth: 240,
  eighthTriplet: 160,
  testSong: {
    tracks: [
      {
        name: "t1",
        notes: [
          { note: 1, tick: 0, dur: 960, vel: 100 },
          { note: 2, tick: 960, dur: 960, vel: 100 }
        ]
      },
      {
        name: "t2",
        notes: [
          { note: 3, tick: 0, dur: 960, vel: 100 },
          { note: 4, tick: 960, dur: 960, vel: 100 }
        ]
      }
    ]
  }
};

export default constants;

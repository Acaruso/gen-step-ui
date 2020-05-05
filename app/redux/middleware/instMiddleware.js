import * as Tone from 'tone';

const instMiddleware = (store) => {
  // need to keep tonejs insturments outside of redux store because they are non-serializable
  // can put them here and they will persist for lifetime of application
  const insts = {};

  return next => action => {
    switch (action.type) {
      case 'tracks/addTrack':
        const res = next(action);
        
        const ids = store.getState().tracks.ids;
        const lastAddedId = ids[ids.length - 1];

        // const synth = new Tone.Synth();
        // const channel = new Tone.Channel(-30).toMaster();
        // synth.connect(channel);

        const sampler = new Tone.Sampler();
        const channel = new Tone.Channel(-10).toMaster();
        sampler.connect(channel);

        insts[lastAddedId] = sampler;

        return res;

      case 'tracks/triggerEvent':
        const { id, event, time } = action.payload;

        // if event.note is empty string, make it C4
        const note = event.note.length === 0 ? 'C4' : event.note;

        insts[id].triggerAttackRelease(note, '16n', time);
        return next(action);

      case 'tracks/loadSample':
        let { trackId, filePath } = action.payload;

        const enc = encodeURIComponent('#');
        filePath = filePath.replace('#', enc)

        insts[trackId].add('C4', filePath);

        return next(action);

      default:
        return next(action);
    }
  }
}

export default instMiddleware;

import * as Tone from 'tone';

const instMiddleware = (store) => {
  const insts = {};

  return next => action => {
    switch (action.type) {
      case 'tracks/addTrack':
        const res = next(action);
        
        const ids = store.getState().tracks.ids;
        const lastAddedId = ids[ids.length - 1];

        const synth = new Tone.Synth();
        const channel = new Tone.Channel(-30).toMaster();
        synth.connect(channel);

        insts[lastAddedId] = synth;

        return res;

      case 'tracks/triggerEvent':
        const id = action.payload.id;
        const event = action.payload.event;
        const note = event.note.length === 0 ? 'C3' : event.note;

        insts[id].triggerAttackRelease(note, '8n');
        return next(action);

      default:
        return next(action);
    }
  }
}

export default instMiddleware;
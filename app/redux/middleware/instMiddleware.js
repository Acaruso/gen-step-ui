import * as Tone from 'tone';

const instMiddleware = (store) => {
  const insts = [];

  return next => action => {
    console.log('middleware')
    console.log('action type: ' + action.type)

    switch (action.type) {
      case 'tracks/addTrack':
        const synth = new Tone.Synth();
        const channel = new Tone.Channel(-30).toMaster();
        synth.connect(channel);

        insts.push(synth);
        
        console.log('insts')
        console.log(insts)

        break;

      case 'tracks/triggerEvent':
        console.log('trigger event')
        insts[0].triggerAttackRelease('C3', '8n');
        
        break;
      }

    next(action);
  }
}

export default instMiddleware;
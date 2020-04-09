export function testAction(payload) {
  return { type: "TEST_ACTION", payload }
}

let trackId = 1;

function uniqueTrackId() {
  return trackId++;
}

export function addTrack(payload) {
  const newPayload = {
    id: uniqueTrackId(),
    ...payload
  };

  return { type: "ADD_TRACK", payload: newPayload }
}

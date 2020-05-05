function createEvent(type) {
  if (type === "note") {
    return {
      type: "note",
      active: true,
      note: "C4",
      vel: "100",
      dur: "8n",
      id: "",
    }
  } else if (type === "rest") {
    return {
      type: "rest",
      active: false,
      note: "",
      vel: "",
      dur: "",
      id: "",
    }
  }
}

export { createEvent };
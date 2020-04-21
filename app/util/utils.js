function createEvent(type) {
  if (type === "note") {
    return {
      type: "note",
      active: true,
      note: "",
      vel: "",
      dur: "",
    }
  } else if (type === "rest") {
    return {
      type: "rest",
      active: false,
      note: "",
      vel: "",
      dur: "",
    }
  }
}

export { createEvent };
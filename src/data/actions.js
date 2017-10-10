// the reducer will need these
export const UPDATE_MOUSEDOWN = Symbol("UPDATE_MOUSEDOWN");
export const UPDATE_DIAL = Symbol("UPDATE_DIAL");
export const UPDATE_DIALMOUSELEAVE = Symbol("UPDATE_DIALMOUSELEAVE");
export const UPDATE_FADER = Symbol("UPDATE_FADER");
export const UPDATE_FADERMOUSELEAVE = Symbol("UPDATE_FADERMOUSELEAVE");

// the container will need these
export const updateMouseDown = (bool) => ({
    type: UPDATE_MOUSEDOWN,
    bool,
});

export const updateDial = (event, id) => ({
    type: UPDATE_DIAL,
    event,
    id,
});

export const updateDialMouseLeave = (event, id) => ({
    type: UPDATE_DIALMOUSELEAVE,
    event,
    id,
});

export const updateFader = (event, id) => ({
    type: UPDATE_FADER,
    event,
    id,
});

export const updateFaderMouseLeave = (event, id) => ({
    type: UPDATE_FADERMOUSELEAVE,
    event,
    id,
});
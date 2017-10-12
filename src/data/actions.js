// the reducer will need these
export const UPDATE_MOUSEDOWN = Symbol("UPDATE_MOUSEDOWN");
export const MOUSELEAVE = Symbol("MOUSELEAVE");
export const UPDATE_DIAL = Symbol("UPDATE_DIAL");
export const UPDATE_FADER = Symbol("UPDATE_FADER");
export const ONCLICK_SQUARE = Symbol("ONCLICK_SQUARE");

// the container will need these
export const updateMouseDown = (bool) => ({
    type: UPDATE_MOUSEDOWN,
    bool,
});

export const mouseLeave = (event, id) => ({
    type: MOUSELEAVE,
    event,
    id,
});

export const updateDial = (event, id) => ({
    type: UPDATE_DIAL,
    event,
    id,
});

export const updateFader = (event, id) => ({
    type: UPDATE_FADER,
    event,
    id,
});

export const onClickSquare = (id) => ({
    type: ONCLICK_SQUARE,
    id,
});
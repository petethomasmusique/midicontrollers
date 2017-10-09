// the reducer will need these
export const UPDATE_MOUSEDOWN = Symbol("UPDATE_MOUSEDOWN");
export const UPDATE_MOUSEMOVE = Symbol("UPDATE_MOUSEMOVE");
export const UPDATE_MOUSELEAVE= Symbol("UPDATE_MOUSELEAVE");

// the container will need these
export const updateMouseDown = (bool) => ({
    type: UPDATE_MOUSEDOWN,
    bool,
});

export const updateMouseMove = (event, id) => ({
    type: UPDATE_MOUSEMOVE,
    event,
    id,
});

export const updateMouseLeave = (event, id) => ({
    type: UPDATE_MOUSELEAVE,
    event,
    id,
});
export const ONMOUSEDOWN_FADERDIAL = Symbol("ONMOUSEDOWN_FADERDIAL");
export const ONMOUSELEAVE_FADERDIAL = Symbol("ONMOUSELEAVE_FADERDIAL");
export const UPDATE_DIAL = Symbol("UPDATE_DIAL");
export const UPDATE_FADER = Symbol("UPDATE_FADER");
export const ONMOUSEDOWN_SQUARE = Symbol("ONMOUSEDOWN_SQUARE")
export const ONMOUSEUP_SQUARE = Symbol("ONMOUSEUP_SQUARE")
export const SET_SINGLESQUARE = Symbol("SET_SINGLESQUARE");
export const SET_WHOLEGRID = Symbol("SET_WHOLEGRID");
export const SET_ROW = Symbol("SET_ROW");
export const SET_COLUMN = Symbol("SET_COLUMN");

/********************************************************************/
/*Dials and Faders **************************************************/
/********************************************************************/

export const onMouseDownFaderDial = (bool) => ({
    type: ONMOUSEDOWN_FADERDIAL,
    bool,
});

export const onMouseLeaveFaderDial = (event, id) => ({
    type: ONMOUSELEAVE_FADERDIAL,
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

/********************************************************************/
/*Grid **************************************************************/
/********************************************************************/

export const setSingleSquare = (data) => ({
    type: SET_SINGLESQUARE,
    data,
})

export const setWholeGrid = (data) => ({
    type: SET_WHOLEGRID,
    data,
})

export const setRow = (data) => ({
    type: SET_ROW,
    data,
})

export const setColumn = (data) => ({
    type: SET_COLUMN,
    data,
})

export const onMouseDownSquare = (id) => ({
    type: ONMOUSEDOWN_SQUARE,
    id,
});

export const onMouseUpSquare = (id) => ({
    type: ONMOUSEUP_SQUARE,
    id,
});
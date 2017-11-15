# MIDI-Gooey
### A project made with React, Redux, WebMidi.js and (optionally) MAXMSP to handle the sound. 
The aim of this project is to build a completely neutral controller to make interacting with data fluid and flexible on a project by project basis. Credit to <a href="https://github.com/cotejp/webmidi">WebMidi.js</a> for an excellent library that simplifies use of the Web Midi API and <a href="https://monome.org/">Monome</a>, whose beautifully designed Grid I'm using as inspiration.

### Local Install
- To install app locally, you need Create-React-App. In the command line run:
`npm install -g create-react-app`
- 
- Once installed, download app from this repo and, in the home directory, ensure you have the correct dependencies:
`npm install`
- All should be well and you can start up MIDI-Gooey
`npm start`
- Develop to your heart's content. To bundle the results for use in production mode run:
`npm build`

### Using the app
- Choose midi in and midi out devices from dropdown menu. If dropdowns are empty you have no available midi devices. 
- Dials and Faders send values 0-127 as midi control messages
- Grid makes use of sysex messages to send x, y, z - where x, y are co-ordinates and z is mousedown (1) and mouseup (0).
- Sysex messages are received and processed in a slightly more complex way...

- [0, g, x, y, z] set single square
- [1, g, z] set grid ( z is the value)
- [2, g, y, z...] set row (y is the row, z... are the values. If only one z value, sets whole row)
- [3, g, x, z....] set column (x is the column, z are the values)

- Sounds hellish? The MAXMSP patch handles this for you

### MAXMSP
Messages to grid:
- setSquare x y value
- setGrid value
- setRow y value(s) (single value sets whole row)
- setColumn x value(s) (single value sets whole column)
- setGridNumber value

### Work in Progress - TODOs:

- Work on the MAXMSP patch
- Assignable faders and dials (can change port in the app)

App bits and bobs
- lots of duplicate code in fader/dial to tidy up
- duplicate function set column and set row
# MIDI controller
### A project made with React, Redux, WebMidi.js and (optionally) MAXMSP to handle the sound. 

Work in Progress:

To do:

- Add example MAXMSP patch to project.
- Assignable faders and dials (can change port in the app)
- Write proper documentation(!)

Complete grid SysEx receive functionality:
- handle recieve message
- how will it handle the led's lighting up
- how will it handle the clock?
- optional messages to clear all data?

App bits and bobs
- Error handling/user messages (in a seperate component)
- Choosing a MIDI device (dropdown?)
- Error handling when no MIDI device is available
- Title
- Instructions
- switch off cursor highlighting default
- lots of duplicate code in fader/dial to tidy up

The aim of this project is to build a completely neutral controller to make interacting with data fluid and flexible on a project by project basis. Credit to <a href="https://github.com/cotejp/webmidi">WebMidi.js</a> for an excellent library that simplifies use of the Web Midi API and <a href="https://monome.org/">Monome</a>, whose beautifully designed Grid I'm using as inspiration.

### Dial and Fader

Output values of 0-127 through sending control messages.

### Grid

Based on Monome Grid and is intended as a blank canvas with complete seperation of concerns, functionality handled by whatever programme you're using to handle the sound. 

Outputs x,y,z: where x,y are co-ordinates (from 0,0 to 15,7) and y is 1 for mouse down and 0 for mouse up.
Uses Midi SysEx messages to send and receive values.


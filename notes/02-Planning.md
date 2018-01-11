# Planning

## Components
![screen shot 2018-01-07 at 9 41 53 am](https://user-images.githubusercontent.com/523933/34650421-1d990014-f38f-11e7-9335-48db39d406a5.png)

### Sequencer
Seems that the whole drum-machine should be called a sequencer which is responsible for:
* Fetching Data
* Maintaining State
  + Playing? Stopped?
  + BPM
* Handling User Input Events

### Controls
Components that affect the state of the sequencer ex. 
* Name
* Play/Stop
* BPM
* Sequences

### Tracks
Tracks are independent* parts of the sequencer, track have beats and "Rompler's" or instruments if we don't want to get too fancy

### Beats
Likely has a sound file to play, an indication of on off and should have an understanding of where it lives in the overall "sequence"


## Sequencer Data Model
* Note I just stole the splice API to get things up and running, quickly

![screen shot 2018-01-07 at 10 08 32 am](https://user-images.githubusercontent.com/523933/34650659-c42ef0de-f392-11e7-96f0-3916a2ea6e96.png)

Example Responses
- https://spliceblob.splice.com/beats/krne.json
- https://spliceblob.splice.com/beats/capsun.json

  


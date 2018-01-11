/**
 * UI Components
 */
const app = document.getElementById('app')
const playPause = document.getElementById('playPause')
const speed = document.getElementById('speed')

/**
 * State
 */
let state = {
	currIteration: 0,
	data: false,
	interval: false,
	iterations: 16,
	lastNodes: [],
	playing: false,
	timeout: 128,
}

/**
 * Hook up our UI Event listeners
 */
speed.addEventListener('change', modifyBPM)
playPause.addEventListener('click', togglePlay) 

/**
 * [runSequence description]
 * @return {[type]} [description]
 */
function runSequence(){
	state.interval = setInterval(() => {

		if( state.lastNodes.length > 0 ) {
			state.lastNodes.map(node => {
				toggleClass(node, 'beat-on')
			})
			state.lastNodes = []
		}

		state = Object.assign(state, {
			currIteration: state.currIteration < (state.iterations - 1) ? state.currIteration + 1 : 0
		})
		
		let nodes = document.querySelectorAll('.beat-' + state.currIteration);
		for(var i = 0; i < nodes.length; i++) {
			state.lastNodes.push(nodes[i])
			toggleClass(nodes[i], 'beat-on')
		}

	}, state.timeout)
}

/**
 * [changePlayButtonText description]
 * @param  {[type]} playing [description]
 * @return {[type]}         [description]
 */
function changePlayButtonText() {
	playPause.innerHTML = state.playBtnText
}

/**
 * [modifyBPM description]
 * @return {[type]} [description]
 */
function modifyBPM(e){
	state = Object.assign(state, {
		timeout: Math.floor(60000 / e.target.value) // @note this math isn't write
	})
	togglePlay()
	togglePlay()
}

/**
 * [togglePlay description]
 * @return {[type]} [description]
 */
function togglePlay(){

	if( state.playing ) {
		clearInterval(state.interval)
		state = Object.assign(state, {
			playBtnText: 'Play',
			playing: ! state.playing
		}, state)
		changePlayButtonText()
		return true
	}

	state = Object.assign(state, {
		playBtnText: 'Stop',
		playing: ! state.playing
	})
	changePlayButtonText()

	runSequence()

}

/**
 * [template Take a string and object and return a string of html]
 * @param  {string} str [<div>{test.yo}</div>]
 * @param  {object} obj [data to render]
 * @return {string}     [the template and data full rendered]
 */
function template(str, obj) {
	const keys = Object.keys(obj)
	keys.map(item => {
		let regex = new RegExp(`{${item}}`, 'g');
		str = str.replace(regex, obj[item]);
	})
	return str
}

/**
 * [toggleClass from http://youmightnotneedjquery.com/]
 * @param  {DOM} el []
 * @return {sideeffect}    []
 */
function toggleClass(el, className) {
	if (el.classList) {
		el.classList.toggle(className);
	} else {
		var classes = el.className.split(' ');
		var existingIndex = classes.indexOf(className);

		if (existingIndex >= 0)
		  classes.splice(existingIndex, 1);
		else
		  classes.push(className);

		el.className = classes.join(' ');
	}
}

/**
 * [fetchSequence description]
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
function fetchSequence( id ) {
	const sequences = {
		'1': {
			name: "JS-808",
			sampleMap: [
				'Kick',
				'Snare',
				'Open Hat',
				'Closed Hat'
			],
			pattern: {
				seq: {
					bpm: 128,
					patternTracks: [
						{
							steps:[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0]
						},
						{
							steps:[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0]
						},
						{
							steps:[0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0]
						},
						{
							steps:[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0]
						}
					]
				}
			}
		},
		'2': {},
		'3': {},
	}
	return sequences[id] ? sequences[id] : sequences['1']
}

/**
 * [renderBeatNumbers description]
 * @return {[type]} [description]
 */
function renderBeatNumbers(){
	let str = ""

	if( ! state.data ) {
		return str
	}

	let beatTemplate = `
	<div class="col-15">
	  <div class="beat-number">{idx}</div>
	</div>
	`

	for (let i = 0; i < state.iterations; i++) {
		str += template(beatTemplate, { idx : i + 1 })
	}

	return `<div class="flex space-evenly">${ str }</div>`
}

/**
 * [renderBeats description]
 * @param  {[type]} beat [description]
 * @return {[type]}      [description]
 */
function renderTrackBeats(idx, track) {
	let beatTemplate = `
	<div class="col-15">
		<div class="beat {customClass}">
		    <div class="beat-inner track-{trackIdx} beat-{beatIdx}"></div>
		</div>
	</div>
	`
	return track.steps.map((beat, jdx) => {
		  let tD = {
 				trackIdx: idx, 
 				beatIdx: jdx, 
 				customClass: beat ? 'beat--active' : '' 
		  }
			return template(beatTemplate, tD)
	}).join('')
}

/**
 * [renderTracks description]
 * @return {[type]} [description]
 */
function renderTracks(){
	if( ! state.data ) {
		return ""
	}
	return state.data.pattern.seq.patternTracks.map((track, idx) => {
		return `<div class="track flex space-evenly white">${ renderTrackBeats(idx, track) }</div>`
	}).join('')
}

/**
 * [render description]
 * @return {[type]} [description]
 */
function render() {
	app.innerHTML = [
		renderBeatNumbers(),
		renderTracks()
	].join('')
}

/**
 * [description]
 * @param  {[type]} "DOMContentLoaded" [description]
 * @param  {[type]} (                  [description]
 * @return {[type]}                    [description]
 */
document.addEventListener("DOMContentLoaded", () => {
	state.data = fetchSequence()
	render();
})

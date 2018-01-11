/**
 * All THE FUNCTIONAL STUFF
 */

let interval
let state = {
	playing: false,
	currIteration: 0,
	timeout: 128,
	iterations: 16,
	lastNodes: []
}

let playPause = document.getElementById('playPause')
let speed = document.getElementById('speed')
speed.addEventListener('change', changeRate)
playPause.addEventListener('click', togglePlay) 

function togglePlay() {
	state.playing ? stop() : play()
}

function execute() {		
	interval = setInterval(() => {

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

function play() {
	console.log('SEQUENCER: PLAY')
	state = Object.assign(state, {
		playing: true
	})
	execute()
}

function stop() {
	console.log('SEQUENCER: STOP')
	state = Object.assign(state, {
		playing: false
	})
	clearInterval(interval)
}

function changeRate( e ) {
	console.log('SEQUENCER: CHANGE RATE')
	let rate = e.target.value
	state = Object.assign(state, {
		timeout: Math.floor(60000 / rate)
	})
	stop()
	play()
}

/**
 * ALL THE RENDER STUFFF
 */

/**
 * Listen for DOMContentLoaded -> Kick the tires and Light the fires
 * https://www.youtube.com/watch?v=2F1bMG9wzXY
 */
let app;
document.addEventListener("DOMContentLoaded", boot)

/**
 * [boot Start the app]
 * @return {null, side-effect}
 */
function boot() {
	app = document.getElementById('app')
	const ui = fullRender(getSequence(), getControls())
	appendToEl(app, ui)
}

/**
 * [fullRender description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function fullRender(data, controls) {
	
	let sequenceLength = 0;
	data.pattern.seq.patternTracks.map(track => {
		if( track.steps.length > sequenceLength ) {
			sequenceLength = track.steps.length
		}
	})

	let numbers = "";
	for(var i = 0; i < sequenceLength; i++) {
		numbers += renderNumberColumn({ idx: i + 1 })
	}

	numbers = ['<div class="flex space-evenly">', numbers, '</div>'].join('')

	let tracks = data.pattern.seq.patternTracks.map((track, idx) => {
		
		let trackStr = track.steps.map((beat, jdx) => {
			return renderBeat({ active : beat, trackIdx: idx, beatIdx: jdx  })
		}).join('')

		return ['<div class="flex space-evenly">', trackStr, '</div>'].join('')

	}).join('');

	return numbers + tracks
}

function renderBeat( data ) {
	if( data.active ) {
		return template(`
			<div class="col-15">
				<div class="beat beat--active track-{trackIdx} beat-{beatIdx}">
				    <div class="beat-inner"></div>
				</div>
			</div>
		`, data)
	} else {
		return template(`
			<div class="col-15">
				<div class="beat">
				    <div class="beat-inner track-{trackIdx} beat-{beatIdx}"></div>
				</div>
			</div>
		`, data)
	}
}

function renderNumberColumn( data ) {
	return template(`
		<div class="col-15">
		  <div class="beat-number">{idx}</div>
		</div>
	`, data)
}

function renderColumn( data ) {
	return template(`
		<div class="col-15">
		  <div class="beat-number">{idx}</div>
		  {beats}
		</div>
	`, data)
}

/**
 * [render description]
 * @param  {[type]} el   [description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function appendToEl(el, str) {
	el.innerHTML = str
}

/**
 * [getSequence Dummy Code to return the 4onTheFloor sequence]
 * @return {object}
 */
function getSequence() {
	return {
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
	}
}

/**
 * [getControls description]
 * @return {arr} [description]
 */
function getControls() {
	return [
		{
			name: 'Play'
		},
		{
			name: 'Stop'
		}
	]
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
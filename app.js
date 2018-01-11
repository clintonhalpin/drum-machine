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

}

/**
 * [modifyBPM description]
 * @return {[type]} [description]
 */
function modifyBPM(){

}

/**
 * [togglePlay description]
 * @return {[type]} [description]
 */
function togglePlay(){

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
	let str = "";

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
 * [renderTracks description]
 * @return {[type]} [description]
 */
function renderTracks(){
	return "Hi, I'm tracks thooooo"
}

/**
 * [render description]
 * @return {[type]} [description]
 */
function render() {
	const appStr = [
		renderBeatNumbers(),
		renderTracks()
	].join('')
	app.innerHTML = appStr
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

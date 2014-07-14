//(function(){

// web audio environment stuff
var waapi = new window.webkitAudioContext();

var osc = waapi.createOscillator();
osc.type = Math.floor(Math.random()*4);

var filter = waapi.createBiquadFilter();
filter.type = filter.LOWPASS;
var filterRelease = Math.random()*2;

var amp = waapi.createGainNode();
amp.gain.value = 0;
var ampAttack = Math.random()*2;

//synthesizer structure
osc.connect(filter);
filter.connect(amp);
amp.connect(waapi.destination);

// turn it on
var playing = false;

function playNote(freq,options){
	if(!playing){
		playing = true;
		osc.start(0);
	}
	osc.frequency.value = freq;
}

// Attack
function oscOn(){
	var now = waapi.currentTime;
	amp.gain.cancelScheduledValues( now );
	amp.gain.setValueAtTime(amp.gain.value, now);
	amp.gain.linearRampToValueAtTime(1 , now + ampAttack);
	filter.frequency.cancelScheduledValues( now );
	filter.frequency.setValueAtTime(2000,now);
	filter.frequency.linearRampToValueAtTime(0 , now + filterRelease );
}

// Release
function oscOff(){
	var now = waapi.currentTime;
	amp.gain.cancelScheduledValues( now );
	amp.gain.setValueAtTime(amp.gain.value, now);
	amp.gain.linearRampToValueAtTime(0 , now + 2);
}

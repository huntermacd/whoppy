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
	filter.frequency.linearRampToValueAtTime(0 , now + filterRelease);
}

// Release
function oscOff(){
	var now = waapi.currentTime;
	amp.gain.cancelScheduledValues( now );
	amp.gain.setValueAtTime(amp.gain.value, now);
	amp.gain.linearRampToValueAtTime(0 , now + 2);
}


//}());

/*
// shared variables
var i;

var context = new webkitAudioContext();

// node synthesizes and processes audio
// (buffer size, # of inputs channels, # of output channels)
var node = context.createJavaScriptNode(1024, 1, 1);

// get default sample rate
freq = context.sampleRate / 2 * Math.PI;


// class which wraps audio node and wave generation logic up together
SineWave = function(context) {
	var that = this;
	this.x = 0; // initial sample #
	this.context = context;
	this.node = context.createJavaScriptNode(1024, 1, 1);
	this.sample_rate = this.context.sampleRate;
	this.frequency = 440;
	this.node.onaudioprocess = function(e) { that.process(e) };
};

SineWave.prototype.process = function(e) {
    var data = e.outputBuffer.getChannelData(0);
    for (var i = 0; i < data.length; ++i) {
        data[i] = Math.sin(this.x++ / (this.sample_rate / (this.frequency * 2 * Math.PI)));
    }
};

SineWave.prototype.play = function() {
	this.node.connect(this.context.destination);
};

SineWave.prototype.pause = function() {
	this.node.disconnect();
};

var key_list = ["a", "a-sharp", "b", "c", "c-sharp", "d", "d-sharp", "e", "f", "f-sharp", "g", "g-sharp"];
var variable_prefix = "var el_";

for (var i = 0; i < key_list.length; ++i){
	this[variable_prefix + key_list[i]] = document.getElementById(key_list[i]);
}

el_a.addEventListener("mousedown", function(){ play(440); }, false);
el_a.addEventListener("mouseup", stop, false);

var sinewave = new SineWave(context);

function play(freq) {
	sinewave.frequency = freq;
	sinewave.play();
}

function stop() {
	sinewave.pause();
}


////
*/

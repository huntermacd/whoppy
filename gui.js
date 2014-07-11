// (function(){
	var changeKeyDiv = document.getElementById("change-key");
	var changekeyState = false;
	var a = document.getElementById("a");
	var aSharp = document.getElementById("a-sharp");
	var b = document.getElementById("b");
	var c = document.getElementById("c");
	var cSharp = document.getElementById("c-sharp");
	var d = document.getElementById("d");
	var dSharp = document.getElementById("d-sharp");
	var e = document.getElementById("e");
	var f = document.getElementById("f");
	var fSharp = document.getElementById("f-sharp");
	var g = document.getElementById("g");
	var gSharp = document.getElementById("g-sharp");
	var keys = document.querySelectorAll('#player div');

	function changeKey(keyName){
		if(changekeyState){
			// for every div, execute following code
			for(var i = 0; i < keys.length; i++){
				// remove all instances of highlight class
				keys[i].classList.remove("highlight");
				// if current div has class that matches keyName
				if (keys[i].classList.contains(keyName)) {
					// add highlight class to that div
					keys[i].classList.add("highlight");
				}
			}
		}
	}

	changeKeyDiv.ontouchstart = function(){
		changekeyState = true;
	};

	changeKeyDiv.ontouchend = function(){
		changekeyState = false;
	};

	changeKeyDiv.onmousedown = function(){
		changekeyState = true;
	};

	function noteOn(id,freq){
		console.log(id,freq);
		playNote(freq);
		oscOn();
		changeKey(id);
	}

	function noteOff(){
		oscOff();
	}

	for(var i=0; i<keys.length; i++){
		keys[i].onmousedown = function(event){
			noteOn(this.id, this.dataset.freq);
			changekeyState = false;
			event.preventDefault();
		};
		keys[i].ontouchstart = function(event) {
			noteOn(this.id, this.dataset.freq);
			event.preventDefault();
		};
		keys[i].onmouseup = noteOff;
		keys[i].ontouchend = noteOff;
	}
// })();

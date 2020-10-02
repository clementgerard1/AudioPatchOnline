/**
 * @class AudioManager
 * @classdesc AudioManager manage audio graph and settings
 * @hideconstructor
 */
class AudioManager{

	static audioContext = null;
	static volume = null;

	/**
		Get audio context of the window
		@returns {AudioContext} 
		@static
	*/
	static getAudioContext(){
		if(this.audioContext == null) this.initManager();
		return this.audioContext;
	}

	/** 
		Audio Manager initialisation
		@static
	*/
	static initManager(){
		this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
		this.volume = this.audioContext.createGain();
		this.volume.gain.setValueAtTime(0, this.audioContext.currentTime);
		this.volume.connect(this.audioContext.destination);
	}

	/**
		Connect two nodes
		@returns {bool} 
		@static
	*/
	static connect(input, output, i, j){
		input.connect(output);
		return true;
	}

	/**
		Set output volume
		@param {number} volume [0,1]
		@param {number} volume [0,1]
		@static
	*/
	static setDestinationVolume(f, time = 0.1){
		this.volume.gain.linearRampToValueAtTime(f, this.audioContext.currentTime + time);
	}

	/**
		Get Destination node
		@returns {AudioNode}
		@static
	*/
	static getDestination(){
		return this.volume;
	}

}

export default AudioManager;
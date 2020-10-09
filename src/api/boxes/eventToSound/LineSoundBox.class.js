import EventToSoundBox from "../../interfaces/EventToSoundBox.class.js";
import InputConnectable from "../../interfaces/InputConnectable.class.js";
import OutputConnectable from "../../interfaces/OutputConnectable.class.js";
import Line from "./aw/Line.aw.js";
import AudioManager from "../../AudioManager.class.js";

class LineSoundBox extends EventToSoundBox{

	#node;

	constructor(){
		super();

		this.setName("line~");

		// if(typeof AudioManager.getAudioContext().audioWorklet !== 'undefined'){

		// 	const blobURL = URL.createObjectURL(new Blob([Line], { type: 'application/javascript' }));
		// 	//AudioWorklet
		// 	AudioManager.getAudioContext().audioWorklet.addModule(blobURL).then(() => {
		// 	  this.#node = new AudioWorkletNode(AudioManager.getAudioContext(), 'line', {
		// 	  	numberOfInputs: 0,
  //         numberOfOutputs: 1
		// 	  })


		// 		const input0 = new InputConnectable(this);
		// 		this.addConnectable(input0, "input0");
		// 		this.setInputConnectable(0, "input0");
		// 		input0.setValue(this.#node);

		// 		const output = new OutputConnectable(this);

		// 		output.setValue(this.#node);
		// 		this.addConnectable(output, "output0");
		// 		this.setOutputConnectable(0, "output0");
		// 	});

		// }else{
		// 	//ScriptProcessor
		// 	this.#node = that.context.createScriptProcessor(512, 2, 1);

		// 	this.#node.onaudioprocess = function(audioProcessingEvent) {
			  
		// 		const inputBuffer = audioProcessingEvent.inputBuffer;
		// 	  const outputBuffer = audioProcessingEvent.outputBuffer;

		//   	for(var i = 0 ; i < inputBuffer.numberOfChannels ; i++){
		//   		var input = inputBuffer.getChannelData(i);
		//   		var output = outputBuffer.getChannelData(i);

		//       for(var j = 0 ; j < input.length ; j++){
		//         output[j] = input[j] * Math.cos(that.phase[i] * 2 * Math.PI);
		//       }

	 //  		}
	 //  	}
		// }


	}

}
export default LineSoundBox;
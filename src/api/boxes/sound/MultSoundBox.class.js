import SoundProcessBox from "../../interfaces/SoundProcessBox.class.js";
import InputConnectable from "../../interfaces/InputConnectable.class.js";
import OutputConnectable from "../../interfaces/OutputConnectable.class.js";
import Mult from "./aw/Mult.aw.js";
import AudioManager from "../../AudioManager.class.js";

class MultSoundBox extends SoundProcessBox{

	#node;

	constructor(){
		super();

		this.setName("*~");

		if(typeof AudioManager.getAudioContext().audioWorklet !== 'undefined'){

			const blobURL = URL.createObjectURL(new Blob([Mult], { type: 'application/javascript' }));
			//AudioWorklet
			AudioManager.getAudioContext().audioWorklet.addModule(blobURL).then(() => {
			  this.#node = new AudioWorkletNode(AudioManager.getAudioContext(), 'mult', {
			  	numberOfInputs: 2,
          numberOfOutputs: 1
			  })


				const input0 = new InputConnectable(this);
				this.addConnectable(input0, "input0");
				this.setInputConnectable(0, "input0");
				input0.setValue(this.#node);

				const input1 = new InputConnectable(this);
				this.addConnectable(input1, "input1");
				this.setInputConnectable(1, "input1");
				input1.setValue(this.#node);

				const output = new OutputConnectable(this);
				output.setValue(this.#node);

				this.addConnectable(output, "output0");
				this.setOutputConnectable(0, "output0");
			});

		}else{
			//ScriptProcessor
			this.#node = that.context.createScriptProcessor(512, 2, 1);

			this.#node.onaudioprocess = function(audioProcessingEvent) {
			  
				const inputBuffer = audioProcessingEvent.inputBuffer;
			  const outputBuffer = audioProcessingEvent.outputBuffer;

		  	for(var i = 0 ; i < inputBuffer.numberOfChannels ; i++){
		  		var input = inputBuffer.getChannelData(i);
		  		var output = outputBuffer.getChannelData(i);

		      for(var j = 0 ; j < input.length ; j++){
		        output[j] = input[j] * Math.cos(that.phase[i] * 2 * Math.PI);
		      }

	  		}
	  	}
		}


	}

}
export default MultSoundBox;
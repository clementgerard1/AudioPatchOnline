import EventToSoundBox from "../../interfaces/EventToSoundBox.class.js";
import InputConnectable from "../../interfaces/InputConnectable.class.js";
import OutputConnectable from "../../interfaces/OutputConnectable.class.js";
import AudioManager from "../../AudioManager.class.js";

class CycleSoundBox extends EventToSoundBox{

	#osc;

	constructor(){
		super();

		this.setName("cycle~");

		const input = new InputConnectable(this);
		this.addConnectable(input, "input0");
		this.setInputConnectable(0, input);

		const output = new OutputConnectable(this);
		this.#osc = AudioManager.getAudioContext().createOscillator();
		this.#osc.start();
		output.setValue(this.#osc);
		this.addConnectable(output, "output0");
		this.setOutputConnectable(0, output);

	}

	process(){
		this.#osc.frequency.setValueAtTime(this.getInputConnectable(0).getValue(), AudioManager.getAudioContext().currentTime);
	}

}
export default CycleSoundBox;
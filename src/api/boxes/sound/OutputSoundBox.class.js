import SoundOutputBox from "../../interfaces/SoundOutputBox.class.js";
import InputConnectable from "../../interfaces/InputConnectable.class.js";
import AudioManager from "../../AudioManager.class.js";

class OutputSoundBox extends SoundOutputBox{

	#dac;

	constructor(){

		super();

		this.setName("dac~");

		const input = new InputConnectable(this);
		this.addConnectable(input, "input0");
		this.#dac = AudioManager.getDestination();
		input.setValue(this.#dac);
		this.setInputConnectable(0, input);

	}

}
export default OutputSoundBox;
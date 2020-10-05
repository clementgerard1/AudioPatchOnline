import SoundInputBox from "../../interfaces/SoundInputBox.class.js";
import OutputConnectable from "../../interfaces/OutputConnectable.class.js";
import AudioManager from "../../AudioManager.class.js";
import ParamConnectable from "../../interfaces/ParamConnectable.class.js";

class CycleSoundBox extends SoundInputBox{

	#osc;

	constructor(){
		super();

		this.setName("cycle~");

		const output = new OutputConnectable(this);
		this.#osc = AudioManager.getAudioContext().createOscillator();
		this.#osc.start();
		output.setValue(this.#osc);
		this.addConnectable(output, "output0");
		this.setOutputConnectable(0, "output0");

		const frequency = new ParamConnectable(this);
		frequency.setValue(440);
		this.addConnectable(frequency, "frequency");
		this.setParamConnectable("frequency");

	}

	process(){
		this.#osc.frequency.setValueAtTime(parseInt(this.getConnectableByName("frequency").getValue()), AudioManager.getAudioContext().currentTime);
	}

}
export default CycleSoundBox;
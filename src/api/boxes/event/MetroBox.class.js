import EventInputBox from "../../interfaces/EventInputBox.class.js";
import OutputConnectable from "../../interfaces/OutputConnectable.class.js";

class MetroBox extends EventInputBox{

	#time;
	#previousTriggerDate;

	constructor(){
		
		super();

		this.setName("metro");

		this.#time = 1000; //ms
		this.#previousTriggerDate = null;

		const output = new OutputConnectable(this);
		this.addConnectable(output, "output0");
		this.setOutputConnectable(0, output);

	}

	process(){
		if(this.#previousTriggerDate == null || (Date.now() - this.#previousTriggerDate) >= this.#time){
			this.#previousTriggerDate = Date.now();
			this.outputProcess();
		}
	}

	outputProcess(){
		const outputs = this.getOutputConnections();
		for(let o in outputs){
			outputs[o].process();
		}
	}

}
export default MetroBox;
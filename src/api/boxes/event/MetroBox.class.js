import EventInputBox from "../../interfaces/EventInputBox.class.js";
import OutputConnectable from "../../interfaces/OutputConnectable.class.js";
import ParamConnectable from "../../interfaces/ParamConnectable.class.js";

class MetroBox extends EventInputBox{

	#previousTriggerDate;

	constructor(){
		
		super();

		this.setName("metro");

		this.#previousTriggerDate = null;

		const output = new OutputConnectable(this);
		this.addConnectable(output, "output0");
		this.setOutputConnectable(0, "output0");


		const time = new ParamConnectable(this);
		time.setValue(100);
		this.addConnectable(time, "time");
		this.setParamConnectable("time");

	}

	process(){
		if(this.#previousTriggerDate == null || (Date.now() - this.#previousTriggerDate) >= this.getConnectableByName("time").getValue()){
			this.#previousTriggerDate = Date.now();
			this.outputProcess();
		}
	}

	outputProcess(){
		const outputs = this.getOutputConnections();
		const outputOrders = this.getOutputConnectionOrders();
		for(let o in outputOrders){
			outputs[outputOrders[o]].process();
		}
	}

	forceProcess(){
		this.#previousTriggerDate = null;
		this.process();
	}

}
export default MetroBox;
import EventProcessBox from "../../interfaces/EventProcessBox.class.js";
import InputConnectable from "../../interfaces/InputConnectable.class.js";
import OutputConnectable from "../../interfaces/OutputConnectable.class.js";
import ParamConnectable from "../../interfaces/ParamConnectable.class.js";

class NumberBox extends EventProcessBox{

	constructor(){
		super();

		this.setName("text");

		const input = new InputConnectable(this);
		this.addConnectable(input, "input0");
		this.setInputConnectable(0, "input0");

		const output = new OutputConnectable(this);
		this.addConnectable(output, "output0");
		this.setOutputConnectable(0, "output0");

		const text = new ParamConnectable("number", this);
		text.setValue(0.0);
		this.addConnectable(text, "value");
		this.setParamConnectable("value");
	}

	process(){
		this.getOutputConnectable(0).setValue(this.getConnectableByName("value").getValue());
		const outputs = this.getOutputConnections();
		const outputOrders = this.getOutputConnectionOrders();
		for(let o in outputOrders){
			outputs[outputOrders[o]].process();
		}
	}

}
export default NumberBox;
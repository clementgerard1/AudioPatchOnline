import EventProcessBox from "../../interfaces/EventProcessBox.class.js";
import InputConnectable from "../../interfaces/InputConnectable.class.js";
import OutputConnectable from "../../interfaces/OutputConnectable.class.js";
import ParamConnectable from "../../interfaces/ParamConnectable.class.js";

class GateBox extends EventProcessBox{

	constructor(){
		super();

		this.setName("gate");

		const input = new InputConnectable(this);
		this.addConnectable(input, "input0");
		this.setInputConnectable(0, "input0");

		const input1 = new InputConnectable(this);
		this.addConnectable(input1, "input1");
		this.setInputConnectable(1, "input1");

		const output = new OutputConnectable(this);
		this.addConnectable(output, "output0");
		this.setOutputConnectable(0, "output0");

	}

	process(){
		if(this.getInputConnectable(0).getValue()){
			this.getOutputConnectable(0).setValue(this.getInputConnectable(1).getValue());
			const outputs = this.getOutputConnections();
			const outputOrders = this.getOutputConnectionOrders();
			for(let o in outputOrders){
				outputs[outputOrders[o]].process();
			}
		}
	}

}
export default GateBox;
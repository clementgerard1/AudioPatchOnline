import EventProcessBox from "../../interfaces/EventProcessBox.class.js";
import InputConnectable from "../../interfaces/InputConnectable.class.js";
import OutputConnectable from "../../interfaces/OutputConnectable.class.js";
import ParamConnectable from "../../interfaces/ParamConnectable.class.js";

class RandomBox extends EventProcessBox{

	constructor(){
		super();

		this.setName("random");

		const input = new InputConnectable(this);
		this.addConnectable(input, "input0");
		this.setInputConnectable(0, "input0");

		const output = new OutputConnectable(this);
		this.addConnectable(output, "output0");
		this.setOutputConnectable(0, "output0");

		const min = new ParamConnectable(this);
		min.setValue(300);
		this.addConnectable(min, "min");
		this.setParamConnectable("min");

		const max = new ParamConnectable(this);
		max.setValue(1000);
		this.addConnectable(max, "max");
		this.setParamConnectable("max");

	}

	process(){
		this.getOutputConnectable(0).setValue(Math.random() * (parseFloat(this.getConnectableByName("max").getValue()) - parseFloat(this.getConnectableByName("min").getValue())) + parseFloat(this.getConnectableByName("min").getValue()));
		const outputs = this.getOutputConnections();
		const outputOrders = this.getOutputConnectionOrders();
		for(let o in outputOrders){
			outputs[outputOrders[o]].process();
		}
	}

}
export default RandomBox;
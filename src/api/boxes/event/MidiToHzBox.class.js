import EventProcessBox from "../../interfaces/EventProcessBox.class.js";
import InputConnectable from "../../interfaces/InputConnectable.class.js";
import OutputConnectable from "../../interfaces/OutputConnectable.class.js";

class MidiToHzBox extends EventProcessBox{

	constructor(){
		super();

		this.setName("midiToHz");

		const input = new InputConnectable(this);
		this.addConnectable(input, "input0");
		this.setInputConnectable(0, "input0");

		const output = new OutputConnectable(this);
		this.addConnectable(output, "output0");
		this.setOutputConnectable(0, "output0");
	}

	process(){
		//const result = 69 + 12 * Math.log2(this.getInputConnectable(0).getValue() / 440);
		const result = Math.pow(2, (this.getInputConnectable(0).getValue() - 69) / 12) * 440;
		this.getOutputConnectable(0).setValue(result);
		const outputs = this.getOutputConnections();
		const outputOrders = this.getOutputConnectionOrders();
		for(let o in outputOrders){
			outputs[outputOrders[o]].process();
		}
	}

}
export default MidiToHzBox;
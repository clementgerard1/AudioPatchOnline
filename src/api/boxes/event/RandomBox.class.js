import EventProcessBox from "../../interfaces/EventProcessBox.class.js";
import InputConnectable from "../../interfaces/InputConnectable.class.js";
import OutputConnectable from "../../interfaces/OutputConnectable.class.js";

class RandomBox extends EventProcessBox{

	#min;
	#max;

	constructor(){
		super();

		this.setName("random");

		const input = new InputConnectable(this);
		this.addConnectable(input, "input0");
		this.setInputConnectable(0, input);

		const output = new OutputConnectable(this);
		this.addConnectable(output, "output0");
		this.setOutputConnectable(0, output);

		this.#min = 400;
		this.#max = 1200;
	}

	process(){
		this.getOutputConnectable(0).setValue(Math.random() * (this.#max - this.#min) + this.#min);
		const outputs = this.getOutputConnections();
		const outputOrders = this.getOutputConnectionOrders();
		for(let o in outputOrders){
			outputs[outputOrders[o]].process();
		}
	}

}
export default RandomBox;
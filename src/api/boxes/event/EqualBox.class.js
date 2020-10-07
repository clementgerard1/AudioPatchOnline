import EventProcessBox from "../../interfaces/EventProcessBox.class.js";
import InputConnectable from "../../interfaces/InputConnectable.class.js";
import OutputConnectable from "../../interfaces/OutputConnectable.class.js";
import ParamConnectable from "../../interfaces/ParamConnectable.class.js";
import ArrayConnectable from "../../interfaces/ArrayConnectable.class.js";

class EqualBox extends EventProcessBox{

	constructor(){
		super();

		this.setName("==");

		const input = new InputConnectable(this);
		this.addConnectable(input, "input0");
		this.setInputConnectable(0, "input0");

		const output = new OutputConnectable(this);
		this.addConnectable(output, "output0");
		this.setOutputConnectable(0, "output0");

		const outputType =  new ParamConnectable("check", this);
		outputType.setValue(false);
		this.addConnectable(outputType, "output index");
		this.setParamConnectable("output index");

		const tests = new ArrayConnectable(this);
		tests.setArrayType("text");

		const test = new ParamConnectable("text", this);
		test.setValue("0");
		tests.addConnectable(test);

		this.addConnectable(tests, "tests");
		this.setParamConnectable("tests");

	}

	process(){
		let result = false;
		let index = -1;
		let count = -1;
		const tests = this.getConnectableByName("tests").getConnectables();
		for(let t in tests){
			count++;
			if(this.getInputConnectable(0).getValue() + "" == tests[t].getValue()){
				result = true; 
				index = count;
				break;
			}
		}
		if(this.getConnectableByName("output index").getValue()){
			this.getOutputConnectable(0).setValue(index);
		}else{
			this.getOutputConnectable(0).setValue(result);
		}
		const outputs = this.getOutputConnections();
		const outputOrders = this.getOutputConnectionOrders();
		for(let o in outputOrders){
			outputs[outputOrders[o]].process();
		}
	}

}
export default EqualBox;
import EventOutputBox from "../../interfaces/EventOutputBox.class.js";
import InputConnectable from "../../interfaces/InputConnectable.class.js";
import ParamConnectable from "../../interfaces/ParamConnectable.class.js";

class LogBox extends EventOutputBox{

	constructor(){
		super();
		this.setName("log");

		const input = new InputConnectable(this);
		this.addConnectable(input, "input0");
		this.setInputConnectable(0, "input0");

		const name = new ParamConnectable("text", this);
		name.setValue("log");
		this.addConnectable(name, "name");
		this.setParamConnectable("name");

	}

	process(){
		console.log(this.getConnectableByName("name").getValue(), this.getInputConnectable(0).getValue());
	}

}
export default LogBox;
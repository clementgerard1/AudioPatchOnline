import EventOutputBox from "../../interfaces/EventOutputBox.class.js";
import InputConnectable from "../../interfaces/InputConnectable.class.js";

class LogBox extends EventOutputBox{

	#logName;

	constructor(name = "log"){
		super();

		this.#logName = name;
		this.setName("log");

		const input = new InputConnectable(this);
		this.addConnectable(input, "input0");
		this.setInputConnectable(0, input);

	}

	process(){
		console.log(this.#logName, this.getId(), this.getInputConnectable(0).getValue());
	}

}
export default LogBox;
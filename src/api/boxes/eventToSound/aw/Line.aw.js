export default `

class Mult extends AudioWorkletProcessor {

	static get parameterDescriptors() {
    return [];
  }

	constructor(options) {
    super(options);
  }
 
  process (inputs, outputs, parameters) {
  	const output = outputs[0];

  	for(var i = 0 ; i < output.length ; i++){
      for(var j = 0 ; j < output[i].length ; j++){
          output[i][j] = 0;
      }
    }
  	
	  return true;
  }

}

registerProcessor('line', Mult);

`;
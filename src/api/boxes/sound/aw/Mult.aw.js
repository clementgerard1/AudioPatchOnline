export default `

class Mult extends AudioWorkletProcessor {

	static get parameterDescriptors() {
    return [];
  }

	constructor(options) {
    super(options);
  }
 
  process (inputs, outputs, parameters) {
    const input1 = inputs[0];
    const input2 = inputs[1];
  	const output = outputs[0];

  	for(var i = 0 ; i < input1.length ; i++){
      for(var j = 0 ; j < input1[i].length ; j++){
        if(typeof input2[i] != "undefined"){
          output[i][j] = input1[i][j] * input2[i][j];
        }else{
          output[i][j] = 0;
        }
      }
    }
  	
	  return true;
  }

}

registerProcessor('mult', Mult);

`;
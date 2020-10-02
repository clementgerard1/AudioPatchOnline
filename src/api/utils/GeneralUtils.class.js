/**
 * @class GeneralUtils
 * @classdesc GeneralUtils provide general tools
 * @hideconstructor
 */
class GeneralUtils{

	static ids = {
		"default" : 0
	}

	/**
		Get new id by category
		@param {string} [type="default"] name of the category of ids
		@returns {int} id unique for category
		@static
	*/
	static getId(type = "default"){
		if(typeof this.ids[type] == "undefined"){
			this.ids[type] = 0;
		}
		return this.ids[type]++;
	}

}

export default GeneralUtils;
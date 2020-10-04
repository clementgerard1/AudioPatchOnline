class InteractUtils{

	static touchObjects = {};

	/**
		Add a HTML which have a touch gesture
		@param {HtmlObject} domObj obj which have a touch gesture
		@static
	*/
	static addHammer(domObj, hammer){
		this.touchObjects[domObj.getAttribute("hammerid")] = hammer;
	}	

	static destroy(domObj){
		if(this.getHammer(domObj) != null){
			this.getHammer(domObj).destroy();
			delete this.touchObjects[domObj.getAttribute("hammerid")];
		}
	}	

	/**
		Get a Hammer Manager with its HTML object
		@param {HtmlObject} domObj obj which have a touch gesture
		@return {HammerManager}
		@static
	*/
	static getHammer(domObj){
		if(typeof this.touchObjects[domObj.getAttribute("hammerid")] != "undefined"){
			return this.touchObjects[domObj.getAttribute("hammerid")];
		}else{
			return null;
		}
	}

}
export default InteractUtils;
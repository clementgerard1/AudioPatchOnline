import "./Box.scss";
import InputConnectable from "../../api/interfaces/InputConnectable.class.js";
import OutputConnectable from "../../api/interfaces/OutputConnectable.class.js";
import ParamConnectable from "../../api/interfaces/ParamConnectable.class.js";

export default {
	data : function(){

		const connectables = this.box.getParamConnectables();
		const paramConnectables = {};
		const updateParams = {};
		for(let c in connectables){
			connectables[c].addListener(()=>{
				this.$set(this.updateParams, c, !this.updateParams[c]);
			});
			updateParams[c] = 0;
			paramConnectables[c] = connectables[c];
		}

		return{
			offsetMoveX : 0,
			offsetMoveY : 0,
			xx : this.x,
			yy : this.y,
			paramConnectables : paramConnectables,
			updateParams : updateParams,
			displayParams : true,
		}
	},
	props:[
		"box",
		"x",
		"y"
	],
	computed : {
		classBox : function(){
			switch(this.box.getGraphType()){
				case "input" : return "inputBox";
				case "process" : return "processBox";
				case "output" : return "outputBox";
			}
		}
	},
	methods : {
		move : function(event){
			if(event.type == "panstart"){
				this.offsetMoveX = event.srcEvent.clientX - this.xx;
				this.offsetMoveY = event.srcEvent.clientY - this.yy;
			}
			this.xx = event.srcEvent.clientX - this.offsetMoveX;
			this.yy = event.srcEvent.clientY - this.offsetMoveY;

			//Move event for connection updating
			const e = new CustomEvent('box-move', { detail : this.box.getId()});

			// Dispatch the event.
			document.body.dispatchEvent(e);
			
		},
		startConnection : function(connectable){
			let type = null;
			if(connectable instanceof InputConnectable){
				type = "input";
			}else if(connectable instanceof OutputConnectable){
				type = "output";
			}else if(connectable instanceof ParamConnectable){
				type = "input";
			}

			//connection creation event
			const e = new CustomEvent('connection-creation', { 
				detail : 
					{
						connectable : connectable,
						type : type,
					}
				}
			);

			// Dispatch the event.
			document.body.dispatchEvent(e);
		},
		processBox : function(){
			this.box.forceProcess();
		},
		paramChange : function(event, obj){
			obj.setValue(event.target.value);
			obj.getBox().forceProcess();
		},
		paramsToggle : function(){
			this.displayParams = !this.displayParams;
			//Move event for connection updating
			const e = new CustomEvent('box-move', { detail : this.box.getId()});

			// Dispatch the event.
			document.body.dispatchEvent(e);
		},
		removeBox : function(){
			if(this.$root.keyRdown){
				//Remove event for connection updating
				const e = new CustomEvent('box-remove', { detail : this.box});

				// Dispatch the event.
				document.body.dispatchEvent(e);
			}
		}
	},
	template : `
	<div v-tap="removeBox" v-doubletap="processBox" v-pan="move" class="box" v-bind:class="classBox" v-bind:style="{ left : xx + 'px', top : yy + 'px'}">
		
		<!-- inlets -->
		<div class="boxInlets">
			<p v-for="inlet in box.getInputConnectables()">
				<span v-tap="() => {startConnection(inlet)}" v-bind:id="'connectable-' + inlet.getId()"></span>
			</p>
		</div>

		<!-- params -->
		<div class="param" v-for="(param, name) in paramConnectables">
			<div  v-bind:style="[displayParams ? {visibility : 'visible'} : {visibility : 'hidden'}]" class="paramInlet" v-tap="() => {startConnection(param)}"  v-bind:id="'connectable-' + param.getId()"></div>
			<p v-if="displayParams" :key="'paramvalue-' + param.getId() + '-' + name + '-' + updateParams[name]"><span v-html="name + ' : '"></span><textarea v-on:change="paramChange($event, param)" v-html="param.getValue()"></textarea></p>
		</div>

		<!-- content -->
		<p class="boxMain" ><span v-html="box.getName()"></span><img v-if="Object.keys(paramConnectables).length != 0" v-bind:src="[displayParams ? '/icons/paramOn.svg' : '/icons/paramOff.svg']" v-tap="paramsToggle"/></p>

		<!-- outlets -->
		<div class="boxOutlets">
			<p v-for="outlet in box.getOutputConnectables()">
				<span v-tap="() => {startConnection(outlet)}"  v-bind:id="'connectable-' + outlet.getId()"></span>
			</p>
		</div>

	</div>`,
}
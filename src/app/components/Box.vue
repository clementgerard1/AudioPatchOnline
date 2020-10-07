import "./Box.scss";
import InputConnectable from "../../api/interfaces/InputConnectable.class.js";
import OutputConnectable from "../../api/interfaces/OutputConnectable.class.js";
import ParamConnectable from "../../api/interfaces/ParamConnectable.class.js";
import ArrayConnectable from "../../api/interfaces/ArrayConnectable.class.js";

export default {
	data : function(){

		const connectables = this.box.getParamConnectables();
		const updateParams = {};
		const paramConnectables = this.determineConnectableArray(connectables, "");

		for(let p in paramConnectables){
			updateParams[p] = 0;
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
		determineConnectableArray(connectables, prefix = null){
			const paramConnectables = {};
			for(let c in connectables){
				if(connectables[c] instanceof ArrayConnectable){
					paramConnectables['+' + c] = connectables[c];
					Object.assign(paramConnectables, this.determineConnectableArray(connectables[c].getConnectables(), "_" + c + '_'));
				}else{
					connectables[c].addListener(()=>{
						this.$set(this.updateParams, c, !this.updateParams[c]);
					});
					if(prefix == null){
						paramConnectables[c] = connectables[c];
					}else{
						paramConnectables[prefix + c] = connectables[c];
					}
				}
			}
			return paramConnectables;
		},
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
			if(obj.getType() == "check"){
				obj.setManualValue(event.target.checked);
				obj.getBox().forceProcess();
			}else if(obj.getType() == "text"){
				obj.setManualValue(event.target.value);
				obj.getBox().forceProcess();
			}else if(obj.getType() == "number"){
				obj.setManualValue(event.target.value);
				obj.getBox().forceProcess();
			}
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
		},
		addConnectable : function(connectable, name){
			const add = new ParamConnectable(connectable.getArrayType(), this.box);
			connectable.addConnectable(add);

			this.paramConnectables = this.determineConnectableArray(this.box.getParamConnectables(), "");

			for(let p in this.paramConnectables){
				this.$set(this.updateParams, p, 0);
			}
		},
		removeConnectable : function(connectable, name){
			this.box.getConnectableByName(name.split('_')[1]).removeConnectable(connectable);

			this.paramConnectables = this.determineConnectableArray(this.box.getParamConnectables(), "");

			for(let p in this.paramConnectables){
				this.$set(this.updateParams, p, 0);
			}

			//Remove event for connection updating
			const e = new CustomEvent('connectable-remove', { detail : connectable});

			// Dispatch the event.
			document.body.dispatchEvent(e);
		}
	},
	template : `
	<div :key="box.getId() + '-updateParams-' + updateParams" v-tap="removeBox" v-doubletap="processBox" v-pan="move" class="box" v-bind:class="classBox" v-bind:style="{ left : xx + 'px', top : yy + 'px'}">
		
		<!-- inlets -->
		<div class="boxInlets">
			<p v-for="inlet in box.getInputConnectables()">
				<span v-tap="() => {startConnection(inlet)}" v-bind:id="'connectable-' + inlet.getId()"></span>
			</p>
		</div>

		<!-- params -->
		<div class="param" v-for="(param, name) in paramConnectables">
			<template v-if="name.charAt(0) != '+'">
				<div  v-bind:style="[displayParams ? {visibility : 'visible'} : {visibility : 'hidden'}]" class="paramInlet" v-tap="() => {startConnection(param)}"  v-bind:id="'connectable-' + param.getId()"></div>
				<p v-if="displayParams" :key="'paramvalue-' + param.getId() + '-' + name + '-' + updateParams[name]">
					<span v-if="name.charAt(0) != '_'" v-html="name + ' : '"></span>
					
					<template v-if="param.getType() == 'text' || param.getType() == 'any'" > <!-- text / any -->
						<textarea v-on:change="paramChange($event, param)" v-html="param.getValue()"></textarea><img v-if="name.charAt(0) == '_'" v-tap="()=>removeConnectable(param, name)" src="/icons/paramMinus.svg" />
					</template>

					<template v-if="param.getType() == 'number'" > <!-- number -->
						<input v-on:click="paramChange($event, param)" type="number" v-model="param.getValue()"/>
					</template>

					<template v-if="param.getType() == 'check'" > <!-- checkbox -->
						<input v-on:click="paramChange($event, param)" type="checkbox" v-model="param.getValue()"/>
					</template>

					<template> <!-- select -->
					</template>

					<template> <!-- file -->
					</template>

				</p>
			</template>
			<template v-else>
				<p v-if="displayParams" :key="'arrayparamvalue-' + name + '-' + name + '-' + updateParams[name]"><span v-if="name.charAt(0) != '_'" v-html="name.replace('+', '') + ' : '"></span><img v-tap="()=>addConnectable(param, name)" src="/icons/paramPlus.svg" /></p>
			</template>
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
import "./Connection.scss";
import EventConnection from "../../api/interfaces/EventConnection.class.js";

export default {
	data : function(){
		
		let width = 6;
		if(this.connection.getType() == "sound") width = 8; 

		const order = this.connection.getInputConnectable().getBox().getOutputConnectionOrder(this.connection.getId());

		return {
			updateStart : false,
			updateEnd : false,
			updateHot : false,
			width : width,
			processFlashTime : 10, //ms
			processFlashFunction : null,
			order : order + 1,
			orderChangeProcessing : false,
			orderNumberChangeProcessing : 0,
			temporaryOrder : null,
		}
	},
	props:[
		"connection"
	],
	mounted : function(){

		//Box move listener
		document.body.addEventListener("box-move", (event)=>{
			if(event.detail == this.connection.getInputConnectable().getBox().getId()){
				this.updateStart = !this.updateStart;
			}else if(event.detail == this.connection.getOutputConnectable().getBox().getId()){
				this.updateEnd = !this.updateEnd;
			}
		});

		//Connection process listener
		this.connection.addProcessCallback(()=>{
			this.width = 8;
			if(this.processFlashFunction != null) clearTimeout(this.processFlashFunction);
			this.processFlashFunction = setTimeout(()=>{
				this.width = 6;
				this.processFlashFunction = null;
			}, this.processFlashTime);
		});

		//Connection change order listener
		document.body.addEventListener('connection-order-change', (event)=>{
			if(event.detail.inputBoxId == this.connection.getInputConnectable().getBox().getId()){

				this.orderChangeProcessing = true;
				if(event.detail.connectionId == this.connection.getId()){
					this.temporaryOrder =  event.detail.order + 1;
				}

				this.orderNumberChangeProcessing++;

				//End of change order processus
				if(this.orderNumberChangeProcessing >= Object.keys(this.connection.getInputConnectable().getBox().getOutputConnections()).length){

					this.connection.getInputConnectable().getBox().setOrder(this.connection.getId(), this.temporaryOrder - 1);

					this.order = this.temporaryOrder;
					this.orderChangeProcessing = false;
					this.temporaryOrder = null;
					this.orderNumberChangeProcessing = 0;

				}
			}		
		});

	},
	methods:{
		hotChange : function(){
			if(this.connection instanceof EventConnection){
				this.connection.setHot(!this.connection.isHot());
			}
			this.updateHot = !this.updateHot;
		},
		handleTap : function(){
			if(this.$root.keyRdown){
				//Remove event for connection updating
				const e = new CustomEvent('connection-remove', { detail : this.connection});

				// Dispatch the event.
				document.body.dispatchEvent(e);
			}else{
				//change Order
				if(Object.keys(this.connection.getInputConnectable().getBox().getOutputConnections()).length > 1){
					if(this.orderChangeProcessing && this._order != "?"){
						return;
					}
					const e = new CustomEvent('connection-order-change', { 
						detail : {
							inputBoxId : this.connection.getInputConnectable().getBox().getId(),
							connectionId : this.connection.getId(),
							order : this.orderNumberChangeProcessing,
						}
					});

					// Dispatch the event.
					document.body.dispatchEvent(e);
				}
			}
		}
	},
	computed : {
		_order : function(){
			if(this.orderChangeProcessing){
				if(this.temporaryOrder != null){
					return this.temporaryOrder;
				}else{
					return "?";
				}
			}else{
				return this.order;
			}
		},
		color : function(){
			switch(this.connection.getType()){
				case "event" : return "white";
				case "sound" : return "purple";
			}
		},
		hotColor : function(){
			this.updateHot;
			if(this.connection instanceof EventConnection){
				if(this.connection.isHot()){
					return "red";
				}else{
					return "blue";
				}
			}else{
				return "transparent";
			}
		},
		start : function(){
			this.updateStart;
			const input = document.getElementById("connectable-" + this.connection.getInputConnectable().getId());
			return {
				x : input.getBoundingClientRect().left + input.clientWidth / 2 + 1,
				y : input.getBoundingClientRect().top + input.clientHeight / 2 + 1,
			}
		},
		end : function(){
			this.updateEnd;
			const output = document.getElementById("connectable-" + this.connection.getOutputConnectable(0).getId());
			return {
				x : output.getBoundingClientRect().left + output.clientWidth / 2 + 1,
				y : output.getBoundingClientRect().top + output.clientHeight / 2 + 1,
			}
		}
	},
	template : `
	<svg class="connection">
		<path v-doubletap="hotChange" v-tap="handleTap" v-bind:d="'M ' + start.x + ' ' + start.y + ' L ' + end.x + ' ' + end.y + ' ' + (end.x + width) + ' ' + end.y + ' ' + (start.x + width) + ' ' + start.y + ' Z'" v-bind:fill="color" v-bind:stroke="hotColor" stroke-width="2"/>
		<circle v-doubletap="hotChange" v-tap="handleTap" v-bind:cx="(end.x + start.x) / 2" v-bind:cy="(end.y + start.y) / 2" r="7" stroke="black" stroke-width="1" fill="white" />
		<text v-doubletap="hotChange" v-tap="handleTap" class="small" v-bind:x="(end.x + start.x) / 2 - 4" v-bind:y="(end.y + start.y) / 2 + 4" v-html="_order"></text>
	</svg>`,
}
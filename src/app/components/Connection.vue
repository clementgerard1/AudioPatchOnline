import "./Connection.scss";
import EventConnection from "../../api/interfaces/EventConnection.class.js";

export default {
	data : function(){
		let width = 6;
		if(this.connection.getType() == "sound") width = 8; 
		return {
			updateStart : false,
			updateEnd : false,
			updateHot : false,
			width : width,
			processFlashTime : 10, //ms
			processFlashFunction : null,
		}
	},
	props:[
		"connection"
	],
	methods:{
		hotChange : function(){
			if(this.connection instanceof EventConnection){
				this.connection.setHot(!this.connection.isHot());
			}
			this.updateHot = !this.updateHot;
		},
		changeOrder : function(){
			//Gérer les deux types d'events
			console.log("hey");
		}
	},
	computed : {
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
			const input = document.getElementById("connectable-" + this.connection.getInputConnectable(0).getId());
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
	mounted : function(){

		//Box move listener
		document.body.addEventListener("box-move", (event)=>{
			if(event.detail == this.connection.getInputConnectable(0).getBox().getId()){
				this.updateStart = !this.updateStart;
			}else if(event.detail == this.connection.getOutputConnectable(0).getBox().getId()){
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

	},
	template : `
	<svg class="connection">
		<path v-tap="changeOrder" v-doubletap="hotChange" v-bind:d="'M ' + start.x + ' ' + start.y + ' L ' + end.x + ' ' + end.y + ' ' + (end.x + width) + ' ' + end.y + ' ' + (start.x + width) + ' ' + start.y + ' Z'" v-bind:fill="color" v-bind:stroke="hotColor" stroke-width="2"/>
	</svg>`,
}
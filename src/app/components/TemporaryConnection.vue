import "./Connection.scss";
import EventConnection from "../../api/interfaces/EventConnection.class.js";

export default {
	data : function(){
		
		let width = 0;

		return {
			width : width,
			order : "?",
		}
	},
	props:[
		"inputConnectable",
		"outputConnectable",
		"x",
		"y"
	],
	computed : {
		color : function(){
			return "black"
		},
		hotColor : function(){
			return "black"
		},
		start : function(){
			this.updateStart;
			if(this.inputConnectable != null){
				const input = document.getElementById("connectable-" + this.inputConnectable.getId());
				return {
					x : input.getBoundingClientRect().left + input.clientWidth / 2 + 1,
					y : input.getBoundingClientRect().top + input.clientHeight / 2 + 1,
				}
			}else{
				return {
					x : this.x,
					y : this.y,
				}
			}
		},
		end : function(){
			this.updateEnd;
			if(this.outputConnectable != null){
				const output = document.getElementById("connectable-" + this.outputConnectable.getId());
				return {
					x : output.getBoundingClientRect().left + output.clientWidth / 2 + 1,
					y : output.getBoundingClientRect().top + output.clientHeight / 2 + 1,
				}
			}else{
				return {
					x : this.x,
					y : this.y,
				}
			}
			
		}
	},
	template : `
	<svg class="connection">
		<path v-bind:d="'M ' + start.x + ' ' + start.y + ' L ' + end.x + ' ' + end.y + ' ' + (end.x + width) + ' ' + end.y + ' ' + (start.x + width) + ' ' + start.y + ' Z'" v-bind:fill="color" v-bind:stroke="hotColor" stroke-width="0"/>
	</svg>`,
}
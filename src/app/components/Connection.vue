import "./Connection.scss";

export default {
	props:[
		"connection"
	],
	computed : {
		color : function(){
			switch(this.connection.getType()){
				case "event" : return "black";
				case "sound" : return "blue";
			}
		},
		start : function(){
			const input = document.getElementById("connectable-" + this.connection.getInputConnectable(0).getId());
			return {
				x : input.getBoundingClientRect().left + input.clientWidth / 2 + 1,
				y : input.getBoundingClientRect().top + input.clientHeight / 2 + 1,
			}
		},
		end : function(){
			const output = document.getElementById("connectable-" + this.connection.getOutputConnectable(0).getId());
			return {
				x : output.getBoundingClientRect().left + output.clientWidth / 2 + 1,
				y : output.getBoundingClientRect().top + output.clientHeight / 2 + 1,
			}
		}
	},
	template : `
	<svg class="connection">
		<path v-bind:d="'M ' + start.x + ' ' + start.y + ' L ' + end.x + ' ' + end.y" fill="transparent" v-bind:stroke="color" stroke-width="2" />
	</svg>`,
}
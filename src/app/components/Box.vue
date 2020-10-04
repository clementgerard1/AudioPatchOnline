import "./Box.scss";

export default {
	data : function(){
		return{
			offsetMoveX : 0,
			offsetMoveY : 0,
			xx : this.x,
			yy : this.y,
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
			
		}
	},
	template : `
	<div v-pan="move" class="box" v-bind:class="classBox" v-bind:style="{ left : xx + 'px', top : yy + 'px'}">
		
		<!-- inlets -->
		<div class="boxInlets">
			<p v-for="inlet in box.getInputConnectables()">
				<span v-bind:id="'connectable-' + inlet.getId()"></span>
			</p>
		</div>

		<!-- content -->
		<p v-html="box.getName()"></p>

		<!-- outlets -->
		<div class="boxOutlets">
			<p v-for="outlet in box.getOutputConnectables()">
				<span v-bind:id="'connectable-' + outlet.getId()"></span>
			</p>
		</div>

	</div>`,
}
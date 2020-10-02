import "./Box.scss";

export default {
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
	template : `
	<div class="box" v-bind:class="classBox" v-bind:style="{ left : x + 'px', top : y + 'px'}">
		
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
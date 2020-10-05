import "./index.scss";
import Vue from "vue/dist/vue.esm.js";
import Hammer from "hammerjs";

import GeneralUtils from "./utils/GeneralUtils.js";
import InteractUtils from "./utils/InteractUtils.js";

import Box from "./components/Box.vue";
import Connection from "./components/Connection.vue";

import Patch from "../api/Patch.class.js";
import EventInputBox from "../api/interfaces/EventInputBox.class.js";
import SoundInputBox from "../api/interfaces/EventInputBox.class.js";
import EventConnection from "../api/interfaces/EventConnection.class.js";
import SoundConnection from "../api/interfaces/SoundConnection.class.js";

import AudioManager from "../api/AudioManager.class.js";

import BoxDef from "./utils/BoxDefinitions.js";
import SvgDefintions from "./utils/SvgDefinitions.svg";

Vue.directive("tap", {
	bind: function(el, binding) 
	{
		if(el.getAttribute("hammerid") == null){
			el.setAttribute("hammerid", GeneralUtils.getId("hammer"));
		}
		if (typeof binding.value === "function") {
			let hammer = InteractUtils.getHammer(el);
			if(hammer == null){
				hammer = new Hammer.Manager(el);
				InteractUtils.addHammer(el, hammer);
			} 

			const singleTap = new Hammer.Tap({event: 'singletap'});
			hammer.add(singleTap);

			hammer.on("singletap", binding.value);

			InteractUtils.updateHammer(el);
		}
	},
	unbind: function(el, binding){
		InteractUtils.destroy(el);
	}
});
Vue.directive("doubletap", {
	bind: function(el, binding) 
	{
		if(el.getAttribute("hammerid") == null){
			el.setAttribute("hammerid", GeneralUtils.getId("hammer"));
		}
		if (typeof binding.value === "function") {
			let hammer = InteractUtils.getHammer(el);
			if(hammer == null){
				hammer = new Hammer.Manager(el);
				InteractUtils.addHammer(el, hammer);
			} 

			const doubleTap = new Hammer.Tap({event: 'doubletap', taps: 2 });
			hammer.add(doubleTap);

			hammer.on("doubletap", binding.value);

			InteractUtils.updateHammer(el);
		}
	},
	unbind: function(el, binding){
		InteractUtils.destroy(el);
	}
});
Vue.directive("pan", {
	bind: function(el, binding) 
	{
		if(el.getAttribute("hammerid") == null){
			el.setAttribute("hammerid", GeneralUtils.getId("hammer"));
		}
		if (typeof binding.value === "function") {
			let hammer = InteractUtils.getHammer(el);
			if(hammer == null){
				hammer = new Hammer.Manager(el);
				InteractUtils.addHammer(el, hammer);
			} 

			const pan = new Hammer.Pan({event: 'pan', threshold : 1,  direction: Hammer.DIRECTION_ALL});
			hammer.add(pan);

			hammer.on("panstart", binding.value);
			hammer.on("panmove", binding.value);
			hammer.on("panend", binding.value);
			hammer.on("panup", binding.value);
			hammer.on("pandown", binding.value);

			InteractUtils.updateHammer(el);
		}
	},
	unbind: function(el, binding){
		InteractUtils.destroy(el);
	}
});

const app = new Vue({
	el : '#content',
	components : {
		box : Box,
		connection : Connection
	},
	data: function(){
		return {
			isSoundOn : false,
			initSound : false,
			boxes : [],
			connections : [],
			patch : new Patch(),
		}
	},
	mounted : function(){
		//Render loop
		const loop = () => {
			this.patch.process();
			window.requestAnimationFrame(()=>{
				loop();
			});
		}
		loop(); //Start loop

	},
	methods : {
		initDemo : function(){

			const metro = new BoxDef.MetroBox();
			this.patch.addInput(metro);
			this.boxes.push({
				box : metro,
				x : 100,
				y : 50,
			});

			const random = new BoxDef.RandomBox();
			const connection = new EventConnection(metro.getOutputConnectable(0), random.getInputConnectable(0));
			this.boxes.push({
				box : random,
				x : 100,
				y : 150,
			});
			this.connections.push(connection);

			const log = new BoxDef.LogBox();
			const connection2 = new EventConnection(random.getOutputConnectable(0), log.getInputConnectable(0));
			this.boxes.push({
				box : log,
				x : 200,
				y : 250,
			});
			this.connections.push(connection2);

			const log2 = new BoxDef.LogBox();
			const connection5 = new EventConnection(random.getOutputConnectable(0), log2.getInputConnectable(0));
			this.boxes.push({
				box : log2,
				x : 300,
				y : 250,
			});
			this.connections.push(connection5);

			const cycle = new BoxDef.CycleSoundBox();
			const connection3 = new EventConnection(random.getOutputConnectable(0), cycle.getInputConnectable(0));
			this.boxes.push({
				box : cycle,
				x : 100,
				y : 250,
			});
			this.connections.push(connection3);

			const dac = new BoxDef.DacSoundBox();
			const connection4 = new SoundConnection(cycle.getOutputConnectable(0), dac.getInputConnectable(0));
			this.boxes.push({
				box : dac,
				x : 100,
				y : 350,
			});
			this.connections.push(connection4);

		},
		soundOnOff : function(){
			if(!this.initSound){
				this.initSound = true;
				this.initDemo();
			}
			this.isSoundOn = !this.isSoundOn;
			if(this.isSoundOn){
				AudioManager.setDestinationVolume(0.5);
			}else{
				AudioManager.setDestinationVolume(0);
			}
		},
		addBox : function(){
			let boxName = prompt("Please enter the name of new box", "metro");
			boxName = boxName.charAt(0).toUpperCase() + boxName.slice(1); // First letter Uppercase
			boxName = boxName.replace("~", "Sound");
			let proto = null
			if(typeof BoxDef[boxName + "Box"] != "undefined"){
				proto = BoxDef[boxName + "Box"];
			}
			if(proto != null){
				const newBox = new proto();
				this.$set(this.boxes, this.boxes.length, {
					box : newBox,
					x : 0, 
					y : 40,
				});

				if(newBox instanceof EventInputBox || newBox instanceof SoundInputBox){
					this.patch.addInput(newBox);
				}

			}else{
				alert("this box doesn't exist");
			}
		}
	},
	template : `
		<div>
			` + SvgDefintions + `
			<div id="menu">
				<img v-tap="soundOnOff" v-bind:src='[isSoundOn ? "/icons/soundOn.svg" : "/icons/soundOff.svg"]'/>
				<img v-tap="addBox" src='/icons/addBox.svg'/>
			</div>
	 		<box v-for="box in boxes" v-bind:box="box.box" v-bind:x="box.x" v-bind:y="box.y"></box>
	 		<connection v-for="connection in connections" v-bind:connection="connection"></connection>
	 	</div>
	`
});
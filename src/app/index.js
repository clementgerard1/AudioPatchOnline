import "./index.scss";
import Vue from "vue/dist/vue.esm.js";
import Hammer from "hammerjs";

import GeneralUtils from "./utils/GeneralUtils.js";
import InteractUtils from "./utils/InteractUtils.js";

import Box from "./components/Box.vue";
import Connection from "./components/Connection.vue";
import TemporaryConnection from "./components/TemporaryConnection.vue";

import Patch from "../api/Patch.class.js";
import EventInputBox from "../api/interfaces/EventInputBox.class.js";
import SoundInputBox from "../api/interfaces/EventInputBox.class.js";
import EventConnection from "../api/interfaces/EventConnection.class.js";
import SoundConnection from "../api/interfaces/SoundConnection.class.js";
import ParamConectable from "../api/interfaces/ParamConnectable.class.js";

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
				hammer.domEvents=true;
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
				hammer.domEvents=true;
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
				hammer.domEvents=true;
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
		connection : Connection,
		temporaryConnection : TemporaryConnection,
	},
	data: function(){
		return {
			isSoundOn : false,
			initSound : false,
			boxes : [],
			connections : [],
			patch : new Patch(),
			keyRdown : false,

			//connection creation
			temporaryConnectionObj : null,

			pointerPosition : {
				x : 0,
				y : 0
			}
		}
	},
	mounted : function(){

		//Connection creation event
		document.body.addEventListener("connection-creation", (event)=>{
			if(this.temporaryConnectionObj == null){
				if(event.detail.type == "input"){
					this.temporaryConnectionObj = {
						input : event.detail.connectable,
						output : null
					};
				}else if(event.detail.type == "output"){
					this.temporaryConnectionObj = {
						input : null,
						output : event.detail.connectable
					};
				}
			}else{
				if((event.detail.type == "input" && this.temporaryConnectionObj.input != null) || (event.detail.type == "output" && this.temporaryConnectionObj.output != null)) return;
				if(event.detail.type == "input"){
					this.temporaryConnectionObj.input = event.detail.connectable;
				}else if(event.detail.type == "output"){
					this.temporaryConnectionObj.output = event.detail.connectable;
				}
				if(!this.connectionExist(this.temporaryConnectionObj.output, this.temporaryConnectionObj.input)){
					if((this.temporaryConnectionObj.output.getBox().getType() == "event" || this.temporaryConnectionObj.output.getBox().getType() == "soundToEvent") && (this.temporaryConnectionObj.input instanceof ParamConectable  || this.temporaryConnectionObj.input.getBox().getType() == "event"  || this.temporaryConnectionObj.input.getBox().getType() == "eventToSound")){
						const connection = new EventConnection(this.temporaryConnectionObj.output, this.temporaryConnectionObj.input);
						this.connections.push(connection);
					}else if((this.temporaryConnectionObj.output.getBox().getType() == "sound" || this.temporaryConnectionObj.output.getBox().getType() == "eventToSound") && (this.temporaryConnectionObj.input.getBox().getType() == "sound" || this.temporaryConnectionObj.input.getBox().getType() == "soundToEvent")){
						const connection = new SoundConnection(this.temporaryConnectionObj.output, this.temporaryConnectionObj.input);
						this.connections.push(connection);
					}
				}
				this.temporaryConnectionObj = null;
			}
		});

		//Box remove event
		document.body.addEventListener("box-remove", (event)=>{
			const box = event.detail;

			for(let c = 0 ; c < this.connections.length ; c++){
				if(this.connections[c].getInputConnectable().getBox().getId() == box.getId() || this.connections[c].getOutputConnectable().getBox().getId() == box.getId()){
					this.connections[c].destroyLinks();
					this.connections.splice(c, 1);
					c--;
				}
			}
			for(let b = 0 ; b < this.boxes.length ; b++){
				if(this.boxes[b].box.getId() == box.getId()){
					this.boxes.splice(b, 1);
					b--;
				}
			}

			if(box instanceof EventInputBox || box instanceof SoundInputBox){
				this.patch.removeInput(box);
			}

		});

		//Connection remove event
		document.body.addEventListener("connection-remove", (event)=>{
			const connection = event.detail;

			for(let c = 0 ; c < this.connections.length ; c++){
				if(this.connections[c].getId() == connection.getId()){
					this.connections[c].destroyLinks();
					this.connections.splice(c, 1);
					c--;
				}
			}

		});

		//Connectable remove event
		document.body.addEventListener("connectable-remove", (event)=>{
			const connectable = event.detail;

			for(let c = 0 ; c < this.connections.length ; c++){
				if(this.connections[c].getOutputConnectable().getId() == connectable.getId()){
					this.connections[c].destroyLinks();
					this.connections.splice(c, 1);
					c--;
				}
			}

		});

		//key detector for remove objects
		document.addEventListener('keydown', (e) => {
		  if(e.key == "r") this.keyRdown = true;
		});
		document.addEventListener('keyup', (e) => {
			if(e.key == "r") this.keyRdown = false;
		});


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
		connectionExist: function(input, output){
			for(let c in this.connections){
				if(this.connections[c].getInputConnectable().getId() == input.getId() && this.connections[c].getOutputConnectable().getId() == output.getId()) return true;
			}
			return false;
		},
		soundOnOff : function(){
			if(!this.initSound){
				this.initSound = true;
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
			boxName = boxName.toLowerCase();
			boxName = boxName.replace("~", "sound");
			boxName = boxName.replace(/=/gi, "equal");
			boxName = boxName.replace(/\+/gi, "plus");
			boxName = boxName.replace(/\*/gi, "mult");
			let proto = null
			if(typeof BoxDef[boxName + "box"] != "undefined"){
				proto = BoxDef[boxName + "box"];
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
		},
		pointerMove : function(event){
			this.pointerPosition.x = event.srcEvent.clientX;
			this.pointerPosition.y = event.srcEvent.clientY;
		},
		handleTap : function(event){
			if(event.target.id == "content" && this.temporaryConnectionObj != null) this.temporaryConnectionObj = null;
		}
	},
	template : `
		<div id="content" v-pan="pointerMove" v-tap="handleTap">
			` + SvgDefintions + `
			<div id="menu">
				<img v-tap="soundOnOff" v-bind:src='[isSoundOn ? "/icons/soundOn.svg" : "/icons/soundOff.svg"]'/>
				<img v-tap="addBox" src='/icons/addBox.svg'/>
			</div>
	 		<box v-for="box in boxes" :key="'box-' + box.box.getId()" v-bind:box="box.box" v-bind:x="box.x" v-bind:y="box.y"></box>
	 		<connection v-for="connection in connections" :key="'connection-' + connection.getId()" v-bind:connection="connection"></connection>
	 		<temporaryConnection id="temporaryConnection" v-if="temporaryConnectionObj != null" v-bind:x="pointerPosition.x" v-bind:y="pointerPosition.y" v-bind:inputConnectable="temporaryConnectionObj.input" v-bind:outputConnectable="temporaryConnectionObj.output"></temporaryConnection>
	 	</div>
	`
});
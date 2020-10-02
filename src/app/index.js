import "./index.scss";
import Vue from "vue/dist/vue.esm.js";

import Box from "./components/Box.vue";
import Connection from "./components/Connection.vue";

import Patch from "../api/Patch.class.js";
import MetroBox from "../api/boxes/event/MetroBox.class.js";
import RandomBox from "../api/boxes/event/RandomBox.class.js";
import LogBox from "../api/boxes/event/LogBox.class.js";
import CycleSoundBox from "../api/boxes/eventToSound/CycleSoundBox.class.js";
import OutputSoundBox from "../api/boxes/sound/OutputSoundBox.class.js";
import EventConnection from "../api/interfaces/EventConnection.class.js";
import SoundConnection from "../api/interfaces/SoundConnection.class.js";

import AudioManager from "../api/AudioManager.class.js";

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
		}
	},
	methods : {
		initDemo : function(){
			const patch = new Patch();

			const metro = new MetroBox();
			patch.addInput(metro);
			this.boxes.push({
				box : metro,
				x : 100,
				y : 50,
			});

			const random = new RandomBox();
			const connection = new EventConnection(metro.getOutputConnectable(0), random.getInputConnectable(0));
			this.boxes.push({
				box : random,
				x : 100,
				y : 150,
			});
			this.connections.push(connection);

			const log = new LogBox();
			const connection2 = new EventConnection(random.getOutputConnectable(0), log.getInputConnectable(0));
			this.boxes.push({
				box : log,
				x : 200,
				y : 250,
			});
			this.connections.push(connection2);

			const cycle = new CycleSoundBox();
			const connection3 = new EventConnection(random.getOutputConnectable(0), cycle.getInputConnectable(0));
			this.boxes.push({
				box : cycle,
				x : 100,
				y : 250,
			});
			this.connections.push(connection3);

			const dac = new OutputSoundBox();
			const connection4 = new SoundConnection(cycle.getOutputConnectable(0), dac.getInputConnectable(0));
			this.boxes.push({
				box : dac,
				x : 100,
				y : 350,
			});
			this.connections.push(connection4);

			loop(); //Start loop

			//Render loop
			function loop(){
				patch.process();
				window.requestAnimationFrame(()=>{
					loop();
				});
			}
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
		}
	},
	template : `
		<div>
			<img v-on:click="soundOnOff" v-bind:src='[isSoundOn ? "/icons/soundOn.svg" : "/icons/soundOff.svg"]'/>
	 		<box v-for="box in boxes" v-bind:box="box.box" v-bind:x="box.x" v-bind:y="box.y"></box>
	 		<connection v-for="connection in connections" v-bind:connection="connection"></connection>
	 	</div>
	`
});
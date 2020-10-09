import _MetroBox from "../../api/boxes/event/MetroBox.class.js";
import _RandomBox from "../../api/boxes/event/RandomBox.class.js";
import _LogBox from "../../api/boxes/event/LogBox.class.js";
import _OscSoundBox from "../../api/boxes/sound/OscSoundBox.class.js";
import _DacSoundBox from "../../api/boxes/sound/OutputSoundBox.class.js";
import _ParseIntBox from "../../api/boxes/event/ParseIntBox.class.js";
import _HzToMidiBox from "../../api/boxes/event/HzToMidiBox.class.js";
import _MidiToHzBox from "../../api/boxes/event/MidiToHzBox.class.js";
import _EqualBox from "../../api/boxes/event/EqualBox.class.js";
import _PlusBox from "../../api/boxes/event/PlusBox.class.js";
import _MultBox from "../../api/boxes/event/MultBox.class.js";
import _GateBox from "../../api/boxes/event/GateBox.class.js";
import _TextBox from  "../../api/boxes/event/TextBox.class.js";
import _NumberBox from  "../../api/boxes/event/NumberBox.class.js";
import _MultSoundBox from  "../../api/boxes/sound/MultSoundBox.class.js";
import _LineSoundBox from  "../../api/boxes/eventToSound/LineSoundBox.class.js";

class BoxDefinitions{

	static metrobox = _MetroBox;
	static randombox = _RandomBox;
	static logbox = _LogBox;
	static oscsoundbox = _OscSoundBox;
	static dacsoundbox = _DacSoundBox;
	static parseintbox = _ParseIntBox;
	static hztomidibox = _HzToMidiBox;
	static miditohzbox = _MidiToHzBox;
	static equalequalbox = _EqualBox;
	static plusbox = _PlusBox;
	static multbox = _MultBox;
	static gatebox = _GateBox;
	static textbox = _TextBox;
	static numberbox = _NumberBox;
	static multsoundbox = _MultSoundBox;
	static linesoundbox = _LineSoundBox;

}

export default BoxDefinitions;
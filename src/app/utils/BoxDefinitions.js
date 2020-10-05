import _MetroBox from "../../api/boxes/event/MetroBox.class.js";
import _RandomBox from "../../api/boxes/event/RandomBox.class.js";
import _LogBox from "../../api/boxes/event/LogBox.class.js";
import _CycleSoundBox from "../../api/boxes/eventToSound/CycleSoundBox.class.js";
import _DacSoundBox from "../../api/boxes/sound/OutputSoundBox.class.js";
import _ParseIntBox from "../../api/boxes/event/ParseIntBox.class.js";
class BoxDefinitions{

	static metrobox = _MetroBox;
	static randombox = _RandomBox;
	static logbox = _LogBox;
	static cyclesoundbox = _CycleSoundBox;
	static dacsoundbox = _DacSoundBox;
	static parseintbox = _ParseIntBox;

}

export default BoxDefinitions;
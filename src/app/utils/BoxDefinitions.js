import _MetroBox from "../../api/boxes/event/MetroBox.class.js";
import _RandomBox from "../../api/boxes/event/RandomBox.class.js";
import _LogBox from "../../api/boxes/event/LogBox.class.js";
import _CycleSoundBox from "../../api/boxes/eventToSound/CycleSoundBox.class.js";
import _DacSoundBox from "../../api/boxes/sound/OutputSoundBox.class.js";

class BoxDefinitions{

	static MetroBox = _MetroBox;
	static RandomBox = _RandomBox;
	static LogBox = _LogBox;
	static CycleSoundBox = _CycleSoundBox;
	static DacSoundBox = _DacSoundBox;

}

export default BoxDefinitions;
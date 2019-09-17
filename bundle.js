/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/AudioBank.js":
/*!**************************!*\
  !*** ./src/AudioBank.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Player */ "./src/Player.js");


function AudioBank(bank = {}) {
  this.bank = bank;
}

AudioBank.prototype.save = async function(file, title) {
  const url = URL.createObjectURL(file);
  fetch(url).then(res => {
    res.blob().then(blob => {
      const reader = new FileReader();
      reader.onloadend = e => {
        const AudioBank =
          localStorage["AudioBank"] && localStorage["AudioBank"] != "undefined"
            ? JSON.parse(localStorage["AudioBank"])
            : {};
        const dataURI = e.currentTarget.result;
        AudioBank[title] = dataURI;
        localStorage.setItem("AudioBank", JSON.stringify(AudioBank));
      };
      reader.readAsDataURL(blob);
    });
  });
  this.update();
};

AudioBank.prototype.update = function() {
  if (localStorage["AudioBank"] && localStorage["AudioBank"] != "undefined") {
    this.bank = JSON.parse(localStorage["AudioBank"]);
  }
};

AudioBank.prototype.listTracks = function() {
  const ul = document.getElementById("tracksList");
  this.update();
  Object.keys(this.bank).forEach((title, idx) => {
    const li = document.createElement("LI");
    const p = document.createElement("P");
    p.textContent = title;
    li.appendChild(p);
    li.setAttribute("key", idx);
    li.setAttribute("id", title);
    li.addEventListener("click", () => {
      new _Player__WEBPACK_IMPORTED_MODULE_0__["default"](title, _arrayBufferToFile(this.bank[title]), idx);
    });
    ul.appendChild(li);
  });
};

function _arrayBufferToFile(uri) {
  const arrayBuffer = _base64ToArrayBuffer(uri);
  const file = new File([arrayBuffer], "success");
  return file;
}

function _base64ToArrayBuffer(base64) {
  var binary_string = window.atob(base64.split(",")[1]);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

/* harmony default export */ __webpack_exports__["default"] = (AudioBank);


/***/ }),

/***/ "./src/Player.js":
/*!***********************!*\
  !*** ./src/Player.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function Player(title, audioFile) {
  this.title = title;
  this.audioFile = audioFile;
  this.audio = null;
  this.instantiateAudio();
  this.incarnate();
}

Player.prototype.instantiateAudio = function() {
  this.audio = new Audio(URL.createObjectURL(this.audioFile));
};

Player.prototype.seekAudio = function(durationSlider, duration) {
  this.audio.currentTime = durationSlider.value;
  duration.textContent = convertTime(this.audio.currentTime);
};

Player.prototype.adjVolume = function(volumeSlider) {
  this.audio.volume = volumeSlider.value;
};

Player.prototype.play = function() {
  const durationSlider = document.getElementById(`durationSlider${this.title}`);
  const currentTime = document.getElementById(`currentTime${this.title}`);
  const duration = document.getElementById(`duration${this.title}`);
  const volume = document.getElementById(`volumeSlider${this.title}`);
  setInterval(
    () => updateDurationSlider(this.audio, durationSlider, currentTime),
    1000
  );
  this.audio.volume = volume.value;
  showDuration(this.audio, durationSlider, duration);
  this.audio.play();
};

Player.prototype.togglePlay = function() {
  if ((this.audio && this.audio.paused) || this.audio.ended) {
    this.play();
    console.log("playing");
  } else {
    this.audio.pause();
    console.log("paused");
  }
};

Player.prototype.configureClass = function(playButton) {
  if ((this.audio && this.audio.paused) || this.audio.ended) {
    playButton.classList.remove("pause-button");
  } else {
    playButton.classList.add("pause-button");
  }
};

Player.prototype.incarnate = function() {
  const ul = document.getElementById("players");

  const audioPlayerDiv = document.createElement("DIV");
  audioPlayerDiv.className = "audio-player";

  const trackTitle = document.createElement("DIV");
  trackTitle.textContent = this.title;
  trackTitle.className = "player-track-title";
  audioPlayerDiv.appendChild(trackTitle);

  const horDiv = document.createElement("DIV");
  horDiv.className = "horizontal-track-div";
  audioPlayerDiv.appendChild(horDiv);

  const timeDurationCont = document.createElement("DIV");
  timeDurationCont.className = "time-duration-cont";
  horDiv.appendChild(timeDurationCont);

  const playButton = document.createElement("BUTTON");
  playButton.className = "play-button";
  playButton.id = `playButton${this.title}`;
  playButton.addEventListener("click", () => {
    this.togglePlay();
    this.configureClass(playButton);
  });
  timeDurationCont.appendChild(playButton);

  const currentTime = document.createElement("DIV");
  currentTime.className = "current-time";
  currentTime.id = `currentTime${this.title}`;
  currentTime.textContent = "00:00";
  timeDurationCont.appendChild(currentTime);

  const duration = document.createElement("DIV");
  duration.className = "duration";
  duration.id = `duration${this.title}`;
  duration.textContent = "00:00";

  const durationSlider = document.createElement("INPUT");
  durationSlider.className = "slider duration-slider";
  durationSlider.id = `durationSlider${this.title}`;
  durationSlider.addEventListener("change", () => {
    this.seekAudio(durationSlider, duration);
  });

  durationSlider.setAttribute("type", "range");
  durationSlider.setAttribute("value", "0");
  durationSlider.setAttribute("min", "0");
  durationSlider.setAttribute("step", "1");
  timeDurationCont.appendChild(durationSlider);
  timeDurationCont.appendChild(duration);

  const volumeSliderCont = document.createElement("DIV");
  volumeSliderCont.className = "volume-slider-cont";
  horDiv.appendChild(volumeSliderCont);

  const volImg1 = document.createElement("IMG");
  volImg1.className = "volume-icon";
  volImg1.setAttribute("src", "../src/public/mute-icon.png");
  volumeSliderCont.appendChild(volImg1);

  const volumeSlider = document.createElement("INPUT");
  volumeSlider.className = "slider volume-slider";
  volumeSlider.id = `volumeSlider${this.title}`;
  volumeSlider.addEventListener("change", () => {
    this.adjVolume(volumeSlider);
  });
  volumeSlider.setAttribute("type", "range");
  volumeSlider.setAttribute("min", "0");
  volumeSlider.setAttribute("max", "1");
  volumeSlider.setAttribute("value", "0.5");
  volumeSlider.setAttribute("step", "0.01");
  volumeSliderCont.appendChild(volumeSlider);

  const volImg2 = document.createElement("IMG");
  volImg2.className = "volume-icon";
  volImg2.setAttribute("src", "../src/public/white-volume.png");
  volumeSliderCont.appendChild(volImg2);

  ul.appendChild(audioPlayerDiv);
};

function convertTime(sec) {
  let min = Math.floor(sec / 60);
  let seconds = sec % 60;
  min = min < 10 ? "0" + min : min;
  seconds = sec < 10 ? "0" + seconds : seconds;
  return min + ":" + seconds;
}

async function updateDurationSlider(audio, durationSlider, currentTime) {
  const sec = Math.round(audio.currentTime);
  durationSlider.value = sec;
  currentTime.textContent = convertTime(sec);
}

async function showDuration(audio, durationSlider, duration) {
  while (audio.duration === Infinity) {
    await new Promise(r => setTimeout(r, 1000));
  }
  const d = Math.floor(audio.duration);
  durationSlider.setAttribute("max", d);
  duration.textContent = convertTime(d);
}

/* harmony default export */ __webpack_exports__["default"] = (Player);


/***/ }),

/***/ "./src/Recorder.js":
/*!*************************!*\
  !*** ./src/Recorder.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function Recorder() {
  this.stream = null;
  this.recorder = null;
  this.audioBits = [];
  this.audioUrl = null;
  this.audioFile = null;
  this.audio = null;
  this.state = null;
}

Recorder.prototype.extractAudioFile = function() {
  const audioBlob = new Blob(this.audioBits);
  // this.audioUrl = URL.createObjectURL(audioBlob);
  this.audioFile = new File([audioBlob], "audio");
  console.log(this.audioFile);
  return this.audioFile;
};

Recorder.prototype.startStream = async function() {
  this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  this.recorder = new MediaRecorder(this.stream);
  this.state = this.recorder.state;
  this.recorder.addEventListener("dataavailable", event => {
    this.audioBits.push(event.data);
  });
};

Recorder.prototype.toggleRecord = function() {
  if (this.state === "inactive") {
    this.recorder.start();
    this.state = this.recorder.state;
  } else {
    this.recorder.stop();
    this.state = this.recorder.state;
  }
};

Recorder.prototype.yieldClass = function() {
  return `recorder-${this.state}`;
};

/* harmony default export */ __webpack_exports__["default"] = (Recorder);


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Recorder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Recorder */ "./src/Recorder.js");
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Player */ "./src/Player.js");
/* harmony import */ var _AudioBank__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AudioBank */ "./src/AudioBank.js");



const recordButton = document.getElementById("recordButton");
const saveButton = document.getElementById("saveButton");

const recorder = new _Recorder__WEBPACK_IMPORTED_MODULE_0__["default"]();
const bank = new _AudioBank__WEBPACK_IMPORTED_MODULE_2__["default"]();
bank.listTracks();
let player;
let currentTrack;

recorder.startStream().then(() => {
  recorder.recorder.addEventListener("stop", () => {
    currentTrack = recorder.extractAudioFile();
    player = new _Player__WEBPACK_IMPORTED_MODULE_1__["default"](null, currentTrack, 0);
  });
});

recordButton.addEventListener("click", () => {
  recorder.toggleRecord();
  recordButton.className = recorder.yieldClass.bind(recorder)();
});

saveButton.addEventListener("click", () => {
  const trackTitle = document.getElementById("trackTitleInput").value;
  document.getElementById("trackTitleInput").value = "";
  bank.save(currentTrack, trackTitle);
});


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map
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

export default Player;

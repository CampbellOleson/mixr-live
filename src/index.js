import Recorder from "./Recorder";
import Player from "./Player";
import AudioBank from "./AudioBank";
const recordButton = document.getElementById("recordButton");
const saveButton = document.getElementById("saveButton");

const recorder = new Recorder();
const bank = new AudioBank();
bank.listTracks();
let player;
let currentTrack;

recorder.startStream().then(() => {
  recorder.recorder.addEventListener("stop", () => {
    currentTrack = recorder.extractAudioFile();
    player = new Player(null, currentTrack, 0);
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

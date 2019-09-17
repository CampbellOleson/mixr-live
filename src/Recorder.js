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
  // console.log(this.audioFile);
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

export default Recorder;

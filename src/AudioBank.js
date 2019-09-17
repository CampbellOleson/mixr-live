import Player from "./Player";

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
      new Player(title, _arrayBufferToFile(this.bank[title]), idx);
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

export default AudioBank;

# MIXR

MIXR is a simple audio EQ where users can record multiple track and play then in sync.

MIXR is built with regular **JavaScript, CSS, and HTML5**.

![Home Page](./screenshots/home.png)

## Features

   **Track Stacking**
   
- MIXR allows you to record multiple tracks and play them back. 
- Recorded tracks are stored in the audio bank. When you click on a track in the audio bank your track will be added to the mix.
- Users can pan through tracks and adjust the volume of each track independently.

![Mix](./screenshots/mix.png)

   **Audio Bank**
   
- Compositions on MIXR aren't lost when a user navigates away from the page. 
- Audio files are base64 encoded and stored as strings in local storage.
- Data URI string is retrieved from local storage upon playback and passed into _arrayBufferToFile(uri).
This helper method uses _base64ToArrayBuffer(uri) to turn URI into array buffer, and then uses this array buffer to contruct a File object.
``` javascript
  function _arrayBufferToFile(uri) {
    const arrayBuffer = _base64ToArrayBuffer(uri);
    const file = new File([arrayBuffer], "success");
    return file;
  }
```
- This way, users can keep multiple tracks on deck without needing to save anything as long as local storage persists. 

![Mix](./screenshots/record.png)

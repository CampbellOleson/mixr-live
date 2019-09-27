# MIXR

MIXR is a dynamic drum machine that lets artists import tracks and adjust audio playback by speeding up, slowing down, or changing the pitch of samples. Mixr allows you to loop and layer tracks that you record. 

MIXR is built with regular **JavaScript, CSS, and HTML5**.

![Home Page](./screenshots/home.png)

## Features

   **Track Stacking**
   
- You can stack bb

![Mix](./screenshots/mix.png)

   **Audio Bank**
   
- Compositions on MIXR aren't lost when a user navigates away from the page. 
- Audio files are base64 encoded and stored as strings in local storage.
- Data URI is retrieved from local storage upon playback and passed into _arrayBufferToFile(uri).
This helper method uses _base64ToArrayBuffer(uri) to turn URI into array buffer, and then uses this array buffer to contruct a File object.
``` javascript
  function _arrayBufferToFile(uri) {
    const arrayBuffer = _base64ToArrayBuffer(uri);
    const file = new File([arrayBuffer], "success");
    return file;
  }
```


![Mix](./screenshots/record.png)

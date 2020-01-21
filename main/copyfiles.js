const fs = require('fs-extra');
const path = require('path');
const { ipcMain } = require('electron');


ipcMain.on('save-photos', (event, arg) => {
  const {saveLocation, fromLocation, fileNameList } = arg;
  let done = 0;
  let arrLength = fileNameList.length;
  fileNameList.forEach(element => {
    fs.copy(path.join(fromLocation, element), path.join(saveLocation, element))
    .then(() => {
      done += 1;
      if(arrLength === done){
        event.sender.send('photos-saved', true);
      }
    })
    .catch(err => {
      event.sender.send('photos-saved', false);
    });
  });
});
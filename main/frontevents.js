const fs = require('fs');

const { ipcMain } = require('electron');

const dialog = require('electron').dialog;

const { mainWindow } = require('./main');

// ipcMain.on('selectd-photos', (event, arg) => {
//   let folder = path.dirname(arg);
//   let photosList = [];
//   fs.readdir(folder, function (err, files) {
//     if (err) {
//       return console.log('Unable to scan directory: ' + err);
//     }
//     files.forEach(function (file) {
//       photosList.push(file);
//     });
//     event.sender.send('selectd-photos-reply', photosList);
//   });
// });


ipcMain.on('save-folder', (event, arg) => {
  openFolderSelector(event, 'save-folder-reply');
});

ipcMain.on('selectd-photos', (event, arg) => {
  openFolderSelectorWithList(event, 'selectd-photos-reply');
});

ipcMain.on('all-photos', (event, arg) => {
  openFolderSelectorWithList(event, 'all-photos-reply');
});

function openFolderSelectorWithList(event, eventName){
  dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory'],
  }).then(value => {
    let folderPath = '';
    if (!value.canceled) {
      folderPath = value.filePaths[0];
    }
    if (!folderPath) { event.sender.send(eventName, { path: '', list: [] }); }
    let photosList = [];
    fs.readdir(folderPath, function (err, files) {
      if (err) {
        return console.log('Unable to scan directory: ' + err);
      }
      files.forEach(function (file) {
        photosList.push(file);
      });
      event.sender.send(eventName, { path: folderPath, list: photosList });
    });
  });
}

function openFolderSelector(event, eventName) {
  dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory'],
  }).then(value => {
    let folderPath = '';
    if (!value.canceled) {
      folderPath = value.filePaths[0];
    }
    event.sender.send(eventName, folderPath);
  });
}


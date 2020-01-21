import React from 'react';
import { Grid, Typography, Paper, Button, LinearProgress } from '@material-ui/core';
import { homeStyles } from './HomeStyle';
import FileList from './FileList';
import MiddleBlock from './MiddleBock';
import { findMatchedFiles, spreadIt } from '../../comman/helper';
import { render } from 'react-dom';

const { ipcRenderer } = require('electron');

const initState = {
  selectedPhotos: [],
  allPhotos: [],
  selectedPhotosFolder: '',
  allPhotosFolder: '',
  saveFolder: '',
  matchedFiles: [],
  saving: false,
  message: '',
};

class Home extends React.Component {
  constructor() {
    super();
    this.state = initState;

    this.onChooseSelectedPhotos.bind(this);
    this.onChooseAllPhotos.bind(this);
    this.onChooseSave.bind(this);
    this.reset.bind(this);

    ipcRenderer.on('selectd-photos-reply', (event, arg) => {
      let { allPhotos } = this.state;

      this.setState(spreadIt(this.state, {
        selectedPhotos: arg.list,
        selectedPhotosFolder: arg.path,
      }), () => {
        findMatchedFiles(allPhotos, arg.list)
          .then(list => {
            this.setState(spreadIt(this.state, { matchedFiles: list }));
          });
      });
    });

    ipcRenderer.on('all-photos-reply', (event, arg) => {
      let { selectedPhotos } = this.state;

      this.setState(spreadIt(
        this.state, {
        allPhotos: arg.list,
        allPhotosFolder: arg.path,
      }
      ), () => {
        findMatchedFiles(arg.list, selectedPhotos)
          .then(list => {
            this.setState(spreadIt(this.state, { matchedFiles: list }));
          })
      });
    });

    ipcRenderer.on('save-folder-reply', (event, arg) => {
      this.setState(spreadIt(this.state, { saveFolder: arg }));
    });

    ipcRenderer.on('photos-saved', (event, arg) => {
      this.setState(spreadIt(this.state, { saving: false, message: 'Saved' }));
    });

  }


  onChooseSelectedPhotos() {
    ipcRenderer.send('selectd-photos', 'hi');
  }

  onChooseAllPhotos(files) {
    ipcRenderer.send('all-photos', 'hi');
  }

  onChooseSave() {
    ipcRenderer.send('save-folder', 'hi');
  }

  reset() {
    this.setState(initState);
  }

  save() {
    const { saveFolder, allPhotosFolder, matchedFiles } = this.state;
    if(!saveFolder || !allPhotosFolder || matchedFiles.length === 0 ) {
      return this.setState(spreadIt(this.state, {message: 'Nothing to Save Here'}));
    }

    ipcRenderer.send('save-photos', { saveLocation: saveFolder, fromLocation: allPhotosFolder, fileNameList: matchedFiles });
    this.setState(spreadIt(this.state, { saving: true, message: 'Saving...' }));
  }

  render() {
    const { selectedPhotos, allPhotos, selectedPhotosFolder, allPhotosFolder, saveFolder, matchedFiles, saving, message } = this.state;
    return (
      <Grid style={homeStyles.root} container justify='space-between'>
        <Grid item>
          <FileList
            title='Selected Files'
            list={selectedPhotos}
          />
        </Grid>
        <Grid item>
          <Grid container direction='column' justify='space-between' >
            <MiddleBlock
              message='Choose Selected Photos Folder - By Party'
              path={selectedPhotosFolder}
              onChoose={this.onChooseSelectedPhotos}
            />
            <MiddleBlock
              message='Choose All Photos Folder - Orignal'
              path={allPhotosFolder}
              onChoose={this.onChooseAllPhotos}
            />
            <MiddleBlock
              message='Choose Folder to Save'
              path={saveFolder}
              onChoose={this.onChooseSave}
            />
            <Paper style={homeStyles.paper}>
              <Grid style={homeStyles.middleBlock} item>
                <Typography>Number of File Matched: {matchedFiles.length}</Typography>
              </Grid>
            </Paper>
            <Paper style={homeStyles.paper}>
              <Grid style={homeStyles.middleBlock} item>
                <Grid container justify='space-between'>
                  <Grid item>
                    <Button variant='contained' color='secondary' onClick={() => this.reset.call(this)}>Reset</Button>
                  </Grid>
                  
                  <Grid item>
                    <Button variant='contained' color='primary' onClick={() => this.save.call(this)}>Save</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
            {saving && <Grid item><LinearProgress color='secondary'/></Grid>}
            {message && <Paper style={homeStyles.paper}>
              <Grid style={homeStyles.middleBlock} item>
                <Typography color='secondary'>{message}</Typography>
            </Grid>
            </Paper>}
          </Grid>
        </Grid>
        <Grid item>
          <FileList
            title='All Files'
            list={allPhotos}
          />
        </Grid>
      </Grid>
    );
  }
};
export default Home;

import React, { Component, prop, useState } from "react";
import { styled } from '@mui/material/styles';
import {Button, Typography, ListItem, Box} from '@mui/material'
import TextField from '@material-ui/core/TextField';
import ProgressBar from "./progress";
import UploadService from "./uploadService";



function UploadFiles() {
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [fileInfos, setFileInfos] = useState([]);

  // Handle file selection
  const selectFile = (event) => {
    setSelectedFiles(event.target.files);
  };

  // Handle file upload
  function upload () {
    const currentFile = selectedFiles[0];
    setProgress(0);
    setCurrentFile(currentFile);

    UploadService.upload(currentFile, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        console.log(response);
        setMessage(response.data.message);
        setIsError(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setProgress(0);
        setMessage('Could not upload the file!');
        setCurrentFile(undefined);
        setIsError(true);
      });

    setSelectedFiles(undefined);
  };

  // Fetch file data on component mount (you can uncomment this part if needed)
  // useEffect(() => {
  //   UploadService.getFiles().then((response) => {
  //     setFileInfos(response.data);
  //   });
  // }, []);

  return (
    <div className="mg20">
      {currentFile && (
        <ProgressBar progress={progress}></ProgressBar>
      )}

     <form>
       <TextField id="btn-upload" name="btn-upload" type="file" onChange={selectFile}/>
       <Button className="btn-upload" variant="contained" color="primary" component="span" disabled={!selectedFiles}
        onClick={upload}>
          Upload
       </Button>
     </form>
      <Typography variant="subtitle2" className={`upload-message ${isError ? 'error' : ''}`}>
        {message}
      </Typography>

      <ul className="list-group">
        {fileInfos &&
          fileInfos.map((file, index) => (
            <ListItem divider key={index}>
              <a href={file.url}>{file.name}</a>
            </ListItem>
          ))}
      </ul>
    </div>
  );
}

export default UploadFiles;
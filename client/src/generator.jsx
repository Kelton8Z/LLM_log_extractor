import ProgressBar from "./progress";
import React, {useState } from "react";
import {Button} from '@mui/material'
import DraftService from './draftService'

function Generator() {
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [fileList, setFileList] = useState([]);

    function generate() {
        setProgress(0);
        DraftService.generate((event) => {
            setProgress(Math.round((100 * event.loaded) / event.total));
          })
            .then((response) => {
              console.log(response);
              setMessage(response.data.message);
              setIsError(false);
              setFileList(response.data.files);
            })
            .catch((error) => {
              console.error('Error:', error);
              setProgress(0);
              setMessage('Could not generate draft!');
              setIsError(true);
            });
    }

    return <>
        <Button className="btn-upload" variant="contained" color="primary" component="span"
            onClick={generate}>
            Generate
        </Button>
        <ul>
        {fileList && fileList.map((fileName, index) => (
          <li key={index}>{fileName}</li>
        ))}
      </ul>
    </>
}

export default Generator;
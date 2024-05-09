import React, { useState } from 'react';
import { Grid, TextField, Button, IconButton, InputAdornment } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import UploadFiles from './uploadButton';

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  async function handleSend() {
    // Send message logic
    console.log('Sending message:', message);

    const fetch = require('node-fetch'); // Only required if you're using Node.js

    let data = JSON.stringify({
    "messages": [
        {
        "content": "You are a helpful assistant",
        "role": "system"
        },
        {
        "content": message,
        "role": "user"
        }
    ],
    "model": "deepseek-coder",
    "frequency_penalty": 0,
    "max_tokens": 2048,
    "presence_penalty": 0,
    "stop": null,
    "stream": false,
    "temperature": 1,
    "top_p": 1,
    "logprobs": false,
    "top_logprobs": null
    });

    let url = 'https://api.deepseek.com/chat/completions';
    let headers = {
        'Content-Type': 'application/json', 
        'Accept': 'application/json', 
        'Authorization': 'Bearer ' + process.env.API_KEY
    };

    fetch(url, {
        method: 'POST', // Method type
        headers: headers,
        body: data // Data to be sent
    })
    .then((response) => response.json()) // Converting the response to JSON
    .then((data) => {
        console.log(JSON.stringify(data));
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    setMessage('');
  };

  return (
    // <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <TextField
            id="outlined-multiline-static"
            label="Type your question..."
            multiline
            fullWidth
            value={message}
            onChange={handleMessageChange}
          />
        </Grid>
        <Grid item xs={1}>
          <IconButton onClick={handleSend} disabled={!message} color="primary">
            <SendIcon />
          </IconButton>
        </Grid>
        <Grid item xs={1}>
          <UploadFiles></UploadFiles>
        </Grid>
      </Grid>
    // </div>
  );
};

export default Chatbot;

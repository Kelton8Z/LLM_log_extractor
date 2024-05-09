import React, { useState } from 'react';
import { Grid, TextField, Button, IconButton, InputAdornment } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import UploadFiles from './uploadButton';
import { css, ThemeProvider } from '@emotion/react';

// const theme = {
//     spacing:

// const useStyles = makeStyles (theme => ({
//     root : {
//         flexGrow: 1,
//         padding: theme.spacing(2),
//     },
// }))

const Chatbot = () => {
//   const classes = useStyles();
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSend = () => {
    // Send message logic
    console.log('Sending message:', message);
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

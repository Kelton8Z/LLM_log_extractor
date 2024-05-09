import UploadPrecedents from './uploadPrecedents';
import UploadClientDocs from './uploadClientDocs';
import UploadFiles from './uploadButton';
import Generator from './generator';
import Chatbot from './chatbot';
import React from 'react';

import { styled } from '@material-ui/core/styles' 
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function ColumnsGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <h2 style={{ textAlign: "center" }}>
        Ask your AI oncall copilot.
      </h2>
      <Chatbot></Chatbot>
    </Box>
  );
}

function App() {
  return (
    <ColumnsGrid></ColumnsGrid>
  )
}

export default App;
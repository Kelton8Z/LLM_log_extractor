 import UploadPrecedents from './uploadPrecedents';
 import UploadClientDocs from './uploadClientDocs';
 import UploadFiles from './uploadButton';
 import Generator from './generator';
 import React from 'react';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

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
      <h2 style={{textAlign: "center"}}>
        Discover how Automated Legal Drafting transforms your workflow.
      </h2>
      <Grid container spacing={2} columns={16}>
        <Grid item xs={8} style={{ display: 'flex', flexDirection: 'column'}}>
          <div>
          <h4>
              Precedent(s)
          </h4>
            <Item>
              <Grid container spacing={2} justifyContent="center">
                <UploadPrecedents></UploadPrecedents>
              </Grid>
            </Item>
          </div>
          <div>
          <h4>
            Client info
         </h4>
          <Item>
            <Grid container spacing={2} justifyContent="center">
               <UploadClientDocs></UploadClientDocs>
            </Grid>
          </Item>
          </div>
        </Grid>
        <Grid item xs={8}>
        <div style={{ display: 'flexGrow' }}>
            <h4>
               Draft
            </h4>
          <Item>
            <Generator></Generator>
          </Item>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}

 function App(){
    return (
      <ColumnsGrid></ColumnsGrid>
    )
 }

 export default App;
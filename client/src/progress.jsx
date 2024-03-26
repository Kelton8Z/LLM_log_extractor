import { withStyles } from '@mui/styles';
import {Typography} from '@mui/material'
import LinearProgress from '@material-ui/core/LinearProgress';

const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 15,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: "#EEEEEE",
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#1a90ff',
    },
  }))(LinearProgress);

function ProgressBar({progress}) {
    return (
        <div className="mb25">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '100%', marginRight: 1 }}>
              <BorderLinearProgress variant="determinate" value={progress} />
            </div>
            <div style={{ minWidth: 35 }}>
              <Typography variant="body2" color="textSecondary">{`${progress}%`}</Typography>
            </div>
          </div>
        </div>
    )
}

export default ProgressBar;
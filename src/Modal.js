import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import './Modal.css';

export default function Modal({show,close,title,children}) {
// console.log(ancillary);
  // console.log(Object.keys(ancillary).length);
//  console.log(ancillary=={});
//   const [open, setOpen] = useState(open);
//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog open={show} onClose={close} aria-labelledby="form-dialog-title">
        
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={close} color="primary">
            Change
          </Button>
          <Button onClick={close} color="primary">
            Confirm
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}

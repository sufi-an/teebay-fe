import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as React from "react";

export default function ConfirmPopup(props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    props.setOpen(false);
  };
  const handleInput = () => {
    props.inputHandler();
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Do you want to proceed?"}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            
          </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            autoFocus
            onClick={handleClose}
            color="error"
           
          >
            Close
          </Button>
          <Button
            variant="outlined"
            onClick={handleInput}
            autoFocus
            color="primary"
          
          >
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

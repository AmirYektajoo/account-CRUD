import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function FormDialog({
  addHandler,
  updateHandler,
  open,
  setOpen,
  user,
}) {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [extcustid, setExtcustid] = useState("");
  const [phone, setPhone] = useState("");
  const [isUpdate, setIsupdate] = useState(false);

  useEffect(() => {
    if (Object.values(user).length > 0) {
      setFname(user.first_name);
      setLname(user.last_name);
      setExtcustid(user.extcustid);
      setPhone(user.phone);
      setIsupdate(true);
    }
  }, [user]);

  const handleClickOpen = () => {
    setFname("");
    setLname("");
    setExtcustid("");
    setPhone("");
    setIsupdate(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const data = {
      first_name: fname,
      last_name: lname,
      extcustid: extcustid,
      phone: phone,
    };
    if (isUpdate) {
      updateHandler(data);
    } else {
      addHandler(data);
    }
    setOpen(false);
    setFname("");
    setLname("");
    setExtcustid("");
    setPhone("");
    setIsupdate(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open new Account
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Account</DialogTitle>
        <DialogContent>
          <DialogContentText>Add new Account</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="First name"
            type="text"
            fullWidth
            value={fname}
            onChange={(e) => setFname(e.target.value)}
          />
          <TextField
            margin="dense"
            id="lastname"
            label="Last name"
            type="text"
            fullWidth
            value={lname}
            onChange={(e) => setLname(e.target.value)}
          />
          <TextField
            margin="dense"
            id="extcustid"
            label="Ext Customer ID"
            type="text"
            fullWidth
            disabled={isUpdate}
            value={extcustid}
            onChange={(e) => setExtcustid(e.target.value)}
          />
          <TextField
            margin="dense"
            id="phone"
            label="Phone"
            type="text"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {isUpdate ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

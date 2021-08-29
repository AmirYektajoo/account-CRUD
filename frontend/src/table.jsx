import React, { useState, useEffect } from "react";
import { Container, Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import {
  getAccounts,
  addAccounts,
  deleteAccounts,
  updateAccounts,
} from "./api";
import FormDialog from "./addNewUser";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function DataTable() {
  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    {
      field: "first_name",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    {
      field: "last_name",
      headerName: "Last name",
      width: 150,
      editable: true,
    },
    {
      field: "extcustid",
      headerName: "extcustid",
      type: "number",
      width: 200,
      editable: false,
    },
    {
      field: "phone",
      headerName: "phone",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      editable: true,
    },
    {
      field: "",
      headerName: "Actions",
      sortable: false,
      width: 200,
      renderCell: ({ row }) => {
        const deleteHandlerRow = () => {
          deleteHandler(row.extcustid);
        };
        const updateHandlerRow = () => {
          openUpdate(row);
        };
        return (
          <div>
            <Button onClick={updateHandlerRow}>Update</Button>
            <Button onClick={deleteHandlerRow}>Delete</Button>
          </div>
        );
      },
    },
  ];
  const [accounts, setAccounts] = useState([]);
  const [user, setUser] = useState([]);
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertObject, setAlertObject] = useState({
    message: "Something went wrong",
    type: "error",
  });

  const alertHandleClose = () => {
    setAlertOpen(false);
  };

  useEffect(() => {
    getAccounts()
      .then(({ data }) => setAccounts(data))
      .catch((err) => {
        if (!err.code) {
          setAlertObject({
            message: "API Server is not running!",
            type: "error",
          });
          setAlertOpen(true);
        } else {
          setAlertObject({
            message: "Something went wrong",
            type: "error",
          });
          setAlertOpen(true);
        }
      });
  }, []);

  const addAcountHandler = (body) => {
    addAccounts(body)
      .then(() => {
        return getAccounts().then(({ data }) => {
          setAccounts(data);
          setAlertObject({
            message: "User Add Successfully",
            type: "success",
          });
          setAlertOpen(true);
        });
      })
      .catch((err) => {
        setAlertObject({
          message: "Something went wrong",
          type: "error",
        });
        setAlertOpen(true);
      });
  };

  const deleteHandler = (extcustid) => {
    deleteAccounts(extcustid)
      .then(() => {
        getAccounts().then(({ data }) => {
          setAccounts(data);
          setAlertObject({
            message: "User Delete Successfully",
            type: "success",
          });
          setAlertOpen(true);
        });
      })
      .catch((err) => {
        setAlertObject({
          message: "Something went wrong",
          type: "error",
        });
        setAlertOpen(true);
      });
  };

  const openUpdate = (user) => {
    setUser(user);
    setOpen(true);
  };

  const updateAcountHandler = (body) => {
    updateAccounts(body)
      .then(() => {
        getAccounts().then(({ data }) => {
          setAccounts(data);
          setAlertObject({
            message: "User Update Successfully",
            type: "success",
          });
          setAlertOpen(true);
        });
      })
      .catch((err) => {
        setAlertObject({
          message: "Something went wrong",
          type: "error",
        });
        setAlertOpen(true);
      });
  };

  return (
    <Container>
      <FormDialog
        addHandler={addAcountHandler}
        updateHandler={updateAcountHandler}
        user={user}
        open={open}
        setOpen={setOpen}
      />
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={accounts}
          columns={columns}
          pageSize={5}
          disableSelectionOnClick
        />
      </div>
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={alertHandleClose}
      >
        <Alert onClose={alertHandleClose} severity={alertObject.type}>
          {alertObject.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

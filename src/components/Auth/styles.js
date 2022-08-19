import { makeStyles } from "@mui/styles";


export default makeStyles((theme) => ({
  paper: {
    marginTop: "84px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "16px",
  },
  root: {
    "& .MuiTextField-root": {
      margin: "8px",
    },
  },
  avatar: {
    margin: "8px",
    backgroundColor: "#6d1b7b !important",
  },
  form: {
    width: "100%",
    marginTop: "24px",
  },
  submit: {
    margin: "24px 0 12px !important",
  },
  googleButton: {
    margin: "6px 0 !important",
  },
}));

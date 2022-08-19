import { makeStyles } from "@mui/styles";

export default makeStyles({
  root: {
    '& .MuiTextField-root': {
      margin: "8px",
    },
  },
  paper: {
    padding: "16px",
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    margin: '10px !important',
  },
});
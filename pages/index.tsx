import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import api from "../src/api";

export default function Home() {
  interface Root {
    user: User;
  }

  interface User {
    name: string;
    url: string;
  }

  function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const [open, setOpen] = useState(false);
  const [fails, setFails] = useState(false);

  const handleClick = (fail?: boolean) => {
    handleClose();
    setOpen(true);
    fail && setFails(true);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const registerUser = async (event) => {
    event.preventDefault();

    const user: User = {
      name,
      url: "",
    };

    try {
      console.log("Entrou");

      const {
        data: { user: userCreated },
      } = await api.post("/admin", user);
      setName("");
      console.log(userCreated);

      handleClick();
    } catch (error) {
      console.log(error);
      handleClick(true);
      setName("");
    }
  };

  const [name, setName] = useState<string>("");

  return (
    <div className={styles.container}>
      <form onSubmit={registerUser} className={styles.container3}>
        <input
          placeholder="John"
          id="name"
          type="text"
          className={styles.inp}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <button className={styles.enter} type="submit">
          Create
        </button>
        {/* <h2>{Platform.OS}</h2> */}
      </form>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={fails ? "error" : "success"}>
          {fails
            ? "Fails to create a Name, try another Name"
            : "Created with success!"}
        </Alert>
      </Snackbar>
    </div>
  );
}

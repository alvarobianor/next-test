import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import api from "../src/api";
import { useRouter } from "next/router";
import Platform from "react-platform-js";
interface User {
  name: string;
  url: string;
}

export default function Home() {
  const route = useRouter();

  // mudar para receber dotenv

  const base = JSON.stringify(process.env.NEXT_PUBLIC_DO);
  const [, baseUrl, y] = base.split(`"`);

  const urlApi =
    "https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyATRxIHp82xCYa1hCTa5b8hTNrqB49TIeU";

  const { name: urlName } = route.query;
  const localHost = `${baseUrl}${urlName}`;
  const longDynamicLink = `https://alvarobianorrn.page.link/?link=http://alvarobianorrn/Nome?${urlName}&apn=com.alvarobianorrn&afl=${localHost}&ibi=${localHost}`;

  function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const getUser = async () => {
    try {
      const {
        data: {
          user: { name: nameUser },
        },
      } = await api.get(`/${urlName}`);
      setName(nameUser);

      const rawResponse = await fetch(urlApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ longDynamicLink }),
      });

      const { shortLink } = await rawResponse.json();
      console.log(shortLink);
      setUrl(shortLink);
    } catch (error) {
      console.log(error);
      route.push("/");
    }
  };

  useEffect(() => {
    urlName && getUser();
  }, [urlName]);

  const [name, setName] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  return (
    <div className={styles.container}>
      {name && (
        <div className={styles.container2}>
          <h1 className={styles.H1}>This page is for: {name}</h1>

          <button
            type="button"
            className={styles.enter}
            onClick={() => {
              // add tratamento quando tiver o ios
              handleClick();
              navigator.clipboard.writeText(
                Platform.OS !== "Android" ? localHost : url
              );
            }}
          >
            Share
          </button>
        </div>
      )}
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          Link copied to the clipboard!
        </Alert>
      </Snackbar>
    </div>
  );
}

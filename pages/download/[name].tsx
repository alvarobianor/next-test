import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "../../styles/Home.module.css";
import api from "../../src/api";
import { useRouter } from "next/router";
import Platform from "react-platform-js";

interface User {
  name: string;
  url: string;
}

export default function Home() {
  const route = useRouter();

  const urlApi =
    "https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyATRxIHp82xCYa1hCTa5b8hTNrqB49TIeU";

  const { name: urlName, id } = route.query;

  const drive =
    "https://drive.google.com/drive/folders/1H8Yq-wkw9X1dyPpQZDNppjb9-A-tQanY?usp%3Dsharing";
  const longDynamicLink = `https://alvarobianorrn.page.link/?link=http://alvarobianorrn/Nome?${urlName}&apn=com.alvarobianorrn&afl=${drive}&ibi=${drive}`;

  console.log(id);

  const getUser = async () => {
    try {
      const {
        data: {
          user: { name: nameUser, url },
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
          <>
            <h1 className={styles.H1Title}>
              Download the app to see the page about the {name}
            </h1>
          </>
          <button type="button" className={styles.enter}>
            <a
              href={
                Platform.OS !== "Android" && Platform.OS !== "Ios"
                  ? drive
                  : longDynamicLink
              }
            >
              Download
            </a>
          </button>
        </div>
      )}
      {name && Platform.OS !== "Android" && Platform.OS !== "Ios" && (
        <h1 className={styles.H1Inform}>
          Even if you are not on a mobile device, you will be redirected to the
          Android download page
        </h1>
      )}
    </div>
  );
}

import Head from "next/head";
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
  const baseUrl = "http://localhost:3000/download/";

  const urlApi =
    "https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyATRxIHp82xCYa1hCTa5b8hTNrqB49TIeU";

  const { name: urlName, id } = route.query;

  const drive =
    "https://drive.google.com/drive/folders/1H8Yq-wkw9X1dyPpQZDNppjb9-A-tQanY?usp%3Dsharing";

  const localHost = `${baseUrl}${urlName}`;
  const longDynamicLink = `https://alvarobianorrn.page.link/?link=http://alvarobianorrn/Nome?${urlName}&apn=com.alvarobianorrn&afl=${localHost}&ibi=com.example.ios`;

  console.log("base", process.env.DOMAIN);
  console.log("base2", process.env.DO);

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
    <div className={styles.container2}>
      {name && <h1>This page is for: {name}</h1>}
      <button
        type="button"
        onClick={() => {
          // add tratamento quando tiver o ios
          navigator.clipboard.writeText(
            Platform.OS !== "Android" ? localHost : url
          );
        }}
      >
        Share
      </button>
    </div>
  );
}

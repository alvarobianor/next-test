import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
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
  const longDynamicLink = `https://alvarobianorrn.page.link/?link=http://alvarobianorrn/Nome?${urlName}&apn=com.alvarobianorrn&afl=${drive}&ibi=com.example.ios`;

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
      {name && <h1>Esse é o {name}</h1>}
      <button type="button">
        <a href={Platform.OS !== "Android" ? drive : url}>Share</a>
      </button>
    </div>
  );
}

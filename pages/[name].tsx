import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import api from "../src/api";
import { useRouter } from "next/router";

interface User {
  name: string;
  url: string;
}

export default function Home() {
  const route = useRouter();

  const { name: urlName } = route.query;

  const getUser = async () => {
    try {
      const {
        data: {
          user: { name: nameUser, url },
        },
      } = await api.get(`/${urlName}`);
      setName(nameUser);
      setUrl(url);
    } catch (error) {
      console.log(error);
      route.push("/");
    }
  };

  const deepLink = () => {
    console.log("aaaaa");
    setUrl("https://alvarobianorrn.page.link/test");
  };

  useEffect(() => {
    urlName && getUser();
  }, [urlName]);

  // const registerUser = async (event) => {
  //   event.preventDefault();

  //   const user: User = {
  //     name,
  //     url: "",
  //   };

  //   try {

  //     const {
  //       data: { user: userCreated },
  //     } = await api.post("/admin", user);
  //     setName("");
  //     console.log(userCreated);

  //     alert("Created!");
  //   } catch (error) {
  //     console.log(error);
  //     alert("Error");
  //   }
  // };

  const [name, setName] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  return (
    <div className={styles.container2}>
      {name && <h1>Esse é o {name}</h1>}
      <button type="button" onClick={deepLink}>
        <a href="https://alvarobianorrn.page.link/host">Share</a>
      </button>
    </div>
  );
}

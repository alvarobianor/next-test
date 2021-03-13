import Head from "next/head";
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

      alert("Created!");
    } catch (error) {
      console.log(error);
      alert("Error");
    }
  };

  const [name, setName] = useState<string>("");

  return (
    <div className={styles.container}>
      <form onSubmit={registerUser} className={styles.container2}>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <button className={styles.enter} type="submit">
          CREATE
        </button>
      </form>
    </div>
  );
}

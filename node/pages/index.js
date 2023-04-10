import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();
  const [foods, setFoods] = useState([""]);
  const [tema, setTema] = useState(50);

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          食料:foods.filter(food => food !== ""),
          手間: tema
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setAnimalInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>レシピAI</h3>
        <h3>らくらく度 (%)</h3>
        <form onSubmit={onSubmit}>
        <input
            type="number"
            name="animal"
            placeholder=""
            value={tema}
            onChange={(e) => {
              setTema(e.target.value)
            }}
          />
        <h3>食材</h3>
        {foods.map((food,index) => (
          <input
            type="text"
            name="animal"
            placeholder="具材を入力してください"
            value={food}
            onChange={(e) => {
              const _newFoods = foods.slice()
              _newFoods[index] = e.target.value

              if(index === _newFoods.length - 1) {
                if(_newFoods[index] !== ""){
                  _newFoods.push("")
                }
              }
              setFoods(_newFoods)
            }}
          />
        ))}
          <input type="submit" value="おすすめレシピを聞く" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}

import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [result, setResult] = useState();
  const [foods, setFoods] = useState([""]);
  const [tema, setTema] = useState(50);
  const [voiceUrl, setVoiceUrl] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const payload = `食材: [${foods.join(",")}], 手間: ${tema}`
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputText: payload }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setFoods([""]);

      const startPosition = data.result.indexOf('レビュー:') + 5;
      const voicevoxText = data.result.substr(startPosition)

      const voicevoxResponse = await fetch("/api/voicevox", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ voicevoxText: voicevoxText }),
      });

      const voicevoxData = await voicevoxResponse.json();
      if (voicevoxResponse.status !== 200) {
        throw voicevoxData.error || new Error(`Request failed with status ${response.status}`);
      }

      setVoiceUrl(voicevoxData.voicevoxUrl)
      document.getElementById("media").play();

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
        <h3>レシピAIの作った料理を酷評するずんだもん</h3>
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
        <video
          src={voiceUrl}
          autoPlay
          playsInline
          type="audio/x-wav"
          name="media" 
          id="media"
        />
      </main>
    </div>
  );
}

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const inputText = req.body.inputText || '';

  try {
    console.log(inputText)
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: chatConfig
        },
        {
          role: "user",
          content: `
            ${inputText}
          `
        }
      ],
      temperature: 0.6,
    });
    res.status(200).json({ result: completion.data.choices[0].message.content });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

const chatConfig = `
あなたにはこれから以下の2つの人格を演じてもらいます。
    1つ目は、「プロの料理人」です。
    2つ目は、「プロの料理批評家」です。
    以下に、それぞれの性質を示します。

    # プロの料理人の性質
    - 指定された{食材}に対して、それがどんな食材であっても、それに応じたレシピを考えることができます。
    - レシピを、順序立てて説明することができます。
    - レシピは、家庭で調理できるように簡単な手順を用います。
    - 入力された{手間}に応じて、レシピの複雑さを調節することができます。
    - 手間は数値で表現され、0が最も簡単で、100が最も複雑です。
    - 口調は丁寧です。

    # プロの料理批評家の性質
    - どんな料理に対しても、味を評価することができます。
    - 正直者で、美味しいものには高い評価を、美味しくないものにはひどい評価をします。
    - 口調はくだけていて、フレンドリーです。

    以下に出力の形式を示します。出力は以下の形式に厳格に従ってください。

    # 出力の形式
    レシピ: {プロの料理人の考えたレシピ}
    レビュー: {プロの料理批評家の、上記のレシピから作られる料理に対する批評}

    それでは、JSON形式で{食材}と{手間}を入力するので、応答を生成してください。
`
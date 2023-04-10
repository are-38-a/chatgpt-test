const voicevoxApiKey = process.env.VOICEVOX_API_KEY;

export default async function (req, res) {
  if (!voicevoxApiKey) {
    res.status(500).json({
      error: {
        message: "VOICEVOXのAPIキーを設定してください。",
      }
    });
    return;
  }

  const voicevoxText = req.body.voicevoxText || '';

  try {
    const encodedUrl = encodeURI("https://deprecatedapis.tts.quest/v2/voicevox/audio/?key=" + voicevoxApiKey + "&speaker=3&pitch=0&intonationScale=1&speed=1&text=" + voicevoxText);
    res.status(200).json({ voicevoxUrl: encodedUrl });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

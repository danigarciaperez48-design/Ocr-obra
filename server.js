const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json({ limit: "10mb" }));

app.post("/ocr", async (req, res) => {
  try {
    const { base64 } = req.body;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + process.env.OPENAI_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1",
        input: [
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: "Lee este albarán y devuélvelo en JSON con datos claros"
              },
              {
                type: "input_image",
                image_url: base64
              }
            ]
          }
        ]
      })
    });

    const data = await response.json();
    res.json(data);

  } catch (error) {
    res.status(500).json({ error: "Fallo OCR" });
  }
});

app.listen(3000, () => console.log("OK"));

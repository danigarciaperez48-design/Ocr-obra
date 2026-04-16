const express = require("express");
const app = express();

app.use(express.json({limit: "10mb"}));

app.post("/ocr", (req, res) => {
  res.json({
    ok: true,
    mensaje: "Servidor funcionando"
  });
});

app.listen(3000, () => console.log("OK"));

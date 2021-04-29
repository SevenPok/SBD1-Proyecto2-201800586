const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

//midlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());
require("dotenv").config();

//routes
app.get("/api/test", (req, res) => {
  res.json({ message: "funciona la api" });
});

app.use("/api/consults", require("./routes/consultas"));
app.use("/api/pais", require("./routes/pais"));
app.use("/api/pregunta", require("./routes/pregunta"));
app.use("/api/invento", require("./routes/invento"));
app.use("/api/respuesta", require("./routes/respuesta"));

//port
const port = process.env.PORT;

//listen.port
app.listen(port, () => {
  console.log(`aplicacion de MySQL corriendo en el puerto ${port}`);
});

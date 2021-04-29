const pool = require("../pool");

exports.update = async (req, res) => {
  let { id, idRespuesta, idPregunta } = req.body;
  try {
    pool.query(
      `
      UPDATE respuesta_correcta set id_respuesta = ${idRespuesta}, id_pregunta = ${idPregunta}
      WHERE id = ${id}
      `,
      (err, response) => {
        if (err) {
          console.log(err);
          res.json({ success: "anwer not updated" });
        } else {
          res.json({ success: "anwer successfully updated" });
        }
        res.end();
      }
    );
  } catch (error) {
    return res.json({ success: "anwer not updated" });
  }
};

exports.read = async (req, res) => {
  try {
    pool.query(`SELECT * FROM respuesta_correcta`, (err, response) => {
      if (err) console.log(err);
      if (response.length) {
        res.json({ response });
      }
      res.end();
    });
  } catch (error) {
    return res.json({ success: "anwer not finded" });
  }
};

exports.getRespuesta = async (req, res) => {
  let { id } = req.params;
  try {
    pool.query(
      `SELECT * FROM respuesta_correcta WHERE id = ${id}`,
      (err, response) => {
        if (err) console.log(err);
        if (response.length) {
          res.json({ response });
        }
        res.end();
      }
    );
  } catch (error) {
    return res.json({ success: "anwer not finded" });
  }
};

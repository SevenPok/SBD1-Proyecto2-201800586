const pool = require("../pool");

exports.update = async (req, res) => {
  let { id, nombre, anio, idPais } = req.body;
  try {
    pool.query(
      `
      UPDATE invento set nombre = '${nombre}', anio = ${anio}, id_pais = ${idPais}
      WHERE id = ${id}
      `,
      (err, response) => {
        if (err) {
          console.log(err);
          res.json({ success: "invent not updated" });
        } else {
          res.json({ success: "invent successfully updated" });
        }
        res.end();
      }
    );
  } catch (error) {
    return res.json({ success: "invent not updated" });
  }
};

exports.read = async (req, res) => {
  try {
    pool.query(`SELECT * FROM invento`, (err, response) => {
      if (err) console.log(err);
      if (response.length) {
        res.json({ response });
      }
      res.end();
    });
  } catch (error) {
    return res.json({ success: "invent not finded" });
  }
};

exports.getInvento = async (req, res) => {
  let { id } = req.params;
  try {
    pool.query(`SELECT * FROM invento WHERE id = ${id}`, (err, response) => {
      if (err) console.log(err);
      if (response.length) {
        res.json({ response });
      }
      res.end();
    });
  } catch (error) {
    return res.json({ success: "country not finded" });
  }
};

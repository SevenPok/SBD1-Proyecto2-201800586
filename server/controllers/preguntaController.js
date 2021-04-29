const pool = require("../pool");

exports.create = async (req, res) => {
  let { pregunta, idEncuesta } = req.body;
  try {
    pool.query(
      `
        INSERT INTO pregunta(pregunta, id_encuesta)
        VALUES('${pregunta}', ${idEncuesta})
    `,
      (err, response) => {
        if (err) {
          console.log(err);
          res.json({ success: "question not created" });
        } else {
          res.json({ success: "question successfully created" });
        }
        res.end();
      }
    );
  } catch (error) {
    return res.json({ success: "question not created" });
  }
};

exports.read = async (req, res) => {
  try {
    pool.query(`SELECT * FROM pregunta`, (err, response) => {
      if (err) console.log(err);
      if (response.length) {
        res.json({ response });
      }
      res.end();
    });
  } catch (error) {
    return res.json({ success: "question not finded" });
  }
};

exports.getPregunta = async (req, res) => {
  let { id } = req.params;
  try {
    pool.query(`SELECT * FROM pregunta WHERE id = ${id}`, (err, response) => {
      if (err) console.log(err);
      if (response.length) {
        res.json({ response });
      }
      res.end();
    });
  } catch (error) {
    return res.json({ success: "question not finded" });
  }
};

exports.update = async (req, res) => {
  let { id, pregunta, idEncuesta } = req.body;
  try {
    pool.query(
      `
    UPDATE pregunta set pregunta = '${pregunta}', id_encuesta = ${idEncuesta}
    WHERE id = ${id}
    `,
      (err, response) => {
        if (err) {
          console.log(err);
          res.json({ success: "question not updated" });
        } else {
          res.json({ success: "question successfully updated" });
        }
        res.end();
      }
    );
  } catch (error) {
    return res.json({ success: "question not updated" });
  }
};

exports.delete = async (req, res) => {
  let { id } = req.params;
  try {
    pool.query(
      `
      DELETE FROM pregunta WHERE ID = ${id}; 
    `,
      (err, response) => {
        if (err) {
          console.log(err);
          res.json({ success: "question not deleted" });
        } else {
          res.json({ success: "question successfully deleted" });
        }
        res.end();
      }
    );
  } catch (error) {
    return res.json({ success: "question not deleted" });
  }
};

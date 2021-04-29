const pool = require("../pool");

exports.create = async (req, res) => {
  let { nombre, poblacion, area, capital, idRegion } = req.body;
  try {
    pool.query(
      `
        INSERT INTO pais(nombre, poblacion, area, capital, id_region)
        VALUES('${nombre}', ${poblacion}, ${area}, '${capital}', ${idRegion})
    `,
      (err, response) => {
        if (err) {
          console.log(err);
          res.json({ success: "country not created" });
        } else {
          res.json({ success: "country successfully created" });
        }
        res.end();
      }
    );
  } catch (error) {
    return res.json({ success: "country not created" });
  }
};

exports.read = async (req, res) => {
  try {
    pool.query(`SELECT * FROM pais`, (err, response) => {
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

exports.getPais = async (req, res) => {
  let { id } = req.params;
  try {
    pool.query(`SELECT * FROM pais WHERE id = ${id}`, (err, response) => {
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

exports.update = async (req, res) => {
  let { id, nombre, poblacion, area, capital, idRegion } = req.body;
  try {
    pool.query(
      `
    UPDATE pais set nombre = '${nombre}', poblacion = ${poblacion}, area = ${area}, capital = '${capital}', id_region = ${idRegion}
    WHERE id = ${id}
    `,
      (err, response) => {
        if (err) {
          console.log(err);
          res.json({ success: "country not updated" });
        } else {
          res.json({ success: "country successfully updated" });
        }
        res.end();
      }
    );
  } catch (error) {
    return res.json({ success: "country not updated" });
  }
};

exports.delete = async (req, res) => {
  let { id } = req.params;
  try {
    pool.query(
      `
      DELETE FROM pais WHERE ID = ${id}; 
    `,
      (err, response) => {
        if (err) {
          console.log(err);
          res.json({ success: "country not deleted" });
        } else {
          res.json({ success: "country successfully deleted" });
        }
        res.end();
      }
    );
  } catch (error) {
    return res.json({ success: "country not deleted" });
  }
};

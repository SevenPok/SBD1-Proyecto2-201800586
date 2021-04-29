const pool = require("../pool");
const mysql = require("../slq/prueba.sql");

exports.getConsulta1 = async (req, res) => {
  try {
    pool.query(
      "\
        select p.nombre, count(i.id) as no_inventos from profesional p, asigna_invento a, invento i\
        where a.id_profesional = p.id and a.id_invento = i.id\
        group by p.nombre\
        order by no_inventos desc",
      (err, response) => {
        if (err) console.log(err);
        if (response.length) {
          res.json({ response });
        }
        res.end();
      }
    );
  } catch (error) {
    return res.json(error);
  }
};

exports.getConsulta2 = async (req, res) => {
  try {
    pool.query(
      "\
        select aux.pais, aux.region, count(pr.id_pais) as no_respuesta from (select p.id as id, p.nombre as pais, r.nombre as region from pais p\
        left join region r\
        on p.id_region = r.id) as aux\
        left join pais_respuesta pr\
        on aux.id = pr.id_pais\
        group by aux.pais\
        order by aux.pais",
      (err, response) => {
        if (err) console.log(err);
        if (response.length) {
          res.json({ response });
        }
        res.end();
      }
    );
  } catch (error) {
    return res.json(error);
  }
};

exports.getConsulta3 = async (req, res) => {
  try {
    pool.query(
      "\
        select * from\
        (\
            select p.nombre as pais, p.area as area from pais p\
            left join inventor i\
            on p.id = i.id_pais\
            where i.id_pais is null\
            group by p.nombre\
        ) as a\
        inner join\
        (\
            select p.nombre as pais, p.area as area from pais p\
            left join frontera f\
            on p.id = f.id_pais\
            where f.id_pais_vecino is null\
            group by p.nombre\
        ) as b\
        on a.pais = b.pais\
        group by a.pais\
        order by a.area desc",
      (err, response) => {
        if (err) console.log(err);
        if (response.length) {
          res.json({ response });
        }
        res.end();
      }
    );
  } catch (error) {
    return res.json(error);
  }
};

exports.getConsulta4 = async (req, res) => {
  try {
    pool.query(
      `
        select t.jefe, t.trabajador from 
        (
            (
                select j.jefe, e.trabajador, j.area from
                (
                    select p.id, p.nombre as jefe, a.nombre as area from profesional p, area a
                    where a.id_jefe = p.id
                ) as j,
                (
                    select p.id, p.nombre as trabajador, a.nombre as area from profesional p, profe_area pa, area a
                    where p.id = pa.id_profesional and pa.id_area = a.id and p.id != 8 
                ) as e
                where j.area = e.area
                order by j.jefe, e.trabajador
            )
            union
            (
                select j.jefe, t.trabajador, a.nombre from
                (
                    select p.id, p.nombre as jefe, a.nombre as area from profesional p, area a
                    where a.nombre = 'TODAS' and p.id = a.id_jefe
                ) as j,
                (
                    select p.id, p.nombre as trabajador, a.nombre as area from profesional p
                    left join area a
                    on a.id_jefe = p.id
                ) as t,
                profe_area p, area a
                where a.id = p.id_area and t.id = p.id_profesional and p.id_profesional != 8
                group by t.trabajador
                order by t.trabajador
            )
        ) as t
        order by t.jefe, t.trabajador
    `,
      (err, response) => {
        if (err) console.log(err);
        if (response.length) {
          res.json({ response });
        }
        res.end();
      }
    );
  } catch (error) {
    return res.json(error);
  }
};

exports.getConsulta5 = async (req, res) => {
  try {
    pool.query(
      `
        select
        p.nombre,
        a.nombre as area,
        p.salario,
        round((
                select avg(promedio.salario) from 
                (
                    select p.salario as salario from profesional p, profe_area pa, area a2
                    where p.id = pa.id_profesional and a2.id = pa.id_area and a2.nombre = a.nombre
                    group by p.nombre
                ) as promedio
            ),2) as promedio
        from area a, profesional p, profe_area pa
        where 
        p.salario > round(
                            (
                                select avg(promedio.salario) from 
                                (
                                    select p.salario as salario from profesional p, profe_area pa, area a2
                                    where p.id = pa.id_profesional and a2.id = pa.id_area and a2.nombre = a.nombre
                                    group by p.nombre
                                ) as promedio
                            ), 2
                        )
        and pa.id_profesional = p.id and pa.id_area = a.id  and a.nombre != 'todas'
        group by p.nombre, a.nombre
        order by a.nombre, salario
        `,
      (err, response) => {
        if (err) console.log(err);
        if (response.length) {
          res.json({ response });
        }
        res.end();
      }
    );
  } catch (error) {
    return res.json(error);
  }
};

exports.getConsulta6 = async (req, res) => {
  try {
    pool.query(
      ` select p.nombre as pais, (case when a.aciertos is null then 0 else a.aciertos end) as aciertos from pais p
        left join 
        (
            select p.nombre as pais, count(pr.id_pais) as aciertos from pais p, pais_respuesta pr, respuesta_correcta rc, respuesta r
            where p.id = pr.id_pais and r.id = pr.id_respuesta and r.id = rc.id_respuesta
            group by p.nombre
        )as a
        on p.nombre = a.pais
        order by a.aciertos desc`,
      (err, response) => {
        if (err) console.log(err);
        if (response.length) {
          res.json({ response });
        }
        res.end();
      }
    );
  } catch (error) {
    return res.json(error);
  }
};

exports.getConsulta7 = async (req, res) => {
  try {
    pool.query(
      `
        select p.nombre as profesional, i.nombre as invento, a.nombre as area from invento i, profesional p, asigna_invento ai, area a, profe_area pa
        where ai.id_invento = i.id and ai.id_profesional = p.id and pa.id_profesional = p.id and pa.id_area = a.id and a.nombre = 'optica'`,
      (err, response) => {
        if (err) console.log(err);
        if (response.length) {
          res.json({ response });
        }
        res.end();
      }
    );
  } catch (error) {
    return res.json(error);
  }
};

exports.getConsulta8 = async (req, res) => {
  try {
    pool.query(
      `
        select UPPER(SUBSTR(REPLACE(p.nombre ,' ',''),1,1)) as letra, sum(p.area) as suma_area from pais p
        group by letra
        order by letra`,
      (err, response) => {
        if (err) console.log(err);
        if (response.length) {
          res.json({ response });
        }
        res.end();
      }
    );
  } catch (error) {
    return res.json(error);
  }
};

exports.getConsulta9 = async (req, res) => {
  try {
    pool.query(
      `
        select * from 
        (
            select UPPER(SUBSTR(trim(i.nombre), 1, 2)) as letra_inventor, i.nombre as inventor, inv.nombre as invento from inventor i, invento inv, inventado i2
            where i2.id_inventor = i.id and i2.id_invento = inv.id
        ) as t
        where t.letra_inventor = 'BE'
        order by t.inventor`,
      (err, response) => {
        if (err) console.log(err);
        if (response.length) {
          res.json({ response });
        }
        res.end();
      }
    );
  } catch (error) {
    return res.json(error);
  }
};

exports.getConsulta10 = async (req, res) => {
  try {
    pool.query(
      `
        select * from
        (
            select 
                UPPER(SUBSTR(trim(i.nombre), 1, 1)) as letra_inventor,
                trim(i.nombre) as inventor, upper(substring(trim(i.nombre),
                length(trim(i.nombre)), 1)) as ultima_letra,
                i2.anio
            from inventor i, invento i2, inventado i3
            where i3.id_invento = i2.id and i3.id_inventor = i.id and
            i2.anio >= 1801 and i2.anio <= 1900
            order by letra_inventor
        ) as t
        where t.letra_inventor = 'B' and (t.ultima_letra = 'R' or t.ultima_letra = 'N')`,
      (err, response) => {
        if (err) console.log(err);
        if (response.length) {
          res.json({ response });
        }
        res.end();
      }
    );
  } catch (error) {
    return res.json(error);
  }
};

exports.getConsulta11 = async (req, res) => {
  try {
    pool.query(
      `
        select * from 
        (
            select p.nombre, p.area, count(f.id_pais_vecino) as no_paises from pais p 
            left join frontera f
            on p.id = f.id_pais
            group by p.nombre
            order by p.area desc
        ) as t
        where t.no_paises > 7`,
      (err, response) => {
        if (err) console.log(err);
        if (response.length) {
          res.json({ response });
        }
        res.end();
      }
    );
  } catch (error) {
    return res.json(error);
  }
};

exports.getConsulta12 = async (req, res) => {
  try {
    pool.query(
      `
        select UPPER(SUBSTR(trim(i.nombre), 1, 4)) as letras, i.nombre as invento from invento i
        where UPPER(SUBSTR(trim(i.nombre), 1, 1)) = 'L' and length(trim(i.nombre)) = 4`,
      (err, response) => {
        if (err) console.log(err);
        if (response.length) {
          res.json({ response });
        }
        res.end();
      }
    );
  } catch (error) {
    return res.json(error);
  }
};

exports.getConsulta13 = async (req, res) => {
  try {
    pool.query(
      `
        select p.nombre, p.salario, p.comision, sum(p.salario + p.comision) as total from profesional p
        where 100*p.comision/p.salario > 25
        group by p.nombre
      `,
      (err, response) => {
        if (err) console.log(err);
        if (response.length) {
          res.json({ response });
        }
        res.end();
      }
    );
  } catch (error) {
    return res.json(error);
  }
};

exports.getConsulta14 = async (req, res) => {
  try {
    pool.query(
      `
        select e.*, p.pregunta, count(pa.id) as no_pais from encuesta e, pregunta p, respuesta r, pais pa, pais_respuesta pr
        where p.id_encuesta = e.id and r.id_pregunta = p.id and pr.id_pais = pa.id and pr.id_respuesta = r.id
        group by p.pregunta
        order by no_pais desc
      `,
      (err, response) => {
        if (err) console.log(err);
        if (response.length) {
          res.json({ response });
        }
        res.end();
      }
    );
  } catch (error) {
    return res.json(error);
  }
};

exports.getConsulta15 = async (req, res) => {
  try {
    pool.query(
      `
        select p.nombre, p.poblacion 
        from pais p,
        (
            select sum(p.poblacion) as poblacion from pais p, region r
            where r.nombre = 'centro america' and r.id = p.id_region
        ) as poblacion
        where p.poblacion > poblacion.poblacion
        order by p.poblacion desc
        `,
      (err, response) => {
        if (err) console.log(err);
        if (response.length) {
          res.json({ response });
        }
        res.end();
      }
    );
  } catch (error) {
    return res.json(error);
  }
};

exports.getConsulta16 = async (req, res) => {
  try {
    pool.query(
      `
      select p.id, p.nombre as profesional, a.nombre as area from profesional p, area a, asigna_invento ai,
      (select i2.id as id_invento from inventor i, invento i2, inventado i3 where i.nombre = 'pasteur' and i3.id_inventor = i.id and i3.id_invento = i2.id) as t
      where p.id = a.id_jefe and ai.id_profesional = p.id and t.id_invento != ai.id_invento
      group by p.nombre
    `,
      (err, response) => {
        if (err) console.log(err);
        if (response.length) {
          res.json({ response });
        }
        res.end();
      }
    );
  } catch (error) {
    return res.json(error);
  }
};

exports.getConsulta17 = async (req, res) => {
  try {
    pool.query(
      `
        select i.nombre, i.anio 
        from invento i,
        (
            select i.nombre as invento, i2.nombre as inventor, i.anio as anio from invento i, inventor i2, inventado i3
            where i3.id_invento = i.id and i3.id_inventor = i2.id and i2.nombre = 'BENZ'
        ) as b
        where i.anio = b.anio
    `,
      (err, response) => {
        if (err) console.log(err);
        if (response.length) {
          res.json({ response });
        }
        res.end();
      }
    );
  } catch (error) {
    return res.json(error);
  }
};

exports.getConsulta18 = async (req, res) => {
  try {
    pool.query(
      `
      select t.nombre, t.poblacion from
      (select p.* from frontera f, pais p where f.id_pais_vecino is NULL and p.id = f.id_pais) as t,
      (select * from pais where nombre = 'japon') as t2
      where t.area >= t2.area
    `,
      (err, response) => {
        if (err) console.log(err);
        if (response.length) {
          res.json({ response });
        }
        res.end();
      }
    );
  } catch (error) {
    return res.json(error);
  }
};

exports.getConsulta19 = async (req, res) => {
  try {
    pool.query(
      `
        select vecino.pais, p.nombre as vecino from pais p,
        (
            select p.nombre as pais, f.id_pais_vecino as vecino from pais p, frontera f
            where p.id = f.id_pais
        ) as vecino
        where p.id = vecino.vecino
    `,
      (err, response) => {
        if (err) console.log(err);
        if (response.length) {
          res.json({ response });
        }
        res.end();
      }
    );
  } catch (error) {
    return res.json(error);
  }
};

exports.getConsulta20 = async (req, res) => {
  try {
    pool.query(
      `
        select p.nombre, p.salario, p.comision from profesional p
        where p.salario > 2*p.comision and p.comision > 0
        `,
      (err, response) => {
        if (err) console.log(err);
        if (response.length) {
          res.json({ response });
        }
        res.end();
      }
    );
  } catch (error) {
    return res.json(error);
  }
};

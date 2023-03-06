//Permite ejecutar acciones cuando este archivo sea visitada
const { json } = require("express");
const { Pool } = require("pg");
const pool = require("../../db");
const jwt = require("jsonwebtoken");
const config = require("../../confi");

// token generado

const getToken = config.jwt.TOKEN_KEY;

//funcion que verfica el token

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
   
    if (token == null) return res.status(401).send("Token requerido");
    jwt.verify(token, TOKEN_KEY, (err, user) => {
      if (err) return res.status(403).send("Token invalido");

      req.user = user;
      next();
    });
  } catch (error) {
    res.status(400);
    res.send({ message: error.message });
  }
};

//Peticion para validar login
const validarLogin = async (req, res) => {
  try {
    const { usuario, contrasenia } = req.body;
    if (usuario && contrasenia) {
      const exisUsu = await pool.query(
        ` SELECT  * FROM login WHERE usuario='${usuario}' `
      );
      const usuarioDb = exisUsu.rows[0];

      if (usuarioDb) {
        if (usuarioDb.contrasenia === contrasenia) {
          const token = jwt.sign(
            { userId: usuario, contrasenia: contrasenia },
            "x4TvnErxRETbVcqaLl5dqMI115eNlp5y",
            { expiresIn: "2h" }
          );
          let nDatos = {
            userId: usuario,
            contrasenia: contrasenia,
            token,
            id: usuarioDb.idusuario,
          };
          res
            .status(200)
            .json({ nDatos, idrol: usuarioDb.idrol, respuesta: true });
        }
      } else {
        res.json({ respuesta: false });
      }
    }
  } catch (error) {
    res.status(400);
    res.send({ message: error.message });
  }
};

//Peticion para crear un login

const crearLogin = async (req, res) => {
  try {
    const { idrol, idusuario, usuario, contrasenia } = req.body;

    const result =
      await pool.query(`INSERT INTO login(idusuario,idrol, usuario, contrasenia)
    VALUES ('${idusuario}', '${idrol}', '${usuario}', '${contrasenia}')`);

    return res.send(result.rows);
  } catch (error) {
    res.status(400);
    res.send({ message: error.message });
  }
};

//peticion para eliminar un login

const eliminarLogin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`DELETE FROM login WHERE idlogin= ${id} `);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Rol no encontrado",
      });
    }
  } catch (error) {
    res.status(400);
    res.send({ message: error.message });
  }
};

// peticion para actualizar un login

const actualizarLogin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { usuario, idusuario, contrasenia } = req.body;

    const result = await pool.query(
      `UPDATE login SET
    idusuario = ${idusuario},
    usuario = '${usuario}',
    contrasenia ='${contrasenia}'
    WHERE idlogin = ${id} `
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "El login que desea actualizar no ha sido encontrado",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  eliminarLogin,
  actualizarLogin,
  validarLogin,
  crearLogin,
};

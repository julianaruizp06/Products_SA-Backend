//Permite ejecutar acciones cuando este archivo sea visitada
const { json } = require("express");
const { Pool } = require("pg");
const pool = require("../../db");

//peticion para ver la tabla de rol
const listarRoles = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM rol");
    res.send(result.rows);
  } catch (error) {
    res.status(400);
    res.send({ message: error.message });
  }
};

//peticion para ver un solo rol
const listarRol = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(`SELECT * FROM rol WHERE  idrol = ${id}`);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(400);
    res.send({ message: error.message });
  }
};

//peticion para crear un rol
const crearRol = async (req, res, next) => {
  try {
    const { nombre, descripcion, estado } = req.body;

    const result =
      await pool.query(`INSERT INTO rol (nombre,descripcion,estado) 
  VALUES('${nombre}', '${descripcion}', ${estado})`);

    res.json(result.rows[0]);
  } catch (error) {
    res.status(400);
    res.send({ message: error.message });
  }
};

//peticion para eliminar un rol

const eliminarRol = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`DELETE FROM rol WHERE idrol= ${id} `);

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

// peticion para actualizar un rol

const actualizarRol = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, estado } = req.body;

    const result = await pool.query(
      `UPDATE rol SET
    nombre = '${nombre}',
    descripcion ='${descripcion}',
    estado = ${estado}  
    WHERE idrol= ${id}`
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "El Rol que desea actualizar no ha sido encontrado",
      });
    }
  } catch (error) {
    res.status(400);
    res.send({ message: error.message });
  }
};

module.exports = {
  listarRoles,
  listarRol,
  crearRol,
  eliminarRol,
  actualizarRol,
};

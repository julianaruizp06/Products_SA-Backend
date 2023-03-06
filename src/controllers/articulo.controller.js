//Permite ejecutar acciones cuando ésta entidad sea visitada (articulos)

const { Pool } = require("pg");
const pool = require("../../db");

//Peticion para ver la lista de articulos
const listarArticulos = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM articulo ORDER BY articulo.idarticulo DESC"
    );
    res.send(result.rows);
  } catch (error) {
    res.status(400);
    res.send({ message: error.message });
  }
};

//Peticion para Ver 1 articulo
const listarArticulo = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await pool.query(
      `SELECT * FROM articulo WHERE idarticulo = ${id}`
    );
    res.send(result.rows);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Articulo no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(400);
    res.send({ message: error.message });
  }
};

//Peticion para crear un articulo
const crearArticulo = async (req, res) => {
  try {
    const { nombre, precio_venta, descripcion, estado } = req.body;

    let estadoRef = estado;
    if (estadoRef === "1") {
      estadoRef = true;
    } else {
      estadoRef = false;
    }

    const resul =
      await pool.query(`INSERT INTO articulo (nombre,precio_venta,descripcion,estado) 
  VALUES( '${nombre}', ${precio_venta}, '${descripcion}', ${estadoRef})`);

    res.send("Crear un articulo");
  } catch (error) {
    res.status(400);
    res.send({ message: error.message });
  }
};


//Peticion para Eliminar un articulo

const eliminarArticulo = async (req, res) => {
  try {
    const id = req.params.id;
    await pool.query(`DELETE FROM articulo WHERE idarticulo = ${id}`);
    res.send("Articulo eliminado");
   } catch (error) {
    res.status(400);
    res.send({ message: error.message });
  }
};

//Peticion para actualizar un articulo
const actualizarArticulo = async (req, res, next) => {
  try {
    const { idarticulo, nombre, precio_venta, descripcion, estado } = req.body;

    const result = await pool.query(
      `UPDATE articulo SET
    nombre ='${nombre}',
    precio_venta = ${precio_venta},
    descripcion = '${descripcion}', 
    estado = '${estado}'
    WHERE idarticulo= ${idarticulo}`
    );

    if (result.rows.length !== 0) {
      return res.status(404).json({
        message: "El articulo que desea actualizar no ha sido encontrado",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//Luego exportamos las funciones así:
module.exports = {
  listarArticulos,
  listarArticulo,
  crearArticulo,
  eliminarArticulo,
  actualizarArticulo,
};

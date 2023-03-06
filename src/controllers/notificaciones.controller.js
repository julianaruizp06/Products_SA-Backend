//CONTROLADOR PAR ENVIAT LOS CORREOS POR EMAIL
const nodemailer = require("nodemailer");

const PDFDocument = require("pdfkit-table");

const fs = require("fs");

//VARIABLES ALEATORIAS DE  LA API DONDE ENVIAMOS EL CORREO
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

//CONVERTIMOS EL ARCHIVO EN PDF PARA ENVIARLO COMO ARCHIVO ADJUNTO
const sendCotizacion = async ({ body } = req, res) => {
  try {
    const { cotizacionData, productsData } = body;

    function generateEmail(nombrePDF) {
      const doc = new PDFDocument({ size: "A4" });
      const stream = fs.createWriteStream(nombrePDF);
      doc.info["Title"] = "Cotizacion";
      doc.info["Author"] = "EJR & JG";

      doc.fontSize(20);
      doc.text(`Cotización CRM PRODUCTS SA`, { align: "center" });
      doc.moveDown();

      doc.fontSize(12).text(`Nombre: ${cotizacionData.cliente}`);
      doc.fontSize(12).text(`Email: ${cotizacionData.client_email}`);
      doc.fontSize(12).text(`Vendedor: ${cotizacionData.vendedor}`);
      doc.fontSize(12).text(``);
      doc.fontSize(12).text(``);

      const tabla = {
        headers: ["Cantidad", "Descripción", "Precio unitario", "Total"],
        rows: [],
      };

      productsData.map((product) => {
        const row = [
          product.cantidad,
          product.producto,
          `$ ${product.subtotal}`,
          `$ ${product.total}`,
        ];
        tabla.rows.push(row);
      });

      tabla.rows.push(["", "", `Descuento:`, `${cotizacionData.descuento} %`]);

      tabla.rows.push([
        "",
        "",
        `Costo envío:`,
        `${cotizacionData.costo_envio} `,
      ]);
      tabla.rows.push(["", "", `Total:`, `${cotizacionData.total_pagar} `]);

      doc.table(tabla, {
        prepareHeader: () => doc.font("Helvetica-Bold"),
        prepareRow: (row, i) => doc.font("Helvetica").fontSize(10),
        headerBorderWidth: 1,
        borderHorizontalWidth: 1,
        borderVerticalWidth: 1,
        borderColor: "#000",
        marginLeft: 50,
        marginRight: 50,
        marginTop: 20,
        marginBottom: 20,
      });

      doc.end();
      stream.on("finish", () => {});
      doc.pipe(stream);
    }

    generateEmail("cotizacion.pdf");

    const saludo = `
<h1>Hola ${cotizacionData.cliente} ! </h1>
<h3> Te compartimos la cotización solicitada: </h3>
<h2>Cotización # ${cotizacionData.id_cotizacion}</h2>

<h3>Cotización generada por nuestro asesor de ventas ${cotizacionData.vendedor}   por un total de: $ ${cotizacionData.total_pagar}</h3>



`;

    await transporter.sendMail({
      from: '"Fred Foo 👻" <cartera@juliana.com>',
      to: "notificacionERM@juliana.com",
      subject: "Cotizacion CRM SAS ✔",
      html: saludo,
      attachments: [
        {
          filename: "cotizacion.pdf",
          path: "./cotizacion.pdf",
        },
      ],
    });
    res.send("ok");
  } catch (error) {
    res.status(400);
    res.send({ message: error.message });
  }
};

module.exports = {
  sendCotizacion,
};

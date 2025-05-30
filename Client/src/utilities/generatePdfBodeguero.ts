import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { ComprasType } from "../types/ComprasType";

pdfMake.vfs = pdfFonts.vfs;

export const generatePdfBodeguero = (pedido: ComprasType) => {
  const docDefinition = {
    content: [
      { text: "Productos", style: "header" },
      { text: "\n" },

      // Información del pedido
      {
        columns: [
          {
            width: "*",
            text: [
              { text: "ID Pedido: ", bold: true },
              pedido.id_pedido,
              "\n",
              { text: "Fecha: ", bold: true },
              new Date(pedido.fecha).toLocaleDateString(),
            ],
          },
        ],
      },

      { text: "\n" },

      // Tabla de productos
      {
        table: {
          headerRows: 1,
          widths: ["*", "auto", "auto"],
          body: [
            [
              { text: "Producto", style: "tableHeader" },
              { text: "Cantidad", style: "tableHeader" },
              { text: "ID", style: "tableHeader" },
            ],
            ...pedido.productos.map((producto) => [
              producto.producto.nombre,
              producto.cantidad.toString(),
              producto.id_producto,
            ]),
          ],
        },
      },
    ],

    styles: {
      header: {
        fontSize: 18,
        bold: true,
        alignment: "center" as const,
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: "black",
      },
    },
  };

  pdfMake.createPdf(docDefinition).download(`productos-${pedido.id_pedido}.pdf`);
};

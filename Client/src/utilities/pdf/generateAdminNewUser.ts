import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { UsuarioType } from "../../types/UsuarioType";
import { userTypesConstants } from "../../constants/userTypesConstants";

pdfMake.vfs = pdfFonts.vfs;

export const generateAdminNewUser = (user: UsuarioType,password:string) => {
  const fullName = [user.p_nombre, user.p_apellido, user.s_apellido]
    .filter(Boolean)
    .join(" ");
  const docDefinition = {
    content: [
      { text: "Productos", style: "header" },
      { text: "\n" },
      // Información del nuevo usuario
      {
        style: "detailsTable",
        table: {
          widths: ["auto", "*"],
          body: [
            [
              { text: "Nombre:", style: "label" },
              { text: fullName, style: "value" },
            ],
            [
              { text: "Correo:", style: "label" },
              { text: user.correo, style: "value" },
            ],
            [
              { text: "Teléfono:", style: "label" },
              { text: user.telefono.toString(), style: "value" },
            ],
            [
              { text: "Perfil:", style: "label" },
              {
                text: userTypesConstants.find(
                  (type) => type.id === user?.id_perfil
                )?.descripcion,
                style: "value",
              },
            ],
            [
              { text: "Usuario:", style: "label" },
              { text: user.nombre_usuario, style: "value" },
            ],
            [
              { text: "Contraseña:", style: "label" },
              { text: password, style: "value" },
            ],
          ],
        },
        layout: "noBorders",
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [20, 0, 20, 12] as [number, number, number, number],
        alignment: "center" as const,
      },
      label: {
        fontSize: 12,
        bold: true,
        margin: [20, 4, 20, 4] as [number, number, number, number],
      },
      value: {
        fontSize: 12,
        margin: [20, 4, 20, 4] as [number, number, number, number],
      },
    },
  };
  pdfMake.createPdf(docDefinition).download(`NuevoUsuario-${user.nombre_usuario}.pdf`);
};

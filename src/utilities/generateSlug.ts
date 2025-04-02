// src/utils/slugify.js

export const generateSlug = (name: string) => {
  const slugName = name
    .toLowerCase()
    .normalize("NFD") // Elimina acentos
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-") // Reemplaza espacios y caracteres especiales por "-"
    .replace(/^-+|-+$/g, ""); // Elimina guiones al inicio y final

  return slugName;
};

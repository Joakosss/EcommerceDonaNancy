import clothes from "../images/imgClothes.webp";
import furniture from "../images/imgFurniture.webp";
import shoes from "../images/imgShoes.webp";
const callouts = [
  {
    name: "Ropa",
    description: "Estilo y comodidad diaria",
    imageSrc:  clothes ,
    imageAlt:
      "Colgador de ropa con distintos colores de forma atractiva.",
    href: "productos/ropa",
  },
  {
    name: "Muebles",
    description: "Diseño que transforma espacios",
    imageSrc:
      furniture,
    imageAlt:
      "Un salon con muebles de la tienda doña nancy.",
    href: "productos/muebles",
  },
  {
    name: "Zapatos",
    description: "Pasos con estilo propio",
    imageSrc:
      shoes,
    imageAlt: "Zapatillas de la tienda doña nancy.",
    href: "productos/zapatos",
  },
];

export default function CategoryPreviews() {
  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-primary">Algunas Categorías</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {callouts.map((callout) => (
              <div key={callout.name} className="group relative">
                <img
                  alt={callout.imageAlt}
                  src={callout.imageSrc}
                  className="w-full rounded-lg bg-white object-cover group-hover:opacity-75 max-sm:h-80 sm:aspect-2/1 lg:aspect-square"
                  loading="lazy"
                />
                <h3 className="mt-6 text-sm text-primary/70">
                  <a href={callout.href}>
                    <span className="absolute inset-0" />
                    {callout.name}
                  </a>
                </h3>
                <p className="text-base font-semibold text-primary/90">
                  {callout.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

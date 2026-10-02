import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true, // Permite que cualquier visitante lea las categorías
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Nombre de la Categoría',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug (ej: moda-local, beauty)',
      admin: {
        description: 'Se generará para la URL de la categoría',
      },
    },
  ],
}
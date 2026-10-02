import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'createdAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Título del Artículo',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media', // Relación con la colección de imágenes de Payload
      required: true,
      label: 'Imagen Principal / Portada',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Resumen corto (Subtítulo/Lead)',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      label: 'Categoría',
    },
    {
      name: 'content',
      type: 'richText', // Editor de texto enriquecido para el cuerpo de la nota
      label: 'Contenido del Artículo',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Borrador', value: 'draft' },
        { label: 'Publicado', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
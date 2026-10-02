import type { CollectionConfig } from 'payload'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      label: 'Título del Artículo',
      type: 'text',
      required: true,
    },
    {
      name: 'featuredImage',
      label: 'Imagen de Portada',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'category',
      label: 'Categoría',
      type: 'select',
      options: [
        { label: 'Moda Local', value: 'moda' },
        { label: 'Maquillaje & Beauty', value: 'makeup' },
        { label: 'Ropa & Trends', value: 'ropa' },
        { label: 'Festivales & Eventos', value: 'festivales' },
      ],
      required: true,
    },
    {
      name: 'content',
      label: 'Contenido',
      type: 'richText',
    },
    {
      name: 'status',
      label: 'Estado de Publicación',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Borrador (Redactor)', value: 'draft' },
        { label: 'En Revisión (Pendiente de Admin 2)', value: 'in_review' },
        { label: 'Publicado (Aprobado)', value: 'published' },
      ],
      required: true,
    },
  ],
}
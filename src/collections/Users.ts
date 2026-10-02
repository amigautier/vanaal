import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'role',
      type: 'select',
      defaultValue: 'author',
      options: [
        { label: 'Super Admin', value: 'admin' },
        { label: 'Editor (Admin 2)', value: 'editor' },
        { label: 'Redactor', value: 'author' },
      ],
      required: true,
    },
  ],
}

import type { Config } from 'datatables.net';

/**
 * Options partagées des tableaux d'administration de la galerie.
 *
 * Le responsive de DataTables est activé : sur petit écran, les colonnes
 * secondaires (« Nom du fichier », « Taille ») se replient dans une ligne
 * enfant dépliable au lieu de provoquer un scroll horizontal. Les colonnes
 * « Image » et « Actions » restent toujours visibles grâce à `responsivePriority`.
 */
export const galleryTableOptions = (): Config => ({
  dom: "t<'mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'lip>",
  responsive: {
    details: {
      type: 'inline'
    }
  },
  paging: true,
  pageLength: 10,
  lengthMenu: [10, 25, 50, 100],
  info: true,
  ordering: false,
  columns: [
    {
      title: 'Image',
      data: null,
      defaultContent: '',
      responsivePriority: 1, // toujours visible
      render: {
        _: 'name',
        display: '#image'
      },
      searchable: false
    },
    { title: 'Nom du fichier', data: 'name', responsivePriority: 10001 },
    {
      title: 'Taille',
      data: 'size',
      responsivePriority: 10000,
      render: (value: number) => `${(value / 1024).toFixed(2)} KB`
    },
    {
      title: 'Actions',
      data: null,
      defaultContent: '',
      responsivePriority: 2, // toujours visible
      render: {
        _: 'path',
        display: '#actions'
      },
      searchable: false,
      orderable: false
    }
  ]
});
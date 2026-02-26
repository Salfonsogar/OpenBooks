export const STAT_CARDS = [
    {
        key: 'libros',
        label: 'Libros',
        icon: 'fa-book-open',
        to: '/libros',
        accent: '#2563EB',
    },
    {
        key: 'usuarios',
        label: 'Usuarios',
        icon: 'fa-users',
        to: '/usuarios',
        accent: '#10B981',
    },
    {
        key: 'categorias',
        label: 'Categorías',
        icon: 'fa-tags',
        to: '/categorias',
        accent: '#F59E0B',
    },
    {
        key: 'sanciones',
        label: 'Sanciones',
        icon: 'fa-exclamation-triangle',
        to: '/penalizacion-page',
        accent: '#EF4444',
    },
];

export const MENU_ITEMS = [
    {
        icon: 'fa-book-open',
        title: 'Libros',
        description: 'Agrega, edita o elimina libros del sistema.',
        to: '/libros',
        accent: '#2563EB',
    },
    {
        icon: 'fa-users',
        title: 'Usuarios',
        description: 'Controla permisos, bloqueos y actividad de usuarios.',
        to: '/usuarios',
        accent: '#10B981',
    },
    {
        icon: 'fa-tags',
        title: 'Categorías',
        description: 'Administra las categorías de libros disponibles.',
        to: '/categorias',
        accent: '#F59E0B',
    },
    {
        icon: 'fa-flag',
        title: 'Denuncias',
        description: 'Revisa y gestiona denuncias de usuarios.',
        to: '/denuncias',
        accent: '#EF4444',
    },
    {
        icon: 'fa-lightbulb',
        title: 'Sugerencias',
        description: 'Consulta las sugerencias enviadas por la comunidad.',
        to: '/sugerencias',
        accent: '#8B5CF6',
    },
    {
        icon: 'fa-exclamation-triangle',
        title: 'Penalizaciones',
        description: 'Gestiona las sanciones aplicadas a usuarios.',
        to: '/penalizacion-page',
        accent: '#F97316',
    },
];

export const ALERT_CONFIG = {
    denuncias: {
        icon: 'fa-flag',
        label: 'denuncia',
        plural: 'denuncias',
        to: '/denuncias',
        bg: '#FEF2F2',
        border: '#EF4444',
        color: '#DC2626',
    },
    sugerencias: {
        icon: 'fa-lightbulb',
        label: 'sugerencia',
        plural: 'sugerencias',
        to: '/sugerencias',
        bg: '#EFF6FF',
        border: '#2563EB',
        color: '#2563EB',
    },
};
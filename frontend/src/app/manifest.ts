import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'HabitHero',
        short_name: 'HabitHero',
        description: 'Track your habits.',
        start_url: '/home',
        display: 'standalone',
        background_color: '#424141',
        theme_color: '#2c2c2c',
        icons: [
            {
                src: '/icon-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}
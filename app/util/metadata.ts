import { Metadata } from "next";

export default function basicMetadata(metadata?: Metadata): Metadata {
    return {
        metadataBase: new URL('https://tutortime.vercel.app'),
        title: metadata?.title || 'TutorTime',
        description: metadata?.description || 'TutorTime is more than just a website. It’s a community of learners and educators who want to make a difference in the world.',
        authors: [
            {
                name: "Landon Harter",
                url: 'https://landonharter.me'
            },
            {
                name: "TutorTime",
                url: 'https://tutortime.vercel.app'
            },
        ],
        publisher: 'TutorTime',
        robots: {
            index: true,
            follow: true,
        },
        keywords: metadata?.keywords ? metadata?.keywords : 'TutorTime, education, volunteer, nonprofit, poverty, resource',
        creator: 'TutorTime',
        icons: [
            {
                url: 'https://tutortime.vercel.app/images/icons/icon16.png',
                sizes: '16x16',
                type: 'image/png',
            },
            {
                url: 'https://tutortime.vercel.app/images/icons/icon32.png',
                sizes: '32x32',
                type: 'image/png',
            },
            {
                url: 'https://tutortime.vercel.app/images/icons/icon64.png',
                sizes: '64x64',
                type: 'image/png',
            },
            {
                url: 'https://tutortime.vercel.app/images/icons/icon128.png',
                sizes: '128x128',
                type: 'image/png',
            },
            {
                url: 'https://tutortime.vercel.app/images/icons/icon256.png',
                sizes: '256x256',
                type: 'image/png',
            },
            {
                url: 'https://tutortime.vercel.app/images/icons/icon512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
        applicationName: 'TutorTime',
        openGraph: {
            title: metadata?.title || 'TutorTime',
            description: metadata?.description || 'TutorTime is more than just a website. It’s a community of learners and educators who want to make a difference in the world.',
            url: `https://tutortime.vercel.app${metadata?.openGraph?.url || ''}`,
            type: 'website',
            images: ['https://tutortime.vercel.app/images/icons/icon512.png'],
            siteName: 'TutorTime',
        },
        twitter: {
            site: `https://tutortime.vercel.app${metadata?.openGraph?.url || ''}`,
            card: 'summary_large_image',
            images: ['https://TutorTime.vercel.app/images/icons/icon512.png'],
            title: metadata?.title || 'TutorTime',
            description: metadata?.description || 'TutorTime is more than just a website. It’s a community of learners and educators who want to make a difference in the world.',
        },
    } as Metadata;
}
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const routes: MetadataRoute.Sitemap = [
        {
            url: 'https://tutortime.vercel.app/',
            lastModified: new Date()
        },
        {
            url: 'https://tutortime.vercel.app/signin',
            lastModified: new Date()
        }
    ];

    return routes;
}
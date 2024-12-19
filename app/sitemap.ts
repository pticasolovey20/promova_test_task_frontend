import { MetadataRoute } from 'next';
import { fetchAllPosts } from '@/API/postsAPI';
import { IPostData } from '@/interfaces/postsInterfaces';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const BASE_URL = process.env.BASE_URL;

	const response = await fetchAllPosts();

	const postEntries: MetadataRoute.Sitemap = response.data.map((post: IPostData) => ({
		url: `${BASE_URL}/posts/${post.slug}`,
		lastModified: new Date(post.updatedAt),
	}));

	return [
		{
			url: `${BASE_URL}/posts`,
			lastModified: new Date(),
		},

		...postEntries,
	];
}

import qs from 'qs';
import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import { fetchGlobalMetadata } from '@/API/metadataAPI';

import './globals.css';

const font = Poppins({
	weight: '400',
	subsets: ['latin'],
	display: 'swap',
});

export const generateMetadata = async (): Promise<Metadata> => {
	const query = qs.stringify({
		populate: {
			favicon: {
				populate: true,
			},

			defaultSeo: {
				populate: '*',
			},
		},
	});

	const { data } = await fetchGlobalMetadata(query);

	const FAVICON_URL = data.favicon.url || '';
	const META_OR_IMAGE_URL = data?.defaultSeo.metaOgImage.url || '';

	return {
		icons: FAVICON_URL,
		title: data?.defaultSeo.metaTitle || '',
		description: data?.defaultSeo.metaDescription || '',
		openGraph: {
			images: META_OR_IMAGE_URL,
			url: data?.defaultSeo.metaOgUrl || '',
			title: data?.defaultSeo.metaOgTitle || '',
			description: data?.defaultSeo.metaOgDescription || '',
		},
	};
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
	return (
		<html lang='en'>
			<body className={font.className} suppressHydrationWarning>
				{children}
			</body>
		</html>
	);
};

export default RootLayout;

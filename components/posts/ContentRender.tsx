import { FC } from 'react';
import { getStrapiBaseUrl } from '@/utils/getStrapiBaseUrl';
import { IPostBodyContent } from '@/interfaces/postsInterfaces';

import Image from 'next/image';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

interface IContentRender {
	element: IPostBodyContent;
}

const CustomImage = ({ element, index }: { element: IPostBodyContent; index: number }) => {
	const STRAPI_BASE_URL = getStrapiBaseUrl();

	return (
		<div className='overflow-hidden'>
			<Image
				priority
				alt={element.file[index]?.alternativeText || 'post image'}
				src={`${STRAPI_BASE_URL}${element.file[index]?.formats.medium.url}`}
				width={element.file[index]?.formats.medium.width}
				height={element.file[index]?.formats.medium.height}
				className='rounded-lg object-cover w-full h-full m-0 hover:scale-110 transition-all duration-300 ease-in-out'
			/>
		</div>
	);
};

const ContentRender: FC<IContentRender> = ({ element }) => {
	switch (element.__component) {
		case 'shared.media':
			return (
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<div className='grid grid-rows-2 gap-4'>
						<CustomImage element={element} index={0} />
						<CustomImage element={element} index={1} />
					</div>

					<CustomImage element={element} index={2} />
				</div>
			);

		default:
			return <BlocksRenderer content={element.content} />;
	}
};

export default ContentRender;

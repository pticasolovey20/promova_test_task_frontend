import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { classNames } from '@/utils/classNames';
import { formatDate } from '@/utils/formatDate';
import { IPostData } from '@/interfaces/postsInterfaces';
import { getStrapiBaseUrl } from '@/utils/getStrapiBaseUrl';

interface IPostItem {
	postData: IPostData;
}

const PostItem: FC<IPostItem> = ({ postData }) => {
	const STRAPI_BASE_URL = getStrapiBaseUrl();

	return (
		<Link
			href={`/posts/${postData.slug}`}
			aria-label='Go to post details page'
			className={classNames(
				'relative flex flex-col aspect-square group',
				'rounded-xl shadow-md bg-white overflow-hidden',
				'transition-all duration-300 ease-in-out'
			)}
		>
			<div className='relative h-full overflow-hidden'>
				<Image
					priority
					alt={postData.image.alternativeText || 'post image'}
					src={`${STRAPI_BASE_URL}${postData.image.formats.small.url}`}
					width={postData.image.formats.small.width}
					height={postData.image.formats.small.height}
					className={classNames(
						'absolute inset-0 w-full h-full object-cover',
						'group-hover:scale-125 group-hover:rotate-12',
						'transition-all duration-300 ease-in-out'
					)}
				/>
			</div>

			<div className='flex flex-col gap-2 p-4'>
				<div className='flex-1'>
					<h2 className='truncate text-xl font-bold text-gray-800'>{postData.title}</h2>
					<p className='text-sm leading-6 text-gray-600'>{postData.description}</p>
				</div>

				<span className='text-xs font-semibold'>{formatDate(postData.date)}</span>
			</div>
		</Link>
	);
};

export default PostItem;

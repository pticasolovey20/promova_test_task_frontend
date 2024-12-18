import { FC, Fragment } from 'react';

import { classNames } from '@/utils/classNames';
import { IPostData } from '@/interfaces/postsInterfaces';
import { getStrapiBaseMediaUrl } from '@/utils/getStrapiBaseUrl';

import Link from 'next/link';
import Image from 'next/image';
import { MdChevronLeft } from 'react-icons/md';
import ContentRender from '@/components/posts/ContentRender';

interface IPostDetails {
	postData: IPostData;
}

const PostDetails: FC<IPostDetails> = ({ postData }) => {
	const STRAPI_BASE_MEDIA_URL = getStrapiBaseMediaUrl();

	return (
		<Fragment>
			<div className='flex flex-col relative shadow-gray-500 shadow-lg bg-gray-300 overflow-hidden'>
				<div className='relative w-full min-h-[350px] h-full overflow-hidden'>
					<div className='absolute inset-0 w-full h-full bg-gradient-to-r from-black/50 to-transparent z-[2]' />

					<Image
						priority
						alt={postData.image.alternativeText || 'post details image'}
						src={`${STRAPI_BASE_MEDIA_URL}${postData.image.formats.medium.url}`}
						width={postData.image.formats.medium.width}
						height={postData.image.formats.medium.height}
						className='absolute inset-0 w-full h-full object-cover overflow-hidden'
					/>
				</div>

				<div className='w-full flex flex-col p-4'>
					<Link
						href='/posts'
						aria-label='Back to all posts'
						className={classNames(
							'flex items-center absolute top-2 left-1 w-fit',
							'text-sm text-white group px-3 py-2 z-[3]'
						)}
					>
						<MdChevronLeft
							size={20}
							className='transition-transform duration-200 ease-in-out group-hover:-translate-x-1'
						/>

						<span className='text-normal'>Back</span>
					</Link>

					<h1 className='font-bold text-gray-800 text-5xl xl:text-6xl'>{postData.title}</h1>
					<p className='text-lg xl:text-xl'>{postData.description}</p>
				</div>
			</div>

			<div className='prose max-w-none mt-4 xl:mt-10 p-4'>
				{postData.bodyContent.map((element) => (
					<ContentRender key={element.id} element={element} />
				))}
			</div>
		</Fragment>
	);
};

export default PostDetails;

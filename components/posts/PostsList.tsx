import { FC, Suspense } from 'react';
import { IPostData } from '@/interfaces/postsInterfaces';

import SkeletonPostsList from './SkeletonPostsList';
import PostItem from './PostItem';
import Empty from './Empty';

interface IPostsList {
	postsData: IPostData[];
}

const PostsList: FC<IPostsList> = ({ postsData }) => {
	return (
		<Suspense fallback={<SkeletonPostsList />}>
			<div className='flex-1'>
				{Array.isArray(postsData) && postsData.length > 0 ? (
					<ul className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6'>
						{postsData.map((postData: IPostData) => {
							return postData?.id ? (
								<li key={postData.id}>
									<PostItem postData={postData} />
								</li>
							) : null;
						})}
					</ul>
				) : (
					<Empty />
				)}
			</div>
		</Suspense>
	);
};

export default PostsList;

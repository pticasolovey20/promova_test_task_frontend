import qs from 'qs';
import dynamic from 'next/dynamic';
import { FC, Fragment } from 'react';

import { fetchAllPosts } from '@/API/postsAPI';

const SearchInput = dynamic(() => import('@/components/SearchInput'));
import PostsList from '@/components/posts/PostsList';
const Pagination = dynamic(() => import('@/components/Pagination'));

const getAllPosts = async (queryString: string, currentPage: number) => {
	const PAGE_SIZE = process.env.PAGE_SIZE;

	const query = qs.stringify({
		populate: {
			image: {
				populate: true,
			},
		},

		filters: {
			title: {
				$containsi: queryString,
			},
		},

		pagination: {
			pageSize: PAGE_SIZE,
			page: currentPage,
		},
	});

	try {
		const postsData = await fetchAllPosts(query);
		return postsData;
	} catch (error) {
		console.error('Error fetching posts:', error);
		throw error;
	}
};

interface IPostsListPage {
	searchParams: {
		query: string;
		page: number;
	};
}

const PostsListPage: FC<IPostsListPage> = async ({ searchParams }) => {
	const queryString = searchParams?.query ?? '';
	const currentPage = Number(searchParams?.page) || 1;

	const postsData = await getAllPosts(queryString, currentPage);

	return (
		<Fragment>
			<section className='max-w-screen-xl w-full mx-auto flex-1 flex flex-col gap-4 p-4'>
				<h1 className='text-gray-800 text-4xl font-semibold'>All Posts</h1>

				<SearchInput />
				<PostsList postsData={postsData.data} />

				<div className='mx-auto my-4'>
					<Pagination currentPage={currentPage} pagination={postsData.meta.pagination} />
				</div>
			</section>
		</Fragment>
	);
};

export default PostsListPage;

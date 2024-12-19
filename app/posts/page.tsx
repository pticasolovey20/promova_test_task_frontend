import qs from 'qs';
import dynamic from 'next/dynamic';
import { FC, Fragment } from 'react';
import { draftMode } from 'next/headers';

import { fetchAllPosts } from '@/API/postsAPI';
import { classNames } from '@/utils/classNames';

const SearchInput = dynamic(() => import('@/components/SearchInput'));
import PostsList from '@/components/posts/PostsList';

const Pagination = dynamic(() => import('@/components/Pagination'));

const getAllPosts = async (queryString: string, currentPage: number, mode: 'draft' | undefined) => {
	const PAGE_SIZE = process.env.PAGE_SIZE;

	const query = qs.stringify({
		sort: ['date'],

		...(mode && { status: mode }),

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
	const { isEnabled } = draftMode();
	const mode = isEnabled ? 'draft' : undefined;

	const queryString = searchParams?.query ?? '';
	const currentPage = Number(searchParams?.page) || 1;

	const postsData = await getAllPosts(queryString, currentPage, mode);

	return (
		<Fragment>
			<section className='max-w-screen-xl w-full mx-auto flex-1 flex flex-col gap-4 p-4'>
				<h1 className={classNames('text-gray-800 text-4xl font-semibold', isEnabled ? 'mt-[60px]' : '')}>All Posts</h1>

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

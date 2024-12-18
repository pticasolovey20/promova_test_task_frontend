'use client';

import { FC } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import { classNames } from '@/utils/classNames';
import { IPaginationData } from '@/interfaces/postsInterfaces';

import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

interface IPagination {
	currentPage: number;
	pagination: IPaginationData;
}

const Pagination: FC<IPagination> = ({ currentPage, pagination }) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const createPageURL = (pageNumber: number | string) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set('page', pageNumber.toString());

		return `${pathname}?${params.toString()}`;
	};

	const isPrevButtonDisabled = currentPage <= 1;
	const isNextButtonDisabled = currentPage >= pagination.pageCount;

	return (
		<div className='flex gap-4'>
			<button
				aria-label='Go to previously page'
				onClick={() => router.push(createPageURL(currentPage - 1))}
				disabled={isPrevButtonDisabled}
				className={classNames(
					'transition-all duration-300 ease-in-out',
					'w-10 h-10 flex items-center justify-center',
					'text-gray-400 rounded-lg border-2 bg-white shadow',
					isPrevButtonDisabled ? 'opacity-50' : 'hover:text-gray-800 hover:border-gray-800'
				)}
			>
				<MdChevronLeft size={24} />
			</button>

			<div className='w-10 h-10 flex items-center justify-center rounded-lg border-2 border-gray-800 bg-white shadow'>
				<span className='font-semibold'>{currentPage}</span>
			</div>

			<button
				aria-label='Go to next page'
				onClick={() => router.push(createPageURL(currentPage + 1))}
				disabled={currentPage >= pagination.pageCount}
				className={classNames(
					'transition-all duration-300 ease-in-out',
					'w-10 h-10 flex items-center justify-center',
					'text-gray-400 rounded-lg border-2 bg-white shadow',
					isNextButtonDisabled ? 'opacity-50' : 'hover:text-gray-800 hover:border-gray-800'
				)}
			>
				<MdChevronRight size={24} />
			</button>
		</div>
	);
};

export default Pagination;

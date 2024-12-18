'use client';

import { FC, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

import { MdOutlineSearch } from 'react-icons/md';
import { classNames } from '@/utils/classNames';

const SearchInput: FC = () => {
	const searchParams = useSearchParams();
	const { replace } = useRouter();
	const pathname = usePathname();

	const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');
	let debounceTimer: NodeJS.Timeout | null = null;

	const handleSearchChange = (searchQuery: string) => {
		setSearchQuery(searchQuery);
		if (debounceTimer) clearTimeout(debounceTimer);

		debounceTimer = setTimeout(() => {
			const params = new URLSearchParams(searchParams.toString());
			searchQuery ? params.set('query', searchQuery) : params.delete('query');

			replace(`${pathname}?${params.toString()}`);
		}, 300);
	};

	return (
		<div
			className={classNames(
				'max-w-none sm:max-w-[calc(50%-8px)] lg:max-w-[calc(33%-12px)]',
				'w-full relative px-4 pl-10 py-2 border-2 group rounded-lg shadow',
				'focus-within:border-gray-800 transition-all duration-300 ease-in-out'
			)}
		>
			<MdOutlineSearch className='absolute top-2 left-2 text-[#899092] group-focus-within:text-gray-800' size={24} />

			<input
				value={searchQuery}
				placeholder='Type your query'
				onChange={(event) => handleSearchChange(event.target.value)}
				className='w-full outline-none group-focus-within:placeholder-gray-800'
			/>
		</div>
	);
};

export default SearchInput;

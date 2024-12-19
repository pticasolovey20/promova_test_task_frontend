import { FC } from 'react';
import DraftToggle from './posts/DraftToggle';

interface IDraftBanner {
	isDraftModeEnabled: boolean;
}

const DraftBanner: FC<IDraftBanner> = ({ isDraftModeEnabled }) => {
	return (
		<div className='fixed w-full flex flex-wrap items-center justify-center gap-4 p-3 bg-gray-600 z-[4]'>
			<span className='text-center text-lg text-white'>Draft mode!</span>
			<DraftToggle label='Disable Draft' ariaLabel='Disable draft mode' isEnabled={isDraftModeEnabled} />
		</div>
	);
};

export default DraftBanner;

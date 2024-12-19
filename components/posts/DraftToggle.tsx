'use client';

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { classNames } from '@/utils/classNames';

import Loader from '../Loader';

interface IDraftToggle {
	label: string;
	ariaLabel: string;
	className?: string;
	isEnabled: boolean;
}

const DraftToggle: FC<IDraftToggle> = ({ label, ariaLabel, className, isEnabled }) => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleClick = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		setIsLoading(true);

		try {
			await fetch(isEnabled ? '/api/exit-preview' : '/api/preview');
			router.refresh();
		} catch (error) {
			console.error('Error toggling draft mode:', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<button
			aria-label={ariaLabel}
			onClick={handleClick}
			disabled={isLoading}
			className={classNames(
				'w-fit flex items-center gap-2 px-4 py-1 text-gray-800 rounded-lg border-2 border-gray-800 bg-white',
				className
			)}
		>
			<span>{label}</span>
			{isLoading && <Loader className='w-4 h-4' />}
		</button>
	);
};

export default DraftToggle;

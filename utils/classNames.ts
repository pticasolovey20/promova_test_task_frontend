import { clsx, ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const classNames = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

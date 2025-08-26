import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Logo from '@/public/logo.png';
import { Metadata } from 'next';
/**
 * Combines multiple class names using clsx and applies tailwind-merge
 * to properly handle Tailwind CSS class conflicts
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
/**
 * Formats a date string to a human-readable format
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Truncates a string to the specified length and adds ellipsis
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function getMetadata(data: Metadata) {
  return {
    title: data?.title,
    description: data?.description,
    keywords: data?.keywords,
    icons: [{ rel: 'icon', url: Logo?.src }],
    openGraph: {
      images: data?.openGraph?.images,
      url: data?.openGraph?.url,
      siteName: data?.openGraph?.siteName,
      title: data?.openGraph?.title,
      description: data?.openGraph?.description,
    },
    alternates: {
      canonical: data?.alternates?.canonical,
      languages: data?.alternates?.languages,
    },
    twitter: {
      title: data?.twitter?.title,
      images: data?.twitter?.images,
      description: data?.twitter?.description,
    },
  };
}

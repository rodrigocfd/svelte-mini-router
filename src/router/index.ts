const BASE = 'wikipedia-templates';
const allParts = window.location.pathname.split('/');
const idxBasePart = allParts.findIndex(p => p === BASE);
const parts = allParts.slice(idxBasePart + 1);

/**
 * Current application path.
 */
export const path = parts.join('/');

/**
 * Generates a navigable link.
 */
export function navLink(path: string): string {
	if (path.startsWith('/')) {
		path = path.substring(1);
	}
	if (path.endsWith('/')) {
		path = path.substring(0, path.length - 1);
	}
	return '/' + BASE + '/' + path;
}

/**
 * Navigates immediately.
 */
export function navigate(path: string): void {
	const link = navLink(path);
	window.location.href = link;
}

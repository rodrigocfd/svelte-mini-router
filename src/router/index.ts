const BASE = 'wikipedia-templates';
const allParts = window.location.pathname.split('/');
const idxBasePart = allParts.findIndex(p => p === BASE);
const parts = allParts.slice(idxBasePart + 1);

/**
 * Path and component to an application route.
 */
export interface Route {
	path: string;
	render: string;
}

/**
 * Current application path.
 */
export const path = '/' + parts.join('/');

/**
 * Generates a navigable link to the given path.
 */
export function link(path: string): string {
	if (path.startsWith('/')) {
		path = path.substring(1);
	}
	if (path.endsWith('/')) {
		path = path.substring(0, path.length - 1);
	}
	return '/' + BASE + '/' + path;
}

/**
 * Navigates immediately to the given path.
 */
export function navigate(path: string): void {
	const newUrl = link(path);
	window.location.href = newUrl;
}

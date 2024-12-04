const BASE = 'wikipedia-templates';
const allParts = window.location.pathname.split('/');
const idxBasePart = allParts.findIndex(p => p === BASE);
const parts = allParts.slice(idxBasePart + 1);

export const path = parts.join('/');

export function navLink(path: string): string {
	if (path.endsWith('/')) {
		path = path.substring(0, path.length - 1);
	}
	return '/' + BASE + (path.startsWith('/') ? '' : '/') + path;
}

export function navigate(path: string): void {
	const link = navLink(path);
	window.location.href = link;
}

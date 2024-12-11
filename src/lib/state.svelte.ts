import type {Route} from './types';

/**
 * Router state.
 */
const routerState = $state({
	/** Application baseUrl, no "/" prefix or suffix. */
	baseUrl: '',
	/** Current path without baseUrl, no "/" prefix or suffix. */
	path: '',
});

/**
 * Returns the current path without baseUrl, no "/" prefix or suffix.
 */
function getCurrentUrlPath(): string {
	const allParts = window.location.pathname.split('/');
	const idxBasePart = allParts.findIndex(p => p === routerState.baseUrl);
	const parts = allParts.slice(idxBasePart + 1);
	return parts.join('/');
}

/**
 * Sanitizes the path, removing "/" prefix and suffix.
 */
function sanitizePath(path: string): string {
	let p = path;
	if (p.startsWith('/')) p = p.substring(1);
	if (p.endsWith('/')) p = p.substring(0, p.length - 1);
	return p;
}

/**
 * Defines the baseUrl; should be called once, when the page loads.
 */
export function initInternalState(baseUrl?: string): void {
	if (baseUrl !== undefined) {
		routerState.baseUrl = sanitizePath(baseUrl);
	}
	routerState.path = getCurrentUrlPath();
}

/**
 * Returns the current route, if any.
 */
export function findCurrentRoute(routes: Route[]): Route | undefined {
	return routes.find(r => sanitizePath(r.path) === routerState.path);
}

/**
 * Generates a fully-qualified URL to the given path.
 */
export function generateFullUrl(path: string): string {
	return '/' + routerState.baseUrl + '/' + sanitizePath(path);
}

/**
 * Programmatically, immediately navigates to the given path, which will trigger
 * the rendering of the new route component.
 */
export function navigate(path: string): void {
	const path2 = sanitizePath(path);
	history.pushState(null, '', '/' + routerState.baseUrl + '/' + path2);
	routerState.path = path2;
}

/**
 * Back or forward button; updates current URL state, which will trigger the
 * rendering of the new route component.
 */
window.onpopstate = () => {
	routerState.path = getCurrentUrlPath();
};

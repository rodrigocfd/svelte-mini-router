import type {QueryParams, Route} from './types';
import {sanitizePath, serializeGetParameters} from './utils';

/**
 * Router state.
 */
const routerState = $state({
	/**
	 * Application baseUrl, no "/" prefix or suffix.
	 */
	baseUrl: '',
	/**
	 * Current path without baseUrl, no "/" prefix or suffix. Won't include URL
	 * query parameters.
	 */
	path: '',
});

/**
 * Returns the current path without baseUrl, no "/" prefix or suffix. Won't
 * include URL query parameters.
 */
function getCurrentUrlPath(): string {
	const allParts = window.location.pathname.split('/').filter(p => p !== '');
	const idxBasePart = allParts.findIndex(p => p === routerState.baseUrl);
	const parts = allParts.slice(idxBasePart + 1);
	return parts.join('/');
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
export function generateFullUrl(path: string, params?: QueryParams): string {
	return '/' + routerState.baseUrl + '/'
		+ sanitizePath(path)
		+ serializeGetParameters(params);
}

/**
 * Programmatically, immediately navigates to the given path, which will trigger
 * the rendering of the new route component.
 *
 * You can pass, optionally, an object to be serialized as URL query parameters.
 */
export function navigate(path: string, params?: QueryParams): void {
	const newPath = sanitizePath(path);
	history.pushState(null, '',
		'/' + routerState.baseUrl + '/' + newPath + serializeGetParameters(params));
	routerState.path = newPath;
}

/**
 * Back or forward button; updates current URL state, which will trigger the
 * rendering of the new route component.
 */
window.onpopstate = () => {
	routerState.path = getCurrentUrlPath();
};

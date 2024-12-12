import type {QueryParams, Route} from './types';
import {sanitizePath, serializeGetParameters} from './utils';

/**
 * Router state.
 */
const routerState = $state({
	/**
	 * Application base URL, no leading or trailing "/", no URL query
	 * parameters.
	 */
	baseUrl: '',
	/**
	 * Parts of the current path, without baseUrl. Won't include URL query
	 * parameters.
	 */
	pathParts: [] as string[],
});

/**
 * Returns the current path parts without baseUrl, without URL query parameters.
 */
function getCurrentUrlPathParts(): string[] {
	return sanitizePath(window.location.pathname)
		.substring(routerState.baseUrl.length + 1)
		.split('/');
}

/**
 * Defines the baseUrl; should be called once, when the page loads.
 */
export function initInternalState(baseUrl?: string): void {
	if (baseUrl !== undefined) {
		routerState.baseUrl = sanitizePath(baseUrl);
	}
	routerState.pathParts = getCurrentUrlPathParts();
}

/**
 * Among the given routes, returns the current route, if any.
 */
export function findCurrentRoute(routes: Route[]): Route | undefined {
	return routes.find(r => {
		const rParts = sanitizePath(r.path).split('/');
		if (rParts.length !== routerState.pathParts.length)
			return false;
		for (let i = 0; i < rParts.length; ++i) {
			if (rParts[i] !== routerState.pathParts[i])
				return false;
		}
		return true;
	});
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
	routerState.pathParts = newPath.split('/');
}

/**
 * Back or forward button; updates current URL state, which will trigger the
 * rendering of the new route component.
 */
window.onpopstate = () => {
	routerState.pathParts = getCurrentUrlPathParts();
};

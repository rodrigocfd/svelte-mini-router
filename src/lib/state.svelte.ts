import type {GetParameters, Route} from './types';

/**
 * Router state.
 */
const routerState = $state({
	/**
	 * Application baseUrl, no "/" prefix or suffix.
	 */
	baseUrl: '',
	/**
	 * Current path without baseUrl, no "/" prefix or suffix. Won't include GET
	 * parameters.
	 */
	path: '',
});

/**
 * Returns the current path without baseUrl, no "/" prefix or suffix. Won't
 * include GET parameters.
 */
function getCurrentUrlPath(): string {
	const allParts = window.location.pathname.split('/').filter(p => p !== '');
	const idxBasePart = allParts.findIndex(p => p === routerState.baseUrl);
	const parts = allParts.slice(idxBasePart + 1);
	return parts.join('/');
}

/**
 * Sanitizes the path, removing "/" prefix and suffix, and removing GET
 * parameters.
 */
function sanitizePath(path: string): string {
	let p = path;

	const idxQ = p.indexOf('?');
	if (idxQ !== -1) p = p.substring(0, idxQ);

	if (p.startsWith('/')) p = p.substring(1);
	if (p.endsWith('/')) p = p.substring(0, p.length - 1);
	return p;
}

/**
 * Serializes an object to a string to be used as GET parameters, including the
 * leading "?".
 */
function serializeGetParameters(params?: GetParameters): string {
	const output: Record<string, string> = {};
	if (params !== undefined) {
		for (const [key, val] of Object.entries(params)) {
			if (val === null || val === undefined) {
				output[key] = '';
			} else if (typeof val === 'number') {
				output[key] = val.toString();
			} else {
				output[key] = val;
			}
		}
	}
	const seri = new URLSearchParams(output).toString();
	return (seri === '') ? '' : ('?' + seri);
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
export function generateFullUrl(path: string, params?: GetParameters): string {
	return '/' + routerState.baseUrl + '/'
		+ sanitizePath(path)
		+ serializeGetParameters(params);
}

/**
 * Programmatically, immediately navigates to the given path, which will trigger
 * the rendering of the new route component.
 *
 * You can pass, optionally, an object to be serialized as GET parameters.
 */
export function navigate(path: string, params?: GetParameters): void {
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

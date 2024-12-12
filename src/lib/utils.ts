import type {QueryParams} from './types';

/**
 * Returns an object with the current URL query parameters, if any.
 */
export function getQueryParams(): Record<string, string> {
	const q = new URLSearchParams(window.location.search);
	const output: Record<string, string> = {};
	for (const [k, v] of q.entries()) {
		output[k] = v;
	}
	return output;
}

/**
 * Sanitizes the path, removing "/" prefix and suffix, and removing URL query
 * parameters.
 */
export function sanitizePath(path: string): string {
	let p = path;

	const idxQ = p.indexOf('?');
	if (idxQ !== -1) p = p.substring(0, idxQ);

	if (p.startsWith('/')) p = p.substring(1);
	if (p.endsWith('/')) p = p.substring(0, p.length - 1);
	return p;
}

/**
 * Serializes an object to a string to be used as an URL query string, including
 * the leading "?".
 */
export function serializeGetParameters(params?: QueryParams): string {
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

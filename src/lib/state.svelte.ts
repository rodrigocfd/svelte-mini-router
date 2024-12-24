import type {LazyComponent, QueryParams, RouterConf} from './types';
import {isPathParam, sanitizePath, serializeQueryParameters} from './utils';

class RouterState {
	/** Application base URL; no leading or trailing "/", no URL query parameters. */
	private baseUrl = $state('');
	/** Parts of the current path, without baseUrl. Won't include URL query parameters. */
	private curPathParts = $state([] as string[]);
	/** User-defined routes. */
	private userRoutes = $state([] as {
		/** Parts of the path, without baseUrl. Won't include URL query parameters. */
		pathParts: string[];
		/** Function which lazy-loads the component to be rendered. */
		render: LazyComponent;
	}[]);

	/** User route to be currently rendered, if any. */
	curUserRoute = $derived(
		this.userRoutes.find(userRoute => {
			if (this.curPathParts.length !== userRoute.pathParts.length)
				return false;
			for (let i = 0; i < this.curPathParts.length; ++i) {
				if (isPathParam(userRoute.pathParts[i]))
					continue;
				if (this.curPathParts[i] !== userRoute.pathParts[i])
					return false;
			}
			return true;
		}),
	);

	constructor() {
		window.onpopstate = () => { // back or forward button
			routerState.curPathParts = routerState.getCurrentUrlPathParts();
		};
	}

	/** Initializes the router internal state with the user options. */
	init(conf: RouterConf): void {
		if (conf.baseUrl !== undefined)
			this.baseUrl = sanitizePath(conf.baseUrl);
		this.curPathParts = this.getCurrentUrlPathParts();
		this.userRoutes = conf.routes.map((userRoute, i) => {
			if (isPathParam(userRoute.path) && userRoute.path.length < 3)
				throw new Error(`Path parameter ${i} cannot be empty.`);
			return  {
				pathParts: sanitizePath(userRoute.path).split('/'),
				render: userRoute.render,
			};
		});
	}

	/** Returns the current path parts without baseUrl, without URL query parameters. */
	getCurrentUrlPathParts(): string[] {
		return sanitizePath(window.location.pathname)
			.substring(this.baseUrl.length + 1)
			.split('/');
	}

	/** Generates a fully-qualified URL to the given path. */
	generateFullUrl(path: string, params?: QueryParams): string {
		const basePath = routerState.baseUrl !== '' ? '/' + routerState.baseUrl : '';
		return basePath + '/'
			+ sanitizePath(path)
			+ serializeQueryParameters(params);
	}

	/** Navigates to the given path. */
	navigate(path: string, queryParams?: QueryParams): void {
		const newPath = sanitizePath(path);
		const basePath = routerState.baseUrl !== '' ? '/' + routerState.baseUrl : '';
		history.pushState(null, '',
			basePath + '/' + newPath + serializeQueryParameters(queryParams));
		this.curPathParts = newPath.split('/');
	}

	/** Returns an object with the current URL path parameters, if any. */
	getPathParams(): Record<string, string> {
		const output: Record<string, string> = {};
		const curParts = this.getCurrentUrlPathParts();
		const userRoute = this.curUserRoute;
		if (userRoute !== undefined) {
			for (let i = 0; i < curParts.length; ++i) {
				if (isPathParam(userRoute.pathParts[i])) {
					const paramName = userRoute.pathParts[i];
					output[paramName.substring(1, paramName.length - 1)] = curParts[i];
				}
			}
		}
		return output;
	}
}

/** Global router state. */
const routerState = new RouterState();
export default routerState;

/**
 * Returns an object with the current URL path parameters, if any.
 *
 * @example
 * // https://localhost:8080/person/{name}/with/{age}
 * const pathParams = {
 *   name: 'value at {name}',
 *   age: 'value at {age}',
 * };
 */
export function getPathParams(): Record<string, string> {
	return routerState.getPathParams();
}

/**
 * Programmatically, immediately navigates to the given path, which will trigger
 * the rendering of the new route component.
 *
 * You can pass, optionally, an object to be serialized as URL query parameters.
 */
export function navigate(path: string, queryParams?: QueryParams): void {
	routerState.navigate(path, queryParams);
}

import type {LazyComponent, QueryParams, RouterConf} from './types';
import {sanitizePath, serializeQueryParameters} from './utils';

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

	/** Component to be currently rendered, if any */
	curComponent = $derived(
		this.userRoutes.find(r => {
			if (this.curPathParts.length !== r.pathParts.length)
				return false;
			for (let i = 0; i < this.curPathParts.length; ++i) {
				if (this.curPathParts[i] !== r.pathParts[i])
					return false;
			}
			return true;
		})?.render,
	);

	constructor() {
		window.onpopstate = () => { // back or forward button
			routerState.curPathParts = routerState.getCurrentUrlPathParts();
		};
	}

	/** Initializes the router internal state with the user options. */
	init(conf: RouterConf): void {
		if (conf.baseUrl !== undefined) {
			this.baseUrl = sanitizePath(conf.baseUrl);
		}
		this.curPathParts = this.getCurrentUrlPathParts();
		this.userRoutes = conf.routes.map(r => ({
			pathParts: sanitizePath(r.path).split('/'),
			render: r.render,
		}));
	}

	/** Returns the current path parts without baseUrl, without URL query parameters. */
	getCurrentUrlPathParts(): string[] {
		return sanitizePath(window.location.pathname)
			.substring(this.baseUrl.length + 1)
			.split('/');
	}

	/** Generates a fully-qualified URL to the given path. */
	generateFullUrl(path: string, params?: QueryParams): string {
		return '/' + routerState.baseUrl + '/'
			+ sanitizePath(path)
			+ serializeQueryParameters(params);
	}

	/** Navigates to the given path. */
	navigate(path: string, queryParams?: QueryParams): void {
		const newPath = sanitizePath(path);
		history.pushState(null, '',
			'/' + routerState.baseUrl + '/' + newPath + serializeQueryParameters(queryParams));
		this.curPathParts = newPath.split('/');
	}
}

/** Global router state. */
const routerState = new RouterState();
export default routerState;

/**
 * Programmatically, immediately navigates to the given path, which will trigger
 * the rendering of the new route component.
 *
 * You can pass, optionally, an object to be serialized as URL query parameters.
 */
export function navigate(path: string, queryParams?: QueryParams): void {
	routerState.navigate(path, queryParams);
}

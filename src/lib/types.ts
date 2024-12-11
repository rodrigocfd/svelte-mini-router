import type {Component} from 'svelte';

/**
 * Path and component to an application route, to be defined by the user.
 */
export interface Route {
	/**
	 * URL path to match.
	 */
	path: string;
	/**
	 * Function which lazy loads the component to be rendered.
	 */
	render(): Promise<{default: Component}>;
}

/**
 * Router configuration.
 */
export interface RouterConf {
	/**
	 * Base URL, as defined in vite.config.ts.
	 */
	baseUrl?: string;
	/**
	 * Application routes.
	 */
	routes: Route[];
	/**
	 * Error 404 route.
	 *
	 * If not defined, a simple "404 - Not found" text will be displayed.
	 */
	render404?(): Promise<{default: Component}>;
	/**
	 * Text to be displayed if the route takes too long to load. This shouldn't
	 * really be necessary, since the routes are served as plain static assets.
	 *
	 * Defaults to "Loading...".
	 */
	loadingText?: string;
}

/**
 * URL query parameters.
 */
export type QueryParams = Record<string, string | number | null | undefined>;

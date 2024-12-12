import type {Component} from 'svelte';

/**
 * A lazy-loaded component.
 *
 * @example
 * const lazyComp = () => import('./home/MyHome.svelte');
 */
export type LazyComponent = () => Promise<{default: Component}>;

/**
 * URL query parameters. Besides string, also accepts number as value.
 *
 * @example
 * const params = {
 *   name: 'Joe',
 *   age: 43,
 * };
 */
export type QueryParams = Record<string, string | number | null | undefined>;

/**
 * Path and component to an application route, to be defined by the user.
 *
 * @example
 * const route = {
 *   path: '/page1',
 *   render: () => import('./page1/Page1.svelte'),
 * };
 */
export interface Route {
	/**
	 * URL path to match.
	 *
	 * @example
	 * path: '/page1'
	 */
	path: string;
	/**
	 * Function which lazy-loads the component to be rendered.
	 *
	 * @example
	 * render: () => import('./page1/Page1.svelte')
	 */
	render: LazyComponent;
}

/**
 * Router configuration.
 */
export interface RouterConf {
	/**
	 * Base URL, as defined in vite.config.ts.
	 *
	 * @example
	 * baseUrl: '/my-application'
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
	 *
	 * @example
	 * render404: () => import('./Error404.svelte')
	 */
	render404?: LazyComponent;
	/**
	 * Text to be displayed if the route takes too long to load. This shouldn't
	 * really be necessary, since the routes are served as plain static assets.
	 *
	 * Defaults to "Loading...".
	 */
	loadingText?: string;
}

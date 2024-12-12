import type {Component} from 'svelte';

/**
 * A lazy-loaded component.
 *
 * @example
 * const lazyComp = () => import('./home/MyHome.svelte');
 */
export type LazyComponent = () => Promise<{default: Component}>;

/**
 * URL query parameters. Besides string, also accepts number, null and
 * undefined.
 *
 * @example
 * const params = {
 *   name: 'Joe',
 *   age: 43,
 * };
 */
export type QueryParams = Record<string, string | number | null | undefined>;

/**
 * Path and component to an application route. Path parameters are supported.
 *
 * @example
 * const routeA = {
 *   path: '/page1',
 *   render: () => import('./page1/Page1.svelte'),
 * };
 *
 * const routeB = {
 *   path: '/page2/{name}/and/{age}',
 *   render: () => import('./page2/Page2.svelte'),
 * };
 */
export interface Route {
	/**
	 * URL path to match. Path parameters are supported.
	 *
	 * @example
	 * path: '/page1'
	 *
	 * path: '/page2/{name}/and/{age}'
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
	 * Text to be displayed if the route takes too long to load. This happens
	 * sometimes in development mode, when the virtual server gets too busy.
	 *
	 * Defaults to "Loading...".
	 */
	loadingText?: string;
}

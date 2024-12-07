import type {Route} from './index';

/**
 * Application routes, will render "+page.svelte" component.
 */
const routes: Route[] = [
	{path: '/', redirect: '/home'},
	{path: '/home'},
	{path: '/citar-web'},
	{path: '/page1'},
	{path: '/page2'},
];

export default routes;

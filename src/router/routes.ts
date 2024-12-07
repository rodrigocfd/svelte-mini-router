import type {Route} from './index';

/**
 * Application routes.
 */
const routes: Route[] = [
	{path: '/',          component: 'home/Home.svelte'},
	{path: '/citar-web'},
	{path: '/page1'},
	{path: '/page2'},
];

export default routes;

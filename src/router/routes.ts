import type {Route} from './index';

/**
 * Application routes.
 */
const routes: Route[] = [
	{path: '/',          render: 'home/Home.svelte'},
	{path: '/citar-web', render: 'citar-web/CitarWeb.svelte'},
	{path: '/page1',     render: 'page1/Page1.svelte'},
	{path: '/page2',     render: 'page2/Page2.svelte'},
];

export default routes;

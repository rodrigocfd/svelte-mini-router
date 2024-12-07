import type {Route} from './index';

/**
 * Application routes, will render "+page.svelte" component.
 */
const routes: Route[] = [
	{path: '/',          render: () => import('../pages/home/+page.svelte')},
	{path: '/citar-web', render: () => import('../pages/citar-web/+page.svelte')},
	{path: '/page1',     render: () => import('../pages/page1/+page.svelte')},
	{path: '/page2',     render: () => import('../pages/page1/+page.svelte')},
];

export default routes;

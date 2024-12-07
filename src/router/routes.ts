import type {Route} from './index';

import Home from '@/pages/home/Home.svelte';
import CitarWeb from '@/pages/citar-web/CitarWeb.svelte';
import Page1 from '@/pages/page1/Page1.svelte';
import Page2 from '@/pages/page2/Page2.svelte';

/**
 * Application routes.
 */
const routes: Route[] = [
	{path: '/',          render: Home},
	{path: '/citar-web', render: CitarWeb},
	{path: '/page1',     render: Page1},
	{path: '/page2',     render: Page2},
];

export default routes;

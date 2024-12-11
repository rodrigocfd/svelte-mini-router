# Svelte Mini Router

A declarative, minimal router for Svelte 5 **without** SvelteKit.

Features:

* declarative;
* tiny API – 2 components and 1 function;
* tiny size – about 7 KB;
* works without SvelteKit – perfect for SPAs created with [Vite](https://vite.dev/guide/#scaffolding-your-first-vite-project);
* scalable – routes are lazy-loaded;
* built-in TypeScript support.

## Usage

Install the package:

```bash
npm i svelte-mini-router
```

Example folder structure:

```
src/
├ pages/
│ ├ home/
│ │ └ MyHome.svelte
│ └ page1/
│   └ Page1.svelte
├ App.svelte
├ Error404.svelte
├ main.ts
└ routerConf.ts
```

Configure your router:

```ts
import {type RouterConf} from 'svelte-mini-router';

export const routerConf: RouterConf = {
    routes: [
        // this is your home page
        {path: '/', render: () => import('./pages/home/MyHome.svelte')},

        // another page
        {path: '/page1', render: () => import('./pages/page1/Page1.svelte')},

        // nested routes are up to you
        {path: '/foo/bar/stuff', render: () => import('./pages/page1/Page1.svelte')},
    ],

    // if you use a base URL, set it here
    baseUrl: '/my-web-application',

    // error 404 route; optional
    // if not defined, a simple "404 - Not found" text will be displayed
    render404: () => import('./Error404.svelte'),
};
```

Finally add the router component to your `App.svelte`:

```svelte
<script lang="ts">
    import {Router} from 'svelte-mini-router';
    import {routerConf} from './routerConf';
</script>

<Router {routerConf} />
```

### Navigating

Creating an `<a href="">` element to a route:

```svelte
<script lang="ts">
    import {Link} from 'svelte-mini-router';
</script>

<Link path="/page1">Go to Page 1</Link>
```

Programmatically navigating to a route:

```ts
import {navigate} from 'svelte-mini-router';

navigate('/page1');
```

## License

Licensed under [MIT license](https://opensource.org/licenses/MIT), see [LICENSE.md](LICENSE.md) for details.
'
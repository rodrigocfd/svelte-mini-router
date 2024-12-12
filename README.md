# Svelte Mini Router

A declarative, minimal SPA router for Svelte 5, without SvelteKit. 

Features:

* declarative, independent from directory structure
* tiny API
    * 2 components – `Router` and `Link`
    * 2 functions – `navigate` and `getQueryParams`
* tiny size – about 9 KB
* works without SvelteKit – perfect for SPAs created with [Vite](https://vite.dev/guide/#scaffolding-your-first-vite-project)
* scalable – routes are lazy-loaded
* built-in TypeScript support

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

Programmatically navigating to a route:

```ts
import {navigate} from 'svelte-mini-router';

// without query parameters
navigate('/page1');

// with query parameters
// means "/page1?name=Joe&age=43"
navigate('/page1', {name: 'Joe', age: 43});
```

Creating an `<a href="">` element to a route:

```svelte
<script lang="ts">
    import {Link} from 'svelte-mini-router';
</script>

<!-- without query parameters -->
<Link path="/page1">
    Go to Page 1
</Link>

<!-- with query parameters -->
<Link path="/page1" params={{name: 'Joe', age: 43}}>
    Go to Page 1
</Link>
```

### Parameters

Current URL query parameters can be retrieved as an object:

```ts
import {getQueryParams} from 'svelte-mini-router';

const queryParams = getQueryParams();
```

## License

Licensed under [MIT license](https://opensource.org/licenses/MIT), see [LICENSE.md](LICENSE.md) for details.

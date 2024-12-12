# Svelte Mini Router

A declarative, minimal SPA router for Svelte 5, without SvelteKit. 

Features:

* declarative – works with any directory structure
* small API (see below)
    * 2 components – `Router` and `Link`
    * 3 functions – `navigate`, `getPathParams` and `getQueryParams`
* works without SvelteKit – perfect for SPAs created with [Vite](https://vite.dev/guide/#scaffolding-your-first-vite-project)
* scalable – routes are lazy-loaded
* built-in TypeScript support

## Usage

Install the package:

```bash
npm i svelte-mini-router
```

Folder structure has no rules, you can organize the way you want. For example:

```
src/
├─ pages/
│  ├─ home/
│  │  └─ MyHome.svelte
│  └─ page1/
│     └─ Page1.svelte
├─ App.svelte
├─ Error404.svelte
├─ main.ts
└─ routerConf.ts
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

        // you can use path parameters anywhere
        {path: '/foo/{name}/and/{age}', render: () => import('./pages/page1/Page1.svelte')},
    ],

    // if you use a base URL, set it here; optional
    baseUrl: '/my-web-application',

    // error 404 route; optional
    // if not defined, a simple "404 - Not found" text will be displayed
    render404: () => import('./Error404.svelte'),
};
```

Finally add the `Router` component to your `App.svelte`:

```svelte
<script lang="ts">
    import {Router} from 'svelte-mini-router';
    import {routerConf} from './routerConf';
</script>

<Router {routerConf} />
```

### Navigating

Rendering an `<a href="">` element to a route with the `Link` component:

```svelte
<script lang="ts">
    import {Link} from 'svelte-mini-router';
</script>

<!-- without query parameters -->
<Link path="/page1">
    Go to Page 1
</Link>

<!-- with query parameters -->
<!-- means "/page1?name=Joe&age=43" -->
<Link path="/page1" params={{name: 'Joe', age: 43}}>
    Go to Page 1
</Link>
```

Programmatically navigating to a route with `navigate` function:

```ts
import {navigate} from 'svelte-mini-router';

// without query parameters
navigate('/page1');

// with query parameters
// means "/page1?name=Joe&age=43"
navigate('/page1', {name: 'Joe', age: 43});
```

### Parameters

Current URL path parameters can be retrieved as an object with `getPathParams` function:

```ts
import {getPathParams} from 'svelte-mini-router';

// from "/foo/{name}/and/{age}"
// then "/foo/Joe/and/43"
const pathParams = getPathParams();
// will be {name: 'Joe', age: '43'}
```

And query parameters with `getQueryParams` function:

```ts
import {getQueryParams} from 'svelte-mini-router';

// from "/page1?name=Joe&age=43"
const queryParams = getQueryParams();
// will be {name: 'Joe', age: '43'}
```

## License

Licensed under [MIT license](https://opensource.org/licenses/MIT), see [LICENSE.md](LICENSE.md) for details.

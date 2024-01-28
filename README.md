# Dependencies
- [node LTS](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) comes with node.
- [vite](https://vitejs.dev/)
- [eslint](https://eslint.org/) optional but recommended.

# Installation
- Install the dependencies
- Clone the repository
- Navigate into your clone of the repository
- Install the project's npm dependencies with `npm install`

# Running and Building the Project
To run a deveploment build of the project, you can execute the following command:
```console
npm run dev
```

To preview a production build of the project locally in the browser:
```console
npm run preview
```

To build the project for production, i.e. transpile into JavaScript:
```console
npm run build
```

# Hosting the Project on a Remote Server
After building the project, move the project to a remote instance. You can use a reverse proxy/web serve such as [NGINX](https://www.nginx.com/) or 
[Apache](https://httpd.apache.org/docs/2.4/howto/reverse_proxy.html) to direct user traffic to the project. If a domain name is acquired, 
it is recommended to configure SSL. Setting up a reverse proxy, SSL, and the domain name can be easily setup with [Certbot](https://certbot.eff.org/).
Once initial configuration of the the reverse proxy is complete, rules must be setup to serve `index.html` and static resources such as CSS files, images, and videos.
It is important to note that the application handles its routing internally, which means that any route except `public/{RESOURCE_NAME}` should be directed to `index.html`.
You can refer to this [resource](https://docs.nginx.com/nginx/admin-guide/web-server/serving-static-content/) for serving static content with NGINX.


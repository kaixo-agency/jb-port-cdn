# Local Development & Deployment Workflow

This project is set up to streamline the development workflow for local CSS and JS editing, automatic syncing with GitHub, and deployment to Cloudflare Workers. It also includes live reloading for instant feedback in Webflow staging.

## Features

- **Local Development:** Uses `live-server` to serve CSS and JS files locally.
- **Automatic GitHub Sync:** Pushes updates to GitHub, which Cloudflare Workers fetch from.
- **Cloudflare CDN:** Serves production-ready files from GitHub.
- **Live Reloading:** Automatically refreshes Webflow staging pages when changes are made locally.

## Folder Structure

```
/my-project
│── src/                   # Source files
│   ├── reload-server.js   # WebSocket server for live reload
│── assets/                # CSS & JS files for local development
│── package.json           # Project dependencies & scripts
│── index.js               # Cloudflare Worker script
│── README.md              # This documentation
```

## Installation

Ensure you have **Node.js** installed, then run:

```sh
npm install
```

## Usage

### 1. Start Local Development

```sh
npm run start
```

This will:

- Start `live-server` to serve local files
- Start a WebSocket server for live reload

### 2. Edit Files

Modify your CSS and JS files in the `assets/` directory. Changes will reflect instantly in Webflow staging without refreshing.

### 3. Push to GitHub

Once satisfied with your changes:

```sh
git add .
git commit -m "Update styles and scripts"
git push origin main
```

This triggers Cloudflare Workers to fetch the latest versions from GitHub.

### 4. Switch Webflow Paths

- **Development:** Use `http://localhost:5500/assets/styles.css` in Webflow.
- **Production:** Use `https://port-cdn.yourdomain.workers.dev/assets/styles.css`.

## Troubleshooting

- **Permissions Issues**: If `npm install` fails due to permission errors, try:
  ```sh
  sudo npm install --unsafe-perm=true --allow-root
  ```
- **Webflow Not Reloading?** Ensure your WebSocket script is added in Webflow:
  ```html
  <script>
    const ws = new WebSocket("ws://localhost:35729");
    ws.onmessage = (event) => {
      if (event.data === "reload") {
        location.reload();
      }
    };
  </script>
  ```
- **Cloudflare Not Updating Instantly?** Try clearing the cache in Cloudflare.

## Future Improvements

- Automate GitHub to Cloudflare deployment
- Add a UI for managing Webflow paths

Happy coding! 🚀


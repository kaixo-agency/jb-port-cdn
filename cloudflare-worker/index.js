export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Serve static assets
    if (url.pathname.startsWith("/assets/")) {
      return env.ASSETS.fetch(request);
    }

    return new Response("File not found", { status: 404 });
  },
};

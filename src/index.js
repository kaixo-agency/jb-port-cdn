export default {
    async fetch(request, env, ctx) {
      return handleRequest(request, env);
    },
  };
  
  async function handleRequest(request, env) {
    const url = new URL(request.url);
    const filePath = url.pathname.replace("/cdn/", ""); // Remove the "/cdn/" prefix
  
    // GitHub details
    const repo = "kaixo-agency/jb-port-cdn";
    const branch = "main";
    const githubUrl = `https://raw.githubusercontent.com/${repo}/${branch}/${filePath}`;
  
    // Fetch the file from GitHub
    const response = await fetch(githubUrl, {
      headers: {
        "Authorization": `token ${env.GITHUB_TOKEN}`, // Use env for secrets
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  
    if (!response.ok) {
      return new Response("File not found", { status: 404 });
    }
  
    // Determine content type
    const extension = filePath.split(".").pop();
    const contentTypes = {
      css: "text/css",
      js: "application/javascript",
      html: "text/html",
      json: "application/json",
    };
    const contentType = contentTypes[extension] || "text/plain";
  
    return new Response(response.body, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
      },
    });
  }
  
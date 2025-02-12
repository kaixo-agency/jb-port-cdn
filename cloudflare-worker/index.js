export default {
    async fetch(request, env, ctx) {
      const url = new URL(request.url);
      const filePath = url.pathname.replace("/cdn/", "");
  
      // Fetch the file from GitHub
      const repo = "kaixo-agency/jb-port-cdn";
      const branch = "main";
      const githubUrl = `https://raw.githubusercontent.com/${repo}/${branch}/${filePath}`;
  
      const response = await fetch(githubUrl, {
        headers: { "Cache-Control": "no-cache" },
      });
  
      if (!response.ok) {
        return new Response("File not found", { status: 404 });
      }
  
      // Set correct content type
      let contentType = "text/plain";
      if (filePath.endsWith(".css")) contentType = "text/css";
      if (filePath.endsWith(".js")) contentType = "application/javascript";
  
      return new Response(response.body, {
        headers: { "Content-Type": contentType, "Cache-Control": "no-cache" },
      });
    },
  };
  
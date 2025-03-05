(() => {
  var __defProp = Object.defineProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

  // src/index.js
  addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event.request));
  });
  async function handleRequest(request) {
    const url = new URL(request.url);
    const filePath = url.pathname.replace("/cdn/", "");
    const repo = "kaixo-agency/jb-port-cdn";
    const branch = "main";
    const githubToken = GITHUB_TOKEN;
    const githubUrl = `https://raw.githubusercontent.com/${repo}/${branch}/assets/${filePath}?t=${Date.now()}`;
    const response = await fetch(githubUrl, {
      headers: {
        "Authorization": `token ${githubToken}`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0"
      }
    });
    if (!response.ok) {
      return new Response("File not found", { status: 404 });
    }
    const newResponse = new Response(response.body, response);
    newResponse.headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
    newResponse.headers.set("Pragma", "no-cache");
    newResponse.headers.set("Expires", "0");
    return newResponse;
  }
  __name(handleRequest, "handleRequest");
})();
//# sourceMappingURL=index.js.map

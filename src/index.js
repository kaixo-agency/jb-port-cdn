addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    const url = new URL(request.url);
    const filePath = url.pathname.replace("/cdn/", ""); // Remove the "/cdn/" prefix

    // GitHub details
    const repoOwner = "kaixo-agency";
    const repoName = "jb-port-cdn";
    const branch = "main";  // Adjust this if your branch reference differs
    const githubToken = GITHUB_TOKEN; // Set this in Cloudflare Worker environment variables

    // Corrected GitHub Raw URL

    const cacheBuster = Date.now();
    const githubUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/refs/heads/${branch}/assets/${filePath}?t=${cacheBuster}`;


    // Fetch the file from GitHub
  const response = await fetch(githubUrl, {
    headers: {
      "Authorization": `token ${githubToken}`,
      "Cache-Control": "no-cache, no-store, must-revalidate, proxy-revalidate",
      "Pragma": "no-cache",
      "Expires": "0",
    },
  });

    if (!response.ok) {
        return new Response("File not found", { status: 404 });
    }

    // Determine content type
    let contentType = "text/plain";
    if (filePath.endsWith(".css")) contentType = "text/css";
    if (filePath.endsWith(".js")) contentType = "application/javascript";

    return new Response(response.body, {
        headers: {
            "Content-Type": contentType,
            "Cache-Control": "public, max-age=3600", // Cache for 1 hour
        },
    });
}
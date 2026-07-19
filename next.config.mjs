/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Redirect the domain root to /home at the routing layer (real HTTP
  // redirect with a Location header). The previous approach — `redirect("/home")`
  // inside the prerendered src/app/page.tsx — produced a 307 WITHOUT a
  // Location header, which browsers render as a normal page: visitors
  // entering at "/" saw the off-white error shell + navbar hydrate first,
  // then a client-side hop to /home in the SAME document, so the pre-paint
  // intro-splash script (parser-executed only) never ran and the dark
  // intro screen appeared late. src/app/page.tsx is kept as a fallback but
  // is unreachable — this redirect resolves before filesystem routes.
  // permanent: true → HTTP 308, so search engines consolidate ranking
  // signals from "/" onto /home instead of treating it as temporary.
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

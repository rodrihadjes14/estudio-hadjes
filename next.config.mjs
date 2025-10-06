/** @type {import('next').NextConfig} */
const nextConfig = {
  // tus opciones base si tenías otras…

  async redirects() {
    return [
      {
        source: "/servicios/defensa-del-consumidor",
        destination: "/servicios/defensa-al-consumidor",
        permanent: true,
      },
      // agrega más redirecciones acá
    ];
  },

  async headers() {
    return [
      {
        source: "/og/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },

  images: { formats: ["image/avif", "image/webp"] },
};

export default nextConfig;

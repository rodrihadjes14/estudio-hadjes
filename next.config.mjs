/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;


  async redirects() {
    return [
      { source: "/servicios/defensa-del-consumidor", destination: "/servicios/defensa-al-consumidor", permanent: true },
      // agrega aquí cualquier otro slug viejo → nuevo
    ];
  },


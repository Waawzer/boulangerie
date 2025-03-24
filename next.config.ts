import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // Désactiver la compression pour les fichiers GLB
  compress: false,
  
  // Configuration des en-têtes HTTP
  async headers() {
    return [
      {
        // Appliquer ces en-têtes aux fichiers GLB
        source: '/:path*.glb',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
    ];
  },
};

export default nextConfig;

const nextConfig = {
    images: {
      remotePatterns: [
        {
          hostname: 'cdn.jsdelivr.net',
        },
        {
            hostname: 'www.themoviedb.org',
          },
      ],
    },
  };
  
  export default nextConfig;
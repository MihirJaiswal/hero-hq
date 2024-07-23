const nextConfig = {
    images: {
      remotePatterns: [
        {
          hostname: 'cdn.jsdelivr.net',
        },
        {
            hostname: 'www.superherodb.com',
          },
      ],
    },
  };
  
  export default nextConfig;
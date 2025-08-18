import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export", // next build -> out/ üretir
  images: { unoptimized: true }, // next/image export'ta optimize etmez
};

export default nextConfig;

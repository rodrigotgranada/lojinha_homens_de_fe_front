import type { NextConfig } from "next";
import os from "os";

// Detecta dinamicamente todos os IPs locais (Wi-Fi/Ethernet) do notebook para permitir acessos de tablets em desenvolvimento
const getLocalIpAddresses = (): string[] => {
  const interfaces = os.networkInterfaces();
  const addresses: string[] = [];
  for (const name of Object.keys(interfaces)) {
    const iface = interfaces[name];
    if (iface) {
      for (const alias of iface) {
        if (alias.family === "IPv4" && !alias.internal) {
          addresses.push(alias.address);
          addresses.push(`${alias.address}:5005`);
        }
      }
    }
  }
  return addresses;
};

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    "localhost:5005",
    "127.0.0.1:5005",
    ...getLocalIpAddresses()
  ]
};

export default nextConfig;

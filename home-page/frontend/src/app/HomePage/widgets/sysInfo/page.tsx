"use client";
import { useEffect, useState } from "react";

type ClientInfo = {
  userAgent: string;
  platform: string;
  language: string;
  memory?: number;
  cpuCores?: number;
};

interface NavigatorWithDeviceMemory extends Navigator {
  deviceMemory?: number;
}

export default function ClientSysInfoWidget() {
  const [info, setInfo] = useState<ClientInfo>({
    userAgent: "",
    platform: "",
    language: "",
    memory: undefined,
    cpuCores: undefined,
  });

  useEffect(() => {
    const nav = window.navigator as NavigatorWithDeviceMemory;
    setInfo({
      userAgent: nav.userAgent,
      platform: nav.platform,
      language: nav.language,
      memory: nav.deviceMemory,
      cpuCores: nav.hardwareConcurrency ?? undefined,
    });
  }, []);
  return (
    <div className="rounded-lg bg-card p-4 shadow text-card-foreground w-full max-w-xs">
      <h3 className="text-lg font-bold mb-2">Your Device Info</h3>
      <ul className="space-y-1 text-sm">
        <li>
          <span className="font-semibold">Platform:</span> {info.platform}
        </li>
        <li>
          <span className="font-semibold">Browser:</span> {info.userAgent}
        </li>
        <li>
          <span className="font-semibold">Language:</span> {info.language}
        </li>
        <li>
          <span className="font-semibold">CPU Cores:</span>{" "}
          {info.cpuCores ?? "Unknown"}
        </li>
        <li>
          <span className="font-semibold">Device Memory:</span>{" "}
          {info.memory ? `${info.memory} GB` : "Unknown"}
        </li>
      </ul>
    </div>
  );
}

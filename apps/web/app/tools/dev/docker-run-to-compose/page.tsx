"use client";

import { useState, useMemo } from "react";
import { Copy, Check, Terminal, Box, Download, Sparkles } from "lucide-react";

const PRESETS = [
  {
    name: "Redis with Volume & Password",
    command:
      "docker run -d --name my-redis -p 6379:6379 -v redis_data:/data --restart unless-stopped -e REDIS_PASSWORD=supersecret redis:7-alpine",
  },
  {
    name: "PostgreSQL Database",
    command:
      "docker run -d --name dev-postgres -p 5432:5432 -v pgdata:/var/lib/postgresql/data -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=mysecretpassword -e POSTGRES_DB=appdb postgres:16-alpine",
  },
  {
    name: "Nginx Web Server",
    command:
      "docker run -d --name web-proxy -p 80:80 -p 443:443 -v ./html:/usr/share/nginx/html:ro -v ./nginx.conf:/etc/nginx/nginx.conf:ro nginx:alpine",
  },
  {
    name: "Stirling-PDF Container",
    command:
      "docker run -d --name stirling-pdf -p 8080:8080 -v ./trainingData:/usr/share/tessdata -e DOCKER_ENABLE_SECURITY=false frooodle/s-pdf:latest",
  },
];

export default function DockerRunToComposePage() {
  const [command, setCommand] = useState<string>(PRESETS[0].command);
  const [copied, setCopied] = useState(false);

  const composeYaml = useMemo(() => {
    try {
      const raw = command.trim();
      if (!raw) return "# Paste a `docker run` command above to generate docker-compose.yml";

      // Tokenize command line preserving quotes
      const tokens: string[] = [];
      const regex = /[^\s"']+|"([^"]*)"|'([^']*)'/g;
      let match;
      while ((match = regex.exec(raw)) !== null) {
        tokens.push(match[1] || match[2] || match[0]);
      }

      // Filter out 'docker', 'run'
      let idx = 0;
      if (tokens[0] === "docker") idx++;
      if (tokens[idx] === "run") idx++;

      let name = "app";
      let restart = "";
      const ports: string[] = [];
      const volumes: string[] = [];
      const envs: string[] = [];
      let network = "";
      let image = "";
      const cmdArgs: string[] = [];

      const namedVolumes = new Set<string>();

      while (idx < tokens.length) {
        const t = tokens[idx];

        if (t === "-d" || t === "--detach" || t === "-it" || t === "-i" || t === "-t" || t === "--rm") {
          idx++;
          continue;
        }

        if (t === "--name" && tokens[idx + 1]) {
          name = tokens[idx + 1];
          idx += 2;
          continue;
        }

        if ((t === "-p" || t === "--publish") && tokens[idx + 1]) {
          ports.push(tokens[idx + 1]);
          idx += 2;
          continue;
        }

        if ((t === "-v" || t === "--volume") && tokens[idx + 1]) {
          const v = tokens[idx + 1];
          volumes.push(v);
          const [host] = v.split(":");
          if (host && !host.startsWith(".") && !host.startsWith("/") && !host.startsWith("~")) {
            namedVolumes.add(host);
          }
          idx += 2;
          continue;
        }

        if ((t === "-e" || t === "--env") && tokens[idx + 1]) {
          envs.push(tokens[idx + 1]);
          idx += 2;
          continue;
        }

        if (t === "--restart" && tokens[idx + 1]) {
          restart = tokens[idx + 1];
          idx += 2;
          continue;
        }

        if ((t === "--network" || t === "--net") && tokens[idx + 1]) {
          network = tokens[idx + 1];
          idx += 2;
          continue;
        }

        if (!t.startsWith("-")) {
          if (!image) {
            image = t;
            idx++;
          } else {
            cmdArgs.push(t);
            idx++;
          }
          continue;
        }

        // Unknown single/double flag without value
        idx++;
      }

      if (!image) {
        return "# Please ensure the command specifies a Docker image.";
      }

      // Generate Clean Compose YAML
      const lines: string[] = [];
      lines.push("services:");
      lines.push(`  ${name}:`);
      lines.push(`    image: ${image}`);
      lines.push(`    container_name: ${name}`);

      if (restart) {
        lines.push(`    restart: ${restart}`);
      }

      if (ports.length > 0) {
        lines.push("    ports:");
        ports.forEach((p) => lines.push(`      - "${p}"`));
      }

      if (volumes.length > 0) {
        lines.push("    volumes:");
        volumes.forEach((v) => lines.push(`      - ${v}`));
      }

      if (envs.length > 0) {
        lines.push("    environment:");
        envs.forEach((e) => lines.push(`      - ${e}`));
      }

      if (network) {
        lines.push("    networks:");
        lines.push(`      - ${network}`);
      }

      if (cmdArgs.length > 0) {
        lines.push(`    command: ${cmdArgs.join(" ")}`);
      }

      if (namedVolumes.size > 0) {
        lines.push("");
        lines.push("volumes:");
        namedVolumes.forEach((v) => lines.push(`  ${v}:`));
      }

      return lines.join("\n");
    } catch {
      return "# Could not parse command. Please check syntax.";
    }
  }, [command]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(composeYaml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = () => {
    const blob = new Blob([composeYaml], { type: "text/yaml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "docker-compose.yml";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Docker Run to Docker Compose Converter</h1>
        <p className="mt-3 text-gray-600">
          Transform any <code>docker run</code> command into a clean, reusable <code>docker-compose.yml</code> file.
        </p>
      </div>

      <div className="rounded-2xl border bg-white p-6 sm:p-8 shadow-sm border-gray-200 space-y-6">
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
            Docker Run Command
          </label>
          <textarea
            rows={3}
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="docker run -d --name web -p 8080:80 nginx:alpine"
            className="w-full rounded-xl border border-gray-300 p-3 text-sm font-mono focus:border-emerald-500 focus:outline-none"
          />
        </div>

        {/* Presets */}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Examples &amp; Presets
          </p>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.name}
                onClick={() => setCommand(p.command)}
                className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 transition"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* YAML Output */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
              <Box className="w-4 h-4 text-emerald-600" />
              docker-compose.yml Output
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={copyToClipboard}
                className="text-xs text-gray-600 hover:text-gray-900 flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 bg-white"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                Copy YAML
              </button>
              <button
                onClick={downloadFile}
                className="text-xs text-white bg-emerald-600 hover:bg-emerald-700 flex items-center gap-1 px-3 py-1.5 rounded-lg transition"
              >
                <Download className="w-3.5 h-3.5" />
                Download .yml
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-900 p-4 text-white">
            <pre className="text-xs sm:text-sm font-mono overflow-x-auto text-emerald-400">
              {composeYaml}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

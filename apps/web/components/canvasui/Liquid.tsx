"use client";

import React, { useEffect, useRef, useState } from "react";

interface LiquidProps {
  children?: React.ReactNode;
  className?: string;
  intensity?: number;
  interactive?: boolean;
  color?: string;
}

export function Liquid({
  children,
  className = "",
  intensity = 0.5,
  interactive = true,
}: LiquidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: true, antialias: true });
    if (!gl) return;

    // Vertex shader
    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = (a_position + 1.0) * 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment shader with fluid-like refraction and wave distortion
    const fsSource = `
      precision mediump float;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform float u_intensity;
      uniform vec2 u_resolution;
      varying vec2 v_uv;

      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution;
        vec2 m = u_mouse;
        
        float dist = distance(st, m);
        float wave = sin(dist * 18.0 - u_time * 2.5) * exp(-dist * 4.0) * u_intensity * 0.04;
        
        // Fluid ripple layers
        float f1 = sin(st.x * 6.0 + u_time * 0.8) * cos(st.y * 6.0 + u_time * 0.8) * 0.015 * u_intensity;
        float f2 = sin(st.y * 12.0 - u_time * 1.2 + m.x * 3.0) * 0.01 * u_intensity;
        
        vec2 offset = vec2(wave + f1, wave + f2);
        vec2 uv = v_uv + offset;
        
        // Subtle chromatic dispersion highlights
        float r = sin(uv.x * 2.0 + u_time * 0.5) * 0.03 + 0.02;
        float g = cos(uv.y * 2.0 + u_time * 0.6) * 0.05 + 0.04;
        float b = sin((uv.x + uv.y) * 2.0 - u_time * 0.4) * 0.08 + 0.06;
        
        float alpha = clamp(length(offset) * 12.0, 0.0, 0.25);
        gl_FragColor = vec4(r, g, b, alpha);
      }
    `;

    const createShader = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      return shader;
    };

    const vs = createShader(gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const aPos = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "u_time");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uIntensity = gl.getUniformLocation(program, "u_intensity");
    const uResolution = gl.getUniformLocation(program, "u_resolution");

    let startTime = performance.now();

    const resize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const render = (time: number) => {
      // Smooth interpolation
      const m = mouseRef.current;
      m.x += (m.targetX - m.x) * 0.1;
      m.y += (m.targetY - m.y) * 0.1;

      gl.uniform1f(uTime, (time - startTime) * 0.001);
      gl.uniform2f(uMouse, m.x, 1.0 - m.y);
      gl.uniform1f(uIntensity, intensity);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [intensity]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current.targetX = (e.clientX - rect.left) / rect.width;
    mouseRef.current.targetY = (e.clientY - rect.top) / rect.height;
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-60 transition-opacity duration-300"
        style={{ opacity: isHovered ? 0.85 : 0.4 }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default Liquid;

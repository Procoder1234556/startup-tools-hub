"use client";

import React from "react";
import { MarketplaceTool, getToolBySlug } from "@/lib/marketplace-tools";
import ToolPageShell from "./ToolPageShell";
import EditorTemplate from "./EditorTemplate";
import FileUploadTemplate from "./FileUploadTemplate";
import GeneratorTemplate from "./GeneratorTemplate";
import CalculatorTemplate from "./CalculatorTemplate";
import ImageToolTemplate from "./ImageToolTemplate";
import PdfWorkspaceTemplate from "./PdfWorkspaceTemplate";

interface DedicatedToolPageProps {
  tool?: MarketplaceTool;
  slug?: string;
  category?: string;
}

export default function DedicatedToolPage({
  tool: propTool,
  slug,
  category,
}: DedicatedToolPageProps) {
  const tool =
    propTool || (slug ? getToolBySlug(category || "", slug) : undefined);

  if (!tool) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center p-8 text-center">
        <div>
          <h2 className="text-xl font-bold text-[#0F172A]">Tool Not Found</h2>
          <p className="text-xs text-[#64748B] mt-1">
            Unable to load configuration for this tool.
          </p>
        </div>
      </div>
    );
  }

  const renderWorkspace = () => {
    switch (tool.template) {
      case "editor":
        return <EditorTemplate tool={tool} />;
      case "file-upload":
        return <FileUploadTemplate tool={tool} />;
      case "generator":
        return <GeneratorTemplate tool={tool} />;
      case "calculator":
        return <CalculatorTemplate tool={tool} />;
      case "image":
        return <ImageToolTemplate tool={tool} />;
      case "pdf-workspace":
        return <PdfWorkspaceTemplate tool={tool} />;
      default:
        return <EditorTemplate tool={tool} />;
    }
  };

  return <ToolPageShell tool={tool}>{renderWorkspace()}</ToolPageShell>;
}

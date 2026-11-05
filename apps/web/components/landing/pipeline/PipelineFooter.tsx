"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MessageSquare, X } from "lucide-react";

export default function PipelineFooter() {
  const [showHelp, setShowHelp] = useState(true);

  return (
    <footer className="bg-[#FAF8F5] py-8 text-xs text-gray-500 border-t border-[#ECEAE7] relative">
      <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
        <div>
          <span>© 2026 Startup Tools Hub. Open source under MIT. All rights reserved.</span>
        </div>

        <div className="flex items-center gap-6 text-gray-600">
          <Link href="/tools" className="hover:text-gray-900 transition-colors">
            All Tools (100+)
          </Link>
          <Link href="/tools/finance" className="hover:text-gray-900 transition-colors">
            Finance Hub
          </Link>
          <Link href="/tools/pdf" className="hover:text-gray-900 transition-colors">
            PDF Suite
          </Link>
          <Link href="/privacy" className="hover:text-gray-900 transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-gray-900 transition-colors">
            Terms
          </Link>
        </div>
      </div>

      {/* Floating Need Help Widget matching reference pixel-for-pixel */}
      {showHelp && (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 shadow-lg transition-all hover:bg-gray-50">
          <MessageSquare className="h-3.5 w-3.5 text-blue-600" />
          <span>Need help?</span>
          <button
            onClick={() => setShowHelp(false)}
            className="ml-1 text-gray-400 hover:text-gray-600"
            aria-label="Dismiss help"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </footer>
  );
}

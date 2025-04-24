import { Blocks, Code2, GitBranch, Terminal, Coffee, Github, Twitter, Linkedin, Heart, ExternalLink } from "lucide-react";
import Link from "next/link";

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative border-t border-gray-800/50 mt-auto bg-[#0a0a0a]">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gray-900 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 text-gray-400">
              <Code2 className="size-6" />
              <Terminal className="size-6" />
              <span className="text-lg">Built for developers, by developers</span>
            </div>
            <div className="flex items-center gap-3 text-gray-500">
              <Coffee className="size-5" />
              <span className="text-base">Fueled by coffee and semicolons;</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-3 text-gray-500">
              <GitBranch className="size-5" />
              <span className="text-base">main • v1.0.0</span>
            </div>
            <div className="flex items-center gap-8">
              <Link 
                href="/support" 
                className="text-gray-400 hover:text-gray-300 transition-colors text-base flex items-center gap-1"
              >
                <ExternalLink className="size-4" />
                Support
              </Link>
              <Link 
                href="/docs" 
                className="text-gray-400 hover:text-gray-300 transition-colors text-base flex items-center gap-1"
              >
                <ExternalLink className="size-4" />
                Docs
              </Link>
              <Link 
                href="/privacy" 
                className="text-gray-400 hover:text-gray-300 transition-colors text-base flex items-center gap-1"
              >
                <ExternalLink className="size-4" />
                Privacy
              </Link>
              <Link 
                href="/terms" 
                className="text-gray-400 hover:text-gray-300 transition-colors text-base flex items-center gap-1"
              >
                <ExternalLink className="size-4" />
                Terms
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-gray-500 text-sm">
            {currentYear} Coditor. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300 transition-colors">
              <Github className="size-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300 transition-colors">
              <Twitter className="size-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300 transition-colors">
              <Linkedin className="size-5" />
            </a>
          </div>
          
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <span>Made with</span>
            <Heart className="size-4 text-red-500" fill="#ef4444" />
            <span>in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
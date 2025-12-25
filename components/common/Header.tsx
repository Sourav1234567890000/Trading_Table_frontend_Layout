"use client";

import Link from "next/link";
import { useState } from "react";

export default function tradeTableHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-[#0b0b0f] rounded-lg">
      {/* Header */}
      <header className="sticky top-0 z-10 px-4 py-3 bg-[#0b0b0f] border-b border-[#1f1f24] flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center font-bold text-lg">
            TT
          </div>
          <span className="text-white text-xl font-semibold">Trade Table</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6 text-gray-400">
          <Link
            href="/"
            className="hover:text-white transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href="/markets"
            className="hover:text-white transition-colors duration-200"
          >
            Discover
          </Link>
          <Link
            href="/pulse"
            className="text-white transition-colors duration-200"
          >
            Pulse
          </Link>
          <Link
            href="/docs"
            className="hover:text-white transition-colors duration-200"
          >
            Portfolio
          </Link>
        </nav>

        {/* User Action */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href="https://2048-game-five-psi.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-[#1f1f24] hover:bg-[#2a2a30] px-4 py-2 rounded-lg text-white transition-colors duration-200">
             2048 GAME
            </button>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#0b0b0f] flex flex-col md:hidden px-4 py-4 space-y-3 border-t border-[#1f1f24] z-50">
          <Link href="/" className="text-gray-400 hover:text-white">
            Home
          </Link>
          <Link href="/markets" className="text-gray-400 hover:text-white">
            Markets
          </Link>
          <Link href="/pulse" className="text-gray-400 hover:text-white">
            Pulse
          </Link>
          <Link href="/docs" className="text-gray-400 hover:text-white">
            Docs
          </Link>
          <button className="bg-[#1f1f24] hover:bg-[#2a2a30] px-4 py-2 rounded-lg text-white transition-colors duration-200 mt-2">
            Connect Wallet
          </button>
        </div>
      )}
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";

export function AffiliatePopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const closed = localStorage.getItem("affiliate-closed");
    if (!closed) {
      setTimeout(() => setShow(true), 3000);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-sm mx-4 text-center shadow-2xl border border-gray-200 dark:border-gray-700">
        <div className="text-6xl mb-4">🎁</div>
        <h2 className="text-2xl font-extrabold mb-2 text-gray-900 dark:text-white">Exclusive Offer!</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">Don&apos;t miss out on this limited deal!</p>
        <a
          href="https://omg10.com/4/10133035"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 px-8 rounded-xl text-lg hover:scale-105 transition-transform"
        >
          Claim Now
        </a>
        <button
          onClick={() => { setShow(false); localStorage.setItem("affiliate-closed", "true"); }}
          className="mt-4 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          No, thanks
        </button>
      </div>
    </div>
  );
}
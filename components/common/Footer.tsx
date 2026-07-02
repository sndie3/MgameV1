import React from "react";

function Footer() {
  return (
    <div className="flex justify-between items-center ">
      <div className="font-bold text-sm text-white">
        PinoyMGame.ph
        <span className="text-gray-500 ml-2 text-xs">2026 v1.0</span>
      </div>

      <img src="/assets/pagcor.png" className="h-12" alt="Pagcor" />
    </div>
  );
}

export default Footer;


function Footer() {
  return (
    <div className="flex justify-between items-center ">
      <div className="font-bold text-xs text-white">
        PinoyMGame.ph
        <span className="text-gray-500 ml-2 text-xs">v1.0</span>
      </div>

     <div className="flex gap-4">
       <img src="/assets/pagcor.png" className="h-10" alt="Pagcor" />
       <img src="/assets/gambling.png" className="h-10" alt="Pagcor" />
     </div>

    </div>
  );
}

export default Footer;

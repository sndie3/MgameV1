import React, { memo } from "react";

interface GameCardProps {
  imageSrc: string;
  title: string;
  size?: "big" | "small";
  // ads?: any;
  // live?: any;
  // tutorial?: any;
  // play?: any;
}

const GameCard: React.FC<GameCardProps> = ({
  imageSrc,
  title,
  size = "small",
  //ads,
  // live,
  // tutorial,
  // play,
}) => {
  const imageHeight = size === "big" ? "280px" : "140px";

  return (
    <div className="flex flex-col">
      <div className="rounded-[16px] overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-gray-700/50 ">
        {/* Image */}
        <div className="relative" style={{ height: imageHeight }}>
          {imageSrc ? (
            <>
              <img
                src={imageSrc}
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-pink-900/30">
              <span className="text-white/70 text-xl font-bold tracking-wider">
                {title}
              </span>
            </div>
          )}
        </div>
      </div>
      {/* Bottom Actions */}
      <div className="flex justify-around items-center py-10 text-xl gap-5 text-white">
        {/* ads, live, tutorial, play: route must be used here */}
        <button className="cursor-pointer"> ADS</button>
        <button className="cursor-pointer"> LIVE</button>
        <button className="cursor-pointer" > TUTORIAL</button>
        <button className="text-3xl cursor-pointer"> PLAY</button>
      </div>
    </div>
  );
};

export default memo(GameCard);
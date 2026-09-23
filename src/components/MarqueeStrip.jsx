import React from 'react';

export default function MarqueeStrip({
  text = "FAUDI FOODS ★ CRUNCH HARDER ★ LOADED CREAM BUNS ★ OBSESSIVELY CRAFTED ★ KASARAGOD ROOTS ★ HEAVYWEIGHT NUT CHOCOLATE ★ GOOD FOOD. BIG MOOD. ★",
  bg = "bg-brand-black",
  textColor = "text-brand-yellow",
  borderColor = "border-brand-black",
  reverse = false,
  py = "py-3 sm:py-4",
  rotate = ""
}) {
  const items = [text, text, text, text];

  return (
    <div className={`relative w-full overflow-hidden border-y-2 ${borderColor} ${bg} ${py} ${rotate} select-none z-10`}>
      <div className={`flex whitespace-nowrap ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} will-change-transform`}>
        {items.map((str, index) => (
          <span
            key={index}
            className={`font-display text-sm sm:text-base md:text-lg tracking-widest uppercase mx-3 inline-flex items-center gap-3 ${textColor}`}
          >
            {str}
          </span>
        ))}
      </div>
    </div>
  );
}

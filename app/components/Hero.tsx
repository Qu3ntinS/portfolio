'use client';

import React from 'react';
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
  return (
    <section className="relative h-[88vh] w-full bg-[#00AEFF]">
      <div className="container mx-auto px-4 h-full">
        <div className="max-w-6xl mx-auto pt-40">
          {/* Content Box */}
          <div className="flex flex-col items-start relative">
            {/* Avatar positioned absolutely */}
            <div className="absolute top-0 -right-[1%] w-[450px] h-[450px] flex items-center justify-center">
              <Image
                src="/portfolio/avatar-background.svg"
                alt="Avatar Background"
                width={600}
                height={600}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%]"
              />
              <Image
                src="/portfolio/boy.svg"
                alt="Quentin's Avatar"
                width={300}
                height={300}
                priority
                className="relative z-10"
              />
            </div>

            {/* Text Content - Positioned relative to avatar */}
            <div className="text-white relative z-10" style={{ marginTop: '100px' }}>
              <h1 className="text-5xl font-bold mb-2">Hi, I'm Quentin.</h1>
              <div className="text-xl h-[30px]">
                <TypeAnimation
                  sequence={[
                    "I'm very cool!",
                    1000,
                    "I'm a Full Stack Developer!",
                    1000,
                    "I love creating awesome stuff!",
                    1000,
                    "I'm passionate about coding!",
                    1000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="opacity-90"
                />
              </div>
            </div>
            
            {/* Scroll Indicator */}
            <div className="flex flex-row items-start gap-[10px] text-sm text-white mt-16 items-center">
              <span className="text-base">Scroll down</span>
              <div className="w-6 h-10 rounded-full border-2 border-white flex items-start p-[7px]">
                <div className="w-1.5 h-2 bg-white rounded-full mx-auto animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Transition */}
      <div className="bottom-0 left-0 right-0 w-full">
        <Image
          src="/portfolio/wave.svg"
          alt="Wave Transition"
          width={1440}
          height={200}
          className="w-full"
        />
      </div>
    </section>
  );
};

export default Hero; 
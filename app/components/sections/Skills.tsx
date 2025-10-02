import React from "react";

const Skills = () => {
  return (
    <section id="skills" className="min-h-screen relative">
      <div className="container mx-auto px-4 py-20">
        <div className="flex items-start gap-6">
          {/* Punkt und Linie */}
          <div className="flex flex-col items-center pt-2">
            <div
              id="point-skills"
              className="w-4 h-4 rounded-full bg-background border-2 border-gray-700 relative z-10 transition-all duration-300"
            />
            <div
              className="w-[2px] flex-1 bg-gray-700 mt-2 relative"
              style={{ minHeight: "calc(100vh - 120px)" }}
            >
              <div
                id="line-skills"
                className="absolute top-0 left-0 w-full bg-cyan-400 transition-all duration-300"
                style={{ height: "0%" }}
              />
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-4xl font-bold text-white mb-8">Skills</h2>
            {/* Füge hier deinen Skills-Content ein */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

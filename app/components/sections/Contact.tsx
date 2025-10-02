import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="min-h-screen relative">
      <div className="container mx-auto px-4 py-20">
        <div className="flex items-start gap-6">
          {/* Punkt (letzter ohne Linie) */}
          <div className="flex flex-col items-center pt-2">
            <div
              id="point-contact"
              className="w-4 h-4 rounded-full bg-background border-2 border-gray-700 relative z-10 transition-all duration-300"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-4xl font-bold text-white mb-8">Contact</h2>
            {/* Füge hier deinen Contact-Content ein */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

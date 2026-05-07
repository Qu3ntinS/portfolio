"use client";

import React, { useState } from "react";
import { playType, playClick } from "../../lib/sounds";

const Contact = () => {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/portfolio/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ firstName: "", lastName: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const fieldStyle: React.CSSProperties = {
    background: "var(--bg-input)",
    border: "1px solid var(--border)",
    color: "var(--text)",
    fontFamily: "var(--font-mono), monospace",
    fontSize: 13,
    padding: "10px 14px",
    width: "100%",
    outline: "none",
    transition: "border-color 0.15s",
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.target.style.borderColor = "var(--accent)");
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.target.style.borderColor = "var(--border)");
  const onKeyDown = () => playType(0.09);

  return (
    <section id="contact" className="h-full flex flex-col justify-center px-[10vw] py-16 overflow-y-auto">
      <div style={{ maxWidth: 620 }}>
        <div className="font-mono mb-3">
          <span style={{ color: "var(--accent)" }}>$ </span>
          <span style={{ color: "var(--text-muted)" }} className="text-sm tracking-wider">./contact.sh</span>
        </div>

        <p className="font-mono text-xs mb-8 leading-relaxed" style={{ color: "var(--text-dim)" }}>
          // Questions, feedback, opportunities — all welcome.<br />
          // Include your contact details if you expect a reply.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-mono text-[11px] tracking-wider block mb-1" style={{ color: "var(--accent)" }}>▶ name</label>
              <input name="firstName" value={form.firstName} onChange={handleChange}
                required placeholder="Max" style={fieldStyle} onFocus={onFocus} onBlur={onBlur} onKeyDown={onKeyDown} />
            </div>
            <div>
              <label className="font-mono text-[11px] tracking-wider block mb-1" style={{ color: "var(--accent)" }}>▶ lastname</label>
              <input name="lastName" value={form.lastName} onChange={handleChange}
                placeholder="Mustermann" style={fieldStyle} onFocus={onFocus} onBlur={onBlur} onKeyDown={onKeyDown} />
            </div>
          </div>

          <div>
            <label className="font-mono text-[11px] tracking-wider block mb-1" style={{ color: "var(--accent)" }}>▶ email</label>
            <input name="email" value={form.email} onChange={handleChange}
              required type="email" placeholder="max@example.com"
              style={fieldStyle} onFocus={onFocus} onBlur={onBlur} onKeyDown={onKeyDown} />
          </div>

          <div>
            <label className="font-mono text-[11px] tracking-wider block mb-1" style={{ color: "var(--accent)" }}>▶ message</label>
            <textarea name="message" value={form.message} onChange={handleChange}
              required rows={5} placeholder="Your message..."
              style={{ ...fieldStyle, resize: "none" }} onFocus={onFocus} onBlur={onBlur} onKeyDown={onKeyDown} />
          </div>

          <button
            type="submit" disabled={status === "loading"}
            className="font-mono text-xs tracking-widest uppercase w-full py-3 transition-all duration-150"
            style={{ border: "1px solid var(--accent)", color: "var(--accent)", background: "transparent", cursor: status === "loading" ? "not-allowed" : "pointer", opacity: status === "loading" ? 0.5 : 1 }}
            onClick={() => { if (status !== "loading") playClick(); }}
            onMouseEnter={e => { if (status !== "loading") { (e.currentTarget as HTMLElement).style.background = "var(--accent)"; (e.currentTarget as HTMLElement).style.color = "var(--bg)"; } }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
          >
            {status === "loading" ? "// sending..." : "./submit"}
          </button>

          {status === "success" && (
            <p className="font-mono text-xs text-center" style={{ color: "var(--status-green)" }}>
              // message sent successfully
            </p>
          )}
          {status === "error" && (
            <p className="font-mono text-xs text-center" style={{ color: "rgba(239,68,68,0.8)" }}>
              // error: try again
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;

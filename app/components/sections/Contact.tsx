'use client';

import React, { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/portfolio/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      setForm({ firstName: '', lastName: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const inputClass = 'w-full bg-secondary light:bg-secondary-light text-text light:text-text-light placeholder-gray-500 rounded-lg px-4 py-3 text-sm outline-none border border-transparent focus:border-primary transition-colors';

  return (
    <section id="contact" className="py-20 bg-background light:bg-background-light">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-text light:text-text-light text-3xl font-bold mb-4">Contact</h2>
          <p className="text-text light:text-text-light opacity-70 mb-8 text-sm max-w-2xl leading-relaxed">
            If you have any suggestion, feedback, opportunity, or are interested in
            collaborating on a project, I would love to hear from you! Please feel
            free to reach out using the contact details provided below. If you are
            expecting a reply, kindly mention your contact details in your message.
          </p>
          <form onSubmit={handleSubmit} className="max-w-2xl space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input type="text" name="firstName" value={form.firstName} onChange={handleChange} required placeholder="Name" className={inputClass} />
              <input type="text" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Lastname" className={inputClass} />
            </div>
            <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="Email" className={inputClass} />
            <textarea name="message" value={form.message} onChange={handleChange} required rows={6} placeholder="Message" className={`${inputClass} resize-none`} />
            <button type="submit" disabled={status === 'loading'} className="w-full bg-primary text-white py-3 rounded-full font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
              {status === 'loading' ? 'Sending...' : 'Submit'}
            </button>
            {status === 'success' && <p className="text-green-400 text-sm text-center pt-1">Message sent successfully!</p>}
            {status === 'error' && <p className="text-red-400 text-sm text-center pt-1">Something went wrong. Please try again.</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

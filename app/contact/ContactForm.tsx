'use client';

import React, { useState } from 'react';

type Status =
  | { state: 'idle' }
  | { state: 'submitting' }
  | { state: 'success'; message: string }
  | { state: 'error'; message: string };

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<Status>({ state: 'idle' });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();               // IMPORTANT: stop default navigation
    setStatus({ state: 'submitting' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      // Inspect response inside DevTools if needed
      const json = await res.json().catch(() => ({} as any));
      console.log('POST /api/contact ->', res.status, json);

      if (!res.ok || json.ok === false) {
        setStatus({
          state: 'error',
          message:
            (json && json.error) ||
            `Failed to send (status ${res.status}). Check server logs.`,
        });
        return;
      }

      setStatus({
        state: 'success',
        message:
          'Thanks! Your message has been sent. We will get back to you shortly.',
      });
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err: any) {
      console.error(err);
      setStatus({
        state: 'error',
        message:
          err?.message || 'Network error. Please check your connection.',
      });
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      {status.state === 'success' && (
        <div className="mb-6 rounded border border-green-300 bg-green-50 p-4 text-green-800">
          {status.message}
        </div>
      )}
      {status.state === 'error' && (
        <div className="mb-6 rounded border border-red-300 bg-red-50 p-4 text-red-800">
          {status.message}
        </div>
      )}

      <form onSubmit={onSubmit} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              autoComplete="name"
              required
              className="w-full rounded border px-3 py-2"
              value={form.name}
              onChange={onChange}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full rounded border px-3 py-2"
              value={form.email}
              onChange={onChange}
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              autoComplete="tel"
              className="w-full rounded border px-3 py-2"
              value={form.phone}
              onChange={onChange}
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="message"
              className="block text-sm font-medium mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="w-full rounded border px-3 py-2"
              value={form.message}
              onChange={onChange}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={status.state === 'submitting'}
          className="mt-6 rounded bg-blue-600 px-6 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {status.state === 'submitting' ? 'Sending…' : 'Send Message'}
        </button>
      </form>
    </section>
  );
}

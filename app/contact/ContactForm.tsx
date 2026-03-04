'use client';

import React, { useEffect, useRef, useState } from 'react';

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

  // Turnstile + spam traps
  const [tsToken, setTsToken] = useState('');
  const startedAtRef = useRef<number>(Date.now());

  // Optional: simple client-side error if Turnstile not completed
  const [turnstileError, setTurnstileError] = useState<string>('');

  const [status, setStatus] = useState<Status>({ state: 'idle' });

  // Load & render Turnstile
  useEffect(() => {
    startedAtRef.current = Date.now();

    // Load Turnstile script once
    if (!document.querySelector('script[data-turnstile="true"]')) {
      const s = document.createElement('script');
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      s.async = true;
      s.defer = true;
      s.setAttribute('data-turnstile', 'true');
      document.head.appendChild(s);
    }

    const render = () => {
      // @ts-ignore
      if (!window.turnstile) return false;

      const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
      if (!sitekey) {
        console.warn(
          'Missing NEXT_PUBLIC_TURNSTILE_SITE_KEY. Add it in Vercel env vars and redeploy.'
        );
        return false;
      }

      // Avoid rendering twice if React re-renders
      const host = document.getElementById('cf-turnstile');
      if (!host || host.getAttribute('data-rendered') === 'true') return true;

      // @ts-ignore
      window.turnstile.render('#cf-turnstile', {
        sitekey,
        callback: (token: string) => {
          setTsToken(token);
          setTurnstileError('');
        },
        'expired-callback': () => setTsToken(''),
        'error-callback': () => setTsToken(''),
      });

      host.setAttribute('data-rendered', 'true');
      return true;
    };

    const t = setInterval(() => {
      if (render()) clearInterval(t);
    }, 250);

    return () => clearInterval(t);
  }, []);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // IMPORTANT: stop default navigation
    setStatus({ state: 'submitting' });

    // Require Turnstile token before submit
    if (!tsToken) {
      setStatus({ state: 'idle' });
      setTurnstileError('Please verify you are human before sending.');
      return;
    }

    // Honeypot + time trap values
    const company =
      (e.currentTarget.elements.namedItem('company') as HTMLInputElement | null)
        ?.value || '';
    const startedAt =
      (e.currentTarget.elements.namedItem('startedAt') as HTMLInputElement | null)
        ?.value || '';

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          turnstileToken: tsToken,
          company, // honeypot
          startedAt, // time trap timestamp
        }),
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

      // Clear Turnstile token so user must re-verify for a new submission
      setTsToken('');
    } catch (err: any) {
      console.error(err);
      setStatus({
        state: 'error',
        message: err?.message || 'Network error. Please check your connection.',
      });
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      {/* Alerts */}
      {status.state === 'success' && (
        <div className="mb-6 rounded-lg border border-green-300 bg-green-50 p-4 text-green-900 shadow-sm">
          {status.message}
        </div>
      )}
      {status.state === 'error' && (
        <div className="mb-6 rounded-lg border border-red-300 bg-red-50 p-4 text-red-900 shadow-sm">
          {status.message}
        </div>
      )}

      {/* Form Card */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-md">
        <div className="border-b border-gray-200 px-6 py-5">
          <h2 className="text-xl font-semibold text-gray-900">
            Send us a message
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            We typically respond during office hours. If this is urgent, call{' '}
            <a
              href="tel:+15703626150"
              className="font-medium text-gray-900 underline decoration-gray-300 hover:decoration-gray-500"
            >
              (570) 362-6150
            </a>
            .
          </p>
        </div>

        <form onSubmit={onSubmit} noValidate className="px-6 py-6">
          {/* Honeypot (bots fill this; humans won’t) */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          {/* Time-on-page (bots submit instantly) */}
          <input type="hidden" name="startedAt" value={startedAtRef.current} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-900 mb-1"
              >
                Name <span className="text-red-600">*</span>
              </label>
              <input
                id="name"
                name="name"
                autoComplete="name"
                required
                className="w-full rounded-lg border border-gray-400 bg-white px-3 py-2 text-gray-900 shadow-sm
                           placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600/30 focus:border-red-600"
                placeholder="Your full name"
                value={form.name}
                onChange={onChange}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-900 mb-1"
              >
                Email <span className="text-red-600">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full rounded-lg border border-gray-400 bg-white px-3 py-2 text-gray-900 shadow-sm
                           placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600/30 focus:border-red-600"
                placeholder="you@example.com"
                value={form.email}
                onChange={onChange}
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-gray-900 mb-1"
              >
                Phone{' '}
                <span className="text-gray-400 font-medium">(optional)</span>
              </label>
              <input
                id="phone"
                name="phone"
                autoComplete="tel"
                className="w-full rounded-lg border border-gray-400 bg-white px-3 py-2 text-gray-900 shadow-sm
                           placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600/30 focus:border-red-600"
                placeholder="(570) 555-1234"
                value={form.phone}
                onChange={onChange}
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-gray-900 mb-1"
              >
                Message <span className="text-red-600">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                className="w-full rounded-lg border border-gray-400 bg-white px-3 py-2 text-gray-900 shadow-sm
                           placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600/30 focus:border-red-600"
                placeholder="How can we help?"
                value={form.message}
                onChange={onChange}
              />
              <p className="mt-2 text-xs text-gray-500">
                Please don’t include sensitive personal info (SSN, bank info,
                etc.).
              </p>
            </div>
          </div>

          {/* Turnstile */}
          <div className="mt-6">
            <div id="cf-turnstile" />
            {turnstileError && (
              <p className="mt-2 text-sm text-red-700">{turnstileError}</p>
            )}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <button
              type="submit"
              disabled={status.state === 'submitting' || !tsToken}
              className="inline-flex items-center justify-center rounded-lg bg-red-600 px-6 py-2.5 font-semibold text-white
                         shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600/30
                         disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status.state === 'submitting' ? 'Sending…' : 'Send Message'}
            </button>

            <p className="text-sm text-gray-600">
              Prefer email?{' '}
              <a
                href="mailto:office@hughestownstorage.com"
                className="font-medium text-gray-900 underline decoration-gray-300 hover:decoration-gray-500"
              >
                office@hughestownstorage.com
              </a>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
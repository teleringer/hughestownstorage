'use client';

import React, { useState } from 'react';

type Status =
  | { state: 'idle' }
  | { state: 'submitting' }
  | { state: 'success'; message: string }
  | { state: 'error'; message: string };

export default function BookingSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    startTime: '',
    endTime: '',
    attendees: '',
    purpose: '',
    message: '',
  });

  const [status, setStatus] = useState<Status>({ state: 'idle' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ state: 'submitting' });
console.log("SUBMIT CLICKED", formData);
    try {
      const res = await fetch('/api/conference-room-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = await res.json().catch(() => ({} as any));
      console.log('POST /api/conference-room-booking ->', res.status, json);

      if (!res.ok || json.ok === false) {
        setStatus({
          state: 'error',
          message:
            (json && json.error) ||
            `Failed to send (status ${res.status}). Please try again.`,
        });
        return;
      }

      setStatus({
        state: 'success',
        message:
          'Thanks! Your booking request has been sent. We will follow up to confirm availability.',
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        startTime: '',
        endTime: '',
        attendees: '',
        purpose: '',
        message: '',
      });
    } catch (err: any) {
      console.error(err);
      setStatus({
        state: 'error',
        message: err?.message || 'Network error. Please try again.',
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="book" className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Book Your Meeting
          </h2>
          <p className="text-lg text-gray-600">
            Fill out the form below to reserve our conference room
          </p>
        </div>

        {/* Status Messages */}
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

        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Time
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Time
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Attendees
                </label>
                <input
                  type="number"
                  name="attendees"
                  value={formData.attendees}
                  onChange={handleChange}
                  min="1"
                  max="12"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Purpose of Meeting
              </label>
              <select
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                className="w-full px-4 py-3 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select purpose</option>
                <option value="business-meeting">Business Meeting</option>
                <option value="training">Training Session</option>
                <option value="presentation">Client Presentation</option>
                <option value="interview">Job Interview</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Requirements
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Any special requests or requirements..."
                maxLength={500}
              />
              <p className="text-sm text-gray-500 mt-1">
                Maximum 500 characters
              </p>
            </div>

            <div className="text-center">
              <button
  type="submit"
  onClick={(e) => e.stopPropagation()}
  disabled={status.state === 'submitting'}
  className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 disabled:opacity-60"
>
                {status.state === 'submitting'
                  ? 'Sending…'
                  : 'Submit Booking Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

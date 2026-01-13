"use client";

import React, { useState } from "react";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interests: string[]; // <-- explicitly typed
  message: string;
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    interests: [],
    message: "",
  });

  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      interests: checked
        ? [...prev.interests, value]
        : prev.interests.filter((v) => v !== value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire to email/Supabase later. For now, just simulate success.
    setSent(true);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>

      {sent ? (
        <div className="rounded-md border border-green-300 bg-green-50 p-4">
          <p className="font-medium">Thanks! Your message has been sent.</p>
          <p className="text-sm text-gray-600">
            We’ll get back to you as soon as possible.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">First name</label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full rounded border px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last name</label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full rounded border px-3 py-2"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded border px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded border px-3 py-2"
              />
            </div>
          </div>

          <fieldset className="border rounded p-3">
            <legend className="text-sm font-medium px-1">Interest</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {["5x5", "5x10", "10x10", "10x20"].map((size) => (
                <label key={size} className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={size}
                    checked={formData.interests.includes(size)}
                    onChange={handleCheckboxChange}
                  />
                  <span>{size} unit</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full rounded border px-3 py-2"
              placeholder="How can we help?"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded bg-black px-4 py-2 text-white"
          >
            Send
          </button>
        </form>
      )}
    </div>
  );
}

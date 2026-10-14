import React, { useState } from 'react';
import { validateContactForm } from '../../utils/validators.js';
import { apiService } from '../../services/apiService.js';
import { Icon } from '../common/Icon.jsx';

export function ContactScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Book Suggestion',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateContactForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      await apiService.sendContactMessage(formData);
    } catch {
      // simulated fallback
    }

    setLoading(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: 'Book Suggestion',
      message: ''
    });
    setSubmitted(false);
  };

  return (
    <div className="w-full pb-20">
      {/* Header */}
      <div className="w-full bg-gradient-to-b from-blue-50/50 via-slate-50 to-transparent dark:from-slate-900/60 dark:via-slate-950 dark:to-transparent py-10 border-b border-slate-200 dark:border-slate-800">
        <div className="bb-container space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Icon name="mail" className="text-[16px]" />
            <span>Archival Desk Dispatch</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">
            Contact Us & Reader Feedback
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
            Have a recommendation for our world literature catalog, a translation inquiry, or technical feedback? Our archival curation team welcomes your correspondence.
          </p>
        </div>
      </div>

      <div className="bb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-5xl mx-auto">
          {/* Left Column: Contact Information Panel (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bb-card p-6 bg-white dark:bg-slate-900 rounded-2xl space-y-4">
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-slate-100">
                Archival Headquarters
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                BookBridge operations are coordinated virtually in association with educational research initiatives.
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center shrink-0">
                    <Icon name="location_on" className="text-[18px]" />
                  </div>
                  <div>
                    <strong className="text-slate-800 dark:text-slate-200 block">Location</strong>
                    <span className="text-slate-500">70 Nguyen Hue Boulevard, District 1, Ho Chi Minh City</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center shrink-0">
                    <Icon name="mail" className="text-[18px]" />
                  </div>
                  <div>
                    <strong className="text-slate-800 dark:text-slate-200 block">Archival Desk</strong>
                    <span className="text-slate-500">curation@bookbridge.local</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center shrink-0">
                    <Icon name="schedule" className="text-[18px]" />
                  </div>
                  <div>
                    <strong className="text-slate-800 dark:text-slate-200 block">Reading Hours</strong>
                    <span className="text-slate-500">Monday — Saturday: 08:30 – 18:00 (GMT+7)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Note Card */}
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-xs text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/60">
              <span className="font-bold text-amber-600 block mb-1">
                ℹ️ Aptech eProject Demonstration Notice:
              </span>
              Form submissions are processed through client-side validation logic with mock persistence. No actual external emails will be dispatched to external servers.
            </div>
          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bb-card p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
              {submitted ? (
                /* Demonstration Confirmation State */
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center mx-auto">
                    <Icon name="check_circle" className="text-[36px]" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-slate-100">
                    Message Validated & Logged!
                  </h3>
                  <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-200 text-xs leading-relaxed max-w-md mx-auto border border-emerald-200 dark:border-emerald-800">
                    <strong>Demonstration Notice:</strong> Thank you, <strong>{formData.name}</strong>! Your correspondence has been simulated and validated successfully according to all validation rules. (Note: This is a frontend demonstration; no email has been dispatched).
                  </div>
                  <button
                    onClick={handleReset}
                    className="btn btn-primary text-xs py-2.5 px-6"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                /* Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Nguyễn Văn An"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
                        errors.name ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-rose-500 font-medium">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. reader@example.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
                        errors.email ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-500 font-medium">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                      Inquiry Topic / Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    >
                      <option value="Book Suggestion">Recommendation for Book Addition</option>
                      <option value="Translation Inquiry">Translation & Language Context</option>
                      <option value="Bug Report">Technical Bug / UI Defect</option>
                      <option value="Academic Partnership">Academic & Research Partnership</option>
                      <option value="Other">General Feedback</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                      Message * (Min 10 characters)
                    </label>
                    <textarea
                      rows="4"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please share your thoughts, book titles, or questions in detail..."
                      className={`w-full p-3.5 rounded-xl border text-xs text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
                        errors.message ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-[11px] text-rose-500 font-medium">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn btn-primary py-3 rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2"
                  >
                    <Icon name="send" className="text-[18px]" />
                    <span>{loading ? 'Validating...' : 'Send Message'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactScreen;

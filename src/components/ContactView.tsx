import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Mail, Phone, MessageSquare, Send, CheckCircle, Compass } from 'lucide-react';

export default function ContactView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
    }, 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 text-left bg-stone-50 text-stone-900 font-sans">
      
      {/* Editorial Header */}
      <div className="border-b border-stone-200 pb-8 mb-10">
        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800">CONNECT WITH LMOND</span>
        <h1 className="text-4xl font-light tracking-tight text-stone-900 font-sans mt-1">Professional Concierge</h1>
        <p className="text-sm text-stone-500 mt-2 font-sans font-light max-w-xl leading-relaxed">
          Reach out to our chemical laboratories or esthetician centers for personalized ingredient consultations, wholesale inquiries, or boutique appointments.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left: Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-6">
          <h2 className="text-xl font-light text-stone-900 font-sans">Enquire Online</h2>
          <p className="text-xs text-stone-500 font-sans font-light leading-relaxed">Fill out the clinical brief below. An expert scientific consultant will respond within 24 standard hours.</p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 text-xs">
                  <label className="font-semibold text-stone-600">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alexis Cole"
                    className="w-full rounded-xl border border-stone-300 p-2.5 outline-none focus:border-stone-900 bg-stone-50"
                  />
                </div>
                <div className="space-y-1 text-xs">
                  <label className="font-semibold text-stone-600">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. alexis@example.com"
                    className="w-full rounded-xl border border-stone-300 p-2.5 outline-none focus:border-stone-900 bg-stone-50"
                  />
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <label className="font-semibold text-stone-600">Brief Consultation Query</label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask about specific active compound layering, epidermal barrier repairs, or delivery trackers..."
                  className="w-full rounded-xl border border-stone-300 p-2.5 outline-none focus:border-stone-900 bg-stone-50"
                />
              </div>

              <button
                type="submit"
                className="w-full h-11 flex items-center justify-center gap-1.5 rounded-full bg-stone-950 text-stone-100 hover:bg-stone-850 text-xs font-semibold uppercase tracking-widest cursor-pointer"
              >
                <Send className="h-4 w-4" />
                <span>Transmit Brief</span>
              </button>
            </form>
          ) : (
            <div className="py-12 text-center space-y-4 text-xs bg-stone-50 rounded-2xl border border-dashed border-stone-200">
              <CheckCircle className="h-8 w-8 text-emerald-700 mx-auto" />
              <div className="space-y-1">
                <p className="font-bold text-stone-900">Brief Successfully Transmitted</p>
                <p className="text-stone-500 font-light">Thank you. An LMOND esthetician will review your skin goals shortly.</p>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="text-amber-800 font-bold underline"
              >
                Submit another query
              </button>
            </div>
          )}
        </div>

        {/* Right: Channels & Location Map */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Boutique Contact list */}
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-stone-400">Customer Support Channels</h3>
            
            <div className="space-y-3.5 text-xs">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center">
                  <Mail className="h-4 w-4 text-stone-700" />
                </div>
                <div>
                  <p className="font-semibold text-stone-900">Email Hub</p>
                  <p className="text-stone-500">concierge@lmond.com</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center">
                  <Phone className="h-4 w-4 text-stone-700" />
                </div>
                <div>
                  <p className="font-semibold text-stone-900">Boutique Tel</p>
                  <p className="text-stone-500">+66 2 489 1200</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 text-stone-700" />
                </div>
                <div>
                  <p className="font-semibold text-stone-900">Social Messenger Hub</p>
                  <p className="text-stone-500">Line ID: @LMOND_Skincare | IG: @lmond_beauty</p>
                </div>
              </div>
            </div>
          </div>

          {/* Location Map Stage */}
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm space-y-4 text-left">
            <div className="flex items-center gap-1.5 text-stone-900">
              <MapPin className="h-4 w-4 text-amber-700" />
              <h3 className="text-xs font-bold uppercase tracking-widest">LMOND Flagship Boutique</h3>
            </div>
            <p className="text-xs text-stone-500 font-sans font-light">99 Sukhumvit Road, Phrom Phong, Bangkok 10110, Thailand</p>

            {/* Stylized Minimal map canvas block */}
            <div className="h-40 rounded-2xl bg-stone-100 border border-stone-200/50 overflow-hidden relative flex items-center justify-center">
              {/* Abstract visual representations of maps */}
              <div className="absolute inset-0 bg-radial-gradient">
                <div className="absolute top-4 left-1/3 h-0.5 w-full bg-white rotate-12" />
                <div className="absolute top-12 left-0 h-0.5 w-full bg-white -rotate-12" />
                <div className="absolute top-0 left-16 h-full w-0.5 bg-white" />
                <div className="absolute top-0 left-48 h-full w-0.5 bg-white" />
                {/* Pin element */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="h-8 w-8 rounded-full bg-stone-950 text-white flex items-center justify-center border-2 border-white shadow-lg animate-pulse">
                    <Compass className="h-4 w-4 text-amber-400" />
                  </div>
                  <span className="text-[9px] bg-stone-950 text-white px-2 py-0.5 rounded shadow mt-1 uppercase font-bold tracking-wider">LMOND</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

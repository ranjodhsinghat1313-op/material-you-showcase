import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { TonalRoleSet, ThemeMode } from '../types';

interface NewsletterSectionProps {
  roles: TonalRoleSet;
  themeMode?: ThemeMode;
  onShowSnackbar: (msg: string) => void;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({
  roles,
  themeMode = 'light',
  onShowSnackbar,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      onShowSnackbar('Please provide a valid email address');
      return;
    }
    setSubscribed(true);
    onShowSnackbar(`Subscribed ${email} to Material You updates!`);
  };

  return (
    <section className="py-14 sm:py-20 md:py-24 px-4 md:px-8 mb-8 sm:mb-12">
      <div
        className="max-w-4xl mx-auto rounded-[28px] sm:rounded-[36px] md:rounded-[48px] p-6 sm:p-10 md:p-16 text-center relative overflow-hidden border shadow-xl transition-all"
        style={{
          backgroundColor: roles.surfaceContainerLow,
          borderColor: `${roles.outline}25`,
        }}
      >
        {/* Atmospheric Blur Shape inside card */}
        <div
          className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full blur-3xl pointer-events-none -z-0"
          style={{
            backgroundColor: roles.primary,
            opacity: 0.15,
          }}
        />
        <div
          className="absolute -top-20 -left-20 w-64 h-64 rounded-full blur-3xl pointer-events-none -z-0"
          style={{
            backgroundColor: roles.tertiary,
            opacity: 0.12,
          }}
        />

        <div className="relative z-10 max-w-xl mx-auto">
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
            style={{
              backgroundColor: roles.tertiaryContainer,
              color: roles.onTertiaryContainer,
            }}
          >
            <Mail className="w-3.5 h-3.5" />
            MD3 Input Pattern
          </div>

          <h2 className="text-2.5xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 sm:mb-4" style={{ color: roles.onSurface }}>
            Stay in the loop
          </h2>
          <p className="text-sm md:text-base mb-6 sm:mb-8 leading-relaxed" style={{ color: roles.onSurfaceVariant }}>
            Get the latest Material Design 3 specifications, token mappings, and component updates delivered straight to your inbox.
          </p>

          {subscribed ? (
            <div
              className="p-5 sm:p-6 rounded-3xl border flex items-center justify-center gap-3 animate-in fade-in"
              style={{
                backgroundColor: roles.surfaceContainer,
                borderColor: `${roles.outline}30`,
                color: roles.onSurface,
              }}
            >
              <CheckCircle2 className="w-6 h-6 flex-shrink-0" style={{ color: roles.primary }} />
              <div className="text-left">
                <div className="font-bold text-sm">You are subscribed!</div>
                <div className="text-xs opacity-80">We sent a welcome token package to {email}.</div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto">
              <div className="relative group text-left">
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=" "
                  required
                  className="w-full h-15 sm:h-16 px-5 sm:px-6 pt-5 pb-1 rounded-t-xl text-base sm:text-sm font-medium border-b-2 outline-none transition-colors peer"
                  style={{
                    backgroundColor: roles.surfaceContainer,
                    borderColor: roles.outline,
                    color: roles.onSurface,
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = roles.primary;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = roles.outline;
                  }}
                />
                <label
                  htmlFor="newsletter-email"
                  className="absolute left-6 top-2 text-xs font-medium transition-all pointer-events-none peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs"
                  style={{
                    color: roles.primary,
                  }}
                >
                  Email Address
                </label>
              </div>

              <button
                type="submit"
                className="h-14 rounded-full font-medium text-sm md-tap flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all md-state-layer"
                style={{
                  backgroundColor: roles.tertiary,
                  color: roles.onTertiary,
                }}
              >
                <Mail className="w-4 h-4" />
                <span>Subscribe to Design Dispatch</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

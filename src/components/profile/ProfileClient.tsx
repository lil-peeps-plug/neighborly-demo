"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { User } from "@/lib/data";
import { MOCK_LISTINGS, WISHLIST_TAGS } from "@/lib/data";
import { ListingCard } from "@/components/listings/ListingCard";
import { AvatarFill } from "@/components/ui/Avatar";
import { cn } from "@/lib/utils";

export function ProfileClient({ user }: { user: User }) {
  const listings = MOCK_LISTINGS.filter((l) => l.owner.id === user.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand/15 via-surface to-surface p-8 shadow-glass-lg ring-1 ring-black/[0.05] dark:from-brand/25 dark:via-slate-950 dark:to-slate-950 dark:ring-white/10 sm:p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-3xl text-3xl ring-4 ring-white/80 shadow-xl dark:ring-slate-800">
              <AvatarFill name={user.name} src={user.avatar || undefined} sizes="112px" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">{user.name}</h1>
                {user.verified && (
                  <span className="rounded-full bg-brand px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white">
                    Verified
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-ink-muted">{user.neighborhood} · Neighborly member</p>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">{user.bio}</p>
              {user.bioTranslation && (
                <TranslatedBio translation={user.bioTranslation} sourceLanguage={user.bioLanguage} />
              )}
            </div>
          </div>

          <div className="grid w-full max-w-md grid-cols-2 gap-3 sm:grid-cols-3 lg:w-auto">
            <TrustTile label="Trust score" value={user.rating.toFixed(2)} hint="Rolling 90 days" />
            <TrustTile label="Exchanges" value={String(user.exchanges)} hint="Completed nearby" />
            <TrustTile
              label="Response"
              value="Fast"
              hint="Median under 1h"
              className="col-span-2 sm:col-span-1"
            />
          </div>
        </div>
      </div>

      <section className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div>
          <h2 className="font-display text-lg font-semibold text-ink">Active on Neighborly</h2>
          <p className="mt-1 text-sm text-ink-muted">Listings from this neighbor (demo data).</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {listings.length === 0 ? (
              <p className="text-sm text-ink-muted">No live listings right now.</p>
            ) : (
              listings.map((l, i) => <ListingCard key={l.id} listing={l} index={i} />)
            )}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-black/[0.06] bg-white/60 p-5 dark:border-white/10 dark:bg-slate-900/50">
            <h3 className="text-sm font-semibold text-ink">Community standards</h3>
            <ul className="mt-3 space-y-2 text-xs text-ink-muted">
              <li className="flex gap-2">
                <span className="text-brand">●</span> Public meetups by default
              </li>
              <li className="flex gap-2">
                <span className="text-brand">●</span> Accurate item condition
              </li>
              <li className="flex gap-2">
                <span className="text-brand">●</span> Respectful cancellations
              </li>
            </ul>
            <Link href="/safety" className="mt-4 inline-block text-xs font-semibold text-brand hover:underline">
              Read Neighborly safety center
            </Link>
          </div>

          <div className="rounded-2xl border border-black/[0.06] bg-gradient-to-b from-brand/10 to-transparent p-5 dark:border-white/10">
            <h3 className="text-sm font-semibold text-ink">Looking for</h3>
            <p className="mt-1 text-xs text-ink-muted">Saved interests help neighbors ping you first.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {WISHLIST_TAGS.slice(0, 5).map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-ink shadow-sm dark:bg-slate-800/90 dark:text-slate-100"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-lg font-semibold text-ink">Reviews</h2>
        <p className="mt-1 text-sm text-ink-muted">What neighbors said after exchanges.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {user.reviews.length === 0 ? (
            <p className="text-sm text-ink-muted">No public reviews yet — be the first exchange.</p>
          ) : (
            user.reviews.map((r, i) => (
              <motion.figure
                key={r.id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass glass-border rounded-2xl p-5"
              >
                <div className="flex items-center justify-between gap-2">
                  <figcaption className="text-sm font-semibold text-ink">{r.author}</figcaption>
                  <span className="text-xs font-medium text-brand">{r.rating.toFixed(1)} ★</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">&ldquo;{r.text}&rdquo;</p>
                <p className="mt-3 text-[11px] text-ink-muted/80">{r.date}</p>
              </motion.figure>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

function TranslatedBio({
  translation,
  sourceLanguage,
}: {
  translation: string;
  sourceLanguage?: string;
}) {
  return (
    <div className="mt-3 max-w-xl rounded-xl border border-black/[0.06] bg-white/70 p-3 dark:border-white/10 dark:bg-slate-900/50">
      <div className="flex items-center gap-2 text-[11px] font-medium text-ink-muted">
        <GoogleTranslateMark />
        <span>
          Translated{sourceLanguage ? ` from ${sourceLanguage}` : ""} by{" "}
          <span className="font-semibold text-ink">Google</span>
        </span>
      </div>
      <p className="mt-2 text-sm italic leading-relaxed text-ink-muted">{translation}</p>
    </div>
  );
}

function GoogleTranslateMark() {
  // Google's brand colours so the chip reads as the familiar Translate widget at a glance.
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden className="shrink-0">
      <path d="M12 2 L21 7 V17 L12 22 L3 17 V7 Z" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0" />
      <path d="M3 12a9 9 0 0 1 17.3-3.5l-2.6 1A6 6 0 1 0 18 14h-6v-2.8h9.4A9 9 0 1 1 3 12z" fill="#4285F4" />
      <circle cx="6.5" cy="7" r="1.4" fill="#EA4335" />
      <circle cx="17" cy="6" r="1.2" fill="#FBBC05" />
      <circle cx="17.6" cy="17.5" r="1.2" fill="#34A853" />
    </svg>
  );
}

function TrustTile({
  label,
  value,
  hint,
  className,
}: {
  label: string;
  value: string;
  hint: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/50 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/70",
        className,
      )}
    >
      <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-muted">{label}</p>
      <p className="mt-1 font-display text-2xl font-semibold text-ink">{value}</p>
      <p className="mt-1 text-[11px] text-ink-muted">{hint}</p>
    </div>
  );
}

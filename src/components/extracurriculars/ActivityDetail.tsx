"use client";

import type { Extracurricular } from "@/lib/constants";

const TEXT_TERTIARY = "color-mix(in srgb, var(--text-secondary) 70%, transparent)";

/**
 * Full activity detail rendered inside the enlarged lightbox. Mirrors the
 * card's visual language (accent icon + roles) so the shared-layout enlarge
 * reads as the same element growing, then reveals the full description + stats.
 */
export default function ActivityDetail({ activity }: { activity: Extracurricular }) {
  return (
    <div className="flex flex-col gap-6 px-6 py-8 sm:px-10 sm:py-10">
      {/* Header — icon + name + date */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        {/* Boolean() wrapping keeps the fallback typed (not narrowed to
            `never`) even now that every entry happens to have an image, so a
            future image-less entry still degrades gracefully. */}
        <div
          className="flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl"
          style={{
            backgroundColor: Boolean(activity.imagePath) ? "#ffffff" : activity.accentColor,
            border: Boolean(activity.imagePath) ? "1px solid var(--border)" : undefined,
          }}
          aria-hidden="true"
        >
          {Boolean(activity.imagePath) ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={activity.imagePath}
              alt=""
              className="h-full w-full object-contain select-none"
              style={{ padding: "10px" }}
              draggable={false}
            />
          ) : (
            <span className="select-none text-3xl font-semibold text-white">
              {activity.monogram}
            </span>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <h2
            className="font-semibold leading-tight text-[var(--text-primary)]"
            style={{ fontSize: "clamp(24px, 3.4vw, 36px)" }}
          >
            {activity.name}
          </h2>
          <span className="text-[13px] leading-none" style={{ color: TEXT_TERTIARY }}>
            {activity.dateRange} · {activity.category}
          </span>

          <div className="mt-1 flex flex-wrap gap-2">
            {activity.roles.map((role) => (
              <span
                key={role}
                className="rounded-full px-3 py-1 text-[12px] font-medium leading-none"
                style={{
                  backgroundColor: `${activity.accentColor}18`,
                  color: activity.accentColor,
                }}
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div
        className="h-[2px] w-16 rounded-full"
        style={{ backgroundColor: `${activity.accentColor}99` }}
        aria-hidden="true"
      />

      <p
        className="font-normal text-[var(--text-secondary)]"
        style={{ fontSize: "clamp(15px, 1.6vw, 18px)", lineHeight: 1.7 }}
      >
        {activity.fullDescription}
      </p>

      {/* Stats */}
      {activity.stats.length > 0 && (
        <div className="flex flex-wrap gap-x-10 gap-y-4 border-t pt-6" style={{ borderColor: "var(--border)" }}>
          {activity.stats.map((stat) => (
            <div key={`${stat.value}-${stat.label}`} className="flex flex-col gap-1">
              <span
                className="font-semibold leading-none"
                style={{ fontSize: "clamp(22px, 3vw, 30px)", color: activity.accentColor }}
              >
                {stat.value}
              </span>
              <span className="text-[13px] leading-snug" style={{ color: TEXT_TERTIARY }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

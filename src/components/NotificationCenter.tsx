"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { useMemo, useState } from "react";
import { useScout } from "@/context/ScoutContext";

export function NotificationCenter() {
  const [open, setOpen] = useState(false);
  const { notifications, markNotificationRead, markAllNotificationsRead } = useScout();
  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.readAt).length,
    [notifications]
  );
  const recent = [...notifications].slice(-8).reverse();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-fk-navy/10 text-fk-navy/70 hover:border-fk-primary/30 hover:text-fk-navy"
        aria-label="Notificaties"
      >
        <Bell size={17} />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 inline-flex min-w-4 items-center justify-center rounded-full bg-fk-primary px-1 text-[10px] font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-[80] mt-2 w-[320px] rounded-2xl border border-fk-primary/12 bg-fk-white p-3 shadow-xl">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-bold text-fk-navy">Notificaties</p>
            {recent.length > 0 && (
              <button
                type="button"
                onClick={markAllNotificationsRead}
                className="text-xs font-semibold text-fk-primary"
              >
                Alles gelezen
              </button>
            )}
          </div>
          {recent.length === 0 ? (
            <p className="rounded-xl bg-fk-light/40 px-3 py-2 text-sm text-fk-navy/60">
              Nog geen notificaties.
            </p>
          ) : (
            <div className="space-y-2">
              {recent.map((item) => {
                const content = (
                  <div
                    className={`rounded-xl border px-3 py-2 text-left ${
                      item.readAt
                        ? "border-fk-primary/10"
                        : "border-fk-primary/30 bg-fk-primary-muted/20"
                    }`}
                  >
                    <p className="text-sm font-semibold text-fk-navy">{item.title}</p>
                    <p className="mt-0.5 text-xs text-fk-navy/65">{item.message}</p>
                  </div>
                );

                if (item.link) {
                  return (
                    <Link
                      key={item.id}
                      href={item.link}
                      onClick={() => {
                        markNotificationRead(item.id);
                        setOpen(false);
                      }}
                    >
                      {content}
                    </Link>
                  );
                }
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => markNotificationRead(item.id)}
                    className="w-full"
                  >
                    {content}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

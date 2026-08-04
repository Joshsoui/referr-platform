"use client";

import {
  Banknote,
  Bell,
  CheckCircle2,
  Eye,
  MapPin,
  PartyPopper,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useScout } from "@/context/ScoutContext";
import { useMounted } from "@/hooks/useMounted";
import type { NotificationKind } from "@/types/notifications";

const KIND_CONFIG: Record<
  NotificationKind,
  { icon: LucideIcon; accent: string }
> = {
  submitted: { icon: Bell, accent: "text-fk-primary" },
  viewed: { icon: Eye, accent: "text-fk-secondary" },
  progress: { icon: CheckCircle2, accent: "text-fk-primary" },
  nearby: { icon: MapPin, accent: "text-fk-primary" },
  celebration: { icon: PartyPopper, accent: "text-amber-500" },
  reward: { icon: Banknote, accent: "text-emerald-500" },
  rejected: { icon: XCircle, accent: "text-amber-600" },
};

export function NotificationToast() {
  const mounted = useMounted();
  const { notifications } = useScout();
  const [visible, setVisible] = useState<typeof notifications>([]);

  useEffect(() => {
    if (notifications.length === 0) return;
    const latest = notifications[notifications.length - 1];
    setVisible((prev) => [...prev, latest]);

    const timer = setTimeout(() => {
      setVisible((prev) => prev.filter((n) => n.id !== latest.id));
    }, 4500);

    return () => clearTimeout(timer);
  }, [notifications]);

  if (!mounted || visible.length === 0) return null;

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[100] flex max-w-sm flex-col items-end gap-2">
      {visible.map((notification, i) => {
        const { icon: Icon, accent } = KIND_CONFIG[notification.kind];

        return (
          <div
            key={notification.id}
            className="w-full rounded-2xl border border-fk-primary/15 bg-fk-white px-4 py-3 shadow-xl"
            style={{
              animation:
                "slide-in-right 0.4s cubic-bezier(0.22,1,0.36,1) both, xp-float-up 4.5s ease-out forwards",
              animationDelay: `${i * 80}ms, ${i * 80}ms`,
            }}
          >
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-fk-primary-muted">
                <Icon size={18} className={accent} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-fk-navy">
                  {notification.title}
                </p>
                <p className="mt-0.5 text-sm leading-snug text-fk-navy/70">
                  {notification.message}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

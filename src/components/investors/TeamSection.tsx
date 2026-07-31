"use client";

import Link from "next/link";
import { Linkedin, User } from "lucide-react";
import { TEAM_MEMBERS } from "@/lib/investors/investorsData";
import {
  InvestorHeadline,
  InvestorSectionShell,
} from "./InvestorSectionShell";
import { Reveal } from "@/components/landing/Reveal";

export function TeamSection() {
  return (
    <InvestorSectionShell id="team" label="Team">
      <InvestorHeadline>
        Gebouwd vanuit
        <br />
        <span className="brand-wordmark">de recruitmentpraktijk.</span>
      </InvestorHeadline>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {TEAM_MEMBERS.map((member, index) => (
          <Reveal key={member.id} delay={index * 80}>
            <div className="rounded-2xl border border-fk-primary/10 bg-gradient-to-br from-fk-white to-fk-primary-muted/20 p-5">
              <div className="flex gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-fk-navy/10 bg-fk-light text-fk-navy/30">
                  {member.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={member.photo}
                      alt=""
                      className="h-full w-full rounded-2xl object-cover"
                    />
                  ) : (
                    <User size={24} aria-hidden />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-fk-navy">{member.name}</p>
                  <p className="text-sm font-semibold text-fk-primary">
                    {member.role}
                  </p>
                  <p className="mt-0.5 text-xs text-fk-navy/45">
                    {member.expertise}
                  </p>
                </div>
                {member.linkedIn ? (
                  <Link
                    href={member.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-fk-navy/35 hover:text-fk-primary"
                    aria-label={`LinkedIn profiel van ${member.name}`}
                  >
                    <Linkedin size={18} />
                  </Link>
                ) : null}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </InvestorSectionShell>
  );
}

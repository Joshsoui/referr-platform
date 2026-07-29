"use client";

import Link from "next/link";
import { Linkedin, User } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { TEAM_MEMBERS } from "@/lib/investors/investorsData";
import {
  InvestorHeadline,
  InvestorSectionShell,
  InvestorSubtext,
} from "./InvestorSectionShell";
import { Reveal } from "@/components/landing/Reveal";

export function TeamSection() {
  return (
    <InvestorSectionShell id="team" label="Team">
      <InvestorHeadline>
        Gebouwd vanuit
        <br />
        de recruitmentpraktijk.
      </InvestorHeadline>
      <InvestorSubtext>
        Referr ontstaat niet vanuit een theoretisch softwareconcept. Het wordt
        gebouwd vanuit dagelijkse ervaring met recruitment, campagnes, kandidaten,
        klanten en plaatsingen.
      </InvestorSubtext>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {TEAM_MEMBERS.map((member, index) => (
          <Reveal key={member.id} delay={index * 90}>
            <Card hover className="border-fk-primary/10">
              <div className="flex gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-fk-navy/10 bg-fk-light text-fk-navy/30">
                  {member.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={member.photo}
                      alt=""
                      className="h-full w-full rounded-2xl object-cover"
                    />
                  ) : (
                    <User size={28} aria-hidden />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-fk-navy">{member.name}</p>
                  <p className="text-sm font-semibold text-fk-primary">
                    {member.role}
                  </p>
                  <p className="mt-1 text-xs text-fk-navy/50">{member.expertise}</p>
                </div>
                {member.linkedIn ? (
                  <Link
                    href={member.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-fk-navy/40 hover:text-fk-primary"
                    aria-label={`LinkedIn profiel van ${member.name}`}
                  >
                    <Linkedin size={18} />
                  </Link>
                ) : null}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-fk-navy/60">
                {member.bio}
              </p>
            </Card>
          </Reveal>
        ))}
      </div>
    </InvestorSectionShell>
  );
}

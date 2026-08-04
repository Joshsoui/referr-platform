import { ImageResponse } from "next/og";
import { findVacancyById } from "@/lib/vacancyStore";
import { getDifficultyRewards } from "@/lib/vacancyRewards";
import { formatCurrency } from "@/lib/xp";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vacancy = await findVacancyById(id);

  const title = vacancy?.title ?? "Challenge";
  const location = vacancy?.location ?? "Nederland";
  const reward = vacancy
    ? formatCurrency(getDifficultyRewards(vacancy.difficulty).total)
    : formatCurrency(0);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px",
          background:
            "linear-gradient(135deg, #fff8f8 0%, #ffffff 40%, #fff1f2 100%)",
          color: "#0f172a",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#f43f5e",
            }}
          >
            referr
          </div>
          <div
            style={{
              fontSize: 54,
              fontWeight: 800,
              lineHeight: 1.1,
              maxWidth: "90%",
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 30, opacity: 0.8 }}>{location}</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              background: "#ffffff",
              border: "2px solid #fecdd3",
              borderRadius: 16,
              padding: "14px 20px",
            }}
          >
            Reward: {reward}
          </div>
          <div style={{ fontSize: 24, opacity: 0.8 }}>
            Tip iemand via referr
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}


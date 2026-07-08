import { LiturgyDayResponse, LiturgyCelebration } from "@/app/home/types";

export const liturgyService = {
  async getDailyLiturgy(day: number, month: number, year: number): Promise<LiturgyCelebration | null> {
    try {
      const res = await fetch(
        `https://liturgia.up.railway.app/v3/?dia=${day}&mes=${month}&ano=${year}`
      );
      if (!res.ok) throw new Error("Failed to fetch daily liturgy");
      const data: LiturgyDayResponse = await res.json();

      // Return the main celebration or the first one available
      const mainCelebration = data.celebracoes?.find((c) => c.principal) || data.celebracoes?.[0];
      return mainCelebration || null;
    } catch (error) {
      console.error("Failed to fetch liturgy:", error);
      return null;
    }
  }
};

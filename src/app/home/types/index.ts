export interface LiturgyReadingOption {
  referencia?: string;
  titulo?: string;
  refrao?: string;
  texto: string;
}

export interface LiturgyReading {
  ordem: number;
  tipo: "leitura" | "salmo" | "evangelho" | "extra";
  rotulo: string;
  opcoes: LiturgyReadingOption[];
}

export interface LiturgyCelebration {
  id: string;
  liturgia: string;
  cor: string;
  principal: boolean;
  leituras: LiturgyReading[];
}

export interface LiturgyDayResponse {
  data: string;
  celebracoes: LiturgyCelebration[];
}

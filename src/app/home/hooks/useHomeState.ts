import { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { liturgyService } from "@/services/liturgyService";
import { LiturgyCelebration } from "../types";

const fallbackCelebration: LiturgyCelebration = {
  id: "fallback-dia",
  liturgia: "Meditação Diária",
  cor: "Verde",
  principal: true,
  leituras: [
    {
      ordem: 1,
      tipo: "leitura",
      rotulo: "Primeira Leitura",
      opcoes: [
        {
          referencia: "1Jo 3, 1-2",
          titulo: "Leitura da Primeira Carta de São João",
          texto: "Caríssimos: Vede que grande presente de amor o Pai nos deu: de sermos chamados filhos de Deus! E nós o somos! Se o mundo não nos conhece, é porque não conheceu o Pai. Caríssimos, desde já somos filhos de Deus, mas nem sequer se manifestou o que seremos! Sabemos que, quando Jesus se manifestar, seremos semelhantes a ele, porque o veremos tal como ele é."
        }
      ]
    },
    {
      ordem: 2,
      tipo: "salmo",
      rotulo: "Salmo Responsorial",
      opcoes: [
        {
          referencia: "Sl 23",
          refrao: "O Senhor é o meu pastor, nada me faltará.",
          texto: "— O Senhor é o meu pastor, nada me faltará. Deita-me em verdes pastagens e guia-me mansamente a águas tranquilas.\n— Restaura a minha alma e guia-me pelas veredas da justiça por amor do seu nome.\n— Ainda que eu ande pelo vale da sombra da morte, não temerei mal algum, porque tu estás comigo."
        }
      ]
    },
    {
      ordem: 3,
      tipo: "evangelho",
      rotulo: "Evangelho",
      opcoes: [
        {
          referencia: "Jo 10, 11-14",
          titulo: "Proclamação do Evangelho de Jesus Cristo ✠ segundo João",
          texto: "Naquele tempo, disse Jesus: 'Eu sou o bom pastor. O bom pastor dá a vida por suas ovelhas. O mercenário, que não é pastor e a quem as ovelhas não pertencem, vê o lobo chegar, abandona as ovelhas e foge, e o lobo as rouba e dispersa. Eu sou o bom pastor: conheço as minhas ovelhas, e elas me conhecem.'"
        }
      ]
    }
  ]
};

export const useHomeState = () => {
  const { currentUser, activeEvent, isLoading } = useApp();
  const [celebration, setCelebration] = useState<LiturgyCelebration | null>(null);
  const [loadingLiturgy, setLoadingLiturgy] = useState(true);

  useEffect(() => {
    async function loadLiturgy() {
      const today = new Date();
      const day = today.getDate();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();

      setLoadingLiturgy(true);
      const data = await liturgyService.getDailyLiturgy(day, month, year);
      
      if (data) {
        setCelebration(data);
      } else {
        setCelebration(fallbackCelebration);
      }
      setLoadingLiturgy(false);
    }

    loadLiturgy();
  }, []);

  return {
    currentUser,
    activeEvent,
    isLoading,
    celebration,
    loadingLiturgy
  };
};

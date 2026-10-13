/**
 * Utilitário para geração de links e abertura de cobrança via WhatsApp (Web ou App nativo)
 * Não requer nenhuma API oficial nem serviço pago de terceiros.
 */

export interface WhatsAppPixConfig {
  pixKey?: string;
  merchantName?: string;
  bankName?: string;
}

export function buildWhatsAppMessageText(
  customer: { firstName: string; lastName: string; phone?: string },
  pendingAmount: number,
  pixConfig?: WhatsAppPixConfig
): string {
  const formattedAmount = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(pendingAmount);

  const customerName = `${customer.firstName} ${customer.lastName || ""}`.trim();

  const activePixKey = pixConfig?.pixKey?.trim() || "homensdefe.pel@gmail.com";
  const activeMerchantName = pixConfig?.merchantName?.trim() || "Alcides";
  const activeBankName = pixConfig?.bankName?.trim() || "Nubank";

  const bankLine = activeBankName ? `🏦 *Banco:* ${activeBankName}\n` : "";

  return `Olá, *${customerName}*! Tudo bem?🙏

Aqui é da equipe da *Lojinha Homens de Fé*.

No fechamento do caixa da lojinha, identificamos no seu cadastro uma pendência no valor de *${formattedAmount}*.

Se estiver tudo certinho, pedimos por gentileza que realize o acerto através da nossa chave PIX:

🔑 *Chave PIX:* ${activePixKey}
👤 *Nome do Favorecido:* ${activeMerchantName}
${bankLine}Assim que efetuar o pagamento, por favor nos envie o comprovante por aqui para que possamos dar a baixa no sistema.

Muito obrigado pela compreensão e que Deus abençoe! 🙌`;
}

export function buildWhatsAppCobrancaUrl(
  customer: { firstName: string; lastName: string; phone?: string },
  pendingAmount: number,
  pixConfig?: WhatsAppPixConfig
): string | null {
  // Não cobra valores zerados ou negativos
  if (!pendingAmount || pendingAmount <= 0) return null;
  if (!customer.phone) return null;

  let cleanPhone = customer.phone.replace(/\D/g, "");
  if (!cleanPhone || cleanPhone.length < 8) return null;

  // Se tiver 10 ou 11 dígitos (DDD + telefone), adiciona o código do Brasil (55)
  if (cleanPhone.length === 10 || cleanPhone.length === 11) {
    cleanPhone = `55${cleanPhone}`;
  }

  const message = buildWhatsAppMessageText(customer, pendingAmount, pixConfig);

  // Detecta se é dispositivo móvel (iOS / Android) para usar o esquema universal wa.me
  // No computador/desktop, usa web.whatsapp.com/send para abrir diretamente a conversa no WhatsApp Web logado no navegador
  const isMobile =
    typeof navigator !== "undefined" &&
    /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  if (isMobile) {
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  } else {
    return `https://web.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(
      message
    )}`;
  }
}

export function openWhatsAppCobranca(
  customer: { firstName: string; lastName: string; phone?: string },
  pendingAmount: number,
  pixConfig?: WhatsAppPixConfig
): boolean {
  if (!pendingAmount || pendingAmount <= 0) {
    alert("Este participante não possui saldo pendente em aberto para cobrança.");
    return false;
  }

  if (!customer.phone || customer.phone.replace(/\D/g, "").length < 8) {
    alert(
      `O participante ${customer.firstName} não possui um número de telefone válido cadastrado para envio de WhatsApp.`
    );
    return false;
  }

  const url = buildWhatsAppCobrancaUrl(customer, pendingAmount, pixConfig);
  if (!url) {
    alert("Não foi possível gerar o link de cobrança. Verifique os dados do participante.");
    return false;
  }

  // Nomeamos o target como "lojinha_whatsapp" em vez de "_blank".
  // Desta forma, o navegador reutiliza a MESMA aba do WhatsApp sempre que você clicar,
  // evitando abrir várias abas acumuladas e derrubar umas às outras.
  const openedWin = window.open(url, "lojinha_whatsapp");
  if (openedWin) {
    try {
      openedWin.focus();
    } catch {}
  } else {
    const link = document.createElement("a");
    link.href = url;
    link.target = "lojinha_whatsapp";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  return true;
}

export async function copyWhatsAppMessage(
  customer: { firstName: string; lastName: string; phone?: string },
  pendingAmount: number,
  pixConfig?: WhatsAppPixConfig
): Promise<boolean> {
  const message = buildWhatsAppMessageText(customer, pendingAmount, pixConfig);
  try {
    await navigator.clipboard.writeText(message);
    return true;
  } catch {
    return false;
  }
}

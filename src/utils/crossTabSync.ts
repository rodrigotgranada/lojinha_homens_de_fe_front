const CHANNEL_NAME = "lojinha_cross_tab_sync";

export type SyncEventType = "SALES_UPDATED" | "CUSTOMER_UPDATED" | "PRODUCT_UPDATED";

/**
 * Notifica todas as abas abertas do navegador (e a aba atual) que os dados mudaram.
 */
export const broadcastCrossTabEvent = (type: SyncEventType, payload?: any) => {
  if (typeof window === "undefined") return;

  // 1. Notifica a aba atual via evento CustomEvent
  window.dispatchEvent(new CustomEvent("lojinha_local_sync", { detail: { type, payload } }));

  // 2. Notifica as outras abas via BroadcastChannel (comunicação em tempo real entre abas)
  try {
    if (typeof BroadcastChannel !== "undefined") {
      const bc = new BroadcastChannel(CHANNEL_NAME);
      bc.postMessage({ type, payload, timestamp: Date.now() });
      bc.close();
    }
  } catch (e) {
    // BroadcastChannel indisponível ou bloqueado
  }

  // 3. Fallback: localStorage dispara o evento 'storage' nativo em todas as OUTRAS abas abertas
  try {
    localStorage.setItem("lojinha_sync_trigger", `${type}:${Date.now()}`);
  } catch (e) {
    // Quota ou modo anônimo estrito
  }
};

/**
 * Inscreve um callback para ser executado quando houver alterações em outras abas
 * ou quando o operador alternar para esta aba (focus / visibilitychange).
 */
export const subscribeCrossTabEvent = (
  types: SyncEventType[],
  callback: (event: { type: SyncEventType; payload?: any }) => void
) => {
  if (typeof window === "undefined") return () => {};

  // Listener da aba local
  const localHandler = (e: Event) => {
    const custom = e as CustomEvent;
    if (types.includes(custom.detail?.type)) {
      callback(custom.detail);
    }
  };
  window.addEventListener("lojinha_local_sync", localHandler);

  // Listener do BroadcastChannel (tempo real entre abas)
  let bc: BroadcastChannel | null = null;
  if (typeof BroadcastChannel !== "undefined") {
    try {
      bc = new BroadcastChannel(CHANNEL_NAME);
      bc.onmessage = (event) => {
        if (event.data && types.includes(event.data.type)) {
          callback(event.data);
        }
      };
    } catch (e) {}
  }

  // Listener via storage event (fallback de abas)
  const storageHandler = (e: StorageEvent) => {
    if (e.key === "lojinha_sync_trigger" && e.newValue) {
      const [type] = e.newValue.split(":");
      if (types.includes(type as SyncEventType)) {
        callback({ type: type as SyncEventType });
      }
    }
  };
  window.addEventListener("storage", storageHandler);

  // Ao alternar para a aba (foco da janela ou troca de aba), recarrega automaticamente
  let lastFocusTime = Date.now();
  const handleTabFocus = () => {
    const now = Date.now();
    // Throttle de 2 segundos para evitar chamadas duplicadas
    if (now - lastFocusTime > 2000) {
      lastFocusTime = now;
      callback({ type: types[0] });
    }
  };

  const visibilityHandler = () => {
    if (document.visibilityState === "visible") {
      handleTabFocus();
    }
  };

  document.addEventListener("visibilitychange", visibilityHandler);
  window.addEventListener("focus", handleTabFocus);

  return () => {
    window.removeEventListener("lojinha_local_sync", localHandler);
    if (bc) {
      bc.close();
    }
    window.removeEventListener("storage", storageHandler);
    document.removeEventListener("visibilitychange", visibilityHandler);
    window.removeEventListener("focus", handleTabFocus);
  };
};

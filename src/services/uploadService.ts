/**
 * Service to manage product image uploads.
 * 
 * CURRENT IMPLEMENTATION: Local File Storage (via /api/upload endpoint)
 * FUTURE IMPLEMENTATION: Firebase Storage (swap code inside methods)
 */

// If migrating to Firebase in the future, you would import:
// import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
// import { firebaseApp } from "./firebaseConfig";
// const storage = getStorage(firebaseApp);

import { getApiBase } from "./apiClient";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

export const uploadService = {
  /**
   * Uploads a product image file and returns its URL.
   * 
   * @param file The selected Image File
   * @param productId Optional ID of the product (for direct backend Firebase upload)
   * @returns The access URL (local path or cloud URL)
   */
  uploadProductImage: async (file: File, productId?: string): Promise<string> => {
    // If running in production (NestJS API) and a productId is provided, upload directly to NestJS!
    if (productId && !USE_MOCK) {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(`${getApiBase()}/products/${productId}/image`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Erro ao realizar upload da imagem para o Firebase.");
      }

      const data = await res.json();
      return data.url; // Returns the public Firebase URL
    }

    // Otherwise, fallback to Next.js API local upload (mock mode)
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Erro ao realizar upload da imagem.");
    }

    const data = await res.json();
    return data.url; // Returns local path: e.g. "/uploads/..."
  },

  /**
   * Uploads a receipt/invoice/voucher file and returns its URL.
   */
  uploadReceipt: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "Erro ao realizar upload do comprovante.");
    }

    const data = await res.json();
    return data.url;
  },

  /**
   * Deletes a product image by its URL.
   * 
   * @param imageUrl The URL of the image to be deleted
   */
  deleteProductImage: async (imageUrl: string): Promise<void> => {
    if (!imageUrl) return;

    // Local file deletion fallback
    if (imageUrl.startsWith("/uploads/")) {
      const res = await fetch(`/api/upload?url=${encodeURIComponent(imageUrl)}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        console.error("Failed to delete local file:", await res.json());
      }
    }
  }
};

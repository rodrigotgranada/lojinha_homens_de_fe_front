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

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";
const API_BASE = USE_MOCK
  ? (process.env.NEXT_PUBLIC_MOCK_URL || "http://localhost:5006")
  : (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001");

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

      const res = await fetch(`${API_BASE}/products/${productId}/image`, {
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

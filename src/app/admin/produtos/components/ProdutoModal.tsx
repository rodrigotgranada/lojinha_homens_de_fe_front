"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ImageCropperModal } from "@/components/ImageCropperModal";
import { Image as ImageIcon, Sparkles, X, ChevronDown, ShoppingCart, AlertTriangle } from "lucide-react";
import { useProdutos } from "../context/ProdutosContext";

export const ProdutoModal: React.FC = () => {
  const {
    isModalOpen,
    setIsModalOpen,
    modalMode,
    setModalMode,
    productId,
    name,
    setName,
    price,
    setPrice,
    stock,
    setStock,
    minStock,
    setMinStock,
    category,
    setCategory,
    productLogs,
    loadingLogs,
    imageUrl,
    imagePreview,
    formError,
    saving,
    cameFromView,
    cropperFile,
    isCropperOpen,
    setIsCropperOpen,
    handleTriggerDelete,
    handleTriggerReactivate,
    productActive,
    handleFileChange,
    handleCropComplete,
    handleRemoveImage,
    handleSubmit
  } = useProdutos();

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size={modalMode === "edit" ? "lg" : "md"}
        title={
          modalMode === "view"
            ? "Detalhes do Produto"
            : productId
            ? "Editar Produto"
            : "Novo Produto"
        }
      >
        {modalMode === "view" ? (
          <div className="flex flex-col gap-5">
            {/* Image Preview */}
            <div className="w-full aspect-video rounded-xl bg-transparent flex items-center justify-center border border-zinc-200 dark:border-zinc-800 overflow-hidden">
              {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageUrl}
                  alt={name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <ImageIcon className="h-10 w-10 text-zinc-300 dark:text-zinc-750" />
              )}
            </div>

            {/* Info Summary */}
            <div className="space-y-4">
              <div>
                <span className="text-[10px] uppercase font-extrabold text-zinc-400 tracking-wider">
                  Nome do Produto
                </span>
                <p className="text-lg font-black text-zinc-900 dark:text-white mt-0.5">
                  {name}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] uppercase font-extrabold text-zinc-400 tracking-wider">
                    Preço Unitário
                  </span>
                  <p className="text-base font-black text-emerald-600 dark:text-emerald-450 mt-0.5">
                    R$ {price}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-extrabold text-zinc-400 tracking-wider">
                    Quantidade em Estoque
                  </span>
                  <p className="text-base font-black text-zinc-900 dark:text-white mt-0.5">
                    {stock} unidades
                  </p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-extrabold text-zinc-400 tracking-wider">
                    Categoria
                  </span>
                  <p className="text-base font-black text-indigo-600 dark:text-indigo-400 mt-0.5">
                    {category || "Outros"}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-extrabold text-zinc-400 tracking-wider">
                    Estoque Crítico Alvo
                  </span>
                  <p className="text-base font-black text-amber-600 dark:text-amber-450 mt-0.5">
                    {minStock || "5"} unidades
                  </p>
                </div>
              </div>
            </div>

            {/* Histórico de Auditoria do Item - Accordion */}
            {(() => {
              const [auditOpen, setAuditOpen] = useState(false);
              const last5 = productLogs.slice(0, 5);
              return (
                <div className="border-t border-zinc-100 dark:border-zinc-850 pt-3 mt-2">
                  <button
                    type="button"
                    onClick={() => setAuditOpen((o) => !o)}
                    className="flex items-center justify-between w-full text-left gap-2 group"
                  >
                    <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                      📜 Histórico de Auditoria
                      {!loadingLogs && productLogs.length > 0 && (
                        <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 text-[9px] font-black px-1.5 py-0.5 rounded-full">
                          {productLogs.length}
                        </span>
                      )}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-zinc-400 transition-transform duration-200 shrink-0 ${
                        auditOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {auditOpen && (
                    <div className="mt-3">
                      {loadingLogs ? (
                        <span className="text-xs text-zinc-450">Carregando histórico...</span>
                      ) : last5.length === 0 ? (
                        <span className="text-xs text-zinc-400 dark:text-zinc-500 italic block py-1">
                          Nenhum registro para este produto.
                        </span>
                      ) : (
                        <div className="space-y-2.5">
                          {last5.map((log) => {
                            const logTime = new Date(log.createdAt).toLocaleTimeString("pt-BR", {
                              hour: "2-digit",
                              minute: "2-digit"
                            });
                            const logDate = new Date(log.createdAt).toLocaleDateString("pt-BR");
                            return (
                              <div key={log.id} className="text-xs leading-relaxed border-b border-zinc-50 dark:border-zinc-850/50 pb-2 last:border-0 last:pb-0">
                                <div className="flex justify-between items-baseline gap-2">
                                  <span className="font-bold text-zinc-700 dark:text-zinc-350">{log.userName}</span>
                                  <span className="text-[10px] text-zinc-400 font-mono shrink-0">{logTime} · {logDate}</span>
                                </div>
                                <p className="text-zinc-500 dark:text-zinc-455 mt-0.5">{log.description}</p>
                              </div>
                            );
                          })}
                          {productLogs.length > 5 && (
                            <p className="text-[10px] text-zinc-400 italic text-center pt-1">
                              + {productLogs.length - 5} registros anteriores na página de Auditoria.
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })()}

            {/* View Modal Footer buttons */}
            <div className="flex gap-3 justify-end mt-4 w-full border-t border-zinc-100 dark:border-zinc-850 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsModalOpen(false)}
                className="cursor-pointer text-sm"
              >
                Fechar
              </Button>
              <Button
                type="button"
                onClick={() => setModalMode("edit")}
                className="cursor-pointer text-sm font-bold flex items-center gap-1.5"
              >
                <Sparkles className="h-4 w-4" />
                Editar Informações
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Column 1 & 2: Form fields */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {formError && (
                <div className="bg-red-50/80 dark:bg-red-950/20 text-red-655 dark:text-red-400 p-3.5 rounded-xl border border-red-100 dark:border-red-900/30 text-xs font-bold">
                  {formError}
                </div>
              )}

              <Input
                label="Nome do Produto *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Camiseta Oficial Retiro 2026"
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Preço Unitário (R$) *"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Ex: 1,50"
                  type="text"
                  required
                />
                <Input
                  label="Quantidade Inicial *"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="Ex: 50"
                  type="number"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Estoque Crítico Alvo *"
                  value={minStock}
                  onChange={(e) => setMinStock(e.target.value)}
                  placeholder="Ex: 5"
                  type="number"
                  required
                />
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Categoria *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer h-[46px]"
                  >
                    <option value="Alimentação">Alimentação</option>
                    <option value="Vestuário">Vestuário</option>
                    <option value="Livros">Livros</option>
                    <option value="Acessórios">Acessórios</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>
              </div>

              {/* Custom Image Upload Drag-Drop Area */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Imagem do Produto (Opcional)
                </span>

                {imagePreview ? (
                  <div className="relative w-full aspect-video rounded-xl bg-transparent border border-zinc-205 dark:border-zinc-800 overflow-hidden flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-contain"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors cursor-pointer"
                      title="Remover Imagem"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full aspect-video rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                      <ImageIcon className="h-8 w-8 text-zinc-400 mb-2" />
                      <p className="text-sm font-semibold text-zinc-650 dark:text-zinc-400">
                        Clique ou arraste para subir imagem
                      </p>
                      <p className="text-xs text-zinc-400 dark:text-zinc-555 mt-1">
                        PNG, JPG ou WEBP (Max. 5MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Column 3: Live Preview Card */}
            <div className="hidden lg:flex flex-col gap-3 border-l border-zinc-100 dark:border-zinc-800 pl-6 h-full justify-start">
              <span className="text-xs font-black text-zinc-450 dark:text-zinc-555 uppercase tracking-wider block mb-2">
                👁️ Card em Tempo Real
              </span>

              {/* Product Preview Card — mirrors new ProductCard.tsx exactly */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl p-4 flex flex-col gap-4 shadow-sm w-full max-w-[240px] mx-auto transition-all duration-300">
                {/* Image */}
                <div className="relative aspect-square w-full rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 overflow-hidden flex items-center justify-center">
                  {imagePreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-6 text-center">
                      <ImageIcon className="h-10 w-10 text-zinc-300 dark:text-zinc-700 mb-2" />
                      <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                        {(name.trim() || "Produto").slice(0, 12)}
                      </span>
                    </div>
                  )}

                  {/* Stock badge — live calculation */}
                  {(() => {
                    const stockNum = parseInt(stock, 10) || 0;
                    const minStockNum = parseInt(minStock, 10) || 5;
                    const isOut = stockNum === 0;
                    const isLow = stockNum <= minStockNum && !isOut;
                    if (isOut) return (
                      <span className="absolute top-2.5 left-2.5 bg-red-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                        Esgotado
                      </span>
                    );
                    if (isLow) return (
                      <span className="absolute top-2.5 left-2.5 bg-red-100 dark:bg-red-950/70 text-red-600 dark:text-red-400 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-red-200 dark:border-red-900/50">
                        Crítico ({stockNum})
                      </span>
                    );
                    return (
                      <span className="absolute top-2.5 left-2.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-900/30">
                        Estoque: {stockNum}
                      </span>
                    );
                  })()}
                </div>

                {/* Info */}
                <div className="flex flex-col gap-3">
                  {category && category !== "Outros" && (
                    <span className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-indigo-100 dark:border-indigo-900/30 self-start">
                      {category}
                    </span>
                  )}

                  <h4 className="font-extrabold text-zinc-900 dark:text-white text-sm leading-tight line-clamp-2">
                    {name.trim() || "Nome do Produto"}
                  </h4>

                  <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-850">
                    <span className="text-[10px] font-mono text-zinc-450 dark:text-zinc-500">
                      Qtd: {stock || "0"}
                    </span>
                    <span className="font-black text-emerald-600 dark:text-emerald-450 text-sm">
                      R$ {price || "0,00"}
                    </span>
                  </div>

                  <div className="w-full flex items-center justify-center gap-2 py-2.5 bg-indigo-600 rounded-xl text-white text-sm font-bold">
                    <ShoppingCart className="h-4 w-4" />
                    Adicionar
                  </div>
                </div>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="flex gap-3 justify-end mt-4 w-full lg:col-span-3 border-t border-zinc-100 dark:border-zinc-850 pt-4">
              {productId && (
                <Button
                  type="button"
                  variant={productActive ? "danger" : "success"}
                  onClick={() => productActive ? handleTriggerDelete(productId, name) : handleTriggerReactivate(productId, name)}
                  className="cursor-pointer text-sm mr-auto font-bold"
                >
                  {productActive ? "Desativar" : "Ativar"}
                </Button>
              )}
              {cameFromView ? (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setModalMode("view")}
                  className="cursor-pointer text-sm"
                >
                  Voltar
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setIsModalOpen(false)}
                  className="cursor-pointer text-sm"
                >
                  Cancelar
                </Button>
              )}
              <Button type="submit" loading={saving} className="cursor-pointer text-sm font-bold">
                {productId ? "Salvar Alterações" : "Cadastrar Produto"}
              </Button>
            </div>
          </form>
        )}
      </Modal>

      <ImageCropperModal
        isOpen={isCropperOpen}
        onClose={() => setIsCropperOpen(false)}
        file={cropperFile}
        onCropComplete={handleCropComplete}
      />
    </>
  );
};

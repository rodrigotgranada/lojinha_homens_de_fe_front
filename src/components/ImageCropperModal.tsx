"use client";

import React, { useState, useEffect, useRef } from "react";
import { Modal } from "./ui/Modal";
import { Button } from "./ui/Button";
import { Crop, Image as ImageIcon, Circle, Square, ZoomIn } from "lucide-react";

interface ImageCropperModalProps {
  isOpen: boolean;
  onClose: () => void;
  file: File | null;
  onCropComplete: (croppedFile: File) => void;
}

type AspectMode = "1:1" | "16:9" | "redondo" | "livre";

export const ImageCropperModal: React.FC<ImageCropperModalProps> = ({
  isOpen,
  onClose,
  file,
  onCropComplete,
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [aspectMode, setAspectMode] = useState<AspectMode>("1:1");
  const [imgRect, setImgRect] = useState({ width: 0, height: 0 });
  const [crop, setCrop] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const [zoom, setZoom] = useState(1);
  const [isReady, setIsReady] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  
  // Dragging state
  const dragInfo = useRef<{
    activeHandle: string | null;
    startPointer: { x: number; y: number };
    startCrop: { x: number; y: number; w: number; h: number };
  }>({
    activeHandle: null,
    startPointer: { x: 0, y: 0 },
    startCrop: { x: 0, y: 0, w: 0, h: 0 },
  });

  // Read file on load
  useEffect(() => {
    if (file && isOpen) {
      setIsReady(false);
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
      setZoom(1);
    }
  }, [file, isOpen]);

  // Reset crop box when aspectMode or image loaded size changes
  const resetCropBox = (width: number, height: number, mode: AspectMode) => {
    if (width === 0 || height === 0) return;

    let w = Math.min(200, width * 0.8);
    let h = w;

    if (mode === "16:9") {
      h = Math.round(w * 9 / 16);
    } else if (mode === "livre") {
      w = Math.round(width * 0.6);
      h = Math.round(height * 0.6);
    }

    // Clamp inside image rect
    w = Math.min(w, width);
    h = Math.min(h, height);

    setCrop({
      x: Math.round((width - w) / 2),
      y: Math.round((height - h) / 2),
      w,
      h,
    });
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const rect = img.getBoundingClientRect();
    setImgRect({ width: rect.width, height: rect.height });
    resetCropBox(rect.width, rect.height, aspectMode);
    setIsReady(true);
  };

  // Switch aspect ratio mode
  const handleAspectChange = (mode: AspectMode) => {
    setAspectMode(mode);
    if (imgRect.width > 0) {
      resetCropBox(imgRect.width, imgRect.height, mode);
    }
  };

  // Pointer event handlers for dragging/resizing
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, handle: string) => {
    e.stopPropagation();
    e.preventDefault();
    dragInfo.current = {
      activeHandle: handle,
      startPointer: { x: e.clientX, y: e.clientY },
      startCrop: { ...crop },
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const { activeHandle, startPointer, startCrop } = dragInfo.current;
    if (!activeHandle || imgRect.width === 0) return;

    const dx = e.clientX - startPointer.x;
    const dy = e.clientY - startPointer.y;

    let { x, y, w, h } = startCrop;

    if (activeHandle === "move") {
      x = Math.max(0, Math.min(imgRect.width - w, startCrop.x + dx));
      y = Math.max(0, Math.min(imgRect.height - h, startCrop.y + dy));
    } else {
      // Resizing handle formulas
      const ratio = aspectMode === "1:1" || aspectMode === "redondo" ? 1 : (aspectMode === "16:9" ? 16 / 9 : null);

      if (activeHandle === "se") { // Bottom-Right
        w = Math.max(30, startCrop.w + dx);
        if (ratio) {
          h = w / ratio;
        } else {
          h = Math.max(30, startCrop.h + dy);
        }

        // Keep inside bounds
        if (x + w > imgRect.width) {
          w = imgRect.width - x;
          if (ratio) h = w / ratio;
        }
        if (y + h > imgRect.height) {
          h = imgRect.height - y;
          if (ratio) {
            w = h * ratio;
          }
        }
      } else if (activeHandle === "sw") { // Bottom-Left
        const newX = Math.max(0, Math.min(startCrop.x + startCrop.w - 30, startCrop.x + dx));
        w = startCrop.w + (startCrop.x - newX);
        x = newX;

        if (ratio) {
          h = w / ratio;
        } else {
          h = Math.max(30, startCrop.h + dy);
        }

        if (y + h > imgRect.height) {
          h = imgRect.height - y;
          if (ratio) {
            w = h * ratio;
            x = startCrop.x + startCrop.w - w;
          }
        }
      } else if (activeHandle === "ne") { // Top-Right
        w = Math.max(30, startCrop.w + dx);
        if (x + w > imgRect.width) {
          w = imgRect.width - x;
        }

        if (ratio) {
          h = w / ratio;
          y = startCrop.y + startCrop.h - h;
        } else {
          const newY = Math.max(0, Math.min(startCrop.y + startCrop.h - 30, startCrop.y + dy));
          h = startCrop.h + (startCrop.y - newY);
          y = newY;
        }

        if (y < 0) {
          y = 0;
          h = startCrop.y + startCrop.h;
          if (ratio) w = h * ratio;
        }
      } else if (activeHandle === "nw") { // Top-Left
        const newX = Math.max(0, Math.min(startCrop.x + startCrop.w - 30, startCrop.x + dx));
        w = startCrop.w + (startCrop.x - newX);
        x = newX;

        if (ratio) {
          h = w / ratio;
          y = startCrop.y + startCrop.h - h;
        } else {
          const newY = Math.max(0, Math.min(startCrop.y + startCrop.h - 30, startCrop.y + dy));
          h = startCrop.h + (startCrop.y - newY);
          y = newY;
        }

        if (y < 0) {
          y = 0;
          h = startCrop.y + startCrop.h;
          if (ratio) {
            w = h * ratio;
            x = startCrop.x + startCrop.w - w;
          }
        }
      }
    }

    setCrop({
      x: Math.round(x),
      y: Math.round(y),
      w: Math.round(w),
      h: Math.round(h),
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    dragInfo.current.activeHandle = null;
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
  };

  // Perform crop operations and save
  const handleSaveCrop = () => {
    if (!imgRef.current || !imageSrc || !file || imgRect.width === 0) return;

    const img = imgRef.current;
    const nw = img.naturalWidth;
    const nh = img.naturalHeight;

    const scaleX = nw / imgRect.width;
    const scaleY = nh / imgRect.height;

    // Relative offset from container center to crop box center
    const containerCenterX = imgRect.width / 2;
    const containerCenterY = imgRect.height / 2;

    const cropCenterX = crop.x + crop.w / 2;
    const cropCenterY = crop.y + crop.h / 2;

    const dxOffset = cropCenterX - containerCenterX;
    const dyOffset = cropCenterY - containerCenterY;

    // Map crop box center to natural pixels, taking zoom factor into account
    const cx = nw / 2 + (dxOffset * scaleX) / zoom;
    const cy = nh / 2 + (dyOffset * scaleY) / zoom;

    // Map dimensions to natural pixels, taking zoom factor into account
    const sWidth = (crop.w * scaleX) / zoom;
    const sHeight = (crop.h * scaleY) / zoom;

    const sx = cx - sWidth / 2;
    const sy = cy - sHeight / 2;

    // Set high quality canvas outputs
    const canvas = document.createElement("canvas");
    let dWidth = 500;
    let dHeight = 500;

    if (aspectMode === "16:9") {
      dHeight = Math.round(500 * 9 / 16);
    } else if (aspectMode === "livre") {
      const cropAspect = crop.w / crop.h;
      if (cropAspect > 1) {
        dHeight = Math.round(500 / cropAspect);
      } else {
        dWidth = Math.round(500 * cropAspect);
      }
    }

    canvas.width = dWidth;
    canvas.height = dHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Fill white
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, dWidth, dHeight);

    // Round crop support
    if (aspectMode === "redondo") {
      ctx.beginPath();
      ctx.arc(dWidth / 2, dHeight / 2, dWidth / 2, 0, 2 * Math.PI);
      ctx.clip();
    }

    // Render crop box contents
    ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, dWidth, dHeight);

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const croppedFile = new File([blob], file.name, {
            type: "image/jpeg",
            lastModified: Date.now(),
          });
          onCropComplete(croppedFile);
          onClose();
        }
      },
      "image/jpeg",
      0.9
    );
  };

  // Bypasses cropping and returns the original selected file
  const handleUseOriginal = () => {
    if (file) {
      onCropComplete(file);
      onClose();
    }
  };

  // Convert crop box to natural dimensions
  const nw = imgRef.current?.naturalWidth || 0;
  const nh = imgRef.current?.naturalHeight || 0;

  const widthPx = imgRect.width ? Math.round(crop.w * (nw / imgRect.width)) : 0;
  const heightPx = imgRect.height ? Math.round(crop.h * (nh / imgRect.height)) : 0;

  const handleWidthChange = (valStr: string) => {
    if (!imgRef.current || imgRect.width === 0) return;
    const val = parseInt(valStr, 10);
    if (isNaN(val) || val <= 0) return;

    const scaleX = imgRef.current.naturalWidth / imgRect.width;
    let newW = Math.round(val / scaleX);
    
    // Clamp
    newW = Math.max(30, Math.min(imgRect.width - crop.x, newW));

    let newH = crop.h;
    const ratio = aspectMode === "1:1" || aspectMode === "redondo" ? 1 : (aspectMode === "16:9" ? 16 / 9 : null);
    if (ratio) {
      newH = newW / ratio;
      if (crop.y + newH > imgRect.height) {
        newH = imgRect.height - crop.y;
        newW = newH * ratio;
      }
    }

    setCrop(prev => ({ ...prev, w: Math.round(newW), h: Math.round(newH) }));
  };

  const handleHeightChange = (valStr: string) => {
    if (!imgRef.current || imgRect.height === 0) return;
    const val = parseInt(valStr, 10);
    if (isNaN(val) || val <= 0) return;

    const scaleY = imgRef.current.naturalHeight / imgRect.height;
    let newH = Math.round(val / scaleY);

    // Clamp
    newH = Math.max(30, Math.min(imgRect.height - crop.y, newH));

    let newW = crop.w;
    const ratio = aspectMode === "1:1" || aspectMode === "redondo" ? 1 : (aspectMode === "16:9" ? 16 / 9 : null);
    if (ratio) {
      newW = newH * ratio;
      if (crop.x + newW > imgRect.width) {
        newW = imgRect.width - crop.x;
        newH = newW / ratio;
      }
    }
    setCrop(prev => ({ ...prev, w: Math.round(newW), h: Math.round(newH) }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Ajustar Imagem do Produto" size="lg">
      <div className="flex flex-col gap-5">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Escolha a proporção desejada para o produto e arraste os limites pontilhados sobre a imagem.
        </p>

        {/* Responsive Grid Split Container */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
          
          {/* Left Column: Image Viewport */}
          <div className="md:col-span-3 w-full">
            <div
              ref={containerRef}
              className="relative w-full min-h-[300px] flex items-center justify-center bg-zinc-950 rounded-2xl overflow-hidden p-4 border border-zinc-200 dark:border-zinc-800 select-none shadow-inner"
            >
              {imageSrc && (
                <div
                  className="relative max-h-[350px] overflow-hidden"
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                >
                  {/* Target Image to Crop */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    ref={imgRef}
                    src={imageSrc}
                    alt="Source to Crop"
                    onLoad={handleImageLoad}
                    className="max-h-[350px] w-auto h-auto object-contain block pointer-events-none origin-center"
                    style={{
                      transform: `scale(${zoom})`,
                    }}
                  />

                  {/* Shaded Overlays & Dotted Boundary Cutout */}
                  {isReady && imgRect.width > 0 && (
                    <>
                      {/* Dark overlays around selection */}
                      <div
                        className="absolute bg-black/60 pointer-events-none"
                        style={{ top: 0, left: 0, right: 0, height: `${crop.y}px` }}
                      />
                      <div
                        className="absolute bg-black/60 pointer-events-none"
                        style={{ bottom: 0, left: 0, right: 0, top: `${crop.y + crop.h}px` }}
                      />
                      <div
                        className="absolute bg-black/60 pointer-events-none"
                        style={{
                          top: `${crop.y}px`,
                          bottom: `${imgRect.height - (crop.y + crop.h)}px`,
                          left: 0,
                          width: `${crop.x}px`,
                        }}
                      />
                      <div
                        className="absolute bg-black/60 pointer-events-none"
                        style={{
                          top: `${crop.y}px`,
                          bottom: `${imgRect.height - (crop.y + crop.h)}px`,
                          right: 0,
                          left: `${crop.x + crop.w}px`,
                        }}
                      />

                      {/* Resizable and Draggable Crop Box Overlay */}
                      <div
                        onPointerDown={(e) => handlePointerDown(e, "move")}
                        className={`absolute border-2 border-dashed border-white shadow-[0_0_0_1px_rgba(0,0,0,0.5)] cursor-move ${
                          aspectMode === "redondo" ? "rounded-full" : ""
                        }`}
                        style={{
                          left: `${crop.x}px`,
                          top: `${crop.y}px`,
                          width: `${crop.w}px`,
                          height: `${crop.h}px`,
                        }}
                      >
                        {/* Viewport helper lines */}
                        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-30 pointer-events-none">
                          <div className="border-r border-b border-white" />
                          <div className="border-r border-b border-white" />
                          <div className="border-b border-white" />
                          <div className="border-r border-b border-white" />
                          <div className="border-r border-b border-white" />
                          <div className="border-b border-white" />
                          <div className="border-r border-white" />
                          <div className="border-r border-white" />
                          <div />
                        </div>

                        {/* Corner Resize Handles */}
                        {aspectMode !== "redondo" && (
                          <>
                            {/* Top-Left */}
                            <div
                              onPointerDown={(e) => handlePointerDown(e, "nw")}
                              className="absolute w-4 h-4 -top-1.5 -left-1.5 bg-white border border-indigo-600 rounded-xs cursor-nwse-resize z-10"
                            />
                            {/* Top-Right */}
                            <div
                              onPointerDown={(e) => handlePointerDown(e, "ne")}
                              className="absolute w-4 h-4 -top-1.5 -right-1.5 bg-white border border-indigo-600 rounded-xs cursor-nesw-resize z-10"
                            />
                            {/* Bottom-Left */}
                            <div
                              onPointerDown={(e) => handlePointerDown(e, "sw")}
                              className="absolute w-4 h-4 -bottom-1.5 -left-1.5 bg-white border border-indigo-600 rounded-xs cursor-nesw-resize z-10"
                            />
                          </>
                        )}
                        {/* Bottom-Right handle */}
                        <div
                          onPointerDown={(e) => handlePointerDown(e, "se")}
                          className="absolute w-4 h-4 -bottom-1.5 -right-1.5 bg-white border border-indigo-600 rounded-xs cursor-nwse-resize z-10"
                        />
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Settings & Controls */}
          <div className="md:col-span-2 flex flex-col gap-4 w-full">
            
            {/* Aspect Ratio Mode Buttons */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-zinc-550 dark:text-zinc-400">Proporção</span>
              <div className="grid grid-cols-2 gap-1 bg-zinc-50 dark:bg-zinc-950 p-1.5 rounded-xl border border-zinc-100 dark:border-zinc-900">
                {[
                  { id: "1:1", name: "1:1", icon: <Square className="h-3.5 w-3.5" /> },
                  { id: "16:9", name: "16:9", icon: <Square className="h-3.5 w-3.5 scale-y-60" /> },
                  { id: "redondo", name: "Redondo", icon: <Circle className="h-3.5 w-3.5" /> },
                  { id: "livre", name: "Livre", icon: <Crop className="h-3.5 w-3.5" /> },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => handleAspectChange(mode.id as AspectMode)}
                    className={`py-2 px-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      aspectMode === mode.id
                        ? "bg-indigo-650 text-white shadow-xs"
                        : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                    }`}
                  >
                    {mode.icon}
                    <span>{mode.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Crop Dimension Inputs */}
            <div className="flex flex-col gap-2 bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-100 dark:border-zinc-900">
              <span className="text-xs font-bold text-zinc-550 dark:text-zinc-400">Dimensões do Corte</span>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-zinc-400">Largura (px)</label>
                  <input
                    type="number"
                    value={widthPx || ""}
                    onChange={(e) => handleWidthChange(e.target.value)}
                    className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-zinc-850 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-zinc-400">Altura (px)</label>
                  <input
                    type="number"
                    value={heightPx || ""}
                    onChange={(e) => handleHeightChange(e.target.value)}
                    className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-zinc-850 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                  />
                </div>
              </div>
            </div>

            {/* Zoom Controls */}
            <div className="flex flex-col gap-2 bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-100 dark:border-zinc-900">
              <div className="flex items-center justify-between text-xs font-bold text-zinc-500">
                <span className="flex items-center gap-1">
                  <ZoomIn className="h-4 w-4" />
                  Zoom da Imagem
                </span>
                <span>{zoom.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="1"
                max="3"
                step="0.1"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-650"
              />
              <div className="flex justify-between text-[10px] text-zinc-400">
                <span>1x</span>
                <span>2x</span>
                <span>3x</span>
              </div>
            </div>

          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-3 border-t border-zinc-100 dark:border-zinc-900 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={handleUseOriginal}
            className="cursor-pointer font-bold px-4 py-2 text-xs sm:text-sm"
          >
            Usar Imagem Inteira
          </Button>

          <div className="flex gap-2">
            <Button type="button" variant="ghost" onClick={onClose} className="cursor-pointer text-xs sm:text-sm">
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleSaveCrop}
              disabled={!isReady}
              className="cursor-pointer font-bold px-5 text-xs sm:text-sm"
            >
              Confirmar Corte
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

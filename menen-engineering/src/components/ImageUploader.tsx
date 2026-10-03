'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, Camera, Loader2, X, CheckCircle2, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  aspectRatio?: 'square' | 'video' | 'wide';
}

export default function ImageUploader({
  value = '',
  onChange,
  label = 'Upload Image',
  aspectRatio = 'square',
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string>(value);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync if external value changes
  React.useEffect(() => {
    if (value) {
      setPreview(value);
    }
  }, [value]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 15MB)
    if (file.size > 15 * 1024 * 1024) {
      setError('Image must be under 15MB');
      return;
    }

    setError(null);
    setIsUploading(true);

    // Immediate local preview so the user sees it instantly
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to upload image');
      }

      // Cloudinary returns .url or .secure_url
      const uploadedUrl = data.url || data.secure_url;
      setPreview(uploadedUrl);
      onChange(uploadedUrl);
    } catch (err: any) {
      console.error('Upload failed:', err);
      setError(err.message || 'Upload error');
      // Revert if upload failed
      setPreview(value);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview('');
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const ratioClass =
    aspectRatio === 'square'
      ? 'aspect-square w-32 h-32 rounded-2xl'
      : aspectRatio === 'video'
      ? 'aspect-video w-full max-w-md rounded-2xl'
      : 'aspect-[21/9] w-full rounded-2xl';

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[var(--theme-text-secondary)]">
          {label}
        </label>
      )}

      {/* Hidden File Input configured for desktop & mobile camera/gallery */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/png,image/jpeg,image/webp,image/jpg"
        className="hidden"
      />

      <div
        onClick={() => !isUploading && fileInputRef.current?.click()}
        className={`relative ${ratioClass} border-2 border-dashed border-[var(--theme-border)] bg-[var(--theme-surface)] hover:border-[var(--theme-accent)] transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden group select-none`}
      >
        {preview ? (
          <>
            <Image
              src={preview}
              alt="Uploaded Preview"
              fill
              unoptimized={preview.startsWith('blob:')}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 300px"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <span className="text-[11px] font-mono text-white font-semibold flex items-center gap-1">
                <Camera className="w-3.5 h-3.5" /> Change
              </span>
              <button
                type="button"
                onClick={handleRemove}
                className="p-1.5 rounded-full bg-red-600/80 text-white hover:bg-red-600 transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center p-4 text-center space-y-2 text-[var(--theme-text-muted)] group-hover:text-[var(--theme-accent)] transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[var(--theme-card)] border border-[var(--theme-border)] flex items-center justify-center">
              <Upload className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div className="text-xs font-mono font-medium">
              <span className="text-[var(--theme-accent)] font-bold">Click or tap</span> to upload
            </div>
            <span className="text-[10px] font-mono text-[var(--theme-text-muted)]">
              JPG, PNG, WebP up to 15MB
            </span>
          </div>
        )}

        {/* Loading Spinner */}
        {isUploading && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center gap-2 z-10 text-white">
            <Loader2 className="w-6 h-6 animate-spin text-[var(--theme-accent)]" />
            <span className="text-[11px] font-mono tracking-wide">Uploading...</span>
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs font-mono text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}
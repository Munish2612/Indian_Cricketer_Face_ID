import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, Sparkles, Loader2, Zap } from 'lucide-react';

const SAMPLE_PLAYERS = [
  { name: 'Virat Kohli', url: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500&auto=format&fit=crop&q=80' },
  { name: 'Rohit Sharma', url: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=500&auto=format&fit=crop&q=80' },
  { name: 'Jasprit Bumrah', url: 'https://images.unsplash.com/photo-1512719994953-eabf50895df7?w=500&auto=format&fit=crop&q=80' },
  { name: 'Hardik Pandya', url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=80' }
];

export default function Dropzone({ onAnalyze, loading }) {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleSampleClick = async (sample) => {
    try {
      const response = await fetch(sample.url);
      const blob = await response.blob();
      const file = new File([blob], `${sample.name.replace(" ", "_")}_sample.jpg`, { type: 'image/jpeg' });
      handleFileChange(file);
    } catch (err) {
      console.error("Failed to load sample image", err);
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onAnalyze(selectedFile, previewUrl);
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '32px', textAlign: 'center', position: 'relative' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px' }}>
        Facial Recognition <span className="text-gradient-cyan">Dropzone</span>
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
        Upload a clear photograph of an Indian cricketer or select a sample image below
      </p>

      {/* Main Drag and Drop Box */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: `2px dashed ${dragOver ? '#00f2fe' : 'rgba(255, 255, 255, 0.15)'}`,
          background: dragOver ? 'rgba(0, 242, 254, 0.05)' : 'rgba(0, 0, 0, 0.2)',
          borderRadius: '16px',
          padding: '40px 20px',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s ease'
        }}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
          accept="image/*"
          style={{ display: 'none' }}
        />

        {loading && <div className="scanner-laser" />}

        {previewUrl ? (
          <div style={{ position: 'relative', display: 'inline-block', maxWidth: '100%', maxHeight: '320px' }}>
            <img
              src={previewUrl}
              alt="Selected Preview"
              style={{
                maxHeight: '280px',
                maxWidth: '100%',
                borderRadius: '12px',
                objectFit: 'cover',
                boxShadow: '0 8px 25px rgba(0,0,0,0.6)'
              }}
            />
            {loading && (
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(4, 8, 20, 0.65)',
                backdropFilter: 'blur(4px)',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px'
              }}>
                <Loader2 size={36} color="#00f2fe" style={{ animation: 'spin 1s linear infinite' }} />
                <span className="text-gradient-cyan" style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                  Extracting 512-D FaceNet Embeddings...
                </span>
              </div>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(0, 242, 254, 0.1)',
              border: '1px solid rgba(0, 242, 254, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <UploadCloud size={32} color="#00f2fe" />
            </div>
            <div>
              <p style={{ fontWeight: 600, fontSize: '1.05rem' }}>Drag and drop your image here</p>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.82rem', marginTop: '4px' }}>
                Supports JPG, PNG, WEBP (Max 10MB)
              </p>
            </div>
            <button className="btn-glass-secondary" type="button" style={{ marginTop: '8px' }}>
              <ImageIcon size={16} /> Browse Local File
            </button>
          </div>
        )}
      </div>

      {/* Action Controls */}
      {selectedFile && !loading && (
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <button className="btn-glass-primary" onClick={handleSubmit}>
            <Zap size={18} /> Identify Player Now
          </button>
          <button className="btn-glass-secondary" onClick={() => { setSelectedFile(null); setPreviewUrl(null); }}>
            Reset Image
          </button>
        </div>
      )}

      {/* Quick Sample Selector */}
      <div style={{ marginTop: '28px', borderTop: '1px solid var(--border-glass)', paddingTop: '20px' }}>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <Sparkles size={14} color="#00f2fe" /> Quick Try with Sample Photos:
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {SAMPLE_PLAYERS.map((sample, idx) => (
            <div
              key={idx}
              className="glass-card-interactive"
              onClick={() => handleSampleClick(sample)}
              style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <img src={sample.url} alt={sample.name} style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} />
              <span style={{ fontSize: '0.82rem', fontWeight: 500 }}>{sample.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

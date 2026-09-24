import React from 'react';
import { CheckCircle2, ShieldCheck, Timer, Award, UserCheck, Activity } from 'lucide-react';

export default function PredictionCard({ result, previewUrl, apiHost }) {
  if (!result) return null;

  const player = result.predicted_player || {};
  const confidence = result.confidence || 0;
  const bbox = result.face_bbox || [25, 20, 50, 60];

  // Full image path for backend hosted image
  const displayImage = previewUrl || `${apiHost}${result.image_url}`;

  return (
    <div className="glass-panel" style={{ padding: '32px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="glass-pill glass-pill-cyan">
            <UserCheck size={14} /> AI Identification Result
          </div>
          <div className="glass-pill glass-pill-purple">
            <Timer size={14} /> Latency: {result.execution_time_ms} ms
          </div>
        </div>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
          DB Log ID: #{result.id}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px', alignItems: 'center' }}>
        
        {/* Input Image with Face Bounding Box Overlay */}
        <div style={{ position: 'relative', width: '100%', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-glass)' }}>
          <img
            src={displayImage}
            alt="Analyzed Face"
            style={{ width: '100%', maxHeight: '360px', objectFit: 'contain', display: 'block', background: '#040812' }}
          />

          {/* Futuristic Face Bounding Box */}
          <div
            className="face-bbox-overlay"
            style={{
              left: `${bbox[0]}%`,
              top: `${bbox[1]}%`,
              width: `${bbox[2]}%`,
              height: `${bbox[3]}%`
            }}
          >
            <div className="face-bbox-tag">
              {player.name || result.predicted_player_name} ({confidence}%)
            </div>
          </div>
        </div>

        {/* Player Result Info Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {player.avatar_url && (
              <img
                src={player.avatar_url}
                alt={player.name}
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #00f2fe',
                  boxShadow: '0 0 15px rgba(0, 242, 254, 0.4)'
                }}
              />
            )}
            <div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
                {player.name || result.predicted_player_name}
              </h3>
              <p style={{ color: 'var(--accent-cyan)', fontWeight: 600, fontSize: '0.95rem' }}>
                {player.role || 'Indian National Cricketer'} {player.jersey_number ? `• Jersey #${player.jersey_number}` : ''}
              </p>
            </div>
          </div>

          {/* Confidence Meter Bar */}
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '16px', borderRadius: '14px', border: '1px solid var(--border-glass)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
              <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={16} color="#00f2fe" /> Model Confidence
              </span>
              <span style={{ fontWeight: 700, color: confidence > 90 ? '#00b09b' : '#ffb347' }}>
                {confidence}% Match
              </span>
            </div>
            
            <div style={{ width: '100%', height: '10px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '10px', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${confidence}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #00f2fe 0%, #00b09b 100%)',
                  borderRadius: '10px',
                  boxShadow: '0 0 10px #00f2fe',
                  transition: 'width 1s ease-out'
                }}
              />
            </div>
          </div>

          {/* Player Bio */}
          {player.bio && (
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              {player.bio}
            </p>
          )}

          {/* Key Attributes */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {player.batting_style && (
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block' }}>Batting Style</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{player.batting_style}</span>
              </div>
            )}
            {player.bowling_style && (
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block' }}>Bowling Style</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{player.bowling_style}</span>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#00b09b', marginTop: '4px' }}>
            <CheckCircle2 size={14} /> Logged in SQLite database & synced with player analytics
          </div>
        </div>

      </div>
    </div>
  );
}

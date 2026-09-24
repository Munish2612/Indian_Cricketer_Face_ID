import React, { useState } from 'react';
import { Award, Zap, Activity, Info, X } from 'lucide-react';

export default function PlayerGrid({ players = [] }) {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  return (
    <div style={{ marginTop: '32px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
          Indian Cricket Squad <span className="text-gradient-cyan">Target Roster</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '6px' }}>
          Trained deep learning dataset classes & recognition metrics
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '20px'
      }}>
        {players.map((player) => (
          <div
            key={player.id}
            className="glass-card-interactive"
            onClick={() => setSelectedPlayer(player)}
            style={{ padding: '20px', position: 'relative', overflow: 'hidden' }}
          >
            {/* Jersey Badge */}
            {player.jersey_number && (
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(0, 242, 254, 0.15)',
                border: '1px solid rgba(0, 242, 254, 0.4)',
                color: '#00f2fe',
                fontWeight: 800,
                fontSize: '0.8rem',
                padding: '2px 8px',
                borderRadius: '8px'
              }}>
                #{player.jersey_number}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <img
                src={player.avatar_url || 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=300'}
                alt={player.name}
                style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginBottom: '14px',
                  border: '2px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
                }}
              />

              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '4px' }}>
                {player.name}
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--accent-cyan)', fontWeight: 600, marginBottom: '14px' }}>
                {player.role}
              </p>

              {/* Recognition Stats */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
                width: '100%',
                background: 'rgba(0,0,0,0.2)',
                padding: '10px',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                fontSize: '0.78rem'
              }}>
                <div>
                  <span style={{ color: 'var(--text-dim)', display: 'block' }}>Scans</span>
                  <strong style={{ fontSize: '0.95rem' }}>{player.recognition_count}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-dim)', display: 'block' }}>Avg Conf</span>
                  <strong style={{ fontSize: '0.95rem', color: '#00b09b' }}>{player.avg_confidence}%</strong>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Player Bio Modal */}
      {selectedPlayer && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(4, 8, 20, 0.85)',
          backdropFilter: 'blur(12px)',
          zIndex: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div className="glass-panel" style={{ maxWidth: '480px', width: '100%', padding: '28px', position: 'relative' }}>
            <button
              onClick={() => setSelectedPlayer(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#fff',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={18} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <img
                src={selectedPlayer.avatar_url}
                alt={selectedPlayer.name}
                style={{ width: '96px', height: '96px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #00f2fe' }}
              />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '12px' }}>{selectedPlayer.name}</h3>
              <p style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>{selectedPlayer.role}</p>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '20px' }}>
              {selectedPlayer.bio}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '10px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block' }}>Batting Style</span>
                <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>{selectedPlayer.batting_style}</span>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '10px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block' }}>Bowling Style</span>
                <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>{selectedPlayer.bowling_style}</span>
              </div>
            </div>

            <button className="btn-glass-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setSelectedPlayer(null)}>
              Close Player Bio
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

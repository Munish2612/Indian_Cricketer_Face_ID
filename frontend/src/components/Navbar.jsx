import React from 'react';
import { ScanFace, Users, History, Cpu, Sparkles } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, apiOnline }) {
  return (
    <header style={{
      position: 'sticky',
      top: '16px',
      zIndex: 100,
      marginBottom: '32px'
    }}>
      <div className="glass-panel" style={{
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => setActiveTab('scanner')}>
          <div style={{
            background: 'linear-gradient(135deg, #00f2fe 0%, #7f00ff 100%)',
            padding: '10px',
            borderRadius: '12px',
            display: 'flex',
            boxShadow: '0 0 15px rgba(0, 242, 254, 0.4)'
          }}>
            <ScanFace size={24} color="#040814" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
              CRICKETER<span className="text-gradient-cyan">VISION</span>
            </h1>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Cpu size={11} color="#00f2fe" /> FaceNet AI & FastAPI Platform
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setActiveTab('scanner')}
            className={activeTab === 'scanner' ? 'btn-glass-primary' : 'btn-glass-secondary'}
            style={{ fontSize: '0.9rem', padding: '8px 16px' }}
          >
            <ScanFace size={16} /> AI Scanner
          </button>

          <button
            onClick={() => setActiveTab('squad')}
            className={activeTab === 'squad' ? 'btn-glass-primary' : 'btn-glass-secondary'}
            style={{ fontSize: '0.9rem', padding: '8px 16px' }}
          >
            <Users size={16} /> Team Roster
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={activeTab === 'history' ? 'btn-glass-primary' : 'btn-glass-secondary'}
            style={{ fontSize: '0.9rem', padding: '8px 16px' }}
          >
            <History size={16} /> Logs & Database
          </button>
        </nav>

        {/* API Status Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="glass-pill glass-pill-cyan">
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: apiOnline ? '#00b09b' : '#ff4b4b',
              boxShadow: apiOnline ? '0 0 8px #00b09b' : '0 0 8px #ff4b4b',
              display: 'inline-block'
            }} />
            {apiOnline ? 'FastAPI Online' : 'Connecting...'}
          </div>
        </div>
      </div>
    </header>
  );
}

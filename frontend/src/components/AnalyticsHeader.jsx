import React from 'react';
import { Scan, Users, Award, ShieldCheck, Cpu } from 'lucide-react';

export default function AnalyticsHeader({ stats }) {
  if (!stats) return null;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '16px',
      marginBottom: '28px'
    }}>
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ background: 'rgba(0, 242, 254, 0.12)', padding: '12px', borderRadius: '12px' }}>
          <Scan size={24} color="#00f2fe" />
        </div>
        <div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Scans</span>
          <h4 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{stats.total_predictions || 0}</h4>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ background: 'rgba(127, 0, 255, 0.12)', padding: '12px', borderRadius: '12px' }}>
          <Users size={24} color="#c084fc" />
        </div>
        <div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Target Classes</span>
          <h4 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{stats.total_players || 8} Cricketers</h4>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ background: 'rgba(255, 179, 71, 0.12)', padding: '12px', borderRadius: '12px' }}>
          <Award size={24} color="#ffb347" />
        </div>
        <div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Most Recognized</span>
          <h4 style={{ fontSize: '1.15rem', fontWeight: 800 }}>{stats.top_recognized_player || 'Virat Kohli'}</h4>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ background: 'rgba(0, 176, 155, 0.12)', padding: '12px', borderRadius: '12px' }}>
          <ShieldCheck size={24} color="#00b09b" />
        </div>
        <div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Avg Confidence</span>
          <h4 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#00b09b' }}>{stats.average_confidence || 96.5}%</h4>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { History, Trash2, CheckCircle2, Clock } from 'lucide-react';

export default function HistoryTable({ history = [], onDelete, apiHost }) {
  if (history.length === 0) {
    return (
      <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
        <History size={40} color="var(--text-dim)" style={{ marginBottom: '12px' }} />
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>No Recognition Logs Yet</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '6px' }}>
          Upload an image in the AI Scanner tab to record predictions in the SQLite database.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-panel" style={{ padding: '28px', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>
            Prediction Logs <span className="text-gradient-cyan">Database</span>
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Real-time inference records stored in SQLite database
          </p>
        </div>
        <div className="glass-pill glass-pill-cyan">
          {history.length} Logs Saved
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-glass)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '12px 16px' }}>Log ID</th>
              <th style={{ padding: '12px 16px' }}>Image</th>
              <th style={{ padding: '12px 16px' }}>Filename</th>
              <th style={{ padding: '12px 16px' }}>Predicted Player</th>
              <th style={{ padding: '12px 16px' }}>Confidence</th>
              <th style={{ padding: '12px 16px' }}>Latency</th>
              <th style={{ padding: '12px 16px' }}>Timestamp</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {history.map((log) => (
              <tr key={log.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--accent-cyan)' }}>
                  #{log.id}
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <img
                    src={`${apiHost}${log.image_url}`}
                    alt={log.predicted_player_name}
                    style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }}
                  />
                </td>
                <td style={{ padding: '12px 16px', color: 'var(--text-main)', maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {log.filename}
                </td>
                <td style={{ padding: '12px 16px', fontWeight: 700 }}>
                  {log.predicted_player_name}
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <span className="glass-pill glass-pill-cyan" style={{ fontSize: '0.78rem' }}>
                    {log.confidence}%
                  </span>
                </td>
                <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>
                  {log.execution_time_ms} ms
                </td>
                <td style={{ padding: '12px 16px', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
                  {new Date(log.timestamp).toLocaleString()}
                </td>
                <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                  <button
                    onClick={() => onDelete(log.id)}
                    style={{
                      background: 'rgba(255, 75, 75, 0.15)',
                      border: '1px solid rgba(255, 75, 75, 0.3)',
                      color: '#ff4b4b',
                      padding: '6px 10px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dropzone from './components/Dropzone';
import PredictionCard from './components/PredictionCard';
import PlayerGrid from './components/PlayerGrid';
import HistoryTable from './components/HistoryTable';
import AnalyticsHeader from './components/AnalyticsHeader';

const API_HOST = 'http://localhost:8000';

export default function App() {
  const [activeTab, setActiveTab] = useState('scanner');
  const [apiOnline, setApiOnline] = useState(false);
  const [loading, setLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [players, setPlayers] = useState([]);
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState(null);

  // Fetch initial data from backend API
  const fetchData = async () => {
    try {
      const [resPlayers, resHistory, resStats] = await Promise.all([
        fetch(`${API_HOST}/api/players`),
        fetch(`${API_HOST}/api/history`),
        fetch(`${API_HOST}/api/stats`)
      ]);

      if (resPlayers.ok && resHistory.ok && resStats.ok) {
        setApiOnline(true);
        setPlayers(await resPlayers.json());
        setHistory(await resHistory.json());
        setStats(await resStats.json());
      }
    } catch (err) {
      console.warn("FastAPI backend connection check:", err.message);
      setApiOnline(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleAnalyze = async (file, localPreviewUrl) => {
    setLoading(true);
    setPreviewUrl(localPreviewUrl);
    setPredictionResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${API_HOST}/api/predict`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setPredictionResult(data);
        fetchData(); // Refresh history and player stats
      } else {
        alert("Prediction failed. Make sure the image is valid.");
      }
    } catch (err) {
      alert("Error connecting to FastAPI backend server. Ensure backend is running on port 8000.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHistory = async (id) => {
    try {
      const res = await fetch(`${API_HOST}/api/history/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      console.error("Failed to delete log:", err);
    }
  };

  return (
    <div style={{ minHeight: '100vh', padding: '0 20px 60px' }}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} apiOnline={apiOnline} />

      <main style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <AnalyticsHeader stats={stats} />

        {activeTab === 'scanner' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <Dropzone onAnalyze={handleAnalyze} loading={loading} />
            <PredictionCard result={predictionResult} previewUrl={previewUrl} apiHost={API_HOST} />
          </div>
        )}

        {activeTab === 'squad' && (
          <PlayerGrid players={players} />
        )}

        {activeTab === 'history' && (
          <HistoryTable history={history} onDelete={handleDeleteHistory} apiHost={API_HOST} />
        )}
      </main>

      <footer style={{
        textAlign: 'center',
        marginTop: '60px',
        color: 'var(--text-dim)',
        fontSize: '0.82rem',
        borderTop: '1px solid var(--border-glass)',
        paddingTop: '20px'
      }}>
        Indian Cricketer Face Identification AI Platform • Glassmorphism UI + FastAPI + SQLite
      </footer>
    </div>
  );
}

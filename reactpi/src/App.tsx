import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/header';
import { HomePage } from './components/home-page';
import { MonitoringPage } from './components/monitoring-page';
import { EducationalPage } from './components/educational-page';
import { HistoryPage } from './components/history-page';
import { SettingsPage } from './components/settings-page';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Header />
        <main className="container mx-auto px-4 py-6 max-w-7xl">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/monitoring/:sowId" element={<MonitoringPage />} />
            <Route path="/educational" element={<EducationalPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

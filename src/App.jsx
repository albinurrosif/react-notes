import { Routes, Route } from 'react-router';

import HomePage from './pages/HomePage.jsx';
import CreatePage from './pages/CreatePage.jsx';
import NoteDetailPage from './pages/NoteDetailPage.jsx';
import Snowfall from 'react-snowfall';

import { useTheme } from './context/ThemeContext';

const App = () => {
  const { dark, bg } = useTheme();

  return (
    <div className="relative min-h-screen w-full">
      <div className="fixed inset-0 -z-10 pointer-events-none" style={bg} />

      <Snowfall color={dark ? '#ffffff' : '#64748b'} snowflakeCount={60} />
      <div className="absolute inset-0 -z-10" style={bg} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;

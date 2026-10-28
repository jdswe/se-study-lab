import { useEffect } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { I18nProvider } from './i18n';
import { useProgress } from './lib/store';
import { Home } from './pages/Home';
import { TermPage } from './pages/TermPage';
import { ModulePage } from './pages/ModulePage';
import { WeekPage } from './pages/WeekPage';
import { Flashcards } from './pages/Flashcards';
import { Quizzes } from './pages/Quizzes';
import { Labs } from './pages/Labs';
import { Playground } from './pages/Playground';
import { Planner } from './pages/Planner';
import { ProgressPage } from './pages/ProgressPage';
import { ResourceLibrary } from './pages/ResourceLibrary';
import { Settings } from './pages/Settings';
import { NotFound } from './pages/NotFound';

/** Applies theme and language to the document; keeps <html> in sync with settings. */
function DocumentSync() {
  const { theme, locale } = useProgress();
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'system') delete root.dataset.theme;
    else root.dataset.theme = theme;
  }, [theme]);
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}

/** Reduced motion: honour the system setting, plus an explicit toggle saved locally. */
function readReduceMotion(): boolean {
  try {
    return window.localStorage.getItem('se-study-lab:reduce-motion') === '1';
  } catch {
    return false;
  }
}

export default function App() {
  if (typeof document !== 'undefined' && readReduceMotion()) {
    document.documentElement.classList.add('reduce-motion');
  }
  return (
    <I18nProvider>
      <DocumentSync />
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/term/:term" element={<TermPage />} />
            <Route path="/term/:term/module/:module" element={<ModulePage />} />
            <Route path="/curriculum" element={<Navigate to="/" replace />} />
            <Route path="/week/:weekId" element={<WeekPage />} />
            <Route path="/week/:weekId/:tab" element={<WeekPage />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/quizzes/:weekId" element={<Quizzes />} />
            <Route path="/labs" element={<Labs />} />
            <Route path="/playground" element={<Playground />} />
            <Route path="/planner" element={<Planner />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/resources" element={<ResourceLibrary />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </HashRouter>
    </I18nProvider>
  );
}

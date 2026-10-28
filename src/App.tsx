import { useEffect } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { I18nProvider } from './i18n';
import { useProgress } from './lib/store';
import { Home } from './pages/Home';
import { TermPage } from './pages/TermPage';
import { ModulePage } from './pages/ModulePage';
import { SubjectPage } from './pages/SubjectPage';
import { WeekPage } from './pages/WeekPage';
import { Settings } from './pages/Settings';
import { NotFound } from './pages/NotFound';

/** Applies theme and language to the document; keeps <html> in sync with settings. */
function DocumentSync() {
  const { theme, locale, reduceMotion } = useProgress();
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'system') delete root.dataset.theme;
    else root.dataset.theme = theme;
  }, [theme]);
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  useEffect(() => {
    document.documentElement.classList.toggle('reduce-motion', reduceMotion);
  }, [reduceMotion]);
  return null;
}

export default function App() {
  return (
    <I18nProvider>
      <DocumentSync />
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/term/:term" element={<TermPage />} />
            <Route path="/term/:term/module/:module" element={<ModulePage />} />
            <Route path="/term/:term/module/:module/:subject" element={<SubjectPage />} />
            <Route path="/term/:term/module/:module/:subject/:section" element={<SubjectPage />} />
            <Route path="/week/:weekId" element={<WeekPage />} />
            <Route path="/week/:weekId/:tab" element={<WeekPage />} />
            <Route path="/settings" element={<Settings />} />
            {/* Old top-level study pages now live inside each subject. */}
            {['/curriculum', '/flashcards', '/quizzes', '/quizzes/:id', '/labs', '/planner', '/progress', '/resources', '/playground'].map((path) => (
              <Route key={path} path={path} element={<Navigate to="/" replace />} />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </HashRouter>
    </I18nProvider>
  );
}

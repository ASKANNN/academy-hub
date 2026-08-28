import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/tokens.css';
import './styles/base.css';
import './styles/app.css';
import './styles/algorithms.css';
import './styles/architecture.css';
import './styles/accessibility.css';
import { Layout } from './components/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import AlgorithmsCatalogPage from './pages/AlgorithmsCatalogPage.jsx';
import AlgorithmsCategoryPage from './pages/AlgorithmsCategoryPage.jsx';
import AlgorithmDetailPage from './pages/AlgorithmDetailPage.jsx';
import ArchitecturalPatternsCatalogPage from './pages/ArchitecturalPatternsCatalogPage.jsx';
import ArchitecturalPatternsCategoryPage from './pages/ArchitecturalPatternsCategoryPage.jsx';
import ArchitecturalPatternDetailPage from './pages/ArchitecturalPatternDetailPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="algorithms" element={<AlgorithmsCatalogPage />} />
          <Route path="algorithms/:category" element={<AlgorithmsCategoryPage />} />
          <Route path="algorithms/:category/:slug" element={<AlgorithmDetailPage />} />
          <Route path="architectural-patterns" element={<ArchitecturalPatternsCatalogPage />} />
          <Route path="architectural-patterns/:category" element={<ArchitecturalPatternsCategoryPage />} />
          <Route path="architectural-patterns/:category/:slug" element={<ArchitecturalPatternDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);

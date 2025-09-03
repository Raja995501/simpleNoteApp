import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import App from './App';
import NoteList from './pages/NoteList';
import EditNote from './pages/EditNote';
import PublicNote from './pages/PublicNote';

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<NoteList />} />
          <Route path="edit/:id" element={<EditNote />} />
          <Route path="n/:slug" element={<PublicNote />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);

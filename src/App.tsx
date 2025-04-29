import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { HomeView } from './features/HomeView';
import { HubView } from './features/HubView';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/hub" element={<HubView />} />
      </Routes>
    </BrowserRouter>
  );
};
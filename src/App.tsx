import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomeView } from './features/HomeView';
import { HubView } from './features/HubView';

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/hub" element={<HubView />} />
      </Routes>
    </Router>
  );
};
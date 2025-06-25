import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { HomeView } from './features/HomeView';
import { HubView } from './features/HubView';
import { CharactersView } from './features/CharactersView';
import { FindCharacter } from './features/FindCharacter/FindCharacter';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/hub" element={<HubView />} />
        <Route path="/characters" element={<CharactersView />} />
        <Route path="/find-character" element={<FindCharacter />} />
      </Routes>
    </BrowserRouter>
  );
};
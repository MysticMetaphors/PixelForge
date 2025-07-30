import { Routes, Route } from 'react-router-dom';
import MainLayout from './Layouts/MainLayout';

import Welcome from './Pages/Welcome';
import Gallery from './Pages/Gallery';
import Creators from './Pages/Creators';
import About from './Pages/About';
import Fonts from './Pages/Fonts';
import AI from './Pages/AI';
import CreatorsWorks from './Pages/CreatorsWorks';

export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/gallery/:category" element={<Gallery />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/creators" element={<Creators />} />
        <Route path="/about" element={<About />} />
        <Route path="/fonts" element={<Fonts />} />
        <Route path="/ai" element={<AI />} />
        <Route path="/works/:id" element={<CreatorsWorks />} />
      </Routes>
    </MainLayout>
  );
}

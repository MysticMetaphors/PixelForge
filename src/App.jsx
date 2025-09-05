import { Routes, Route } from 'react-router-dom';
import MainLayout from './Layouts/MainLayout';

import Welcome from './Pages/Welcome';
import Gallery from './Pages/Gallery';
import Creators from './Pages/Creators';
import About from './Pages/About';
import Fonts from './Pages/Fonts';
import AI from './Pages/AI';
import CreatorsWorks from './Pages/CreatorsWorks';
// import Report from './Pages/Report';
// import Contact from './Pages/Contact';

import NotFound from './Pages/Error/NotFound';
import Forbidden from './Pages/Error/Forbidden';
import DashboardLayout from './Layouts/DashboardLayout';
import Dashboard from './Pages/Dashboard/Dashboard';

export default function App() {
  return (
    // <MainLayout>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Welcome />} />
          <Route path="/gallery/:category" element={<Gallery />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/creators" element={<Creators />} />
          <Route path="/about" element={<About />} />
          <Route path="/fonts" element={<Fonts />} />
          <Route path="/ai" element={<AI />} />
          <Route path="/works/:id" element={<CreatorsWorks />} />

          {/* <Route path="/report" element={<Report />}/>
        <Route path="/contact" element={<Contact />}/> */}

          <Route path="/404" element={<NotFound />} />
          <Route path="/403" element={<Forbidden />} />

          <Route path='*' element={<NotFound />} />
        </Route>

        <Route element={<DashboardLayout />}>
          <Route path='/dashboard' element={<Dashboard />}/>
        </Route>
      </Routes>
    // </MainLayout>
  );
}

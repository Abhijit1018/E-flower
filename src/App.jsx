import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import AppRoutes from './AppRoutes';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <div className="app">
          <Header />
          <main>
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;

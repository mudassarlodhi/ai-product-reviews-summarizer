import ReviewList from './components/reviews/ReviewList';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/products/ProductsHome';
import './App.css';

function App() {
   return (
      <div className="p-4 h-screen">
         <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ReviewList />} />
         </Routes>
      </div>
   );
}

export default App;

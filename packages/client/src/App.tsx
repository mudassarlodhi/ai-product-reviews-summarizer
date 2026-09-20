import ReviewList from './components/reviews/ReviewList';
import './App.css';

function App() {
   return (
      <div className="p-4 h-screen">
         <ReviewList productId={2} />
      </div>
   );
}

export default App;

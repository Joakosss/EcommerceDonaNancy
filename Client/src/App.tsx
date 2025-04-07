import "./App.css";
import CategoryPreviews from "./components/CategoryPreviews";
import Footer from "./components/Footer";

import Navbar from "./components/Navbar";
import PromoSection from "./components/PromoSection";
import TrendingProducts from "./components/TrendingProducts";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <CategoryPreviews/>
      <TrendingProducts/>
      <PromoSection/>
      <Footer/>
      
    </>
  );
}

export default App;

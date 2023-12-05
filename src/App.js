import React from "react";
import "./App.css";
import { Header } from "./components/Header/Header";
import Review from "./pages/Review/Review";

function App() {
  return (
    <div className='App'>
      <Header />
      <main>
        <Review />
      </main>
    </div>
  );
}

export default App;

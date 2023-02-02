import {v4 as uuidv4 } from 'uuid';
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import FeedbackData from "./data/FeedbackData";
import FeedbackList from "./components/FeedbackList";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";
import AboutPage from './pages/AboutPage';
import AboutIconLink from './components/AboutIconLink';
import { FeedbackProvider } from './context/FeedbackContext';

function App () {
  const [feedback, setFeedback] = useState(FeedbackData);

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  }

  const deleteFeedback = (id) => {
    setFeedback((feedback).filter((item) => item.id !== id));
  }
  return (
    <FeedbackProvider>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route 
              exact 
              path='/' 
              element={
                <>
                  <FeedbackForm handleAdd={addFeedback}/>
                  <FeedbackStats />
                  <FeedbackList handleDelete={deleteFeedback}/>
                  <AboutIconLink />
                </>
            }>
            </Route>
            <Route path='/about/' element={<AboutPage />} />
          </Routes>
        </div>
      </Router> 
    </FeedbackProvider>
    
  )
}

export default App;
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [facts, setFacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/facts')
      .then(res => {
        setFacts(res.data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  if (loading) return <div style={{padding: '20px'}}>Loading facts...</div>;

  return (
    <div className='App'>
      <h1>My First Facts App!</h1>
      <div className='fact'>
        {facts.map((fact, i) => (
          <div key={i} className='facts'>
            {fact.text}
          </div>
        ))} 
      </div>
    </div>
  );
}

export default App;

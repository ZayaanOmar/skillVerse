import { useEffect, useState } from 'react';

function App() {

  //testing the /api route from backend
  const [message, setMessage] = useState('');

  useEffect(() => {

    fetch('/api')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <header>
        <h1>Frontend + Backend Test</h1>
        <p>{"Loading..."}</p>
        <p>{message}</p>
      </header>
    </div>
  );
}

export default App;
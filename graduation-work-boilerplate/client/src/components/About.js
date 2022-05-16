import React, { useState, useEffect } from 'react';

function App() {
    // Isprati HTTP req do server endpoint
    const [message, setMessage] = useState(null);
    const [isDataFetched, setIsDataFetched] = useState(false);

    // React hook
    useEffect(() => {
        // call server
        const sendRequest = async () => {
            const res = await fetch('http://localhost:3000/message');
            const data = await res.json();
            
            setMessage(data.message);
            setIsDataFetched(true);
        }

        sendRequest();
    }, []);
    
    // If message is not fetched from the server yet
    if(isDataFetched) {
        return (
            <div>
                <h1>About page</h1>
                <p>Message from backend: { message }</p>
            </div>
        );
    }

    return (
      <div>
          Loading...
      </div>
    );
}
  
export default App;
  
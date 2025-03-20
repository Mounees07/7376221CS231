import React, { useState } from "react";

const API_URL = "https://www.random.org/integers/?num=4&min=1&max=50&col=1&base=10&format=plain&rnd=new";


const NumberFetcher = () => {
  const [windowPrevState, setWindowPrevState] = useState([]);
  const [windowCurrState, setWindowCurrState] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [avg, setAvg] = useState(0);
  const [error, setError] = useState(null);

  const fetchNumbers = async () => {
    try {
      setError(null);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch numbers");

      // Process response
      const text = await response.text();
      const newNumbers = text.trim().split("\n").map(Number); // Convert text to array of numbers

      // Maintain previous state
      setWindowPrevState([...windowCurrState]);

      // Update current state
      setWindowCurrState([...newNumbers]);

      // Store numbers received
      setNumbers([...newNumbers]);

      // Calculate average
      const average = newNumbers.reduce((acc, num) => acc + num, 0) / newNumbers.length;
      setAvg(parseFloat(average.toFixed(2))); // Round to 2 decimal places
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Number Fetcher</h2>
      <button onClick={fetchNumbers}>Fetch Numbers</button>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <pre>
        {JSON.stringify(
          {
            windowPrevState,
            windowCurrState,
            numbers,
            avg
          },
          null,
          2
        )}
      </pre>
    </div>
  );
};

export default NumberFetcher;

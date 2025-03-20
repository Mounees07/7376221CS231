import React, { useState } from "react";

const API_PRIME_URL = "http://20.244.56.144/test/primes"; // Fetch Prime Numbers
const API_FIB_URL = "http://20.244.56.144/test/fibonacci"; // Fetch Fibonacci Numbers
const API_RANDOM_URL = "http://20.244.56.144/test/random"; // Fetch Random Numbers

const NumberProcessor = () => {
  const [numbers, setNumbers] = useState([]);
  const [primeNumbers, setPrimeNumbers] = useState([]);
  const [fibonacciNumbers, setFibonacciNumbers] = useState([]);
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to check if a number is prime
  const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  // Function to generate Fibonacci numbers up to a limit
  const generateFibonacci = (limit) => {
    let fib = [0, 1];
    while (fib[fib.length - 1] + fib[fib.length - 2] < limit) {
      fib.push(fib[fib.length - 1] + fib[fib.length - 2]);
    }
    return fib;
  };

  // Function to fetch numbers from an API
  const fetchNumbers = async (url, type) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch numbers");

      const data = await response.json();
      const newNumbers = data.numbers; // Extract numbers from response

      setNumbers(newNumbers);

      if (type === "prime") setPrimeNumbers(newNumbers);
      if (type === "fibonacci") setFibonacciNumbers(newNumbers);
      if (type === "random") setRandomNumbers(newNumbers);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Number Processor</h2>

      <button onClick={() => fetchNumbers(API_PRIME_URL, "prime")} disabled={loading}>
        {loading ? "Fetching..." : "Fetch Prime Numbers"}
      </button>

      <button onClick={() => fetchNumbers(API_FIB_URL, "fibonacci")} disabled={loading}>
        {loading ? "Fetching..." : "Fetch Fibonacci Numbers"}
      </button>

      <button onClick={() => fetchNumbers(API_RANDOM_URL, "random")} disabled={loading}>
        {loading ? "Fetching..." : "Fetch Random Numbers"}
      </button>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <h3>Fetched Numbers:</h3>
      <p>{numbers.length ? numbers.join(", ") : "None"}</p>

      <h3>Prime Numbers:</h3>
      <p>{primeNumbers.length ? primeNumbers.join(", ") : "None"}</p>

      <h3>Fibonacci Numbers:</h3>
      <p>{fibonacciNumbers.length ? fibonacciNumbers.join(", ") : "None"}</p>

      <h3>Random Numbers:</h3>
      <p>{randomNumbers.length ? randomNumbers.join(", ") : "None"}</p>
    </div>
  );
};

export default NumberProcessor;

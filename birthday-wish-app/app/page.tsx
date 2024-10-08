'use client';

import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti'; // Import the confetti library

export default function Home() {
  const [name, setName] = useState(''); // To store the user's input
  const [showWish, setShowWish] = useState(false); // To toggle between form and message

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowWish(true); // Show the birthday wish after form submission
    triggerConfetti(); // Trigger confetti when showing the birthday wish
  };

  // Define handleGoBack function to reset the state
  const handleGoBack = () => {
    setShowWish(false); // Reset to show the form again
    setName(''); // Clear the name input field
  };

  // Trigger confetti when birthday wish is shown
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.5, y: 0.6 }, // Provide both x and y coordinates
    });
  };

  // Balloons effect: Falling from top to bottom
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (showWish) {
      // Trigger balloons immediately when the birthday wish is shown
      interval = setInterval(() => {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        document.body.appendChild(balloon);

        setTimeout(() => {
          balloon.remove();
        }, 8000); // Remove the balloon after 8 seconds
      }, 500); // Create a balloon every 500 milliseconds
    }

    // Clean up the interval and balloons when going back or when the component unmounts
    return () => {
      if (interval) clearInterval(interval);
      const allBalloons = document.querySelectorAll('.balloon');
      allBalloons.forEach((balloon) => balloon.remove());
    };
  }, [showWish]); // Effect runs only when `showWish` changes

  return (
    <div className="min-h-screen flex flex-col items-center justify-center custom-background">
      {!showWish ? (
        <div className="p-6 bg-white rounded shadow-md">
          <h1 className="text-2xl font-bold custom-heading mb-4">Enter Your Name</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 w-full mb-4"
              placeholder="Your Name"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div className="p-6 bg-white rounded shadow-md relative">
          <h1 className="text-3xl font-bold custom-heading mb-4">Happy Birthday {name}!</h1>
          <p className="text-lg custom-text">Wishing you a day filled with happiness and a year filled with joy.</p>

          {/* Balloons and confetti are triggered automatically */}

          <button
            onClick={handleGoBack} // Reset to go back to the form
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  );
}

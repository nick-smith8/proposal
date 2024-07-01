import React, { useState } from 'react';
import { ArrowUp, ArrowLeft, ArrowRight, X } from 'lucide-react';

const backgrounds = [
  '/api/placeholder/1920/1080',
  '/api/placeholder/1920/1080',
  '/api/placeholder/1920/1080',
  '/api/placeholder/1920/1080',
  '/api/placeholder/1920/1080',
];

export default function ProposalGame() {
  const [password, setPassword] = useState('');
  const [stage, setStage] = useState(0);
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [showTreasure, setShowTreasure] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password.toLowerCase() === 'nancy drew') {
      setStage(1);
    }
  };

  const handleArrowClick = (direction) => {
    let newIndex = backgroundIndex;
    switch (direction) {
      case 'left':
        newIndex = (backgroundIndex - 1 + backgrounds.length) % backgrounds.length;
        break;
      case 'right':
        newIndex = (backgroundIndex + 1) % backgrounds.length;
        break;
      case 'up':
        newIndex = (backgroundIndex + 2) % backgrounds.length;
        break;
    }
    setBackgroundIndex(newIndex);
    setShowTreasure(newIndex === 2);
  };

  const CustomDialog = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 max-w-sm w-full">
          <div className="flex justify-end">
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  if (stage === 0) {
    return (
      <div className="h-screen w-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold mb-8">Detective's Secret Case</h1>
        <p className="text-lg mb-8 text-center max-w-md">
          To unlock this case, you need to find the password. 
          Here's a clue: It's the name of a famous young female detective. 
          Two words, no spaces.
        </p>
        <form onSubmit={handlePasswordSubmit} className="w-full max-w-sm">
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white mb-4"
            placeholder="Enter password"
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Unlock Case
          </button>
        </form>
      </div>
    );
  }

  return (
    <div 
      className="h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${backgrounds[backgroundIndex]})` }}
    >
      <div className="fixed top-4 left-4">
        <button onClick={() => handleArrowClick('left')} className="text-white p-2 bg-black bg-opacity-50 rounded-full">
          <ArrowLeft size={24} />
        </button>
      </div>
      <div className="fixed top-4 right-4">
        <button onClick={() => handleArrowClick('right')} className="text-white p-2 bg-black bg-opacity-50 rounded-full">
          <ArrowRight size={24} />
        </button>
      </div>
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
        <button onClick={() => handleArrowClick('up')} className="text-white p-2 bg-black bg-opacity-50 rounded-full">
          <ArrowUp size={24} />
        </button>
      </div>
      {showTreasure && (
        <button 
          onClick={() => setShowPopup(true)} 
          className="bg-yellow-500 p-4 rounded-lg shadow-lg hover:bg-yellow-600 transition-colors"
        >
          Open Treasure Chest
        </button>
      )}
      <CustomDialog isOpen={showPopup} onClose={() => setShowPopup(false)}>
        <h2 className="text-2xl font-bold mb-4">You've found the treasure!</h2>
        <p className="mb-4">
          Congratulations! You've solved the mystery and found the ring. 
          Will you marry me?
        </p>
      </CustomDialog>
    </div>
  );
}
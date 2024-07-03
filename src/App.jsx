import React, { useState } from 'react';
import { ArrowUp, ArrowLeft, ArrowRight, ArrowDown, SearchCheck, Gem, X } from 'lucide-react';
import { ReactTyped } from "react-typed";

let upstairs_left_final = {
  image: '/upstairs_left_final.png',
  down: {},
}

let upstairs_right_final = {
  image: '/upstairs_right_final.png',
  down: '',
}

let upstairs_landing = {
  image: '/upstairs_landing.png',
  down: '',
  right: upstairs_right_final,
  left: upstairs_left_final
}


let downstairs_left_final = {
  image: '/downstairs_left_final.png',
  down: '',
}
let downstairs_right_final = {
  image: '/downstairs_right_final.png',
  down: '',
}
let downstairs_landing = {
  image: '/downstairs_landing.png',
  down: '',
  right: downstairs_right_final,
  left: downstairs_left_final
}


let main_left_final = {
  image: '/main_left_final.png',
  down: '',
}

let main_right_final = {
  image: '/main_right_final.png',
  down: '',
}

const main_landing = {
  image: '/main_entrance.png',
  down: downstairs_landing,
  up: upstairs_landing,
  right: main_right_final,
  left: main_left_final
}

upstairs_left_final.down = upstairs_landing
upstairs_right_final.down = upstairs_landing

main_right_final.down = main_landing
main_left_final.down = main_landing

downstairs_right_final = downstairs_landing
downstairs_left_final.down = downstairs_landing

upstairs_landing.down = main_landing
downstairs_left_final.down = main_landing

export default function ProposalGame() {
  const [password, setPassword] = useState('');
  const [stage, setStage] = useState(0);
  const [background, setBackground] = useState(main_landing);
  const [showTreasure, setShowTreasure] = useState(false);
  const [foundTools, setFoundTools] = useState(false);
  const [visitedFinal, setVisitedFinal] = useState(false);

  const [showPopup, setShowPopup] = useState(false);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password.toLowerCase() === 'nancydrew1') {
      setStage(1);
    }
  };

  const handleArrowClick = (background) => {
    setBackground(background)
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
      <>
        <div className="h-screen w-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
          <img src="/xenia.png" width={300} />
          <div className='text-center max-w-[400px]'>
            <ReactTyped strings={["I've moved on from stealing art to something far more valuable! No one will be able to find what I've taken. Muahaha! To unlock this case, you need to find the password.  Seek the furry friend who purrs with delight, for on their coat, your clue hides in plain sight."]} typeSpeed={100} />
          </div>


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
          <footer className='min-h-[50px] fixed bottom-4'>&copy; Nick Interactive</footer>
        </div>
      </>


    );
  }

  if (background.image == '/upstairs_left_final.png' && visitedFinal === false) {
    setVisitedFinal(true)
  }

  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${background.image})` }}
    >
      {
        background.left &&
        <div className="fixed top-1/2 left-4">
          <button onClick={() => handleArrowClick(background.left)} className="text-white p-2 bg-black bg-opacity-50 rounded-full">
            <ArrowLeft size={24} />
          </button>
        </div>
      }

      {
        background.right &&

        <div className="fixed top-1/2 right-4">
          <button onClick={() => handleArrowClick(background.right)} className="text-white p-2 bg-black bg-opacity-50 rounded-full">
            <ArrowRight size={24} />
          </button>
        </div>
      }


      {
        background.up &&
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2">
          <button onClick={() => handleArrowClick(background.up)} className="text-white p-2 bg-black bg-opacity-50 rounded-full">
            <ArrowUp size={24} />
          </button>
        </div>
      }


      {
        background.down &&
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
          <button onClick={() => handleArrowClick(background.down)} className="text-white p-2 bg-black bg-opacity-50 rounded-full">
            <ArrowDown size={24} />
          </button>
        </div>
      }
      {visitedFinal && background.image == '/downstairs_left_final.png' && (
        <div className='fixed top-4 right-4'>
          <button onClick={() => {
            setFoundTools(true)
            alert('Any sleuth worth their salt would have tools. I would start by investigating this room. IRL.  There are 4 tools you need to find')
          }} className=" text-white p-2 bg-black bg-opacity-50 rounded-full">
            <SearchCheck size={100} />
          </button>
        </div>

      )}

      {background.image == '/upstairs_left_final.png' && (
        <button
          disabled={!foundTools}
          onClick={() => setShowPopup(true)}
          className="bg-yellow-500 p-4 rounded-lg shadow-lg hover:bg-yellow-600 transition-colors"
        >
          {!foundTools ? 'Hmm you will need true detective tools to access this.  Keep looking' : ''}
          {foundTools && <Gem size={100} />}
        </button>

      )}
      <CustomDialog isOpen={showPopup} onClose={() => setShowPopup(false)}>
        <h2 className="text-2xl font-bold mb-4">Wow you are a true sleuth! You've discovered what Xenia took virtually, but you need to keep searching... </h2>
        <p className="mb-4">
          Go to the place where we unexpectedly stayed during that unique 2020 year.
        </p>
      </CustomDialog>
    </div>
  );
}



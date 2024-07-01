import React, { useState } from 'react';
import { ArrowUp, ArrowLeft, ArrowRight, ArrowDown, X } from 'lucide-react';



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
  const [showPopup, setShowPopup] = useState(false);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password.toLowerCase() === 'nancy drew') {
      setStage(1);
    }
  };

  const handleArrowClick = (background) => {
    setBackground(background)

    // setShowTreasure(newIndex === 2);
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

  // if (stage === 0) {
  //   return (
  //     <div className="h-screen w-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
  //       <h1 className="text-4xl font-bold mb-8">Detective's Secret Case</h1>
  //       <p className="text-lg mb-8 text-center max-w-md">
  //         To unlock this case, you need to find the password. 
  //         Here's a clue: It's the name of a famous young female detective. 
  //         Two words, no spaces.
  //       </p>
  //       <form onSubmit={handlePasswordSubmit} className="w-full max-w-sm">
  //         <input
  //           type="text"
  //           value={password}
  //           onChange={(e) => setPassword(e.target.value)}
  //           className="w-full px-4 py-2 rounded bg-gray-800 text-white mb-4"
  //           placeholder="Enter password"
  //         />
  //         <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
  //           Unlock Case
  //         </button>
  //       </form>
  //     </div>
  //   );
  // }

  console.log(background.image)

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
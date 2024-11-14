import React, { useRef, useState } from 'react';
import cross from "../assets/cross.png";
import circle from "../assets/circle.png";

const TicTacToe = () => {
  const [count, setCount] = useState(0); // Track moves
  const [lock, setLock] = useState(false); // Lock board after game ends
  const [board, setBoard] = useState(Array(9).fill(null)); // Track board state
  const [winner, setWinner] = useState(null); // Track the winner

  const title = useRef(null);

  // Winning combinations for Tic Tac Toe
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  const checkWinner = (newBoard) => {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        setLock(true); // Lock the board if we have a winner
        setWinner(newBoard[a]);
        return;
      }
    }
    // If all cells are filled and there's no winner, it's a draw
    if (!newBoard.includes(null)) {
      setWinner('Draw');
      setLock(true);
    }
  };

  const handleClick = (index) => {
    if (lock || board[index]) return; // Prevent clicking if game is locked or cell is filled

    const newBoard = [...board];
    newBoard[index] = count % 2 === 0 ? 'X' : 'O';
    setBoard(newBoard);
    setCount(count + 1);
    checkWinner(newBoard);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCount(0);
    setLock(false);
    setWinner(null);
  };

  return (
    <div className='flex flex-col items-center mt-12 h-screen'>
      <h1 className="text-4xl mb-4">Tic Tac Toe</h1>
      <div ref={title} className="text-2xl mb-4">
        {winner ? (winner === 'Draw' ? "It's a Draw!" : `${winner} Wins!`) : `Player ${count % 2 === 0 ? 'X' : 'O'}'s Turn`}
      </div>
      <div className='grid grid-cols-3 gap-2'>
        {board.map((cell, index) => (
          <div
            key={index}
            className='boxes w-20 h-20 flex items-center justify-center rounded-md bg-gray-200 text-3xl cursor-pointer'
            onClick={() => handleClick(index)}
          >
            {cell === 'X' && <img src={cross} alt="X" className="w-12 h-12" />}
            {cell === 'O' && <img src={circle} alt="O" className="w-12 h-12" />}
          </div>
        ))}
      </div>
      <button
        onClick={resetGame}
        className='mt-4 text-white text-3xl bg-blue-900 py-2 px-4 rounded-md'
      >
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;

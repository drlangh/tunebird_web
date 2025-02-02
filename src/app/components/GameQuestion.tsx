import React from 'react';

interface GameQuestionProps {
  question: string;
  options: string[];
  onAnswer: (answer: string) => void;
}

const GameQuestion: React.FC<GameQuestionProps> = ({ question, options, onAnswer }) => {
  return (
    <div>
      <h2>{question}</h2>
      <ul>
        {options.map((option, index) => (
          <li key={index}>
            <button onClick={() => onAnswer(option)}>{option}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameQuestion;

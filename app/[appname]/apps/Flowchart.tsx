'use client';

import { useState } from 'react';
import styles from './Flowchart.module.css';

export type QuestionId = 
  | 'start'
  | 'none_spirituality'
  | 'none_pleasures'
  | 'one_separate'
  | 'one_interact'
  | 'one_jesus'
  | 'one_messiah'
  | 'one_idols'
  | 'many_reincarnation';

export type Answer = string;
export type Religion = string;

export interface Question {
  id: QuestionId;
  text: string;
  answers: { value: Answer; next: QuestionId | Religion }[];
}

export const questions: Record<QuestionId, Question> = {
  start: {
    id: 'start',
    text: 'How many Gods do you believe in?',
    answers: [
      { value: 'none', next: 'none_spirituality' },
      { value: 'one', next: 'one_separate' },
      { value: 'many', next: 'many_reincarnation' },
    ],
  },
  none_spirituality: {
    id: 'none_spirituality',
    text: 'Do you believe in any kind of spirituality?',
    answers: [
      { value: 'no', next: 'Atheist' },
      { value: 'yes', next: 'none_pleasures' },
    ],
  },
  none_pleasures: {
    id: 'none_pleasures',
    text: 'Should you deny yourself pleasures?',
    answers: [
      { value: 'yes', next: 'Buddhist' },
      { value: 'no', next: 'Spiritual but not religious' },
    ],
  },
  one_separate: {
    id: 'one_separate',
    text: 'Is God separate from the universe?',
    answers: [
      { value: 'yes', next: 'one_interact' },
      { value: 'no', next: 'one_idols' },
    ],
  },
  one_interact: {
    id: 'one_interact',
    text: 'Does God interact with the universe?',
    answers: [
      { value: 'no', next: 'Deist' },
      { value: 'yes', next: 'one_jesus' },
    ],
  },
  one_jesus: {
    id: 'one_jesus',
    text: 'Did God become human in Jesus?',
    answers: [
      { value: 'yes', next: 'Christian' },
      { value: 'no', next: 'one_messiah' },
    ],
  },
  one_messiah: {
    id: 'one_messiah',
    text: 'Is Jesus still the messiah?',
    answers: [
      { value: 'yes', next: 'Muslim' },
      { value: 'no', next: 'Jewish' },
    ],
  },
  one_idols: {
    id: 'one_idols',
    text: 'Can you worship idols?',
    answers: [
      { value: 'no', next: 'Sikh' },
      { value: 'yes', next: 'Pagan' },
    ],
  },
  many_reincarnation: {
    id: 'many_reincarnation',
    text: 'Do you believe in reincarnation?',
    answers: [
      { value: 'no', next: 'Pagan' },
      { value: 'yes', next: 'Hindu' },
    ],
  },
};

export default function Flowchart() {
  const [currentQuestionId, setCurrentQuestionId] = useState<QuestionId | Religion>('start');
  const [result, setResult] = useState<Religion | null>(null);

  const handleAnswer = (next: QuestionId | Religion) => {
    if (next in questions) {
      setCurrentQuestionId(next as QuestionId);
    } else {
      setResult(next as Religion);
      setCurrentQuestionId(next as Religion);
    }
  };

  const startOver = () => {
    setCurrentQuestionId('start');
    setResult(null);
  };

  const currentQuestion = questions[currentQuestionId as QuestionId];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Which religion are you?</h1>
      <p className={styles.description}>
        Answer a series of questions to discover which religion aligns with your beliefs.
      </p>

      <div className={styles.flowchartArea}>
        {result ? (
          <div className={styles.resultContainer}>
            <div className={styles.resultTitle}>Your Result:</div>
            <div className={styles.result}>{result}</div>
            <button className={styles.button} onClick={startOver}>
              Start Over
            </button>
          </div>
        ) : currentQuestion ? (
          <div className={styles.questionContainer}>
            <div className={styles.question}>{currentQuestion.text}</div>
            <div className={styles.answers}>
              {currentQuestion.answers.map((answer, index) => (
                <button
                  key={index}
                  className={styles.answerButton}
                  onClick={() => handleAnswer(answer.next)}
                >
                  {answer.value.charAt(0).toUpperCase() + answer.value.slice(1)}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

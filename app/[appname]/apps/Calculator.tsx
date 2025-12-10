'use client';

import { useState } from 'react';
import styles from './Calculator.module.css';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setExpression('');
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (expression === '') {
      setExpression(`${inputValue} ${nextOperator}`);
    } else {
      const result = calculate();
      setDisplay(String(result));
      setExpression(`${result} ${nextOperator}`);
    }
    setWaitingForOperand(true);
  };

  const calculate = () => {
    const parts = expression.split(' ');
    const leftOperand = parseFloat(parts[0]);
    const operator = parts[1];
    const rightOperand = parseFloat(display);

    switch (operator) {
      case '+':
        return leftOperand + rightOperand;
      case '-':
        return leftOperand - rightOperand;
      case '×':
        return leftOperand * rightOperand;
      case '÷':
        return leftOperand / rightOperand;
      default:
        return rightOperand;
    }
  };

  const handleEquals = () => {
    if (expression !== '') {
      const result = calculate();
      setDisplay(String(result));
      setExpression('');
      setWaitingForOperand(true);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Calculator</h1>
      <p className={styles.description}>
        A simple calculator app built with Next.js and React. Try it out!
      </p>
      
      <div className={styles.calculator}>
        <div className={styles.display}>
          <div className={styles.expression}>{expression}</div>
          <div className={styles.result}>{display}</div>
        </div>
        
        <div className={styles.buttons}>
          {/* Row 1 */}
          <button
            className={`${styles.button} ${styles.buttonClear}`}
            onClick={clear}
          >
            C
          </button>
          <button
            className={`${styles.button} ${styles.buttonOperator}`}
            onClick={() => performOperation('÷')}
          >
            ÷
          </button>
          <button
            className={`${styles.button} ${styles.buttonOperator}`}
            onClick={() => performOperation('×')}
          >
            ×
          </button>
          <button
            className={`${styles.button} ${styles.buttonOperator}`}
            onClick={() => performOperation('-')}
          >
            -
          </button>

          {/* Row 2 */}
          <button className={styles.button} onClick={() => inputDigit('7')}>7</button>
          <button className={styles.button} onClick={() => inputDigit('8')}>8</button>
          <button className={styles.button} onClick={() => inputDigit('9')}>9</button>
          <button
            className={`${styles.button} ${styles.buttonOperator}`}
            onClick={() => performOperation('+')}
          >
            +
          </button>

          {/* Row 3 */}
          <button className={styles.button} onClick={() => inputDigit('4')}>4</button>
          <button className={styles.button} onClick={() => inputDigit('5')}>5</button>
          <button className={styles.button} onClick={() => inputDigit('6')}>6</button>
          <button className={styles.button} onClick={inputDecimal}>.</button>

          {/* Row 4 */}
          <button className={styles.button} onClick={() => inputDigit('1')}>1</button>
          <button className={styles.button} onClick={() => inputDigit('2')}>2</button>
          <button className={styles.button} onClick={() => inputDigit('3')}>3</button>
          <button
            className={`${styles.button} ${styles.buttonEquals}`}
            onClick={handleEquals}
          >
            =
          </button>

          {/* Row 5 */}
          <button
            className={`${styles.button} ${styles.buttonZero}`}
            onClick={() => inputDigit('0')}
          >
            0
          </button>
        </div>
      </div>
    </div>
  );
}

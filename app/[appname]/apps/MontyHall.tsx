'use client';

import { useState } from 'react';
import styles from './MontyHall.module.css';

type GamePhase = 'initial' | 'revealed' | 'finished';
type DoorState = 'closed' | 'selected' | 'revealed' | 'winner' | 'loser';

interface Door {
  id: number;
  hasPrize: boolean;
  state: DoorState;
}

interface Statistics {
  gamesPlayed: number;
  switchWins: number;
  switchLosses: number;
  stayWins: number;
  stayLosses: number;
}

export default function MontyHall() {
  const [doors, setDoors] = useState<Door[]>([
    { id: 0, hasPrize: false, state: 'closed' },
    { id: 1, hasPrize: false, state: 'closed' },
    { id: 2, hasPrize: false, state: 'closed' },
  ]);
  const [phase, setPhase] = useState<GamePhase>('initial');
  const [selectedDoor, setSelectedDoor] = useState<number | null>(null);
  const [revealedDoor, setRevealedDoor] = useState<number | null>(null);
  const [finalChoice, setFinalChoice] = useState<number | null>(null);
  const [switched, setSwitched] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('Pick a door!');
  const [stats, setStats] = useState<Statistics>({
    gamesPlayed: 0,
    switchWins: 0,
    switchLosses: 0,
    stayWins: 0,
    stayLosses: 0,
  });

  const initializeGame = () => {
    // Randomly assign prize to one door
    const prizeDoor = Math.floor(Math.random() * 3);
    const newDoors: Door[] = [0, 1, 2].map((id) => ({
      id,
      hasPrize: id === prizeDoor,
      state: 'closed' as DoorState,
    }));
    setDoors(newDoors);
    setPhase('initial');
    setSelectedDoor(null);
    setRevealedDoor(null);
    setFinalChoice(null);
    setSwitched(false);
    setMessage('Pick a door!');
  };

  const selectDoor = (doorId: number) => {
    if (phase === 'initial') {
      // Initial door selection
      setSelectedDoor(doorId);
      
      // Host reveals one of the other doors that doesn't have the prize
      const otherDoors = [0, 1, 2].filter(
        (id) => id !== doorId && !doors[id].hasPrize
      );
      const doorToReveal = otherDoors[Math.floor(Math.random() * otherDoors.length)];
      
      setRevealedDoor(doorToReveal);
      setPhase('revealed');
      setMessage('The host reveals a losing door. Click on a door to make your final choice!');
      
      // Update door states
      setDoors((prev) =>
        prev.map((door) => {
          if (door.id === doorId) return { ...door, state: 'selected' };
          if (door.id === doorToReveal) return { ...door, state: 'revealed' };
          return door;
        })
      );
    } else if (phase === 'revealed') {
      // Final choice - can't click the revealed door
      if (doorId === revealedDoor || selectedDoor === null) return;

      const switchDoor = doorId !== selectedDoor;
      const finalDoorId = doorId;

      setFinalChoice(finalDoorId);
      setSwitched(switchDoor);
      setPhase('finished');

      // Reveal all doors
      setDoors((prev) =>
        prev.map((door) => {
          if (door.id === finalDoorId && door.hasPrize) {
            return { ...door, state: 'winner' };
          } else if (door.id === finalDoorId && !door.hasPrize) {
            return { ...door, state: 'loser' };
          } else if (door.hasPrize) {
            return { ...door, state: 'winner' };
          } else if (door.id === revealedDoor) {
            return { ...door, state: 'revealed' };
          } else {
            return { ...door, state: 'closed' };
          }
        })
      );

      // Update message and statistics
      const won = doors[finalDoorId].hasPrize;
      if (won) {
        setMessage(
          switchDoor
            ? '🎉 You won by switching! This demonstrates why switching gives you a 2/3 chance of winning.'
            : '🎉 You won by staying! But statistically, switching would have been better.'
        );
      } else {
        setMessage(
          switchDoor
            ? '😔 You lost. But remember, switching wins 2/3 of the time!'
            : '😔 You lost. This is why staying only wins 1/3 of the time.'
        );
      }

      // Update statistics
      setStats((prev) => {
        const newStats = {
          ...prev,
          gamesPlayed: prev.gamesPlayed + 1,
        };
        if (switchDoor) {
          if (won) {
            newStats.switchWins++;
          } else {
            newStats.switchLosses++;
          }
        } else {
          if (won) {
            newStats.stayWins++;
          } else {
            newStats.stayLosses++;
          }
        }
        return newStats;
      });
    }
  };

  const simulateBulk = (iterations: number = 1000) => {
    let switchWins = 0;
    let stayWins = 0;

    for (let i = 0; i < iterations; i++) {
      // Random prize door
      const prizeDoor = Math.floor(Math.random() * 3);
      // Random initial choice
      const initialChoice = Math.floor(Math.random() * 3);
      
      // Host reveals a losing door (not prize, not initial choice)
      const revealedDoor = [0, 1, 2].find(
        (id) => id !== initialChoice && id !== prizeDoor
      )!;
      
      // Switch strategy: pick the other door
      const switchChoice = [0, 1, 2].find(
        (id) => id !== initialChoice && id !== revealedDoor
      )!;
      
      if (switchChoice === prizeDoor) switchWins++;
      if (initialChoice === prizeDoor) stayWins++;
    }

    setStats((prev) => ({
      ...prev,
      gamesPlayed: prev.gamesPlayed + iterations,
      switchWins: prev.switchWins + switchWins,
      switchLosses: prev.switchLosses + (iterations - switchWins),
      stayWins: prev.stayWins + stayWins,
      stayLosses: prev.stayLosses + (iterations - stayWins),
    }));

    setMessage(
      `Simulated ${iterations} games: Switching won ${switchWins} (${((switchWins / iterations) * 100).toFixed(1)}%), Staying won ${stayWins} (${((stayWins / iterations) * 100).toFixed(1)}%). This proves switching is better!`
    );
    
    // Reset game state
    initializeGame();
  };

  const switchWinRate =
    stats.switchWins + stats.switchLosses > 0
      ? ((stats.switchWins / (stats.switchWins + stats.switchLosses)) * 100).toFixed(1)
      : '0.0';
  
  const stayWinRate =
    stats.stayWins + stats.stayLosses > 0
      ? ((stats.stayWins / (stats.stayWins + stats.stayLosses)) * 100).toFixed(1)
      : '0.0';

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Monty Hall Problem Simulator</h1>
      <p className={styles.description}>
        A classic probability puzzle: You pick a door, the host reveals a losing door,
        and you decide whether to switch. Try it yourself and see why switching gives you
        a 2/3 chance of winning!
      </p>

      <div className={styles.gameArea}>
        <div className={styles.doors}>
          {doors.map((door) => {
            const isDisabled = 
              phase === 'finished' || 
              (phase === 'revealed' && door.id === revealedDoor);
            
            return (
              <button
                key={door.id}
                className={`${styles.door} ${styles[`door${door.state.charAt(0).toUpperCase() + door.state.slice(1)}`]}`}
                onClick={() => selectDoor(door.id)}
                disabled={isDisabled}
              >
                <div className={styles.doorContent}>
                  {door.state === 'closed' && <span className={styles.doorNumber}>Door {door.id + 1}</span>}
                  {door.state === 'selected' && (
                    <>
                      <span className={styles.selectedLabel}>✓ Selected</span>
                      <span className={styles.doorNumber}>Door {door.id + 1}</span>
                    </>
                  )}
                  {door.state === 'revealed' && <span className={styles.doorEmoji}>🐐</span>}
                  {door.state === 'winner' && <span className={styles.doorEmoji}>🏆</span>}
                  {door.state === 'loser' && <span className={styles.doorEmoji}>🐐</span>}
                </div>
              </button>
            );
          })}
        </div>

        <div className={styles.message}>{message}</div>

        {phase === 'finished' && (
          <div className={styles.actions}>
            <button
              className={`${styles.button} ${styles.buttonNewGame}`}
              onClick={initializeGame}
            >
              New Game
            </button>
          </div>
        )}

        <div className={styles.bulkActions}>
          <button
            className={`${styles.button} ${styles.buttonSimulate}`}
            onClick={() => simulateBulk(1000)}
          >
            Simulate 1000 Games
          </button>
        </div>
      </div>

      <div className={styles.statistics}>
        <h2 className={styles.statsTitle}>Statistics</h2>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Games Played</div>
            <div className={styles.statValue}>{stats.gamesPlayed}</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Switching Strategy</div>
            <div className={styles.statValue}>
              {stats.switchWins}W / {stats.switchLosses}L
            </div>
            <div className={styles.statRate}>{switchWinRate}% win rate</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Staying Strategy</div>
            <div className={styles.statValue}>
              {stats.stayWins}W / {stats.stayLosses}L
            </div>
            <div className={styles.statRate}>{stayWinRate}% win rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}

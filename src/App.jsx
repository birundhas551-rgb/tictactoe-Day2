import { useState } from 'react'
import './App.css'

const winningLines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
]

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState('X')
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 })

  const winner = winningLines.find(line =>
    line.every(index => board[index] && board[index] === board[line[0]])
  )
  const winningPlayer = winner ? board[winner[0]] : null
  const draw = !winningPlayer && board.every(Boolean)

  function play(index) {
    if (board[index] || winningPlayer || draw) return

    const next = [...board]
    next[index] = turn
    setBoard(next)

    const won = winningLines.some(line =>
      line.every(i => next[i] === turn)
    )

    if (won) {
      setScores(prev => ({ ...prev, [turn]: prev[turn] + 1 }))
    } else if (next.every(Boolean)) {
      setScores(prev => ({ ...prev, draws: prev.draws + 1 }))
    } else {
      setTurn(turn === 'X' ? 'O' : 'X')
    }
  }

  function newGame() {
    setBoard(Array(9).fill(null))
    setTurn('X')
  }

  function resetScores() {
    setScores({ X: 0, O: 0, draws: 0 })
    newGame()
  }

  return (
    <main className="game-page">
      <header className="topbar">
        <div className="brand"><span>✕</span> XO ARENA</div>
        <span className="online"><i /> TWO PLAYER GAME</span>
      </header>

      <section className="game-content">
        <div className="eyebrow">THE CLASSIC GAME, REIMAGINED</div>
        <h1>Tic <span>Tac</span> Toe</h1>
        <p className="subtitle">A little strategy. A little luck. A lot of fun.</p>

        <div className="scoreboard">
          <div className={`score-card ${turn === 'X' && !winner && !draw ? 'active-x' : ''}`}>
            <span className="player-symbol x">X</span>
            <span className="player-name">PLAYER X</span>
            <strong>{scores.X}</strong>
          </div>
          <div className="score-card draw-card">
            <span className="player-name">DRAWS</span>
            <strong>{scores.draws}</strong>
          </div>
          <div className={`score-card ${turn === 'O' && !winner && !draw ? 'active-o' : ''}`}>
            <span className="player-symbol o">O</span>
            <span className="player-name">PLAYER O</span>
            <strong>{scores.O}</strong>
          </div>
        </div>

        <div className="status">
          {winningPlayer ? (
            <>🎉 <span className={winningPlayer === 'X' ? 'x' : 'o'}>Player {winningPlayer} wins!</span></>
          ) : draw ? (
            '🤝 It is a draw!'
          ) : (
            <>YOUR TURN: <span className={turn === 'X' ? 'x' : 'o'}>{turn}</span></>
          )}
        </div>

        <div className="board">
          {board.map((cell, index) => (
            <button
              key={index}
              className={`cell ${cell ? `cell-${cell.toLowerCase()}` : ''} ${winner?.includes(index) ? 'winning-cell' : ''}`}
              onClick={() => play(index)}
              disabled={!!cell || !!winningPlayer || draw}
              aria-label={`Cell ${index + 1}${cell ? `: ${cell}` : ': empty'}`}
            >
              {cell}
            </button>
          ))}
        </div>

        <div className="actions">
          <button className="new-game" onClick={newGame}>↻ &nbsp; Play Again</button>
          <button className="reset" onClick={resetScores}>Reset Scores</button>
        </div>

        <p className="hint">TAKE TURNS · GET THREE IN A ROW · WIN THE GAME</p>
      </section>

      <footer>MADE FOR FUN <span>✦</span> BUILT WITH REACT</footer>
    </main>
  )
}

export default App

import React, { useState } from 'react'
import { cn } from '@/lib/utils'

interface TicTacToeProps {
  className?: string
}

type Player = 'X' | 'O'
type Board = (Player | null)[][]

const TicTacToe: React.FC<TicTacToeProps> = ({ className }) => {
  const [board, setBoard] = useState<Board>(() => 
    Array(3).fill(null).map(() => Array(3).fill(null))
  )
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X')
  const [winner, setWinner] = useState<Player | 'Draw' | null>(null)

  const checkWinner = (board: Board): Player | 'Draw' | null => {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        return board[i][0]
      }
    }

    // Check columns
    for (let j = 0; j < 3; j++) {
      if (board[0][j] && board[0][j] === board[1][j] && board[1][j] === board[2][j]) {
        return board[0][j]
      }
    }

    // Check diagonals
    if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      return board[0][0]
    }
    if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      return board[0][2]
    }

    // Check for draw
    const isFull = board.every(row => row.every(cell => cell !== null))
    if (isFull) return 'Draw'

    return null
  }

  const handleCellClick = (row: number, col: number) => {
    if (board[row][col] || winner) return

    const newBoard = board.map(r => [...r])
    newBoard[row][col] = currentPlayer
    setBoard(newBoard)

    const gameResult = checkWinner(newBoard)
    if (gameResult) {
      setWinner(gameResult)
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
    }
  }

  const resetGame = () => {
    setBoard(Array(3).fill(null).map(() => Array(3).fill(null)))
    setCurrentPlayer('X')
    setWinner(null)
  }

  return (
    <div className={cn("flex flex-col items-center gap-6 p-8 bg-background text-foreground", className)}>
      <h1 className="text-3xl font-bold">Tic Tac Toe</h1>
      
      <div className="text-lg font-medium">
        {winner 
          ? winner === 'Draw' 
            ? "It's a Draw!" 
            : `Player ${winner} Wins!`
          : `Current Player: ${currentPlayer}`
        }
      </div>

      <div className="grid grid-cols-3 gap-1 bg-primary p-1">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              className={cn(
                "w-20 h-20 bg-card text-card-foreground text-2xl font-bold",
                "hover:bg-muted transition-colors duration-200",
                "flex items-center justify-center",
                "disabled:cursor-not-allowed",
                cell && "cursor-default"
              )}
              disabled={!!cell || !!winner}
            >
              {cell}
            </button>
          ))
        )}
      </div>

      <button
        onClick={resetGame}
        className={cn(
          "px-6 py-2 bg-primary text-primary-foreground font-medium",
          "hover:bg-primary/90 transition-colors duration-200",
          "border-2 border-primary"
        )}
      >
        Reset Game
      </button>
    </div>
  )
}

export default TicTacToe
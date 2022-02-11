import { useState } from 'react'
import Button from '@mui/material/Button'

import './LifeGame.scss'
import Cell from './Cell.jsx'
import useInterval from '../utils/useInterval'
import gameConfig from '../utils/game_config.json'

/*
  TODO:
  relire useInterval
  faire marcher le clique (toggle clickMode)
  dessin en temps réel
  gérer les frontières
  perfs
  mode nuit
*/

function LifeGame () {
  const [cells, setCells] = useState(Array(10000).fill(false))
  const [tickSpeed, setTickSpeed] = useState(gameConfig.maxSpeed)
  const [isPaused, setIsPaused] = useState(false)
  const [showGrid, setShowGrid] = useState(true)
  const [areColorsRandom, setAreColorsRandom] = useState(false)

  const updateArr = (index) => {
    const newArr = [...cells]

    cells[index] = !cells[index]
    newArr[index] = !newArr[index]
    setCells(newArr)
  }

  const countAliveNeigh = (index) => (
    +cells[index - 101] + +cells[index - 100] + +cells[index - 99] +
    +cells[index - 1] + +cells[index + 1] + +cells[index + 99] +
    +cells[index + 100] + +cells[index + 101]
  )

  useInterval(() => {
    const result = [...cells]
    let numberOfAliveNeighbors

    !isPaused && cells.forEach((_, index) => {
      numberOfAliveNeighbors = countAliveNeigh(index)
      if (numberOfAliveNeighbors === 3) {
        result[index] = true
      } else if (numberOfAliveNeighbors < 2 || numberOfAliveNeighbors > 3) {
        result[index] = false
      }
    })
    setCells(result)
  }, tickSpeed)

  return (
    <div className='lifeGameContainer'>
      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '-15%', marginRight: '10%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <input
            onChange={(e) => setAreColorsRandom(e.target.checked)}
            type='checkbox'
            id='randomColorsInput'
            checked={ areColorsRandom }
          />
          <label htmlFor='randomColorsInput'>Random cells color</label>
        </div>
        <br/>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <input
            onChange={(e) => setShowGrid(e.target.checked)}
            type='checkbox'
            id='gridInput'
            checked={ showGrid }
          />
          <label htmlFor='gridInput'>Show cells grid</label>
        </div>
        <br/>
        <Button
          variant='contained'
          onClick={() => setCells(Array(10000).fill(false)) }
        >
          Reset life
        </Button>
        <br/>
        <Button
          variant='contained'
          onClick={() => setIsPaused(!isPaused) }
        >
          { isPaused ? 'Resume life' : 'Pause life' }
        </Button>
        <br/>
        <label htmlFor='speedInput'>Life speed: { tickSpeed }</label>
        <input
          type='range'
          id='speedInput'
          min={ gameConfig.minSpeed }
          max={ gameConfig.maxSpeed }
          value={ tickSpeed }
          onChange={(e) => setTickSpeed(e.target.value)}
        />
      </div>
      <div className='cellsBoard'>
        {cells.map((isAlive, index) => (
          <div key={ index } onClick={() => updateArr(index) }>
            <Cell
              isAlive={ isAlive }
              showGrid={ showGrid }
              areColorsRandom={ areColorsRandom }
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default LifeGame

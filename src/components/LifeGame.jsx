import { useState, useEffect, useRef } from 'react'
import Button from '@mui/material/Button'

import './LifeGame.scss'
import Cell from './Cell.jsx'

// relire useInterval
// faire marcher le clique (toggle clickMode)
// dessin en temps réel
// gérer les frontières
// perfs
// mode nuit

function useInterval(callback, delay) {
  const savedCallback = useRef(callback)

  useEffect(() => { savedCallback.current = callback }, [callback])

  useEffect(() => {
    if (!delay && delay !== 0) {
      return
    }

    const id = setInterval(() => savedCallback.current(), delay)

    return () => clearInterval(id)
  }, [delay])
}

function LifeGame() {

  const minSpeed = 100
  const maxSpeed = 5000

  const [cellArr, setCellArr] = useState(Array(10000).fill(false))
  const [tickSpeed, setTickSpeed] = useState(maxSpeed)
  const [isPaused, setIsPaused] = useState(false)
  const [showGrid, setShowGrid] = useState(true)
  const [areColorsRandom, setAreColorsRandom] = useState(false)

  const countAliveNeigh = (index) => {
    let result = { alives: 0, index: [] }

    if (cellArr[index - 101]) {
      result.index.push(index - 101)
    }
    if (cellArr[index - 100]) {
      result.index.push(index - 100)
    }
    if (cellArr[index - 99]) {
      result.index.push(index - 99)
    }

    if (cellArr[index - 1]) {
      result.index.push(index - 1)
    }
    if (cellArr[index + 1]) {
      result.index.push(index + 1)
    }

    if (cellArr[index + 99]) {
      result.index.push(index + 99)
    }
    if (cellArr[index + 100]) {
      result.index.push(index + 100)
    }
    if (cellArr[index + 101]) {
      result.index.push(index + 101)
    }
    result.alives = result.index.length
    return result
  }

  useInterval(() => {
    let newArr = [...cellArr]
    let neighs

    !isPaused && cellArr.forEach((cell, index) => {
      neighs = countAliveNeigh(index)

      if (neighs.alives === 3) {
        newArr[index] = true
      } else if (neighs.alives < 2 || neighs.alives > 3) {
        newArr[index] = false
      }
    })
    setCellArr(newArr)
  }, tickSpeed)

  const updateArr = (index) => {
    let newArr = [...cellArr]

    cellArr[index] = !cellArr[index]
    newArr[index] = !newArr[index]
    setCellArr(newArr)
  }

  return (
    <div className='lifeGameContainer'>
      <div style={{ display: 'flex', flexDirection: 'column', marginRight: '4vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <input
            onChange={(e) => setAreColorsRandom(e.target.checked)}
            type='checkbox'
            id='randomColorsInput'
            checked={ areColorsRandom }
          />
          <label htmlFor='randomColorsInput'>Random cells color</label>
        </div>
        <br />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <input
            onChange={(e) => setShowGrid(e.target.checked)}
            type='checkbox'
            id='gridInput'
            checked={ showGrid }
          />
          <label htmlFor='gridInput'>Show cells grid</label>
        </div>
        <br />
        <Button
          variant='contained'
          onClick={() => setCellArr(Array(10000).fill(false)) }
        >
          Reset life
        </Button>
        <br />
        <Button
          variant='contained'
          onClick={() => setIsPaused(!isPaused) }
        >
          { isPaused ? 'Resume life' : 'Pause life' }
        </Button>
        <br />
        <label htmlFor='speedInput'>Life speed: { tickSpeed }</label>
        <input
          onChange={(e) => setTickSpeed(e.target.value)}
          type='range'
          id='speedInput'
          value={ tickSpeed }
          min={ minSpeed }
          max={ maxSpeed }
        />
      </div>
      <div className='cellsBoard'>
        {
          cellArr.map((isAlive, index) => {
            return (
              <div
                key={ index }
                onClick={() => updateArr(index) }
              >
                <Cell
                isAlive={ isAlive }
                showGrid={ showGrid }
                areColorsRandom={ areColorsRandom }
              />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default LifeGame

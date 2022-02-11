import PropTypes from 'prop-types'
import './Cell.scss'
import gameConfig from '../utils/game_config.json'

function Cell ({ isAlive, areColorsRandom, showGrid }) {
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF'
    let color = '#'

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  return (
    <div
      className='cellContainer'
      style={{
        ...!isAlive && { backgroundColor: 'white' },
        ...isAlive && { backgroundColor: areColorsRandom ? getRandomColor() : gameConfig.defaultAliveCellColor },
        borderColor: showGrid ? 'rgb(202, 202, 202)' : 'white'
      }}
    />
  )
}
Cell.propTypes = {
  isAlive: PropTypes.bool.isRequired,
  areColorsRandom: PropTypes.bool.isRequired,
  showGrid: PropTypes.bool.isRequired
}

export default Cell

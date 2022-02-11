import './Cell.scss'

function Cell(props) {

  const getRandomColor = () => {
    let letters = '0123456789ABCDEF'
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
        backgroundColor: props.isAlive ? (props.areColorsRandom ? getRandomColor() : 'black') : 'white',
        borderColor: props.showGrid ? 'rgb(202, 202, 202)' : 'white'
      }}
    >
    </div>
  )
}

export default Cell

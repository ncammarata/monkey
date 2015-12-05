import _ from 'lodash'

view Main {
  let count = 9
  let rows = 4
  let cols = 8
  let started = false

  let squares = []
  let width = 90
  let height = 120
  let index = 0
  let showing = false

  let next = () => {
    started = true
    showing = true
    squares = genSquares(count)
    setTimeout(() => {
      showing = false
    }, 650)
    index = 0
  }

  let clicked = right => {
    if (right) {
      index++
      if (index == count) alert("You win!")
    } else {
      setTimeout(() => {
        started = false
      })
    }
  }

  let genSquares = n => {
    let rand = x => _.random(x)
    let sets = _.range(n * 2)
      .map(i =>
        `${rand(rows)}-${rand(cols)}`)

    let uni = _.uniq(sets)
    return _.take(uni, n)
  }
  on.click(() => {
    if (!started) next()
  })

  let getX = s => +s.split('-')[1] * width
  let getY = s => +s.split('-')[0] * height
  let pos = s => ({ left: getX(s), top: getY(s) })

  <splash if={!started}>
    <h1>So easy a monkey could do it</h1>
    <h2>Click anywhere to start</h2>
  </splash>
  <square class={{hide: !showing}}
          onClick={() => clicked(_index == 0)}
          if={started}
          style={pos(_)}
          repeat={_.drop(squares, index)}>{_index + 1}</square>

  $h1 = { color: 'white', }
  $h2 = { color: 'white', }
  $splash = {
    margin: 100,
  }
  $square = {
    position: 'absolute',
    background: 'white',
    width, height, margin: 20,
    border: '1px solid black',
    color: 'black',
    fontSize: 45,
    padding: 30,
  }

  $hide = {
    color: 'white',
  }

}

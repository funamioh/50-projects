const buttons = document.querySelectorAll('.ripple')

buttons.forEach(button => {
  button.addEventListener('click', function(e) {
    // store the click position of x and y
    const x = e.clientX
    const y = e.clientY

    // the left and top position relative to the parent
    const buttonLeft = e.target.offsetLeft
    const buttonTop = e.target.offsetTop

    // get left and top position inside the button
    const xInside = x - buttonLeft
    const yInside = y - buttonTop

    // place a circle to the clicked position
    const circle = document.createElement('span')
    circle.classList.add('circle')
    circle.style.left = xInside + 'px'
    circle.style.top = yInside + 'px'

    this.appendChild(circle)

    setTimeout(() => circle.remove(), 500)
  })
})

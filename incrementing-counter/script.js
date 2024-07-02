const counters = document.querySelectorAll(".counter")

counters.forEach(counter => {
  counter.innerText = "0";

  const updateCounter = () => {
    // converting string to integers - +counter or parseInt(c)
    const target = +counter.getAttribute('data-target')
    const c = +counter.innerText

    // the greater the dividing number is, the numerical inrements are fine-grained (数字の刻みが細かくなる。)
    const increment = target / 200

    if(c < target) {
      counter.innerText = `${Math.ceil(c + increment)}`
      // ms数が大きい方がゆっくり数字が上がる
      setTimeout(updateCounter, 10)
    } else {
      counter.innerText = target
    }
  }

  updateCounter();
})

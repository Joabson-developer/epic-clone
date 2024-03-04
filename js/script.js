const TIME = 6
let timeout
document.documentElement.style.setProperty("--animation-duration", `${TIME}s`)

const carouselActions = () =>
  document.querySelectorAll(".carousel__actions__item")

function resetAll(array, className) {
  array.forEach((item) => item.classList.remove(className))
}

function changeSlide(id) {
  const slides = document.querySelectorAll(".carousel__slides__slide")
  const className = "carousel__slides__slide--active"
  resetAll(slides, className)
  slides.forEach((slide) => {
    if (slide.id === id) slide.classList.add(className)
  })
}

carouselActions().forEach((action, _, array) => {
  action.addEventListener("click", ({ currentTarget }) => {
    clearTimeout(timeout)
    callCarousel()
    const className = "carousel__actions__item--active"
    resetAll(array, className)
    currentTarget.classList.add(className)
    changeSlide(currentTarget.dataset.target)
  })
})

function callCarousel() {
  timeout = setInterval(() => {
    let index = 0
    carouselActions().forEach((action, id) => {
      if (action.classList.contains("carousel__actions__item--active")) {
        index = id
      }
    })
    if (carouselActions().length - 1 === index) {
      carouselActions()[0].click()
      return (index = 0)
    }

    carouselActions()[index + 1].click()
  }, TIME * 1000)
}
callCarousel()

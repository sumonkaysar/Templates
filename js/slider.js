let count = 1;
window.onload = main();

function main() {
  const sliderWrapper = document.querySelector(".slider-items-wrapper");
  const sliderItems = document.querySelectorAll(".slider-items");
  const sliderBtns = document.querySelectorAll(".slider-btn");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  nextBtn.addEventListener("click", nextSlider);

  prevBtn.addEventListener("click", prevSlider);

  sliderBtns.forEach(btn => {
    btn.addEventListener("click", changeSlider);
  });

  sliderWrapper.addEventListener("transitionend", () => {
    if (sliderItems[count].id === "last-clone") {
      count = sliderItems.length - 2;
      sliderWrapper.style.transition = "none";
      sliderWrapper.style.transform = "translateX(" + (-sliderItems[0].clientWidth * count) + "px)";
    }
    if (sliderItems[count].id === "first-clone") {
      count = sliderItems.length - count;
      sliderWrapper.style.transition = "none";
      sliderWrapper.style.transform = "translateX(" + (-sliderItems[0].clientWidth * count) + "px)";
    }
  });

}

function nextSlider() {
  const sliderItems = document.querySelectorAll(".slider-items");
  if (count >= sliderItems.length - 1) return;
  count++;
  makeSliderActive();
}

function prevSlider() {
  if (count <= 0) return;
  count--;
  makeSliderActive();
}

function makeSliderActive() {
  const sliderItems = document.querySelectorAll(".slider-items");
  const sliderBtns = document.querySelectorAll(".slider-btn");
  const sliderWrapper = document.querySelector(".slider-items-wrapper");

  sliderWrapper.style.transition = "transform .8s ease-in-out";
  sliderWrapper.style.transform = "translateX(" + (-sliderItems[0].clientWidth * count) + "px)";

  sliderBtns.forEach(sliderBtn => {
    sliderBtn.checked = false;
  });
  if (count >= sliderItems.length - 1) {
    sliderBtns[0].checked = true;
  }else if (count === 0) {
    sliderBtns[sliderItems.length - 3].checked = true;
  }else{
    sliderBtns[count - 1].checked = true;
  }
}

function changeSlider(e) {
  count = e.target.dataset.id;
  makeSliderActive();
}
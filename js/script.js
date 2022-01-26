const swiper = new Swiper(".slider", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  slideClass: "slide",
  wrapperClass: "slider__wrapper",
  slideToClickedSlide: true,
  slidesPerView: 3,
  spaceBetween: 20,
  // centeredSlides: true,
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
    // when window width is >= 640px
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
});
const swiperPrev = document.querySelector(".swiper-button_prev");
const swiperNext = document.querySelector(".swiper-button_next");
swiperPrev.addEventListener("click", () => {
  swiper.slidePrev();
});
swiperNext.addEventListener("click", () => {
  swiper.slideNext();
});

// функция работы гамбургера
function ham() {
  const ham = document.querySelector(".hamburger");
  const menu = document.querySelector(".menu");
  const body = document.querySelector("body");
  function toggleMenu() {
    ham.classList.toggle("active");
    menu.classList.toggle("is-active");
    // body.classList.toggle('locked');
  }
  ham.addEventListener("click", function (e) {
    e.preventDefault();
    toggleMenu();
  });
  menu.addEventListener("click", function (e) {
    let target = e.target;
    if (target.className === "menu__link") {
      toggleMenu();
    }
  });
}
ham();

// Функция работы модального окна карточки
function toggleModalCard(modalWindow, openButton, closeButton) {
  const openBtns = document.querySelectorAll(openButton);
  const modal = document.querySelector(modalWindow);
  const closeBtn = modal.querySelector(closeButton);
  const closeBtn1 = modal.querySelector(".btn-close");
  if (modal) {
    openBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let paddingoffset =
          window.innerWidth - document.body.offsetWidth + "px";
        e.preventDefault();
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = paddingoffset;
        modal.classList.add("active");
      });
    });
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
        modal.classList.remove("active");
        addCard(modal);
      });
    }
    if (closeBtn) {
      closeBtn1.addEventListener("click", () => {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
        modal.classList.remove("active");
        addCard(modal);
      });
    }
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
        modal.classList.remove("active");
      }
    });
  }
}
// Функция работы модального окна корзины
function toggleModal(modalWindow, openButton, closeButton) {
  const openBtns = document.querySelectorAll(openButton),
    modal = document.querySelector(modalWindow),
    closeBtn = modal.querySelector(closeButton),
    overlay = document.querySelector(".overlay");
  if (modal) {
    openBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        modal.classList.add("active");
        overlay.classList.add("active");
        window.scrollTo({ top: 0 });
        total(modal);
      });
    });
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        modal.classList.remove("active");
        overlay.classList.remove("active");
      });
    }
    overlay.addEventListener("click", (e) => {
      if (e.target == overlay) {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
        modal.classList.remove("active");
        overlay.classList.remove("active");
      }
    });
  }
}
toggleModal(".modal-basket", ".menu__link_basket", ".btn-close");
toggleModalCard(".modal-product1", ".slide__link1", ".btn_product-card");
toggleModalCard(".modal-product2", ".slide__link2", ".btn_product-card");
toggleModalCard(".modal-product3", ".slide__link3", ".btn_product-card");
toggleModalCard(".modal-product4", ".slide__link4", ".btn_product-card");
toggleModalCard(".modal-product5", ".slide__link5", ".btn_product-card");
toggleModalCard(".modal-product6", ".slide__link6", ".btn_product-card");
toggleModalCard(".modal-product7", ".slide__link7", ".btn_product-card");
toggleModalCard(".modal-product8", ".slide__link8", ".btn_product-card");

function addCard(modal) {
  let wrapper = document.querySelector(".basket__cards"); //выбираем обертку карточек в корзине
  const title = modal.querySelector(".h3").textContent, //получаем название продукта
    src = modal.querySelector(".product-card__pic").getAttribute("src"), //получаем путь к картинке
    price = 20,
    card = modal.querySelector(".product-card"),
    data = card.dataset.card; //получаем идентификатор карточки
  let fragment = document.createElement("div");
  const template = document.querySelector(".basketCard").innerHTML;
  fragment.innerHTML = template;
  fragment.querySelector(".basket-card__pic").setAttribute("src", src);
  fragment.firstElementChild.setAttribute("data-card", data);
  fragment.querySelector(".h3_basket-card").textContent = title;
  fragment.querySelector(".basket-card__price").textContent = price;
  wrapper.appendChild(fragment);
}
function total(modalBasket) {
  totalPrice = document.querySelector(".basket__total");
  prices = modalBasket.querySelectorAll(".basket-card__price");
  let total = 0;
  prices.forEach((element) => {
    value = parseFloat(element.innerHTML);
    total = total + value;
  });
  totalPrice.innerHTML = total;
}

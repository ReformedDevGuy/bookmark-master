const hamburgerBtn = document.querySelector(".nav__hamburger-icon");
const closeBtn = document.querySelector(".nav__close-icon");
const tabLinks = document.querySelectorAll(".tab-nav__link");
const accordionItems = document.querySelectorAll(".accordion__item");
const ctaForm = document.querySelector(".cta__form");
const ctaInput = document.querySelector(".cta__input");
const ctaErrorMessage = document.querySelector(".cta__error-message");

hamburgerBtn.addEventListener("click", function() {
  document.querySelector(".nav__wrapper").classList.add("nav__wrapper--show");
  this.style.opacity = 0;
  document.querySelector(
    ".nav__logo:not(.nav__logo--mobile)"
  ).style.opacity = 0;
});
closeBtn.addEventListener("click", function() {
  document
    .querySelector(".nav__wrapper")
    .classList.remove("nav__wrapper--show");
  hamburgerBtn.style.opacity = 1;
  document.querySelector(
    ".nav__logo:not(.nav__logo--mobile)"
  ).style.opacity = 1;
});

tabLinks.forEach(tabLink => {
  tabLink.addEventListener("click", function(e) {
    e.preventDefault();
    tabLinks.forEach((link, i) => {
      if (link !== this) {
        link.classList.remove("tab-nav__link--active");
        document.querySelector(`#tab-${i}`).classList.add("tab__item--hide");
      } else {
        this.classList.add("tab-nav__link--active");
        document.querySelector(`#tab-${i}`).classList.remove("tab__item--hide");
      }
    });
  });
});

accordionItems.forEach(accordionItem => {
  accordionItem.addEventListener("click", toogleAccordion);
});

function toogleAccordion() {
  currentActive = this;
  accordionItems.forEach(item => {
    const accordionHeaders = item.querySelector(".accordion__header");
    const accordionContents = item.querySelector(".accordion__body");
    // if not active close all accordions
    if (item !== currentActive) {
      accordionHeaders.classList.remove("accordion__header--active");
      accordionContents.classList.add("accordion__body--hide");
    } else {
      this.querySelector(".accordion__body").classList.toggle(
        "accordion__body--hide"
      );
      this.querySelector(".accordion__header").classList.toggle(
        "accordion__header--active"
      );
    }
  });
}

ctaForm.addEventListener("submit", submitForm);

function submitForm(e) {
  const regex = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  // check if input value is not empty
  // if input is not empty, validate email
  if (ctaInput.value != "") {
    if (!regex.test(ctaInput.value)) {
      ctaInput.classList.add("cta__input--error");
      ctaErrorMessage.textContent = "Whoops, make sure it's an email";
      ctaErrorMessage.classList.add("cta__error-message--show");
    } else {
      ctaInput.value = "";
      ctaInput.classList.remove("cta__input--error");
      ctaErrorMessage.textContent = "";
      ctaErrorMessage.classList.remove("cta__error-message--show");
    }
  }
  e.preventDefault();
}

document.addEventListener("DOMContentLoaded", function() {
  // Selecionando elementos do DOM...
  const menu = document.querySelector(".menu");
  const slideshowButtons = document.querySelector(".slideshow-buttons");
  const slideshow = document.querySelector(".slideshow");
  let isMenuOpen = false; // Variável para controlar o estado do menu

  // Código do menu mobile...
  document.querySelectorAll(".sub-btn").forEach(function(btn) {
    btn.addEventListener("click", function() {
      const submenu = this.nextElementSibling;
      submenu.style.display = submenu.style.display === "block" ? "none" : "block";
    });
  });

  document.querySelectorAll(".more-btn").forEach(function(btn) {
    btn.addEventListener("click", function() {
      const moremenu = this.nextElementSibling;
      moremenu.style.display = moremenu.style.display === "block" ? "none" : "block";
    });
  });

  // Função para abrir/fechar o menu
  const toggleMenu = (open) => {
    menu.classList.toggle("active", open);
    slideshowButtons.classList.toggle("hide-buttons", open);
    isMenuOpen = open;
  };

  // Evento de clique para abrir o menu
  document.querySelector(".menu-btn").addEventListener("click", function() {
    toggleMenu(true);
  });

  // Evento de clique para fechar o menu
  document.querySelector(".close-btn").addEventListener("click", function() {
    toggleMenu(false);
  });

  // Evento de scroll para o cabeçalho fixo
  window.addEventListener("scroll", function() {
    const header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);
  });

  // Código dos botões de mudança de slide...
  const changeSlideButtons = document.querySelectorAll("[data-change-slide-button]");

  changeSlideButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      const slides = document.querySelector(".slides");
      const activeSlide = slides.querySelector("[data-active]");
      let indexActiveSlide = Array.from(slides.children).indexOf(activeSlide);

      indexActiveSlide = button.dataset.changeSlideButton === "next" ? indexActiveSlide + 1 : indexActiveSlide - 1;

      if (indexActiveSlide >= slides.children.length) {
        indexActiveSlide = 0;
      }

      if (indexActiveSlide < 0) {
        indexActiveSlide = slides.children.length - 1;
      }

      activeSlide.removeAttribute("data-active");
      slides.children[indexActiveSlide].dataset.active = true;
    });
  });

  // Eventos para controle do menu
  menu.addEventListener("mouseenter", function() {
    toggleMenu(true);
  });

  menu.addEventListener("mouseleave", function() {
    toggleMenu(false);
  });
});

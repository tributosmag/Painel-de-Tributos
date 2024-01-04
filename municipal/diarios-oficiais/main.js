const description = document.querySelector(".tooltip");
const paths = document.querySelectorAll('path');
let tabelaVisivel = false;

paths.forEach((el) =>
  el.addEventListener('mouseover', (event) => {
    if (!tabelaVisivel) {
      event.target.classList.add("enabled");
      description.classList.add("active");
      description.innerHTML = event.target.id;
    }
  })
);

paths.forEach((el) =>
  el.addEventListener("mouseout", () => {
    description.classList.remove("active");
  })
);

$(document).ready(function() {
  $("a.botao-estado").click(function(event) {
    event.preventDefault();
    var tabela = $(this).data("tabela");
    $(".tabela-estados").hide();
    $("#" + tabela).show();
    tabelaVisivel = true;
    description.classList.remove("active");
  });

  $("path").click(function(event) {
    event.preventDefault();
    var tabela = $(this).data("tabela");
    $(".tabela-estados").hide();
    $("#" + tabela).show();
    tabelaVisivel = true;
    description.classList.remove("active");
  });

  $(document).on("click", ".tabela-estados tr", function() {
    $(this).toggleClass("selecionado");
  });

  $("#botao-mapa").click(function(event) {
    event.preventDefault();
    $(".tabela-estados").hide();
    $("#mapa").show();
    tabelaVisivel = false;
  });

  $(".botao-estado").click(function(event) {
    event.preventDefault();
    var tabelaId = $(this).attr("data-tabela");
    $("svg").hide();
    $(".tabela-estados").hide();
    $("#" + tabelaId).appendTo("#container").show();
    tabelaVisivel = true;
    description.classList.remove("active");
  });

  $("path").click(function(event) {
    event.preventDefault();
    var tabelaId = $(this).attr("data-tabela");
    $("svg").hide();
    $(".tabela-estados").hide();
    $("#" + tabelaId).appendTo("#container").show();
    tabelaVisivel = true;
    description.classList.remove("active");
  });
});

document.onmousemove = function(e) {
  if (!tabelaVisivel) {
    description.style.left = e.pageX + "px";
    description.style.top = (e.pageY - 70) + "px";
  }
};
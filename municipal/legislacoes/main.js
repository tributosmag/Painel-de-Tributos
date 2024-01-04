// Código JavaScript
var searchForm = document.querySelector('.d-flex[role="search"]');
var searchInput = searchForm.querySelector('input[type="search"]');

// Obter todas as linhas da tabela
var allRows = document.querySelectorAll('.tabela-menu tbody tr');

searchForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var searchTerm = searchInput.value.toLowerCase();
  var searchTerms = searchTerm.split(" ");

  var tabelas = document.getElementsByClassName('tabela-menu');
  for (var i = 0; i < tabelas.length; i++) {
    var linhas = tabelas[i].querySelectorAll('tbody tr');

    // Redefinir o atributo data-incidencia e exibir todas as linhas antes de filtrar
    for (var j = 0; j < linhas.length; j++) {
      linhas[j].setAttribute('data-incidencia', 0);
      linhas[j].style.display = "table-row";
    }

    for (var j = 0; j < linhas.length; j++) {
      var colunas = linhas[j].querySelectorAll('td');
      var linhaVisivel = false;
      var quantidadeCorrespondencias = 0;

      for (var k = 0; k < colunas.length; k++) {
        var textoColuna = colunas[k].textContent.toLowerCase();

        for (var l = 0; l < searchTerms.length; l++) {
          var palavra = searchTerms[l];
          if (textoColuna.includes(palavra)) {
            linhaVisivel = true;
            quantidadeCorrespondencias++;
          }
        }
      }

      // Adicionar o número de ocorrências como um atributo da linha
      linhas[j].setAttribute('data-incidencia', quantidadeCorrespondencias);
    }

    // Ordenar as linhas com base no atributo data-incidencia (maiores ocorrências primeiro)
    var sortedLinhas = Array.from(linhas).sort(function (a, b) {
      return b.getAttribute('data-incidencia') - a.getAttribute('data-incidencia');
    });

    // Anexar as linhas ordenadas ao corpo da tabela
    var tableBody = tabelas[i].querySelector('tbody');
    sortedLinhas.forEach(function (row) {
      tableBody.appendChild(row);
    });

    // Ocultar as linhas sem nenhuma ocorrência da palavra pesquisada
    for (var j = 0; j < linhas.length; j++) {
      if (linhas[j].getAttribute('data-incidencia') == 0) {
        linhas[j].style.display = "none";
      }
    }
  }

  searchInput.value = '';
});


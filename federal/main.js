document.addEventListener('DOMContentLoaded', function() {
  var currentSearchTerm = ''; // Variável global para armazenar o termo de pesquisa

  function pesquisarTabela(tabela, searchTerm) {
    var searchTerms = searchTerm.toLowerCase().split(" ").map(term => term.trim());

    var linhas = tabela.querySelectorAll('tbody tr');

    var linhasResultantes = [];
    for (var j = 0; j < linhas.length; j++) {
      var colunas = linhas[j].querySelectorAll('td');
      var incidencias = 0;

      for (var k = 0; k < colunas.length; k++) {
        var textoColuna = colunas[k].textContent.toLowerCase();
        var todasAsPalavrasPresentes = searchTerms.every(palavra => textoColuna.includes(palavra));

        if (todasAsPalavrasPresentes) {
          incidencias++;
        }
      }

      linhasResultantes.push({ linha: linhas[j], incidencias: incidencias });
    }

    linhasResultantes.sort(function(a, b) {
      return b.incidencias - a.incidencias;
    });

    while (tabela.querySelector('tbody').firstChild) {
      tabela.querySelector('tbody').removeChild(tabela.querySelector('tbody').firstChild);
    }

    for (var i = 0; i < linhasResultantes.length; i++) {
      var linha = linhasResultantes[i].linha;
      linha.style.display = linhasResultantes[i].incidencias > 0 ? 'table-row' : 'none';
      tabela.querySelector('tbody').appendChild(linha);
    }

    // Armazenar o termo de pesquisa na variável global
    currentSearchTerm = searchTerm;
  }

  function restaurarTabela(tabela) {
    var linhasOriginais = tabela.querySelectorAll('tbody tr');
    while (tabela.querySelector('tbody').firstChild) {
      tabela.querySelector('tbody').removeChild(tabela.querySelector('tbody').firstChild);
    }
    for (var i = 0; i < linhasOriginais.length; i++) {
      tabela.querySelector('tbody').appendChild(linhasOriginais[i]);
    }
    // Remover o atributo de pesquisa da tabela
    tabela.removeAttribute('data-pesquisa');
  }

  function exibirTabela(menuId) {
    var tabelas = document.getElementsByClassName('tabela-menu');
    for (var i = 0; i < tabelas.length; i++) {
      tabelas[i].style.display = 'none';
    }

    var tabelaSelecionada = document.getElementById(menuId);
    tabelaSelecionada.style.display = 'table';

    // Recuperar o termo de pesquisa armazenado na tabela ou na variável global
    var termoDePesquisa = tabelaSelecionada.getAttribute('data-pesquisa') || currentSearchTerm;

    // Limpar o campo de pesquisa
    var searchInput = document.querySelector('input[type="search"]');
    searchInput.value = termoDePesquisa || '';

    // Se houver um termo de pesquisa armazenado, pesquisar novamente na tabela recém-exibida
    if (termoDePesquisa !== null && tabelaSelecionada.style.display === 'table') {
      pesquisarTabela(tabelaSelecionada, termoDePesquisa);
    } else {
      // Restaurar a tabela original se não houver pesquisa
      restaurarTabela(tabelaSelecionada);
    }
  }

  var linksMenu = document.querySelectorAll('.nav-link');
  if (linksMenu) {
    for (var i = 0; i < linksMenu.length; i++) {
      linksMenu[i].addEventListener('click', function(event) {
        event.preventDefault();
        var tabelaId = this.getAttribute('data-tabela');
        exibirTabela(tabelaId);
      });
    }
  }

  var searchForm = document.querySelector('.d-flex[role="search"]');
  var searchInput = searchForm.querySelector('input[type="search"]');
  var searchButton = searchForm.querySelector('button');
  var limparPesquisaButton = document.getElementById('limpar-pesquisa');

  if (searchForm && searchInput && searchButton) {
    searchForm.addEventListener('submit', function(event) {
      event.preventDefault();
      var searchTerm = searchInput.value;
      var tabelaSelecionada = document.querySelector('.tabela-menu[style*="display: table"]');
      if (tabelaSelecionada) {
        pesquisarTabela(tabelaSelecionada, searchTerm);
        currentSearchTerm = ''; // Limpar o termo de pesquisa da variável global após a pesquisa
        searchInput.value = ''; // Limpar o campo de pesquisa após a pesquisa
      }
    });
  }

  if (limparPesquisaButton) {
    limparPesquisaButton.addEventListener('click', function() {
      var tabelas = document.getElementsByClassName('tabela-menu');
      for (var i = 0; i < tabelas.length; i++) {
        restaurarTabela(tabelas[i]);
      }
      currentSearchTerm = ''; // Limpar o termo de pesquisa da variável global
      searchInput.value = ''; // Limpar o campo de pesquisa
    });
  }

  // Exibir a primeira tabela ao carregar a página
  exibirTabela('tabela-irpj');
});

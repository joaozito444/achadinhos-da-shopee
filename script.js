// Achadinhos Shopee - script
document.addEventListener('DOMContentLoaded', function(){
  // year
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // product mapping: aqui você adiciona/edita códigos e links da Shopee
  const productMap = {
    // códigos como string -> URL
    "101": "https://s.shopee.com.br/7AVBBBarRo",   // Kit panela feijoada 3 peças
    "102": "https://s.shopee.com.br/10uXprc0Ga",  // Jogo de Toalhas 5 peças
    "103": "https://s.shopee.com.br/7AVBBCs7nR"   // Kit garrafas squeeze
  };

  // elements
  const input = document.getElementById('codeInput');
  const btn = document.getElementById('searchBtn');
  const feedback = document.getElementById('feedback');

  // helper: normalize code (remove espaços)
  function norm(s){
    return String(s || "").trim();
  }

  function showFeedback(msg, isError){
    feedback.textContent = msg;
    feedback.style.color = isError ? '#b91c1c' : '#374151';
  }

  function searchAndRedirect(){
    const code = norm(input.value);
    if(!code){
      showFeedback('Digite um código válido (ex: 101).', true);
      input.focus();
      return;
    }
    // find exact match
    if(productMap[code]){
      showFeedback('Redirecionando para o produto...', false);
      // slight delay so user sees feedback
      setTimeout(() => {
        window.location.href = productMap[code];
      }, 350);
      return;
    }

    // tenta procurar sem zeros à esquerda ou como número
    const alt = String(Number(code));
    if(productMap[alt]){
      showFeedback('Redirecionando para o produto...', false);
      setTimeout(()=> window.location.href = productMap[alt], 350);
      return;
    }

    // não achou: mostra opção de contato
    showFeedback('Código não encontrado. Se o link estiver vencido, me chama no WhatsApp.', true);
  }

  btn && btn.addEventListener('click', searchAndRedirect);
  input && input.addEventListener('keydown', function(e){
    if(e.key === 'Enter') searchAndRedirect();
  });

  // small: view all (abre seção sobre)
  const viewAll = document.getElementById('viewAll');
  if(viewAll){
    viewAll.addEventListener('click', function(e){
      e.preventDefault();
      document.getElementById('about').scrollIntoView({behavior:'smooth'});
    });
  }

  // nav toggle (mobile)
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if(navToggle){
    navToggle.addEventListener('click', function(){
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      if(nav) nav.style.display = expanded ? 'flex' : 'flex';
      // simple toggle: on very small screens CSS handles visual
    });
  }
});

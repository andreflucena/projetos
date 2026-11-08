document.documentElement.setAttribute('data-js-ok', '');
(function () {
  var reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var each = function (lista, f) { Array.prototype.forEach.call(lista, f); };
  var fora = function (n) { var r = n.getBoundingClientRect(); return r.bottom < 0 || r.top > window.innerHeight; };

  function medirVh() { document.documentElement.style.setProperty('--vh', (window.innerHeight / 100) + 'px'); }
  medirVh();
  window.addEventListener('resize', medirVh);

  each(document.querySelectorAll('.abertura-entra'), function (n) {
    n.addEventListener('animationend', function (e) { if (e.target === n) n.classList.add('pronto'); });
  });

  var observados = [];
  function vai(n) {
    var alvo = n.getAttribute('data-alvo'), est = n.getAttribute('data-vai');
    if (!alvo || !est) return;
    var c = document.querySelector(alvo);
    if (!c) return;
    c.classList.remove('s1', 's2', 's3');
    c.classList.add(est);
  }
  function revelar(n, instantaneo) {
    if (instantaneo) n.classList.add('instantaneo');
    n.classList.add('visivel');
    vai(n);
    io.unobserve(n);
  }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) revelar(e.target, fora(e.target)); });
  }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });
  function primeiraTela(lista) {
    each(lista, function (n) { var r = n.getBoundingClientRect(); if (r.top < window.innerHeight && r.bottom > 0) revelar(n, false); });
  }
  function jaPassou() {
    observados = observados.filter(function (n) {
      if (n.classList.contains('visivel')) return false;
      if (n.getBoundingClientRect().bottom <= 0) { revelar(n, true); return false; }
      return true;
    });
  }
  function observar(lista) { each(lista, function (n) { observados.push(n); io.observe(n); }); primeiraTela(lista); jaPassou(); }

  var itens = document.querySelectorAll('[data-revela], .zz, .pap, .q-sim, .q-nao, #cartao-fecho, .cena .cartao');
  if (reduz) {
    each(itens, function (n) { n.classList.add('visivel'); vai(n); });
  } else {
    observar(itens);
  }

  var barra = document.querySelector('[data-barra]'), topo = document.querySelector('.heroi');
  var botoes = document.querySelectorAll('main .lx-btn');
  function barraFixa() {
    if (!barra) return;
    var vh = window.innerHeight, passou = topo.getBoundingClientRect().bottom < 0, algum = false;
    each(botoes, function (bt) { var r = bt.getBoundingClientRect(); if (r.bottom > 0 && r.top < vh + 40) algum = true; });
    if (passou && !algum) barra.classList.add('mostra'); else barra.classList.remove('mostra');
  }
  var pedido = false;
  window.addEventListener('scroll', function () {
    barraFixa();
    if (pedido) return;
    pedido = true;
    requestAnimationFrame(function () { pedido = false; jaPassou(); });
  }, { passive: true });
  window.addEventListener('resize', barraFixa);
  barraFixa();

  var abas = document.querySelectorAll('.aba'), titulos = { agenda: 'Agenda da semana', crm: 'Funil de avaliações', conf: 'Confirmações', ind: 'Indicadores' };
  var janelaTour = document.querySelector('.tour-tela .janela');
  function escolher(aba, foco) {
    each(abas, function (a) {
      var ativa = a === aba;
      a.setAttribute('aria-selected', ativa ? 'true' : 'false');
      a.setAttribute('tabindex', ativa ? '0' : '-1');
      document.getElementById(a.getAttribute('aria-controls')).hidden = !ativa;
    });
    var chave = aba.id.replace('a-', '');
    each(document.querySelectorAll('[data-tela]'), function (t) { t.hidden = t.getAttribute('data-tela') !== chave; });
    janelaTour.querySelector('[data-titulo]').textContent = titulos[chave];
    if (!reduz) { janelaTour.classList.remove('tela-entra'); void janelaTour.offsetWidth; janelaTour.classList.add('tela-entra'); }
    if (foco) aba.focus();
  }
  each(abas, function (a, i) {
    a.addEventListener('click', function () { escolher(a, false); });
    a.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); escolher(a, false); return; }
      var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!d) return;
      e.preventDefault();
      escolher(abas[(i + d + abas.length) % abas.length], true);
    });
  });

  var dias = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
  var sDia = document.getElementById('s-dia'), sHora = document.getElementById('s-hora'), sTarde = document.getElementById('s-tarde');
  var res = document.querySelector('.resultado');
  var iniciou = false;
  function simular() {
    var d = parseInt(sDia.value, 10), ant = (d + 6) % 7;
    var nome = sDia.options[sDia.selectedIndex].text.toLowerCase();
    document.getElementById('r-av').textContent = 'Avaliação, ' + nome + ', ' + sHora.value;
    if (sTarde.checked) {
      document.getElementById('r-conf').textContent = 'Sem disparo retroativo';
      document.getElementById('r-nota').textContent = 'A confirmação da reserva é feita no ato, por canal disponível.';
    } else {
      document.getElementById('r-conf').textContent = 'Confirmação na ' + dias[ant] + ', às 10h';
      document.getElementById('r-nota').textContent = 'A confirmação sai às 10h do dia anterior, no fuso da clínica.';
    }
    if (!reduz && iniciou) { res.classList.remove('troca'); void res.offsetWidth; res.classList.add('troca'); }
  }
  [sDia, sHora, sTarde].forEach(function (c) { c.addEventListener('change', simular); });
  simular();
  iniciou = true;

  each(document.querySelectorAll('.faq details'), function (d) {
    var sum = d.querySelector('summary'), resp = d.querySelector('.resp');
    sum.addEventListener('click', function (e) {
      if (reduz || !resp.animate) return;
      e.preventDefault();
      if (d.open) {
        var h = resp.offsetHeight;
        var a = resp.animate([{ height: h + 'px', opacity: 1 }, { height: '0px', opacity: 0 }], { duration: 320, easing: 'cubic-bezier(.4,0,.2,1)' });
        a.onfinish = function () { d.open = false; };
      } else {
        d.open = true;
        var alt = resp.offsetHeight;
        resp.animate([{ height: '0px', opacity: 0 }, { height: alt + 'px', opacity: 1 }], { duration: 420, easing: 'cubic-bezier(.2,.8,.2,1)' });
      }
    });
  });

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-evento]');
    if (a && window.dataLayer) window.dataLayer.push({ event: a.getAttribute('data-evento') });
  });

  var form = document.getElementById('form-contato');
  if (form) {
    var passos = form.querySelectorAll('.passo'), atual = 0;
    var info = document.getElementById('passo-i'), prog = document.getElementById('barra-p');
    var volta = document.getElementById('f-volta'), rotulo = document.getElementById('f-rotulo');
    var tel = document.getElementById('f-tel');
    function mostrar() {
      each(passos, function (p, i) { p.hidden = i !== atual; });
      info.textContent = 'Etapa ' + (atual + 1) + ' de 3';
      if (iniciado) prog.style.width = ((atual + 1) / 3 * 100) + '%';
      volta.hidden = atual === 0;
      rotulo.textContent = atual === 2 ? 'Enviar pelo WhatsApp' : 'Continuar';
    }
    var iniciado = false;
    mostrar();
    iniciado = true;
    tel.addEventListener('input', function () {
      var d = tel.value.replace(/\D/g, '').slice(0, 11), s = d;
      if (d.length > 6) s = '(' + d.slice(0, 2) + ') ' + d.slice(2, d.length > 10 ? 7 : 6) + '-' + d.slice(d.length > 10 ? 7 : 6);
      else if (d.length > 2) s = '(' + d.slice(0, 2) + ') ' + d.slice(2);
      tel.value = s;
    });
    var marcar = function (id, msg) {
      var campo = document.getElementById(id), erro = document.getElementById('e-' + id.slice(2));
      campo.setAttribute('aria-invalid', msg ? 'true' : 'false');
      erro.textContent = msg || '';
      return !msg;
    };
    function valida(i) {
      if (i === 0) return marcar('f-nome', document.getElementById('f-nome').value.trim().split(/\s+/).length < 2 ? 'Escreva nome e sobrenome.' : '');
      if (i === 1) return marcar('f-clinica', document.getElementById('f-clinica').value.trim().length < 2 ? 'Escreva o nome da clínica.' : '');
      return marcar('f-tel', tel.value.replace(/\D/g, '').length < 10 ? 'Escreva o WhatsApp com DDD.' : '');
    }
    volta.addEventListener('click', function () { atual = Math.max(0, atual - 1); mostrar(); passos[atual].querySelector('input').focus(); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!valida(atual)) { passos[atual].querySelector('input').focus(); return; }
      if (atual < 2) { atual += 1; mostrar(); passos[atual].querySelector('input').focus(); return; }
      var nome = document.getElementById('f-nome').value.trim().replace(/\s+/g, ' ');
      var clinica = document.getElementById('f-clinica').value.trim().replace(/\s+/g, ' ');
      var msg = 'Olá, sou ' + nome + ', da clínica ' + clinica + '. O WhatsApp da clínica é ' + tel.value.trim() + '. Quero conhecer o AgendaPrime™.';
      window.location.href = 'https://wa.me/5581966175561?text=' + encodeURIComponent(msg);
    });
  }
})();

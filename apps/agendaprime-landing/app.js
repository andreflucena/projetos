document.documentElement.setAttribute('data-js-ok', '');
(function () {
  var reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var each = function (lista, f) { Array.prototype.forEach.call(lista, f); };
  var fora = function (n) { var r = n.getBoundingClientRect(); return r.bottom < 0 || r.top > window.innerHeight; };

  // altura de tela estável, usada no título fixo
  function medirVh() { document.documentElement.style.setProperty('--vh', (window.innerHeight / 100) + 'px'); }
  medirVh();
  window.addEventListener('resize', medirVh);

  // entrada do topo: fixa o estado final quando a animação termina
  each(document.querySelectorAll('.abertura-entra, .luz path, .chev, .chev-f'), function (n) {
    n.addEventListener('animationend', function (e) { if (e.target === n) n.classList.add('pronto'); });
  });

  // revelação por item, quando ele chega na tela
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

  var itens = document.querySelectorAll('[data-revela], [data-revela-arte], .dores li, .tela, .agenda-fig, #cartao-fecho');
  if (reduz) {
    each(itens, function (n) { n.classList.add('visivel'); vai(n); });
  } else {
    observar(itens);
  }

  // barra fixa do celular
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

  // perguntas que abrem e fecham
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

  // eventos de clique, para quando houver pixel
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-evento]');
    if (a && window.dataLayer) window.dataLayer.push({ event: a.getAttribute('data-evento') });
  });

  // formulário: valida e abre o WhatsApp da luxxen.ai com a mensagem pronta
  var form = document.getElementById('form-contato');
  if (form) {
    var tel = document.getElementById('f-tel');
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
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nome = document.getElementById('f-nome').value.trim().replace(/\s+/g, ' ');
      var clinica = document.getElementById('f-clinica').value.trim().replace(/\s+/g, ' ');
      var fone = tel.value.trim(), digitos = fone.replace(/\D/g, '');
      var ok1 = marcar('f-nome', nome.split(' ').length < 2 ? 'Escreva nome e sobrenome.' : '');
      var ok2 = marcar('f-clinica', clinica.length < 2 ? 'Escreva o nome da clínica.' : '');
      var ok3 = marcar('f-tel', digitos.length < 10 ? 'Escreva o WhatsApp com DDD.' : '');
      if (!(ok1 && ok2 && ok3)) { (form.querySelector('[aria-invalid="true"]') || nome).focus(); return; }
      var msg = 'Olá, sou ' + nome + ', da clínica ' + clinica + '. O WhatsApp da clínica é ' + fone + '. Quero conhecer o AgendaPrime™.';
      window.location.href = 'https://wa.me/5581966175561?text=' + encodeURIComponent(msg);
    });
  }
})();

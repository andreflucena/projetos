"""Junta tokens, componentes oficiais e a folha da página em styles.css, sem comentários e sem o rótulo em caixa alta."""
import re, pathlib
raiz = pathlib.Path(__file__).resolve().parent
partes = [raiz / 'marca/tokens.css', raiz / 'marca/components/bundle.css', raiz / 'pagina.css']
css = '\n'.join(p.read_text(encoding='utf-8') for p in partes)
css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
css = '\n'.join(l for l in css.splitlines() if l.strip() and '.lx-eyebrow' not in l)
(raiz / 'styles.css').write_text(css + '\n', encoding='utf-8')
print('styles.css:', len(css), 'bytes')

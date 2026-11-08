# AgendaPrime™: página de apresentação (luxxen.ai)

Landing page do AgendaPrime™, feita com a skill `construtor-paginas` a partir do PRD V1.

**Status:** página construída (`index.html`, `styles.css`, `app.js`); 15 de 16 gates passam. Falta a auditoria independente e a prova final. O gate de imagens reprova porque a primeira tela não tem foto (ver abaixo).

| Pasta ou arquivo | O que é |
|---|---|
| `PLANO.md` | Plano para aprovar: referências, 3 direções visuais, seções, copy e publicação |
| `plano/` | Prévias das três direções e miniaturas das seções |
| `referencias/` | Prints das 8 páginas de referência lidas e a síntese |
| `evidencias/` | PRD, briefing e registros das etapas |
| `marca/` | Design system oficial da luxxen.ai (logos, tokens, componentes) |
| `fonts/` | Plus Jakarta Sans |

Destino do formulário: WhatsApp (81) 96617-5561, aberto por `wa.me`.

## Como montar

```bash
python3 construir-css.py   # junta tokens, componentes e pagina.css em styles.css
```

A pasta `dist/` é a que vai para o ar (montada pelo `montar-dist.py` da skill construtor-paginas).

## Pendências

- Foto na primeira tela (o gate de imagens pede 60% de foto): decisão do dono.
- Política de privacidade completa, preço, domínio, texto da mensagem do WhatsApp.
- `tokens.css` oficial (o atual é gerado do `tokens.json`).
- Confirmar o endereço do site da marca usado em `imagens/LICENCAS.md`.

# AgendaPrime™: página de apresentação, versão 2

Nova versão da página, usando a página da zero4 como referência de estrutura (sem copiar marca, texto, paleta nem dados) e o design system da luxxen.ai. A versão 1 continua em `../agendaprime-landing/`.

**Status:** 15 de 16 gates passam. O que reprova é o gate de composição, que exige uma figura humana na primeira tela. Falta a auditoria independente e a prova final da skill.

```bash
python3 construir-css.py   # junta tokens, componentes e pagina.css em styles.css
```

A pasta `dist/` é a que vai para o ar. Destino do formulário: WhatsApp (81) 96617-5561, aberto por `wa.me`.

## Pendências
- Preço, política de privacidade, domínio e texto da mensagem do WhatsApp.
- Prints reais do produto (as telas são desenhadas, com dados fictícios avisados).
- `tokens.css` oficial (o atual é gerado do `tokens.json`).

# Briefing: página do AgendaPrime™ (luxxen.ai), versão 2

Fonte: PRD AgendaPrime V1 (evidencias/prd.md) e respostas do dono nesta conversa.

## As seis respostas
1. O que vende: AgendaPrime™, plataforma SaaS B2B multi-clínicas que "centraliza agenda de avaliações, CRM comercial, confirmações e indicadores operacionais" (PRD 1.2).
2. Onde atende: online, clínicas no Brasil. SUPOSICAO: o PRD só fixa fuso `America/Sao_Paulo` na clínica demo.
3. Para quem: "gestor ou proprietário de clínica de odontologia estética premium" (PRD 1.4). Quem usa no dia a dia: administrador da clínica e recepção.
4. Oferta: conversa com a luxxen.ai pelo WhatsApp, iniciada por um formulário. O PRD não define demonstração, teste grátis nem plano.
5. Preço: PENDENTE. O PRD não traz preço. Não publicar.
6. Ação: preencher o formulário (nome e sobrenome, nome da clínica, WhatsApp da clínica) e seguir para o WhatsApp da luxxen.ai, (81) 96617-5561 (dado pelo dono).

## Dor (PRD 1.1)
"Clínicas de odontologia estética premium perdem oportunidades comerciais por demora no atendimento, acompanhamento inconsistente, agenda desorganizada e falta de visibilidade sobre o percurso do interessado até a avaliação realizada."

## O que o produto faz na V1 (PRD 2.1 e 4)
- Agenda própria configurável, visões dia, semana e mês; bloqueios; criar, cancelar e remarcar avaliações; "Impedir sobreposição inclusive sob concorrência de requisições" (RF-018).
- CRM: contatos e oportunidades; pipeline "Novo contato; Em qualificação; Qualificado; Avaliação agendada; Avaliação realizada; Encerrado/perdido" (RF-032); Kanban; histórico de cada movimentação (RF-034).
- Confirmação "10h da véspera, no fuso da clínica" (RF-040); "Sem resposta, avaliação permanece ativa e pendente; não cancelar automaticamente" (RF-045).
- Dashboard por clínica: contatos, oportunidades, agendamentos, cancelamentos, remarcações, confirmações, comparecimento e pendências (RF-061).
- Várias clínicas com isolamento de dados (princípio 1) e papéis: administrador, recepção.
- Um agente do GPTMaker no WhatsApp "poderá atender, qualificar e acionar operações seguras" (PRD 1.2), SOMENTE após integração validada.

## Limites que a página respeita (PRD 1.5, 2.2, 14)
- "IA não realiza diagnóstico, recomendação clínica ou orçamento definitivo."
- Sem prontuário, sem financeiro, sem app nativo, sem Google Calendar.
- "Nenhuma métrica é inventada." Sem número de clientes, sem taxa de redução de faltas, sem ROI.
- Integração GPTMaker e disparo ativo de WhatsApp: "Dependências ainda não validadas" (PRD 2.3). A página não pode dizer que o envio real já funciona.
- Esta é a V1, em implantação por fases. A página não afirma que o produto já está no ar para clínicas.

## Design system (luxxen.ai, PRD Apêndice A e pasta marca/)
Tema dark como rosto da marca, Plus Jakarta Sans, violeta e azul, laranja só de destaque, logo SVG oficial, tagline "IA que cuida da rotina. Você cuida do que importa.", sem emoji, sem exclamação, títulos em caixa de frase com ponto final.

## Inventário do material real
- Logo, ícones, tokens e bundle.css oficiais: SIM, em marca/ (recebido do dono).
- Fotos de clínica, equipe ou produto em uso: NENHUMA. Print de tela do AgendaPrime: NENHUM (produto em construção). A página mostra o produto por desenho próprio, marcado como ilustração.
- Depoimentos, número de clientes, cases: NENHUM.
- WhatsApp: (81) 96617-5561.
- E-mail, CNPJ, endereço, política de privacidade: NENHUM.

## Pendências do cliente
- Preço ou forma de contratar.
- Política de privacidade (o formulário coleta nome e telefone; LGPD, PRD RNF-007).
- Domínio final.
- Prints reais do produto quando existirem.
- Confirmar o texto da mensagem que abre no WhatsApp.
- IDs de Meta Pixel e GA4, se houver anúncio.

Negócio fictício de teste: não

## Trechos literais do PRD que sustentam a copy
- "Agenda própria configurável, visualizações dia/semana/mês; bloqueios; criar, cancelar e remarcar avaliações" (PRD 2.1, resumido no item 2.1)
- "Registrar autor, origem, horário, etapa anterior e nova etapa de cada movimentação" (RF-034)
- "Agendamento criado atualiza etapa quando apropriado" (RF-036)
- "Recepção registra realizado ou não compareceu" (J06)
- "Passagem do tempo, sozinha, não implica comparecimento" (J06)
- "A implantação ocorre em fases aprovadas individualmente." (princípio 7)
- "Várias clínicas com isolamento de dados" (PRD 2.1, resumo do princípio 1)

## Pedido da versão 2 (dono, 08/11/2026)
Usar a página https://zero4-landing.vercel.app/#diagnostico como referência para criar a página do produto AgendaPrime, com o design system da luxxen.ai. A zero4 é de outra empresa: leva-se a estrutura e o modo de mostrar o produto, nunca marca, texto, paleta ou dados.

## Trechos literais do PRD que sustentam a copy da versão 2
- "Bloqueios, criação, cancelamento e remarcação de avaliações."
- "Cadastro de contatos e oportunidades; pipeline Kanban e histórico."
- "Exibir agenda por dia, semana e mês, com estados acessíveis."
- "Remarcar atomicamente, preservando reserva anterior em caso de falha."
- "Programar confirmação para **10h da véspera**, no fuso da clínica."
- "Avaliações canceladas não geram mensagem; remarcações invalidam solicitações antigas."
- "Agendamento feito depois das 10h da véspera não gera disparo retroativo; a confirmação da reserva é feita no ato, por canal disponível."
- "Avaliação quinta 14h em São Paulo gera job quarta 10h local."
- "**Recepção:** gerencia contatos, oportunidades, agenda, confirmações e comparecimento."
- "**Administrador da clínica:** configura operação e equipe."
- "**Administrador luxxen.ai:** provisiona clínicas, monitora operações autorizadas e presta suporte."
- "Uma plataforma, múltiplas clínicas com isolamento real de dados."
- "Nenhuma métrica é inventada; valores fictícios só em ambiente DEMO identificado."
- "Prontuário, anamnese, diagnóstico ou gestão clínica."
- "Gestão financeira, cobrança, propostas de tratamento e ROI financeiro."
- "Múltiplas agendas/profissionais por clínica."
- "Aplicativo móvel nativo."
- "Promessas de redução de faltas ou aumento de receita sem dados reais."
- "Impedir sobreposição inclusive sob concorrência de requisições."
- "Clínicas de odontologia estética premium perdem oportunidades comerciais"
- "Dar clareza à operação comercial e reduzir tarefas repetitivas, sem prometer resultados numéricos não comprovados."
- "Cards: contatos, oportunidades, agendamentos, cancelamentos, remarcações, confirmações, comparecimento e pendências."
- "Pipeline inicial: Novo contato; Em qualificação; Qualificado; Avaliação agendada; Avaliação realizada; Encerrado/perdido."
- "Recepção não altera papéis, vínculos ou configurações privilegiadas."
- "Gestor ou proprietário de clínica de odontologia estética premium"
- "só equipe autorizada marca comparecimento ou ausência" (RN-12)
- "Segunda a sexta, 09h–12h e 14h–18h." (PRD 13, clínica demo)
- O formulário tem três etapas: nome e sobrenome, nome da clínica e WhatsApp da clínica. (pedido do dono)

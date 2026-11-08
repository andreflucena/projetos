# PRD — AgendaPrime™ V1
**Produto:** AgendaPrime™  
**Empresa:** luxxen.ai  
**Versão:** 1.0 — especificação para implementação incremental  
**Data:** 07/11/2026  
**Estado:** Pronto para planejamento técnico; integrações externas sujeitas a validação

> **Fonte de verdade:** este PRD define o escopo do produto. O apêndice de identidade visual reproduz o design system fornecido pela luxxen.ai. Havendo conflito com orientações visuais anteriores, prevalece o design system oficial.

## 1. Visão executiva

### 1.1. Problema
Clínicas de odontologia estética premium perdem oportunidades comerciais por demora no atendimento, acompanhamento inconsistente, agenda desorganizada e falta de visibilidade sobre o percurso do interessado até a avaliação realizada.

### 1.2. Proposta
O AgendaPrime™ é uma plataforma SaaS B2B multi-clínicas que centraliza agenda de avaliações, CRM comercial, confirmações e indicadores operacionais. Um agente externo do GPTMaker, conectado ao WhatsApp, poderá atender, qualificar e acionar operações seguras da plataforma.

**Promessa de produto:** dar clareza à operação comercial e reduzir tarefas repetitivas, sem prometer resultados numéricos não comprovados.

### 1.3. Objetivo da V1
Permitir que uma clínica configure uma agenda única, registre e gerencie avaliações, acompanhe oportunidades no CRM, visualize indicadores e, após integração validada, receba agendamentos e confirmações originados pelo GPTMaker.

### 1.4. Público e usuários
- **Cliente comprador:** gestor ou proprietário de clínica de odontologia estética premium.
- **Administrador da clínica:** configura operação e equipe.
- **Recepção:** gerencia contatos, oportunidades, agenda, confirmações e comparecimento.
- **Administrador luxxen.ai:** provisiona clínicas, monitora operações autorizadas e presta suporte.
- **Interessado/paciente:** interage pelo WhatsApp, não pelo painel administrativo nesta versão.

### 1.5. Princípios
1. Uma plataforma, múltiplas clínicas com isolamento real de dados.
2. Uma agenda compartilhada por clínica na V1; expansão para múltiplos profissionais no futuro.
3. Supabase como fonte de verdade de agenda, contatos e oportunidades.
4. Operação humana e automação usam as mesmas regras de negócio.
5. IA não realiza diagnóstico, recomendação clínica ou orçamento definitivo.
6. Nenhuma métrica é inventada; valores fictícios só em ambiente DEMO identificado.
7. A implantação ocorre em fases aprovadas individualmente.

## 2. Escopo e limites

### 2.1. Dentro do escopo da V1
- Autenticação e autorização multi-clínicas.
- Cadastro e administração de clínicas e membros.
- Agenda própria configurável, visualizações dia/semana/mês.
- Bloqueios, criação, cancelamento e remarcação de avaliações.
- Cadastro de contatos e oportunidades; pipeline Kanban e histórico.
- Dashboard operacional por clínica e painel administrativo luxxen.ai.
- Motor de confirmação da véspera às 10h, estados e pendências.
- Integração autenticada com GPTMaker, após validação técnica.
- Testes de segurança, concorrência, fluxos e recuperação de falhas.

### 2.2. Fora do escopo da V1
- Prontuário, anamnese, diagnóstico ou gestão clínica.
- Gestão financeira, cobrança, propostas de tratamento e ROI financeiro.
- Múltiplas agendas/profissionais por clínica.
- Aplicativo móvel nativo.
- Marketing em massa e campanhas avançadas.
- Integração com Google Calendar.
- n8n obrigatório; só adicionar se houver lacuna comprovada.
- Promessas de redução de faltas ou aumento de receita sem dados reais.

### 2.3. Dependências ainda não validadas
- Disponibilidade e contratos reais de API, intenções e webhooks do GPTMaker.
- Disparo ativo de WhatsApp para confirmação (independente do recurso de inatividade informado como problemático).
- Regras de templates, consentimento e entrega das mensagens na configuração real do canal.
- Estratégia operacional de provisionamento de usuários e administrador global.
- Disponibilidade de recursos de agendamento e rotinas periódicas no ambiente Supabase/Lovable contratado.

## 3. Jornadas essenciais

### J01 — Implantação de clínica
Administrador luxxen.ai cria clínica → define fuso → associa administrador autorizado → clínica configura agenda → recepção inicia operação.

### J02 — Agendamento manual
Recepção localiza/cria contato → seleciona oportunidade → consulta horários livres → reserva → recebe confirmação da persistência → evento aparece na agenda → histórico é registrado.

### J03 — Agendamento via IA (após integração)
Interessado conversa com GPTMaker → agente qualifica administrativamente → consulta disponibilidade por API segura → propõe horários → solicita reserva → backend valida e grava atomicamente → agente confirma apenas após sucesso → CRM é atualizado.

### J04 — Confirmação da véspera
Às 10h do dia civil anterior, no fuso da clínica, rotina identifica avaliações elegíveis → registra tentativa idempotente → envia pelo provedor validado → resposta confirma ou solicita remarcação → painel atualiza.

### J05 — Remarcação
Usuário/IA seleciona novo horário → backend verifica disponibilidade e executa alteração atômica → preserva reserva anterior se falhar → invalida lembretes obsoletos → registra histórico.

### J06 — Comparecimento
Recepção registra realizado ou não compareceu → CRM atualiza oportunidade conforme regras → indicadores refletem evento. Passagem do tempo, sozinha, não implica comparecimento.

## 4. Requisitos funcionais (RF)

### 4.1. Autenticação e tenancy
- **RF-001 [P0]** Login por Supabase Auth, sessão e logout seguros.
- **RF-002 [P0]** Criar clínicas com identificador, nome, nome fantasia, fuso e metadados administrativos.
- **RF-003 [P0]** Vínculo de usuários a uma ou mais clínicas, com papel por clínica.
- **RF-004 [P0]** Papéis: administrador global, administrador da clínica, recepção.
- **RF-005 [P0]** Seletor de clínica ativa, quando usuário possuir mais de uma associação.
- **RF-006 [P0]** Provisionamento do primeiro administrador global por procedimento privilegiado e auditado, nunca autoatribuição pública.
- **RF-007 [P0]** Administrador global pode gerenciar apenas por fluxos explicitamente autorizados, com auditoria.

### 4.2. Agenda
- **RF-010 [P0]** Configurar dias de funcionamento e múltiplos períodos por dia.
- **RF-011 [P0]** Configurar duração padrão, intervalo entre avaliações, antecedência mínima e horizonte máximo.
- **RF-012 [P0]** Criar bloqueios de horário, dia ou período, com motivo.
- **RF-013 [P0]** Exibir agenda por dia, semana e mês, com estados acessíveis.
- **RF-014 [P0]** Consultar horários disponíveis considerando regras e fuso da clínica.
- **RF-015 [P0]** Criar avaliação vinculada a contato e, quando aplicável, oportunidade.
- **RF-016 [P0]** Cancelar avaliação e liberar disponibilidade conforme regras.
- **RF-017 [P0]** Remarcar atomicamente, preservando reserva anterior em caso de falha.
- **RF-018 [P0]** Impedir sobreposição inclusive sob concorrência de requisições.
- **RF-019 [P1]** Filtros por data, status e origem; detalhe e histórico do agendamento.
- **RF-020 [P0]** Agendamentos persistem após recarregar e são visíveis apenas à clínica autorizada.

### 4.3. CRM
- **RF-030 [P0]** Cadastro de contatos com nome, telefone e e-mail opcional.
- **RF-031 [P0]** Uma pessoa pode ter múltiplas oportunidades ao longo do tempo.
- **RF-032 [P0]** Pipeline inicial: Novo contato; Em qualificação; Qualificado; Avaliação agendada; Avaliação realizada; Encerrado/perdido.
- **RF-033 [P0]** Recepção pode mover oportunidades por Kanban e por seletor acessível.
- **RF-034 [P0]** Registrar autor, origem, horário, etapa anterior e nova etapa de cada movimentação.
- **RF-035 [P1]** Atribuir responsável, interesse administrativo, origem e motivo de perda.
- **RF-036 [P0]** Agendamento criado atualiza etapa quando apropriado; cancelamento não encerra automaticamente oportunidade.
- **RF-037 [P0]** Confirmação é atributo da avaliação, não uma etapa obrigatória do pipeline.
- **RF-038 [P0]** Atualização externa antiga não sobrescreve silenciosamente mudança humana recente; usar versão/controle de concorrência.
- **RF-039 [P1]** Busca e filtros por etapa, responsável, origem e período.

### 4.4. Confirmações e remarcação
- **RF-040 [P0]** Programar confirmação para **10h da véspera**, no fuso da clínica.
- **RF-041 [P0]** Separar status do agendamento de status de confirmação.
- **RF-042 [P0]** Registrar elegibilidade, tentativa, resultado, falha, identificador externo e timestamps.
- **RF-043 [P0]** Idempotência: não enviar a mesma confirmação duas vezes para a mesma versão do agendamento.
- **RF-044 [P0]** Resposta positiva marca confirmação; pedido de remarcação sinaliza estado e inicia consulta de horários.
- **RF-045 [P0]** Sem resposta, avaliação permanece ativa e pendente; não cancelar automaticamente.
- **RF-046 [P0]** Avaliações canceladas não geram mensagem; remarcações invalidam solicitações antigas.
- **RF-047 [P0]** Agendamento feito depois das 10h da véspera não gera disparo retroativo; a confirmação da reserva é feita no ato, por canal disponível.
- **RF-048 [P1]** Recepção pode confirmar ou remarcar manualmente.
- **RF-049 [P0]** Envio real pelo WhatsApp só entra em produção após validação do canal, consentimento e templates aplicáveis.
- **RF-050 [P1]** Exibir pendências e falhas em tela operacional.

### 4.5. Dashboards
- **RF-060 [P0]** Dashboard por clínica com filtros Hoje, 7 dias, 30 dias e intervalo personalizado.
- **RF-061 [P0]** Cards: contatos, oportunidades, agendamentos, cancelamentos, remarcações, confirmações, comparecimento e pendências.
- **RF-062 [P1]** Gráfico de evolução, funil comercial e distribuição de status.
- **RF-063 [P0]** Definir fórmulas e denominadores, ex.: taxa de agendamento = oportunidades com avaliação agendada no período / oportunidades elegíveis do período, com critério documentado.
- **RF-064 [P0]** Métricas GPTMaker indisponíveis exibem “Integração pendente”, não zero enganoso.
- **RF-065 [P0]** Painel global restrito: clínicas, agendamentos por clínica, alertas, pendências e comparativos autorizados.
- **RF-066 [P0]** Filtros e agregações respeitam tenancy no banco.

### 4.6. Integração GPTMaker
- **RF-070 [P1]** Contratos de operações: consultar disponibilidade, criar, cancelar, remarcar, localizar/criar contato, criar/atualizar oportunidade, registrar evento de atendimento e resposta de confirmação.
- **RF-071 [P0]** Autenticação de integração com credenciais guardadas no servidor, autorização por clínica, validação e rate limiting.
- **RF-072 [P0]** Idempotência e deduplicação de eventos/webhooks; tentativas e logs mínimos.
- **RF-073 [P0]** Interface humana e agente usam o mesmo serviço de regras da agenda.
- **RF-074 [P1]** Mensagens enviadas só depois da confirmação da operação no banco.
- **RF-075 [P1]** Suporte a transferência humana e tratamento de falhas conforme capacidades verificadas do GPTMaker.
- **RF-076 [P0]** Não usar rotas não oficiais como dependência de produção sem análise de risco e aprovação.

## 5. Regras de negócio (RN)

- **RN-01:** cada clínica tem exatamente uma agenda de avaliações ativa na V1.
- **RN-02:** períodos são configuráveis e podem ter pausa de almoço.
- **RN-03:** horários são calculados a partir das regras e dos intervalos, não armazenados como slots fixos independentes.
- **RN-04:** reserva é rejeitada se cruzar outra reserva ativa ou bloqueio; proteção efetiva no banco/transação.
- **RN-05:** armazenar instantes em UTC; interpretar regras recorrentes no fuso IANA da clínica.
- **RN-06:** remarcação preserva agendamento anterior em caso de erro e registra histórico da alteração.
- **RN-07:** confirmação programada às 10h da data local anterior, independentemente do horário da avaliação.
- **RN-08:** confirmação não equivale a comparecimento.
- **RN-09:** sem resposta não cancela automaticamente.
- **RN-10:** ao cancelar, não encerrar automaticamente oportunidade.
- **RN-11:** mudança de etapa manual e automática exige registro de auditoria.
- **RN-12:** só equipe autorizada marca comparecimento ou ausência.
- **RN-13:** não registrar detalhes clínicos desnecessários no CRM ou na mensagem de confirmação.
- **RN-14:** dados de demonstração são identificados como fictícios e isolados por tenant.

## 6. Modelo lógico de dados

O desenho final e migrações devem ser propostos e aprovados na Fase A. Entidades mínimas:

| Entidade | Campos essenciais | Observações |
|---|---|---|
| `clinics` | id, name, display_name, phone, timezone, timestamps | Tenant |
| `profiles` | user_id, full_name, timestamps | Perfil autenticado |
| `clinic_memberships` | id, clinic_id, user_id, role | Papéis por clínica |
| `platform_admins` | user_id, granted_by, created_at | Provisionamento privilegiado |
| `clinic_settings` | clinic_id, duration_minutes, buffer_minutes, min_notice_minutes, horizon_days | Uma configuração por clínica |
| `business_hours` | id, clinic_id, weekday, start_time, end_time, enabled | Vários períodos por dia |
| `schedule_blocks` | id, clinic_id, start_at, end_at, reason, created_by | Indisponibilidade |
| `contacts` | id, clinic_id, full_name, phone, email, timestamps | Evitar duplicidade conforme regra definida |
| `opportunities` | id, clinic_id, contact_id, stage, assigned_to, source, interest_category, loss_reason, version | Controle de concorrência |
| `opportunity_activities` | id, clinic_id, opportunity_id, actor_type, actor_id, from_stage, to_stage, occurred_at | Auditoria |
| `appointments` | id, clinic_id, contact_id, opportunity_id, start_at, end_at, status, confirmation_status, source, version, timestamps | Intervalos não sobrepostos |
| `appointment_events` | id, clinic_id, appointment_id, event_type, actor_type, actor_id, payload_minimal, occurred_at | Histórico |
| `appointment_confirmation_jobs` | id, clinic_id, appointment_id, appointment_version, due_at, status, attempts, provider_message_id, timestamps | Chave única de idempotência |
| `integration_connections` | id, clinic_id, provider, status, reference, timestamps | Segredos fora do frontend |
| `integration_events` | id, clinic_id, provider, external_event_id, event_type, status, attempts, timestamps | Deduplicação |

**Requisitos de integridade:** índices e chaves estrangeiras compostas ou validações equivalentes devem garantir que `contact_id`, `opportunity_id` e `appointment_id` pertençam ao mesmo `clinic_id`. A política RLS não substitui integridade relacional. Aplicar restrições de sobreposição com mecanismo robusto do PostgreSQL e lógica transacional para intervalos/buffers.

## 7. Segurança, privacidade e confiabilidade (RNF)

- **RNF-001:** RLS em toda tabela tenant-scoped; testes negativos de acesso cruzado.
- **RNF-002:** políticas de escrita por papel, não apenas por usuário autenticado.
- **RNF-003:** administrador global provisionado por operação privilegiada auditada.
- **RNF-004:** nenhuma `service_role` ou segredo de integração no navegador.
- **RNF-005:** operações externas autenticadas e limitadas à clínica autorizada.
- **RNF-006:** validação de payload, tratamento de erros e logs sem conteúdo sensível desnecessário.
- **RNF-007:** retenção, exclusão, consentimento e controles de acesso compatíveis com obrigações aplicáveis da LGPD; revisar juridicamente antes de produção.
- **RNF-008:** prevenção de duplicidade e tolerância a retries em webhooks e confirmações.
- **RNF-009:** estados de carregamento, vazio, falha e sucesso explícitos.
- **RNF-010:** acessibilidade de teclado, foco visível e contraste adequado.
- **RNF-011:** datas e horários exibidos no fuso da clínica, com UTC no armazenamento.
- **RNF-012:** sem alegações clínicas, diagnósticos ou promessas de resultados não comprovados.
- **RNF-013:** ambiente de demonstração sem dados reais de pacientes.
- **RNF-014:** mudanças de esquema versionadas por migrações e revisadas antes de produção.

## 8. Telas e navegação

**Navegação lateral:** Visão geral; Agenda; CRM; Contatos; Confirmações; Configurações; Equipe. Administração luxxen.ai em área restrita.

### Tela 01 — Login
Autenticação, recuperação de acesso quando suportada, feedback de erro sem vazamento de informação.

### Tela 02 — Visão geral da clínica
KPIs, evolução de agendamentos, funil, confirmações, próximas avaliações e pendências. Filtro temporal. Dados reais.

### Tela 03 — Agenda
Dia/semana/mês, criar/editar/cancelar/remarcar, bloqueios, status, detalhes do contato, identificação da origem.

### Tela 04 — CRM
Kanban, cartões de oportunidade, movimentação manual, detalhe, histórico, responsável, filtros e motivos de perda.

### Tela 05 — Contatos
Busca, cadastro, edição e histórico administrativo de oportunidades/avaliações.

### Tela 06 — Confirmações
Pendentes, confirmadas, solicitações de remarcação, falhas de envio, ações manuais e histórico.

### Tela 07 — Configurações
Horários por dia, múltiplos períodos, duração, buffers, antecedência, horizonte e bloqueios.

### Tela 08 — Equipe
Membros e papéis, administração com autorização no backend.

### Tela 09 — Administração luxxen.ai
Clínicas, vínculos autorizados, visão agregada, alertas e acesso contextual auditado.

## 9. Design system obrigatório — luxxen.ai

**Esta seção substitui todas as orientações anteriores de cores dourado/champagne.** Aplicar a identidade visual oficial fornecida no anexo, preservada integralmente no Apêndice A.

### 9.1. Identidade e voz
- Grafia exata: **luxxen.ai** sempre em minúsculas.
- Tagline: **IA que cuida da rotina. Você cuida do que importa.**
- Voz: português do Brasil; frases curtas, afirmativas, sem emojis nem exclamações.
- Títulos em caixa de frase, com ponto final.
- Vocabulário: agentes, automação, processos, inteligência, eficiência, resultados, clareza, fluxo, conexão.
- Não prometer números sem casos reais.

### 9.2. Temas
- **Dark é o tema principal da marca**, com `surface` Midnight `#0B0F1A`.
- **Light é a variação completa**, indicada para páginas internas e leitura longa.
- **Decisão de UX do produto:** usar **Light como padrão nas telas operacionais densas** (agenda, CRM, tabelas e dashboards) para legibilidade prolongada, mantendo Dark no login, capas e pontos institucionais. Disponibilizar tema Dark operacional quando viável, respeitando os tokens de ambos. Essa é uma decisão de produto alinhada às aplicações descritas no design system, não uma alteração da identidade.
- Não misturar temas lado a lado numa mesma tela.

### 9.3. Cores e tokens
- Paleta: `midnight`, `violet`, `electric-blue`, `cloud`, `graphite`.
- Gradiente violeta → azul elétrico, da esquerda para a direita, em detalhes pontuais; nunca como fundo da página inteira.
- Laranja apenas como microdestaque, abaixo de 10% da área, **nunca em botões ou texto corrido**.
- No Light: destaque azul textual `#2563EB`; laranja Brasa `#C2410C` nas condições previstas.
- No Dark: texto de destaque violeta `#A78BFA` e azul `#60A5FA`.
- Usar tokens semânticos `surface`, `surface-raised`, `ink`, `border`, `border-strong`, `primary`, `on-primary`, `focus`, `accent-violet`, `accent-blue`, `accent-orange`, conforme os arquivos oficiais quando disponíveis.
- Não inventar valores de tokens não especificados no anexo. Solicitar `tokens.css` se necessário.

### 9.4. Tipografia e componentes
- **Plus Jakarta Sans**, pesos 400–800, para toda a interface; Montserrat Alternates ExtraBold é exclusiva do logo.
- Grade de 4px, painéis com `space-6`, gaps `space-3`.
- `radius-md` em painéis/cards, `radius-pill` em botões/badges, `radius-lg` reservado ao ícone do app.
- Foco sólido de 2px com offset de 2px.
- Ícones de linha com traço 1.75px e cantos arredondados; Lucide como substituto provisório.
- Sem emojis, sem sombras pesadas, sem itálicos nos títulos.
- Priorizar contraste, estados acessíveis e uso diário pela recepção.

### 9.5. Logo e ativos
- **Nunca recriar o logo digitando “luxxen.ai” como substituto gráfico.**
- Usar os SVGs oficiais de `assets/Logos` quando fornecidos: `luxxen-logo-dark-bg.svg`, `luxxen-logo-light-bg.svg`, `luxxen-symbol.svg` e ícones.
- Caso SVGs não estejam anexados ao projeto, solicitar os arquivos; usar **placeholder textual explicitamente provisório** até recebê-los, sem fingir ser o logo oficial.
- Tamanho mínimo do logo: 96px; ícone: 16px; respeitar área de proteção.

### 9.6. Aplicação ao AgendaPrime™
- Interface SaaS de alta clareza, com navegação lateral, cards, gráficos e tabelas coerentes.
- Destaques de seleção e ações primárias em violeta/azul, nunca dourado.
- Laranja reservado a um ponto de atenção por composição, não a erros críticos genéricos.
- Motivos de fluxo e conexão apenas em áreas decorativas, nunca atrás de tabelas ou texto pequeno.
- Conversa WhatsApp em mockups segue a exceção verde prevista no design system.
- Se os arquivos `tokens.css` e `components/bundle.css` forem fornecidos, priorizar seus tokens/classes `lx-`; caso contrário, implementar tokens equivalentes com rastreabilidade, sem inventar identidade divergente.

## 10. Métricas e definições

| Métrica | Definição preliminar | Fonte |
|---|---|---|
| Novos contatos | Contatos criados no período | Supabase |
| Oportunidades criadas | Oportunidades com criação no período | Supabase |
| Avaliações agendadas | Reservas criadas no período, com tratamento explícito de cancelamentos | Supabase |
| Confirmações pendentes | Avaliações futuras com confirmação solicitada e não respondida | Supabase |
| Taxa de confirmação | Avaliações confirmadas / avaliações com confirmação solicitada e elegíveis | Supabase |
| Taxa de comparecimento | Avaliações realizadas / avaliações cuja data passou e têm desfecho registrado | Supabase |
| Taxa de agendamento | Oportunidades elegíveis que geraram reserva / oportunidades elegíveis no período | Supabase |
| Atendimentos pela IA | Eventos efetivamente sincronizados do GPTMaker | GPTMaker após integração |

Antes de publicar taxas, documentar janelas temporais, exclusões e regras para remarcações, evitando dupla contagem.

## 11. Roadmap de implementação

### Fase A — Fundação e segurança [primeira execução]
Autenticação, schema mínimo, clínicas, perfis, membros, papéis, RLS, provisionamento seguro do administrador global, testes de isolamento. **Não avançar sem aprovação.**

### Fase B — Agenda
Configurações, horários, bloqueios, motor de disponibilidade, reservas atômicas, cancelamentos, remarcações e testes de concorrência.

### Fase C — CRM
Contatos, oportunidades, Kanban, histórico, operação manual e regras de sincronização com agenda.

### Fase D — Dashboards
Visão operacional por clínica, indicadores reais, pendências e administração consolidada.

### Fase E — Confirmações
Jobs às 10h da véspera, estados, idempotência, tela de pendências e simulação de envio sem canal real.

### Fase F — GPTMaker e WhatsApp
Validar capacidades reais; implementar operações autenticadas, eventos, agente e canal; testar envio ativo, respostas, remarcação e templates aplicáveis. Se recurso indisponível, documentar limitação e alternativa antes de contratar dependências.

### Fase G — Homologação
Testes ponta a ponta, falhas, acesso cruzado, concorrência, privacidade, acessibilidade e performance básica.

## 12. Critérios de aceite por fase

**A — Segurança**
- Usuário A da Clínica 1 não lê, edita ou enumera registros da Clínica 2, inclusive manipulando requisições.
- Recepção não altera papéis, vínculos ou configurações privilegiadas.
- Administrador global só é provisionado por fluxo privilegiado auditado.
- RLS cobre SELECT, INSERT, UPDATE e DELETE conforme papel.

**B — Agenda**
- Horários configurados aparecem corretamente.
- Bloqueios impedem reserva.
- Duas solicitações simultâneas ao mesmo intervalo resultam em no máximo uma reserva.
- Remarcação falha sem perder reserva anterior.
- Persistência e fuso horário validados.

**C — CRM**
- Recepção cria e move oportunidades.
- Histórico guarda ator e transição.
- Cancelamento não marca automaticamente oportunidade como perdida.
- Operações cruzadas entre clínicas são negadas.

**D — Dashboards**
- Todos os KPIs têm fonte e definição.
- Métricas não integradas mostram indisponibilidade explícita.
- Administrador da clínica não acessa dados consolidados de outras clínicas.

**E — Confirmações**
- Avaliação quinta 14h em São Paulo gera job quarta 10h local.
- Não duplica job/disparo.
- Cancelamento ou remarcação invalida job antigo.
- Sem resposta não cancela avaliação.
- Envio externo não é declarado funcional sem teste real.

**F — Integração**
- GPTMaker não acessa outra clínica.
- Retries não duplicam contatos ou reservas.
- Agente só confirma reserva após sucesso no backend.
- Confirmação/remarcação pelo WhatsApp testadas em canal real autorizado.

**G — Homologação**
- Fluxos principais executados por usuário não técnico.
- Logs e erros rastreáveis.
- Sem dados reais no ambiente DEMO.

## 13. Ambiente de demonstração

Clínica fictícia: **Clínica Aurora Estética Dental — DEMO**.

- Fuso: `America/Sao_Paulo`.
- Segunda a sexta, 09h–12h e 14h–18h.
- Duração: 45 minutos.
- Intervalo: 15 minutos.
- Contatos e avaliações exclusivamente fictícios.
- Nenhum dado DEMO exposto a outras clínicas.
- Identificação visual inequívoca de ambiente demonstrativo.

## 14. Decisões abertas e riscos

| Item | Situação | Ação |
|---|---|---|
| API do GPTMaker para mensagens ativas | Não validada | Prova técnica antes de ativar confirmações reais |
| Integração GPTMaker → Supabase | A definir contrato | Documentar autenticação, payloads, retries e rate limits |
| Ativos SVG oficiais | Referenciados no design system, não incluídos neste anexo textual | Solicitar upload ao Lovable |
| Arquivos `tokens.css` e `components/bundle.css` | Referenciados, não anexados aqui | Solicitar para fidelidade exata |
| LGPD, retenção e base legal | Exige definição operacional/jurídica | Revisar antes de produção |
| Usuários de várias clínicas | Requisito confirmado | Testar troca de contexto e políticas |
| Agendamentos em horários de mudança de fuso | Caso de borda | Testar com datas e fuso IANA |
| Taxas de conversão | Fórmulas preliminares | Validar definição comercial antes do dashboard final |

## 15. Instrução inicial ao Lovable

Leia este PRD integralmente, incluindo o Apêndice A. Não implemente a aplicação inteira de uma vez.

Na primeira interação:
1. Identifique requisitos, dependências e riscos.
2. Verifique a conexão com Supabase e os ativos oficiais disponíveis.
3. Proponha schema, políticas RLS e provisionamento seguro do administrador global.
4. Apresente o plano detalhado da **Fase A**, incluindo testes de isolamento entre duas clínicas.
5. Liste autorizações/configurações necessárias do proprietário.
6. **Aguarde aprovação explícita antes de alterações estruturais.**

Se houver divergência entre exemplos visuais e o design system oficial, prevalece o design system.

---

# Apêndice A — Design system oficial da luxxen.ai (transcrição integral do anexo)

O conteúdo abaixo foi fornecido pelo usuário e deve ser tratado como especificação de marca. Arquivos de imagem, SVG e CSS citados no texto **não foram anexados ao PRD**; devem ser fornecidos separadamente quando necessários.

luxxen.ai — agentes de IA e automação inteligente para empresas que querem escalar com clareza e eficiência. O nome nasce da união de **Lucena** com **Lux (luz)**: a marca representa **clareza, direção e inteligência em movimento**. Tudo o que for criado com este sistema deve parecer luz organizando o espaço — um feixe violeta→azul, texto nítido, muito respiro, e um toque de laranja que guia o olhar.

Tagline oficial: **IA que cuida da rotina. Você cuida do que importa.**

## Para quem

Clientes iniciais: **clínicas, escritórios de advocacia, escritórios de contabilidade e e-commerce** — pequenos e médios negócios que perdem tempo com tarefas repetidas (agenda, prazos, documentos, atendimento). Fale a língua deles: rotina, atendimento, prazo, documento, pedido. Evite vocabulário de grande empresa (supply chain, ERP, compras). Nunca prometa número sem caso real.

## Conteúdo e voz

- Escreva o nome sempre em minúsculas: **luxxen.ai** — inclusive no início de frase ("luxxen.ai nasce da união…"). Nunca "Luxxen.ai", "LUXXEN" ou "Luxxen AI".
- Escreva em português do Brasil, falando com a empresa como "você"/"seu negócio"; a marca fala como "nós" ("Transformamos…").
- Frases curtas, afirmativas, orientadas a resultado. Use pares de frases curtas, como na tagline: "IA que cuida da rotina. Você cuida do que importa." O cliente fica no centro; o agente cuida do trabalho repetido.
- Vocabulário da marca: agentes, automação, processos, inteligência, eficiência, resultados, clareza, fluxo, conexão.
- Prometa resultado mensurável, nunca mágica: "Mais com menos. Sempre.", "Crescimento real e mensurável."
- Sem emoji. Sem exclamação. Títulos em caixa de frase com ponto final ("Inteligência em movimento.").
- Exemplos da marca:
  - "Sua agenda no automático."
  - "Prazos sob controle, sem planilha."
  - "Documento recebido, lançamento pronto."
  - "Cliente atendido, pedido acompanhado."
  - "Transformamos agentes de IA e automações em eficiência operacional, decisões melhores e resultados mensuráveis."

## Os seis pilares

| Pilar | Frase |
| --- | --- |
| Agentes | IA que trabalha pelo seu negócio. |
| Automação | Processos que se executam sozinhos. |
| Processos | Operações mais inteligentes e conectadas. |
| Inteligência | Dados que geram decisões melhores. |
| Eficiência | Mais com menos. Sempre. |
| Resultados | Crescimento real e mensurável. |

## Temas

A marca tem dois temas completos. Ambos valem para site, apresentações, redes e impressos.

- **Dark — principal.** É o rosto da marca: use por padrão em capas, hero do site, avatar, materiais de lançamento e qualquer peça sem restrição. `surface` = Midnight `#0B0F1A`, painéis em `surface-raised`, texto em `ink`.
- **Light — variação completa.** Use quando o contexto pede leitura longa ou fundo claro: páginas internas do site, propostas, documentos, slides de conteúdo, impressos em papel branco. `surface` branco-gelo, painéis brancos com borda `border` e sombra `card`.
- Numa mesma peça, não misture os dois temas lado a lado — exceto em kits de aplicação (ex.: par de cartões, um escuro e um branco).

## Cor

- Paleta oficial e seus significados: `midnight` (confiança), `violet` (inovação), `electric-blue` (tecnologia), `cloud` (clareza), `graphite` (estrutura). Os valores são os mesmos nos dois temas.
- O **gradiente da marca** vai de `violet` a `electric-blue`, da esquerda para a direita (símbolo » e ".ai" do logo). Use-o no símbolo, em linhas de luz e em no máximo uma palavra-chave por título. Nunca como fundo de página inteira.
- **Base violeta e azul, com laranja só de destaque.** O laranja (`laranja-lux`, `brasa` no claro) é um toque: nunca fundo, nunca botão, nunca texto corrido. Use-o em uma ou duas palavras do título, nos números de passo, nas setas » entre etapas e no chevron frontal do hero. Em uma peça, o laranja ocupa menos de 10% da área; se competir com o violeta, reduza.
  - No **escuro**, `accent-orange` é o Laranja Lux (6.7:1 sobre Midnight); no **claro**, vira Brasa `#C2410C` (5.2:1). O laranja puro sobre branco só vale em texto de 24px+ e em elementos decorativos.
  - Botão primário, abas ativas, ícones e logo continuam violeta/azul. Texto sobre violeta é branco; nunca coloque texto sobre laranja.
- Destaque palavras com `accent-violet` e `accent-blue` (ex.: "**eficiência operacional**, **decisões melhores** e **resultados mensuráveis**"). Alterne as duas; no máximo três destaques por bloco, e no máximo um deles em laranja.
  - No **claro**, `accent-violet` é o próprio Violet; `accent-blue` é um azul um tom abaixo (`#2563EB`) para manter a leitura. Em títulos de 24px+ pode-se usar `electric-blue` puro.
  - No **escuro**, os destaques são versões mais claras (`#A78BFA`, `#60A5FA`); `violet` puro como texto só a partir de 24px.
- Rótulos de seção usam `label`: cinza no escuro, Midnight no claro.
- Botão primário: `primary` com texto `on-primary`. Controles com contorno usam `border-strong`; painéis usam `border`.
- Fundos com brilho: gradientes radiais suaves de `glow-tint-violet` e `glow-tint-blue` sobre `surface`, saindo de um canto ou da borda direita. No claro, use esse brilho (lilás no canto superior esquerdo, azul-claro no inferior direito) em vez de fundo chapado.
- Foco: anel sólido de 2px em `focus`, offset 2px, em todo elemento interativo.

## Tipografia

- Uma família só: **Plus Jakarta Sans** (Google Fonts, pesos 400–800) via `--font-sans`. Carregue: `https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap`.
- `display` para o hero e capas; `h1`–`h3` para hierarquia; `body`/`body-lg` para texto; `caption` para descrições de card.
- `eyebrow` sempre em CAIXA ALTA, numerado como no brand board: "01. LOGO PRINCIPAL".
- Títulos com tracking negativo (já nos estilos); nunca use itálico.

## Espaço, forma e profundidade

- Grade de 4px: `space-1` … `space-16`. Painéis com padding `space-6`, gap entre painéis `space-3`.
- Raios: `radius-md` para painéis e cards, `radius-pill` para todo botão e badge, `radius-lg` só no ícone do app.
- Profundidade: no escuro, borda + brilho (`glow-violet`, `glow-blue`, `glow-orange` só no chevron); no claro, borda + sombra suave `card`. Nunca sombras pesadas.

## Linguagem visual

Três motivos: **Fluxo e movimento** (linhas de luz curvas violet→blue), **Conexão e orquestração** (rede de pontos ligados por linhas finas) e **Inteligência em ação** (horizonte de planeta iluminado por um arco de luz).

- No **escuro**: linhas e pontos luminosos sobre Midnight, alto contraste.
- No **claro**: os mesmos motivos viram luz suave — linhas lilás e azul-claro translúcidas, rede em azul fino sobre branco; o planeta continua saturado (azul profundo) como único ponto escuro da composição.
- **Chevron grande** (posts e site): três » sobrepostos na borda direita — os dois de trás em `violet` com opacidade 10–30%, o da frente em `accent-orange`. É o principal lugar do laranja.
- **Fluxo de processo**: etapas separadas por » laranja (`ProcessSteps`), com a etapa do agente luxxen.ai em violeta cheio.
- **Conversa de WhatsApp** (`WhatsAppChat`): sempre que uma peça mostrar uma conversa, use um celular com a tela no estilo WhatsApp — cabeçalho verde, fundo branco, balões verdes do cliente à direita e cinza do agente à esquerda. É a única exceção de verde na marca; reduza o celular e dê espaço ao redor.
- Use os motivos à direita da composição, com o texto à esquerda — nunca atrás de texto pequeno.
- Referências completas: `luxxen-brand-board-dark.jpg` e `luxxen-brand-board-light.jpg`.

## Logo e símbolo

Use sempre os arquivos SVG de `assets/Logos` — nunca recrie o logo digitando o nome, nem use recortes de imagem.

- **Logo principal**: "lu" + duplo chevron » no lugar do primeiro "x" + "xen" + ".ai" no gradiente, em Montserrat Alternates ExtraBold (fonte exclusiva do logo — nunca use em textos; o resto da marca é Plus Jakarta Sans).
  - `luxxen-logo-dark-bg.svg` — texto branco, para o tema escuro (padrão).
  - `luxxen-logo-light-bg.svg` — texto Midnight, para o tema claro.
- **Geometria do logo**: as duas setas têm a altura do "x"; o espaço entre as duas setas é exatamente o mesmo espaço entre a segunda seta e o "x", formando um bloco » x de ritmo regular. Nunca recomponha o logo à mão — use os SVGs.
- **Símbolo**: o duplo chevron » — avanço, fluxo e direção. `luxxen-symbol.svg` é o símbolo sem fundo.
- **Ícone (app, avatar, favicon)**, sempre no squircle:
  - `luxxen-icon-dark.svg` — **padrão**, inclusive sobre fundos claros.
  - `luxxen-icon-violet.svg` — fundo Violet, setas brancas: avatares e destaques em redes.
  - `luxxen-icon-graphite.svg` — neutro, para contextos monocromáticos ou discretos.
  - `luxxen-icon-light.svg` — fundo branco, para quando o ícone escuro pesar demais.
- Área de proteção: a altura do "x" ao redor do logo. Tamanho mínimo: logo 96px de largura; ícone 16px. Não distorça, não recolora, não aplique sombra ou contorno.
- Use o » também como marcador de CTA ("Fale com um especialista »").

## Iconografia

- Ícones de linha, traço 1.75px, cantos arredondados, 24px, em `accent-violet` ou `accent-blue` — alterne as duas cores num grupo (como nos pilares); laranja só em um ícone de destaque por grupo. O brand board não define uma biblioteca; o mais próximo é **Lucide** (user, settings, layers, brain, bar-chart-3, target) — substituto sinalizado até existir um set próprio.
- Sem emoji, sem ícones preenchidos coloridos.

## Aplicações

- **Posts por setor** (`assets/Posts`, 1080×1350): um geral, um por segmento (clínicas, advocacia, contabilidade, e-commerce) e um "sobre", cada um em dark e light; mais uma versão de cada segmento com o mockup de WhatsApp. O light usa brilho lilás/azul, chevrons mais fortes e cards com sombra suave.
- **Site**: hero escuro com título display, uma palavra em laranja, CTA violeta e chevron grande à direita; abas por segmento; páginas internas no claro.
- **Redes sociais**: avatar `luxxen-icon-dark.svg`; carrossel em Midnight com título branco e uma palavra laranja.
- **Propostas e documentos**: tema claro, logo `luxxen-logo-light-bg.svg`, uma palavra em Brasa no título.

## Componentes

`Button`, `Eyebrow`, `Panel`, `PillarCard`, `ProcessSteps`, `Metric` e `WhatsAppChat` são classes CSS em `components/bundle.css` (prefixo `lx-`), sem dependência de React: carregue `tokens.css`, a fonte e `bundle.css`, e use as classes. Todos funcionam nos dois temas.


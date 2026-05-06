const botaoTema = document.getElementById("themeToggle");
const botaoMenu = document.getElementById("menuToggle");
const barraLateral = document.getElementById("sidebar");
const linksNavegacao = document.querySelectorAll(".nav__link");
const telas = document.querySelectorAll(".screen");
const botoesTrocaTela = document.querySelectorAll("[data-screen-target]");
const botoesAcao = document.querySelectorAll("[data-action]");
const elementosPorPerfil = document.querySelectorAll("[data-requires-role]");

const tituloSecaoPequeno = document.getElementById("tituloSecaoPequeno");
const tituloSecao = document.getElementById("tituloSecao");
const descricaoSecao = document.getElementById("descricaoSecao");

const loginOverlay = document.getElementById("loginOverlay");
const loginForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("loginEmail");
const loginSenha = document.getElementById("loginSenha");
const loginEmailLabel = document.getElementById("loginEmailLabel");
const botoesPerfil = document.querySelectorAll("[data-role]");
const botaoPreencherDemo = document.getElementById("preencherDemo");

const modal = document.getElementById("actionModal");
const modalEtiqueta = document.getElementById("modalEtiqueta");
const modalTitulo = document.getElementById("modalTitulo");
const modalDescricao = document.getElementById("modalDescricao");
const modalConteudo = document.getElementById("modalConteudo");
const botaoFecharModal = document.getElementById("fecharModal");
const botaoCancelarModal = document.getElementById("cancelarModal");
const botaoConfirmarModal = document.getElementById("confirmarModal");
const listaEquipe = document.getElementById("teamList");
const botaoAdicionarFuncionario = document.getElementById("addTeamMemberButton");
const formularioEquipe = document.getElementById("teamForm");
const campoNomeEquipe = document.getElementById("teamName");
const campoFuncaoEquipe = document.getElementById("teamRole");
const seletorStatusInicialEquipe = document.getElementById("teamInitialStatus");
const campoAtividadeInicialEquipe = document.getElementById("teamInitialActivity");
const blocoAtividadeInicialEquipe = document.getElementById("teamInitialActivityField");
const botaoEditarSaude = document.getElementById("editHealthButton");
const formularioSaude = document.getElementById("healthForm");
const campoSaudePressao = document.getElementById("healthBp");
const campoSaudeHeart = document.getElementById("healthHeart");
const campoSaudeTemp = document.getElementById("healthTemp");
const campoSaudeGlucose = document.getElementById("healthGlucose");
const campoSaudeTitulo1 = document.getElementById("healthNoteTitle1");
const campoSaudeTexto1 = document.getElementById("healthNoteText1");
const campoSaudeTitulo2 = document.getElementById("healthNoteTitle2");
const campoSaudeTexto2 = document.getElementById("healthNoteText2");
const campoSaudeTitulo3 = document.getElementById("healthNoteTitle3");
const campoSaudeTexto3 = document.getElementById("healthNoteText3");
const listaResidentes = document.getElementById("residentList");
const botaoEditarResidente = document.getElementById("editResidentButton");
const formularioResidente = document.getElementById("residentForm");
const campoResidenteNome = document.getElementById("residentEditName");
const campoResidenteMeta = document.getElementById("residentEditMeta");
const campoResidenteTags = document.getElementById("residentEditTags");
const campoResumoLabel1 = document.getElementById("residentSummaryLabel1");
const campoResumoValor1 = document.getElementById("residentSummaryValue1");
const campoResumoLabel2 = document.getElementById("residentSummaryLabel2");
const campoResumoValor2 = document.getElementById("residentSummaryValue2");
const campoResumoLabel3 = document.getElementById("residentSummaryLabel3");
const campoResumoValor3 = document.getElementById("residentSummaryValue3");

let perfilSelecionado = "familiar";
let acaoAtual = null;
let residenteVinculadoAoFamiliar = "maria";

const conteudoDasTelas = {
  inicio: {
    etiqueta: "Painel do lar de idosos",
    titulo: "Visão geral organizada por áreas",
    descricao: "Acompanhe indicadores, moradores, saúde, relatórios, equipe e agenda em telas separadas."
  },
  residentes: {
    etiqueta: "Área de residentes",
    titulo: "Perfis e prontuários em uma tela dedicada",
    descricao: "Consulte informações de cada residente sem misturar dados com os outros setores."
  },
  saude: {
    etiqueta: "Área de saúde",
    titulo: "Monitoramento clínico do residente",
    descricao: "Veja sinais vitais, estabilidade e pontos de atenção em uma tela exclusiva de saúde."
  },
  relatorios: {
    etiqueta: "Área de relatórios",
    titulo: "Geração e consulta de relatórios",
    descricao: "Acesse relatórios diários, clínicos e gerenciais sem poluir a tela inicial."
  },
  equipe: {
    etiqueta: "Área da equipe",
    titulo: "Profissionais ativos no turno",
    descricao: "Acompanhe quem está em atividade e a função de cada profissional."
  },
  agenda: {
    etiqueta: "Área da agenda",
    titulo: "Compromissos do dia em uma tela própria",
    descricao: "Organize o turno com horários e tarefas sem misturar com os demais módulos."
  }
};

const configuracaoAcoes = {
  "novo-relatorio": {
    etiqueta: "Novo relatório",
    titulo: "Criar novo relatório",
    descricao: "Preencha os campos abaixo para iniciar um relatório assistencial.",
    confirmacao: "Relatório iniciado com sucesso."
  },
  prontuario: {
    etiqueta: "Prontuário",
    titulo: "Prontuário do residente",
    descricao: "Resumo rápido do prontuário para consulta imediata.",
    confirmacao: "Prontuário consultado."
  },
  historico: {
    etiqueta: "Histórico",
    titulo: "Histórico de atendimento",
    descricao: "Linha do tempo com últimas evoluções e registros.",
    confirmacao: "Histórico carregado."
  },
  "gerar-relatorio": {
    etiqueta: "Gerar relatório",
    titulo: "Gerar relatório do residente",
    descricao: "Escolha o tipo de relatório e confirme a geração.",
    confirmacao: "Relatório gerado com sucesso."
  }
};

const residentes = {
  maria: {
    avatar: "M",
    name: "Maria das Dores",
    meta: "82 anos | Quarto 12 | Hipertensão controlada",
    tags: ["Dieta pastosa", "Fisioterapia 3x por semana", "Acompanhamento cardiológico"],
    summary: [
      ["Humor predominante", "Calmo e participativo"],
      ["Ingestão hídrica", "1,8L de 2,0L"],
      ["Qualidade do sono", "7h42 boa"]
    ],
    vitals: { bp: "12,8 / 8,2", heart: "72 bpm", temp: "36,4 C", glucose: "118 mg/dL" },
    healthNotes: [
      ["Medicacao no horario", "96% das administracoes realizadas dentro da janela prevista."],
      ["Monitoramento continuo", "Sem alteracoes criticas desde a ultima atualizacao do plantao."],
      ["Conduta sugerida", "Manter hidratacao assistida e acompanhamento do sono."]
    ]
  },
  joao: {
    avatar: "J",
    name: "João Ferreira",
    meta: "79 anos | Quarto 08 | Diabetes monitorada",
    tags: ["Dieta controlada", "Caminhada assistida", "Monitoramento de glicemia"],
    summary: [
      ["Humor predominante", "Comunicativo e tranquilo"],
      ["Ingestão hídrica", "1,5L de 2,0L"],
      ["Qualidade do sono", "6h58 regular"]
    ],
    vitals: { bp: "13,1 / 8,4", heart: "76 bpm", temp: "36,2 C", glucose: "132 mg/dL" },
    healthNotes: [
      ["Glicemia monitorada", "Medicoes dentro da meta com acompanhamento apos as refeicoes."],
      ["Circulacao ativa", "Caminhada assistida concluida sem sinais de fadiga excessiva."],
      ["Conduta sugerida", "Manter controle alimentar e nova afericao no fim da tarde."]
    ]
  },
  helena: {
    avatar: "H",
    name: "Helena Soares",
    meta: "87 anos | Quarto 05 | Mobilidade reduzida",
    tags: ["Atenção postural", "Fonoaudiologia", "Acompanhamento nutricional"],
    summary: [
      ["Humor predominante", "Sereno e receptivo"],
      ["Ingestão hídrica", "1,9L de 2,0L"],
      ["Qualidade do sono", "8h10 excelente"]
    ],
    vitals: { bp: "12,4 / 7,9", heart: "69 bpm", temp: "36,5 C", glucose: "104 mg/dL" },
    healthNotes: [
      ["Postura assistida", "Mudancas de posicao realizadas conforme o plano do turno."],
      ["Monitoramento continuo", "Sem desconfortos respiratorios ou sinais de alerta nas ultimas horas."],
      ["Conduta sugerida", "Seguir com hidratacao e apoio na mobilidade reduzida."]
    ]
  }
};

const equipe = [
  {
    id: "carla",
    nome: "Enf. Carla Menezes",
    funcao: "Medicacao e triagem da ala B",
    status: "online",
    atividade: ""
  },
  {
    id: "paulo",
    nome: "Cuidador Paulo Lima",
    funcao: "Rotina de higiene e apoio da ala A",
    status: "ronda",
    atividade: ""
  },
  {
    id: "renato",
    nome: "Dr. Renato Alves",
    funcao: "Consultas e revisoes clinicas",
    status: "atividade",
    atividade: "Avaliacao clinica no quarto 08"
  }
];

function obterRotuloStatus(status) {
  const rotulos = {
    online: "Fora de servico",
    ronda: "Em ronda",
    atividade: "Atividade especifica"
  };

  return rotulos[status] || "Status indefinido";
}

function renderizarEquipe() {
  if (!listaEquipe) return;

  listaEquipe.innerHTML = equipe
    .map((membro) => `
      <article class="list__item list__item--team">
        <div class="team-card__main">
          <div>
            <strong>${membro.nome}</strong>
            <p>${membro.funcao}</p>
            ${membro.status === "atividade" && membro.atividade ? `<p class="team-card__activity">Atividade atual: ${membro.atividade}</p>` : ""}
          </div>
          <div class="team-card__status">
            <span class="badge badge--soft">${obterRotuloStatus(membro.status)}</span>
            <button class="btn btn--ghost team-card__toggle" type="button" data-team-toggle="${membro.id}">Editar status</button>
            <button class="btn btn--ghost team-card__remove" type="button" data-team-remove="${membro.id}">Remover</button>
          </div>
        </div>
        <form class="team-card__editor hidden" data-team-editor="${membro.id}">
          <label class="field">
            <span>Status do funcionario</span>
            <select data-team-status="${membro.id}">
              <option value="online" ${membro.status === "online" ? "selected" : ""}>Fora de servico</option>
              <option value="ronda" ${membro.status === "ronda" ? "selected" : ""}>Em ronda</option>
              <option value="atividade" ${membro.status === "atividade" ? "selected" : ""}>Atividade especifica</option>
            </select>
          </label>
          <label class="field ${membro.status === "atividade" ? "" : "hidden"}" data-team-activity-field="${membro.id}">
            <span>Qual atividade esta fazendo?</span>
            <input type="text" data-team-activity="${membro.id}" value="${membro.atividade}" placeholder="Ex.: Banho assistido no quarto 03" />
          </label>
          <div class="team-card__actions">
            <button class="btn btn--primary" type="submit">Salvar</button>
          </div>
        </form>
      </article>
    `)
    .join("");
}

function atualizarVisibilidadeCampoAtividade(id, status) {
  const campo = document.querySelector(`[data-team-activity-field="${id}"]`);
  if (!campo) return;

  campo.classList.toggle("hidden", status !== "atividade");
}

function atualizarStatusDaEquipe(id, status, atividade) {
  const membro = equipe.find((item) => item.id === id);
  if (!membro) return;

  membro.status = status;
  membro.atividade = status === "atividade" ? atividade : "";
  renderizarEquipe();
}

function atualizarVisibilidadeFormularioEquipe(status) {
  blocoAtividadeInicialEquipe?.classList.toggle("hidden", status !== "atividade");
}

function criarIdDeFuncionario(nome) {
  return `${nome.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-${Date.now()}`;
}

function adicionarFuncionario(nome, funcao, status, atividade) {
  equipe.push({
    id: criarIdDeFuncionario(nome),
    nome,
    funcao,
    status,
    atividade: status === "atividade" ? atividade : ""
  });

  renderizarEquipe();
}

function removerFuncionario(id) {
  const indice = equipe.findIndex((item) => item.id === id);
  if (indice === -1) return;

  equipe.splice(indice, 1);
  renderizarEquipe();
}

function atualizarCabecalhoDaTela(chaveTela) {
  const conteudo = conteudoDasTelas[chaveTela];
  if (!conteudo) return;

  tituloSecaoPequeno.textContent = conteudo.etiqueta;
  tituloSecao.textContent = conteudo.titulo;
  descricaoSecao.textContent = conteudo.descricao;
}

function mostrarTela(chaveTela) {
  if (perfilSelecionado === "familiar" && chaveTela === "equipe") {
    chaveTela = "residentes";
  }

  telas.forEach((tela) => {
    tela.classList.toggle("screen--active", tela.dataset.screenPanel === chaveTela);
  });

  linksNavegacao.forEach((link) => {
    link.classList.toggle("active", link.dataset.screen === chaveTela);
  });

  atualizarCabecalhoDaTela(chaveTela);
  barraLateral?.classList.remove("is-open");
}

function renderizarResidente(chave) {
  const residente = residentes[chave];
  if (!residente) return;

  document.getElementById("residentAvatar").textContent = residente.avatar;
  document.getElementById("residentName").textContent = residente.name;
  document.getElementById("residentMeta").textContent = residente.meta;
  document.getElementById("bpValue").textContent = residente.vitals.bp;
  document.getElementById("heartValue").textContent = residente.vitals.heart;
  document.getElementById("tempValue").textContent = residente.vitals.temp;
  document.getElementById("glucoseValue").textContent = residente.vitals.glucose;

  document.getElementById("residentTags").innerHTML = residente.tags
    .map((tag) => `<span>${tag}</span>`)
    .join("");

  document.getElementById("residentSummary").innerHTML = residente.summary
    .map(([label, value]) => `
      <article class="summary__item">
        <span>${label}</span>
        <strong>${value}</strong>
      </article>
    `)
    .join("");

  document.getElementById("healthNoteTitleDisplay1").textContent = residente.healthNotes[0][0];
  document.getElementById("healthNoteTextDisplay1").textContent = residente.healthNotes[0][1];
  document.getElementById("healthNoteTitleDisplay2").textContent = residente.healthNotes[1][0];
  document.getElementById("healthNoteTextDisplay2").textContent = residente.healthNotes[1][1];
  document.getElementById("healthNoteTitleDisplay3").textContent = residente.healthNotes[2][0];
  document.getElementById("healthNoteTextDisplay3").textContent = residente.healthNotes[2][1];

  renderizarListaResidentes(chave);
}

function obterResidenteAtivo() {
  const botaoAtivo = document.querySelector(".resident-selector__item.active");
  const chave = botaoAtivo?.dataset.resident || residenteVinculadoAoFamiliar || "maria";
  return { chave, residente: residentes[chave] };
}

function obterResidentesVisiveis() {
  if (perfilSelecionado === "familiar") {
    return [[residenteVinculadoAoFamiliar, residentes[residenteVinculadoAoFamiliar]]];
  }

  return Object.entries(residentes);
}

function renderizarListaResidentes(chaveAtiva) {
  if (!listaResidentes) return;

  listaResidentes.innerHTML = obterResidentesVisiveis()
    .map(([chave, residente]) => `
      <button class="resident-selector__item ${chave === chaveAtiva ? "active" : ""}" type="button" data-resident="${chave}">
        <strong>${residente.name}</strong>
        <small>${residente.meta}</small>
      </button>
    `)
    .join("");
}

function preencherFormularioSaude() {
  const { residente } = obterResidenteAtivo();
  if (!residente || !formularioSaude) return;

  campoSaudePressao.value = residente.vitals.bp;
  campoSaudeHeart.value = residente.vitals.heart;
  campoSaudeTemp.value = residente.vitals.temp;
  campoSaudeGlucose.value = residente.vitals.glucose;
  campoSaudeTitulo1.value = residente.healthNotes[0][0];
  campoSaudeTexto1.value = residente.healthNotes[0][1];
  campoSaudeTitulo2.value = residente.healthNotes[1][0];
  campoSaudeTexto2.value = residente.healthNotes[1][1];
  campoSaudeTitulo3.value = residente.healthNotes[2][0];
  campoSaudeTexto3.value = residente.healthNotes[2][1];
}

function preencherFormularioResidente() {
  const { residente } = obterResidenteAtivo();
  if (!residente || !formularioResidente) return;

  campoResidenteNome.value = residente.name;
  campoResidenteMeta.value = residente.meta;
  campoResidenteTags.value = residente.tags.join(", ");
  campoResumoLabel1.value = residente.summary[0][0];
  campoResumoValor1.value = residente.summary[0][1];
  campoResumoLabel2.value = residente.summary[1][0];
  campoResumoValor2.value = residente.summary[1][1];
  campoResumoLabel3.value = residente.summary[2][0];
  campoResumoValor3.value = residente.summary[2][1];
}

function atualizarSaudeDoResidente() {
  const { chave, residente } = obterResidenteAtivo();
  if (!residente) return;

  residente.vitals.bp = campoSaudePressao?.value.trim() || residente.vitals.bp;
  residente.vitals.heart = campoSaudeHeart?.value.trim() || residente.vitals.heart;
  residente.vitals.temp = campoSaudeTemp?.value.trim() || residente.vitals.temp;
  residente.vitals.glucose = campoSaudeGlucose?.value.trim() || residente.vitals.glucose;
  residente.healthNotes = [
    [campoSaudeTitulo1?.value.trim() || "Observacao 1", campoSaudeTexto1?.value.trim() || "-"],
    [campoSaudeTitulo2?.value.trim() || "Observacao 2", campoSaudeTexto2?.value.trim() || "-"],
    [campoSaudeTitulo3?.value.trim() || "Observacao 3", campoSaudeTexto3?.value.trim() || "-"]
  ];

  renderizarResidente(chave);
}

function atualizarResidenteAtivo() {
  const { chave, residente } = obterResidenteAtivo();
  if (!residente) return;

  residente.name = campoResidenteNome?.value.trim() || residente.name;
  residente.meta = campoResidenteMeta?.value.trim() || residente.meta;
  residente.avatar = residente.name.trim().charAt(0).toUpperCase() || residente.avatar;
  residente.tags = (campoResidenteTags?.value || "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  residente.summary = [
    [campoResumoLabel1?.value.trim() || "Resumo 1", campoResumoValor1?.value.trim() || "-"],
    [campoResumoLabel2?.value.trim() || "Resumo 2", campoResumoValor2?.value.trim() || "-"],
    [campoResumoLabel3?.value.trim() || "Resumo 3", campoResumoValor3?.value.trim() || "-"]
  ];

  renderizarResidente(chave);
}

function atualizarCamposLogin() {
  const configuracoes = {
    familiar: {
      label: "E-mail do familiar",
      email: "familiar@larsereno.com",
      senha: "familia123"
    },
    administrador: {
      label: "E-mail do administrador",
      email: "admin@larsereno.com",
      senha: "admin123"
    }
  };

  const atual = configuracoes[perfilSelecionado];
  loginEmailLabel.textContent = atual.label;
  loginEmail.placeholder = atual.email;
  loginSenha.placeholder = "Digite sua senha";
}

function aplicarPermissoesDoPerfil() {
  const acessoFamiliar = perfilSelecionado === "familiar";

  elementosPorPerfil.forEach((elemento) => {
    const papelNecessario = elemento.dataset.requiresRole;
    const deveOcultar = acessoFamiliar && papelNecessario === "administrador";
    elemento.classList.toggle("locked-for-role", deveOcultar);
  });

  if (acessoFamiliar) {
    renderizarResidente(residenteVinculadoAoFamiliar);
    preencherFormularioResidente();
    preencherFormularioSaude();
    atualizarCabecalhoDaTela("residentes");
    return;
  }

  renderizarResidente("maria");
  preencherFormularioResidente();
  preencherFormularioSaude();
}

function abrirModal(acao) {
  const configuracao = configuracaoAcoes[acao];
  if (!configuracao) return;

  if (perfilSelecionado === "familiar" && (acao === "novo-relatorio" || acao === "gerar-relatorio")) {
    window.alert("O perfil familiar não pode criar relatórios administrativos.");
    return;
  }

  acaoAtual = acao;
  modalEtiqueta.textContent = configuracao.etiqueta;
  modalTitulo.textContent = configuracao.titulo;
  modalDescricao.textContent = configuracao.descricao;

  if (acao === "novo-relatorio" || acao === "gerar-relatorio") {
    modalConteudo.innerHTML = `
      <label class="field">
        <span>Tipo de relatório</span>
        <select id="tipoRelatorio">
          <option>Relatório diário</option>
          <option>Relatório clínico</option>
          <option>Relatório gerencial</option>
        </select>
      </label>
      <label class="field">
        <span>Observações</span>
        <textarea id="observacoesRelatorio" placeholder="Descreva o objetivo ou os pontos principais do relatório."></textarea>
      </label>
    `;
  } else if (acao === "prontuario") {
    modalConteudo.innerHTML = `
      <div class="note">
        <strong>Resumo do prontuário</strong>
        <p>Hipertensão controlada, dieta pastosa, fisioterapia três vezes por semana e acompanhamento cardiológico ativo.</p>
      </div>
      <div class="note">
        <strong>Última atualização</strong>
        <p>04/05/2026 às 07:12 por Enf. Carla Menezes.</p>
      </div>
    `;
  } else if (acao === "historico") {
    modalConteudo.innerHTML = `
      <div class="notes">
        <article class="note">
          <strong>03/05 - Evolução clínica</strong>
          <p>Sem intercorrências relevantes e boa aceitação alimentar.</p>
        </article>
        <article class="note">
          <strong>02/05 - Fisioterapia</strong>
          <p>Participação completa nas atividades de mobilidade assistida.</p>
        </article>
        <article class="note">
          <strong>01/05 - Contato familiar</strong>
          <p>Resumo diário enviado com confirmação de leitura.</p>
        </article>
      </div>
    `;
  }

  modal.classList.remove("hidden");
  document.body.classList.add("modal-open");
}

function fecharModal() {
  modal.classList.add("hidden");
  modalConteudo.innerHTML = "";
  document.body.classList.remove("modal-open");
  acaoAtual = null;
}

function confirmarAcaoModal() {
  if (!acaoAtual) return;

  const mensagem = configuracaoAcoes[acaoAtual]?.confirmacao || "Ação concluída.";
  window.alert(mensagem);
  fecharModal();
}

botaoTema?.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

botaoMenu?.addEventListener("click", () => {
  barraLateral?.classList.toggle("is-open");
});

linksNavegacao.forEach((link) => {
  link.addEventListener("click", () => {
    mostrarTela(link.dataset.screen);
  });
});

botoesTrocaTela.forEach((botao) => {
  botao.addEventListener("click", () => {
    mostrarTela(botao.dataset.screenTarget);
  });
});

listaResidentes?.addEventListener("click", (event) => {
  const botao = event.target.closest("[data-resident]");
  if (!botao) return;

  renderizarResidente(botao.dataset.resident);
  preencherFormularioResidente();
  preencherFormularioSaude();
});

botoesAcao.forEach((botao) => {
  botao.addEventListener("click", () => {
    abrirModal(botao.dataset.action);
  });
});

listaEquipe?.addEventListener("click", (event) => {
  const botao = event.target.closest("[data-team-toggle]");
  const botaoRemover = event.target.closest("[data-team-remove]");

  if (botaoRemover) {
    removerFuncionario(botaoRemover.dataset.teamRemove);
    window.alert("Funcionario removido da equipe.");
    return;
  }

  if (!botao) return;

  const id = botao.dataset.teamToggle;
  const editorAtual = document.querySelector(`[data-team-editor="${id}"]`);
  const estavaOculto = editorAtual?.classList.contains("hidden");

  document.querySelectorAll("[data-team-editor]").forEach((editor) => {
    editor.classList.add("hidden");
  });

  if (estavaOculto) {
    editorAtual?.classList.remove("hidden");
  }
});

listaEquipe?.addEventListener("change", (event) => {
  const seletor = event.target.closest("[data-team-status]");
  if (!seletor) return;

  atualizarVisibilidadeCampoAtividade(seletor.dataset.teamStatus, seletor.value);
});

listaEquipe?.addEventListener("submit", (event) => {
  const formulario = event.target.closest("[data-team-editor]");
  if (!formulario) return;

  event.preventDefault();
  const id = formulario.dataset.teamEditor;
  const status = formulario.querySelector("[data-team-status]")?.value || "online";
  const atividade = formulario.querySelector("[data-team-activity]")?.value.trim() || "";

  if (status === "atividade" && !atividade) {
    window.alert("Descreva a atividade especifica antes de salvar.");
    return;
  }

  atualizarStatusDaEquipe(id, status, atividade);
  window.alert("Status da equipe atualizado com sucesso.");
});

botaoAdicionarFuncionario?.addEventListener("click", () => {
  formularioEquipe?.classList.toggle("hidden");
});

seletorStatusInicialEquipe?.addEventListener("change", () => {
  atualizarVisibilidadeFormularioEquipe(seletorStatusInicialEquipe.value);
});

formularioEquipe?.addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = campoNomeEquipe?.value.trim() || "";
  const funcao = campoFuncaoEquipe?.value.trim() || "";
  const status = seletorStatusInicialEquipe?.value || "online";
  const atividade = campoAtividadeInicialEquipe?.value.trim() || "";

  if (!nome || !funcao) {
    window.alert("Preencha nome e funcao do funcionario.");
    return;
  }

  if (status === "atividade" && !atividade) {
    window.alert("Descreva a atividade especifica do funcionario.");
    return;
  }

  adicionarFuncionario(nome, funcao, status, atividade);
  formularioEquipe.reset();
  atualizarVisibilidadeFormularioEquipe("online");
  formularioEquipe.classList.add("hidden");
  window.alert("Funcionario adicionado com sucesso.");
});

botaoEditarSaude?.addEventListener("click", () => {
  preencherFormularioSaude();
  formularioSaude?.classList.toggle("hidden");
});

botaoEditarResidente?.addEventListener("click", () => {
  preencherFormularioResidente();
  formularioResidente?.classList.toggle("hidden");
});

formularioResidente?.addEventListener("submit", (event) => {
  event.preventDefault();
  atualizarResidenteAtivo();
  formularioResidente.classList.add("hidden");
  window.alert("Dados do residente atualizados com sucesso.");
});

formularioSaude?.addEventListener("submit", (event) => {
  event.preventDefault();
  atualizarSaudeDoResidente();
  formularioSaude.classList.add("hidden");
  window.alert("Dados de saude atualizados com sucesso.");
});

botoesPerfil.forEach((botao) => {
  botao.addEventListener("click", () => {
    perfilSelecionado = botao.dataset.role;
    botoesPerfil.forEach((item) => item.classList.remove("active"));
    botao.classList.add("active");
    atualizarCamposLogin();
  });
});

botaoPreencherDemo?.addEventListener("click", () => {
  if (perfilSelecionado === "familiar") {
    loginEmail.value = "familiar@larsereno.com";
    loginSenha.value = "familia123";
    return;
  }

  loginEmail.value = "admin@larsereno.com";
  loginSenha.value = "admin123";
});

loginForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  aplicarPermissoesDoPerfil();
  loginOverlay.classList.add("hidden");
  document.body.classList.remove("login-open");
  mostrarTela(perfilSelecionado === "familiar" ? "residentes" : "inicio");
  window.alert(`Login realizado como ${perfilSelecionado}.`);
});

botaoFecharModal?.addEventListener("click", fecharModal);
botaoCancelarModal?.addEventListener("click", fecharModal);
botaoConfirmarModal?.addEventListener("click", confirmarAcaoModal);

modal?.addEventListener("click", (event) => {
  if (event.target === modal) {
    fecharModal();
  }
});

renderizarResidente("maria");
renderizarEquipe();
preencherFormularioResidente();
preencherFormularioSaude();
atualizarVisibilidadeFormularioEquipe(seletorStatusInicialEquipe?.value || "online");
mostrarTela("inicio");
atualizarCamposLogin();
aplicarPermissoesDoPerfil();
document.body.classList.add("login-open");

const recorrenciaDataset = [
  { cliente: 'Empresa Alpha', tipoAtendimento: 'Interno', tecnico: 'João', residencia: 'Campinas', km: 18, tempoVisita: 55, data: '2025-01-03', descricao: 'Suporte em rede e servidores', nivel: 'Crítico' },
  { cliente: 'Empresa Alpha', tipoAtendimento: 'Interno', tecnico: 'João', residencia: 'Campinas', km: 24, tempoVisita: 72, data: '2025-02-11', descricao: 'Revisão de infraestrutura', nivel: 'Preventiva' },
  { cliente: 'Empresa Alpha', tipoAtendimento: 'Interno', tecnico: 'Carlos', residencia: 'São Paulo', km: 34, tempoVisita: 86, data: '2025-03-20', descricao: 'Ajuste de acessos e manutenção', nivel: 'Corretiva' },
  { cliente: 'Empresa Alpha', tipoAtendimento: 'Externo', tecnico: 'Maria', residencia: 'São José', km: 48, tempoVisita: 118, data: '2025-04-06', descricao: 'Visita externa de campo', nivel: 'Preventiva' },
  { cliente: 'Empresa Alpha', tipoAtendimento: 'Externo', tecnico: 'Maria', residencia: 'São José', km: 51, tempoVisita: 126, data: '2025-05-14', descricao: 'Diagnóstico de equipamento', nivel: 'Corretiva' },

  { cliente: 'Hospital Vida', tipoAtendimento: 'Externo', tecnico: 'Ana', residencia: 'Mogi', km: 35, tempoVisita: 96, data: '2025-01-09', descricao: 'Manutenção em UPS', nivel: 'Crítica' },
  { cliente: 'Hospital Vida', tipoAtendimento: 'Externo', tecnico: 'Ana', residencia: 'Mogi', km: 36, tempoVisita: 103, data: '2025-02-18', descricao: 'Verificação de estabilizador', nivel: 'Preventiva' },
  { cliente: 'Hospital Vida', tipoAtendimento: 'Externo', tecnico: 'Maria', residencia: 'São José', km: 41, tempoVisita: 109, data: '2025-03-25', descricao: 'Atendimento fora da base', nivel: 'Corretiva' },
  { cliente: 'Hospital Vida', tipoAtendimento: 'Interno', tecnico: 'Carlos', residencia: 'São Paulo', km: 22, tempoVisita: 68, data: '2025-04-18', descricao: 'Suporte remoto acompanhado', nivel: 'Preventiva' },

  { cliente: 'Loja Central', tipoAtendimento: 'Interno', tecnico: 'Pedro', residencia: 'Campinas', km: 15, tempoVisita: 44, data: '2025-01-21', descricao: 'Configuração de impressoras', nivel: 'Preventiva' },
  { cliente: 'Loja Central', tipoAtendimento: 'Interno', tecnico: 'Pedro', residencia: 'Campinas', km: 16, tempoVisita: 52, data: '2025-02-22', descricao: 'Ajuste de rede', nivel: 'Corretiva' },
  { cliente: 'Loja Central', tipoAtendimento: 'Externo', tecnico: 'João', residencia: 'Campinas', km: 26, tempoVisita: 78, data: '2025-04-08', descricao: 'Visita técnica em loja', nivel: 'Preventiva' },
  { cliente: 'Loja Central', tipoAtendimento: 'Externo', tecnico: 'João', residencia: 'Campinas', km: 30, tempoVisita: 84, data: '2025-05-20', descricao: 'Manutenção de POS', nivel: 'Corretiva' },
  { cliente: 'Loja Central', tipoAtendimento: 'Interno', tecnico: 'Ana', residencia: 'Mogi', km: 20, tempoVisita: 61, data: '2025-06-11', descricao: 'Ajuste de sistema de pagamento', nivel: 'Corretiva' },

  { cliente: 'Fábrica Norte', tipoAtendimento: 'Externo', tecnico: 'Maria', residencia: 'São José', km: 65, tempoVisita: 180, data: '2025-01-15', descricao: 'Atendimento em linha de produção', nivel: 'Crítica' },
  { cliente: 'Fábrica Norte', tipoAtendimento: 'Externo', tecnico: 'Maria', residencia: 'São José', km: 72, tempoVisita: 210, data: '2025-03-02', descricao: 'Correção de falhas elétricas', nivel: 'Corretiva' },
  { cliente: 'Fábrica Norte', tipoAtendimento: 'Externo', tecnico: 'Carlos', residencia: 'São Paulo', km: 58, tempoVisita: 151, data: '2025-05-08', descricao: 'Visita de manutenção pesada', nivel: 'Preventiva' },

  { cliente: 'Escola Municipal', tipoAtendimento: 'Interno', tecnico: 'Pedro', residencia: 'Campinas', km: 14, tempoVisita: 40, data: '2025-02-03', descricao: 'Suporte de rede Wi-Fi', nivel: 'Preventiva' },
  { cliente: 'Escola Municipal', tipoAtendimento: 'Interno', tecnico: 'Pedro', residencia: 'Campinas', km: 17, tempoVisita: 49, data: '2025-03-12', descricao: 'Atualização e verificação', nivel: 'Preventiva' },
  { cliente: 'Escola Municipal', tipoAtendimento: 'Externo', tecnico: 'Ana', residencia: 'Mogi', km: 39, tempoVisita: 106, data: '2025-06-02', descricao: 'Visita em unidade externa', nivel: 'Corretiva' }
];

function formatMinutes(value) {
  if (!Number.isFinite(value) || value <= 0) return '0 min';
  if (value < 60) return `${Math.round(value)} min`;
  const horas = Math.floor(value / 60);
  const minutos = Math.round(value % 60);
  return `${horas}h ${minutos}m`;
}

function normalizeTipo(tipo) {
  const texto = String(tipo || '').trim().toLowerCase();
  if (!texto) return 'Não informado';
  if (['interno','atendimento interno','suporte interno'].includes(texto)) return 'Interno';
  if (['externo','atendimento externo','campo','serviço externo'].includes(texto)) return 'Externo';
  return 'Outros';
}

function parseData(dataString) {
  const data = new Date(dataString);
  return Number.isNaN(data.getTime()) ? null : data;
}

function calcularRecorrencia(dados) {
  const mapa = new Map();

  for (const item of dados) {
    const tipo = normalizeTipo(item.tipoAtendimento || item.tipo || item.origem || item.canal);
    const cliente = (item.cliente || 'Cliente sem nome').trim() || 'Cliente sem nome';
    const chave = `${cliente}::${tipo}`;

    if (!mapa.has(chave)) {
      mapa.set(chave, {
        cliente,
        tipo,
        visitas: [],
        tecnicos: new Set(),
        residencias: new Set(),
        totalKm: 0,
        totalTempo: 0
      });
    }

    const grupo = mapa.get(chave);
    const tempo = Number(item.tempoVisita || item.tempo || item.duracao || 0) || 0;
    const km = Number(item.km || item.quilometragem || item.distancia || 0) || 0;

    grupo.tecnicos.add(item.tecnico || 'Sem técnico');
    grupo.residencias.add(item.residencia || item.residenciaTecnico || 'Sem residência');
    grupo.totalKm += km;
    grupo.totalTempo += tempo;

    grupo.visitas.push({
      ...item,
      tipo,
      data: parseData(item.data || item.dataAbertura || item.dataVisita),
      km,
      tempoVisita: tempo
    });
  }

  return Array.from(mapa.values())
    .map((grupo) => {
      const visitasOrdenadas = [...grupo.visitas].sort((a, b) => {
        const ta = a.data ? a.data.getTime() : 0;
        const tb = b.data ? b.data.getTime() : 0;
        return ta - tb;
      });

      return {
        cliente: grupo.cliente,
        tipo: grupo.tipo,
        recorrencia: visitasOrdenadas.length,
        tecnicos: Array.from(grupo.tecnicos),
        residencias: Array.from(grupo.residencias),
        totalKm: grupo.totalKm,
        totalTempo: grupo.totalTempo,
        tempoMedio: visitasOrdenadas.length ? grupo.totalTempo / visitasOrdenadas.length : 0,
        kmMedio: visitasOrdenadas.length ? grupo.totalKm / visitasOrdenadas.length : 0,
        ultimaVisita: visitasOrdenadas[visitasOrdenadas.length - 1] || null,
        visitas: visitasOrdenadas
      };
    })
    .sort((a, b) => b.recorrencia - a.recorrencia);
}

function buildRecorrenciaSection() {
  const section = document.createElement('section');
  section.id = 'recorrenciaDashboard';
  section.className = 'recorrencia-dashboard';
  section.innerHTML = `
    <div class="dashboard-header">
      <div>
        <span class="kicker">MÉTRICAS DE RECORRÊNCIA</span>
        <h2>Análise por cliente e tipo de atendimento</h2>
      </div>
      <div class="header-badges">
        <span class="badge badge-interno">Interno</span>
        <span class="badge badge-externo">Externo</span>
      </div>
    </div>
    <div class="kpi-grid"></div>
    <div class="dashboard-grid">
      <div class="panel-chart">
        <div class="panel-title-row">
          <h3>Top clientes recorrentes</h3>
          <span>visitas por cliente</span>
        </div>
        <div class="chart-wrap">
          <svg id="chartClientRecurrence" viewBox="0 0 500 220" preserveAspectRatio="xMidYMid meet"></svg>
        </div>
      </div>
      <div class="panel-chart">
        <div class="panel-title-row">
          <h3>Resumo por tipo</h3>
          <span>interno x externo</span>
        </div>
        <div id="tipoSummary" class="tipo-summary"></div>
      </div>
    </div>
    <div class="table-panel">
      <div class="panel-title-row">
        <h3>Detalhes por cliente</h3>
        <span>tempo, km e residência</span>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Tipo</th>
              <th>Recorrência</th>
              <th>Tempo total</th>
              <th>Km total</th>
              <th>Técnico</th>
              <th>Residência</th>
            </tr>
          </thead>
          <tbody id="tableRecorrenciaBody"></tbody>
        </table>
      </div>
    </div>
  `;

  document.body.appendChild(section);
  return section;
}

function renderKpis(dados) {
  const totalClientes = new Set(dados.map((item) => item.cliente)).size;
  const totalVisitas = dados.reduce((acc, item) => acc + item.recorrencia, 0);
  const totalKm = dados.reduce((acc, item) => acc + item.totalKm, 0);
  const totalTempo = dados.reduce((acc, item) => acc + item.totalTempo, 0);

  const kpis = [
    { label: 'Clientes recorrentes', value: totalClientes, detail: 'grupos com repetição', tone: 'cyan' },
    { label: 'Total de visitas', value: totalVisitas, detail: 'OS no período', tone: 'violet' },
    { label: 'Tempo total', value: formatMinutes(totalTempo), detail: 'tempo acumulado', tone: 'pink' },
    { label: 'Km total', value: `${totalKm.toFixed(0)} km`, detail: 'quilometragem total', tone: 'green' },
    { label: 'Tipo mais forte', value: getTopType(dados), detail: 'interno ou externo', tone: 'blue' }
  ];

  const container = document.querySelector('#recorrenciaDashboard .kpi-grid');
  container.innerHTML = kpis.map((kpi) => `
    <div class="kpi-card ${kpi.tone}">
      <div class="kpi-topline">
        <span>${kpi.label}</span>
      </div>
      <strong>${kpi.value}</strong>
      <div class="kpi-detail">${kpi.detail}</div>
    </div>
  `).join('');
}

function getTopType(dados) {
  const count = {
    Interno: dados.filter((item) => item.tipo === 'Interno').reduce((acc, item) => acc + item.recorrencia, 0),
    Externo: dados.filter((item) => item.tipo === 'Externo').reduce((acc, item) => acc + item.recorrencia, 0)
  };

  return count.Interno >= count.Externo ? 'Interno' : 'Externo';
}

function renderTipoSummary(dados) {
  const tipos = [
    { tipo: 'Interno', dados: dados.filter((item) => item.tipo === 'Interno') },
    { tipo: 'Externo', dados: dados.filter((item) => item.tipo === 'Externo') }
  ];

  const totalGeral = dados.reduce((acc, item) => acc + item.recorrencia, 0) || 1;

  const html = tipos.map((grupo) => {
    const recorrencia = grupo.dados.reduce((acc, item) => acc + item.recorrencia, 0);
    const percentual = Math.round((recorrencia / totalGeral) * 100);
    return `
      <div class="tipo-line ${grupo.tipo.toLowerCase()}">
        <div class="tipo-header">
          <span>${grupo.tipo}</span>
          <strong>${recorrencia}</strong>
        </div>
        <div class="tipo-bar"><i style="width:${percentual}%"></i></div>
        <small>${percentual}% do total</small>
      </div>
    `;
  }).join('');

  document.getElementById('tipoSummary').innerHTML = html;
}

function renderChart(dados) {
  const svg = document.getElementById('chartClientRecurrence');
  const top = [...dados].sort((a, b) => b.recorrencia - a.recorrencia).slice(0, 6);
  const max = Math.max(...top.map((item) => item.recorrencia), 1);
  const width = 500;
  const height = 220;
  const padding = { top: 18, right: 18, bottom: 42, left: 34 };

  svg.innerHTML = `
    <g>
      ${Array.from({ length: 5 }, (_, i) => {
        const y = padding.top + ((height - padding.top - padding.bottom) / 4) * i;
        return `<line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="rgba(255,255,255,0.08)" />`;
      }).join('')}
    </g>
  `;

  top.forEach((cliente, index) => {
    const barWidth = 52;
    const gap = 22;
    const x = padding.left + index * (barWidth + gap);
    const barHeight = (cliente.recorrencia / max) * (height - padding.top - padding.bottom - 18);
    const y = height - padding.bottom - barHeight;

    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', x);
    rect.setAttribute('y', y);
    rect.setAttribute('width', barWidth);
    rect.setAttribute('height', barHeight);
    rect.setAttribute('rx', '10');
    rect.setAttribute('fill', cliente.tipo === 'Interno' ? '#66e3d7' : '#ff85ac');
    rect.setAttribute('opacity', '0.92');
    svg.appendChild(rect);

    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', x + barWidth / 2);
    label.setAttribute('y', height - 12);
    label.setAttribute('fill', '#94a3b8');
    label.setAttribute('font-size', '9');
    label.setAttribute('text-anchor', 'middle');
    label.textContent = cliente.cliente.split(' ')[0].slice(0, 8);
    svg.appendChild(label);

    const value = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    value.setAttribute('x', x + barWidth / 2);
    value.setAttribute('y', y - 8);
    value.setAttribute('fill', '#edf3fb');
    value.setAttribute('font-size', '10');
    value.setAttribute('text-anchor', 'middle');
    value.textContent = cliente.recorrencia;
    svg.appendChild(value);
  });
}

function renderTable(dados) {
  const tbody = document.getElementById('tableRecorrenciaBody');
  tbody.innerHTML = dados.map((item) => `
    <tr>
      <td><strong>${item.cliente}</strong></td>
      <td><span class="pill ${item.tipo === 'Interno' ? 'pill-interno' : 'pill-externo'}">${item.tipo}</span></td>
      <td>${item.recorrencia}</td>
      <td>${formatMinutes(item.totalTempo)}</td>
      <td>${item.totalKm.toFixed(0)} km</td>
      <td>${item.tecnicos.join(', ')}</td>
      <td>${item.residencias.join(', ')}</td>
    </tr>
  `).join('');
}

function initRecorrenciaDashboard() {
  const container = document.getElementById('recorrenciaDashboard');
  if (container) return;

  buildRecorrenciaSection();

  const dados = calcularRecorrencia(recorrenciaDataset);
  renderKpis(dados);
  renderTipoSummary(dados);
  renderChart(dados);
  renderTable(dados);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRecorrenciaDashboard);
} else {
  initRecorrenciaDashboard();
}

const recorrenciaStyle = document.createElement('style');
recorrenciaStyle.textContent = `
  .recorrencia-dashboard {
    max-width: 1280px;
    margin: 48px auto 0;
    padding: 28px 24px 40px;
    border: 1px solid rgba(158,176,205,.18);
    border-radius: 26px;
    background: rgba(16,23,36,.75);
    box-shadow: 0 24px 60px rgba(0,0,0,.16);
    color: var(--ink, #edf3fb);
  }

  .dashboard-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 24px;
  }

  .kicker {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: var(--accent, #66e3d7);
    font-size: 10px;
    letter-spacing: .14em;
    font-weight: 700;
    font-family: "JetBrains Mono", monospace;
  }

  .dashboard-header h2 {
    margin: 10px 0 0;
    font-size: clamp(28px, 2.4vw, 42px);
    letter-spacing: -0.05em;
  }

  .header-badges {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    padding: 7px 10px;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .badge-interno { background: rgba(102,227,215,.11); color: #66e3d7; border: 1px solid rgba(102,227,215,.22); }
  .badge-externo { background: rgba(255,133,172,.11); color: #ff85ac; border: 1px solid rgba(255,133,172,.22); }

  .kpi-grid {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 12px;
    margin-bottom: 22px;
  }

  .kpi-card {
    min-height: 150px;
    padding: 16px;
    border-radius: 18px;
    border: 1px solid rgba(158,176,205,.16);
    background: rgba(255,255,255,.02);
  }

  .kpi-card strong {
    display: block;
    margin-top: 18px;
    font-size: clamp(24px, 2vw, 34px);
    line-height: 1;
    letter-spacing: -0.06em;
    font-weight: 700;
    color: #edf3fb;
  }

  .kpi-topline span {
    color: #98a8bd;
    font-size: 9px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-family: "JetBrains Mono", monospace;
  }

  .kpi-detail {
    margin-top: 12px;
    font-size: 10px;
    color: var(--muted, #939eb2);
  }

  .kpi-card.cyan { border-color: rgba(102,227,215,.2); box-shadow: inset 0 0 0 1px rgba(102,227,215,.03); }
  .kpi-card.violet { border-color: rgba(149,132,255,.22); }
  .kpi-card.pink { border-color: rgba(255,133,172,.22); }
  .kpi-card.green { border-color: rgba(126,226,160,.22); }
  .kpi-card.blue { border-color: rgba(104,185,255,.22); }

  .dashboard-grid {
    display: grid;
    grid-template-columns: 1.6fr .9fr;
    gap: 18px;
    margin-bottom: 22px;
  }

  .panel-chart, .table-panel {
    background: rgba(255,255,255,.02);
    border: 1px solid rgba(158,176,205,.16);
    border-radius: 20px;
    padding: 18px 18px 12px;
  }

  .panel-title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 12px;
  }

  .panel-title-row h3 {
    margin: 0;
    font-size: 16px;
    letter-spacing: -0.03em;
  }

  .panel-title-row span {
    color: var(--muted, #939eb2);
    font-size: 9px;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    font-family: "JetBrains Mono", monospace;
  }

  .chart-wrap {
    border-radius: 16px;
    background: rgba(3,7,13,.25);
    border: 1px solid rgba(158,176,205,.09);
    overflow: hidden;
  }

  #chartClientRecurrence {
    width: 100%;
    height: 220px;
    display: block;
  }

  .tipo-summary {
    display: grid;
    gap: 12px;
    padding-top: 12px;
  }

  .tipo-line {
    padding: 12px;
    border-radius: 12px;
    border: 1px solid rgba(158,176,205,.13);
    background: rgba(255,255,255,.02);
  }

  .tipo-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 8px;
    font-size: 12px;
  }

  .tipo-header strong {
    color: #edf3fb;
    font-family: "JetBrains Mono", monospace;
  }

  .tipo-bar {
    height: 10px;
    overflow: hidden;
    border-radius: 999px;
    background: rgba(255,255,255,.04);
  }

  .tipo-bar i {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, #66e3d7, #9584ff);
  }

  .tipo-line.externo .tipo-bar i {
    background: linear-gradient(90deg, #ff85ac, #f7c873);
  }

  .tipo-line small {
    color: var(--muted, #939eb2);
    font-size: 9px;
    display: block;
    margin-top: 8px;
  }

  .table-panel {
    margin-top: 8px;
  }

  .table-wrap {
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 920px;
  }

  th, td {
    padding: 12px 10px;
    text-align: left;
    border-bottom: 1px solid rgba(158,176,205,.12);
    color: var(--muted, #939eb2);
    font-size: 11px;
  }

  th {
    color: #c9d6ea;
    font-size: 9px;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    font-family: "JetBrains Mono", monospace;
  }

  tbody tr:hover {
    background: rgba(102,227,215,.03);
  }

  tbody strong {
    color: #edf3fb;
  }

  .pill {
    display: inline-flex;
    padding: 5px 8px;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 700;
  }

  .pill-interno {
    background: rgba(102,227,215,.1);
    color: #66e3d7;
  }

  .pill-externo {
    background: rgba(255,133,172,.1);
    color: #ff85ac;
  }

  @media (max-width: 980px) {
    .kpi-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .dashboard-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 620px) {
    .recorrencia-dashboard {
      padding: 18px 14px 28px;
    }

    .dashboard-header {
      flex-direction: column;
      align-items: flex-start;
    }

    .kpi-grid {
      grid-template-columns: 1fr;
    }
  }
`;
document.head.appendChild(recorrenciaStyle);

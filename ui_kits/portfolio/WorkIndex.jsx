/* global React */

const PROJECTS = [
  { id: 'union', n: '01', title: 'НОТА Юнион — HRM-платформа', client: 'Иннотех · Т1', year: '2022 — 2023', role: 'Lead Designer', tags: ['B2B', 'HRM', 'Дизайн-система'], shade: '#1A1A1A' },
  { id: 'nota',  n: '02', title: 'nota.tech / diongo.ru',         client: 'НОТА · Т1',     year: '2023 — н.в.',  role: 'Head of Design', tags: ['B2B', 'Корп.коммуникации'], shade: '#3A3A3A' },
  { id: 'mono',  n: '03', title: 'Монополия — платформа грузоперевозок', client: 'Монополия', year: '2020 — 2021', role: 'Senior UX/UI', tags: ['B2C', 'Логистика'], shade: '#666666' },
  { id: 'devim', n: '04', title: 'Devim — финтех-продукты', client: 'Devim', year: '2017 — 2019', role: 'Lead UX/UI', tags: ['Финтех', 'CashWagon', 'Сбербанк'], shade: '#9A9A97' },
  { id: 'major', n: '05', title: 'MAJOR — сайт-агрегатор', client: 'MAJOR', year: '2014 — 2017', role: 'Product Designer', tags: ['B2C', 'SEO'], shade: '#CCCCC8' },
];

function WorkIndex({ onOpen }) {
  return (
    <section style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 32px' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        marginBottom: 48, paddingBottom: 16,
        borderBottom: '1px solid #1A1A1A',
      }}>
        <Eyebrow>01 — Выбранные работы</Eyebrow>
        <Eyebrow>05 проектов</Eyebrow>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {PROJECTS.map(p => (
          <a key={p.id}
            onClick={() => onOpen(p.id)}
            style={{
              display: 'grid',
              gridTemplateColumns: '64px 1fr 200px 200px 24px',
              gap: 24, alignItems: 'center',
              padding: '32px 0',
              borderBottom: '1px solid #E5E4DF',
              cursor: 'pointer',
              textDecoration: 'none', color: '#0A0A0A',
              transition: 'all 280ms cubic-bezier(0.22,1,0.36,1)',
            }}
            onMouseEnter={e => { e.currentTarget.style.paddingLeft = '12px'; e.currentTarget.querySelector('.arr').style.color = '#FF4500'; }}
            onMouseLeave={e => { e.currentTarget.style.paddingLeft = '0';    e.currentTarget.querySelector('.arr').style.color = '#0A0A0A'; }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#9A9A97' }}>{p.n}</div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 500, letterSpacing: '-0.02em', marginBottom: 6 }}>{p.title}</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {p.tags.map(t => <Tag key={t}>{t}</Tag>)}
              </div>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#3A3A3A' }}>{p.client}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#666' }}>{p.year}</div>
            <div className="arr" style={{ fontSize: 18, transition: 'color 280ms' }}>→</div>
          </a>
        ))}
      </div>
    </section>
  );
}

window.WorkIndex = WorkIndex;
window.PROJECTS = PROJECTS;

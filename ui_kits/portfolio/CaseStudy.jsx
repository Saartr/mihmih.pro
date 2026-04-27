/* global React PROJECTS */

function MockShot({ shade }) {
  // Placeholder — фейковое окно браузера с заглушкой UI.
  return (
    <div style={{
      width: '100%', aspectRatio: '16 / 10',
      background: `linear-gradient(180deg, #F2F1ED 0%, ${shade === '#CCCCC8' ? '#E5E4DF' : '#E8E6E0'} 100%)`,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* browser bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 40,
        background: '#FFFFFF', borderBottom: '1px solid #E5E4DF',
        display: 'flex', alignItems: 'center', padding: '0 16px', gap: 8,
      }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#E5E4DF' }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#E5E4DF' }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#E5E4DF' }} />
        <div style={{ flex: 1, marginLeft: 24, height: 20, background: '#F2F1ED', borderRadius: 3 }} />
      </div>
      {/* fake content */}
      <div style={{ position: 'absolute', top: 64, left: 32, right: 32, bottom: 32, display: 'grid', gridTemplateColumns: '180px 1fr', gap: 16 }}>
        <div style={{ background: '#fff', border: '1px solid #E5E4DF' }}></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ height: 32, background: '#fff', border: '1px solid #E5E4DF' }} />
          <div style={{ flex: 1, background: '#fff', border: '1px solid #E5E4DF', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, padding: 12 }}>
            <div style={{ background: '#F2F1ED' }}/><div style={{ background: '#F2F1ED' }}/><div style={{ background: shade, opacity: 0.15 }}/>
            <div style={{ background: '#F2F1ED' }}/><div style={{ background: '#FFEDE5' }}/><div style={{ background: '#F2F1ED' }}/>
          </div>
        </div>
      </div>
    </div>
  );
}

function CaseStudy({ projectId, onBack }) {
  const p = PROJECTS.find(x => x.id === projectId) || PROJECTS[0];
  return (
    <article>
      {/* Hero */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 32px 48px' }}>
        <a onClick={onBack} style={{
          fontFamily: 'var(--font-mono)', fontSize: 12, color: '#666',
          letterSpacing: '0.06em', textTransform: 'uppercase',
          cursor: 'pointer', display: 'inline-block', marginBottom: 48,
        }}>← Все работы</a>

        <Eyebrow style={{ marginBottom: 24 }}>Проект {p.n} — {p.client}</Eyebrow>

        <h1 style={{
          fontSize: 'clamp(40px, 5.5vw, 80px)', fontWeight: 500,
          letterSpacing: '-0.03em', lineHeight: 1.04,
          margin: '0 0 48px', maxWidth: '20ch',
        }}>{p.title}</h1>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24,
          paddingTop: 32, borderTop: '1px solid #1A1A1A',
          fontFamily: 'var(--font-mono)', fontSize: 13,
        }}>
          <div><div style={{ color: '#666', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Клиент</div>{p.client}</div>
          <div><div style={{ color: '#666', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Период</div>{p.year}</div>
          <div><div style={{ color: '#666', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Роль</div>{p.role}</div>
          <div><div style={{ color: '#666', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Сегмент</div>{p.tags.join(', ')}</div>
        </div>
      </section>

      {/* Big shot */}
      <div style={{ padding: '0 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <MockShot shade={p.shade} />
        </div>
      </div>

      {/* Body */}
      <section style={{ maxWidth: 960, margin: '0 auto', padding: '96px 32px' }}>
        <Eyebrow style={{ marginBottom: 24 }}>Контекст</Eyebrow>
        <p style={{ fontSize: 22, lineHeight: 1.5, color: '#0A0A0A', margin: '0 0 48px', letterSpacing: '-0.005em' }}>
          {p.id === 'union' && 'Полный редизайн HRM-платформы НОТА Юнион на базе новой дизайн-системы. Цель — вывести продукт на конкурентный уровень среди ведущих ATS-систем РФ.'}
          {p.id === 'nota' && 'Веду отдел проектирования: nota.tech, diongo.ru (корпоративные коммуникации), НОТА Юнион. Выстраиваю процессы найма, аттестации, менторства; внедряю общую дизайн-систему для нескольких B2C-продуктов вендора.'}
          {p.id === 'mono' && 'Развитие новой дизайн-системы и продуктового функционала для платформы грузоперевозок. Генерация продуктовых идей и валидация через прототипы.'}
          {p.id === 'devim' && 'Финтех-проекты: реализация полного цикла от сбора требований до запуска. Менеджмент UX/UI-команды. Заказчики: МТС, Сбербанк (POS-терминалы), CashWagon, До зарплаты.'}
          {p.id === 'major' && 'Работа в тесной связи с CEO. Спроектировал и отрисовал сайт-агрегатор, собирающий органический трафик для основных сайтов компании. Глубокий опыт работы с аналитикой.'}
        </p>

        <Eyebrow style={{ marginBottom: 24 }}>Результаты</Eyebrow>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, marginBottom: 64 }}>
          {(p.id === 'union' ? [['+42%', 'Скорость закрытия задач'], ['+68', 'NPS после редизайна'], ['Storybook', 'Design-to-Code в проде']]
            : [['Команда', 'Найм, аттестация, менторство'], ['Дизайн-система', 'Общая для вендора'], ['Процессы', 'Storybook · Figma · QA']])
            .map(([n, l], i) => (
            <div key={i}>
              <div style={{ fontSize: 40, fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 8 }}>{n}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{l}</div>
            </div>
          ))}
        </div>

        <div style={{ paddingTop: 32, borderTop: '1px solid #E5E4DF', fontFamily: 'var(--font-mono)', fontSize: 12, color: '#666' }}>
          Подробности по запросу — saartrr@gmail.com
        </div>
      </section>
    </article>
  );
}

window.CaseStudy = CaseStudy;

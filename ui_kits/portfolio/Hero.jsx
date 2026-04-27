/* global React */

function Hero({ onNav }) {
  return (
    <section style={{
      maxWidth: 1280, margin: '0 auto', padding: '128px 32px 96px',
    }}>
      <Eyebrow style={{ marginBottom: 48 }}>00 — Дизайнер интерфейсов · Санкт-Петербург</Eyebrow>

      <h1 style={{
        fontSize: 'clamp(48px, 7.5vw, 112px)',
        fontWeight: 500,
        lineHeight: 1.02,
        letterSpacing: '-0.04em',
        margin: '0 0 48px',
        maxWidth: '14ch',
      }}>
        Проектирую интерфейсы<br/>
        B2B и B2C продуктов<span style={{ color: '#FF4500' }}>.</span>
      </h1>

      <p style={{
        fontSize: 19, lineHeight: 1.5, color: '#3A3A3A',
        maxWidth: '52ch', margin: '0 0 64px',
        fontWeight: 400,
      }}>
        Руководитель отдела проектирования в НОТА (Группа Т1).
        15+ лет в продуктовом дизайне — дизайн-системы, корпоративные
        продукты, финтех. Веду команду и выстраиваю процессы дизайн-разработки.
      </p>

      <div style={{ display: 'flex', gap: 12 }}>
        <Button variant="primary" onClick={() => onNav('work')}>
          Смотреть работы →
        </Button>
        <Button variant="secondary" onClick={() => onNav('cv')}>
          Резюме
        </Button>
      </div>

      {/* Quick stats — тонкая моно-полоса */}
      <div style={{
        marginTop: 128, paddingTop: 32,
        borderTop: '1px solid #1A1A1A',
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32,
      }}>
        {[
          ['15+', 'Лет в продуктовом дизайне'],
          ['+42%', 'Скорость закрытия задач (НОТА Юнион)'],
          ['+68', 'NPS — после редизайна'],
          ['7', 'Команд, которыми руководил'],
        ].map(([n, l], i) => (
          <div key={i}>
            <div style={{ fontSize: 48, fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1, fontVariantNumeric: 'tabular-nums', marginBottom: 12 }}>{n}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.08em', maxWidth: '20ch' }}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

window.Hero = Hero;

/* global React */

function Header({ active, onNav }) {
  const items = [
    { id: 'home',    label: 'Главная' },
    { id: 'work',    label: 'Работы' },
    { id: 'cv',      label: 'Резюме' },
    { id: 'contact', label: 'Контакты' },
  ];
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      borderBottom: '1px solid #E5E4DF',
      background: 'rgba(250, 250, 247, 0.85)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '14px 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <a onClick={() => onNav('home')} style={{
          display: 'flex', alignItems: 'center', gap: 10,
          fontWeight: 500, fontSize: 15, letterSpacing: '-0.01em',
          color: '#0A0A0A', cursor: 'pointer', textDecoration: 'none',
        }}>
          <span>МС</span>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF4500' }}></span>
          <span style={{ color: '#9A9A97', fontWeight: 400 }}>/ Скворцов</span>
        </a>

        <nav style={{ display: 'flex', gap: 28 }}>
          {items.map(it => (
            <a key={it.id}
              onClick={() => onNav(it.id)}
              style={{
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)', fontSize: 12,
                letterSpacing: '0.06em', textTransform: 'uppercase',
                color: active === it.id ? '#0A0A0A' : '#3A3A3A',
                borderBottom: active === it.id ? '1px solid #0A0A0A' : '1px solid transparent',
                paddingBottom: 2,
              }}>{it.label}</a>
          ))}
        </nav>

        <Button variant="primary" onClick={() => onNav('contact')}>Связаться</Button>
      </div>
    </header>
  );
}

window.Header = Header;

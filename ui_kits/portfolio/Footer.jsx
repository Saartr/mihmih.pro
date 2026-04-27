/* global React */

function Footer({ onNav }) {
  return (
    <footer style={{
      background: '#0E0E0E', color: '#FAFAF7',
      padding: '96px 32px 32px',
      marginTop: 0,
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          color: '#A8A8A4', marginBottom: 32,
        }}>— Связаться</div>

        <div style={{
          fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 500,
          letterSpacing: '-0.03em', lineHeight: 1.04,
          marginBottom: 64,
        }}>
          saartrr@gmail.com
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 32, marginBottom: 96,
          fontFamily: 'var(--font-mono)', fontSize: 13,
        }}>
          <div>
            <div style={{ color: '#666', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: 11, marginBottom: 8 }}>Telegram</div>
            <div>@saartr</div>
          </div>
          <div>
            <div style={{ color: '#666', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: 11, marginBottom: 8 }}>Телефон</div>
            <div>+7 981 822 32 44</div>
          </div>
          <div>
            <div style={{ color: '#666', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: 11, marginBottom: 8 }}>Город</div>
            <div>Санкт-Петербург</div>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid #1F1F1F', paddingTop: 24,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: 'var(--font-mono)', fontSize: 11, color: '#666',
          letterSpacing: '0.04em',
        }}>
          <div>© 2026 — Михаил Скворцов</div>
          <div>v.1.0 / Build 042726</div>
        </div>
      </div>
    </footer>
  );
}

window.Footer = Footer;

/* global React */
const { useState } = React;

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <section style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 32px' }}>
      <Eyebrow style={{ marginBottom: 24 }}>03 — Связаться</Eyebrow>
      <h1 style={{ fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 1.02, margin: '0 0 48px', maxWidth: '14ch' }}>
        Открыт<br/>к проектам<span style={{ color: '#FF4500' }}>.</span>
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 96, paddingTop: 32, borderTop: '1px solid #1A1A1A' }}>
        {/* Прямые контакты */}
        <div style={{ paddingTop: 32 }}>
          <Eyebrow style={{ marginBottom: 32 }}>Напрямую</Eyebrow>
          {[
            ['Email', 'saartrr@gmail.com', 'mailto:saartrr@gmail.com'],
            ['Telegram', '@saartr', 'https://t.me/saartr'],
            ['Телефон', '+7 981 822 32 44', 'tel:+79818223244'],
          ].map(([label, val, href]) => (
            <a key={label} href={href} style={{
              display: 'block', padding: '20px 0',
              borderBottom: '1px solid #E5E4DF',
              textDecoration: 'none', color: '#0A0A0A',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{label}</div>
              <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.01em' }}>{val} <span style={{ color: '#9A9A97', fontWeight: 400, marginLeft: 8 }}>↗</span></div>
            </a>
          ))}
        </div>

        {/* Форма */}
        <form onSubmit={e => { e.preventDefault(); setSent(true); }} style={{ paddingTop: 32 }}>
          <Eyebrow style={{ marginBottom: 32 }}>{sent ? 'Спасибо' : 'Или оставьте сообщение'}</Eyebrow>

          {sent ? (
            <div>
              <div style={{ fontSize: 24, fontWeight: 500, letterSpacing: '-0.01em', marginBottom: 16 }}>
                Сообщение отправлено<span style={{ color: '#FF4500' }}>.</span>
              </div>
              <p style={{ color: '#666', maxWidth: '40ch', lineHeight: 1.5 }}>
                Отвечу в течение 1—2 рабочих дней. Если срочно — пишите в Telegram.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              {[
                ['Имя', name, setName, 'text'],
                ['Email', email, setEmail, 'email'],
              ].map(([lbl, v, setV, type]) => (
                <div key={lbl}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{lbl}</div>
                  <input type={type} value={v} onChange={e => setV(e.target.value)} required
                    style={{ width: '100%', padding: '8px 0', border: 'none', borderBottom: '1px solid #1A1A1A', background: 'transparent', fontSize: 17, outline: 'none', fontFamily: 'inherit' }}
                    onFocus={e => e.target.style.borderColor = '#FF4500'}
                    onBlur={e => e.target.style.borderColor = '#1A1A1A'}
                  />
                </div>
              ))}
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Сообщение</div>
                <textarea value={msg} onChange={e => setMsg(e.target.value)} rows="4" required
                  style={{ width: '100%', padding: '8px 0', border: 'none', borderBottom: '1px solid #1A1A1A', background: 'transparent', fontSize: 17, outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
                  onFocus={e => e.target.style.borderColor = '#FF4500'}
                  onBlur={e => e.target.style.borderColor = '#1A1A1A'}
                />
              </div>
              <div>
                <Button variant="accent">Отправить →</Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

window.Contact = Contact;

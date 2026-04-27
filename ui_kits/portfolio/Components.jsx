/* global React */
const { useState } = React;

function Button({ children, variant = 'primary', onClick, href }) {
  const styles = {
    primary:   { background: '#0A0A0A', color: '#FAFAF7', border: '1px solid #0A0A0A' },
    accent:    { background: '#FF4500', color: '#FFFFFF', border: '1px solid #FF4500' },
    secondary: { background: 'transparent', color: '#0A0A0A', border: '1px solid #1A1A1A' },
    ghost:     { background: 'transparent', color: '#0A0A0A', border: '1px solid transparent' },
  };
  const base = {
    fontFamily: 'var(--font-sans)',
    fontSize: 14, fontWeight: 500, letterSpacing: '-0.005em',
    padding: '10px 18px', borderRadius: 4, cursor: 'pointer',
    transition: 'all 160ms cubic-bezier(0.22,1,0.36,1)',
    display: 'inline-flex', alignItems: 'center', gap: 8,
    textDecoration: 'none',
    ...styles[variant],
  };
  const Tag = href ? 'a' : 'button';
  return <Tag style={base} onClick={onClick} href={href}>{children}</Tag>;
}

function Tag({ children, solid, accent }) {
  const s = {
    fontFamily: 'var(--font-mono)', fontSize: 11,
    letterSpacing: '0.08em', textTransform: 'uppercase',
    padding: '4px 10px', borderRadius: 999,
    border: '1px solid #E5E4DF', color: '#3A3A3A',
    display: 'inline-block',
  };
  if (solid)  Object.assign(s, { background: '#0A0A0A', color: '#FAFAF7', borderColor: '#0A0A0A' });
  if (accent) Object.assign(s, { background: '#FFEDE5', color: '#FF4500', borderColor: '#FFEDE5' });
  return <span style={s}>{children}</span>;
}

function Eyebrow({ children, style }) {
  return <div style={{
    fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500,
    letterSpacing: '0.12em', textTransform: 'uppercase', color: '#666',
    ...style
  }}>{children}</div>;
}

function MetaRow({ items }) {
  return <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#666', letterSpacing: '0.02em' }}>
    {items.map((it, i) => <React.Fragment key={i}>
      {i > 0 && <span style={{ margin: '0 10px', color: '#CCCCC8' }}>·</span>}
      <span>{it}</span>
    </React.Fragment>)}
  </div>;
}

window.Button = Button;
window.Tag = Tag;
window.Eyebrow = Eyebrow;
window.MetaRow = MetaRow;

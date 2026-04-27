/* global React */

const TIMELINE = [
  { year: '2023 — н.в.',  company: 'Т1 · НОТА',                  role: 'Руководитель отдела проектирования интерфейсов', body: 'Организация работы отдела, аттестация и найм проектировщиков, менторство. Разработка общей дизайн-системы для нескольких B2C-продуктов вендора. Внедрение новых инструментов работы с графикой и процессов. Продукты: nota.tech, diongo.ru, НОТА Юнион.' },
  { year: '2022 — 2023',  company: 'Иннотех · НОТА Юнион',       role: 'Ведущий дизайнер', body: 'Полностью завершил редизайн продукта на базе новой дизайн-системы. Метрики: время закрытия задач +42%, NPS +68. Внедрил Storybook с актуальной библиотекой компонентов из Figma. Прототипы и тестирования на фокус-группах.' },
  { year: '2020 — 2021',  company: 'Монополия',                   role: 'Senior UX/UI Designer', body: 'Развитие новой дизайн-системы, разработка нового продуктового функционала, генерация продуктовых идей для платформы грузоперевозок.' },
  { year: '2019',         company: 'F2FGroup · AUTHOR24',         role: 'Lead UX/UI Designer', body: 'Организация процессов в команде, ведение основных проектов. Затем переход в стартап F2FGroup (151eye.ru) — создание продуктов с нуля, полный цикл проектирования.' },
  { year: '2017 — 2019',  company: 'Devim',                       role: 'Lead UX/UI Designer', body: 'Финтех-проекты: реализация полного цикла от сбора требований до запуска. Менеджмент UX/UI-команды. Заказчики: МТС, Сбербанк (POS-терминалы), CashWagon, До зарплаты.' },
  { year: '2014 — 2017',  company: 'MAJOR · Автомобильный холдинг', role: 'Product Designer', body: 'Работа в тесной связи с CEO. Спроектировал и отрисовал сайт-агрегатор, собирающий органический трафик. Глубокий опыт работы с аналитикой.' },
  { year: '2009 — 2013',  company: 'Фриланс · Intitle',           role: 'Удалённая проектная работа', body: 'IT-компании. Развитие скорости работы, навыков коммуникации с заказчиками, командной работы по Agile.' },
];

const SKILLS = [
  ['Дизайн', 'User Interface · User Experience · Product Design · Wireframing · Прототипирование · Интерфейсные анимации · Material Design · Onboarding · Разработка логотипов'],
  ['Инструменты', 'Figma · Axure RP · Principle · Photoshop · Illustrator · After Effects · Abstract · Jira · YouTrack'],
  ['Исследования', 'Usability Testing · A/B-тесты · CustDev · Анализ данных · Google Analytics · Яндекс.Метрика'],
  ['Технологии', 'HTML · CSS · Vibecoding'],
  ['Менеджмент', 'Управление командой · Найм и аттестация · Менторство · Фасилитация'],
  ['Языки', 'Русский — родной · Английский — B2'],
];

function Cv() {
  return (
    <article style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 32px' }}>
      <Eyebrow style={{ marginBottom: 24 }}>02 — Резюме</Eyebrow>
      <h1 style={{ fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.04, margin: '0 0 24px' }}>
        Михаил Скворцов
      </h1>
      <p style={{ fontSize: 19, color: '#3A3A3A', lineHeight: 1.5, maxWidth: '52ch', margin: '0 0 24px' }}>
        Проектирую B2B и B2C-продукты 15+ лет. Руковожу отделом проектирования интерфейсов в вендоре НОТА (Группа компаний Т1). Специализация — сложные интерфейсы корпоративных продуктов, дизайн-системы, финтех.
      </p>
      <div style={{ marginBottom: 64 }}>
        <Button variant="accent" href="../../assets/CV.pdf">Скачать PDF →</Button>
      </div>

      {/* Опыт */}
      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 32, paddingTop: 32, borderTop: '1px solid #1A1A1A', marginBottom: 96 }}>
        <Eyebrow>Опыт работы · 15+ лет</Eyebrow>
        <div>
          {TIMELINE.map((t, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '160px 1fr', gap: 32,
              padding: '32px 0',
              borderBottom: i < TIMELINE.length - 1 ? '1px solid #E5E4DF' : 'none',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em', paddingTop: 4 }}>{t.year}</div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.01em', marginBottom: 4 }}>{t.company}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#FF4500', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>{t.role}</div>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: '#3A3A3A', margin: 0, maxWidth: '64ch' }}>{t.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Навыки */}
      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 32, paddingTop: 32, borderTop: '1px solid #1A1A1A', marginBottom: 96 }}>
        <Eyebrow>Навыки</Eyebrow>
        <div>
          {SKILLS.map(([cat, items], i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 32, padding: '20px 0', borderBottom: i < SKILLS.length - 1 ? '1px solid #E5E4DF' : 'none' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{cat}</div>
              <div style={{ fontSize: 15, lineHeight: 1.6, color: '#0A0A0A' }}>{items}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Образование */}
      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 32, paddingTop: 32, borderTop: '1px solid #1A1A1A' }}>
        <Eyebrow>Образование</Eyebrow>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 32, padding: '20px 0', borderBottom: '1px solid #E5E4DF' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em' }}>2013</div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 500 }}>СПбГПУ · Магистр</div>
              <div style={{ fontSize: 14, color: '#666', marginTop: 4 }}>ИМОП · Информационные технологии в дизайне</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 32, padding: '20px 0' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em' }}>2016</div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 500 }}>HTML Academy</div>
              <div style={{ fontSize: 14, color: '#666', marginTop: 4 }}>HTML, CSS, JS — базовый уровень</div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

window.Cv = Cv;

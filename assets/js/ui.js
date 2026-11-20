/* Общий каркас и UI-хелперы прототипа «Марк Пак» */
(function () {
  'use strict';

  const DB = window.DB;
  const fmt = new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  const money = (n) => fmt.format(Number(n) || 0);

  const esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  /* ---------- Icons ---------- */
  const I = {
    home: '<svg viewBox="0 0 20 20" fill="none"><path d="M10.4 1.3a.9.9 0 0 0-1.1 0L2.1 7.8c-.3.3-.5.7-.5 1.2v7.5c0 .9.7 1.7 1.6 1.7h4.6c.3 0 .5-.2.5-.5v-3.4a1.8 1.8 0 1 1 3.6 0v3.4c0 .3.2.5.5.5h4.6c.9 0 1.6-.8 1.6-1.7V9c0-.5-.2-.9-.5-1.2L10.4 1.3Z" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    orders: '<svg viewBox="0 0 20 20" fill="none"><path d="M8.5 2.2c-.8 0-1.4.6-1.4 1.4h-.7c-1.6 0-2.9 1.3-2.9 2.9v8.1c0 1.6 1.3 2.9 2.9 2.9h6.7c1.6 0 2.9-1.3 2.9-2.9V6.5c0-1.6-1.3-2.9-2.9-2.9h-.7c0-.8-.6-1.4-1.4-1.4H8.5Z" stroke-width="1.4"/><path d="M6.2 10.8h7.6M6.2 14.2h7.6" stroke-width="1.4" stroke-linecap="round"/></svg>',
    wallet: '<svg viewBox="0 0 20 20" fill="none"><path d="M17 12.9c0 2.5-1.7 4.1-4.2 4.1H6.2C3.7 17 2 15.4 2 12.9V7.1C2 4.9 3.4 3.3 5.5 3h8.3c2.2.2 3.2 1.8 3.2 4v1h-3a1.8 1.8 0 0 0 0 3.6h3v1.3Z" stroke-width="1.4"/><circle cx="14.9" cy="10" r=".9" fill="currentColor" stroke="none"/></svg>',
    price: '<svg viewBox="0 0 20 20" fill="none"><rect x="1.5" y="1.5" width="17" height="17" rx="5" stroke-width="1.4"/><path d="M11.1 5c1.6 0 2.9 1.3 2.9 2.9S12.7 10.8 11.1 10.8H8.4V5h2.7Z" stroke-width="1.4"/><path d="M8.4 5v10M10 10.8H6" stroke-width="1.4" stroke-linecap="round"/></svg>',
    help: '<svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke-width="1.4"/><path d="M7.9 7.7c.2-.9.9-1.6 1.9-1.6 1.1 0 2 .8 2 1.9 0 1.2-1.2 1.5-1.7 2.1-.2.2-.3.5-.3.9" stroke-width="1.4" stroke-linecap="round"/><circle cx="9.9" cy="13.9" r=".9" fill="currentColor" stroke="none"/></svg>',
    support: '<svg viewBox="0 0 20 20" fill="none"><path d="M15.6 14.1l.3 2.6c.1.7-.7 1.2-1.3.8l-3.5-2.1c-.4 0-.8-.1-1.2-.1a6.9 6.9 0 0 1-6.8-6.6C3.1 5 6.4 1.9 10.5 1.9s7.4 3 7.4 6.8c0 2.2-1.1 4.2-2.9 5.4" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.4 12.7c.7.8 1.8 1.2 2.9 1.2" stroke-width="1.4" stroke-linecap="round"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none"><path d="M21.9 18.3c0 .4-.1.7-.2 1.1-.2.4-.4.7-.7 1-.5.5-1 .9-1.6 1.2-.6.2-1.3.4-2 .4-1 0-2.1-.2-3.2-.7-1.1-.5-2.3-1.2-3.4-2-1.1-.8-2.2-1.8-3.3-2.8-1-1-2-2.1-2.8-3.3-.8-1.1-1.5-2.3-2-3.4C2.2 8.7 2 7.6 2 6.5c0-.7.1-1.3.4-1.9.2-.6.6-1.2 1.1-1.7.6-.6 1.3-.9 2.1-.9.3 0 .5.1.8.2.3.1.5.3.7.5l2.3 3.3c.2.3.3.5.4.7.1.2.1.4.1.6 0 .2-.1.5-.2.7-.1.2-.3.5-.5.7l-.8.8c-.1.1-.2.2-.2.4v.2c.2.4.5.8.9 1.3.4.5 1 1.1 1.5 1.6.6.5 1.1 1 1.6 1.5.4.4.8.7 1.2.9.1 0 .2.1.3.1.2 0 .3-.1.4-.2l.8-.8c.2-.2.5-.4.7-.5.2-.1.5-.2.7-.2.2 0 .4 0 .6.1.2.1.5.2.7.4l3.3 2.4c.3.2.4.4.5.6.1.2.1.5.1.7Z" stroke-width="1.5"/></svg>',
    pin: '<svg viewBox="0 0 20 20" fill="none"><path d="M10 18s6-5.1 6-9.3A6 6 0 0 0 4 8.7C4 12.9 10 18 10 18Z" stroke-width="1.4"/><circle cx="10" cy="8.6" r="2.3" stroke-width="1.4"/></svg>',
    globe: '<svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke-width="1.4"/><path d="M2.2 10h15.6M10 2c2 2.1 3.2 5 3.2 8s-1.2 5.9-3.2 8c-2-2.1-3.2-5-3.2-8S8 4.1 10 2Z" stroke-width="1.4"/></svg>',
    bell: '<svg viewBox="0 0 22 22" fill="none"><path d="M11 2.8a5.4 5.4 0 0 0-5.4 5.4v3.1c0 .5-.2 1.2-.5 1.7l-1 1.8c-.6 1.1 0 2.4 1.3 2.4h11.2c1.3 0 1.9-1.3 1.3-2.4l-1-1.8c-.3-.5-.5-1.2-.5-1.7V8.2A5.4 5.4 0 0 0 11 2.8Z" stroke-width="1.4" stroke-linejoin="round"/><path d="M12.8 18.2c-.2.9-1 1.6-1.9 1.6s-1.7-.7-1.9-1.6" stroke-width="1.4" stroke-linecap="round"/></svg>',
    arrowRight: '<svg viewBox="0 0 20 20" fill="none"><path d="M4 10h11M10.5 4.5 16 10l-5.5 5.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    arrowLeft: '<svg viewBox="0 0 20 20" fill="none"><path d="M16 10H5M9.5 4.5 4 10l5.5 5.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    search: '<svg viewBox="0 0 20 20" fill="none"><circle cx="9.4" cy="9.4" r="6.4" stroke-width="1.5"/><path d="m14.2 14.2 4 4" stroke-width="1.5" stroke-linecap="round"/></svg>',
    box: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor"><path d="M24 5 42 14v20L24 43 6 34V14L24 5Z" stroke-width="1.6" stroke-linejoin="round"/><path d="M6 14l18 9 18-9M24 23v20" stroke-width="1.6" stroke-linejoin="round"/><path d="m15 9.5 18 9" stroke-width="1.6"/></svg>',
    weight: '<svg viewBox="0 0 16 16" fill="none"><path d="M4 4h8l1.6 9.2c.1.5-.3 1-.8 1H3.2c-.5 0-.9-.5-.8-1L4 4Z" stroke-width="1.3" stroke-linejoin="round"/><path d="M5.8 4a2.2 2.2 0 1 1 4.4 0" stroke-width="1.3" stroke-linecap="round"/></svg>',
    volume: '<svg viewBox="0 0 16 16" fill="none"><path d="M8 1.6 14 4.8v6.4L8 14.4 2 11.2V4.8L8 1.6Z" stroke-width="1.3" stroke-linejoin="round"/><path d="M2 4.8 8 8l6-3.2M8 8v6.4" stroke-width="1.3" stroke-linejoin="round"/></svg>',
    download: '<svg viewBox="0 0 20 20" fill="none"><path d="M10 2.5v9.2M6.5 8.5 10 12l3.5-3.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.5 13.2v1.8c0 1.4 1.1 2.5 2.5 2.5h8c1.4 0 2.5-1.1 2.5-2.5v-1.8" stroke-width="1.5" stroke-linecap="round"/></svg>',
    check: '<svg viewBox="0 0 20 20" fill="none"><path d="m3.5 10.5 4.2 4.2L16.5 6" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    trash: '<svg viewBox="0 0 20 20" fill="none"><path d="M3.5 5.5h13M8 5.5V4c0-.6.4-1 1-1h2c.6 0 1 .4 1 1v1.5M5.5 5.5l.8 11c0 .6.5 1 1 1h5.4c.6 0 1-.4 1-1l.8-11" stroke-width="1.4" stroke-linecap="round"/></svg>',
    user: '<svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="6" r="3.4" stroke-width="1.4"/><path d="M3.6 17.2c0-3.3 2.9-5.4 6.4-5.4s6.4 2.1 6.4 5.4" stroke-width="1.4" stroke-linecap="round"/></svg>',
    logout: '<svg viewBox="0 0 20 20" fill="none"><path d="M8.5 3.5H6A2.5 2.5 0 0 0 3.5 6v8A2.5 2.5 0 0 0 6 16.5h2.5" stroke-width="1.4" stroke-linecap="round"/><path d="M8 10h9M13.5 6.5 17 10l-3.5 3.5" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    plus: '<svg viewBox="0 0 20 20" fill="none"><path d="M10 4v12M4 10h12" stroke-width="1.6" stroke-linecap="round"/></svg>',
    chevron: '<svg viewBox="0 0 20 20" fill="none"><path d="m5 7.5 5 5 5-5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  const NAV = [
    { key: 'warehouse', href: 'warehouse.html', label: 'Мой склад', short: 'Склад', icon: I.home },
    { key: 'orders', href: 'orders.html', label: 'Мои заказы', short: 'Заказы', icon: I.orders },
    { key: 'balance', href: 'balance.html', label: 'Баланс и оплата', short: 'Баланс', icon: I.wallet },
    { key: 'prices', href: 'prices.html', label: 'Тарифы', short: 'Тарифы', icon: I.price }
  ];

  /* ---------- Shell ---------- */
  function renderSidebar(active) {
    const items = NAV.map((n) =>
      `<a class="nav__link ${n.key === active ? 'is-active' : ''}" href="${n.href}">${n.icon}<span>${n.label}</span></a>`
    ).join('');
    return `
      <div class="sidebar__logo">
        <div class="logo-mark">М</div>
        <div class="logo-text">Марк <span>Пак</span></div>
      </div>
      <nav class="nav">${items}</nav>
      <div class="sidebar__bottom">
        <div>
          <div class="sidebar__label">есть вопрос?</div>
          <a class="sidebar__link" href="faq.html">${I.help}<span>Помощь</span></a>
          <a class="sidebar__link" href="contacts.html">${I.support}<span>Связь с поддержкой</span></a>
        </div>
        <div class="sidebar__divider"></div>
        <div>
          <div class="sidebar__label">Контакты</div>
          <a class="sidebar__contact" href="tel:+74994606716">${I.phone}<span>+7 (499) 460-67-16</span></a>
          <div class="sidebar__contact">${I.pin}<span>Адрес склада: г. Москва, г. Троицк, ул. Промышленная, 15</span></div>
          <a class="sidebar__contact" href="https://markpack.ru" target="_blank" rel="noreferrer">${I.globe}<span>markpack.ru</span></a>
        </div>
      </div>`;
  }

  function renderTopbar() {
    const u = DB.user;
    return `
      <div class="topbar__actions">
        <button class="btn btn--ghost btn--sm" data-go="refund">Забрать</button>
        <button class="btn btn--primary btn--sm" data-go="send">Сдать вещи ${I.plus.replace('<svg', '<svg style="width:16px;height:16px"')}</button>
      </div>
      <div class="topbar__right">
        <button class="balance-btn" data-balance>${I.wallet}<span class="mono">${money(u.balance)} ₽</span></button>
        <a class="icon-btn" href="notifications.html" aria-label="Уведомления">${I.bell}<span class="icon-btn__dot"></span></a>
        <div class="user">
          <button class="user__btn" data-user>
            <div class="user__avatar">${esc(u.short)}</div>
            <div class="user__name"><b>${esc(u.name)}</b><span>${esc(u.phone)}</span></div>
            <span class="user__caret">${I.chevron}</span>
          </button>
          <div class="dropdown" data-user-menu>
            <a class="dropdown__item" href="account.html">${I.user}Мой аккаунт</a>
            <a class="dropdown__item" href="index.html">${I.logout}Выйти</a>
          </div>
        </div>
      </div>`;
  }

  function renderBottomNav(active) {
    return NAV.map((n) =>
      `<a class="${n.key === active ? 'is-active' : ''}" href="${n.href}">${n.icon}<span>${n.short || n.label}</span></a>`
    ).join('');
  }

  function initShell() {
    const page = document.body.dataset.page || '';
    const sidebar = document.getElementById('sidebar');
    const topbar = document.getElementById('topbar');
    const bottom = document.getElementById('bottomNav');
    if (sidebar) sidebar.innerHTML = renderSidebar(page);
    if (topbar) topbar.innerHTML = renderTopbar();
    if (bottom) bottom.innerHTML = renderBottomNav(page);
    if (document.body.dataset.actions === 'off') {
      document.querySelectorAll('.topbar__actions .btn').forEach((b) => { b.disabled = true; });
    }

    document.querySelectorAll('[data-balance]').forEach((b) => b.addEventListener('click', openTopUp));
    document.querySelectorAll('[data-user]').forEach((b) => {
      b.addEventListener('click', (e) => {
        e.stopPropagation();
        const menu = b.parentElement.querySelector('[data-user-menu]');
        if (menu) menu.classList.toggle('is-open');
      });
    });
    document.addEventListener('click', () => {
      document.querySelectorAll('[data-user-menu].is-open').forEach((m) => m.classList.remove('is-open'));
    });

    document.querySelectorAll('[data-go]').forEach((b) => {
      b.addEventListener('click', () => {
        if (DB.user.balance < 0) return openNegative();
        location.href = b.dataset.go === 'send' ? 'send.html' : 'refund.html';
      });
    });
  }

  /* ---------- Modal / toast ---------- */
  function root() {
    let el = document.getElementById('modalRoot');
    if (!el) {
      el = document.createElement('div');
      el.id = 'modalRoot';
      el.className = 'modal-overlay';
      el.innerHTML = '<div class="modal" role="dialog" aria-modal="true"></div>';
      document.body.appendChild(el);
      el.addEventListener('click', (e) => { if (e.target === el) closeModal(); });
    }
    return el;
  }

  function openModal(opts) {
    const el = root();
    const body = el.firstElementChild;
    body.className = 'modal' + (opts.wide ? ' modal--wide' : '');
    const icon = opts.icon ? `<div class="modal__icon modal__icon--${opts.icon}">${opts.icon === 'ok' ? '✓' : '!'}</div>` : '';
    const actions = (opts.actions || []).map((a, i) =>
      `<button class="btn ${a.className || 'btn--primary'}" data-modal-action="${i}">${a.label}</button>`
    ).join('');
    body.innerHTML = `
      <div class="modal__head">
        <div>${icon}<div class="modal__title">${opts.title || ''}</div></div>
        <button class="modal__close" aria-label="Закрыть">×</button>
      </div>
      ${opts.text ? `<p class="modal__text">${opts.text}</p>` : ''}
      ${opts.body || ''}
      ${actions ? `<div class="modal__actions">${actions}</div>` : ''}`;
    body.querySelector('.modal__close').addEventListener('click', closeModal);
    (opts.actions || []).forEach((a, i) => {
      const btn = body.querySelector(`[data-modal-action="${i}"]`);
      if (btn) btn.addEventListener('click', () => { if (a.onClick) a.onClick(); else closeModal(); });
    });
    el.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    return body;
  }

  function closeModal() {
    const el = document.getElementById('modalRoot');
    if (el) el.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function toast(text) {
    let t = document.getElementById('toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'toast';
      t.className = 'toast';
      document.body.appendChild(t);
    }
    t.textContent = text;
    requestAnimationFrame(() => t.classList.add('is-visible'));
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove('is-visible'), 2600);
  }

  function openNegative() {
    openModal({
      title: 'Создать заказ невозможно!',
      text: 'У вас есть непогашенная задолженность. Пожалуйста, погасите её, чтобы продолжить пользоваться нашими услугами.',
      icon: 'warn',
      actions: [
        { label: 'Позже', className: 'btn--ghost' },
        { label: 'Перейти к пополнению', onClick: () => { closeModal(); openTopUp(); } }
      ]
    });
  }

  /* ---------- Payment flows ---------- */
  function calcPeriod(months) {
    const base = DB.user.monthly * months;
    const percent = months >= 12 ? 10 : months >= 6 ? 5 : months >= 3 ? 3 : 0;
    const total = Math.round(base * (1 - percent / 100) * 100) / 100;
    return { months, percent, total, old: Math.round(base * 100) / 100, saving: Math.round((base - total) * 100) / 100 };
  }

  function openTopUp() {
    const body = openModal({
      title: 'Пополнить баланс',
      wide: true,
      text: `Ваш тариф в месяц: ${money(DB.user.monthly)} ₽`,
      body: `
        <div class="periods" data-periods>
          ${[3, 6, 12].map((m) => {
            const p = calcPeriod(m);
            return `<div class="period ${m === 3 ? 'is-active' : ''}" data-months="${m}">
              ${m === 12 ? '<span class="period__badge">Лучшая цена</span>' : ''}
              <b>${m} мес.</b>
              <span>${p.total.toLocaleString('ru-RU')} ₽</span>
              <em>−${p.percent}%</em>
            </div>`;
          }).join('')}
        </div>
        <div class="kv"><span>Срок хранения</span><b data-days>90 дн.</b></div>
        <div class="kv"><span>Скидка</span><b data-percent>3%</b></div>
        <div class="kv"><span>Экономия</span><b data-saving>${money(calcPeriod(3).saving)} ₽</b></div>
        <div class="divider"></div>
        <div class="kv"><span>Итого к оплате</span><b class="stat-big" style="font-size:22px" data-total>${money(calcPeriod(3).total)} ₽</b></div>`,
      actions: [
        { label: 'Сформировать счёт', className: 'btn--ghost', onClick: () => openInvoice(calcPeriod(3).total) },
        { label: 'Выбрать карту', onClick: () => openPayment(calcPeriod(3).total) }
      ]
    });

    let months = 3;
    body.querySelectorAll('[data-months]').forEach((p) => {
      p.addEventListener('click', () => {
        months = Number(p.dataset.months);
        body.querySelectorAll('[data-months]').forEach((x) => x.classList.toggle('is-active', x === p));
        const c = calcPeriod(months);
        body.querySelector('[data-days]').textContent = `${months * 30} дн.`;
        body.querySelector('[data-percent]').textContent = `${c.percent}%`;
        body.querySelector('[data-saving]').textContent = `${money(c.saving)} ₽`;
        body.querySelector('[data-total]').textContent = `${money(c.total)} ₽`;
        const btns = body.querySelectorAll('.modal__actions .btn');
        if (btns[0]) btns[0].onclick = () => openInvoice(c.total);
        if (btns[1]) btns[1].onclick = () => openPayment(c.total);
      });
    });
  }

  function openInvoice(amount) {
    openModal({
      title: 'Счёт на оплату',
      text: `Юридическое лицо: ${esc(DB.user.company)}, ИНН ${esc(DB.user.inn)}`,
      body: `
        <div class="kv mt-12"><span>Период</span><b>90 дней</b></div>
        <div class="kv"><span>Тариф</span><b>${money(DB.user.monthly)} ₽/мес</b></div>
        <div class="kv"><span>Скидка</span><b>3%</b></div>
        <div class="divider"></div>
        <div class="kv"><span>Итого</span><b class="stat-big" style="font-size:22px">${money(amount)} ₽</b></div>`,
      actions: [
        { label: 'Закрыть', className: 'btn--ghost' },
        { label: 'Скачать счёт', onClick: () => { closeModal(); toast('Счёт сформирован (демо)'); } }
      ]
    });
  }

  function openPayment(amount) {
    openModal({
      title: 'Способ оплаты',
      text: `Сумма к оплате ${money(amount)} ₽`,
      body: `
        <div class="card card--flat mt-16" style="display:flex;align-items:center;gap:12px">
          <div style="width:40px;height:26px;border-radius:4px;background:#1F4159"></div>
          <div style="flex:1"><b style="font-size:14px">•••• 4242</b><div class="caption">Основная карта</div></div>
          <span class="chip chip--green">Основная</span>
        </div>
        <button class="btn btn--ghost btn--block mt-12" data-other>Другим способом</button>`,
      actions: [
        { label: 'Отмена', className: 'btn--ghost' },
        { label: 'Оплатить', onClick: () => { closeModal(); openSuccess('Баланс успешно пополнен!', 'Средства будут зачислены в ближайшее время'); } }
      ]
    });
    const other = document.querySelector('[data-other]');
    if (other) other.addEventListener('click', () => {
      closeModal();
      openModal({
        title: 'Другие способы оплаты',
        text: 'Оплата по СБП или новой картой',
        body: `
          <div class="card card--flat mt-16"><b>СБП</b><p class="caption mt-8">Отсканируйте QR-код в приложении банка</p></div>
          <div class="card card--flat mt-12"><b>Новая карта</b><p class="caption mt-8">Введите данные карты в платёжной форме</p></div>`,
        actions: [
          { label: 'Назад', className: 'btn--ghost', onClick: () => { closeModal(); openPayment(amount); } },
          { label: 'Продолжить', onClick: () => { closeModal(); openSuccess('Баланс успешно пополнен!', 'Средства будут зачислены в ближайшее время'); } }
        ]
      });
    });
  }

  function openSuccess(title, text) {
    openModal({
      title, text, icon: 'ok',
      actions: [{ label: 'Хорошо' }]
    });
  }

  /* ---------- GRM cards ---------- */
  const statusText = { stored: 'На хранение', ordered: 'Заказано', returned: 'Возвращено' };

  function grmCard(g, opts) {
    opts = opts || {};
    const selected = opts.selected || 0;
    const cls = ['grm', g.status === 'ordered' ? 'is-ordered' : g.status === 'returned' ? 'is-returned' : '', selected ? 'is-selected' : ''].join(' ');
    const media = `<div class="grm__media" data-photo="${esc(g.no)}">
        ${I.box}
        <span class="grm__qty">${g.qty} шт</span>
        ${opts.selectable && g.status === 'stored' ? `
          <div class="grm__counter" data-stop>
            <button type="button" data-dec>−</button>
            <input type="number" value="${selected || g.qty}" min="1" max="${g.qty}" data-qty>
            <button type="button" data-inc>+</button>
          </div>` : ''}
      </div>`;
    return `<article class="${cls}" data-grm="${esc(g.no)}" ${opts.selectable && g.status === 'stored' ? 'data-selectable="1"' : ''}>
      <div class="grm__body">
        <div class="grm__status">${statusText[g.status] || 'Статус неизвестен'}</div>
        <div class="grm__size">
          <span>${I.weight}${g.weight} кг</span>
          <span>${I.volume}${Number(g.volume).toFixed(3)} м³</span>
        </div>
        <div class="grm__title ${g.title ? '' : 'is-empty'}" data-title>${esc(g.title || 'Добавить подпись')}</div>
        <div class="grm__meta">
          <span class="grm__no">${esc(g.no)}</span>
          <span class="grm__date">${esc(g.date)}</span>
        </div>
      </div>
      ${media}
    </article>`;
  }

  /* ---------- Orders ---------- */
  function orderRow(o) {
    const tone = o.status === 'CLOSED' ? 'chip--grey' : o.status === 'CANCEL' ? 'chip--red' : 'chip--green';
    return `<a class="order" href="order.html?no=${encodeURIComponent(o.no)}">
      <div>
        <div class="order__no">№ ${esc(o.no)}</div>
        <div class="order__title">${esc(o.title)}</div>
        <div class="order__sub">${o.items ? o.items + ' грузов · ' : ''}${esc(o.date)}, ${esc(o.time)}</div>
      </div>
      <div class="order__right">
        <span class="chip ${tone}">${esc(o.statusText)}</span>
        <span class="order__arrow">${I.arrowRight}</span>
      </div>
    </a>`;
  }

  /* ---------- Boot ---------- */
  function onReady(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  onReady(() => {
    initShell();
    document.querySelectorAll('.js-faq').forEach((item) => {
      const q = item.querySelector('.faq-q');
      if (q) q.addEventListener('click', () => item.classList.toggle('is-open'));
    });
  });

  window.UI = {
    money, esc, I, DB, toast, openModal, closeModal, openTopUp, openPayment, openInvoice, openSuccess, openNegative,
    grmCard, orderRow, statusText, onReady, calcPeriod
  };
})();

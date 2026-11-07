export const eventDriven = {
  slug: 'event-driven',
  category: 'distributed',
  name: { ru: 'Событийная архитектура', en: 'Event-Driven Architecture' },
  popularity: 3,
  tags: ['distributed', 'events', 'messaging'],

  intent: {
    ru: 'Событийная архитектура (Event-Driven Architecture) связывает части системы через события: компонент сообщает, что уже произошло, например «пользователь зарегистрирован», и не ждёт ответа. Событие уходит в брокер, а брокер доставляет копию каждому, кто на него подписан. Отправитель не знает, сколько у него подписчиков и что они сделают, поэтому новую реакцию можно добавить, не трогая его код. За эту свободу платят: событие может прийти дважды или с опозданием, данные у частей системы какое-то время расходятся, а путь одного действия через систему труднее проследить.',
    en: 'Event-Driven Architecture connects the parts of a system through events: a component announces what has already happened, for example "a user registered", and does not wait for a reply. The event goes to a broker, and the broker delivers a copy to everyone subscribed to it. The sender does not know how many subscribers it has or what they will do, so a new reaction can be added without touching its code. This freedom has a price: an event may arrive twice or late, the parts of the system disagree on the data for a while, and the path of one action through the system is harder to trace.',
  },

  problem: {
    ru: 'В **микросервисной архитектуре** из прошлой темы сервис аккаунтов, создав аккаунт, сам зовёт сервис писем и ждёт ответа. Каждая новая реакция на регистрацию - статистика, аудит, рассылка - это ещё одна правка сервиса аккаунтов и ещё один сосед, которого он ждёт. Регистрация начинает зависеть от доступности всех, кого она зовёт, а тайм-ауты и повторы приходится писать для каждого. Сервис аккаунтов знает о письмах, статистике и аудите, хотя ни одна из этих задач не его.',
    en: 'In the **microservices architecture** of the previous topic, the accounts service, having created an account, calls the email service itself and waits for the reply. Every new reaction to a registration - statistics, an audit, a newsletter - is one more change to the accounts service and one more neighbour it waits for. Registration comes to depend on the availability of everyone it calls, and timeouts and retries have to be written for each of them. The accounts service knows about letters, statistics, and audits, although none of these jobs is its own.',
  },

  solution: {
    ru: 'Сервис аккаунтов только записывает аккаунт и публикует **событие** `UserRegistered` - факт в прошедшем времени со своим `id`. Между ним и остальными стоит **брокер**: на каждого подписчика у него **своя очередь**, и каждая получает копию события. Подписчики - письма, статистика, аудит - работают сами, каждый со своим хранилищем, и никому не отвечают. Если подписчик лежит, событие ждёт в его очереди. Брокер гарантирует доставку **хотя бы один раз**, поэтому подписчик помнит `id` обработанных событий и не делает работу дважды. Хранить сами события как источник истины - это event sourcing, а раздельные модели чтения и записи - следующая тема, **CQRS**.',
    en: 'The accounts service only saves the account and publishes the **event** `UserRegistered` - a fact in the past tense with its own `id`. Between it and the others stands a **broker**: it keeps **a queue per subscriber**, and each queue gets a copy of the event. The subscribers - letters, statistics, audit - work on their own, each with its own storage, and reply to no one. If a subscriber is down, the event waits in its queue. The broker guarantees delivery **at least once**, so a subscriber remembers the `id`s of the events it has handled and does not do the work twice. Storing the events themselves as the source of truth is event sourcing, and separate read and write models are the next topic, **CQRS**.',
  },

  diagram: {
    layout: 'event-driven',
    boundary: {
      label: { ru: 'На событие ответа нет', en: 'An event gets no reply' },
      note: { ru: 'у команды - запрос и ответ', en: 'a command: a request and a reply' },
    },
    nodes: [
      {
        id: 'page',
        label: { ru: 'Страница', en: 'Page' },
        note: { ru: 'RegistrationPage', en: 'RegistrationPage' },
        role: {
          ru: 'Класс `RegistrationPage`: отправляет сервису аккаунтов команду «зарегистрировать» и ждёт ответа. О брокере и подписчиках она не знает: «Registered» значит, что аккаунт создан, а не что письмо уже ушло.',
          en: 'The `RegistrationPage` class: sends the accounts service a "register" command and waits for the reply. It knows nothing of the broker and the subscribers: "Registered" means the account was created, not that the letter has already gone out.',
        },
      },
      {
        id: 'accounts',
        side: 'producer',
        label: { ru: 'Аккаунты', en: 'Accounts' },
        note: { ru: 'AccountsService', en: 'AccountsService' },
        role: {
          ru: 'Класс `AccountsService`, производитель событий. Проверяет команду, создаёт аккаунт и публикует `UserRegistered`. Не ждёт подписчиков и не знает, сколько их: для него есть только брокер.',
          en: 'The `AccountsService` class, the event producer. It checks the command, creates the account, and publishes `UserRegistered`. It does not wait for the subscribers and does not know how many there are: all it sees is the broker.',
        },
      },
      {
        id: 'accounts-store',
        side: 'store',
        label: { ru: 'Хранилище', en: 'Storage' },
        note: { ru: 'emails · replies', en: 'emails · replies' },
        role: {
          ru: 'Поля сервиса аккаунтов: `emails` - адреса, `replies` - ответы по `requestId`. Подписчики сюда не заглядывают: всё, что им нужно, приходит в событии.',
          en: 'The accounts service\'s fields: `emails` - the addresses, `replies` - replies by `requestId`. The subscribers never look in here: whatever they need comes in the event.',
        },
      },
      {
        id: 'broker',
        side: 'broker',
        label: { ru: 'Брокер', en: 'Broker' },
        note: { ru: 'Broker · очередь на подписчика', en: 'Broker · a queue per subscriber' },
        role: {
          ru: 'Класс `Broker`: принимает событие и кладёт копию в очередь каждого подписчика - метки на нижнем краю блока. Доставляет из очереди по одному событию, по порядку, и убирает событие только после подтверждения. Не подтвердил - доставит снова.',
          en: 'The `Broker` class: takes an event and puts a copy into every subscriber\'s queue - the marks on the block\'s bottom edge. It delivers from a queue one event at a time, in order, and removes an event only once it is acknowledged. No acknowledgement - it delivers again.',
        },
      },
      {
        id: 'welcome',
        side: 'consumer',
        label: { ru: 'Приветствия', en: 'Welcome' },
        note: { ru: 'WelcomeEmails', en: 'WelcomeEmails' },
        role: {
          ru: 'Класс `WelcomeEmails`, подписчик: на каждое новое событие `UserRegistered` отправляет одно приветственное письмо. Событие с уже знакомым `id` пропускает, поэтому повторная доставка не даёт второго письма.',
          en: 'The `WelcomeEmails` class, a subscriber: for each new `UserRegistered` event it sends one welcome letter. An event whose `id` it has seen is skipped, so a repeated delivery does not produce a second letter.',
        },
      },
      {
        id: 'letters-store',
        side: 'store',
        label: { ru: 'Хранилище', en: 'Storage' },
        note: { ru: 'letters · handled', en: 'letters · handled' },
        role: {
          ru: 'Поля подписчика писем: `letters` - отправленные письма, `handled` - `id` обработанных событий. Это его собственные данные, сервис аккаунтов о них не знает.',
          en: 'The letter subscriber\'s fields: `letters` - the letters sent, `handled` - the `id`s of handled events. This is its own data; the accounts service does not know about it.',
        },
      },
      {
        id: 'stats',
        side: 'consumer',
        label: { ru: 'Статистика', en: 'Statistics' },
        note: { ru: 'SignupStats', en: 'SignupStats' },
        role: {
          ru: 'Класс `SignupStats`, второй подписчик того же события: считает регистрации по домену почты. Работает независимо от писем: если подписчик писем лежит, статистика всё равно обновляется.',
          en: 'The `SignupStats` class, a second subscriber to the same event: counts registrations by email domain. It works independently of the letters: if the letter subscriber is down, the statistics still update.',
        },
      },
      {
        id: 'stats-store',
        side: 'store',
        label: { ru: 'Хранилище', en: 'Storage' },
        note: { ru: 'byDomain · handled', en: 'byDomain · handled' },
        role: {
          ru: 'Поля статистики: `byDomain` - число регистраций по домену, `handled` - `id` обработанных событий. Без `handled` повторная доставка посчитала бы регистрацию дважды.',
          en: 'The statistics\' fields: `byDomain` - registrations per domain, `handled` - the `id`s of handled events. Without `handled`, a repeated delivery would count a registration twice.',
        },
      },
      {
        id: 'audit',
        side: 'consumer',
        label: { ru: 'Аудит', en: 'Audit' },
        note: { ru: 'AuditLog', en: 'AuditLog' },
        role: {
          ru: 'Класс `AuditLog`, подписчик, которого подключают кнопкой уже во время работы. Сервис аккаунтов для этого не меняется. Подписчик получает события только с момента подписки: прошлых регистраций в его очереди нет.',
          en: 'The `AuditLog` class, a subscriber connected with a button while the page is running. The accounts service does not change for this. The subscriber gets events only from the moment it subscribes: earlier registrations are not in its queue.',
        },
      },
      {
        id: 'audit-store',
        side: 'store',
        label: { ru: 'Хранилище', en: 'Storage' },
        note: { ru: 'entries · handled', en: 'entries · handled' },
        role: {
          ru: 'Поля аудита: `entries` - время события и адрес, `handled` - `id` обработанных событий.',
          en: 'The audit\'s fields: `entries` - the event time and the address, `handled` - the `id`s of handled events.',
        },
      },
    ],
    connections: [
      { from: 'page', to: 'accounts', label: { ru: 'команда', en: 'command' } },
      { from: 'accounts', to: 'page', label: { ru: 'ответ', en: 'reply' } },
      { from: 'accounts', to: 'accounts-store', label: { ru: 'читает и пишет', en: 'reads and writes' } },
      { from: 'accounts', to: 'broker', label: { ru: 'событие', en: 'event' } },
      { from: 'broker', to: 'welcome', label: { ru: 'копия', en: 'a copy' } },
      { from: 'broker', to: 'stats', label: { ru: 'копия', en: 'a copy' } },
      { from: 'broker', to: 'audit', label: { ru: 'копия с подписки', en: 'a copy, once joined' } },
      { from: 'welcome', to: 'letters-store', label: { ru: 'читает и пишет', en: 'reads and writes' } },
      { from: 'stats', to: 'stats-store', label: { ru: 'читает и пишет', en: 'reads and writes' } },
      { from: 'audit', to: 'audit-store', label: { ru: 'читает и пишет', en: 'reads and writes' } },
    ],
  },

  steps: [
    {
      title: { ru: 'Команда ждёт ответа, событие - нет', en: 'A command waits for a reply, an event does not' },
      explanation: {
        ru: 'Стрелка на схеме - сообщение по направлению движения. Между страницей и аккаунтами их две: команда «зарегистрировать» и ответ на неё, как в клиент-серверной архитектуре. От аккаунтов к брокеру и от брокера к подписчикам стрелки идут только вниз: событию никто не отвечает. Подписчик лишь подтверждает брокеру, что принял событие, и это подтверждение не доходит до аккаунтов. Стрелка «читает и пишет» - вызов внутри своего процесса, без обратной стрелки.',
        en: 'An arrow on the diagram is a message in the direction it travels. Between the page and accounts there are two: the "register" command and its reply, as in client-server architecture. From accounts to the broker and from the broker to the subscribers the arrows only go down: nobody replies to an event. A subscriber merely acknowledges to the broker that it took the event, and that acknowledgement never reaches accounts. The "reads and writes" arrow is a call inside the component\'s own process, with no return arrow.',
      },
    },
    {
      title: { ru: 'Аккаунты публикуют факт', en: 'Accounts publish a fact' },
      explanation: {
        ru: 'Создав аккаунт, сервис аккаунтов публикует событие `UserRegistered`: что произошло, с кем и когда, плюс `id` события. Он не просит «отправь письмо» - это была бы команда. Ответ странице уходит сразу, не дожидаясь подписчиков.',
        en: 'Having created the account, the accounts service publishes the `UserRegistered` event: what happened, to whom, and when, plus the event\'s `id`. It does not ask "send a letter" - that would be a command. The reply to the page goes out at once, without waiting for the subscribers.',
      },
    },
    {
      title: { ru: 'Каждому подписчику своя копия', en: 'Each subscriber gets its own copy' },
      explanation: {
        ru: 'У брокера на каждого подписчика своя очередь - метки на нижнем краю блока. В брокер входит одна стрелка, а выходит столько, сколько подписчиков. Каждый подписчик пишет только в своё хранилище, и о других подписчиках не знает.',
        en: 'The broker keeps a queue per subscriber - the marks on the block\'s bottom edge. One arrow enters the broker, and as many leave it as there are subscribers. Each subscriber writes only to its own storage and knows nothing of the others.',
      },
    },
    {
      title: { ru: 'Подписчик лежит - событие ждёт', en: 'A subscriber is down - the event waits' },
      explanation: {
        ru: 'Если подписчик писем недоступен, регистрация проходит, статистика обновляется, а событие остаётся в очереди писем. Когда подписчик вернётся, брокер доставит его, и письмо уйдёт. Пока этого не случилось, аккаунт уже есть, а письма ещё нет - это итоговая согласованность.',
        en: 'If the letter subscriber is unavailable, the registration goes through, the statistics update, and the event stays in the letters queue. When the subscriber comes back, the broker delivers it and the letter goes out. Until then the account exists but the letter does not yet - this is eventual consistency.',
      },
    },
    {
      title: { ru: 'Повторная доставка - одно письмо', en: 'A repeated delivery - one letter' },
      explanation: {
        ru: 'Если подтверждение потерялось, брокер доставит то же событие ещё раз: доставка «хотя бы один раз» допускает дубликаты. Подписчик помнит `id` обработанных событий и второй раз ничего не делает.',
        en: 'If the acknowledgement is lost, the broker delivers the same event again: "at least once" delivery allows duplicates. The subscriber remembers the `id`s of handled events and does nothing the second time.',
      },
    },
    {
      title: { ru: 'Новый подписчик без правки аккаунтов', en: 'A new subscriber without changing accounts' },
      explanation: {
        ru: 'Аудит подключается подпиской у брокера, сервис аккаунтов при этом не меняется. Но у нового подписчика новая очередь, и прошлых событий в ней нет - поэтому подпись у стрелки «копия с подписки».',
        en: 'The audit is connected by subscribing at the broker, and the accounts service does not change. But a new subscriber has a new queue with no past events in it - hence the arrow\'s label "a copy, once joined".',
      },
    },
  ],

  implementation: {
    javascript: `const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const EMAIL = /^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/;

class Broker {
  constructor() {
    this.queues = new Map();
    this.delayMs = 300;
  }

  subscribe(name, consumer) {
    this.queues.set(name, { consumer, mode: 'up', events: [], busy: false });
  }

  setMode(name, mode) {
    this.queues.get(name).mode = mode;
    this.drain(name);
  }

  publish(event) {
    if (event === null || typeof event !== 'object') {
      throw new TypeError('An event must be an object');
    }
    const wire = JSON.stringify(event);
    for (const [name, queue] of this.queues) {
      queue.events.push({ wire, deliveries: 0 });
      this.drain(name);
    }
  }

  async drain(name) {
    const queue = this.queues.get(name);
    if (queue.busy) return;
    queue.busy = true;
    while (queue.events.length > 0 && queue.mode !== 'down') {
      await wait(this.delayMs);
      if (queue.mode === 'down') break;
      const item = queue.events[0];
      item.deliveries += 1;
      try {
        await queue.consumer.handle(JSON.parse(item.wire));
      } catch {
        setTimeout(() => this.drain(name), 2000);
        break;
      }
      const ackLost = queue.mode === 'no-ack' && item.deliveries === 1;
      if (!ackLost) queue.events.shift();
    }
    queue.busy = false;
  }
}

class AccountsService {
  constructor(broker) {
    this.broker = broker;
    this.emails = new Set();
    this.replies = new Map();
  }

  handle(request) {
    const valid = request?.type === 'register'
      && typeof request.email === 'string'
      && typeof request.requestId === 'string';
    if (!valid) {
      return { ok: false, error: 'Bad request' };
    }
    if (!this.replies.has(request.requestId)) {
      this.replies.set(request.requestId, this.register(request.email));
    }
    return this.replies.get(request.requestId);
  }

  register(rawEmail) {
    const email = rawEmail.trim().toLowerCase();
    if (!EMAIL.test(email)) {
      return { ok: false, error: 'Invalid email' };
    }
    if (this.emails.has(email)) {
      return { ok: false, error: 'Email already registered' };
    }
    this.emails.add(email);
    this.broker.publish({
      id: crypto.randomUUID(),
      type: 'UserRegistered',
      email,
      occurredAt: new Date().toISOString(),
    });
    return { ok: true, email };
  }
}

const isUserRegistered = (event) => event?.type === 'UserRegistered'
  && typeof event.id === 'string'
  && typeof event.email === 'string'
  && typeof event.occurredAt === 'string';

class WelcomeEmails {
  constructor() {
    this.letters = [];
    this.handled = new Set();
  }

  handle(event) {
    if (!isUserRegistered(event) || this.handled.has(event.id)) return;
    this.handled.add(event.id);
    this.letters.push({ to: event.email, subject: 'Welcome!' });
  }
}

class SignupStats {
  constructor() {
    this.byDomain = new Map();
    this.handled = new Set();
  }

  handle(event) {
    if (!isUserRegistered(event) || this.handled.has(event.id)) return;
    this.handled.add(event.id);
    const domain = event.email.split('@')[1];
    this.byDomain.set(domain, (this.byDomain.get(domain) ?? 0) + 1);
  }
}

class AuditLog {
  constructor() {
    this.entries = [];
    this.handled = new Set();
  }

  handle(event) {
    if (!isUserRegistered(event) || this.handled.has(event.id)) return;
    this.handled.add(event.id);
    this.entries.push(event.occurredAt + ' ' + event.email);
  }
}

async function send(service, request) {
  await wait(300);
  const reply = service.handle(JSON.parse(JSON.stringify(request)));
  await wait(300);
  return JSON.parse(JSON.stringify(reply));
}

class RegistrationPage {
  constructor(root, accounts) {
    this.accounts = accounts;
    this.pending = null;
    this.input = root.querySelector('form input');
    this.button = root.querySelector('form button');
    this.message = root.querySelector('.message');
    root.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();
      this.submit();
    });
  }

  async submit() {
    const email = this.input.value.trim();
    if (!EMAIL.test(email)) {
      this.message.textContent = 'Check the address format';
      return;
    }
    if (this.pending?.email !== email) {
      this.pending = { email, requestId: crypto.randomUUID() };
    }
    this.button.disabled = true;
    this.message.textContent = 'Sending...';
    const request = { type: 'register', email, requestId: this.pending.requestId };
    const reply = await send(this.accounts, request);
    this.pending = null;
    this.message.textContent = reply.ok ? 'Registered: ' + reply.email : reply.error;
    if (reply.ok) this.input.value = '';
    this.button.disabled = false;
  }
}

class Monitor {
  constructor(root, broker) {
    this.root = root;
    this.broker = broker;
    this.views = [];
    setInterval(() => this.render(), 250);
  }

  add(name, title, linesOf) {
    const heading = Object.assign(document.createElement('h3'), { textContent: title });
    const select = document.createElement('select');
    for (const mode of ['up', 'down', 'no-ack']) select.add(new Option(mode));
    select.addEventListener('change', () => this.broker.setMode(name, select.value));
    const queued = document.createElement('p');
    const list = document.createElement('ul');
    this.root.append(heading, select, queued, list);
    this.views.push({ name, linesOf, queued, list });
  }

  render() {
    for (const { name, linesOf, queued, list } of this.views) {
      queued.textContent = 'Waiting in queue: ' + this.broker.queues.get(name).events.length;
      list.replaceChildren(...linesOf().map((text) =>
        Object.assign(document.createElement('li'), { textContent: text })));
    }
  }
}

const app = document.querySelector('#app');
app.innerHTML = \`
  <form>
    <input placeholder="you@example.com">
    <button>Register</button>
  </form>
  <p class="message"></p>
  <button class="connect">Connect audit log</button>
  <div class="monitor"></div>\`;

const broker = new Broker();
const accounts = new AccountsService(broker);
const letters = new WelcomeEmails();
const stats = new SignupStats();
broker.subscribe('welcome', letters);
broker.subscribe('stats', stats);

new RegistrationPage(app, accounts);
const monitor = new Monitor(app.querySelector('.monitor'), broker);
monitor.add('welcome', 'Welcome letters', () => letters.letters.map((letter) => letter.to));
monitor.add('stats', 'Sign-ups by domain', () =>
  [...stats.byDomain].map(([domain, count]) => domain + ': ' + count));

app.querySelector('.connect').addEventListener('click', (event) => {
  event.currentTarget.disabled = true;
  const audit = new AuditLog();
  broker.subscribe('audit', audit);
  monitor.add('audit', 'Audit log', () => audit.entries);
}, { once: true });`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1, 2],
        title: { ru: 'Две заготовки', en: 'Two helpers' },
        explanation: {
          ru: '`wait(ms)` - пауза: возвращает промис, который выполнится через `ms` миллисекунд. Ею в примере изображается время, пока сообщение идёт по сети. `EMAIL` - регулярное выражение для проверки адреса: что-то, потом `@`, потом что-то с точкой.',
          en: '`wait(ms)` is a pause: it returns a promise that resolves after `ms` milliseconds. The example uses it to stand for the time a message spends on the network. `EMAIL` is a regular expression for checking an address: something, then `@`, then something with a dot.',
        },
      },
      {
        lines: [4, 8],
        title: { ru: 'Брокер - почтовое отделение', en: 'The broker is a post office' },
        explanation: {
          ru: '`Broker` стоит между тем, кто сообщает о событии, и теми, кому это интересно. Он похож на почтовое отделение: принимает письмо и раскладывает копии по ящикам получателей. В `queues` лежит по одному такому ящику (очереди) на каждого подписчика, `delayMs` - сколько идёт доставка. Настоящий брокер, например Kafka, - отдельная программа на сервере; здесь это объект в той же вкладке, поэтому после перезагрузки страницы всё пропадает, а из консоли можно опубликовать что угодно.',
          en: '`Broker` stands between whoever announces an event and those interested in it. It is like a post office: it takes a letter and puts copies into the recipients\' boxes. `queues` holds one such box (a queue) per subscriber, and `delayMs` is how long delivery takes. A real broker, such as Kafka, is a separate program on a server; here it is an object in the same tab, so reloading the page wipes everything, and anything can be published from the console.',
        },
      },
      {
        lines: [10, 12],
        title: { ru: 'Подписка', en: 'Subscribing' },
        explanation: {
          ru: '`subscribe` заводит подписчику очередь. В ней четыре поля: `consumer` - кому доставлять (объект с методом `handle`), `mode` - режим из выпадающего списка, `events` - события, которые ждут доставки, `busy` - идёт ли доставка прямо сейчас. Про самого подписчика брокер знает только одно: у него есть `handle`.',
          en: '`subscribe` sets up a queue for a subscriber. It has four fields: `consumer` - whom to deliver to (an object with a `handle` method), `mode` - the mode from the drop-down list, `events` - the events waiting for delivery, `busy` - whether a delivery is going on right now. All the broker knows about the subscriber itself is that it has `handle`.',
        },
      },
      {
        lines: [14, 17],
        title: { ru: 'Режимы подписчика', en: 'Subscriber modes' },
        explanation: {
          ru: 'Выпадающий список на странице вызывает `setMode`. Режимов три: `up` - подписчик работает; `down` - подписчик лежит, и события копятся в его очереди; `no-ack` - подписчик работает, но его ответ «принял» теряется (об этом шаг «Потерянное „принял“»). После смены режима брокер сразу пробует доставить накопившееся: так подписчик, вернувшийся из `down`, получает всё, что пропустил.',
          en: 'The drop-down list on the page calls `setMode`. There are three modes: `up` - the subscriber works; `down` - the subscriber is down, and events pile up in its queue; `no-ack` - the subscriber works, but its "got it" answer is lost (see the step "The lost acknowledgement"). After the mode changes, the broker at once tries to deliver what piled up: that way a subscriber back from `down` gets everything it missed.',
        },
      },
      {
        lines: [19, 28],
        title: { ru: 'Публикация: копия в каждый ящик', en: 'Publishing: a copy in every box' },
        explanation: {
          ru: '`publish` получает событие и кладёт его копию в очередь каждого подписчика. Копия - это JSON-строка, так что общего объекта у подписчиков нет, как не было бы и в сети. Потом для каждой очереди запускается доставка, но `publish` её не ждёт и сразу возвращается. Поэтому сервис аккаунтов отвечает странице раньше, чем подписчики что-то узнали. Если вместо события передать `null` или строку, `publish` выбросит ошибку.',
          en: '`publish` takes an event and puts a copy of it into every subscriber\'s queue. The copy is a JSON string, so the subscribers share no object, just as they would not over a network. Then delivery starts for each queue, but `publish` does not wait for it and returns at once. That is why the accounts service replies to the page before the subscribers learn anything. If you pass `null` or a string instead of an event, `publish` throws an error.',
        },
      },
      {
        lines: [30, 38],
        title: { ru: 'Доставка по одному', en: 'Delivery one at a time' },
        explanation: {
          ru: '`drain` доставляет события из одной очереди, пока они там есть. Флажок `busy` не даёт запустить вторую доставку той же очереди одновременно, поэтому события идут строго по одному и в том порядке, в каком их опубликовали. Перед каждой доставкой - пауза 300 мс. Если подписчик в режиме `down`, цикл останавливается, а события остаются ждать. `deliveries` считает, сколько раз это событие уже пытались доставить.',
          en: '`drain` delivers events from one queue for as long as there are any. The `busy` flag keeps a second delivery of the same queue from starting at the same time, so events go strictly one at a time and in the order they were published. Before each delivery there is a 300 ms pause. If the subscriber is in `down` mode, the loop stops and the events stay waiting. `deliveries` counts how many times delivery of this event has been tried.',
        },
      },
      {
        lines: [39, 44],
        title: { ru: 'Если подписчик упал', en: 'If the subscriber crashes' },
        explanation: {
          ru: 'Брокер вызывает `handle` подписчика и ждёт, пока тот закончит. Если `handle` выбросил ошибку, событие не убирается из очереди, и брокер попробует ещё раз через 2 секунды. Так сбой подписчика не теряет событие. Событие, на котором подписчик падает каждый раз, повторялось бы бесконечно; настоящие брокеры после нескольких попыток откладывают такое событие в отдельную очередь (её называют dead letter).',
          en: 'The broker calls the subscriber\'s `handle` and waits for it to finish. If `handle` threw an error, the event is not removed from the queue, and the broker tries again after 2 seconds. That way a subscriber crash does not lose the event. An event the subscriber crashes on every time would repeat forever; real brokers set such an event aside in a separate queue (called a dead letter queue) after a few attempts.',
        },
      },
      {
        lines: [45, 50],
        title: { ru: 'Потерянное «принял»', en: 'The lost acknowledgement' },
        explanation: {
          ru: 'Если `handle` закончился без ошибки, событие убирается из очереди (`shift`) - это и есть подтверждение «принял». В настоящей сети это подтверждение может потеряться, и брокер, не зная, что событие уже обработано, доставит его снова. Режим `no-ack` это изображает: после первой доставки событие остаётся в очереди и приходит второй раз. Поэтому подписчик обязан быть готов к повтору (шаг «Одно письмо на событие»). Когда очередь пуста, флажок `busy` снимается.',
          en: 'If `handle` finished without an error, the event is removed from the queue (`shift`) - that is the "got it" acknowledgement. On a real network this acknowledgement can be lost, and the broker, not knowing the event was already handled, delivers it again. The `no-ack` mode shows this: after the first delivery the event stays in the queue and comes a second time. That is why a subscriber must be ready for a repeat (the step "One letter per event"). When the queue is empty, the `busy` flag is cleared.',
        },
      },
      {
        lines: [52, 57],
        title: { ru: 'Сервис аккаунтов и его данные', en: 'The accounts service and its data' },
        explanation: {
          ru: '`AccountsService` создаёт аккаунты и сообщает об этом. Его данные: `emails` - зарегистрированные адреса, `replies` - уже отправленные ответы. В конструктор он получает только брокер. О письмах, статистике и аудите он не знает ничего.',
          en: '`AccountsService` creates accounts and announces it. Its data: `emails` - the registered addresses, `replies` - replies already sent. Its constructor receives only the broker. It knows nothing about letters, statistics, or the audit.',
        },
      },
      {
        lines: [59, 70],
        title: { ru: 'Команда «зарегистрировать»', en: 'The "register" command' },
        explanation: {
          ru: '`handle` принимает запрос от страницы - это команда, и на неё нужен ответ. Сначала проверяется форма запроса: тип `register`, адрес и ключ - строки. На `null`, массив или `email: 42` ответ `Bad request`. Ключ `requestId` защищает от двойной отправки: регистрация выполняется один раз на ключ, а повторный запрос с тем же ключом получает сохранённый ответ.',
          en: '`handle` takes a request from the page - it is a command, and it needs a reply. First the request\'s shape is checked: type `register`, the address and the key are strings. `null`, an array, or `email: 42` get `Bad request`. The `requestId` key protects against a double submit: registration runs once per key, and a repeated request with the same key gets the saved reply.',
        },
      },
      {
        lines: [72, 79],
        title: { ru: 'Правила регистрации', en: 'The registration rules' },
        explanation: {
          ru: 'Адрес приводится к нижнему регистру, проверяются формат и то, что такого адреса ещё нет. Если правило нарушено, сервис просто отвечает ошибкой и событие не публикует: аккаунт не создан, сообщать подписчикам не о чем.',
          en: 'The address is lower-cased, and the format and the address being new are checked. If a rule is broken, the service just replies with an error and publishes no event: no account was created, so there is nothing to tell the subscribers.',
        },
      },
      {
        lines: [80, 89],
        title: { ru: 'Запись и публикация', en: 'Saving and publishing' },
        explanation: {
          ru: 'Аккаунт записывается в `emails`, и публикуется событие `UserRegistered`: тип в прошедшем времени («пользователь зарегистрирован» - факт, а не просьба), адрес, время и уникальный `id`, по которому подписчики узнают повтор. Здесь запись и публикация - две соседние строки, и между ними ничего не может сломаться. В настоящей системе это запись в базу данных и отправка в брокер: если программа упадёт между ними, аккаунт будет, а события нет, и письмо не придёт никогда. Обычное решение называется **outbox**: событие записывают в ту же базу вместе с аккаунтом, а отдельная программа потом отправляет его в брокер. Она может отправить событие дважды, так что `id` подписчикам нужен всё равно.',
          en: 'The account is saved into `emails`, and the `UserRegistered` event is published: a past-tense type ("user registered" is a fact, not a request), the address, the time, and a unique `id` that lets the subscribers recognise a repeat. Here saving and publishing are two adjacent lines, and nothing can break between them. In a real system they are a database write and a send to the broker: if the program dies between them, the account exists but the event does not, and the letter never comes. The usual fix is called an **outbox**: the event is written to the same database together with the account, and a separate program later sends it to the broker. It may send an event twice, so the subscribers need the `id` anyway.',
        },
      },
      {
        lines: [91, 94],
        title: { ru: 'Подписчик проверяет событие', en: 'A subscriber checks the event' },
        explanation: {
          ru: 'Брокер передаёт всё, что ему опубликовали, в том числе событие, набранное в консоли. Поэтому подписчик сначала проверяет: тип `UserRegistered`, а `id`, адрес и время - строки. Неподходящее событие (массив, пустой объект, `id: 7`) просто пропускается. Если бы подписчик на нём падал, событие повторялось бы вечно (шаг «Если подписчик упал»).',
          en: 'The broker passes on whatever was published to it, including an event typed in the console. So a subscriber first checks: type `UserRegistered`, and the `id`, address, and time are strings. An unsuitable event (an array, an empty object, `id: 7`) is simply skipped. If the subscriber crashed on it, the event would repeat forever (the step "If the subscriber crashes").',
        },
      },
      {
        lines: [96, 107],
        title: { ru: 'Одно письмо на событие', en: 'One letter per event' },
        explanation: {
          ru: 'Первый подписчик отправляет приветственное письмо. В `handled` он запоминает `id` событий, которые уже обработал. Пришло событие с уже знакомым `id` (повторная доставка из шага «Потерянное „принял“») - он ничего не делает, и второго письма не будет. Такого подписчика называют идемпотентным: сколько раз ни доставь событие, результат как от одной доставки.',
          en: 'The first subscriber sends a welcome letter. In `handled` it remembers the `id`s of events it has already handled. If an event with a familiar `id` arrives (a repeated delivery from the step "The lost acknowledgement"), it does nothing, and there is no second letter. Such a subscriber is called idempotent: however many times the event is delivered, the result is as from one delivery.',
        },
      },
      {
        lines: [109, 121],
        title: { ru: 'Второй подписчик - статистика', en: 'The second subscriber - statistics' },
        explanation: {
          ru: 'Тот же факт, другая работа: подсчёт регистраций по домену почты (`example.com: 2`). Свои данные, свой `handled`. Без проверки `id` повторная доставка посчитала бы одну регистрацию дважды.',
          en: 'The same fact, a different job: counting registrations per email domain (`example.com: 2`). Its own data, its own `handled`. Without the `id` check, a repeated delivery would count one registration twice.',
        },
      },
      {
        lines: [123, 134],
        title: { ru: 'Третий подписчик - аудит', en: 'The third subscriber - audit' },
        explanation: {
          ru: 'Журнал аудита записывает время события и адрес. Этот класс сервис аккаунтов нигде не упоминает: аудит подключают позже, кнопкой (шаг «Подписчик на ходу»).',
          en: 'The audit log records the event time and the address. The accounts service never mentions this class: the audit is connected later, with a button (the step "A subscriber on the fly").',
        },
      },
      {
        lines: [136, 141],
        title: { ru: 'send: запрос и ответ', en: 'send: a request and a reply' },
        explanation: {
          ru: 'Так страница разговаривает с сервисом аккаунтов: пауза, вызов `handle` с копией запроса через JSON, ещё пауза и копия ответа. Это обычный запрос с ответом, без сбоев сети - их разбирала тема микросервисов.',
          en: 'This is how the page talks to the accounts service: a pause, a call to `handle` with a JSON copy of the request, another pause, and a copy of the reply. It is a plain request with a reply, with no network failures - the microservices topic covered those.',
        },
      },
      {
        lines: [143, 154],
        title: { ru: 'Страница', en: 'The page' },
        explanation: {
          ru: '`RegistrationPage` находит поле ввода, кнопку и строку для сообщений и слушает отправку формы. `preventDefault()` нужен, чтобы браузер не перезагрузил страницу. Странице дают только сервис аккаунтов: о брокере и подписчиках она не знает.',
          en: '`RegistrationPage` finds the input, the button, and the message line, and listens for the form submit. `preventDefault()` is there so the browser does not reload the page. The page is given only the accounts service: it knows nothing about the broker and the subscribers.',
        },
      },
      {
        lines: [156, 174],
        title: { ru: 'Отправка формы', en: 'Submitting the form' },
        explanation: {
          ru: 'Адрес проверяется сразу, чтобы быстро подсказать про опечатку; настоящая проверка всё равно в сервисе. Ключ `requestId` создаётся для нового адреса и живёт до ответа, поэтому двойная отправка уходит с одним ключом. Пока ждём ответа, кнопка выключена. «Registered» приходит примерно через 600 мс, даже если все подписчики в `down`: письмо и статистика появятся позже.',
          en: 'The address is checked right away to give a quick hint about a typo; the real check is in the service anyway. The `requestId` key is created for a new address and lives until the reply, so a double submit goes out with one key. While we wait for the reply, the button is disabled. "Registered" comes after about 600 ms even if every subscriber is `down`: the letter and the statistics appear later.',
        },
      },
      {
        lines: [176, 202],
        title: { ru: 'Панель наблюдения', en: 'The observation panel' },
        explanation: {
          ru: 'Панель под формой нужна только для наглядности, и на схеме её нет. Для каждого подписчика она показывает выпадающий список режима, число событий в его очереди и содержимое его хранилища и обновляет всё 4 раза в секунду. Она читает данные брокера и подписчиков напрямую - в настоящей системе так нельзя. Текст выводится через `textContent`, поэтому адрес вроде `<b>x</b>@example.com` показывается как текст, а не как разметка.',
          en: 'The panel under the form is there only to make things visible, and it is not on the diagram. For each subscriber it shows the mode drop-down, the number of events in its queue, and what its storage holds, and refreshes it all 4 times a second. It reads the broker\'s and the subscribers\' data directly - a real system would not allow that. Text goes out through `textContent`, so an address such as `<b>x</b>@example.com` shows as text, not as markup.',
        },
      },
      {
        lines: [204, 225],
        title: { ru: 'Сборка', en: 'Assembly' },
        explanation: {
          ru: 'Разметка страницы статичная, без данных пользователя, поэтому `innerHTML` здесь безопасен. Создаются брокер, сервис аккаунтов (ему передают брокер) и два подписчика, которые подписываются у брокера. Сервис аккаунтов в подписке не участвует.',
          en: 'The page markup is static, with no user data, so `innerHTML` is safe here. The broker is created, then the accounts service (it is given the broker) and two subscribers, which subscribe at the broker. The accounts service takes no part in subscribing.',
        },
      },
      {
        lines: [227, 232],
        title: { ru: 'Подписчик на ходу', en: 'A subscriber on the fly' },
        explanation: {
          ru: 'Кнопка «Connect audit log» подписывает аудит прямо во время работы и выключается, чтобы не подписать его дважды. Ни одна строка сервиса аккаунтов при этом не меняется. Аудит получит только регистрации, сделанные после подписки: прошлых событий в его новой очереди нет.',
          en: 'The "Connect audit log" button subscribes the audit while the page is running and then disables itself, so the audit is not subscribed twice. Not one line of the accounts service changes. The audit gets only registrations made after it subscribed: there are no past events in its new queue.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'Слабая связанность: производитель не знает подписчиков, и новую реакцию на событие добавляют подпиской, не меняя его код.',
      en: 'Loose coupling: the producer does not know its subscribers, and a new reaction to an event is added by subscribing, without changing its code.',
    },
    {
      ru: 'Производитель не ждёт: ответ пользователю не зависит от того, живы ли подписчики, а упавший подписчик получит свои события, когда вернётся.',
      en: 'The producer does not wait: the reply to the user does not depend on whether the subscribers are alive, and a subscriber that was down gets its events when it returns.',
    },
    {
      ru: 'Нагрузка сглаживается очередью: всплеск событий копится в брокере, и каждый подписчик разбирает его в своём темпе.',
      en: 'The queue smooths the load: a burst of events piles up in the broker, and each subscriber works through it at its own pace.',
    },
  ],
  cons: [
    {
      ru: 'Дубликаты и порядок: доставка «хотя бы один раз» требует идемпотентных подписчиков, а порядок держится только в пределах одной очереди или партиции.',
      en: 'Duplicates and order: "at least once" delivery requires idempotent subscribers, and order holds only within one queue or partition.',
    },
    {
      ru: 'Итоговая согласованность: какое-то время аккаунт уже есть, а письма и статистики ещё нет, и интерфейс должен это пережить.',
      en: 'Eventual consistency: for a while the account exists but the letter and the statistics do not yet, and the interface has to live with that.',
    },
    {
      ru: 'Трудно проследить поток: у действия нет одного стека вызовов, цепочку реакций видно только по журналам и мониторингу живой системы.',
      en: 'The flow is hard to trace: an action has no single call stack, and the chain of reactions shows only in logs and in monitoring of the live system.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда на одно действие реагируют несколько независимых частей системы, и отправителю не нужен результат их работы, чтобы ответить пользователю.',
      en: 'When several independent parts of the system react to one action, and the sender does not need the result of their work to reply to the user.',
    },
    {
      ru: 'Когда набор реакций часто растёт и меняется, а части системы должны переживать отказы друг друга и работать в своём темпе.',
      en: 'When the set of reactions keeps growing and changing, and the parts of the system must survive each other\'s failures and work at their own pace.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Apache Kafka** - разработан в LinkedIn, код открыт в начале 2011 года, в октябре 2012-го проект вышел из инкубатора Apache. В эссе «The Log» (декабрь 2013) Джей Крепс, один из авторов Kafka, описал идею: собрать все данные организации в центральный журнал, на который системы подписываются в реальном времени. По документации Kafka, по умолчанию она гарантирует доставку «хотя бы один раз», а порядок - внутри одной партиции.',
      en: '**Apache Kafka** - developed at LinkedIn, open-sourced in early 2011, and graduated from the Apache Incubator in October 2012. In the essay "The Log" (December 2013) Jay Kreps, one of Kafka\'s authors, described the idea: put all of an organisation\'s data into a central log that systems subscribe to in real time. Per Kafka\'s documentation, by default it guarantees "at least once" delivery, and order within one partition.',
    },
    {
      ru: '**Amazon SNS и SQS** - документация AWS описывает схему «fanout»: сообщение публикуется в тему SNS, а SNS отправляет его в каждую подписанную очередь SQS для асинхронной обработки. Про стандартные очереди SQS там же сказано: доставка хотя бы один раз, иногда больше одной копии и иногда не по порядку.',
      en: '**Amazon SNS and SQS** - the AWS documentation describes a "fanout": a message is published to an SNS topic, and SNS sends it to every subscribed SQS queue for asynchronous processing. Of standard SQS queues the same documentation says: at-least-once delivery, sometimes more than one copy, and occasionally out of order.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: 'У термина нет одного значения, и это первое, что о нём стоит знать. **Мартин Фаулер** в статье «What do you mean by "Event-Driven"?» (7 февраля 2017), выросшей из встречи коллег в Thoughtworks в конце 2016 года, различает четыре вещи, которые называют этим словом: **уведомление о событии** (event notification), **перенос состояния в событии** (event-carried state transfer), **event sourcing** и **CQRS**. Раньше идею событий как основы распределённых систем развивал **Дэвид Лакхэм** в книге «The Power of Events» (2002) - введении в обработку сложных событий (complex event processing).',
        en: 'The term has no single meaning, and that is the first thing worth knowing about it. **Martin Fowler** in the article "What do you mean by "Event-Driven"?" (7 February 2017), which grew out of a gathering of Thoughtworks colleagues late in 2016, tells apart four things that go by this name: **event notification**, **event-carried state transfer**, **event sourcing**, and **CQRS**. Earlier, the idea of events as the basis of distributed systems was developed by **David Luckham** in "The Power of Events" (2002), an introduction to complex event processing.',
      },
      {
        ru: 'Пример - **уведомление о событии**: по Фаулеру, система сообщает об изменении в своей области и почти не ждёт ответа. Событие здесь несёт адрес, то есть всё, что нужно подписчикам, и спрашивать сервис аккаунтов им не приходится - это уже шаг к переносу состояния в событии. **Event sourcing** идёт дальше: каждое изменение записывается как событие, а текущее состояние восстанавливают, проигрывая журнал. В примере этого нет: аккаунты хранят текущее состояние, `emails`.',
        en: 'The example is **event notification**: per Fowler, a system announces a change in its domain and expects little or no reply. The event here carries the address, that is everything the subscribers need, and they do not have to ask the accounts service - which is already a step towards event-carried state transfer. **Event sourcing** goes further: every change is recorded as an event, and the current state is rebuilt by replaying the log. The example has none of that: accounts store the current state, `emails`.',
      },
      {
        ru: '**Команда и событие** различаются направлением ответственности. Команда «зарегистрируй» обращена к конкретному получателю и ждёт ответа: получилось или нет. Событие `UserRegistered` - факт о прошлом, его нельзя отклонить, и отправитель не знает, кто его прочтёт. Поэтому в примере есть и то и другое: страница отправляет команду и получает ответ, а сервис аккаунтов публикует событие и не ждёт никого. Если событие на деле означает «сделай письмо», а отправитель ждёт, что письмо уйдёт, это команда под чужим именем.',
        en: '**A command and an event** differ in where responsibility lies. The command "register" is addressed to a specific receiver and waits for a reply: did it work or not. The event `UserRegistered` is a fact about the past; it cannot be refused, and the sender does not know who will read it. That is why the example has both: the page sends a command and gets a reply, while the accounts service publishes an event and waits for no one. If an event really means "send the letter" and the sender expects the letter to go out, it is a command under another name.',
      },
      {
        ru: 'Механизм доставки описан в **«Enterprise Integration Patterns»** Грегора Хопа и Бобби Вульфа (2003) как **Publish-Subscribe Channel**: канал доставляет копию события каждому получателю. В примере это брокер с очередью на подписчика, и именно поэтому упавший подписчик ничего не теряет: его копия ждёт. Новый подписчик получает новую очередь, и прошлых событий в ней нет. Брокер с хранимым журналом, как **Kafka**, держит события и после доставки, и новый подписчик может прочитать их с начала.',
        en: 'The delivery mechanism is described in **"Enterprise Integration Patterns"** by Gregor Hohpe and Bobby Woolf (2003) as the **Publish-Subscribe Channel**: the channel delivers a copy of an event to each receiver. In the example this is the broker with a queue per subscriber, and that is exactly why a subscriber that was down loses nothing: its copy waits. A new subscriber gets a new queue, with no past events in it. A broker with a stored log, such as **Kafka**, keeps events after delivery too, and a new subscriber can read them from the start.',
      },
      {
        ru: 'Документация Kafka называет три гарантии доставки: **не больше одного раза** (сообщения могут потеряться, но не повторяются), **хотя бы один раз** (не теряются, но могут повториться) и **ровно один раз**. Производитель, не получивший подтверждения, не знает, записано ли сообщение, и отправляет его снова - отсюда дубликаты. С версии 0.11.0.0 у Kafka есть идемпотентный производитель и транзакции, и «ровно один раз» достижимо при чтении и записи внутри Kafka, но для внешних систем, по той же документации, нужна их помощь. По умолчанию Kafka гарантирует «хотя бы один раз».',
        en: 'Kafka\'s documentation names three delivery guarantees: **at most once** (messages may be lost but are never redelivered), **at least once** (never lost but may be redelivered), and **exactly once**. A producer that got no acknowledgement does not know whether the message was written, and sends it again - hence duplicates. Since version 0.11.0.0 Kafka has an idempotent producer and transactions, and "exactly once" is reachable when reading and writing within Kafka, but for external systems, per the same documentation, their cooperation is needed. By default Kafka guarantees "at least once".',
      },
      {
        ru: 'Поэтому подписчику нужен **идемпотентный получатель** (Idempotent Receiver у Хопа и Вульфа): получатель, который безопасно принимает одно и то же сообщение несколько раз. Способов два: убирать дубликаты на стороне получателя или сделать само сообщение таким, что повтор ничего не меняет. В примере первый: подписчик хранит `id` обработанных событий. Почтовый сервис - внешняя система, и пометку с отправкой нельзя сохранить одной транзакцией: если пометить событие до отправки, сбой между ними потеряет письмо, а если после - даст второе. Это окно можно лишь сделать маленьким.',
        en: 'So a subscriber needs an **idempotent receiver** (Idempotent Receiver in Hohpe and Woolf): a receiver that can safely take the same message several times. There are two ways: remove duplicates on the receiving side, or make the message itself such that a repeat changes nothing. The example uses the first: a subscriber keeps the `id`s of handled events. The mail service is an external system, and the mark and the send cannot be saved in one transaction: mark the event before sending, and a crash in between loses the letter; mark it after, and it produces a second one. That window can only be made small.',
      },
      {
        ru: '**Порядок и согласованность** - следующая цена. В примере очередь доставляет по одному событию, и порядок сохраняется, но если подписчика запустить в нескольких копиях, события пойдут параллельно. Kafka гарантирует порядок внутри партиции, а события с одинаковым ключом, например id пользователя, пишет в одну партицию. Пока события в пути, данные расходятся: аккаунт уже есть, а письма нет - **итоговая согласованность**. Производитель тоже рискует: запись в базу и отправка в брокер - две системы, и между ними процесс может упасть; обычный ответ - **transactional outbox**, событие в той же транзакции, что и данные.',
        en: '**Order and consistency** are the next price. In the example a queue delivers one event at a time and the order holds, but if the subscriber runs in several copies, events go in parallel. Kafka guarantees order within a partition and writes events with the same key, such as a user id, to one partition. While events are in flight, the data disagrees: the account exists, but the letter does not - **eventual consistency**. The producer is at risk too: a database write and a send to the broker are two systems, and the process may die between them; the usual answer is a **transactional outbox**, the event in the same transaction as the data.',
      },
      {
        ru: '**Марк Ричардс и Нил Форд** в главе 14 «Fundamentals of Software Architecture» (2020) разбирают две топологии. **Брокерная** - без центра: компоненты реагируют на события и публикуют новые, как в примере. **С посредником** (mediator) - центральный компонент ведёт многошаговый процесс и рассылает команды по каналам; так проще управлять ошибками, но посредник снова связывает части. Без посредника проследить поток трудно: Фаулер пишет, что такой поток не виден ни в одном тексте программы. В отличие от **микросервисов** из прошлой темы, где аккаунты ждали ответа сервиса писем, здесь у действия нет одного стека вызовов.',
        en: '**Mark Richards and Neal Ford** in chapter 14 of "Fundamentals of Software Architecture" (2020) cover two topologies. The **broker** one has no centre: components react to events and publish new ones, as in the example. The **mediator** one has a central component that runs a multi-step process and sends commands down channels; errors are easier to manage, but the mediator couples the parts again. Without a mediator the flow is hard to trace: Fowler writes that such a flow is not explicit in any program text. Unlike **microservices** in the previous topic, where accounts waited for the email service\'s reply, here an action has no single call stack.',
      },
    ],
    whenToUse: [
      {
        ru: '**Ждать или публиковать** - если отправителю нужен результат, чтобы ответить пользователю (хватает ли денег, свободен ли адрес), нужна команда с ответом. Если результат ему не нужен, как письмо после регистрации, лучше опубликовать событие и не ждать.',
        en: '**Wait or publish** - if the sender needs the result to reply to the user (are there enough funds, is the address free), a command with a reply is needed. If it does not need the result, like the letter after registration, it is better to publish an event and not wait.',
      },
      {
        ru: '**Событие или скрытая команда** - событие называют фактом в прошедшем времени (`UserRegistered`), а не поручением (`SendWelcomeEmail`). Если производителю важно, чтобы конкретный получатель что-то сделал, и он ждёт подтверждения, честнее отправить команду.',
        en: '**An event or a disguised command** - an event is named as a past-tense fact (`UserRegistered`), not as an order (`SendWelcomeEmail`). If the producer cares that a specific receiver does something and waits for confirmation, it is more honest to send a command.',
      },
      {
        ru: '**Брокер или посредник** - пока реакции независимы, хватает брокерной топологии. Когда шаги должны идти в определённом порядке, с откатом при ошибке, удобнее посредник, который ведёт процесс, - ценой того, что он знает все шаги.',
        en: '**Broker or mediator** - while reactions are independent, the broker topology is enough. When steps must run in a set order, with a rollback on error, a mediator that runs the process is more convenient - at the cost of it knowing every step.',
      },
      {
        ru: '**Дубликаты и порядок** - каждый подписчик проектируют так, будто событие придёт дважды. Если порядок важен для одного объекта, события этого объекта направляют в одну очередь или партицию по ключу.',
        en: '**Duplicates and order** - design every subscriber as if each event will arrive twice. If order matters for one object, route that object\'s events to one queue or partition by key.',
      },
      {
        ru: '**Наблюдаемость** - без одного стека вызовов нужны сквозной идентификатор действия в каждом событии, журналы и мониторинг очередей. Растущая очередь - первый признак того, что подписчик лежит или не успевает.',
        en: '**Observability** - with no single call stack you need an end-to-end id of the action in every event, logs, and queue monitoring. A growing queue is the first sign that a subscriber is down or falling behind.',
      },
    ],
    realWorld: [
      {
        ru: '**Martin Fowler, «What do you mean by "Event-Driven"?» (martinfowler.com, 7 февраля 2017)** - четыре значения термина: event notification, event-carried state transfer, event sourcing, CQRS, с плюсами и ловушками каждого.',
        en: '**Martin Fowler, "What do you mean by "Event-Driven"?" (martinfowler.com, 7 February 2017)** - four meanings of the term: event notification, event-carried state transfer, event sourcing, CQRS, with the benefits and traps of each.',
      },
      {
        ru: '**Gregor Hohpe, Bobby Woolf, «Enterprise Integration Patterns» (Addison-Wesley, 2003)** - язык шаблонов обмена сообщениями, среди них Publish-Subscribe Channel (копия события каждому получателю) и Idempotent Receiver (получатель, переживающий повторы).',
        en: '**Gregor Hohpe, Bobby Woolf, "Enterprise Integration Patterns" (Addison-Wesley, 2003)** - a pattern language of messaging, including the Publish-Subscribe Channel (a copy of an event to each receiver) and the Idempotent Receiver (a receiver that survives repeats).',
      },
      {
        ru: '**Mark Richards, Neal Ford, «Fundamentals of Software Architecture» (2020)** - глава 14 «Event-Driven Architecture Style»: брокерная топология и топология с посредником, асинхронность, обработка ошибок, защита от потери данных, запрос-ответ поверх событий.',
        en: '**Mark Richards, Neal Ford, "Fundamentals of Software Architecture" (2020)** - chapter 14 "Event-Driven Architecture Style": the broker and mediator topologies, asynchronous capabilities, error handling, preventing data loss, request-reply over events.',
      },
      {
        ru: '**David Luckham, «The Power of Events» (Addison-Wesley, 2002)** - введение в обработку сложных событий (complex event processing): события, причинность, иерархии и шаблоны событий в распределённых системах предприятия.',
        en: '**David Luckham, "The Power of Events" (Addison-Wesley, 2002)** - an introduction to complex event processing: events, causality, event hierarchies, and event patterns in distributed enterprise systems.',
      },
      {
        ru: '**Документация Apache Kafka, раздел «Message Delivery Semantics»** - определения «не больше одного раза», «хотя бы один раз» и «ровно один раз», идемпотентный производитель и транзакции с версии 0.11.0.0.',
        en: '**The Apache Kafka documentation, "Message Delivery Semantics"** - definitions of at most once, at least once, and exactly once, the idempotent producer and transactions since version 0.11.0.0.',
      },
    ],
  },

  relatedPatterns: ['microservices', 'cqrs'],

  quiz: [
    {
      question: {
        ru: 'Чем событие `UserRegistered` отличается от команды «зарегистрировать»?',
        en: 'How does the `UserRegistered` event differ from the "register" command?',
      },
      options: [
        { ru: 'Событие - это та же команда, только отправленная по сети в формате JSON', en: 'An event is the same command, only sent over the network in JSON format' },
        { ru: 'Событие - факт о прошлом: отправитель не знает получателей и не ждёт ответа', en: 'An event is a past fact: the sender knows no receivers, waits for no reply' },
        { ru: 'Событие всегда адресовано одному получателю, который обязан на него ответить', en: 'An event is always addressed to one receiver, which then has to reply to it' },
        { ru: 'Событие нельзя потерять, поэтому его отправляют без брокера и без очередей', en: 'An event cannot be lost, so it is sent with no broker and with no queues' },
      ],
      correct: 1,
      explanation: {
        ru: 'Команда обращена к конкретному получателю и ждёт ответа «получилось или нет». Событие сообщает, что уже произошло; его получает каждый подписчик, а отправитель не знает, сколько их, и никого не ждёт.',
        en: 'A command is addressed to a specific receiver and waits for a "did it work" reply. An event says what has already happened; every subscriber gets it, and the sender does not know how many there are and waits for no one.',
      },
      hint: {
        ru: 'Смотрите третий абзац раздела «Как это работает».',
        en: 'See the third paragraph of the "How it works" section.',
      },
    },
    {
      question: {
        ru: 'Что делает брокер в примере, когда сервис аккаунтов публикует событие?',
        en: 'What does the broker in the example do when the accounts service publishes an event?',
      },
      options: [
        { ru: 'Отдаёт событие первому свободному подписчику, а остальным не отдаёт', en: 'Hands the event to the first free subscriber and to no one else' },
        { ru: 'Ждёт ответа всех подписчиков и только потом возвращает управление', en: 'Waits for every subscriber to reply and only then returns control' },
        { ru: 'Кладёт копию события в отдельную очередь каждого из подписчиков', en: 'Puts a copy of the event into each subscriber\'s own separate queue' },
        { ru: 'Сохраняет событие в хранилище аккаунтов, откуда его читают все', en: 'Saves the event into the accounts storage, where everyone reads it' },
      ],
      correct: 2,
      explanation: {
        ru: 'У брокера своя очередь на каждого подписчика, и каждая получает копию. `publish` возвращается сразу, а доставка идёт потом, по очереди на подписчика.',
        en: 'The broker keeps a queue per subscriber, and each gets a copy. `publish` returns at once, and delivery happens later, queue by queue.',
      },
      hint: {
        ru: 'Смотрите шаг «Каждому подписчику своя копия» на вкладке «Схема».',
        en: 'See the "Each subscriber gets its own copy" step on the "Diagram" tab.',
      },
    },
    {
      question: {
        ru: 'Подписчик писем в режиме `down`. Что происходит при регистрации нового адреса?',
        en: 'The letter subscriber is in `down` mode. What happens when a new address registers?',
      },
      options: [
        { ru: 'Регистрация отклоняется, потому что приветственное письмо отправить нельзя', en: 'The registration is refused, because the welcome letter cannot be sent' },
        { ru: 'Страница ждёт, пока подписчик писем не вернётся, и кнопка остаётся выключенной', en: 'The page waits until the letter subscriber returns, and the button stays disabled' },
        { ru: 'Событие теряется, и письмо этому адресу уже не уйдёт, даже после восстановления', en: 'The event is lost, and this address never gets a letter, even after recovery' },
        { ru: 'Аккаунт создан, а копия события ждёт в очереди писем и будет доставлена позже', en: 'The account is created; the event\'s copy waits in the letters queue for later' },
      ],
      correct: 3,
      explanation: {
        ru: 'Сервис аккаунтов не ждёт подписчиков, поэтому ответ приходит как обычно. Копия события лежит в очереди писем, а когда подписчик вернётся, брокер её доставит. Статистика тем временем обновилась: у неё своя очередь.',
        en: 'The accounts service does not wait for the subscribers, so the reply comes as usual. The event\'s copy sits in the letters queue, and when the subscriber returns, the broker delivers it. The statistics have updated meanwhile: they have their own queue.',
      },
      hint: {
        ru: 'Смотрите шаг «Подписчик лежит - событие ждёт» на вкладке «Схема».',
        en: 'See the "A subscriber is down - the event waits" step on the "Diagram" tab.',
      },
    },
    {
      question: {
        ru: 'Зачем подписчики хранят `id` обработанных событий в `handled`?',
        en: 'Why do the subscribers keep the `id`s of handled events in `handled`?',
      },
      options: [
        { ru: 'Доставка «хотя бы один раз»: событие может прийти снова, а работу повторять нельзя', en: 'At-least-once delivery: the same event may come again, and the work must not repeat' },
        { ru: 'Чтобы брокер мог удалить событие из очереди, не дожидаясь, пока обработчик закончит', en: 'So the broker can drop the event from the queue without waiting for the handler to end' },
        { ru: 'Чтобы сервис аккаунтов мог спросить подписчика, какие письма уже были отправлены', en: 'So the accounts service can ask the subscriber which letters have already been sent' },
        { ru: 'Чтобы события приходили по порядку: без `handled` брокер перемешал бы всю очередь', en: 'So events arrive in order: without `handled` the broker would shuffle the whole queue' },
      ],
      correct: 0,
      explanation: {
        ru: 'Если подтверждение потерялось (режим `no-ack`), брокер доставит то же событие ещё раз. Подписчик видит знакомый `id` и не отправляет второе письмо и не считает регистрацию дважды. Порядок держит сама очередь, а не `handled`.',
        en: 'If the acknowledgement is lost (`no-ack` mode), the broker delivers the same event again. The subscriber sees a familiar `id` and neither sends a second letter nor counts the registration twice. The order is kept by the queue itself, not by `handled`.',
      },
      hint: {
        ru: 'Смотрите шаг «Одно письмо на событие» на вкладке «Реализация».',
        en: 'See the "One letter per event" step on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Что пришлось изменить в `AccountsService`, чтобы подключить журнал аудита?',
        en: 'What had to change in `AccountsService` to connect the audit log?',
      },
      options: [
        { ru: 'Добавить вызов `audit.handle` сразу после публикации события `UserRegistered`', en: 'Add a call to `audit.handle` right after publishing the `UserRegistered` event' },
        { ru: 'Ничего: аудит подписывается у брокера, а аккаунты о подписчиках не знают', en: 'Nothing: the audit subscribes at the broker, and accounts know no subscribers' },
        { ru: 'Передать журнал аудита в конструктор, рядом с брокером и полем `emails`', en: 'Pass the audit log into the constructor, next to the broker and `emails`' },
        { ru: 'Публиковать для аудита отдельное событие с другим типом и своим `id`', en: 'Publish a separate event for the audit, with another type and its own `id`' },
      ],
      correct: 1,
      explanation: {
        ru: 'Кнопка вызывает `broker.subscribe(\'audit\', audit)` и добавляет аудит в панель наблюдения, а в сервисе аккаунтов не меняется ни строки. Он публикует то же событие, что и раньше, и не знает, сколько у него подписчиков.',
        en: 'The button calls `broker.subscribe(\'audit\', audit)` and adds the audit to the observation panel, while not one line of the accounts service changes. It publishes the same event as before and does not know how many subscribers it has.',
      },
      hint: {
        ru: 'Смотрите шаг «Подписчик на ходу» на вкладке «Реализация».',
        en: 'See the "A subscriber on the fly" step on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Аудит подключили после трёх регистраций, потом прошла ещё одна. Сколько записей будет в журнале аудита?',
        en: 'The audit was connected after three registrations, then one more took place. How many entries will the audit log hold?',
      },
      options: [
        { ru: 'Четыре: брокер сам досылает новому подписчику все прошлые события', en: 'Four: the broker itself sends a new subscriber all of the past events' },
        { ru: 'Ноль: подписчик, подключённый позже, не получает событий вовсе', en: 'Zero: a subscriber connected later gets no events at all, ever' },
        { ru: 'Одна: очередь создаётся при подписке, и прошлых событий в ней нет', en: 'One: the queue is created on subscribing, with no past events in it' },
        { ru: 'Три: аудит видит только события, опубликованные до его подписки', en: 'Three: the audit sees only events published before it subscribed' },
      ],
      correct: 2,
      explanation: {
        ru: 'Брокер кладёт копию только в те очереди, которые уже есть. Перечитать прошлое позволяет брокер с хранимым журналом, как Kafka, - в примере его нет.',
        en: 'The broker puts a copy only into the queues that already exist. A broker with a stored log, like Kafka, would allow rereading the past - the example has none.',
      },
      hint: {
        ru: 'Смотрите четвёртый абзац раздела «Как это работает».',
        en: 'See the fourth paragraph of the "How it works" section.',
      },
    },
    {
      question: {
        ru: 'В настоящей системе процесс аккаунтов упал после записи аккаунта в базу, но до отправки события в брокер. Что получится?',
        en: 'In a real system the accounts process died after writing the account to the database but before sending the event to the broker. What is the result?',
      },
      options: [
        { ru: 'Брокер заметит падение и сам опубликует событие от имени сервиса', en: 'The broker notices the crash and publishes the event for the service' },
        { ru: 'База откатит запись аккаунта, потому что событие так и не было отправлено', en: 'The database rolls back the account, because the event never went out' },
        { ru: 'Подписчики увидят аккаунт сами, прочитав хранилище сервиса аккаунтов', en: 'The subscribers see the account themselves by reading the accounts storage' },
        { ru: 'Аккаунт без события и письма; помогает outbox в той же транзакции', en: 'An account with no event or letter; an outbox in one transaction helps' },
      ],
      correct: 3,
      explanation: {
        ru: 'Запись в базу и отправка в брокер - две разные системы, общей транзакции у них нет. С outbox событие пишут в ту же базу вместе с аккаунтом, а отдельный процесс пересылает его в брокер - иногда дважды, так что подписчикам по-прежнему нужен `id`.',
        en: 'A database write and a send to the broker are two different systems with no shared transaction. With an outbox the event is written to the same database together with the account, and a separate process forwards it to the broker - sometimes twice, so the subscribers still need the `id`.',
      },
      hint: {
        ru: 'Смотрите шаг «Запись и публикация» на вкладке «Реализация».',
        en: 'See the "Saving and publishing" step on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Чем этот пример отличается от примера микросервисов, где тоже были аккаунты и письма?',
        en: 'How does this example differ from the microservices one, which also had accounts and letters?',
      },
      options: [
        { ru: 'Там аккаунты ждали ответа сервиса писем, здесь публикуют факт и не знают подписчиков', en: 'There accounts waited for the email service; here they publish a fact to unknown listeners' },
        { ru: 'Ничем: брокер - это та же сеть из примера микросервисов, только под другим названием', en: 'In no way: the broker is the same network as in the microservices example, under another name' },
        { ru: 'Здесь у всех частей одна общая база данных, а в микросервисах у каждого своё хранилище', en: 'Here all parts share one database, while in microservices each service has its own storage' },
        { ru: 'Там событие доставлялось ровно один раз, а здесь доставка вообще ничем не гарантирована', en: 'There an event was delivered exactly once, while here delivery is not guaranteed at all' },
      ],
      correct: 0,
      explanation: {
        ru: 'В микросервисах сервис аккаунтов был клиентом сервиса писем: запрос, тайм-аут, повтор с ключом. Здесь он публикует `UserRegistered` и сразу отвечает странице, а письма, статистика и аудит - подписчики, о которых он не знает. Своё хранилище у каждой части осталось.',
        en: 'In microservices the accounts service was the email service\'s client: a request, a timeout, a retry with a key. Here it publishes `UserRegistered` and replies to the page at once, while letters, statistics, and audit are subscribers it does not know. Each part still has its own storage.',
      },
      hint: {
        ru: 'Смотрите раздел «Проблема» на вкладке «Суть».',
        en: 'See the "Problem" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Какое утверждение о примере верно, если сверить его с четырьмя значениями «event-driven» по Фаулеру?',
        en: 'Which statement about the example is true when checked against Fowler\'s four meanings of "event-driven"?',
      },
      options: [
        { ru: 'Это event sourcing: каждое событие ведь сохраняется в очереди брокера', en: 'It is event sourcing: every event is stored in the broker\'s queue, after all' },
        { ru: 'Это CQRS: у каждого подписчика своё хранилище, а значит, и своя модель чтения', en: 'It is CQRS: each subscriber has its own storage, so its own read model' },
        { ru: 'Это уведомление о событии, а event sourcing нет: `emails` хранится напрямую', en: 'It is event notification, with no event sourcing: `emails` is stored directly' },
        { ru: 'Это не событийная архитектура: событие несёт адрес, значит, это команда', en: 'It is not event-driven at all: the event carries an address, so it is a command' },
      ],
      correct: 2,
      explanation: {
        ru: 'Аккаунты сообщают о регистрации и не ждут ответа - это уведомление о событии, а адрес в событии - шаг к переносу состояния. Event sourcing сделал бы журнал событий источником истины и восстанавливал бы `emails` проигрыванием; очередь брокера событие после доставки удаляет. Своё хранилище у подписчика - ещё не CQRS, это тема следующего паттерна.',
        en: 'Accounts announce a registration and expect no reply - that is event notification, and the address in the event is a step towards state transfer. Event sourcing would make the event log the source of truth and rebuild `emails` by replaying it; the broker\'s queue deletes an event after delivery. A subscriber\'s own storage is not yet CQRS, which is the next pattern\'s subject.',
      },
      hint: {
        ru: 'Смотрите второй абзац раздела «Как это работает».',
        en: 'See the second paragraph of the "How it works" section.',
      },
    },
    {
      question: {
        ru: 'Подписчика запустили в нескольких копиях, а события одного пользователя должны обрабатываться по порядку. Что для этого предлагает Kafka?',
        en: 'A subscriber runs in several copies, but one user\'s events must be handled in order. What does Kafka offer for this?',
      },
      options: [
        { ru: 'Ничего: Kafka не гарантирует порядок ни для каких событий в топике', en: 'Nothing: Kafka guarantees no order for any events in a topic at all' },
        { ru: 'События с одним ключом идут в одну партицию, а её читают по порядку', en: 'Events with one key go to one partition, which is read in order' },
        { ru: 'Режим «ровно один раз» сам упорядочивает все события во всём топике', en: 'Exactly-once mode itself orders every event across the whole topic' },
        { ru: 'Каждое событие доставляется во все копии подписчика сразу и вместе', en: 'Each event is delivered to all copies of the subscriber at once, together' },
      ],
      correct: 1,
      explanation: {
        ru: 'По документации Kafka, события с одинаковым ключом пишутся в одну партицию, а потребитель читает партицию в том порядке, в каком события записаны. Порядок между разными партициями не гарантируется.',
        en: 'Per Kafka\'s documentation, events with the same key are written to the same partition, and a consumer reads a partition in the order the events were written. Order across different partitions is not guaranteed.',
      },
      hint: {
        ru: 'Смотрите седьмой абзац раздела «Как это работает».',
        en: 'See the seventh paragraph of the "How it works" section.',
      },
    },
  ],
};

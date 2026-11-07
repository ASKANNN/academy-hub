export const cqrs = {
  slug: 'cqrs',
  category: 'distributed',
  name: { ru: 'CQRS', en: 'CQRS' },
  popularity: 2,
  tags: ['distributed', 'events', 'read-model'],

  intent: {
    ru: 'CQRS (Command Query Responsibility Segregation) разводит запись и чтение по двум разным моделям. Модель записи принимает команды, проверяет правила и хранит данные так, чтобы их было удобно защищать. Модель чтения хранит те же данные уже в том виде, в каком их показывает конкретный экран, и отвечает на запросы, ничего не меняя. Между ними ходят события, поэтому модель чтения отстаёт от записи на какое-то время. Это приём для отдельной части системы, где чтение и запись действительно тянут модель в разные стороны, а не архитектура всего приложения.',
    en: 'CQRS (Command Query Responsibility Segregation) splits writing and reading into two different models. The write model takes commands, checks the rules, and stores data in the shape that is easiest to protect. The read model keeps the same data already in the shape a particular screen shows it, and answers queries without changing anything. Events travel between them, so the read model lags behind the writes for a while. It is a technique for one part of a system, where reads and writes really do pull the model in different directions, not an architecture for the whole application.',
  },

  problem: {
    ru: 'В **событийной архитектуре** из прошлой темы сервис аккаунтов хранит адреса ради правил. Когда экрану нужны данные, проще всего спросить их у того же сервиса, и одна модель начинает тянуться в две стороны. Записи нужны правила и защита от противоречий: адрес уникален, формат верен. Экрану нужен список пользователей, счётчики по доменам и последние регистрации - и всё это пришлось бы собирать при каждом запросе из данных, которые хранятся ради правил. Каждый новый экран добавляет в модель ещё один метод для чтения, и модель, которая должна охранять правила, превращается в склад отчётов.',
    en: 'In the **event-driven architecture** of the previous topic the accounts service keeps addresses for the sake of the rules. When a screen needs data, the easiest thing is to ask the same service, and one model starts being pulled two ways. Writing needs rules and protection from contradictions: an address is unique, the format is right. The screen needs a list of users, counts per domain, and the latest registrations - and all of that would have to be assembled on every request from data stored for the sake of the rules. Each new screen adds one more read method to the model, and a model that should guard the rules turns into a warehouse of reports.',
  },

  solution: {
    ru: 'Сторона записи - сервис аккаунтов - принимает **команду** `register`, проверяет правила, пишет адрес в своё **хранилище записи** и публикует событие `UserRegistered` с номером версии. В ответ команда получает только «принято» с версией или отказ, данных для экрана в ответе нет. Сторона чтения - **проектор**: он подписан на события и строит **модель чтения**, уже разложенную под экран. **Запрос** читает только её и ничего не меняет. Модель чтения обновляется позже записи - согласованность **итоговая**, поэтому страница ждёт, пока модель чтения догонит версию из ответа. Хранить само состояние как журнал событий - это **event sourcing**, и CQRS его не требует.',
    en: 'The write side - the accounts service - takes the **command** `register`, checks the rules, writes the address to its **write store**, and publishes a `UserRegistered` event with a version number. In reply the command gets only "accepted" with the version, or a refusal; there is no screen data in the reply. The read side is a **projector**: it subscribes to the events and builds a **read model** already laid out for the screen. A **query** reads only that and changes nothing. The read model updates later than the write - consistency is **eventual**, so the page waits until the read model catches up with the version from the reply. Keeping the state itself as a log of events is **event sourcing**, and CQRS does not require it.',
  },

  diagram: {
    layout: 'cqrs',
    boundary: {
      label: { ru: 'На событие ответа нет', en: 'An event gets no reply' },
      note: { ru: 'у команды и запроса - ответ', en: 'a command and a query get one' },
    },
    zoneLabels: {
      write: { ru: 'Сторона записи', en: 'Write side' },
      read: { ru: 'Сторона чтения', en: 'Read side' },
    },
    nodes: [
      {
        id: 'page',
        label: { ru: 'Страница', en: 'Page' },
        note: { ru: 'RegistrationPage', en: 'RegistrationPage' },
        role: {
          ru: 'Класс `RegistrationPage`: отправляет команду на сторону записи и запрос на сторону чтения - это два разных адресата. После «принято» с версией она запрашивает список, пока модель чтения не догонит эту версию.',
          en: 'The `RegistrationPage` class: sends a command to the write side and a query to the read side - two different addressees. After "accepted" with a version it queries the list until the read model catches up with that version.',
        },
      },
      {
        id: 'commands',
        side: 'write',
        label: { ru: 'Модель записи', en: 'Write model' },
        note: { ru: 'AccountsService', en: 'AccountsService' },
        role: {
          ru: 'Класс `AccountsService`: принимает команду `register`, проверяет формат и уникальность адреса, записывает аккаунт и публикует `UserRegistered`. Отвечает только «принято» с версией или отказом. Методов для экрана у него нет.',
          en: 'The `AccountsService` class: takes the `register` command, checks the address format and uniqueness, saves the account, and publishes `UserRegistered`. It replies only "accepted" with a version, or a refusal. It has no methods for the screen.',
        },
      },
      {
        id: 'write-store',
        side: 'write',
        label: { ru: 'Хранилище', en: 'Storage' },
        note: { ru: 'emails · version', en: 'emails · version' },
        role: {
          ru: 'Поля модели записи: `emails` - адреса для проверки уникальности, `replies` - ответы по `requestId`, `version` - номер последнего изменения. Сторона чтения сюда не заглядывает.',
          en: 'The write model\'s fields: `emails` - addresses for the uniqueness check, `replies` - replies by `requestId`, `version` - the number of the latest change. The read side never looks in here.',
        },
      },
      {
        id: 'broker',
        side: 'broker',
        label: { ru: 'Брокер', en: 'Broker' },
        note: { ru: 'Broker · журнал', en: 'Broker · event log' },
        role: {
          ru: 'Класс `Broker`: хранит все события в журнале `log` и доставляет их каждому подписчику по порядку, начиная с его позиции. Событие из журнала не удаляется, поэтому новый подписчик может прочитать его с начала.',
          en: 'The `Broker` class: keeps every event in the `log` and delivers them to each subscriber in order, starting from its position. An event is never removed from the log, so a new subscriber can read it from the start.',
        },
      },
      {
        id: 'queries',
        side: 'read',
        label: { ru: 'Запросы', en: 'Queries' },
        note: { ru: 'QueryHandler', en: 'QueryHandler' },
        role: {
          ru: 'Класс `QueryHandler`, обработчик запросов: отвечает на запрос `signups-screen` данными из модели чтения и ничего не меняет. О модели записи он не знает, а запрос с типом команды получает `Bad request`.',
          en: 'The `QueryHandler` class, the query handler: answers the `signups-screen` query with data from the read model and changes nothing. It knows nothing of the write model, and a query with a command\'s type gets `Bad request`.',
        },
      },
      {
        id: 'read-store',
        side: 'read',
        label: { ru: 'Модель чтения', en: 'Read model' },
        note: { ru: 'users · byDomain', en: 'users · byDomain' },
        role: {
          ru: 'Поля проектора: `users`, `byDomain`, `latest` и `version`. Данные лежат в том виде, в каком их показывает экран, и повторяют друг друга: один адрес есть и в списке, и в последних. Её можно выбросить и построить заново из журнала.',
          en: 'The projector\'s fields: `users`, `byDomain`, `latest`, and `version`. The data sits in the shape the screen shows it and repeats itself: one address is in both the list and the latest. It can be thrown away and rebuilt from the log.',
        },
      },
      {
        id: 'projector',
        side: 'read',
        label: { ru: 'Проектор', en: 'Projector' },
        note: { ru: 'SignupsProjector', en: 'SignupsProjector' },
        role: {
          ru: 'Класс `SignupsProjector`: получает события от брокера и обновляет модель чтения. Применяет только событие со следующей версией, поэтому повторная доставка ничего не портит. Второй экран в коде (`DailyProjector`) - ещё одна такая же пара проектора и модели чтения, на схеме показана одна.',
          en: 'The `SignupsProjector` class: takes events from the broker and updates the read model. It applies only the event with the next version, so a repeated delivery spoils nothing. The second screen in the code (`DailyProjector`) is one more pair of projector and read model just like this one; the diagram shows one.',
        },
      },
    ],
    connections: [
      { from: 'page', to: 'commands', label: { ru: 'команда', en: 'command' } },
      { from: 'commands', to: 'page', label: { ru: 'принято или отказ', en: 'accepted or refused' } },
      { from: 'commands', to: 'write-store', label: { ru: 'проверяет и пишет', en: 'checks and writes' } },
      { from: 'commands', to: 'broker', label: { ru: 'событие', en: 'event' } },
      { from: 'broker', to: 'projector', label: { ru: 'событие', en: 'event' } },
      { from: 'projector', to: 'read-store', label: { ru: 'обновляет', en: 'updates' } },
      { from: 'queries', to: 'read-store', label: { ru: 'читает', en: 'reads' } },
      { from: 'page', to: 'queries', label: { ru: 'запрос', en: 'query' } },
      { from: 'queries', to: 'page', label: { ru: 'данные экрана', en: 'screen data' } },
    ],
  },

  steps: [
    {
      title: { ru: 'Две пары стрелок и одна без ответа', en: 'Two pairs of arrows and one without a reply' },
      explanation: {
        ru: 'Стрелка на схеме - сообщение или вызов по направлению движения. Команда и её ответ - пара стрелок слева, запрос и его ответ - пара стрелок справа: это сообщения через сеть. Событие идёт одной стрелкой в брокер и одной из брокера к проектору, ответа на него нет. Стрелки «проверяет и пишет», «обновляет» и «читает» - вызовы внутри своего процесса, результат возвращается значением, без обратной стрелки.',
        en: 'An arrow on the diagram is a message or a call in the direction it travels. A command and its reply are the pair of arrows on the left, a query and its reply the pair on the right: these are messages over the network. An event goes as one arrow into the broker and one from the broker to the projector, and it gets no reply. The "checks and writes", "updates", and "reads" arrows are calls inside their own process; the result comes back as a value, with no return arrow.',
      },
    },
    {
      title: { ru: 'Команда меняет, но не показывает', en: 'A command changes, but does not show' },
      explanation: {
        ru: 'Страница отправляет команду `register` на сторону записи. Модель записи проверяет правила и отвечает только «принято» с номером версии или отказом. Списка пользователей в ответе нет: показывать данные - работа стороны чтения.',
        en: 'The page sends the `register` command to the write side. The write model checks the rules and replies only "accepted" with a version number, or a refusal. There is no list of users in the reply: showing data is the read side\'s job.',
      },
    },
    {
      title: { ru: 'Стороны связывает только событие', en: 'Only an event links the sides' },
      explanation: {
        ru: 'Записав адрес, модель записи публикует `UserRegistered`. Брокер кладёт событие в журнал и доставляет его проектору. Других связей между сторонами нет: ни одна стрелка не ведёт со стороны чтения в хранилище записи.',
        en: 'Having saved the address, the write model publishes `UserRegistered`. The broker puts the event into its log and delivers it to the projector. There are no other links between the sides: no arrow leads from the read side into the write store.',
      },
    },
    {
      title: { ru: 'Модель чтения разложена под экран', en: 'The read model is laid out for the screen' },
      explanation: {
        ru: 'Проектор превращает событие в данные экрана: дописывает адрес в список, прибавляет единицу к счётчику домена, обновляет последние три регистрации. Запросу остаётся только отдать готовое. Один адрес хранится в нескольких местах сразу - так модель чтения проще читать, а не защищать.',
        en: 'The projector turns the event into screen data: it appends the address to the list, adds one to the domain\'s counter, and updates the latest three registrations. All a query has left to do is hand over what is ready. One address is stored in several places at once - this makes the read model easy to read rather than to protect.',
      },
    },
    {
      title: { ru: 'Запрос сразу после команды отстаёт', en: 'A query right after a command lags' },
      explanation: {
        ru: 'Событие доходит до проектора позже, чем команда получает ответ. Поэтому запрос сразу после «принято» может не увидеть нового пользователя - модель чтения согласована с записью только в итоге. Страница сравнивает версию модели чтения с версией из ответа команды и, пока та не догнала, пишет «list is still processing».',
        en: 'The event reaches the projector later than the command gets its reply. So a query right after "accepted" may not see the new user - the read model agrees with the writes only eventually. The page compares the read model\'s version with the version from the command\'s reply and, until it has caught up, says "list is still processing".',
      },
    },
    {
      title: { ru: 'Модель чтения можно выбросить', en: 'The read model can be thrown away' },
      explanation: {
        ru: 'Брокер хранит журнал всех событий, поэтому модель чтения - не источник истины, а производные данные. Её можно выбросить и построить заново, проиграв журнал с начала, а новый экран - построить так же, рядом, не трогая сторону записи.',
        en: 'The broker keeps a log of every event, so the read model is not a source of truth but derived data. It can be thrown away and built again by replaying the log from the start, and a new screen can be built the same way, alongside, without touching the write side.',
      },
    },
  ],

  implementation: {
    javascript: `const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const EMAIL = /^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/;

class Broker {
  constructor() {
    this.log = [];
    this.readers = new Map();
    this.delayMs = 1000;
  }

  subscribe(name, consumer) {
    this.readers.set(name, { consumer, position: 0, busy: false });
    this.drain(name);
  }

  publish(event) {
    if (event === null || typeof event !== 'object') {
      throw new TypeError('An event must be an object');
    }
    this.log.push(JSON.stringify(event));
    for (const name of this.readers.keys()) this.drain(name);
  }

  redeliverLast(name) {
    const reader = this.readers.get(name);
    reader.position = Math.max(0, reader.position - 1);
    this.drain(name);
  }

  async drain(name) {
    const reader = this.readers.get(name);
    if (reader.busy) return;
    reader.busy = true;
    while (reader.position < this.log.length) {
      await wait(this.delayMs);
      try {
        reader.consumer.handle(JSON.parse(this.log[reader.position]));
      } catch {
        setTimeout(() => {
          reader.busy = false;
          this.drain(name);
        }, 2000);
        return;
      }
      reader.position += 1;
    }
    reader.busy = false;
  }
}

class AccountsService {
  constructor(broker) {
    this.broker = broker;
    this.emails = new Set();
    this.replies = new Map();
    this.version = 0;
  }

  handle(command) {
    const valid = command?.type === 'register'
      && typeof command.email === 'string'
      && typeof command.requestId === 'string';
    if (!valid) {
      return { ok: false, error: 'Bad request' };
    }
    if (!this.replies.has(command.requestId)) {
      this.replies.set(command.requestId, this.register(command.email));
    }
    return this.replies.get(command.requestId);
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
    this.version += 1;
    this.broker.publish({
      id: crypto.randomUUID(),
      type: 'UserRegistered',
      version: this.version,
      email,
      occurredAt: new Date().toISOString(),
    });
    return { ok: true, version: this.version };
  }
}

const isUserRegistered = (event) => event?.type === 'UserRegistered'
  && typeof event.id === 'string'
  && Number.isInteger(event.version)
  && typeof event.email === 'string'
  && typeof event.occurredAt === 'string';

class SignupsProjector {
  constructor() {
    this.version = 0;
    this.users = [];
    this.byDomain = new Map();
    this.latest = [];
    this.crashing = false;
  }

  handle(event) {
    if (this.crashing) throw new Error('Projector crashed');
    if (!isUserRegistered(event) || event.version !== this.version + 1) return;
    const domain = event.email.split('@')[1];
    this.users.push(event.email);
    this.byDomain.set(domain, (this.byDomain.get(domain) ?? 0) + 1);
    this.latest = [event.email, ...this.latest].slice(0, 3);
    this.version = event.version;
  }

  snapshot() {
    return {
      version: this.version,
      users: this.users,
      byDomain: [...this.byDomain],
      latest: this.latest,
    };
  }
}

class DailyProjector {
  constructor() {
    this.version = 0;
    this.byDay = new Map();
  }

  handle(event) {
    if (!isUserRegistered(event) || event.version !== this.version + 1) return;
    const day = event.occurredAt.slice(0, 10);
    this.byDay.set(day, (this.byDay.get(day) ?? 0) + 1);
    this.version = event.version;
  }

  snapshot() {
    return { version: this.version, byDay: [...this.byDay] };
  }
}

class QueryHandler {
  constructor(type, projector) {
    this.type = type;
    this.projector = projector;
  }

  handle(query) {
    if (query?.type !== this.type) {
      return { ok: false, error: 'Bad request' };
    }
    return { ok: true, ...this.projector.snapshot() };
  }
}

async function send(handler, message) {
  await wait(300);
  const reply = handler.handle(JSON.parse(JSON.stringify(message)));
  await wait(300);
  return JSON.parse(JSON.stringify(reply));
}

function fill(list, lines) {
  list.replaceChildren(...lines.map((text) =>
    Object.assign(document.createElement('li'), { textContent: text })));
}

class RegistrationPage {
  constructor(root, accounts, queries) {
    this.accounts = accounts;
    this.queries = queries;
    this.pending = null;
    this.awaited = 0;
    this.shownVersion = -1;
    this.input = root.querySelector('form input');
    this.button = root.querySelector('form button');
    this.message = root.querySelector('.message');
    this.lists = {
      users: root.querySelector('.users'),
      domains: root.querySelector('.domains'),
      latest: root.querySelector('.latest'),
    };
    root.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();
      this.submit();
    });
    root.querySelector('.refresh').addEventListener('click', () => this.refresh());
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
    const command = { type: 'register', email, requestId: this.pending.requestId };
    const reply = await send(this.accounts, command);
    this.pending = null;
    this.button.disabled = false;
    if (!reply.ok) {
      this.message.textContent = reply.error;
      return;
    }
    this.input.value = '';
    this.awaited = reply.version;
    await this.waitFor(reply.version);
  }

  async waitFor(version) {
    for (let attempt = 0; attempt < 10; attempt += 1) {
      const screen = await this.refresh();
      if (this.awaited !== version) return;
      if (screen.version >= version) {
        this.message.textContent = 'Registered, the list is up to date';
        return;
      }
      this.message.textContent = 'Registered, the list is still processing';
      await wait(500);
    }
    this.message.textContent = 'Registered, the list will catch up later';
  }

  async refresh() {
    const screen = await send(this.queries, { type: 'signups-screen' });
    if (screen.version > this.shownVersion) {
      this.shownVersion = screen.version;
      fill(this.lists.users, screen.users);
      fill(this.lists.domains, screen.byDomain.map(([domain, count]) => domain + ': ' + count));
      fill(this.lists.latest, screen.latest);
    }
    return screen;
  }
}

const app = document.querySelector('#app');
app.innerHTML = \`
  <form>
    <input placeholder="you@example.com">
    <button>Register</button>
  </form>
  <p class="message"></p>
  <button class="refresh">Refresh list</button>
  <h3>Users</h3><ul class="users"></ul>
  <h3>By domain</h3><ul class="domains"></ul>
  <h3>Latest 3</h3><ul class="latest"></ul>
  <button class="add-daily">Add daily screen</button>
  <ul class="daily"></ul>
  <div class="panel">
    <label><input type="checkbox" class="crash"> Projector crashes</label>
    <button class="redeliver">Redeliver last event</button>
    <button class="rebuild">Rebuild read model</button>
    <p class="versions"></p>
  </div>\`;

const broker = new Broker();
const accounts = new AccountsService(broker);
const signupsQueries = new QueryHandler('signups-screen', new SignupsProjector());
broker.subscribe('signups', signupsQueries.projector);
new RegistrationPage(app, accounts, signupsQueries).refresh();

app.querySelector('.add-daily').addEventListener('click', (event) => {
  event.currentTarget.disabled = true;
  const dailyQueries = new QueryHandler('daily-screen', new DailyProjector());
  broker.subscribe('daily', dailyQueries.projector);
  setInterval(async () => {
    const screen = await send(dailyQueries, { type: 'daily-screen' });
    fill(app.querySelector('.daily'), screen.byDay.map(([day, count]) => day + ': ' + count));
  }, 1000);
}, { once: true });

const crash = app.querySelector('.crash');
crash.addEventListener('change', () => {
  signupsQueries.projector.crashing = crash.checked;
});
app.querySelector('.redeliver').addEventListener('click', () => broker.redeliverLast('signups'));
app.querySelector('.rebuild').addEventListener('click', () => {
  const fresh = new SignupsProjector();
  fresh.crashing = crash.checked;
  signupsQueries.projector = fresh;
  broker.subscribe('signups', fresh);
});
setInterval(() => {
  app.querySelector('.versions').textContent = 'Write side: version ' + accounts.version
    + ' · read model: version ' + signupsQueries.projector.version
    + ' · events in the log: ' + broker.log.length;
}, 250);`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1, 2],
        title: { ru: 'Что здесь смоделировано', en: 'What is modelled here' },
        explanation: {
          ru: '`wait(ms)` - пауза: промис, который выполнится через `ms` миллисекунд, ею изображается время в сети. `EMAIL` - регулярное выражение для проверки адреса. Весь пример живёт в одной вкладке: сервисы - объекты, сеть - пауза и копия через JSON, брокер - массив в памяти. После перезагрузки страницы всё пропадает, а из консоли можно вызвать что угодно.',
          en: '`wait(ms)` is a pause: a promise that resolves after `ms` milliseconds, standing for time on the network. `EMAIL` is a regular expression for checking an address. The whole example lives in one tab: services are objects, the network is a pause and a JSON copy, the broker is an array in memory. Reloading the page wipes everything, and anything can be called from the console.',
        },
      },
      {
        lines: [4, 9],
        title: { ru: 'Брокер с журналом', en: 'A broker with a log' },
        explanation: {
          ru: '`Broker` хранит события в журнале `log` и не удаляет их после доставки - в событийной архитектуре очередь удаляла событие, когда подписчик его принял. В `readers` на каждого подписчика записано, до какого места журнала он дочитал. `delayMs` - секунда на доставку: так долго, чтобы отставание модели чтения было видно глазами.',
          en: '`Broker` keeps events in the `log` and does not delete them after delivery - in event-driven architecture the queue deleted an event once the subscriber took it. `readers` records, for each subscriber, how far into the log it has read. `delayMs` is a second per delivery: long enough for the read model\'s lag to be visible to the eye.',
        },
      },
      {
        lines: [11, 14],
        title: { ru: 'Подписка с начала журнала', en: 'Subscribing from the start of the log' },
        explanation: {
          ru: '`subscribe` заводит подписчику позицию `0` - начало журнала - и сразу запускает доставку. Поэтому новый подписчик получает и все прошлые события, а не только будущие - в событийной архитектуре новый подписчик видел только то, что опубликовали после подписки.',
          en: '`subscribe` gives the subscriber position `0` - the start of the log - and starts delivery at once. So a new subscriber gets all the past events too, not only future ones - in event-driven architecture a new subscriber saw only what was published after it subscribed.',
        },
      },
      {
        lines: [16, 22],
        title: { ru: 'Публикация', en: 'Publishing' },
        explanation: {
          ru: '`publish` дописывает событие в журнал JSON-строкой - так у подписчиков нет общего объекта, как не было бы в сети. Потом для каждого подписчика запускается доставка, но `publish` её не ждёт. Если вместо события передать `null` или строку, `publish` выбросит ошибку.',
          en: '`publish` appends the event to the log as a JSON string - so the subscribers share no object, as they would not over a network. Then delivery starts for each subscriber, but `publish` does not wait for it. Pass `null` or a string instead of an event, and `publish` throws an error.',
        },
      },
      {
        lines: [24, 28],
        title: { ru: 'Повторная доставка', en: 'Redelivery' },
        explanation: {
          ru: 'Подписчик, обработав событие, подтверждает брокеру: «принял». В сети это подтверждение может потеряться, и брокер доставит событие ещё раз. `redeliverLast` изображает это: сдвигает позицию подписчика на одно событие назад, и последнее событие приходит снова.',
          en: 'A subscriber that has handled an event acknowledges it to the broker: "got it". On a network this acknowledgement can be lost, and the broker delivers the event again. `redeliverLast` shows this: it moves the subscriber\'s position back by one event, and the last event comes again.',
        },
      },
      {
        lines: [30, 37],
        title: { ru: 'Доставка по порядку', en: 'Delivery in order' },
        explanation: {
          ru: '`drain` доставляет подписчику события, начиная с его позиции, пока не дойдёт до конца журнала. Флажок `busy` не даёт запустить вторую доставку тому же подписчику, поэтому события идут по одному и в порядке журнала. Перед каждым - пауза `delayMs`, потом вызов `handle` подписчика.',
          en: '`drain` delivers events to a subscriber, starting from its position, until it reaches the end of the log. The `busy` flag keeps a second delivery to the same subscriber from starting, so events go one at a time and in log order. Before each one there is a `delayMs` pause, then a call to the subscriber\'s `handle`.',
        },
      },
      {
        lines: [38, 49],
        title: { ru: 'Если подписчик упал', en: 'If the subscriber crashes' },
        explanation: {
          ru: 'Если `handle` выбросил ошибку, позиция не сдвигается, и через 2 секунды брокер пробует то же событие снова. `busy` остаётся включённым до повтора, чтобы новые публикации не запускали вторую цепочку попыток. Обработал без ошибки - позиция сдвигается на следующее событие: это и есть подтверждение.',
          en: 'If `handle` threw an error, the position does not move, and after 2 seconds the broker tries the same event again. `busy` stays on until the retry, so new publications do not start a second chain of attempts. Handled without an error - the position moves to the next event: that is the acknowledgement.',
        },
      },
      {
        lines: [51, 57],
        title: { ru: 'Модель записи', en: 'The write model' },
        explanation: {
          ru: '`AccountsService` - сторона записи. Её хранилище: `emails` - зарегистрированные адреса, `replies` - уже отправленные ответы, `version` - сколько изменений было сделано. Списков для экрана здесь нет: хранится только то, что нужно для проверки правил.',
          en: '`AccountsService` is the write side. Its storage: `emails` - the registered addresses, `replies` - replies already sent, `version` - how many changes have been made. There are no lists for the screen here: it keeps only what the rules need to be checked.',
        },
      },
      {
        lines: [59, 70],
        title: { ru: 'Команда', en: 'The command' },
        explanation: {
          ru: '`handle` принимает команду и сначала проверяет её форму: тип `register`, адрес и ключ - строки. `null`, массив, `email: 42` и запрос `signups-screen` получают `Bad request`: сторона записи не отвечает на запросы. Ключ `requestId` защищает от двойной отправки - регистрация выполняется один раз на ключ, повтор получает сохранённый ответ.',
          en: '`handle` takes a command and first checks its shape: type `register`, the address and the key are strings. `null`, an array, `email: 42`, and a `signups-screen` query get `Bad request`: the write side does not answer queries. The `requestId` key protects against a double submit - registration runs once per key, and a repeat gets the saved reply.',
        },
      },
      {
        lines: [72, 79],
        title: { ru: 'Правила', en: 'The rules' },
        explanation: {
          ru: 'Адрес приводится к нижнему регистру, проверяются формат и то, что такого адреса ещё нет. Правило, которое должно выполняться всегда («один адрес - один аккаунт»), называют инвариантом, и защищать его - главная работа модели записи. Нарушено правило - ответ с ошибкой, событие не публикуется.',
          en: 'The address is lower-cased, and the format and the address being new are checked. A rule that must always hold ("one address - one account") is called an invariant, and protecting it is the write model\'s main job. A rule is broken - the reply is an error, and no event is published.',
        },
      },
      {
        lines: [80, 91],
        title: { ru: 'Запись, версия и событие', en: 'The write, the version, and the event' },
        explanation: {
          ru: 'Адрес записывается в `emails`, версия растёт на единицу, и публикуется `UserRegistered` с `id`, версией, адресом и временем. Команда отвечает только `{ ok: true, version }` - данных для экрана в ответе нет. Здесь запись и публикация - соседние строки; в настоящей системе это база и брокер, и между ними процесс может упасть, как в шаге «Запись и публикация» событийной архитектуры, - отсюда outbox.',
          en: 'The address goes into `emails`, the version grows by one, and `UserRegistered` is published with an `id`, the version, the address, and the time. The command replies only `{ ok: true, version }` - there is no screen data in the reply. Here the write and the publish are adjacent lines; in a real system they are a database and a broker, and the process may die between them, as in the "Saving and publishing" step of event-driven architecture - hence the outbox.',
        },
      },
      {
        lines: [93, 97],
        title: { ru: 'Проверка события', en: 'Checking the event' },
        explanation: {
          ru: 'Брокер передаёт всё, что ему опубликовали, в том числе событие из консоли. Поэтому проекторы сначала проверяют его форму: тип `UserRegistered`, `id`, адрес и время - строки, версия - целое число. Неподходящее событие (`{}`, массив, `id: 7`) просто пропускается.',
          en: 'The broker passes on whatever was published to it, including an event from the console. So the projectors first check its shape: type `UserRegistered`, the `id`, address, and time are strings, the version is an integer. An unsuitable event (`{}`, an array, `id: 7`) is simply skipped.',
        },
      },
      {
        lines: [99, 106],
        title: { ru: 'Модель чтения под экран', en: 'A read model for the screen' },
        explanation: {
          ru: '`SignupsProjector` - проектор: подписчик, который превращает события в модель чтения. Его поля и есть модель чтения экрана: `users` - список адресов, `byDomain` - готовые счётчики по доменам, `latest` - последние три адреса, `version` - до какого события модель дошла. Один адрес лежит и в `users`, и в `latest`: хранить данные повторно, но в готовом для показа виде, называют денормализацией. `crashing` - переключатель для опыта со сбоем.',
          en: '`SignupsProjector` is a projector: a subscriber that turns events into a read model. Its fields are the screen\'s read model: `users` - the list of addresses, `byDomain` - ready counts per domain, `latest` - the last three addresses, `version` - how far into the events the model has got. One address sits in both `users` and `latest`: storing data repeatedly, but in a ready-to-show shape, is called denormalisation. `crashing` is a switch for the crash experiment.',
        },
      },
      {
        lines: [108, 116],
        title: { ru: 'Повтор ничего не портит', en: 'A repeat spoils nothing' },
        explanation: {
          ru: '`handle` применяет событие, только если его версия ровно на единицу больше текущей. Повторно доставленное событие имеет уже пройденную версию и пропускается, поэтому счётчик домена не удвоится. Такого получателя называют идемпотентным: сколько раз ни доставь событие, результат как от одной доставки. Если `crashing` включён, `handle` падает, и брокер повторяет событие (шаг «Если подписчик упал»).',
          en: '`handle` applies an event only if its version is exactly one more than the current one. A redelivered event has a version already passed and is skipped, so the domain counter does not double. Such a receiver is called idempotent: however many times an event is delivered, the result is as from one delivery. If `crashing` is on, `handle` throws, and the broker repeats the event (the step "If the subscriber crashes").',
        },
      },
      {
        lines: [118, 126],
        title: { ru: 'Снимок для ответа', en: 'A snapshot for the reply' },
        explanation: {
          ru: '`snapshot` отдаёт модель чтения как есть, ничего не считая: вся работа сделана заранее, при обработке события. `Map` счётчиков превращается в массив пар, потому что JSON не умеет передавать `Map`.',
          en: '`snapshot` hands the read model over as it is, computing nothing: all the work was done in advance, when the event was handled. The `Map` of counts becomes an array of pairs, because JSON cannot carry a `Map`.',
        },
      },
      {
        lines: [128, 144],
        title: { ru: 'Второй экран - вторая модель чтения', en: 'A second screen - a second read model' },
        explanation: {
          ru: '`DailyProjector` строит другую модель чтения из тех же событий: число регистраций по дням. У неё своя версия и своя проверка повтора. Ни одна строка модели записи ради неё не меняется.',
          en: '`DailyProjector` builds another read model from the same events: registrations per day. It has its own version and its own repeat check. Not one line of the write model changes for it.',
        },
      },
      {
        lines: [146, 158],
        title: { ru: 'Обработчик запросов', en: 'The query handler' },
        explanation: {
          ru: '`QueryHandler` знает только тип запроса и проектор - модель записи ему не передают, поэтому в хранилище записи он заглянуть не может. На запрос своего типа он отвечает снимком модели чтения и ничего не меняет. Команда `register`, `null` и любой чужой тип получают `Bad request`.',
          en: '`QueryHandler` knows only the query type and the projector - it is not given the write model, so it cannot look into the write store. To a query of its type it replies with a snapshot of the read model and changes nothing. The `register` command, `null`, and any other type get `Bad request`.',
        },
      },
      {
        lines: [160, 170],
        title: { ru: 'Сеть и вывод', en: 'The network and the output' },
        explanation: {
          ru: '`send` изображает сеть: пауза, копия сообщения через JSON, вызов `handle`, ещё пауза и копия ответа. Копия означает, что страница не может изменить модель чтения через полученный ответ. `fill` выводит строки списка через `textContent`, поэтому адрес вроде `<b>x</b>@example.com` показывается как текст, а не как разметка.',
          en: '`send` stands for the network: a pause, a JSON copy of the message, a call to `handle`, another pause, and a copy of the reply. The copy means the page cannot change the read model through the reply it got. `fill` writes list lines through `textContent`, so an address such as `<b>x</b>@example.com` shows as text, not as markup.',
        },
      },
      {
        lines: [172, 192],
        title: { ru: 'Страница', en: 'The page' },
        explanation: {
          ru: '`RegistrationPage` получает два адресата: `accounts` для команд и `queries` для запросов. Она находит форму, строку сообщения и три списка, слушает отправку формы (`preventDefault()` - чтобы браузер не перезагрузил страницу) и кнопку «Refresh list». `shownVersion` - версия модели чтения, которая сейчас на экране.',
          en: '`RegistrationPage` gets two addressees: `accounts` for commands and `queries` for queries. It finds the form, the message line, and three lists, and listens for the form submit (`preventDefault()` - so the browser does not reload the page) and the "Refresh list" button. `shownVersion` is the version of the read model currently on screen.',
        },
      },
      {
        lines: [194, 216],
        title: { ru: 'Отправка команды', en: 'Sending the command' },
        explanation: {
          ru: 'Формат проверяется сразу, чтобы быстро подсказать про опечатку; настоящая проверка - в модели записи. Ключ `requestId` живёт до ответа, а кнопка выключена, пока ответ не пришёл, поэтому двойная отправка даёт одну регистрацию. Из ответа страница берёт только версию: список она получит запросом.',
          en: 'The format is checked at once to give a quick hint about a typo; the real check is in the write model. The `requestId` key lives until the reply, and the button is off until the reply arrives, so a double submit gives one registration. From the reply the page takes only the version: it will get the list with a query.',
        },
      },
      {
        lines: [218, 230],
        title: { ru: 'Увидеть свою запись', en: 'Seeing your own write' },
        explanation: {
          ru: 'Пользователь, который только что зарегистрировался, ждёт увидеть себя в списке. Это требование называют read-your-writes - «прочитать свою запись». `waitFor` запрашивает список до 10 раз и сравнивает его версию с версией из ответа команды: догнала - «up to date», нет - «still processing». Если проектор лежит дольше, страница честно пишет, что список догонит позже.',
          en: 'A user who has just registered expects to see themselves in the list. This requirement is called read-your-writes. `waitFor` queries the list up to 10 times and compares its version with the version from the command\'s reply: caught up - "up to date", not yet - "still processing". If the projector is down for longer, the page says honestly that the list will catch up later.',
        },
      },
      {
        lines: [232, 242],
        title: { ru: 'Обновление списка', en: 'Refreshing the list' },
        explanation: {
          ru: '`refresh` отправляет запрос `signups-screen` и перерисовывает списки, только если пришла более новая версия, чем на экране. Так поздний ответ со старыми данными не затирает свежие, а модель чтения, которую строят заново, не показывает полупустой список.',
          en: '`refresh` sends the `signups-screen` query and redraws the lists only if a newer version than the one on screen came back. That way a late reply with old data does not overwrite fresh data, and a read model being rebuilt does not show a half-empty list.',
        },
      },
      {
        lines: [244, 268],
        title: { ru: 'Сборка', en: 'Assembly' },
        explanation: {
          ru: 'Разметка статичная, без данных пользователя, поэтому `innerHTML` здесь безопасен. Создаются брокер, модель записи и обработчик запросов со своим проектором; проектор подписывается у брокера. Страница получает модель записи и обработчик запросов - и больше ничего.',
          en: 'The markup is static, with no user data, so `innerHTML` is safe here. The broker is created, then the write model and the query handler with its projector; the projector subscribes at the broker. The page gets the write model and the query handler - and nothing else.',
        },
      },
      {
        lines: [270, 278],
        title: { ru: 'Новый экран на ходу', en: 'A new screen on the fly' },
        explanation: {
          ru: 'Кнопка «Add daily screen» создаёт второй проектор и обработчик запросов и подписывает проектор у брокера. Он читает журнал с начала (шаг «Подписка с начала журнала»), поэтому сразу видит все прошлые регистрации. Раз в секунду экран запрашивает свою модель чтения; сторона записи об этом экране не знает.',
          en: 'The "Add daily screen" button creates a second projector and query handler and subscribes the projector at the broker. It reads the log from the start (the step "Subscribing from the start of the log"), so it sees every past registration at once. Once a second the screen queries its own read model; the write side does not know this screen exists.',
        },
      },
      {
        lines: [280, 284],
        title: { ru: 'Панель опытов', en: 'The experiment panel' },
        explanation: {
          ru: 'Нижняя панель нужна только для опытов, и на схеме её нет: она дёргает проектор и брокер напрямую, как нельзя в настоящей системе. Флажок «Projector crashes» роняет проектор: регистрации проходят, а модель чтения стоит. Кнопка «Redeliver last event» вызывает `redeliverLast` - список от этого не меняется.',
          en: 'The bottom panel is there only for experiments, and it is not on the diagram: it pokes the projector and the broker directly, which a real system would not allow. The "Projector crashes" checkbox brings the projector down: registrations go through, but the read model stands still. The "Redeliver last event" button calls `redeliverLast` - the list does not change from it.',
        },
      },
      {
        lines: [285, 290],
        title: { ru: 'Перестройка модели чтения', en: 'Rebuilding the read model' },
        explanation: {
          ru: 'Кнопка «Rebuild read model» выбрасывает модель чтения: создаёт пустой проектор, отдаёт его обработчику запросов и подписывает с начала журнала. Проектор проигрывает все события и приходит к той же модели. Без журнала у брокера так сделать нельзя - тогда модель чтения пришлось бы строить из хранилища записи.',
          en: 'The "Rebuild read model" button throws the read model away: it creates an empty projector, hands it to the query handler, and subscribes it from the start of the log. The projector replays every event and arrives at the same model. Without a log at the broker this could not be done - the read model would then have to be built from the write store.',
        },
      },
      {
        lines: [291, 295],
        title: { ru: 'Строка версий', en: 'The versions line' },
        explanation: {
          ru: 'Четыре раза в секунду панель показывает версию стороны записи, версию модели чтения и число событий в журнале, читая их напрямую. Разница первых двух чисел - это и есть отставание модели чтения. В журнале событий может быть больше, чем версий: туда попадают и пропущенные события из консоли.',
          en: 'Four times a second the panel shows the write side\'s version, the read model\'s version, and the number of events in the log, reading them directly. The gap between the first two numbers is the read model\'s lag. The log may hold more events than there are versions: skipped events from the console land there too.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'Каждая модель проще: запись занята правилами и инвариантами, чтение - формой данных под экран, и ни одна не тянет на себе чужие заботы.',
      en: 'Each model is simpler: writing is busy with rules and invariants, reading with the shape of data for the screen, and neither carries the other\'s concerns.',
    },
    {
      ru: 'Запрос ничего не считает: модель чтения разложена заранее, и сторону чтения можно размножить и масштабировать отдельно от записи.',
      en: 'A query computes nothing: the read model is laid out in advance, and the read side can be copied and scaled separately from the writes.',
    },
    {
      ru: 'Новый экран - новая модель чтения из тех же событий, без правки модели записи; при журнале событий её можно выбросить и перестроить.',
      en: 'A new screen is a new read model from the same events, without changing the write model; with an event log it can be thrown away and rebuilt.',
    },
  ],
  cons: [
    {
      ru: 'Больше частей: две модели, события, проектор, брокер - и всё это ради одного экрана, если чтение и запись на деле не расходятся.',
      en: 'More parts: two models, events, a projector, a broker - all for one screen, if reading and writing do not really diverge.',
    },
    {
      ru: 'Итоговая согласованность: сразу после команды запрос может не увидеть изменение, и интерфейсу приходится ждать версию или честно писать «обрабатывается».',
      en: 'Eventual consistency: right after a command a query may not see the change, and the interface has to wait for the version or say honestly "processing".',
    },
    {
      ru: 'Те же риски, что у событий: повторная доставка, сбой проектора, разрыв между записью и публикацией - каждый надо продумать.',
      en: 'The same risks as with events: redelivery, a projector crash, the gap between writing and publishing - each has to be thought through.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда в одной части системы чтение и запись сильно расходятся: запись защищает сложные правила, а экраны хотят те же данные в нескольких разных формах.',
      en: 'When in one part of a system reading and writing diverge sharply: writes protect complex rules, while screens want the same data in several different shapes.',
    },
    {
      ru: 'Когда чтений намного больше, чем записей, и экран может прожить несколько секунд с данными, которые отстают от последней записи.',
      en: 'When there are far more reads than writes, and a screen can live for a few seconds with data that lags behind the latest write.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Microsoft patterns & practices, «CQRS Journey»** (июль 2012, книга «Exploring CQRS and Event Sourcing», предисловие Грега Янга) - команда без опыта CQRS строит на Azure учебную систему управления конференциями Contoso и описывает свои ошибки. В книге есть разборы опыта других команд, среди них Twilio и Lokad Hub.',
      en: '**Microsoft patterns & practices, "CQRS Journey"** (July 2012, the book "Exploring CQRS and Event Sourcing", with a foreword by Greg Young) - a team with no CQRS experience builds the sample Contoso conference management system on Azure and describes its mistakes. The book has case studies from other teams, among them Twilio and Lokad Hub.',
    },
    {
      ru: '**Azure Architecture Center, паттерн CQRS** - пример с товарами: команда `RateProduct` идёт в модель записи, а экран читает отдельную модель `ProductDisplay`. Там же советуют для отдельных хранилищ outbox и идемпотентного получателя модели чтения и предупреждают, что для простых CRUD-задач паттерн не подходит.',
      en: '**Azure Architecture Center, the CQRS pattern** - an example with products: the `RateProduct` command goes to the write model, while the screen reads a separate `ProductDisplay` model. The same page advises an outbox and an idempotent read-model consumer for separate stores, and warns that the pattern does not suit simple CRUD tasks.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: 'Корень паттерна - **разделение команд и запросов** (Command-Query Separation, CQS) **Бертрана Мейера** из книги «Object-Oriented Software Construction» (первое издание - 1988): метод либо меняет состояние и ничего не возвращает, либо возвращает данные и ничего не меняет. **Грег Янг**, которому приписывают сам термин CQRS, пишет в «CQRS Documents» (2010), что сначала CQRS считали просто CQS на более высоком уровне, пока не признали отдельным паттерном. В посте 16 февраля 2010 года он сформулировал разницу так: CQRS - это создание двух объектов там, где раньше был один. CQS делит методы одного объекта, CQRS делит модель и хранилище на две.',
        en: 'The pattern\'s root is **Command-Query Separation** (CQS) by **Bertrand Meyer**, from "Object-Oriented Software Construction" (first edition 1988): a method either changes state and returns nothing, or returns data and changes nothing. **Greg Young**, to whom the term CQRS itself is credited, writes in "CQRS Documents" (2010) that CQRS was at first considered simply CQS at a higher level, until it was recognised as a separate pattern. In a post of 16 February 2010 he put the difference this way: CQRS is the creation of two objects where there was previously only one. CQS splits the methods of one object; CQRS splits the model and the store in two.',
      },
      {
        ru: 'Две модели нужны потому, что у записи и чтения разные заботы. **Модель записи** проверяет правила и защищает **инварианты** - условия, которые не должны нарушаться никогда, как уникальный адрес. Янг пишет, что такой модели удобно хранить данные нормализованно, без повторов, а стороне чтения - денормализованно, чтобы не собирать ответ из многих таблиц. **Уди Даан** в «Clarified CQRS» (9 декабря 2009) доводит это до «одной таблицы на каждое представление», из которой экран читает всё одним запросом. В примере это `users`, `byDomain` и `latest`: готовые данные одного экрана.',
        en: 'Two models are needed because writing and reading have different concerns. The **write model** checks the rules and protects **invariants** - conditions that must never be broken, such as a unique address. Young writes that such a model is best stored normalised, without repeats, and the read side denormalised, so that a reply is not assembled from many tables. **Udi Dahan** in "Clarified CQRS" (9 December 2009) takes this to "one table for each view", which the screen reads in a single query. In the example these are `users`, `byDomain`, and `latest`: one screen\'s ready data.',
      },
      {
        ru: '**Команда** описывает задачу пользователя, а не правку полей: Azure Architecture Center приводит «забронировать номер» вместо «поставить статус Reserved». Даан подчёркивает, что клиент команду **отправляет** конкретному адресату, а не публикует, и что сервер проверяет её сам, не доверяя клиенту. Ответ команды - принято или отказ, в примере ещё версия; данных для экрана в нём нет. **Запрос**, по той же документации Azure, никогда не меняет данные и возвращает готовый к показу объект.',
        en: 'A **command** describes the user\'s task, not an edit of fields: the Azure Architecture Center gives "Book hotel room" instead of "Set ReservationStatus to Reserved". Dahan stresses that the client **sends** a command to a specific addressee rather than publishing it, and that the server checks it itself, without trusting the client. A command\'s reply is accepted or refused, in the example also a version; there is no screen data in it. A **query**, per the same Azure documentation, never alters data and returns an object ready for display.',
      },
      {
        ru: 'Модели связывают **события** из событийной архитектуры: модель записи публикует факт, а проектор обновляет по нему модель чтения - у Даана это обработчик событий на каждую таблицу представления. Отсюда **итоговая согласованность**: какое-то время модель чтения отстаёт. Янг пишет, что большинство систем переносят это на стороне чтения, а на стороне записи с согласованными данными работать гораздо проще. Запись в базу и публикация - две системы, и Azure советует для них **outbox**, а для модели чтения - **идемпотентного получателя**, переживающего повторную доставку.',
        en: '**Events** from event-driven architecture link the models: the write model publishes a fact, and the projector updates the read model from it - in Dahan\'s terms an event handler per view table. Hence **eventual consistency**: for a while the read model lags. Young writes that most systems tolerate this on the read side, while on the write side it is far easier to work with consistent data. Writing to the database and publishing are two systems, and Azure advises an **outbox** for them, and for the read model an **idempotent consumer** that survives redelivery.',
      },
      {
        ru: 'Самая заметная цена - **read-your-writes**, «прочитать свою запись»: пользователь нажал «зарегистрироваться» и не нашёл себя в списке. Azure прямо называет это устаревшими данными и предупреждает, что пользователь может действовать на их основе. Обходы известные: вернуть из команды версию и ждать, пока модель чтения её догонит (как в примере), показать изменение на экране сразу, не дожидаясь модели чтения, или прочитать свою запись со стороны записи. Каждый обход - ещё код, и выбирать его надо под конкретный экран.',
        en: 'The most visible price is **read-your-writes**: the user pressed "register" and did not find themselves in the list. Azure calls this stale data outright and warns that a user may act on it. The workarounds are known: return a version from the command and wait until the read model catches up (as in the example), show the change on screen at once without waiting for the read model, or read your own write from the write side. Each workaround is more code, and it has to be chosen for a particular screen.',
      },
      {
        ru: 'Модель чтения - производные данные, и если события хранятся, её можно **выбросить и перестроить**. В примере брокер держит журнал, как Kafka, и кнопка перестройки проигрывает его с начала в пустой проектор. Так же появляется **новый экран**: ещё один проектор читает тот же журнал, а модель записи не меняется. Если журнала нет, новую модель чтения придётся заполнить из хранилища записи отдельной миграцией.',
        en: 'The read model is derived data, and if the events are stored it can be **thrown away and rebuilt**. In the example the broker keeps a log, like Kafka, and the rebuild button replays it from the start into an empty projector. A **new screen** appears the same way: one more projector reads the same log, and the write model does not change. Without a log, a new read model has to be filled from the write store by a separate migration.',
      },
      {
        ru: '**Event sourcing** - другой приём: состояние хранится как последовательность событий, а текущее получают, проигрывая их по порядку. Его часто применяют вместе с CQRS - Azure описывает связку, где журнал событий и есть модель записи, - но одно не требует другого. Фаулер в «What do you mean by "Event-Driven"?» (2017) пишет, что CQRS можно применять вообще без событий, а Янг в посте 2010 года отдельно говорит, что CQRS - это не event sourcing. В примере модель записи хранит текущее состояние, `emails`, а журнал брокера нужен только стороне чтения.',
        en: '**Event sourcing** is a different technique: state is stored as a sequence of events, and the current state is obtained by replaying them in order. It is often used together with CQRS - Azure describes a pairing where the event log is the write model itself - but neither requires the other. Fowler writes in "What do you mean by "Event-Driven"?" (2017) that CQRS can be used without any events at all, and Young in his 2010 post says separately that CQRS is not event sourcing. In the example the write model stores the current state, `emails`, and the broker\'s log serves only the read side.',
      },
      {
        ru: 'Главное предупреждение - у **Мартина Фаулера** в bliki «CQRS» (14 июля 2011): «for most systems CQRS adds risky complexity», для большинства систем CQRS добавляет рискованную сложность. Там же: применять его стоит только к отдельным частям системы (bounded context в терминах DDD), а не к системе целиком. Янг в 2010 году писал о том же с другой стороны: CQRS - не архитектура, а паттерн, который открывает архитектурные возможности. В отличие от **событийной архитектуры** и **микросервисов**, которые описывают, как устроена система, CQRS - решение для одного её участка.',
        en: 'The main warning comes from **Martin Fowler** in the bliki entry "CQRS" (14 July 2011): "for most systems CQRS adds risky complexity". The same entry says it should be used only on specific portions of a system (a bounded context in DDD terms), not on the system as a whole. Young in 2010 wrote about the same thing from another side: CQRS is not an architecture but a pattern that opens up architectural options. Unlike **event-driven architecture** and **microservices**, which describe how a system is built, CQRS is a decision for one area of it.',
      },
    ],
    whenToUse: [
      {
        ru: '**Одна часть, а не вся система** - CQRS выбирают для участка, где запись охраняет сложные правила, а чтение нужно в нескольких формах. Соседние части, где хватает обычного CRUD (создать, прочитать, изменить, удалить через одну модель), остаются простыми.',
        en: '**One part, not the whole system** - CQRS is chosen for an area where writes guard complex rules and reads are needed in several shapes. Neighbouring parts where plain CRUD (create, read, update, delete through one model) is enough stay simple.',
      },
      {
        ru: '**Совместная работа** - Даан называет главным признаком подходящей системы то, что с одними данными одновременно работают многие пользователи. Для личных данных одного пользователя, по его же словам, обычно лучше простой CRUD.',
        en: '**Collaboration** - Dahan names as the main sign of a fitting system that many users work with the same data at once. For one user\'s private data, in his own words, simple CRUD usually serves better.',
      },
      {
        ru: '**Отставание допустимо** - прежде чем разводить модели, спрашивают, может ли экран показать данные с опозданием в секунды. Если нет - нужна модель чтения в той же транзакции, что и запись, или CQRS здесь не нужен.',
        en: '**Lag is acceptable** - before splitting the models, ask whether the screen can show data seconds late. If not, a read model in the same transaction as the write is needed, or CQRS is not needed here.',
      },
      {
        ru: '**Свою запись - сразу** - для экрана, куда пользователь смотрит после своего действия, заранее решают способ: ждать версию, показать изменение сразу или прочитать его со стороны записи.',
        en: '**Your own write - at once** - for a screen the user looks at after their own action, decide the method in advance: wait for the version, show the change at once, or read it from the write side.',
      },
      {
        ru: '**CQRS без event sourcing** - начинают с двух моделей и событий между ними. Хранить само состояние журналом событий - отдельное решение со своей ценой, и принимать его вместе с CQRS не обязательно.',
        en: '**CQRS without event sourcing** - start with two models and events between them. Storing the state itself as an event log is a separate decision with its own price, and it need not be taken together with CQRS.',
      },
    ],
    realWorld: [
      {
        ru: '**Bertrand Meyer, «Object-Oriented Software Construction» (Prentice Hall, первое издание 1988)** - книга, где сформулировано разделение команд и запросов (CQS) для методов объекта; Фаулер отмечает, что влияние оказало именно первое издание.',
        en: '**Bertrand Meyer, "Object-Oriented Software Construction" (Prentice Hall, first edition 1988)** - the book that formulated Command-Query Separation (CQS) for an object\'s methods; Fowler notes that it was the first edition that had the influence.',
      },
      {
        ru: '**Greg Young, «CQRS Documents» (2010)** - происхождение CQRS из CQS, сторона чтения и сторона записи, нормализованное и денормализованное хранение, task-based UI, события как способ хранения и связка CQRS с event sourcing.',
        en: '**Greg Young, "CQRS Documents" (2010)** - CQRS\'s origin in CQS, the read side and the write side, normalised and denormalised storage, task-based UI, events as a storage mechanism, and pairing CQRS with event sourcing.',
      },
      {
        ru: '**Udi Dahan, «Clarified CQRS» (udidahan.com, 9 декабря 2009)** - команды, которые клиент отправляет, а не публикует, отдельное хранилище для запросов с таблицей на каждое представление, обработчики событий, обновляющие эти таблицы, и совместная работа как главный признак подходящей системы.',
        en: '**Udi Dahan, "Clarified CQRS" (udidahan.com, 9 December 2009)** - commands the client sends rather than publishes, a separate store for queries with a table per view, event handlers updating those tables, and collaboration as the main sign of a fitting system.',
      },
      {
        ru: '**Martin Fowler, «CQRS» (martinfowler.com, bliki, 14 июля 2011)** - определение через раздельные модели, связь с task-based UI и event sourcing, итоговая согласованность и предупреждение применять CQRS только к отдельным частям системы.',
        en: '**Martin Fowler, "CQRS" (martinfowler.com, bliki, 14 July 2011)** - a definition through separate models, the link to task-based UI and event sourcing, eventual consistency, and the warning to apply CQRS only to specific portions of a system.',
      },
      {
        ru: '**Microsoft, Azure Architecture Center, «CQRS pattern»** - одно хранилище с двумя моделями и отдельные хранилища, outbox и идемпотентный получатель, итоговая согласованность, связка с event sourcing и случаи, когда паттерн не подходит.',
        en: '**Microsoft, Azure Architecture Center, "CQRS pattern"** - one store with two models and separate stores, the outbox and the idempotent consumer, eventual consistency, pairing with event sourcing, and the cases where the pattern does not fit.',
      },
    ],
  },

  relatedPatterns: ['event-driven', 'microservices'],

  quiz: [
    {
      question: {
        ru: 'Что модель записи в примере возвращает в ответ на команду `register`?',
        en: 'What does the write model in the example return in reply to the `register` command?',
      },
      options: [
        { ru: 'Полный список пользователей, чтобы страница сразу его перерисовала', en: 'The full list of users, so the page can redraw it right away' },
        { ru: 'Только «принято» с номером версии или отказ с указанием причины', en: 'Only "accepted" with a version number, or a refusal with a reason' },
        { ru: 'Ничего: команда уходит в брокер, а ответа страница не получает', en: 'Nothing: the command goes to the broker, and the page gets no reply' },
        { ru: 'Снимок модели чтения вместе с версией и счётчиками по доменам', en: 'A snapshot of the read model with the version and domain counts' },
      ],
      correct: 1,
      explanation: {
        ru: 'Команда меняет данные, но не показывает их: в ответе `{ ok: true, version }` или ошибка. Список страница получает отдельным запросом со стороны чтения.',
        en: 'A command changes data but does not show it: the reply is `{ ok: true, version }` or an error. The page gets the list with a separate query from the read side.',
      },
      hint: {
        ru: 'Смотрите шаг «Команда меняет, но не показывает» на вкладке «Схема».',
        en: 'See the "A command changes, but does not show" step on the "Diagram" tab.',
      },
    },
    {
      question: {
        ru: 'Откуда `QueryHandler` берёт данные для ответа на запрос?',
        en: 'Where does `QueryHandler` get the data for its reply to a query?',
      },
      options: [
        { ru: 'Из `emails` модели записи, пересчитывая домены при каждом запросе', en: 'From the write model\'s `emails`, recounting domains on every query' },
        { ru: 'Из журнала брокера, проигрывая все события при каждом запросе', en: 'From the broker\'s log, replaying every event on every query' },
        { ru: 'Только из модели чтения своего проектора, через метод `snapshot`', en: 'Only from its own projector\'s read model, through `snapshot`' },
        { ru: 'Из ответа последней команды, который сохранила у себя страница', en: 'From the last command\'s reply, which the page kept for itself' },
      ],
      correct: 2,
      explanation: {
        ru: 'Обработчику запросов передают только проектор, модель записи у него нет. Он отдаёт снимок готовой модели чтения и ничего не считает.',
        en: 'The query handler is given only the projector; it has no write model. It hands over a snapshot of the ready read model and computes nothing.',
      },
      hint: {
        ru: 'Смотрите шаг «Обработчик запросов» на вкладке «Реализация».',
        en: 'See the "The query handler" step on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Что делает проектор `SignupsProjector`?',
        en: 'What does the `SignupsProjector` projector do?',
      },
      options: [
        { ru: 'Проверяет правила регистрации до того, как адрес попадёт в `emails`', en: 'Checks the registration rules before the address gets into `emails`' },
        { ru: 'Получает события брокера и обновляет по ним модель чтения экрана', en: 'Takes the broker\'s events and updates the screen\'s read model' },
        { ru: 'Отвечает на запросы страницы, собирая данные из модели записи', en: 'Answers the page\'s queries from the write model\'s data' },
        { ru: 'Публикует событие `UserRegistered` после каждой удачной команды', en: 'Publishes the `UserRegistered` event after each successful command' },
      ],
      correct: 1,
      explanation: {
        ru: 'Проектор - подписчик брокера на стороне чтения: каждое событие он превращает в изменения `users`, `byDomain` и `latest`. Правила проверяет и событие публикует модель записи.',
        en: 'The projector is a broker subscriber on the read side: it turns each event into changes to `users`, `byDomain`, and `latest`. The write model checks the rules and publishes the event.',
      },
      hint: {
        ru: 'Смотрите шаг «Модель чтения под экран» на вкладке «Реализация».',
        en: 'See the "A read model for the screen" step on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Страница получила «принято» с версией 5 и сразу запросила список, но нового адреса там нет. Почему?',
        en: 'The page got "accepted" with version 5 and queried the list at once, but the new address is not there. Why?',
      },
      options: [
        { ru: 'Команда на деле не выполнилась, и её нужно отправить ещё раз', en: 'The command did not really run, and it has to be sent again' },
        { ru: 'Обработчик запросов кэширует ответы и отдаёт самый первый ответ', en: 'The query handler caches replies and hands out the very first one' },
        { ru: 'Модель чтения ещё не получила событие: согласованность итоговая', en: 'The read model has not got the event yet: consistency is eventual' },
        { ru: 'Брокер потерял событие, и проектор уже никогда его не получит', en: 'The broker lost the event, and the projector will never get it' },
      ],
      correct: 2,
      explanation: {
        ru: 'Событие доходит до проектора позже, чем команда получает ответ. Поэтому страница сравнивает версию модели чтения с версией 5 и, пока та не догнала, пишет «still processing».',
        en: 'The event reaches the projector later than the command gets its reply. So the page compares the read model\'s version with version 5 and, until it catches up, says "still processing".',
      },
      hint: {
        ru: 'Смотрите шаг «Запрос сразу после команды отстаёт» на вкладке «Схема».',
        en: 'See the "A query right after a command lags" step on the "Diagram" tab.',
      },
    },
    {
      question: {
        ru: 'Брокер доставил проектору событие с версией 3 второй раз, когда модель чтения уже на версии 3. Что произойдёт?',
        en: 'The broker delivered the event with version 3 to the projector a second time, when the read model is already at version 3. What happens?',
      },
      options: [
        { ru: 'Счётчик домена вырастет ещё раз, а адрес попадёт в список дважды', en: 'The domain counter grows again, and the address lands in the list twice' },
        { ru: 'Проектор выбросит ошибку, и брокер будет повторять событие вечно', en: 'The projector throws an error, and the broker repeats the event forever' },
        { ru: 'Проектор пропустит событие: применяется только следующая версия', en: 'The projector skips the event: only the next version is applied' },
        { ru: 'Модель чтения сбросится на ноль и начнёт строиться заново', en: 'The read model resets to zero and starts being built again' },
      ],
      correct: 2,
      explanation: {
        ru: '`handle` применяет событие, только если его версия ровно на единицу больше текущей. Версия 3 уже пройдена, поэтому модель не меняется - проектор идемпотентен.',
        en: '`handle` applies an event only if its version is exactly one more than the current one. Version 3 is already passed, so the model does not change - the projector is idempotent.',
      },
      hint: {
        ru: 'Смотрите шаг «Повтор ничего не портит» на вкладке «Реализация».',
        en: 'See the "A repeat spoils nothing" step on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Зачем проектор хранит `byDomain` и `latest`, если их можно посчитать из `users`?',
        en: 'Why does the projector keep `byDomain` and `latest` if they can be computed from `users`?',
      },
      options: [
        { ru: 'Без них модель записи не смогла бы проверить уникальность адреса', en: 'Without them the write model could not check that an address is unique' },
        { ru: 'Модель чтения разложена под экран, запрос сам ничего не считает', en: 'The read model is laid out for the screen; a query computes nothing' },
        { ru: 'Так брокер понимает, какому подписчику какое событие доставлять', en: 'This tells the broker which event to deliver to which subscriber' },
        { ru: 'Иначе при перестройке из журнала часть регистраций потерялась бы', en: 'Otherwise some registrations would be lost on a rebuild from the log' },
      ],
      correct: 1,
      explanation: {
        ru: 'Это денормализация: данные хранятся повторно, но в готовом для показа виде. Вся работа сделана при обработке события, а `snapshot` отдаёт модель как есть.',
        en: 'This is denormalisation: data is stored repeatedly, but in a ready-to-show shape. All the work is done when the event is handled, and `snapshot` hands the model over as it is.',
      },
      hint: {
        ru: 'Смотрите шаг «Модель чтения разложена под экран» на вкладке «Схема».',
        en: 'See the "The read model is laid out for the screen" step on the "Diagram" tab.',
      },
    },
    {
      question: {
        ru: 'Понадобился экран «регистрации по дням». Что пришлось сделать в примере?',
        en: 'A "registrations per day" screen was needed. What had to be done in the example?',
      },
      options: [
        { ru: 'Добавить в `AccountsService` метод, который считает регистрации по дням', en: 'Add a method to `AccountsService` that counts days' },
        { ru: 'Публиковать для нового экрана отдельное событие с датой регистрации', en: 'Publish a separate event with the registration date for the new screen' },
        { ru: 'Добавить проектор и обработчик запросов, не трогая сторону записи', en: 'Add a projector and a query handler, not touching the write side' },
        { ru: 'Хранить в `emails` дату рядом с адресом и отдавать её запросом', en: 'Store a date next to the address in `emails` and return it on a query' },
      ],
      correct: 2,
      explanation: {
        ru: '`DailyProjector` строит свою модель чтения из тех же событий `UserRegistered`, а новый `QueryHandler` отвечает из неё. Проектор читает журнал с начала, поэтому сразу видит прошлые регистрации.',
        en: '`DailyProjector` builds its own read model from the same `UserRegistered` events, and a new `QueryHandler` answers from it. The projector reads the log from the start, so it sees past registrations at once.',
      },
      hint: {
        ru: 'Смотрите шаг «Новый экран на ходу» на вкладке «Реализация».',
        en: 'See the "A new screen on the fly" step on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Чем CQRS отличается от разделения команд и запросов (CQS) Бертрана Мейера?',
        en: 'How does CQRS differ from Bertrand Meyer\'s Command-Query Separation (CQS)?',
      },
      options: [
        { ru: 'CQS делит методы одного объекта, а CQRS - и модель, и хранилище на две', en: 'CQS splits one object\'s methods, while CQRS splits the model and store in two' },
        { ru: 'Ничем: CQRS - новое название CQS, которое появилось вместе с микросервисами', en: 'In no way: CQRS is a new name for CQS that arrived together with microservices' },
        { ru: 'CQS разрешает команде возвращать данные, а CQRS запрещает это строго', en: 'CQS allows a command to return data, while CQRS strictly forbids it' },
        { ru: 'CQS требует событий между методами, а CQRS обходится без всяких событий', en: 'CQS requires events between methods, while CQRS does without any events' },
      ],
      correct: 0,
      explanation: {
        ru: 'У Мейера метод либо меняет состояние, либо возвращает данные - внутри одного объекта. Янг описывает CQRS как два объекта там, где был один: у записи и чтения свои модели и свои хранилища.',
        en: 'In Meyer\'s terms a method either changes state or returns data - inside one object. Young describes CQRS as two objects where there was one: writing and reading get their own models and their own stores.',
      },
      hint: {
        ru: 'Смотрите первый абзац раздела «Как это работает».',
        en: 'See the first paragraph of the "How it works" section.',
      },
    },
    {
      question: {
        ru: 'Брокер в примере хранит журнал всех событий. Значит ли это, что пример использует event sourcing?',
        en: 'The broker in the example keeps a log of every event. Does that mean the example uses event sourcing?',
      },
      options: [
        { ru: 'Да: любой журнал событий у брокера и есть event sourcing по определению', en: 'Yes: any event log kept at a broker is event sourcing by definition' },
        { ru: 'Да: без event sourcing CQRS невозможен, поэтому журнал в примере обязателен', en: 'Yes: CQRS is impossible without event sourcing, so the log is required' },
        { ru: 'Нет: модель записи хранит `emails`, а журнал нужен только стороне чтения', en: 'No: the write model stores `emails`; the log serves only the read side' },
        { ru: 'Нет: event sourcing - это когда модель чтения хранится в браузере', en: 'No: event sourcing is when the read model is stored in the browser' },
      ],
      correct: 2,
      explanation: {
        ru: 'При event sourcing журнал событий - источник истины для модели записи, и её состояние получают проигрыванием. Здесь модель записи хранит текущее состояние, а журнал позволяет перестраивать модели чтения. CQRS и event sourcing часто идут вместе, но одно не требует другого.',
        en: 'With event sourcing the event log is the write model\'s source of truth, and its state is obtained by replaying. Here the write model stores the current state, and the log lets the read models be rebuilt. CQRS and event sourcing often go together, but neither requires the other.',
      },
      hint: {
        ru: 'Смотрите седьмой абзац раздела «Как это работает».',
        en: 'See the seventh paragraph of the "How it works" section.',
      },
    },
    {
      question: {
        ru: 'Команда хочет перевести всё приложение на CQRS. Что об этом пишет Мартин Фаулер?',
        en: 'A team wants to move the whole application to CQRS. What does Martin Fowler write about this?',
      },
      options: [
        { ru: 'Что CQRS стоит применять сразу ко всей системе, иначе он не окупится', en: 'That CQRS should be applied to the whole system at once, or it will not pay off' },
        { ru: 'Что CQRS безопасен везде, если хранить всё состояние журналом событий', en: 'That CQRS is safe anywhere as long as state is kept as an event log' },
        { ru: 'Что CQRS нужен только для систем, где чтений меньше, чем записей', en: 'That CQRS is needed only in systems with fewer reads than writes' },
        { ru: 'Что для большинства систем это рискованная сложность, лишь для частей', en: 'That for most systems it is risky complexity, and only for some parts' },
      ],
      correct: 3,
      explanation: {
        ru: 'В bliki «CQRS» (2011) Фаулер пишет, что для большинства систем CQRS добавляет рискованную сложность, и советует применять его только к отдельным частям системы - bounded context, - а не к системе целиком.',
        en: 'In the bliki entry "CQRS" (2011) Fowler writes that for most systems CQRS adds risky complexity, and advises applying it only to specific portions of a system - a bounded context - not to the system as a whole.',
      },
      hint: {
        ru: 'Смотрите восьмой абзац раздела «Как это работает».',
        en: 'See the eighth paragraph of the "How it works" section.',
      },
    },
  ],
};

export const microservices = {
  slug: 'microservices',
  category: 'distributed',
  name: { ru: 'Микросервисная архитектура', en: 'Microservices Architecture' },
  popularity: 3,
  tags: ['distributed', 'services', 'network'],

  intent: {
    ru: 'Микросервисная архитектура (Microservices Architecture) строит одно приложение как набор небольших сервисов: каждый работает в своём процессе, развёртывается независимо от остальных и сам владеет своими данными. Систему режут по бизнес-возможностям - учётные записи, письма, оплата, - а не по техническим слоям, и сервисы общаются только по сети через API. Общей базы данных нет: чужие данные можно получить, только спросив их владельца. За независимость платят распределённостью: любой вызов может опоздать или потеряться, а согласованность приходится держать без общей транзакции.',
    en: 'Microservices Architecture builds one application as a set of small services: each runs in its own process, is deployed independently of the others, and owns its own data. The system is split by business capability - accounts, email, payments - rather than by technical layer, and the services talk only over the network through APIs. There is no shared database: another service\'s data can only be had by asking its owner. Independence is paid for with distribution: any call may arrive late or get lost, and consistency has to be kept without a shared transaction.',
  },

  problem: {
    ru: '**Монолит**, например слоистое приложение, работает в одном процессе и выходит одним развёртыванием. Пока команда маленькая, это удобно. Когда над системой работают десятки людей, правка в рассылке писем требует пересобрать и выкатить всё приложение, релизы ждут друг друга, а ошибка в одном модуле роняет процесс целиком. Масштабировать можно только всё сразу, даже если нагрузка приходится на одну функцию. Если команды поделены по слоям (интерфейс, логика, база), простая правка становится проектом сразу для трёх команд. **Клиент-сервер** этого не решает: он отделяет клиента от сервера, но сервер остаётся одной большой программой.',
    en: 'A **monolith**, such as a layered application, runs in one process and ships as one deployment. While the team is small, that is convenient. When dozens of people work on the system, a change to the email sender means rebuilding and rolling out the whole application, releases wait for each other, and a bug in one module brings down the whole process. Scaling is all or nothing, even when the load falls on one feature. If the teams are split by layer (interface, logic, database), a simple change becomes a project for three teams at once. **Client-server** does not solve this: it separates the client from the server, but the server stays one big program.',
  },

  solution: {
    ru: 'Систему делят на **сервисы по бизнес-возможностям**: в примере это сервис аккаунтов и сервис приветственных писем. У каждого свой процесс, свой цикл выпуска и **своё хранилище**, в которое не заглядывает никто другой. Сервисы общаются сообщениями через **API** по сети, и сервис сам становится клиентом другого сервиса, когда ему нужна чужая работа. Так как сеть ненадёжна, на каждом вызове стоит **тайм-аут**, а повтор идёт с **ключом идемпотентности**, чтобы не сделать работу дважды. Заранее решают, что делать, когда сосед недоступен: в примере аккаунт создаётся, а письмо ждёт повтора. Как заменить такие ожидания событиями, разбирает следующая тема, **событийная архитектура** (Event-Driven), а раздельные модели чтения и записи - тема **CQRS**.',
    en: 'The system is divided into **services by business capability**: in the example, an accounts service and a welcome email service. Each has its own process, its own release cycle, and **its own storage**, which no one else looks into. The services talk in messages through **APIs** over the network, and a service itself becomes a client of another service when it needs that service\'s work. Since the network is unreliable, every call has a **timeout**, and a retry carries an **idempotency key** so the work is not done twice. What to do when a neighbour is unavailable is decided in advance: in the example the account is created, and the letter waits for a retry. Replacing such waits with events is the subject of the next topic, **Event-Driven Architecture**, and separate read and write models are the subject of **CQRS**.',
  },

  diagram: {
    layout: 'microservices',
    boundary: {
      label: { ru: 'Рамка - отдельный сервис', en: 'Frame - a separate service' },
      note: { ru: 'наружу только JSON по сети', en: 'only JSON leaves it, by network' },
    },
    zoneLabel: { ru: 'свой процесс · свои данные', en: 'own process · own data' },
    nodes: [
      {
        id: 'page',
        label: { ru: 'Страница', en: 'Page' },
        note: { ru: 'RegistrationPage', en: 'RegistrationPage' },
        role: {
          ru: 'Класс `RegistrationPage`: точка входа. Отправляет регистрацию сервису аккаунтов и спрашивает каждый сервис о его списке. О сервисах знает только имена и формат запросов. В большой системе на этом месте часто стоит API-шлюз (API gateway), который принимает запросы клиентов и раздаёт их сервисам.',
          en: 'The `RegistrationPage` class: the entry point. It sends the registration to the accounts service and asks each service for its list. All it knows of the services is their names and the request format. In a large system this place is often taken by an API gateway, which takes client requests and hands them out to the services.',
        },
      },
      {
        id: 'accounts',
        side: 'service',
        label: { ru: 'Аккаунты', en: 'Accounts' },
        note: { ru: 'AccountsService', en: 'AccountsService' },
        role: {
          ru: 'Класс `AccountsService`: проверяет запрос, формат и уникальность адреса, создаёт аккаунт и просит сервис писем отправить приветствие. В разговоре со страницей он сервер, а в разговоре с сервисом писем - клиент. Если письмо не ушло, аккаунт всё равно остаётся, а адрес попадает в список отложенных.',
          en: 'The `AccountsService` class: checks the request, the address format, and uniqueness, creates the account, and asks the email service to send a welcome. Talking to the page it is a server, and talking to the email service it is a client. If the letter does not go out, the account stays anyway, and the address goes onto the pending list.',
        },
      },
      {
        id: 'accounts-store',
        side: 'store',
        label: { ru: 'Хранилище', en: 'Storage' },
        note: { ru: 'emails · replies', en: 'emails · replies' },
        role: {
          ru: 'Поля сервиса аккаунтов: `emails` - адреса, `replies` - ответы по `requestId`, `pendingWelcome` - адреса, которым письмо ещё не ушло. Сервис обращается к ним обычным вызовом внутри своего процесса. Никакой другой сервис эти поля не читает.',
          en: 'The accounts service\'s fields: `emails` - the addresses, `replies` - replies by `requestId`, `pendingWelcome` - addresses whose letter has not gone out yet. The service reaches them with a plain call inside its own process. No other service reads these fields.',
        },
      },
      {
        id: 'welcome',
        side: 'service',
        label: { ru: 'Приветствия', en: 'Welcome' },
        note: { ru: 'WelcomeService', en: 'WelcomeService' },
        role: {
          ru: 'Класс `WelcomeService`: отправляет одно приветственное письмо на ключ. Об аккаунтах не знает ничего: адрес ему присылают в запросе. Повтор с тем же ключом получает сохранённый ответ, и второе письмо не уходит.',
          en: 'The `WelcomeService` class: sends one welcome letter per key. It knows nothing about accounts: the address arrives in the request. A retry with the same key gets the saved reply, and no second letter goes out.',
        },
      },
      {
        id: 'letters-store',
        side: 'store',
        label: { ru: 'Хранилище', en: 'Storage' },
        note: { ru: 'letters · replies', en: 'letters · replies' },
        role: {
          ru: 'Поля сервиса писем: `letters` - отправленные письма, `replies` - ответы по ключу. Это его собственные данные: сервис аккаунтов не может в них заглянуть и узнаёт о письме только из ответа.',
          en: 'The email service\'s fields: `letters` - the letters sent, `replies` - replies by key. This is its own data: the accounts service cannot look into it and learns about a letter only from the reply.',
        },
      },
    ],
    connections: [
      { from: 'page', to: 'accounts', label: { ru: 'запрос', en: 'request' } },
      { from: 'accounts', to: 'page', label: { ru: 'ответ', en: 'reply' } },
      { from: 'page', to: 'welcome', label: { ru: 'запрос', en: 'request' } },
      { from: 'welcome', to: 'page', label: { ru: 'ответ', en: 'reply' } },
      { from: 'accounts', to: 'welcome', label: { ru: 'письмо', en: 'letter' } },
      { from: 'welcome', to: 'accounts', label: { ru: 'ответ', en: 'reply' } },
      { from: 'accounts', to: 'accounts-store', label: { ru: 'читает и пишет', en: 'reads and writes' } },
      { from: 'welcome', to: 'letters-store', label: { ru: 'читает и пишет', en: 'reads and writes' } },
    ],
  },

  steps: [
    {
      title: { ru: 'Рамка - это сервис', en: 'A frame is a service' },
      explanation: {
        ru: 'Каждая пунктирная рамка - отдельный сервис: свой процесс и свои данные. Стрелка, которая выходит из рамки, - сообщение по сети, поэтому запрос и ответ нарисованы отдельно, как в клиент-серверной архитектуре: ответ может опоздать или потеряться. Стрелка «читает и пишет» остаётся внутри рамки - это обычный вызов в процессе сервиса, результат возвращается значением, и обратной стрелки нет.',
        en: 'Each dashed frame is a separate service: its own process and its own data. An arrow that leaves a frame is a network message, so the request and the reply are drawn separately, as in client-server architecture: a reply can come late or get lost. The "reads and writes" arrow stays inside the frame - it is a plain call in the service\'s process, the result comes back as a value, and there is no return arrow.',
      },
    },
    {
      title: { ru: 'Страница - точка входа', en: 'The page is the entry point' },
      explanation: {
        ru: 'Страница отправляет регистрацию сервису аккаунтов, а за списками ходит в оба сервиса. Классов сервисов она не знает - только их имена и формат запросов. В больших системах на этом месте стоит API-шлюз, но смысл тот же: клиент говорит с сервисами через их API.',
        en: 'The page sends the registration to the accounts service and goes to both services for their lists. It does not know the services\' classes - only their names and the request format. In large systems an API gateway stands in this place, but the idea is the same: the client talks to services through their APIs.',
      },
    },
    {
      title: { ru: 'Сервис становится клиентом', en: 'A service becomes a client' },
      explanation: {
        ru: 'Создав аккаунт, сервис аккаунтов отправляет сервису писем запрос «письмо» и ждёт ответа. В этом разговоре он клиент, а сервис писем - сервер. В отличие от клиент-серверной архитектуры, серверов здесь много, и каждый может оказаться клиентом другого.',
        en: 'Having created the account, the accounts service sends the email service a "letter" request and waits for the reply. In this exchange it is the client and the email service is the server. Unlike client-server architecture, there are many servers here, and any of them may turn out to be another\'s client.',
      },
    },
    {
      title: { ru: 'В чужое хранилище не ходят', en: 'No one goes into another\'s storage' },
      explanation: {
        ru: 'От сервиса аккаунтов нет стрелки к хранилищу писем, а от сервиса писем - к хранилищу аккаунтов. Адрес попадает в сервис писем только в запросе, а о письме сервис аккаунтов узнаёт только из ответа. Поэтому каждый сервис может поменять своё хранилище и выкатиться сам, если не меняет API.',
        en: 'There is no arrow from the accounts service to the letters storage, nor from the email service to the accounts storage. The address reaches the email service only in a request, and the accounts service learns about a letter only from a reply. That is why each service can change its storage and ship on its own, as long as it keeps its API.',
      },
    },
    {
      title: { ru: 'Сосед недоступен', en: 'A neighbour is unavailable' },
      explanation: {
        ru: 'Если сервис писем молчит, сервис аккаунтов ждёт секунду и сдаётся. Регистрация при этом проходит, а адрес остаётся в списке отложенных писем. Общей транзакции на оба сервиса нет: какое-то время аккаунт существует без письма. Повтор идёт с тем же ключом, поэтому, даже если первое письмо на самом деле ушло, второго не будет.',
        en: 'If the email service is silent, the accounts service waits a second and gives up. The registration still goes through, and the address stays on the pending letters list. There is no shared transaction over both services: for a while the account exists without a letter. A retry carries the same key, so even if the first letter did in fact go out, there will be no second one.',
      },
    },
  ],

  implementation: {
    javascript: `const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

class Network {
  constructor() {
    this.services = new Map();
    this.delayMs = 300;
  }

  register(name, service) {
    this.services.set(name, { service, mode: 'up' });
  }

  setMode(name, mode) {
    this.services.get(name).mode = mode;
  }

  send(name, request, timeoutMs) {
    const reply = this.deliver(name, JSON.stringify(request));
    const timeout = wait(timeoutMs).then(() => {
      throw new Error(name + ': no reply in ' + timeoutMs + ' ms');
    });
    return Promise.race([reply, timeout]).then(JSON.parse);
  }

  async deliver(name, wire) {
    const entry = this.services.get(name);
    await wait(this.delayMs);
    if (entry.mode === 'down') return new Promise(() => {});
    const reply = JSON.stringify(await entry.service.handle(JSON.parse(wire)));
    await wait(entry.mode === 'slow' ? 4000 : this.delayMs);
    return reply;
  }
}

class AccountsService {
  constructor(network) {
    this.network = network;
    this.emails = new Set();
    this.replies = new Map();
    this.pendingWelcome = new Set();
  }

  handle(request) {
    if (request?.type === 'list') {
      return { ok: true, emails: [...this.emails], pendingWelcome: [...this.pendingWelcome] };
    }
    if (request?.type === 'retry-welcome') {
      return this.retryWelcome();
    }
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

  async register(rawEmail) {
    const email = rawEmail.trim().toLowerCase();
    if (!/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(email)) {
      return { ok: false, error: 'Invalid email' };
    }
    if (this.emails.has(email)) {
      return { ok: false, error: 'Email already registered' };
    }
    this.emails.add(email);
    this.pendingWelcome.add(email);
    await this.welcome(email);
    return { ok: true, email, welcome: this.pendingWelcome.has(email) ? 'pending' : 'sent' };
  }

  async welcome(email) {
    try {
      const reply = await this.network.send('welcome', { type: 'welcome', email, key: 'welcome:' + email }, 1000);
      if (reply.ok) this.pendingWelcome.delete(email);
    } catch {
      // The letter stays pending: the account exists either way.
    }
  }

  async retryWelcome() {
    await Promise.all([...this.pendingWelcome].map((email) => this.welcome(email)));
    return { ok: true, pendingWelcome: [...this.pendingWelcome] };
  }
}

class WelcomeService {
  constructor() {
    this.letters = [];
    this.replies = new Map();
  }

  handle(request) {
    if (request?.type === 'list') {
      return { ok: true, letters: this.letters.map((letter) => letter.to) };
    }
    const valid = request?.type === 'welcome'
      && typeof request.email === 'string'
      && typeof request.key === 'string';
    if (!valid) {
      return { ok: false, error: 'Bad request' };
    }
    if (!this.replies.has(request.key)) {
      this.letters.push({ to: request.email, subject: 'Welcome!' });
      this.replies.set(request.key, { ok: true, letter: this.letters.length });
    }
    return this.replies.get(request.key);
  }
}

class RegistrationPage {
  constructor(root, network) {
    this.network = network;
    this.pending = null;
    this.latest = {};
    this.input = root.querySelector('form input');
    this.button = root.querySelector('form button');
    this.message = root.querySelector('.message');
    this.accounts = root.querySelector('.accounts');
    this.letters = root.querySelector('.letters');
    root.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();
      this.submit();
    });
    root.querySelector('.retry').addEventListener('click', () => this.retryWelcome());
    for (const select of root.querySelectorAll('select')) {
      select.addEventListener('change', () => network.setMode(select.name, select.value));
    }
  }

  async submit() {
    const email = this.input.value.trim();
    if (!/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(email)) {
      this.message.textContent = 'Check the address format';
      return;
    }
    if (this.pending?.email !== email) {
      this.pending = { email, requestId: crypto.randomUUID() };
    }
    this.button.disabled = true;
    this.message.textContent = 'Sending...';
    try {
      const request = { type: 'register', email, requestId: this.pending.requestId };
      const reply = await this.network.send('accounts', request, 3000);
      this.pending = null;
      if (!reply.ok) this.message.textContent = reply.error;
      else if (reply.welcome === 'sent') this.message.textContent = 'Registered: ' + reply.email;
      else this.message.textContent = 'Registered: ' + reply.email + ' - welcome email delayed';
      if (reply.ok) this.input.value = '';
    } catch (error) {
      this.message.textContent = error.message + ' - press Register to retry';
    } finally {
      this.button.disabled = false;
      this.refresh();
    }
  }

  async retryWelcome() {
    try {
      await this.network.send('accounts', { type: 'retry-welcome' }, 3000);
    } catch (error) {
      this.message.textContent = error.message;
    }
    this.refresh();
  }

  refresh() {
    this.show(this.accounts, 'accounts', (reply) => reply.emails.map((email) =>
      reply.pendingWelcome.includes(email) ? email + ' (letter pending)' : email));
    this.show(this.letters, 'welcome', (reply) => reply.letters);
  }

  async show(list, service, linesOf) {
    const call = this.network.send(service, { type: 'list' }, 3000);
    this.latest[service] = call;
    let lines;
    try {
      lines = linesOf(await call);
    } catch (error) {
      lines = [error.message];
    }
    if (this.latest[service] !== call) return;
    list.replaceChildren(...lines.map((text) =>
      Object.assign(document.createElement('li'), { textContent: text })));
  }
}

const modes = ['up', 'slow', 'down'].map((mode) => \`<option>\${mode}</option>\`).join('');
const app = document.querySelector('#app');
app.innerHTML = \`
  <label>Accounts service <select name="accounts">\${modes}</select></label>
  <label>Welcome service <select name="welcome">\${modes}</select></label>
  <form>
    <input placeholder="you@example.com">
    <button>Register</button>
  </form>
  <button class="retry">Retry pending letters</button>
  <p class="message"></p>
  <h3>Accounts</h3>
  <ul class="accounts"></ul>
  <h3>Letters sent</h3>
  <ul class="letters"></ul>\`;

const network = new Network();
network.register('accounts', new AccountsService(network));
network.register('welcome', new WelcomeService());
new RegistrationPage(app, network).refresh();`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1, 7],
        title: { ru: 'Модель сети и её граница', en: 'The network model and its limits' },
        explanation: {
          ru: 'Отдельных процессов в одной вкладке браузера не бывает, поэтому сеть смоделирована объектом `Network`: задержка 300 мс в каждую сторону, сериализация в JSON, тайм-аут, сервис, который молчит (`down`), и сервис, который сделал работу, но ответил поздно (`slow`). Не смоделированы отдельные процессы, машины и развёртывания (все три части живут в одной вкладке и выкатываются одним файлом), потеря самого запроса в пути, перезапуск сервиса с потерей данных в памяти и проверка того, кто вызывает сервис.',
          en: 'There are no separate processes in one browser tab, so the network is modelled by a `Network` object: a 300 ms delay each way, JSON serialisation, a timeout, a service that stays silent (`down`), and a service that did the work but replied late (`slow`). Not modelled are separate processes, machines, and deployments (all three parts live in one tab and ship as one file), losing the request itself on the way, a service restart that wipes its in-memory data, and checking who is calling a service.',
        },
      },
      {
        lines: [9, 15],
        title: { ru: 'Сервисы по имени', en: 'Services by name' },
        explanation: {
          ru: 'Сервис регистрируется в сети под именем, и вызывающие знают только это имя и формат запросов, а не класс. `setMode` переключает сервис между `up`, `slow` и `down` - на странице это выпадающие списки.',
          en: 'A service is registered on the network under a name, and callers know only that name and the request format, not the class. `setMode` switches a service between `up`, `slow`, and `down` - on the page these are drop-down lists.',
        },
      },
      {
        lines: [17, 23],
        title: { ru: 'send: ответ или тайм-аут', en: 'send: a reply or a timeout' },
        explanation: {
          ru: 'Запрос уходит JSON-строкой, и `Promise.race` ждёт, что наступит раньше: ответ или тайм-аут. Тайм-аут не отменяет работу на той стороне: `deliver` продолжает выполняться. Поэтому ошибка тайм-аута значит «не знаю, что произошло», а не «ничего не произошло».',
          en: 'The request leaves as a JSON string, and `Promise.race` waits for whichever comes first: the reply or the timeout. The timeout does not cancel the work on the other side: `deliver` keeps running. So a timeout error means "I do not know what happened", not "nothing happened".',
        },
      },
      {
        lines: [25, 33],
        title: { ru: 'deliver: молчание и опоздание', en: 'deliver: silence and lateness' },
        explanation: {
          ru: 'Сервис в режиме `down` не получает запрос и не отвечает никогда - ждать вечно вызывающему не даёт только его тайм-аут. В режиме `slow` сервис выполняет запрос, но ответ идёт 4 секунды, дольше любого тайм-аута в примере. Сервис получает собственную копию данных из JSON, общих объектов у сервисов нет.',
          en: 'A service in `down` mode never gets the request and never replies - only the caller\'s own timeout keeps it from waiting forever. In `slow` mode the service handles the request, but the reply takes 4 seconds, longer than any timeout in the example. The service gets its own copy of the data from JSON; services share no objects.',
        },
      },
      {
        lines: [35, 41],
        title: { ru: 'Данные сервиса аккаунтов', en: 'The accounts service\'s data' },
        explanation: {
          ru: 'Три поля - это «Хранилище» под сервисом аккаунтов на схеме: адреса, сохранённые ответы и адреса с отложенным письмом. Сервис получает только `network`, чтобы звать соседей по имени. Самого сервиса писем и его полей у него нет.',
          en: 'The three fields are the "Storage" under the accounts service on the diagram: the addresses, the saved replies, and the addresses with a pending letter. The service receives only `network`, so it can call neighbours by name. It has neither the email service itself nor its fields.',
        },
      },
      {
        lines: [43, 49],
        title: { ru: 'API сервиса аккаунтов', en: 'The accounts service\'s API' },
        explanation: {
          ru: 'Кроме регистрации сервис умеет отдать список адресов вместе с отложенными письмами и повторить отложенные письма. Это всё, что о нём знают снаружи. `request?.type` не падает, если вместо объекта пришёл `null`.',
          en: 'Besides registration, the service can return the address list together with the pending letters, and retry the pending letters. That is all the outside knows about it. `request?.type` does not crash when `null` arrives instead of an object.',
        },
      },
      {
        lines: [50, 60],
        title: { ru: 'Проверка запроса и ключ', en: 'Checking the request and the key' },
        explanation: {
          ru: 'Сервис не доверяет вызывающему и проверяет форму запроса: на `email: 42` или запрос без ключа он отвечает `Bad request`. Регистрация запускается один раз на `requestId`, и в `replies` сохраняется её промис. Поэтому повтор после тайм-аута и даже второй запрос, пришедший, пока первый ещё работает, получают тот же результат.',
          en: 'The service does not trust the caller and checks the request\'s shape: to `email: 42` or a request without a key it answers `Bad request`. Registration runs once per `requestId`, and its promise is saved in `replies`. So a retry after a timeout, and even a second request that arrives while the first is still running, get the same result.',
        },
      },
      {
        lines: [62, 69],
        title: { ru: 'Правила регистрации', en: 'The registration rules' },
        explanation: {
          ru: 'Те же правила, что во всех примерах категории «Структура системы»: нормализация, формат, уникальность. Здесь они живут внутри одного сервиса, который отвечает за аккаунты, и ошибка возвращается данными, потому что исключение по сети не передать.',
          en: 'The same rules as in every example of the "System Structure" category: normalisation, format, uniqueness. Here they live inside the one service responsible for accounts, and an error comes back as data, because an exception cannot travel over a network.',
        },
      },
      {
        lines: [70, 74],
        title: { ru: 'Сначала аккаунт, потом письмо', en: 'The account first, then the letter' },
        explanation: {
          ru: 'Аккаунт записывается и сразу помечается как ждущий письма, а потом сервис просит отправить приветствие. Ответ говорит, ушло ли письмо (`sent`) или ждёт повтора (`pending`). Это осознанное решение: аккаунт важнее письма, поэтому сбой сервиса писем не отменяет регистрацию. Если бы письмо было обязательным, без общей транзакции пришлось бы отменять уже созданный аккаунт отдельным действием.',
          en: 'The account is saved and at once marked as waiting for a letter, and then the service asks for the welcome to be sent. The reply says whether the letter went out (`sent`) or waits for a retry (`pending`). This is a deliberate decision: the account matters more than the letter, so a failure of the email service does not cancel the registration. If the letter were mandatory, with no shared transaction the account already created would have to be undone by a separate action.',
        },
      },
      {
        lines: [76, 83],
        title: { ru: 'Сервис - клиент соседа', en: 'A service as its neighbour\'s client' },
        explanation: {
          ru: 'Сервис аккаунтов зовёт сервис писем через ту же сеть, что и страница, с ключом `welcome:` + адрес: одно приветствие на аккаунт. Его тайм-аут - 1000 мс, а страница ждёт его самого 3000 мс. Внутренний тайм-аут должен быть короче внешнего, иначе страница сдастся раньше, чем сервис успеет ответить «письмо отложено». Убирает письмо из отложенных только ответ `ok`.',
          en: 'The accounts service calls the email service over the same network the page uses, with the key `welcome:` + address: one welcome per account. Its timeout is 1000 ms, while the page waits 3000 ms for it. The inner timeout must be shorter than the outer one, or the page gives up before the service manages to answer "letter pending". Only an `ok` reply takes the letter off the pending list.',
        },
      },
      {
        lines: [85, 89],
        title: { ru: 'Повтор отложенных писем', en: 'Retrying pending letters' },
        explanation: {
          ru: 'Все отложенные письма запрашиваются заново параллельно, каждое со своим прежним ключом. Если сервис писем уже отправил письмо, но ответ опоздал, повтор получит сохранённый ответ, и письмо не уйдёт второй раз.',
          en: 'All pending letters are requested again in parallel, each with its old key. If the email service already sent a letter but the reply came late, the retry gets the saved reply, and the letter does not go out a second time.',
        },
      },
      {
        lines: [91, 95],
        title: { ru: 'Данные сервиса писем', en: 'The email service\'s data' },
        explanation: {
          ru: 'Отправленные письма и ответы по ключу - второе «Хранилище» на схеме. В конструктор ничего не передаётся: сервису писем никто не нужен, он только отвечает на запросы.',
          en: 'The letters sent and the replies by key are the second "Storage" on the diagram. Nothing is passed to the constructor: the email service needs no one, it only answers requests.',
        },
      },
      {
        lines: [97, 113],
        title: { ru: 'Одно письмо на ключ', en: 'One letter per key' },
        explanation: {
          ru: 'Сервис проверяет форму запроса и отправляет письмо только для нового ключа. Об аккаунтах он не знает и адрес принимает на веру: в примере его можно вызвать из консоли и отправить письмо на адрес без аккаунта. В настоящей системе внутренние сервисы проверяют, кто их вызывает, - здесь это не смоделировано.',
          en: 'The service checks the request\'s shape and sends a letter only for a new key. It knows nothing about accounts and takes the address on trust: in the example it can be called from the console to send a letter to an address with no account. In a real system internal services check who is calling them - that is not modelled here.',
        },
      },
      {
        lines: [115, 133],
        title: { ru: 'Страница знает только сеть', en: 'The page knows only the network' },
        explanation: {
          ru: 'Страница получает свой кусок разметки и `network`. `preventDefault()` не даёт браузеру перезагрузить страницу при отправке формы. Выпадающие списки переключают режим сервиса с тем же именем, кнопка «Retry pending letters» просит сервис аккаунтов повторить письма.',
          en: 'The page receives its piece of markup and `network`. `preventDefault()` stops the browser from reloading the page on form submit. The drop-down lists switch the mode of the service with the same name, and the "Retry pending letters" button asks the accounts service to retry the letters.',
        },
      },
      {
        lines: [135, 145],
        title: { ru: 'Формат и ключ запроса', en: 'The format and the request key' },
        explanation: {
          ru: 'Формат проверяется ради быстрой подсказки, защита - в сервисе. Ключ `requestId` создаётся заново, если прошлой попытки нет или адрес изменился, поэтому повтор после тайм-аута и вторая отправка формы до ответа уходят с тем же ключом. Пока запрос в пути, кнопка выключена.',
          en: 'The format is checked for a quick hint; protection lives in the service. The `requestId` key is created afresh if there is no previous attempt or the address has changed, so a retry after a timeout and a second form submit before the reply go out with the same key. While the request is in flight, the button is disabled.',
        },
      },
      {
        lines: [146, 160],
        title: { ru: 'Ответ, отказ или тайм-аут', en: 'A reply, a refusal, or a timeout' },
        explanation: {
          ru: 'Пришёл ответ - ключ больше не нужен, и страница показывает успех, текст ошибки сервиса или «welcome email delayed», если аккаунт создан, а письмо отложено. Тайм-аут - ключ остаётся, и страница предлагает повторить. В любом случае списки обновляются.',
          en: 'A reply came - the key is no longer needed, and the page shows success, the service\'s error text, or "welcome email delayed" if the account was created and the letter postponed. A timeout - the key stays, and the page offers a retry. Either way the lists are refreshed.',
        },
      },
      {
        lines: [162, 169],
        title: { ru: 'Кнопка повтора писем', en: 'The retry button' },
        explanation: {
          ru: 'Страница не отправляет письма сама и не знает, каким адресам они не ушли: она просит об этом сервис аккаунтов, которому принадлежит список отложенных. Потом обновляет оба списка, чтобы было видно, что писем не стало больше.',
          en: 'The page does not send letters itself and does not know which addresses missed them: it asks the accounts service, which owns the pending list. Then it refreshes both lists, so you can see the letters did not multiply.',
        },
      },
      {
        lines: [171, 190],
        title: { ru: 'Два списка из двух сервисов', en: 'Two lists from two services' },
        explanation: {
          ru: 'Каждый список приходит от своего сервиса, поэтому при отказе одного сервиса пропадает только его список, а второй работает. Ответы по сети приходят не по порядку: поздний тайм-аут старого запроса мог бы затереть свежий список, поэтому показывается только ответ на последний запрос (`latest`). Строки выводятся через `textContent`, и адрес вроде `<b>x</b>@example.com` остаётся текстом.',
          en: 'Each list comes from its own service, so when one service fails only its list disappears, and the other keeps working. Network replies do not arrive in order: a late timeout of an old request could overwrite a fresh list, so only the reply to the latest request (`latest`) is shown. Lines go out through `textContent`, and an address such as `<b>x</b>@example.com` stays text.',
        },
      },
      {
        lines: [192, 211],
        title: { ru: 'Разметка и сборка', en: 'Markup and assembly' },
        explanation: {
          ru: 'Статичная разметка без пользовательских данных, поэтому `innerHTML` здесь безопасен. Сеть создаётся одна, оба сервиса регистрируются в ней под своими именами, и сервис аккаунтов получает сеть, а не сервис писем. В настоящей системе каждый сервис был бы отдельной программой со своим развёртыванием.',
          en: 'Static markup with no user data, so `innerHTML` is safe here. One network is created, both services are registered in it under their names, and the accounts service gets the network, not the email service. In a real system each service would be a separate program with its own deployment.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'Независимое развёртывание: сервис писем можно изменить и выкатить отдельно, не трогая аккаунты, если его API остаётся прежним.',
      en: 'Independent deployment: the email service can be changed and shipped on its own, without touching accounts, as long as its API stays the same.',
    },
    {
      ru: 'Отказы и нагрузка разделены: упал сервис писем - регистрация продолжает работать, а масштабировать можно только тот сервис, на который приходится нагрузка.',
      en: 'Failures and load are separated: if the email service is down, registration keeps working, and only the service under load needs to be scaled.',
    },
    {
      ru: 'Команда владеет бизнес-возможностью целиком, вместе с данными, и сама выбирает технологию и базу данных для своего сервиса.',
      en: 'A team owns a business capability end to end, data included, and picks the technology and database for its own service.',
    },
  ],
  cons: [
    {
      ru: 'Сеть везде: задержки, тайм-ауты и частичные отказы на каждом вызове, повторы и ключи идемпотентности для каждого запроса, который меняет данные.',
      en: 'The network is everywhere: delays, timeouts, and partial failures on every call, plus retries and idempotency keys for every request that changes data.',
    },
    {
      ru: 'Согласованность без общей транзакции: аккаунт и письмо лежат в разных хранилищах, поэтому бывают моменты расхождения, а запрос через данные двух сервисов требует вызовов API или копий данных.',
      en: 'Consistency without a shared transaction: the account and the letter sit in different stores, so there are moments of mismatch, and a query across two services\' data needs API calls or copies of data.',
    },
    {
      ru: 'Дорогая эксплуатация: много процессов, которые нужно развёртывать, отслеживать и отлаживать по цепочке вызовов, а без автоматизации сборки и мониторинга стиль не окупается.',
      en: 'Costly operations: many processes to deploy, monitor, and debug along a chain of calls, and without build and monitoring automation the style does not pay off.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда несколько команд развивают одну большую систему и мешают друг другу общим развёртыванием, а части системы должны выходить в разном темпе.',
      en: 'When several teams develop one large system and get in each other\'s way through a shared deployment, and parts of the system must ship at different paces.',
    },
    {
      ru: 'Когда у частей системы сильно разная нагрузка или требования к надёжности, и им нужно масштабироваться и отказывать по отдельности.',
      en: 'When parts of the system have very different load or reliability needs and must scale and fail separately.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Netflix** - в августе 2008 года повреждение базы данных на три дня остановило отправку DVD подписчикам. После этого компания решила уйти от вертикально масштабируемых единых точек отказа к распределённым системам в облаке AWS и закончила переезд в начале января 2016 года. Адриан Кокрофт, по словам Льюиса и Фаулера, называл этот стиль «fine grained SOA».',
      en: '**Netflix** - in August 2008 a database corruption stopped DVD shipments to members for three days. After that the company chose to move away from vertically scaled single points of failure towards distributed systems in the AWS cloud, and finished the move in early January 2016. Adrian Cockcroft, according to Lewis and Fowler, called this style "fine grained SOA".',
    },
    {
      ru: '**Amazon** - во внутреннем «Distributed Computing Manifesto» 1998 года (Вернер Фогельс опубликовал его в 2022-м) сказано, что клиенты больше не обращаются к базе данных напрямую, а только через интерфейс, который скрывает бизнес-логику. Льюис и Фаулер приводят принцип Amazon «you build, you run it»: команда, которая написала сервис, сама его и эксплуатирует.',
      en: '**Amazon** - the internal "Distributed Computing Manifesto" of 1998 (Werner Vogels published it in 2022) says that clients would no longer access the database directly, only through an interface that encapsulates the business logic. Lewis and Fowler cite Amazon\'s "you build, you run it" principle: the team that wrote a service also runs it.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: 'Термин моложе самой идеи. По словам **Джеймса Льюиса и Мартина Фаулера**, на семинаре архитекторов под Венецией в мае 2011 года так назвали стиль, который участники уже пробовали, а в мае 2012-го та же группа выбрала «microservices» как самое подходящее имя. В марте 2012 года Льюис рассказывал об этих идеях на конференции 33rd Degree в Кракове, примерно тогда же похожее выступление было у Фреда Джорджа. Статья Льюиса и Фаулера «Microservices» (25 марта 2014) определяет стиль как подход, при котором одно приложение строится из набора небольших сервисов, каждый в своём процессе, с лёгкими механизмами общения, часто HTTP API.',
        en: 'The term is younger than the idea. According to **James Lewis and Martin Fowler**, at a workshop of software architects near Venice in May 2011 the name was used for a style the participants were already exploring, and in May 2012 the same group chose "microservices" as the most fitting name. In March 2012 Lewis presented these ideas at the 33rd Degree conference in Krakow, and Fred George gave a similar talk at about the same time. Lewis and Fowler\'s article "Microservices" (25 March 2014) defines the style as an approach to building one application as a suite of small services, each in its own process, with lightweight communication, often an HTTP API.',
      },
      {
        ru: 'Главное свойство - **независимое развёртывание**, а не размер. Льюис и Фаулер пишут, что сервисы развёртываются независимо, и правка одного обычно требует выкатить только его, хотя изменение интерфейса всё же требует согласования. **Сэм Ньюмен** в книге «Monolith to Microservices» (2019) определяет микросервисы как независимо развёртываемые сервисы, смоделированные вокруг бизнес-области. Сами Льюис и Фаулер жалеют, что название заставляет думать о размере: самые крупные сервисы, о которых им рассказывали, укладывались в команду, которую можно накормить двумя пиццами, то есть не больше десятка человек.',
        en: 'The key property is **independent deployment**, not size. Lewis and Fowler write that services are independently deployable, and changing one usually means shipping only that one, although a change to an interface still needs coordination. **Sam Newman** in "Monolith to Microservices" (2019) defines microservices as independently deployable services modelled around a business domain. Lewis and Fowler themselves regret that the name puts the focus on size: the largest services they heard of fit a team that two pizzas can feed, that is no more than a dozen people.',
      },
      {
        ru: 'Резать по **бизнес-возможностям**, а не по слоям, учит **закон Конвея**. Мелвин Конвей в статье «How Do Committees Invent?» (Datamation, апрель 1968) писал, что организации, которые проектируют системы, обречены выпускать проекты, повторяющие структуру общения этих организаций. Льюис и Фаулер приводят следствие: если команды поделены на интерфейс, серверную логику и базы данных, даже простая правка превращается в межкомандный проект. Микросервисы делают наоборот: одна команда владеет возможностью целиком, от API до данных.',
        en: 'Splitting by **business capability** rather than by layer is what **Conway\'s law** teaches. Melvin Conway in "How Do Committees Invent?" (Datamation, April 1968) wrote that organisations which design systems are constrained to produce designs which copy their own communication structures. Lewis and Fowler draw the consequence: if teams are split into interface, server-side logic, and databases, even a simple change turns into a cross-team project. Microservices do the opposite: one team owns a capability end to end, from the API to the data.',
      },
      {
        ru: '**Своя база у каждого сервиса** - раздел «Decentralized Data Management» статьи Льюиса и Фаулера: сервис сам управляет своей базой, и это могут быть разные системы хранения (polyglot persistence). **Марк Ричардс и Нил Форд** в главе 17 «Fundamentals of Software Architecture» (2020) выводят это из понятия ограниченного контекста (bounded context) предметно-ориентированного проектирования: сервис владеет своими данными, а остальные получают их только через него. Цена - нет общих транзакций: по Льюису и Фаулеру, сервисы координируются без транзакций, согласованность бывает только итоговой (eventual consistency), а проблемы исправляют компенсирующими действиями.',
        en: '**A database per service** is the "Decentralized Data Management" section of Lewis and Fowler\'s article: a service manages its own database, and these may be different storage systems (polyglot persistence). **Mark Richards and Neal Ford** in chapter 17 of "Fundamentals of Software Architecture" (2020) derive it from the bounded context of domain-driven design: a service owns its data, and the others get it only through that service. The price is no shared transactions: per Lewis and Fowler, services coordinate without transactions, consistency may only be eventual, and problems are fixed by compensating operations.',
      },
      {
        ru: 'Цену распределённости хорошо описывают **заблуждения о распределённых вычислениях**. В 1994 году Питер Дойч в Sun Microsystems составил список из семи, четыре из которых раньше назвали Билл Джой и Дейв Лайон; около 1997 года Джеймс Гослинг добавил восьмое. Первые два - «сеть надёжна» и «задержка равна нулю». Пример показывает оба: сервис может промолчать, ответ может опоздать, и тайм-аут не говорит, была ли сделана работа. Раздел «Design for failure» у Льюиса и Фаулера прямо называет это недостатком по сравнению с монолитом: приложение обязано переживать отказы сервисов, и это добавляет сложности.',
        en: 'The price of distribution is well described by the **fallacies of distributed computing**. In 1994 Peter Deutsch at Sun Microsystems put together a list of seven, four of which Bill Joy and Dave Lyon had named earlier; around 1997 James Gosling added the eighth. The first two are "the network is reliable" and "latency is zero". The example shows both: a service may stay silent, a reply may be late, and a timeout does not tell whether the work was done. The "Design for failure" section of Lewis and Fowler plainly calls this a drawback compared with a monolith: the application must survive service failures, and that adds complexity.',
      },
      {
        ru: 'Сравнение с соседями. **Слоистый монолит** - один процесс и одно развёртывание, вызовы между слоями обычные и не теряются. **Клиент-сервер** выносит интерфейс на клиент, но сервер один. В микросервисах серверов много, и каждый может быть клиентом другого. Синхронная цепочка вызовов делает доступность общей: если регистрация ждёт письмо, а у каждого сервиса доступность 99,9%, у цепочки она около 99,8%. Поэтому в примере письмо не держит регистрацию: то, что не нужно для ответа, откладывают.',
        en: 'A comparison with the neighbours. A **layered monolith** is one process and one deployment, and calls between layers are plain and never lost. **Client-server** moves the interface onto the client, but there is one server. In microservices there are many servers, and each may be another\'s client. A synchronous chain of calls makes availability shared: if registration waits for the letter, and each service has 99.9% availability, the chain has about 99.8%. That is why in the example the letter does not hold up the registration: whatever the reply does not need is deferred.',
      },
      {
        ru: 'Обратный путь тоже бывает. В марте 2023 года инженер **Prime Video** Марцин Кольны описал сервис мониторинга качества видео, собранный из распределённых компонентов на AWS Step Functions и Lambda с кадрами в S3. Он упёрся в жёсткий предел масштабирования примерно на 5% ожидаемой нагрузки, и команда собрала все компоненты в один процесс на EC2 и ECS - стоимость инфраструктуры упала больше чем на 90%. Вывод самой статьи: выбор между сервисами и монолитом делают для каждого случая. Это был один сервис, а не весь Prime Video, и в споре вокруг статьи многие замечали, что дорогими были прежде всего бессерверные компоненты.',
        en: 'The way back happens too. In March 2023 **Prime Video** engineer Marcin Kolny described a video quality monitoring service built from distributed components on AWS Step Functions and Lambda, with frames in S3. It hit a hard scaling limit at about 5% of the expected load, and the team put all components into a single process on EC2 and ECS - infrastructure cost fell by over 90%. The article\'s own conclusion: the choice between services and a monolith is made case by case. It was one service, not all of Prime Video, and in the debate around the article many noted that the expensive part was above all the serverless components.',
      },
    ],
    whenToUse: [
      {
        ru: '**Монолит или микросервисы** - маленькой команде с неясными границами предметной области обычно хватает хорошо разделённого монолита: вызовы внутри процесса проще и не теряются. Делить стоит, когда общее развёртывание и общая база реально тормозят команды, а не на всякий случай.',
        en: '**Monolith or microservices** - a small team with unclear domain boundaries is usually fine with a well-divided monolith: calls inside one process are simpler and never lost. It is worth splitting when the shared deployment and shared database really slow the teams down, not just in case.',
      },
      {
        ru: '**Граница сервиса** - по бизнес-возможности, вокруг данных, которые меняются вместе. Если два сервиса всегда выкатываются вместе и на каждый запрос зовут друг друга, граница проведена неверно: получился распределённый монолит со всеми минусами обоих стилей.',
        en: '**A service boundary** - by business capability, around data that changes together. If two services always ship together and call each other on every request, the boundary is in the wrong place: the result is a distributed monolith with the drawbacks of both styles.',
      },
      {
        ru: '**Ждать или отложить** - всё, что не нужно для ответа пользователю, лучше не держать в синхронной цепочке, как письмо в примере. Очереди и события вместо ожиданий - тема следующего паттерна, событийной архитектуры.',
        en: '**Wait or defer** - whatever the user\'s reply does not need is better kept out of the synchronous chain, like the letter in the example. Queues and events instead of waiting are the subject of the next pattern, event-driven architecture.',
      },
      {
        ru: '**Общая база данных** - соблазн «не гонять данные по сети» превращает схему базы в общий контракт: её правка ломает соседа, и развёртывание снова становится общим. Нужны чужие данные - через API владельца или копией; отдельные модели для чтения - тема CQRS.',
        en: '**A shared database** - the temptation "not to send data over the network" turns the schema into a shared contract: changing it breaks a neighbour, and deployment becomes shared again. If you need another service\'s data - through its owner\'s API or as a copy; separate read models are the subject of CQRS.',
      },
      {
        ru: '**Тайм-ауты и повторы** - у каждого сетевого вызова должен быть тайм-аут, внутренний короче внешнего, а повторять можно только запросы с ключом идемпотентности. Тайм-аут значит «неизвестно», а не «не было»: в примере медленный сервис письмо уже отправил.',
        en: '**Timeouts and retries** - every network call needs a timeout, the inner one shorter than the outer, and only requests with an idempotency key may be retried. A timeout means "unknown", not "did not happen": in the example the slow service has already sent the letter.',
      },
    ],
    realWorld: [
      {
        ru: '**James Lewis, Martin Fowler, «Microservices» (martinfowler.com, 25 марта 2014)** - определение стиля и девять характеристик: компоненты-сервисы, организация по бизнес-возможностям, продукты вместо проектов, умные конечные точки и простые каналы, децентрализованное управление и данные, автоматизация инфраструктуры, проектирование под отказ, эволюционный дизайн.',
        en: '**James Lewis, Martin Fowler, "Microservices" (martinfowler.com, 25 March 2014)** - the definition of the style and its nine characteristics: componentization via services, organisation around business capabilities, products not projects, smart endpoints and dumb pipes, decentralised governance and data, infrastructure automation, design for failure, evolutionary design.',
      },
      {
        ru: '**Sam Newman, «Building Microservices» (O\'Reilly, 2015; 2-е издание - 2021)** - основная книга о проектировании микросервисов; в его же «Monolith to Microservices» (2019) - определение через независимое развёртывание и бизнес-область.',
        en: '**Sam Newman, "Building Microservices" (O\'Reilly, 2015; 2nd edition - 2021)** - the main book on designing microservices; his "Monolith to Microservices" (2019) gives the definition through independent deployment and the business domain.',
      },
      {
        ru: '**Melvin Conway, «How Do Committees Invent?» (Datamation, апрель 1968)** - статья, из которой вырос закон Конвея: структура системы повторяет структуру общения организации, которая её проектирует.',
        en: '**Melvin Conway, "How Do Committees Invent?" (Datamation, April 1968)** - the article Conway\'s law grew out of: the structure of a system copies the communication structure of the organisation that designs it.',
      },
      {
        ru: '**Заблуждения о распределённых вычислениях** (L. Peter Deutsch и коллеги, Sun Microsystems): семь пунктов в 1994 году, восьмой добавил Джеймс Гослинг около 1997-го - сеть надёжна, задержка нулевая, пропускная способность бесконечна, сеть безопасна, топология не меняется, администратор один, передача бесплатна, сеть однородна.',
        en: '**The fallacies of distributed computing** (L. Peter Deutsch and colleagues, Sun Microsystems): seven items in 1994, with the eighth added by James Gosling around 1997 - the network is reliable, latency is zero, bandwidth is infinite, the network is secure, topology does not change, there is one administrator, transport cost is zero, the network is homogeneous.',
      },
      {
        ru: '**Mark Richards, Neal Ford, «Fundamentals of Software Architecture» (2020)** - глава 17 «Microservices Architecture»: история стиля, ограниченный контекст, гранулярность, изоляция данных, слой API, хореография и оркестровка.',
        en: '**Mark Richards, Neal Ford, "Fundamentals of Software Architecture" (2020)** - chapter 17 "Microservices Architecture": the style\'s history, bounded context, granularity, data isolation, the API layer, choreography and orchestration.',
      },
    ],
  },

  relatedPatterns: ['event-driven'],

  quiz: [
    {
      question: {
        ru: 'Что главным образом отличает микросервисную архитектуру от монолита?',
        en: 'What mainly sets microservices architecture apart from a monolith?',
      },
      options: [
        { ru: 'Микросервисы - это слои монолита, разложенные по разным папкам одного проекта', en: 'Microservices are a monolith\'s layers laid out in different folders of one project' },
        { ru: 'Каждый сервис работает в своём процессе и развёртывается отдельно от других', en: 'Each service runs in its own process and is deployed separately from the others' },
        { ru: 'Микросервисы всегда пишут на разных языках, а монолит - всегда на одном', en: 'Microservices are always written in different languages, a monolith in one' },
        { ru: 'Монолит хранит данные в базе, а микросервисы держат их только в памяти', en: 'A monolith keeps data in a database, while microservices keep it in memory only' },
      ],
      correct: 1,
      explanation: {
        ru: 'Главное свойство - независимое развёртывание: правка одного сервиса обычно требует выкатить только его. Разные языки возможны, но не обязательны, а хранилище у каждого сервиса своё и вполне может быть базой данных.',
        en: 'The key property is independent deployment: changing one service usually means shipping only that one. Different languages are possible but not required, and each service has its own storage, which may well be a database.',
      },
      hint: {
        ru: 'Смотрите второй абзац раздела «Как это работает».',
        en: 'See the second paragraph of the "How it works" section.',
      },
    },
    {
      question: {
        ru: 'По какому принципу микросервисная архитектура советует делить систему на сервисы?',
        en: 'By what principle does microservices architecture advise splitting a system into services?',
      },
      options: [
        { ru: 'По техническим слоям: отдельно интерфейс, логика и база данных', en: 'By technical layer: the interface, logic, and database apart' },
        { ru: 'По размеру кода: не больше тысячи строк в каждом сервисе', en: 'By code size: no more than a thousand lines in each service' },
        { ru: 'По бизнес-возможностям: аккаунты, письма, оплата, доставка', en: 'By business capability: accounts, email, payments, delivery' },
        { ru: 'По языкам программирования: один язык - один сервис', en: 'By programming language: one language, one service' },
      ],
      correct: 2,
      explanation: {
        ru: 'Сервис владеет бизнес-возможностью целиком, от API до данных. Деление по слоям - как раз то, от чего уходят: по закону Конвея оно делает простую правку межкомандным проектом.',
        en: 'A service owns a business capability end to end, from the API to the data. Splitting by layer is exactly what is left behind: by Conway\'s law it turns a simple change into a cross-team project.',
      },
      hint: {
        ru: 'Смотрите раздел «Решение» на вкладке «Суть».',
        en: 'See the "Solution" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Откуда сервис писем в примере узнаёт адрес, на который нужно отправить приветствие?',
        en: 'Where does the email service in the example learn the address to send the welcome to?',
      },
      options: [
        { ru: 'Читает поле `emails` объекта `AccountsService` напрямую', en: 'It reads the `emails` field of the `AccountsService` directly' },
        { ru: 'Адрес приходит ему в запросе от сервиса аккаунтов', en: 'The address arrives in a request from the accounts service' },
        { ru: 'Делает запрос к общей базе данных обоих сервисов', en: 'It queries a database shared by both of the services' },
        { ru: 'Берёт его из поля ввода на странице регистрации', en: 'It takes it from the input field on the sign-up page' },
      ],
      correct: 1,
      explanation: {
        ru: 'Сервис писем не видит ни данных аккаунтов, ни страницы. Адрес приходит в запросе `welcome`, а общей базы у сервисов нет.',
        en: 'The email service sees neither the accounts data nor the page. The address comes in the `welcome` request, and the services have no shared database.',
      },
      hint: {
        ru: 'Смотрите шаг «В чужое хранилище не ходят» на вкладке «Схема».',
        en: 'See the "No one goes into another\'s storage" step on the "Diagram" tab.',
      },
    },
    {
      question: {
        ru: 'Сервис писем в режиме `down`. Что происходит с регистрацией нового адреса в примере?',
        en: 'The email service is in `down` mode. What happens to the registration of a new address in the example?',
      },
      options: [
        { ru: 'Регистрация отменяется целиком: без письма аккаунт не создаётся', en: 'The registration is cancelled entirely: no letter, so no account at all' },
        { ru: 'Аккаунт создан, письмо отложено, и его можно повторить позже', en: 'The account is created; the letter is pending and can be retried' },
        { ru: 'Страница ждёт сервис писем без конца, и кнопка не включается', en: 'The page waits for the email service forever, the button stays off' },
        { ru: 'Сервис аккаунтов сам кладёт письмо в хранилище сервиса писем', en: 'The accounts service puts the letter into the email service\'s store' },
      ],
      correct: 1,
      explanation: {
        ru: 'Сервис аккаунтов ждёт секунду, сдаётся и оставляет адрес в `pendingWelcome`. Аккаунт важнее письма, поэтому отказ соседа не отменяет регистрацию, а в чужое хранилище сервис не пишет никогда.',
        en: 'The accounts service waits a second, gives up, and leaves the address in `pendingWelcome`. The account matters more than the letter, so a neighbour\'s failure does not cancel the registration, and a service never writes into another\'s store.',
      },
      hint: {
        ru: 'Смотрите шаг «Сначала аккаунт, потом письмо» на вкладке «Реализация».',
        en: 'See the "The account first, then the letter" step on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Сервис писем в режиме `slow`: письмо он отправил, но ответ пришёл позже тайм-аута. Почему повтор не отправит второе письмо?',
        en: 'The email service is in `slow` mode: it sent the letter, but the reply came after the timeout. Why will a retry not send a second letter?',
      },
      options: [
        { ru: 'Тайм-аут отменил работу сервиса писем, и первое письмо не ушло вовсе', en: 'The timeout cancelled the email service\'s work, so no first letter went out' },
        { ru: 'Повтор идёт с тем же ключом, и сервис возвращает сохранённый ответ', en: 'The retry carries the same key, and the service returns the saved reply' },
        { ru: 'Сервис аккаунтов перед повтором удаляет аккаунт и создаёт его заново', en: 'Before a retry the accounts service deletes the account and recreates it' },
        { ru: 'Браузер сам склеивает одинаковые запросы в один перед их отправкой', en: 'The browser itself merges identical requests into one before sending' },
      ],
      correct: 1,
      explanation: {
        ru: 'Тайм-аут ничего не отменяет: `Promise.race` лишь перестаёт ждать. Письмо уже отправлено, а повтор с ключом `welcome:` + адрес получает ответ, сохранённый под этим ключом.',
        en: 'A timeout cancels nothing: `Promise.race` merely stops waiting. The letter has already been sent, and a retry with the key `welcome:` + address gets the reply saved under that key.',
      },
      hint: {
        ru: 'Смотрите шаги «send: ответ или тайм-аут» и «Одно письмо на ключ» на вкладке «Реализация».',
        en: 'See the "send: a reply or a timeout" and "One letter per key" steps on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Почему сервис аккаунтов ждёт сервис писем 1000 мс, а страница ждёт сервис аккаунтов 3000 мс?',
        en: 'Why does the accounts service wait 1000 ms for the email service, while the page waits 3000 ms for the accounts service?',
      },
      options: [
        { ru: 'Внутренний тайм-аут короче внешнего, чтобы сервис успел ответить сам', en: 'The inner timeout is shorter, so the service can still answer itself' },
        { ru: 'Страница работает медленнее сервиса, поэтому ей нужно больше времени', en: 'The page runs slower than a service, so it needs more time to finish' },
        { ru: 'Числа выбраны случайно, и их можно поменять местами без последствий', en: 'The numbers are arbitrary and could be swapped with no consequences' },
        { ru: 'Короткий тайм-аут даёт сервису писем время перезапуститься после сбоя', en: 'A short timeout gives the email service time to restart after a crash' },
      ],
      correct: 0,
      explanation: {
        ru: 'Если внутренний тайм-аут длиннее внешнего, страница сдастся раньше, чем сервис аккаунтов успеет сказать «письмо отложено», и пользователь увидит ошибку, хотя аккаунт создан.',
        en: 'If the inner timeout is longer than the outer one, the page gives up before the accounts service can say "letter pending", and the user sees an error although the account was created.',
      },
      hint: {
        ru: 'Смотрите шаг «Сервис - клиент соседа» на вкладке «Реализация».',
        en: 'See the "A service as its neighbour\'s client" step on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Две команды хотят дать своим сервисам общую базу данных, «чтобы не гонять данные по сети». Чем это плохо?',
        en: 'Two teams want to give their services a shared database "so as not to send data over the network". What is wrong with that?',
      },
      options: [
        { ru: 'Ничем: общая база - обязательная часть микросервисной архитектуры', en: 'Nothing: a shared database is a required part of microservices architecture' },
        { ru: 'Базы данных не принимают подключения сразу от двух разных процессов', en: 'Databases do not accept connections from two processes at once' },
        { ru: 'Схема станет общим контрактом: её правка сломает соседний сервис', en: 'The schema becomes a contract: changing it breaks the other service' },
        { ru: 'Одна общая база всегда медленнее двух отдельных баз того же типа', en: 'One shared database is always slower than two separate ones' },
      ],
      correct: 2,
      explanation: {
        ru: 'Через общую базу сервисы связаны сильнее, чем через API: изменить таблицу можно только вместе с соседом, и развёртывание снова становится общим. Поэтому у каждого сервиса своё хранилище, а чужие данные получают через API владельца.',
        en: 'Through a shared database services are coupled more tightly than through an API: a table can change only together with the neighbour, and deployment becomes shared again. So each service has its own store, and another\'s data is fetched through its owner\'s API.',
      },
      hint: {
        ru: 'Смотрите пункт «Общая база данных» в разделе «Нюансы выбора».',
        en: 'See the "A shared database" point in the "Choice nuances" section.',
      },
    },
    {
      question: {
        ru: 'В компании команды «фронтенд», «бэкенд» и «базы данных», и систему разрезали на сервисы по тем же слоям. Что предсказывает закон Конвея?',
        en: 'A company has "frontend", "backend", and "database" teams, and the system was cut into services along the same layers. What does Conway\'s law predict?',
      },
      options: [
        { ru: 'Ничего: закон Конвея говорит о размере команд, а не об устройстве систем', en: 'Nothing: Conway\'s law is about team size, not about how systems are built' },
        { ru: 'Сервисы сами перестроятся по бизнес-возможностям после отдельного развёртывания', en: 'The services will regroup by business capability once deployed separately' },
        { ru: 'Система повторит структуру команд, и простая правка потребует трёх команд', en: 'The system will mirror the teams; a simple change will need all three' },
        { ru: 'Команды будут меньше общаться, потому что каждой хватает своего слоя', en: 'The teams will talk less, since each one is happy with its own layer' },
      ],
      correct: 2,
      explanation: {
        ru: 'Конвей писал, что системы повторяют структуру общения организаций, которые их проектируют. При командах по слоям любая возможность задевает все три, поэтому в микросервисах команду строят вокруг бизнес-возможности.',
        en: 'Conway wrote that systems copy the communication structure of the organisations that design them. With teams by layer, every capability touches all three, which is why in microservices a team is built around a business capability.',
      },
      hint: {
        ru: 'Смотрите третий абзац раздела «Как это работает».',
        en: 'See the third paragraph of the "How it works" section.',
      },
    },
    {
      question: {
        ru: 'Чем микросервисная архитектура отличается от клиент-серверной?',
        en: 'How does microservices architecture differ from client-server architecture?',
      },
      options: [
        { ru: 'Ничем: это клиент-сервер, в котором один сервер просто стал побольше', en: 'In no way: it is client-server where the one server just got bigger' },
        { ru: 'Сети нет: сервисы вызывают друг друга внутри одного общего процесса', en: 'There is no network: services call each other inside one process' },
        { ru: 'Серверов много, и сервисы сами становятся клиентами друг друга', en: 'There are many servers, and services become each other\'s clients' },
        { ru: 'Серверов нет вовсе, а клиенты обмениваются данными напрямую', en: 'There are no servers, and the clients swap data directly instead' },
      ],
      correct: 2,
      explanation: {
        ru: 'В клиент-сервере один сервер - источник истины. В микросервисах каждый сервис - сервер для своих данных и клиент для чужих, как сервис аккаунтов в разговоре с сервисом писем. Прямой обмен между равными узлами - это peer-to-peer.',
        en: 'In client-server one server is the source of truth. In microservices each service is a server for its own data and a client for others\', as the accounts service is when talking to the email service. Direct exchange between equal nodes is peer-to-peer.',
      },
      hint: {
        ru: 'Смотрите шаг «Сервис становится клиентом» на вкладке «Схема».',
        en: 'See the "A service becomes a client" step on the "Diagram" tab.',
      },
    },
    {
      question: {
        ru: 'Какой вывод сделала команда Prime Video в статье 2023 года о сервисе мониторинга качества видео?',
        en: 'What conclusion did the Prime Video team draw in its 2023 article about the video quality monitoring service?',
      },
      options: [
        { ru: 'Микросервисы устарели, поэтому весь Prime Video переведён обратно в монолит', en: 'Microservices are outdated, so all of Prime Video went back to a monolith' },
        { ru: 'Сервис надо было резать ещё мельче, тогда стоимость упала бы сама собой', en: 'The service should have been split even finer, and the cost would drop' },
        { ru: 'Монолит дешевле всегда, поэтому распределять систему не нужно никогда', en: 'A monolith is always cheaper, so a system should never be distributed' },
        { ru: 'Выбор между сервисами и монолитом делают отдельно для каждого случая', en: 'The choice between services and a monolith is made for each case anew' },
      ],
      correct: 3,
      explanation: {
        ru: 'Один сервис упёрся в предел масштабирования и стоимость распределённых компонентов, и сборка в один процесс снизила расходы больше чем на 90%. Сама статья говорит, что решать нужно в каждом случае, а не отказываться от сервисов вообще.',
        en: 'One service hit a scaling limit and the cost of distributed components, and putting it into one process cut costs by over 90%. The article itself says the decision must be made case by case, not that services should be dropped altogether.',
      },
      hint: {
        ru: 'Смотрите последний абзац раздела «Как это работает».',
        en: 'See the last paragraph of the "How it works" section.',
      },
    },
  ],
};

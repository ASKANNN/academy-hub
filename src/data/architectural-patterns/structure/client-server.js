export const clientServer = {
  slug: 'client-server',
  category: 'structure',
  name: { ru: 'Клиент-серверная архитектура', en: 'Client-Server Architecture' },
  popularity: 3,
  tags: ['structure', 'tiers', 'network'],

  intent: {
    ru: 'Клиент-серверная архитектура (Client-Server Architecture) делит систему на две роли, которые работают в разных процессах и обычно на разных машинах: клиенты отправляют запросы, а сервер их обрабатывает и отвечает. Данные и правила, которым можно доверять, живут на сервере, и он - единственный источник истины сразу для всех клиентов. Клиент бывает тонким или толстым, но последнее слово в том, чему можно доверять, всегда за сервером. Между ними лежит сеть, поэтому каждое сообщение сериализуется, идёт с задержкой и может потеряться.',
    en: 'Client-Server Architecture splits a system into two roles that run in separate processes and usually on separate machines: clients send requests, and the server handles them and replies. The data and rules that can be trusted live on the server, which is the single source of truth for all clients at once. A client may be thin or thick, but the last word on what can be trusted always belongs to the server. A network lies between them, so every message is serialised, travels with a delay, and may be lost.',
  },

  problem: {
    ru: 'До клиент-сервера было две крайности. На **мейнфрейме** всё работало на одной большой машине, а **терминал** был только экраном и клавиатурой. Когда появились персональные компьютеры, у каждого оказалась своя копия данных: два сотрудника регистрируют один и тот же email на разных машинах, и уже никто не скажет, какой список верный. Нужно одно место, которое хранит общие данные и следит за правилами, и при этом машина пользователя должна сама вести интерфейс. **Слоистая архитектура** этого не решает: она делит код по ролям, но все слои работают в одном процессе и ничего не говорят о сети между ними.',
    en: 'Before client-server there were two extremes. On a **mainframe** everything ran on one big machine, and a **terminal** was just a screen and a keyboard. When personal computers arrived, each had its own copy of the data: two employees register the same email on different machines, and nobody can say which list is right. What is needed is one place that keeps the shared data and enforces the rules, while the user\'s machine runs the interface itself. **Layered architecture** does not solve this: it splits code by role, but all its layers run in one process and say nothing about a network between them.',
  },

  solution: {
    ru: '**Сервер** хранит данные и правила и ждёт запросов. **Клиент** показывает интерфейс, собирает ввод, отправляет **запрос** и получает **ответ**. Инициатива у клиента: сервер не обращается к клиенту первым, он отвечает. Даже push-уведомления (WebSocket) идут по соединению, которое открыл клиент. Между ними **граница сети**: сообщения передаются как данные (в примере JSON), общих объектов нет, ответ приходит с задержкой и может не прийти. Поэтому сервер перепроверяет каждый запрос, ведь клиент можно обойти, а клиент проверяет формат только ради удобства. Каждая регистрация несёт ключ `requestId`, чтобы повтор после сбоя не выполнил действие второй раз.',
    en: 'The **server** keeps the data and the rules and waits for requests. The **client** shows the interface, collects input, sends a **request**, and gets a **reply**. The initiative is the client\'s: the server does not contact a client first, it answers. Even push notifications (WebSocket) travel over a connection the client opened. Between them lies the **network boundary**: messages travel as data (JSON in the example), no objects are shared, and a reply arrives with a delay or may not arrive at all. So the server re-checks every request, since a client can be bypassed, and the client checks the format only for convenience. Every registration carries a `requestId` key, so a retry after a failure does not perform the action twice.',
  },

  diagram: {
    layout: 'client-server',
    boundary: {
      label: { ru: 'Граница сети', en: 'Network boundary' },
      note: { ru: 'JSON · задержка · сбои', en: 'JSON · delay · failures' },
    },
    nodes: [
      {
        id: 'server',
        label: { ru: 'Сервер', en: 'Server' },
        note: { ru: 'RegistrationServer', en: 'RegistrationServer' },
        role: {
          ru: 'Класс `RegistrationServer`: единственный источник истины. Принимает запрос, проверяет его форму, формат адреса и уникальность, сам решает, регистрировать ли адрес, и возвращает ответ данными. Клиентам не доверяет: любой запрос мог прийти в обход формы. Первым к клиенту не обращается - только отвечает.',
          en: 'The `RegistrationServer` class: the single source of truth. It takes a request, checks its shape, the address format, and uniqueness, decides by itself whether to register the address, and returns the reply as data. It does not trust clients: any request may have come around the form. It never contacts a client first - it only answers.',
        },
      },
      {
        id: 'client-a',
        side: 'left',
        label: { ru: 'Клиент A', en: 'Client A' },
        note: { ru: 'RegistrationClient', en: 'RegistrationClient' },
        role: {
          ru: 'Экземпляр `RegistrationClient`: форма, сообщение и список. Проверяет формат ради быстрой подсказки, отправляет запрос и показывает ответ, а при сбое сети предлагает повторить с тем же `requestId`. Список адресов у него - только копия из последнего ответа сервера.',
          en: 'An instance of `RegistrationClient`: a form, a message, and a list. It checks the format for a quick hint, sends the request and shows the reply, and after a network failure offers a retry with the same `requestId`. Its address list is only a copy from the server\'s last reply.',
        },
      },
      {
        id: 'client-b',
        side: 'left',
        label: { ru: 'Клиент B', en: 'Client B' },
        note: { ru: 'RegistrationClient', en: 'RegistrationClient' },
        role: {
          ru: 'Второй экземпляр того же класса - как вторая вкладка или телефон. С клиентом A он не общается: адрес, который зарегистрировал A, B увидит, только когда сам спросит сервер кнопкой «Refresh list».',
          en: 'A second instance of the same class - like a second tab or a phone. It does not talk to client A: an address that A registered, B sees only when it asks the server itself with the "Refresh list" button.',
        },
      },
      {
        id: 'database',
        side: 'below',
        label: { ru: 'Хранилище', en: 'Storage' },
        note: { ru: 'emails · replies', en: 'emails · replies' },
        role: {
          ru: 'Поля сервера: `emails` - зарегистрированные адреса, `replies` - сохранённые ответы по `requestId`. В примере они лежат в памяти того же процесса, что и сервер, поэтому сервер обращается к ним обычным вызовом. В трёхуровневой системе на этом месте стоит отдельный сервер базы данных.',
          en: 'The server\'s fields: `emails` - the registered addresses, `replies` - the saved replies by `requestId`. In the example they sit in the memory of the server\'s own process, so the server reaches them with a plain call. In a three-tier system a separate database server stands in this place.',
        },
      },
    ],
    connections: [
      { from: 'client-a', to: 'server', label: { ru: 'запрос', en: 'request' } },
      { from: 'server', to: 'client-a', label: { ru: 'ответ', en: 'reply' } },
      { from: 'client-b', to: 'server', label: { ru: 'запрос', en: 'request' } },
      { from: 'server', to: 'client-b', label: { ru: 'ответ', en: 'reply' } },
      { from: 'server', to: 'database', label: { ru: 'читает и пишет', en: 'reads and writes' } },
    ],
  },

  steps: [
    {
      title: { ru: 'Клиент проверяет формат ради удобства', en: 'The client checks the format for convenience' },
      explanation: {
        ru: 'Прежде чем отправить запрос, клиент проверяет формат адреса и сразу подсказывает, если он неверный, без ожидания сети. Это не защита: запрос можно отправить в обход формы, поэтому сервер проверит всё заново. Для новой отправки клиент заводит ключ `requestId`, а повтор после сбоя идёт с прежним ключом.',
        en: 'Before sending a request, the client checks the address format and hints at once if it is wrong, with no wait for the network. This is not protection: a request can be sent around the form, so the server will check everything again. For a new submission the client creates a `requestId` key, while a retry after a failure reuses the old one.',
      },
    },
    {
      title: { ru: 'Запрос пересекает границу сети', en: 'The request crosses the network boundary' },
      explanation: {
        ru: 'Запрос превращается в JSON-строку и через задержку доходит до сервера, который получает собственную копию данных, а не объект клиента. Стрелки на этой схеме - сообщения и вызовы в ту сторону, куда они идут. Стрелка «запрос» всегда идёт от клиента: начинает обмен только он.',
        en: 'The request is turned into a JSON string and reaches the server after a delay; the server gets its own copy of the data, not the client\'s object. The arrows on this diagram are messages and calls, pointing the way they travel. The "request" arrow always starts at a client: only the client starts an exchange.',
      },
    },
    {
      title: { ru: 'Сервер перепроверяет всё и решает', en: 'The server re-checks everything and decides' },
      explanation: {
        ru: 'Сервер проверяет форму запроса, формат адреса и уникальность по своим данным и только потом записывает адрес. Стрелка «читает и пишет» - обычный вызов внутри процесса сервера: результат возвращается как значение вызова, поэтому обратной стрелки нет, как в слоистой архитектуре. В трёхуровневой системе это тоже был бы запрос и ответ по сети.',
        en: 'The server checks the request\'s shape, the address format, and uniqueness against its own data, and only then writes the address. The "reads and writes" arrow is a plain call inside the server\'s process: the result comes back as the call\'s value, so there is no return arrow, just as in layered architecture. In a three-tier system it would also be a request and reply over the network.',
      },
    },
    {
      title: { ru: 'Ответ - отдельное сообщение', en: 'The reply is a separate message' },
      explanation: {
        ru: 'Ответ идёт обратно своей стрелкой, потому что это отдельное сообщение, и оно может потеряться уже после того, как сервер всё сделал. Клиент тогда не знает, прошла ли регистрация, и повторяет запрос с тем же `requestId`. Сервер узнаёт ключ и возвращает сохранённый первый ответ, а не выполняет регистрацию снова.',
        en: 'The reply travels back on its own arrow because it is a separate message, and it can be lost after the server has already done the work. The client then does not know whether the registration went through, and repeats the request with the same `requestId`. The server recognises the key and returns the saved first reply instead of registering again.',
      },
    },
    {
      title: { ru: 'У каждого клиента только копия', en: 'Each client holds only a copy' },
      explanation: {
        ru: 'Клиент B не видит адрес, который только что зарегистрировал клиент A, пока сам не спросит сервер. Клиенты друг с другом не общаются, и стрелок между ними нет: истина одна и лежит на сервере, а у клиентов - снимки из последних ответов. В peer-to-peer было бы наоборот: узлы обмениваются данными напрямую.',
        en: 'Client B does not see the address client A has just registered until it asks the server itself. Clients do not talk to each other, and there are no arrows between them: there is one truth and it lives on the server, while the clients hold snapshots from their last replies. Peer-to-peer would be the opposite: nodes exchange data directly.',
      },
    },
  ],

  implementation: {
    javascript: `class RegistrationServer {
  constructor() {
    this.emails = new Set();
    this.replies = new Map();
  }

  handle(request) {
    if (request?.type === 'list') {
      return { ok: true, emails: [...this.emails] };
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

  register(rawEmail) {
    const email = rawEmail.trim().toLowerCase();
    if (!/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(email)) {
      return { ok: false, error: 'Invalid email' };
    }
    if (this.emails.has(email)) {
      return { ok: false, error: 'Email already registered' };
    }
    this.emails.add(email);
    return { ok: true, email };
  }
}

const network = { delayMs: 400, down: false };
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function connect(server) {
  return async function send(request) {
    const wire = JSON.stringify(request);
    await wait(network.delayMs);
    const reply = JSON.stringify(server.handle(JSON.parse(wire)));
    await wait(network.delayMs);
    if (network.down) {
      throw new Error('Network error: no reply');
    }
    return JSON.parse(reply);
  };
}

class RegistrationClient {
  constructor(root, send) {
    this.send = send;
    this.pending = null;
    this.input = root.querySelector('form input');
    this.button = root.querySelector('form button');
    this.message = root.querySelector('p');
    this.list = root.querySelector('ul');
    root.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();
      this.submit();
    });
    root.querySelector('.refresh').addEventListener('click', () => this.refresh());
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
      const reply = await this.send({ type: 'register', email, requestId: this.pending.requestId });
      this.pending = null;
      this.message.textContent = reply.ok ? 'Registered: ' + reply.email : reply.error;
      if (reply.ok) this.input.value = '';
      await this.refresh();
    } catch (error) {
      this.message.textContent = error.message + ' - press Register to retry';
    } finally {
      this.button.disabled = false;
    }
  }

  async refresh() {
    try {
      const reply = await this.send({ type: 'list' });
      const items = reply.emails.map((email) =>
        Object.assign(document.createElement('li'), { textContent: email }));
      this.list.replaceChildren(...items);
    } catch (error) {
      this.message.textContent = error.message;
    }
  }
}

const app = document.querySelector('#app');
app.innerHTML = \`
  <label><input type="checkbox"> Network down: replies are lost</label>
  <section><h3>Client A</h3></section>
  <section><h3>Client B</h3></section>\`;
app.querySelector('label input').addEventListener('change', (event) => {
  network.down = event.target.checked;
});

const send = connect(new RegistrationServer());
for (const section of app.querySelectorAll('section')) {
  section.insertAdjacentHTML('beforeend', \`
    <form>
      <input placeholder="you@example.com">
      <button>Register</button>
    </form>
    <button class="refresh">Refresh list</button>
    <p></p>
    <ul></ul>\`);
  new RegistrationClient(section, send).refresh();
}`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1, 5],
        title: { ru: 'Состояние сервера', en: 'The server\'s state' },
        explanation: {
          ru: 'У сервера два поля: множество зарегистрированных адресов и сохранённые ответы по ключу запроса. Это и есть «Хранилище» на схеме. Клиенты никогда не получают сами эти объекты - только данные из ответов.',
          en: 'The server has two fields: the set of registered addresses and the saved replies by request key. This is the "Storage" on the diagram. Clients never get these objects themselves - only data from replies.',
        },
      },
      {
        lines: [7, 10],
        title: { ru: 'Запрос списка', en: 'The list request' },
        explanation: {
          ru: 'Сервер отдаёт список как массив: `Set` не пережил бы сериализацию, `JSON.stringify(new Set([1]))` даёт `{}`. Через границу сети проходит только то, что можно записать в JSON.',
          en: 'The server hands out the list as an array: a `Set` would not survive serialisation, `JSON.stringify(new Set([1]))` gives `{}`. Only what can be written as JSON crosses the network boundary.',
        },
      },
      {
        lines: [11, 16],
        title: { ru: 'Сервер не доверяет запросу', en: 'The server does not trust the request' },
        explanation: {
          ru: 'Запрос мог прийти не из формы: из консоли браузера, скрипта или чужой программы. Поэтому сервер сначала проверяет саму форму запроса - тип, строку email, строковый ключ - и отвечает `Bad request` на всё остальное, например на `email: 42` или на `null` вместо объекта: для него `request?.type` даёт `undefined`, а не бросает исключение.',
          en: 'The request may not have come from the form: from the browser console, a script, or someone else\'s program. So the server first checks the shape of the request itself - the type, a string email, a string key - and answers `Bad request` to anything else, such as `email: 42` or `null` instead of an object: for it `request?.type` gives `undefined` instead of throwing.',
        },
      },
      {
        lines: [17, 21],
        title: { ru: 'Повтор с тем же ключом', en: 'A retry with the same key' },
        explanation: {
          ru: 'Регистрация выполняется только для нового `requestId`, а ответ сохраняется под этим ключом. Повтор с тем же ключом получит тот же ответ без повторного выполнения. Уникальность адреса и так не даст записать дубликат, но без ключа повтор после потерянного ответа показал бы `Email already registered` вместо успеха. Ключ защищает ответ, правило уникальности - данные. Настоящие серверы со временем удаляют старые ключи: Stripe, например, может удалить ключ, которому исполнилось 24 часа.',
          en: 'Registration runs only for a new `requestId`, and the reply is saved under that key. A retry with the same key gets the same reply without running again. Address uniqueness alone would already stop a duplicate record, but without the key a retry after a lost reply would show `Email already registered` instead of success. The key protects the reply, the uniqueness rule protects the data. Real servers drop old keys over time: Stripe, for example, may remove a key once it is at least 24 hours old.',
        },
      },
      {
        lines: [23, 34],
        title: { ru: 'Правила на сервере', en: 'The rules on the server' },
        explanation: {
          ru: 'Те же правила, что в примерах слоистой, гексагональной и микроядерной архитектуры: нормализация, формат, уникальность. Здесь они живут на сервере, и ошибка возвращается данными `{ ok: false, error }`, а не исключением: исключение через сеть не передать, `JSON.stringify(new Error(\'x\'))` тоже даёт `{}`.',
          en: 'The same rules as in the layered, hexagonal, and microkernel examples: normalisation, format, uniqueness. Here they live on the server, and an error comes back as data `{ ok: false, error }` rather than an exception: an exception cannot be sent over a network, and `JSON.stringify(new Error(\'x\'))` also gives `{}`.',
        },
      },
      {
        lines: [36, 37],
        title: { ru: 'Модель сети', en: 'The network model' },
        explanation: {
          ru: 'Настоящего сервера в браузере нет, поэтому сеть смоделирована: задержка 400 мс в каждую сторону и флажок `down`, при котором ответы теряются. Смоделированы сериализация, задержка и потеря ответа. Не смоделированы отдельный процесс и машина (сервер живёт в той же вкладке), потеря самого запроса, разрыв посреди сообщения и одновременная работа нескольких серверных потоков: настоящий сервер может получить два запроса с одним ключом одновременно и должен занимать ключ атомарно, а здесь `handle` синхронный и такого не бывает.',
          en: 'There is no real server in a browser, so the network is modelled: a 400 ms delay each way and a `down` flag that makes replies get lost. Serialisation, delay, and a lost reply are modelled. Not modelled are a separate process and machine (the server lives in the same tab), losing the request itself, a break mid-message, and several server threads working at once: a real server may get two requests with one key at the same moment and must claim the key atomically, while here `handle` is synchronous and that cannot happen.',
        },
      },
      {
        lines: [39, 50],
        title: { ru: 'send - через границу и обратно', en: 'send - across the boundary and back' },
        explanation: {
          ru: '`send` превращает запрос в JSON-строку, ждёт, и сервер разбирает уже свою копию, поэтому общих объектов у клиента и сервера нет. Ответ тоже сериализуется и идёт обратно с задержкой. Когда сеть «упала», `send` бросает ошибку уже после того, как сервер всё выполнил: в настоящей сети клиент не может отличить этот случай от потерянного запроса, и обработать оба надо одинаково - повтором с тем же ключом.',
          en: '`send` turns the request into a JSON string and waits, and the server parses its own copy, so client and server share no objects. The reply is serialised too and travels back with a delay. When the network is "down", `send` throws only after the server has done everything: on a real network the client cannot tell this case from a lost request, and both must be handled the same way - by a retry with the same key.',
        },
      },
      {
        lines: [52, 65],
        title: { ru: 'Клиент знает только send', en: 'The client knows only send' },
        explanation: {
          ru: 'Клиент получает свой кусок страницы и функцию `send`, а о сервере не знает ничего, кроме формата запросов и ответов: ни класса, ни полей. `preventDefault()` не даёт браузеру перезагрузить страницу при отправке формы. Кнопка «Refresh list» заново спрашивает список у сервера.',
          en: 'The client receives its piece of the page and the `send` function, and knows nothing of the server beyond the format of requests and replies: neither its class nor its fields. `preventDefault()` stops the browser from reloading the page on form submit. The "Refresh list" button asks the server for the list again.',
        },
      },
      {
        lines: [67, 72],
        title: { ru: 'Проверка формата - для удобства', en: 'The format check - for convenience' },
        explanation: {
          ru: 'Клиент проверяет формат тем же выражением, что и сервер, чтобы подсказать сразу, без ожидания сети. Это удобство, а не защита: если эту проверку обойти, сервер всё равно ответит `Invalid email`.',
          en: 'The client checks the format with the same expression as the server, to give a hint at once with no wait for the network. This is convenience, not protection: if this check is bypassed, the server still answers `Invalid email`.',
        },
      },
      {
        lines: [73, 75],
        title: { ru: 'Ключ живёт до ответа', en: 'The key lives until a reply' },
        explanation: {
          ru: 'Ключ создаётся заново, если прошлой попытки нет (после любого ответа она сбрасывается) или адрес в поле изменился. Пока ответа нет, отправка того же адреса - нажатие «Register» после сбоя или вторая отправка формы до ответа - уходит с тем же ключом, поэтому сервер выполнит регистрацию один раз.',
          en: 'A key is created afresh if there is no previous attempt (any reply clears it) or the address in the field has changed. While no reply has come, sending the same address - pressing "Register" after a failure or a second form submit before the reply - goes out with the same key, so the server registers once.',
        },
      },
      {
        lines: [76, 77],
        title: { ru: 'Кнопка на время запроса', en: 'The button during a request' },
        explanation: {
          ru: 'Пока запрос в пути, кнопка выключена и видно «Sending...». Это защита от лишних кликов на стороне интерфейса, но не гарантия: две отправки формы подряд из скрипта всё равно уйдут, и тогда выручает тот же ключ на сервере.',
          en: 'While a request is in flight, the button is disabled and "Sending..." is shown. This guards against extra clicks on the UI side, but it is no guarantee: two form submits in a row from a script still go out, and then the same key on the server saves the day.',
        },
      },
      {
        lines: [78, 89],
        title: { ru: 'Ответ, ошибка или сбой сети', en: 'A reply, an error, or a network failure' },
        explanation: {
          ru: 'Пришёл ответ - ключ больше не нужен, клиент показывает успех или текст ошибки сервера и обновляет список. Не пришёл - ключ остаётся, и клиент предлагает повторить. Отказ сервера (`ok: false`) и сбой сети - разные вещи: в первом случае сервер ответил, во втором ответа нет вовсе.',
          en: 'A reply came - the key is no longer needed, and the client shows success or the server\'s error text and refreshes the list. None came - the key stays, and the client offers a retry. A refusal from the server (`ok: false`) and a network failure are different things: in the first the server answered, in the second there is no answer at all.',
        },
      },
      {
        lines: [91, 101],
        title: { ru: 'refresh - копия с сервера', en: 'refresh - a copy from the server' },
        explanation: {
          ru: 'Список на странице строится из ответа сервера: `li` с `textContent`, поэтому адрес вроде `<b>x</b>@example.com` покажется как текст, а не станет разметкой. Это снимок на момент ответа: если другой клиент зарегистрирует адрес, этот список о нём не узнает до следующего запроса.',
          en: 'The list on the page is built from the server\'s reply: `li` elements with `textContent`, so an address such as `<b>x</b>@example.com` shows as text instead of turning into markup. It is a snapshot as of the reply: if another client registers an address, this list will not know until the next request.',
        },
      },
      {
        lines: [103, 110],
        title: { ru: 'Разметка и выключатель сети', en: 'Markup and the network switch' },
        explanation: {
          ru: 'Статичная разметка без пользовательских данных, поэтому `innerHTML` здесь безопасен. Флажок «Network down» переключает модель сети: пока он включён, сервер продолжает выполнять запросы, но ответы до клиентов не доходят.',
          en: 'Static markup with no user data, so `innerHTML` is safe here. The "Network down" checkbox switches the network model: while it is on, the server keeps handling requests, but the replies do not reach the clients.',
        },
      },
      {
        lines: [112, 123],
        title: { ru: 'Один сервер, два клиента', en: 'One server, two clients' },
        explanation: {
          ru: 'Создаётся один сервер и одна функция `send`, а клиентов два, каждый в своей секции. Оба ходят к одному и тому же серверу и друг о друге не знают - как две вкладки или ноутбук и телефон одного пользователя.',
          en: 'One server and one `send` function are created, and there are two clients, each in its own section. Both go to the same server and know nothing of each other - like two tabs, or one user\'s laptop and phone.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'Один источник истины: данные и правила в одном месте, все клиенты видят одно и то же, а изменение правила на сервере сразу действует для всех.',
      en: 'One source of truth: the data and rules are in one place, every client sees the same thing, and a rule changed on the server applies to everyone at once.',
    },
    {
      ru: 'Контроль на сервере: он проверяет каждый запрос и отдаёт клиенту только нужное, поэтому правило нельзя обойти, изменив код клиента.',
      en: 'Control on the server: it checks every request and gives the client only what it needs, so a rule cannot be bypassed by changing the client\'s code.',
    },
    {
      ru: 'Клиенты и сервер развиваются раздельно: к тому же серверу подключается новый клиент, например мобильное приложение, а сервер масштабируется отдельно от интерфейса.',
      en: 'Clients and server evolve separately: a new client, such as a mobile app, connects to the same server, and the server scales independently of the interface.',
    },
  ],
  cons: [
    {
      ru: 'Сеть ненадёжна: задержка на каждом запросе, ответы теряются, нужно обрабатывать сбои, повторы и ключи идемпотентности - в одном процессе ничего этого не было.',
      en: 'The network is unreliable: a delay on every request, lost replies, and failures, retries, and idempotency keys to handle - none of which existed in one process.',
    },
    {
      ru: 'Сервер - единая точка отказа и узкое место: упал сервер - не работает ни один клиент, а нагрузка всех клиентов приходится на него.',
      en: 'The server is a single point of failure and a bottleneck: if it goes down no client works, and the load of every client lands on it.',
    },
    {
      ru: 'Часть работы удваивается: формат проверяется и на клиенте ради удобства, и на сервере ради защиты, а каждое сообщение приходится сериализовать - общих объектов нет.',
      en: 'Some work doubles: the format is checked on the client for convenience and on the server for protection, and every message has to be serialised - no objects are shared.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда у многих пользователей должны быть общие данные: учётные записи, заказы, сообщения, документы.',
      en: 'When many users must share data: accounts, orders, messages, documents.',
    },
    {
      ru: 'Когда правила должны выполняться там, куда пользователь не дотянется: деньги, права доступа, уникальность.',
      en: 'When rules must run where the user cannot reach them: money, access rights, uniqueness.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Веб** - браузер клиент, веб-сервер отвечает по HTTP. Первый веб-сервер и браузер WorldWideWeb Тим Бернерс-Ли написал в CERN в 1990 году, а первая версия протокола (1991, позже её назвали HTTP/0.9) состояла из одного запроса `GET` и одного ответа, после которого сервер закрывал соединение.',
      en: '**The Web** - the browser is the client, and the web server replies over HTTP. Tim Berners-Lee wrote the first web server and the WorldWideWeb browser at CERN in 1990, and the first version of the protocol (1991, later called HTTP/0.9) was a single `GET` request and a single reply, after which the server closed the connection.',
    },
    {
      ru: '**Электронная почта** - почтовый клиент вроде Thunderbird работает с письмами на сервере по IMAP и отправляет их через SMTP-сервер. Письма хранятся на сервере, поэтому с телефона и ноутбука видна одна и та же папка «Входящие».',
      en: '**Email** - a mail client such as Thunderbird works with messages on the server over IMAP and sends them through an SMTP server. Messages are kept on the server, which is why a phone and a laptop show the same Inbox.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: 'Слова старше самого стиля. В ARPANET в 1969 году говорили о «server-host» и «user-host»: так они названы, например, в RFC 5 Джеффа Рулифсона (июнь 1969). Слово **client** в нынешнем смысле, по данным Википедии, впервые появилось в статье сотрудников **Xerox PARC** Говарда Стёрджиса, Джеймса Митчелла и Джея Израэля в 1978 году. Названием целого стиля корпоративных систем «клиент-сервер» стал в 1980-х, вместе с персональными компьютерами в локальных сетях.',
        en: 'The words are older than the style. In 1969 ARPANET people spoke of the "server-host" and the "user-host": that is what they are called, for example, in Jeff Rulifson\'s RFC 5 (June 1969). The word **client** in today\'s sense, according to Wikipedia, first appeared in a 1978 paper by **Xerox PARC** researchers Howard Sturgis, James Mitchell, and Jay Israel. "Client-server" became the name of a whole style of business systems in the 1980s, together with personal computers on local networks.',
      },
      {
        ru: 'Предшественник - **мейнфрейм с терминалами**. Все программы и данные жили на одной центральной машине, а терминал был только экраном и клавиатурой без собственных программ. С 1980-х до конца 1990-х организации переносили вычисления с мейнфреймов и мини-компьютеров на персональные компьютеры. ПК стал **клиентом** со своим интерфейсом и логикой, а общие данные остались на **сервере**.',
        en: 'The predecessor is the **mainframe with terminals**. All programs and data lived on one central machine, and a terminal was just a screen and a keyboard with no programs of its own. From the 1980s to the late 1990s organisations moved computing from mainframes and minicomputers to personal computers. The PC became a **client** with its own interface and logic, while the shared data stayed on a **server**.',
      },
      {
        ru: 'Отсюда шкала от **тонкого** до **толстого клиента**. Терминал - предельно тонкий клиент: всё решает сервер. Толстый клиент (его ещё называют rich или fat) многое делает сам и иногда может работать без сети, но всё равно время от времени связывается с сервером. Клиент в примере тонкий: он проверяет только формат, а всё, что имеет значение, решает сервер. Где провести черту - выбор, но правило одно: проверка на клиенте - для удобства, проверка на сервере - закон.',
        en: 'Hence a scale from **thin** to **thick clients**. A terminal is the thinnest client possible: the server decides everything. A thick client (also called rich or fat) does a lot itself and can sometimes work without a network, yet still contacts the server from time to time. The client in the example is thin: it checks only the format, and the server decides everything that matters. Where to draw the line is a choice, but the rule is one: a check on the client is for convenience, a check on the server is the law.',
      },
      {
        ru: 'Клиент-сервер - стиль про **уровни** (tiers), а не про **слои** (layers). Слой - логическое деление кода, уровень - отдельный процесс или машина. Каждый уровень внутри вполне может быть слоистым. **Марк Ричардс и Нил Форд** в «Fundamentals of Software Architecture» (2020) относят клиент-сервер к фундаментальным паттернам (Fundamental Patterns) и разбирают три его варианта: настольное приложение с сервером базы данных, браузер с веб-сервером и **трёхуровневую** схему, где между интерфейсом и базой стоит сервер приложений. В примере два уровня смоделированы в одной вкладке.',
        en: 'Client-server is a style about **tiers**, not **layers**. A layer is a logical division of code, a tier is a separate process or machine. Each tier may well be layered inside. **Mark Richards and Neal Ford** in "Fundamentals of Software Architecture" (2020) count client-server among the Fundamental Patterns and cover three variants of it: a desktop application with a database server, a browser with a web server, and the **three-tier** setup, where an application server sits between the interface and the database. In the example two tiers are modelled in one tab.',
      },
      {
        ru: '**Рой Филдинг** в диссертации 2000 года, где описан стиль **REST**, начинает именно с ограничения client-server: это первое ограничение, которое он добавляет. Его довод - разделение ответственности: интерфейс отделён от хранения данных, поэтому интерфейс переносится на разные платформы, сервер упрощается и лучше масштабируется, а части развиваются независимо. Следующее ограничение REST - отсутствие состояния сеанса на сервере: каждый запрос несёт всё, что нужно для его обработки, как запросы в примере.',
        en: '**Roy Fielding**, in his 2000 dissertation that describes the **REST** style, starts precisely with the client-server constraint: it is the first constraint he adds. His argument is separation of concerns: the interface is separated from data storage, so the interface can move to different platforms, the server becomes simpler and scales better, and the parts evolve independently. REST\'s next constraint is no session state on the server: each request carries everything needed to handle it, as the requests in the example do.',
      },
      {
        ru: 'Роль определяется не размером машины и не тем, где сидит пользователь. В **X Window System** (MIT, 1984; X11 с 1987 года) X-сервер работает на компьютере пользователя: он владеет экраном, клавиатурой и мышью. А программы - клиенты - могут работать на удалённой машине и посылать серверу запросы на рисование. Многим это кажется перевёрнутым, но логика та же: сервер - тот, кто предоставляет услугу, клиент - тот, кто её запрашивает.',
        en: 'A role is defined neither by the size of the machine nor by where the user sits. In the **X Window System** (MIT, 1984; X11 since 1987) the X server runs on the user\'s computer: it owns the screen, keyboard, and mouse. The programs - the clients - may run on a remote machine and send the server drawing requests. Many people find this backwards, but the logic is the same: the server is whoever provides a service, the client is whoever requests it.',
      },
      {
        ru: 'Противоположность - **peer-to-peer**. Там узлы равноправны, каждый одновременно клиент и сервер, и общаются они напрямую. Единого источника истины нет: узлам приходится договариваться и сводить данные. Клиент-сервер покупает простоту одной истины ценой единой точки отказа и узкого места. Сравнение с соседями по категории: **слоистая** архитектура делит код, **гексагональная** и **микроядро** устраивают одно приложение изнутри, а клиент-сервер разносит систему по процессам.',
        en: 'The opposite is **peer-to-peer**. There nodes are equals, each is a client and a server at once, and they talk directly. There is no single source of truth: the nodes have to agree and reconcile data. Client-server buys the simplicity of one truth at the price of a single point of failure and a bottleneck. A comparison with the neighbours in this category: **layered** architecture divides code, **hexagonal** and **microkernel** shape one application from the inside, while client-server spreads a system across processes.',
      },
    ],
    whenToUse: [
      {
        ru: '**Слои или уровни** - если система работает в одном процессе для одного пользователя, хватит слоистой архитектуры, а сеть будет чистой издержкой. Отдельные уровни нужны, когда пользователей много, данные общие или правила должны жить там, куда клиент не дотянется.',
        en: '**Layers or tiers** - if a system runs in one process for one user, layered architecture is enough, and a network would be pure overhead. Separate tiers are needed when there are many users, the data is shared, or the rules must live where the client cannot reach.',
      },
      {
        ru: '**Тонкий или толстый клиент** - тонкий проще обновлять (всё на сервере), и логика не уходит к пользователю, но без сети он бесполезен. Толстый быстрее отвечает и работает офлайн, но логика дублируется, а у пользователей годами живут старые версии клиента.',
        en: '**Thin or thick client** - a thin one is easier to update (everything is on the server), and the logic never leaves for the user\'s machine, but it is useless without a network. A thick one responds faster and works offline, but the logic is duplicated, and old client versions live on with users for years.',
      },
      {
        ru: '**Два уровня или три** - клиент, который ходит прямо в базу данных, прост, но база открыта каждому клиенту, и правила расползаются по клиентам. Сервер приложений посередине прячет базу и держит правила в одном месте.',
        en: '**Two tiers or three** - a client that goes straight to the database is simple, but the database is open to every client and the rules spread across the clients. An application server in the middle hides the database and keeps the rules in one place.',
      },
      {
        ru: '**Повторы и идемпотентность** - ответ может потеряться после того, как сервер всё сделал, поэтому каждому запросу, который меняет данные, нужен ключ для безопасного повтора. Так устроен заголовок `Idempotency-Key` в API Stripe.',
        en: '**Retries and idempotency** - a reply can be lost after the server has done the work, so every request that changes data needs a key for a safe retry. That is how the `Idempotency-Key` header in Stripe\'s API works.',
      },
      {
        ru: '**Против клиент-сервера** - если у данных нет естественного владельца и узлы равноправны (обмен файлами, совместная работа без центра), смотрите в сторону peer-to-peer. Если единственный сервер не выдерживает нагрузку, это уже вопрос распределённых систем.',
        en: '**Against client-server** - if the data has no natural owner and the nodes are equals (file sharing, collaboration without a centre), look towards peer-to-peer. If a single server cannot take the load, that is already a question for distributed systems.',
      },
    ],
    realWorld: [
      {
        ru: '**Roy Fielding, «Architectural Styles and the Design of Network-based Software Architectures» (диссертация, UC Irvine, 2000)** - глава 5 о REST: client-server как первое ограничение и его обоснование разделением ответственности.',
        en: '**Roy Fielding, "Architectural Styles and the Design of Network-based Software Architectures" (dissertation, UC Irvine, 2000)** - chapter 5 on REST: client-server as the first constraint and its justification by separation of concerns.',
      },
      {
        ru: '**Mark Richards, Neal Ford, «Fundamentals of Software Architecture» (2020)** - глава 9 «Foundations»: в разделе Fundamental Patterns рядом с Big Ball of Mud и Unitary Architecture - Client/Server с вариантами настольное приложение + база, браузер + веб-сервер и трёхуровневая схема.',
        en: '**Mark Richards, Neal Ford, "Fundamentals of Software Architecture" (2020)** - chapter 9 "Foundations": in the Fundamental Patterns section, next to Big Ball of Mud and Unitary Architecture, is Client/Server with the variants desktop + database, browser + web server, and three-tier.',
      },
      {
        ru: '**Tim Berners-Lee, «Information Management: A Proposal» (CERN, март 1989)** - предложение, из которого вырос веб; первым веб-сервером стал `nxoc01.cern.ch`, позже `info.cern.ch`.',
        en: '**Tim Berners-Lee, "Information Management: A Proposal" (CERN, March 1989)** - the proposal the Web grew out of; the first web server was `nxoc01.cern.ch`, later `info.cern.ch`.',
      },
      {
        ru: '**X Window System** (MIT, Project Athena, 1984; X11 - сентябрь 1987) - пример, где сервер работает на машине пользователя, а клиенты-программы могут быть удалёнными.',
        en: '**X Window System** (MIT, Project Athena, 1984; X11 - September 1987) - an example where the server runs on the user\'s machine and the client programs may be remote.',
      },
      {
        ru: '**Stripe API, идемпотентные запросы** - клиент сам создаёт ключ (рекомендуется UUID v4) и шлёт его в заголовке `Idempotency-Key`, сервер сохраняет результат первого запроса и на повтор с тем же ключом возвращает его. Похожий заголовок обсуждается как черновик стандарта в IETF.',
        en: '**Stripe API, idempotent requests** - the client creates the key itself (a V4 UUID is suggested) and sends it in the `Idempotency-Key` header; the server saves the result of the first request and returns it for a retry with the same key. A similar header is being discussed as a draft standard at the IETF.',
      },
    ],
  },

  relatedPatterns: ['layered', 'hexagonal', 'microkernel'],

  quiz: [
    {
      question: {
        ru: 'Кто начинает обмен сообщениями в классической клиент-серверной схеме?',
        en: 'Who starts an exchange of messages in the classic client-server setup?',
      },
      options: [
        { ru: 'Сервер сам рассылает клиентам новые данные, как только они появляются', en: 'The server pushes new data to the clients itself as soon as it appears' },
        { ru: 'Клиент отправляет запрос, а сервер на него отвечает', en: 'The client sends a request, and the server replies to it' },
        { ru: 'Клиенты обмениваются данными напрямую, а сервер ведёт журнал', en: 'Clients exchange data directly while the server keeps a log' },
        { ru: 'Та машина, у которой больше памяти и процессоров', en: 'Whichever machine has more memory and processors' },
      ],
      correct: 1,
      explanation: {
        ru: 'Инициатива у клиента: он спрашивает, сервер отвечает. Даже push через WebSocket начинается с соединения, которое открыл клиент. Размер машины роль не определяет - вспомните X Window System, где сервер стоит у пользователя.',
        en: 'The initiative is the client\'s: it asks, the server answers. Even push over WebSocket starts with a connection the client opened. Machine size does not define the role - recall the X Window System, where the server sits with the user.',
      },
      hint: {
        ru: 'Смотрите раздел «Решение» на вкладке «Суть».',
        en: 'See the "Solution" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Где в примере хранится список адресов, которому можно доверять?',
        en: 'Where does the example keep the address list that can be trusted?',
      },
      options: [
        { ru: 'В каждом клиенте, в списке `ul`, который он рисует на странице', en: 'In each client, in the `ul` list that it renders on its page' },
        { ru: 'В `localStorage` браузера, общем для обоих клиентов', en: 'In the browser\'s `localStorage`, shared by both of the clients' },
        { ru: 'В `Set` сервера, а у клиентов только копии из ответов', en: 'In the server\'s `Set`; clients hold only copies from replies' },
        { ru: 'В объекте `network`, через который идут все запросы', en: 'In the `network` object that every request goes through' },
      ],
      correct: 2,
      explanation: {
        ru: 'Сервер - единственный источник истины. Список на странице клиента - снимок из последнего ответа, и он устаревает, как только другой клиент что-то зарегистрирует.',
        en: 'The server is the single source of truth. The list on a client\'s page is a snapshot from its last reply, and it goes stale as soon as another client registers something.',
      },
      hint: {
        ru: 'Смотрите шаг «У каждого клиента только копия» на вкладке «Схема».',
        en: 'See the "Each client holds only a copy" step on the "Diagram" tab.',
      },
    },
    {
      question: {
        ru: 'Что называют тонким клиентом?',
        en: 'What is called a thin client?',
      },
      options: [
        { ru: 'Клиент, который почти ничего не решает сам и за всем важным идёт к серверу', en: 'A client that decides almost nothing and asks the server about everything important' },
        { ru: 'Клиент, написанный без фреймворков, поэтому его код занимает совсем мало места', en: 'A client written without any frameworks, so its code takes up very little space on disk' },
        { ru: 'Клиент, который держит у себя полную копию данных и поэтому умеет работать без сети', en: 'A client that keeps a full copy of the data locally and so can keep working without a network' },
        { ru: 'Клиент, который подключается к серверу по медленному каналу связи', en: 'A client that connects to the server over a slow network link' },
      ],
      correct: 0,
      explanation: {
        ru: 'Тонкий клиент сильно зависит от сервера, предельный случай - терминал мейнфрейма. Полная копия данных и работа офлайн - признаки толстого клиента.',
        en: 'A thin client depends heavily on the server; the extreme case is a mainframe terminal. A full copy of the data and offline work are signs of a thick client.',
      },
      hint: {
        ru: 'Смотрите третий абзац раздела «Как это работает».',
        en: 'See the third paragraph of the "How it works" section.',
      },
    },
    {
      question: {
        ru: 'Клиент в примере уже проверил формат email. Зачем сервер проверяет его снова?',
        en: 'The client in the example has already checked the email format. Why does the server check it again?',
      },
      options: [
        { ru: 'Сервер проверяет формат быстрее браузера, поэтому так ответ приходит раньше', en: 'The server checks the format faster than the browser, so the reply arrives sooner' },
        { ru: 'Клиентскую проверку можно обойти, отправив запрос не из формы', en: 'The client\'s check can be bypassed by sending a request outside the form' },
        { ru: 'В браузере регулярные выражения работают не так, как на сервере', en: 'Regular expressions in the browser behave differently from the server' },
        { ru: 'Вторая проверка нужна только затем, чтобы привести адрес к нижнему регистру', en: 'The second check is needed only to bring the address to lower case' },
      ],
      correct: 1,
      explanation: {
        ru: 'Запрос может прийти из консоли, скрипта или чужой программы. Проверка на клиенте - удобство для пользователя, защита - только на сервере.',
        en: 'A request may come from the console, a script, or someone else\'s program. The client\'s check is a convenience for the user; protection exists only on the server.',
      },
      hint: {
        ru: 'Смотрите шаги «Сервер не доверяет запросу» и «Проверка формата - для удобства» на вкладке «Реализация».',
        en: 'See the "The server does not trust the request" and "The format check - for convenience" steps on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Ответ сервера потерялся в сети, и клиент повторяет запрос с тем же `requestId`. Что ответит сервер?',
        en: 'The server\'s reply got lost in the network, and the client repeats the request with the same `requestId`. What does the server answer?',
      },
      options: [
        { ru: 'Зарегистрирует адрес второй раз, и в списке появится дубликат', en: 'It registers the address a second time, and a duplicate appears' },
        { ru: '«Email already registered», ведь адрес уже записан первым запросом', en: '"Email already registered", since the first request saved it' },
        { ru: 'Вернёт сохранённый первый ответ, не выполняя регистрацию заново', en: 'It returns the saved first reply without registering again' },
        { ru: 'Ничего: сервер молча отбрасывает любые повторы от одного клиента', en: 'Nothing: the server silently drops any repeat from one client' },
      ],
      correct: 2,
      explanation: {
        ru: 'Сервер выполняет регистрацию только для нового ключа и хранит ответ под ним. Без ключа повтор упёрся бы в проверку уникальности и показал бы ошибку вместо успеха.',
        en: 'The server registers only for a new key and keeps the reply under it. Without the key, the retry would hit the uniqueness check and show an error instead of success.',
      },
      hint: {
        ru: 'Смотрите шаг «Повтор с тем же ключом» на вкладке «Реализация».',
        en: 'See the "A retry with the same key" step on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Почему сервер в примере возвращает ошибку данными `{ ok: false, error }`, а не бросает исключение?',
        en: 'Why does the example server return an error as data `{ ok: false, error }` instead of throwing?',
      },
      options: [
        { ru: 'В JavaScript исключения можно бросать только внутри конструктора класса', en: 'In JavaScript exceptions can be thrown only inside a class constructor' },
        { ru: 'Чтобы клиент вообще не смог узнать, что на сервере что-то пошло не так', en: 'So the client cannot find out at all that something went wrong on the server' },
        { ru: 'Потому что функция с `async` не умеет бросать исключения наружу', en: 'Because a function marked `async` cannot throw exceptions outward' },
        { ru: 'Исключение не пересылается по сети: границу проходят только данные', en: 'An exception cannot travel over a network: only data crosses the boundary' },
      ],
      correct: 3,
      explanation: {
        ru: 'Между клиентом и сервером нет общих объектов, только сериализованные сообщения. `JSON.stringify(new Error(\'x\'))` даёт `{}`, поэтому ошибка должна быть частью ответа.',
        en: 'Client and server share no objects, only serialised messages. `JSON.stringify(new Error(\'x\'))` gives `{}`, so the error has to be part of the reply.',
      },
      hint: {
        ru: 'Смотрите шаг «Правила на сервере» на вкладке «Реализация».',
        en: 'See the "The rules on the server" step on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Клиент B не видит адрес, который только что зарегистрировал клиент A, пока не нажмёт «Refresh list». Это ошибка в коде?',
        en: 'Client B does not see the address client A has just registered until it presses "Refresh list". Is this a bug?',
      },
      options: [
        { ru: 'Да: сервер должен был сам разослать новый список всем подключённым клиентам', en: 'Yes: the server should have sent the new list to every connected client itself' },
        { ru: 'Да: клиенты должны были синхронизировать свои списки друг с другом напрямую', en: 'Yes: the clients should have synchronised their lists with each other directly' },
        { ru: 'Нет: адрес клиента A вообще хранится только у клиента A и больше нигде', en: 'No: client A\'s address is stored only at client A and nowhere else at all' },
        { ru: 'Нет: у клиента только копия из последнего ответа, истина на сервере', en: 'No: a client has only a copy from its last reply; the truth is on the server' },
      ],
      correct: 3,
      explanation: {
        ru: 'В примере сервер первым к клиентам не обращается, а клиенты друг с другом не общаются, поэтому свежие данные клиент получает, только спросив сервер. Рассылку через WebSocket можно добавить, но это доработка, а не исправление ошибки.',
        en: 'In the example the server does not contact clients first, and clients do not talk to each other, so a client gets fresh data only by asking the server. Pushing over WebSocket could be added, but that is an enhancement, not a bug fix.',
      },
      hint: {
        ru: 'Смотрите шаг «У каждого клиента только копия» на вкладке «Схема».',
        en: 'See the "Each client holds only a copy" step on the "Diagram" tab.',
      },
    },
    {
      question: {
        ru: 'Чем слой (layer) отличается от уровня (tier), и про что из них клиент-серверная архитектура?',
        en: 'How does a layer differ from a tier, and which of them is client-server architecture about?',
      },
      options: [
        { ru: 'Это синонимы, а клиент-сервер - просто слоистая архитектура из двух слоёв', en: 'They are synonyms, and client-server is just a layered architecture of two layers' },
        { ru: 'Слой - деление кода, уровень - отдельный процесс или машина; клиент-сервер - про уровни', en: 'A layer divides code, a tier is a separate process or machine; client-server is about tiers' },
        { ru: 'Уровень - логическое деление кода, слой - отдельная машина или процесс; клиент-сервер - про слои', en: 'A tier is a logical division of code, a layer a separate machine or process; client-server is about layers' },
        { ru: 'Слои бывают только на сервере, уровни - только на клиенте, а клиент-сервер связывает их', en: 'Layers exist only on the server, tiers only on the client, and client-server links the two' },
      ],
      correct: 1,
      explanation: {
        ru: 'Слои описывают, как разделён код, уровни - где он работает. Клиент и сервер - разные процессы, то есть уровни, и каждый из них внутри может быть слоистым.',
        en: 'Layers describe how code is divided, tiers where it runs. Client and server are separate processes, that is tiers, and each may be layered inside.',
      },
      hint: {
        ru: 'Смотрите четвёртый абзац раздела «Как это работает».',
        en: 'See the fourth paragraph of the "How it works" section.',
      },
    },
    {
      question: {
        ru: 'Чем клиент-серверная архитектура отличается от peer-to-peer?',
        en: 'How does client-server architecture differ from peer-to-peer?',
      },
      options: [
        { ru: 'Peer-to-peer работает только в локальной сети, а клиент-сервер - только через интернет', en: 'Peer-to-peer works only on a local network, and client-server only over the Internet' },
        { ru: 'В peer-to-peer тоже есть сервер, но он хранит только правила, а данные лежат у клиентов', en: 'Peer-to-peer has a server too, but it keeps only the rules, while the data sits with clients' },
        { ru: 'В peer-to-peer узлы равноправны и общаются напрямую, а единого источника истины нет', en: 'In peer-to-peer the nodes are equals that talk directly, with no single source of truth' },
        { ru: 'Разницы нет: peer-to-peer - это клиент-сервер, в котором серверов несколько штук', en: 'There is none: peer-to-peer is just client-server with several servers instead of one' },
      ],
      correct: 2,
      explanation: {
        ru: 'В peer-to-peer каждый узел одновременно клиент и сервер, и узлам приходится сводить данные между собой. Клиент-сервер держит одну истину на сервере ценой единой точки отказа.',
        en: 'In peer-to-peer each node is a client and a server at once, and the nodes have to reconcile data among themselves. Client-server keeps one truth on the server at the price of a single point of failure.',
      },
      hint: {
        ru: 'Смотрите последний абзац раздела «Как это работает».',
        en: 'See the last paragraph of the "How it works" section.',
      },
    },
    {
      question: {
        ru: 'Настольное приложение на 200 компьютерах ходит прямо в общую базу данных, и правила проверки скопированы в каждый клиент. Что даст переход на трёхуровневую схему?',
        en: 'A desktop application on 200 computers goes straight to a shared database, and the validation rules are copied into every client. What does moving to a three-tier setup give?',
      },
      options: [
        { ru: 'Ничего: три уровня отличаются от двух только тем, сколько серверов стоит в стойке', en: 'Nothing: three tiers differ from two only in how many servers stand in the rack' },
        { ru: 'Каждый клиент получит свою полную копию базы и сможет работать без сети', en: 'Each client gets its own full copy of the database and can then keep working without a network' },
        { ru: 'База переедет на компьютеры пользователей, а сервер будет хранить только резервные копии', en: 'The database moves onto the users\' computers, and the server keeps only the backups' },
        { ru: 'Сервер приложений посередине: правила в одном месте, база скрыта от клиентов', en: 'An application server in between: rules in one place, the database hidden from clients' },
      ],
      correct: 3,
      explanation: {
        ru: 'В двухуровневой схеме база открыта каждому клиенту, а правила расползаются по клиентам. Сервер приложений посередине держит правила в одном месте и сам ходит в базу.',
        en: 'In a two-tier setup the database is open to every client, and the rules spread across the clients. An application server in the middle keeps the rules in one place and talks to the database itself.',
      },
      hint: {
        ru: 'Смотрите пункт «Два уровня или три» в разделе «Нюансы выбора».',
        en: 'See the "Two tiers or three" point in the "Choice nuances" section.',
      },
    },
  ],
};

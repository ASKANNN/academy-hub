export const hexagonal = {
  slug: 'hexagonal',
  category: 'structure',
  name: { ru: 'Гексагональная архитектура', en: 'Hexagonal Architecture' },
  popularity: 2,
  tags: ['structure', 'ports-and-adapters', 'dependency-inversion'],

  intent: {
    ru: 'Гексагональная архитектура (Hexagonal Architecture), её второе название - Порты и адаптеры (Ports and Adapters), ставит бизнес-правила в центр приложения и отделяет их от всего внешнего: интерфейса, базы данных, тестов. Ядро объявляет порты - интерфейсы, через которые с ним можно говорить и через которые оно само просит данные, - а снаружи к портам подключаются адаптеры. Все зависимости направлены внутрь, к ядру, поэтому интерфейс или хранилище можно заменить другим адаптером того же порта, не меняя ни строчки в правилах.',
    en: 'Hexagonal Architecture, also known as Ports and Adapters, puts the business rules at the centre of an application and separates them from everything external: the UI, the database, the tests. The core declares ports - interfaces through which others talk to it and through which it asks for data - and adapters plug into those ports from outside. Every dependency points inward, toward the core, so the UI or the storage can be replaced by another adapter for the same port without changing a single line of the rules.',
  },

  problem: {
    ru: 'В **слоистой архитектуре** бизнес-слой вызывает слой хранения и зависит от него: сервис регистрации знает репозиторий, а репозиторий - устройство базы. Правило «email должен быть уникальным» оказывается привязано к хранилищу: интерфейс репозитория определяет слой хранения, а не правила, и когда он меняется, вместе с ним меняются сервис и заглушки в его тестах. Ещё хуже со входами: форма, API и автотест хотят вызывать одни и те же правила, но слоистая схема рисует только один вход сверху и не говорит, как подключить остальные.',
    en: 'In a **layered architecture** the business layer calls the persistence layer and depends on it: the registration service knows the repository, and the repository knows how the database is laid out. The rule "the email must be unique" ends up tied to storage: the repository\'s interface is defined by the persistence layer rather than by the rules, and when it changes, the service and the stubs in its tests change with it. Entry points are worse still: a form, an API, and an automated test all want to call the same rules, but the layered picture draws only one entrance at the top and says nothing about plugging in the others.',
  },

  solution: {
    ru: 'В центре - **ядро** с правилами предметной области. Оно объявляет два вида **портов**: ведущий порт (что ядро умеет - например, `register` и `listEmails`) и ведомый порт (что ядру нужно от мира - например, хранилище с методами `has`, `add`, `all`). Снаружи стоят **адаптеры**. **Ведущие адаптеры** (форма, тест, API) вызывают ведущий порт. **Ведомые адаптеры** (хранилище в памяти, `localStorage`, база) реализуют ведомый порт. Ядро не знает ни одного адаптера по имени, а адаптеры зависят от ядра: ведущие вызывают его порт, ведомые реализуют порт, который оно объявило. Поэтому адаптер можно заменить любым другим адаптером того же порта, не трогая ядро.',
    en: 'At the centre is the **core** with the domain rules. It declares two kinds of **ports**: a driving port (what the core can do - for example, `register` and `listEmails`) and a driven port (what the core needs from the world - for example, a store with `has`, `add`, and `all` methods). Outside sit the **adapters**. **Driving adapters** (a form, a test, an API) call the driving port. **Driven adapters** (an in-memory store, `localStorage`, a database) implement the driven port. The core knows no adapter by name, while the adapters depend on the core: driving ones call its port, driven ones implement the port it declared. So an adapter can be swapped for any other adapter of the same port without touching the core.',
  },

  diagram: {
    layout: 'hexagon',
    ports: {
      left: { ru: 'Регистрация', en: 'Registration' },
      right: { ru: 'Хранилище', en: 'User store' },
    },
    nodes: [
      {
        id: 'core',
        label: { ru: 'Ядро', en: 'Core' },
        note: { ru: 'правила регистрации', en: 'registration rules' },
        role: {
          ru: 'Бизнес-правила и порты. Ведущий порт - методы `register` и `listEmails`, ведомый - список методов хранилища `UserStorePort`. На схеме ведущий порт - метка «Регистрация» на левой грани шестиугольника, ведомый - «Хранилище» на правой. Ядро не импортирует ни один адаптер и не знает ни про `document`, ни про `localStorage`, поэтому ни одна стрелка из него не выходит.',
          en: 'The business rules and the ports. The driving port is the `register` and `listEmails` methods; the driven port is the `UserStorePort` list of store methods. On the diagram the driving port is the "Registration" mark on the hexagon\'s left face, the driven port is "User store" on the right face. The core imports no adapter and knows nothing about `document` or `localStorage`, which is why no arrow leaves it.',
        },
      },
      {
        id: 'form',
        side: 'left',
        label: { ru: 'Форма', en: 'Form' },
        role: {
          ru: 'Ведущий адаптер. Переводит отправку HTML-формы в вызов `register`, а ответ ядра или текст ошибки - обратно в текст на странице; список адресов берёт через `listEmails`. Правил не знает, только переводит между браузером и ведущим портом.',
          en: 'A driving adapter. Turns an HTML form submit into a `register` call, and the core\'s answer or error text back into text on the page; it gets the address list through `listEmails`. It knows no rules - it only translates between the browser and the driving port.',
        },
      },
      {
        id: 'memory',
        side: 'right',
        label: { ru: 'В памяти', en: 'In-memory' },
        role: {
          ru: 'Ведомый адаптер `InMemoryUserStore`: реализует порт хранилища на обычном `Set`. Данные живут, пока существует сам объект: в примере его использует только самопроверка, и тесту этого достаточно.',
          en: 'The `InMemoryUserStore` driven adapter: implements the store port on a plain `Set`. The data lives only as long as the object itself: in the example only the self-check uses it, and that is all a test needs.',
        },
      },
      {
        id: 'browser-storage',
        side: 'right',
        label: { ru: 'localStorage', en: 'localStorage' },
        role: {
          ru: 'Ведомый адаптер `LocalStorageUserStore`: реализует тот же порт поверх `localStorage` браузера, так что адреса переживают перезагрузку страницы. Для ядра он неотличим от адаптера в памяти.',
          en: 'The `LocalStorageUserStore` driven adapter: implements the same port on top of the browser\'s `localStorage`, so the addresses survive a page reload. To the core it is indistinguishable from the in-memory adapter.',
        },
      },
      {
        id: 'tests',
        side: 'left',
        label: { ru: 'Тест-драйвер', en: 'Test driver' },
        role: {
          ru: 'Второй ведущий адаптер - самопроверка `runSelfCheck`. Вызывает тот же ведущий порт, что и форма, но без браузерной формы и со своим экземпляром ядра на адаптере в памяти. Это одна из целей, ради которых Кокберн придумал паттерн: чтобы приложением одинаково могли управлять люди и автотесты.',
          en: 'A second driving adapter - the `runSelfCheck` self-test. It calls the same driving port as the form, but with no browser form and with its own core instance on the in-memory adapter. This is one of the goals Cockburn devised the pattern for: so that people and automated tests can drive the application equally.',
        },
      },
    ],
    connections: [
      { from: 'form', to: 'core', label: { ru: 'вызывает', en: 'calls' } },
      { from: 'memory', to: 'core', label: { ru: 'реализует', en: 'implements' } },
      { from: 'browser-storage', to: 'core', label: { ru: 'реализует', en: 'implements' } },
      { from: 'tests', to: 'core', label: { ru: 'вызывает', en: 'calls' } },
    ],
  },

  steps: [
    {
      title: { ru: 'Ядро объявляет порты', en: 'The core declares its ports' },
      explanation: {
        ru: 'Ядро описывает, что оно умеет (ведущий порт: `register`, `listEmails`), и что ему нужно от мира (ведомый порт: хранилище с методами `has`, `add`, `all`). Оба порта принадлежат ядру и сформулированы на языке предметной области, а не на языке HTML или конкретной базы.',
        en: 'The core describes what it can do (the driving port: `register`, `listEmails`) and what it needs from the world (the driven port: a store with `has`, `add`, and `all`). Both ports belong to the core and are phrased in the domain\'s language, not in terms of HTML or a particular database.',
      },
    },
    {
      title: { ru: 'Ведущий адаптер вызывает порт', en: 'A driving adapter calls the port' },
      explanation: {
        ru: 'Пользователь отправляет форму, и адаптер формы вызывает `register` со строкой из поля. Тест-драйвер делает то же самое без браузерной формы. Для ядра эти два вызова одинаковы: оно не знает, кто его вызвал.',
        en: 'The user submits the form, and the form adapter calls `register` with the field\'s string. The test driver does the same with no browser form. To the core the two calls are identical: it does not know who called it.',
      },
    },
    {
      title: { ru: 'Ядро применяет правила через ведомый порт', en: 'The core applies the rules through the driven port' },
      explanation: {
        ru: 'Ядро нормализует email, проверяет формат, а для проверки уникальности спрашивает ведомый порт: `has(email)`. Какой адаптер стоит за портом, ядро не знает - оно получило объект с нужными методами при сборке.',
        en: 'The core normalises the email, checks its format, and asks the driven port `has(email)` to check uniqueness. The core does not know which adapter stands behind the port - it received an object with the right methods at assembly time.',
      },
    },
    {
      title: { ru: 'Ведомый адаптер выполняет запрос', en: 'A driven adapter does the work' },
      explanation: {
        ru: 'Адаптер в памяти смотрит в `Set`, адаптер `localStorage` читает JSON из браузера. Вызов идёт из ядра наружу, но стрелка на схеме направлена к ядру: это стрелка зависимости, а не вызова. Адаптер реализует порт, описанный ядром, и поэтому зависит от ядра, а не наоборот.',
        en: 'The in-memory adapter looks into a `Set`; the `localStorage` adapter reads JSON from the browser. The call goes from the core outward, yet the arrow on the diagram points to the core: it is a dependency arrow, not a call arrow. The adapter implements a port the core described, so it depends on the core and not the other way round.',
      },
    },
    {
      title: { ru: 'Сборка выбирает адаптеры', en: 'Assembly picks the adapters' },
      explanation: {
        ru: 'Только точка сборки в конце программы знает и ядро, и конкретные адаптеры. Форма получает ядро с `localStorage`, самопроверка - отдельный экземпляр того же ядра с хранилищем в памяти, а схема показывает само ядро и все четыре адаптера, которые к нему подключаются. Чтобы поменять хранилище, достаточно поменять одну строку сборки, ядро остаётся прежним.',
        en: 'Only the assembly point at the end of the program knows both the core and the concrete adapters. The form gets a core with `localStorage`, the self-check gets a separate instance of the same core with the in-memory store, while the diagram shows the core itself and all four adapters that plug into it. Changing the storage takes changing one assembly line, and the core stays as it is.',
      },
    },
  ],

  implementation: {
    javascript: `const UserStorePort = ['has', 'add', 'all'];

function assertImplements(adapter, port) {
  for (const method of port) {
    if (typeof adapter[method] !== 'function') {
      throw new Error('Adapter is missing ' + method);
    }
  }
}

class Registration {
  constructor(users) {
    assertImplements(users, UserStorePort);
    this.users = users;
  }

  register(rawEmail) {
    const email = rawEmail.trim().toLowerCase();
    if (!/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(email)) {
      throw new Error('Invalid email');
    }
    if (this.users.has(email)) {
      throw new Error('Email already registered');
    }
    this.users.add(email);
    return email;
  }

  listEmails() {
    return this.users.all();
  }
}

class InMemoryUserStore {
  constructor() {
    this.emails = new Set();
  }

  has(email) {
    return this.emails.has(email);
  }

  add(email) {
    this.emails.add(email);
  }

  all() {
    return [...this.emails];
  }
}

class LocalStorageUserStore {
  constructor(key) {
    this.key = key;
  }

  has(email) {
    return this.all().includes(email);
  }

  add(email) {
    localStorage.setItem(this.key, JSON.stringify([...this.all(), email]));
  }

  all() {
    return JSON.parse(localStorage.getItem(this.key) ?? '[]');
  }
}

class RegistrationForm {
  constructor(root, registration) {
    this.registration = registration;
    this.input = root.querySelector('input');
    this.message = root.querySelector('p');
    this.list = root.querySelector('ul');
    root.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();
      this.submit();
    });
    this.renderList();
  }

  submit() {
    try {
      const email = this.registration.register(this.input.value);
      this.message.textContent = 'Registered: ' + email;
      this.input.value = '';
    } catch (error) {
      this.message.textContent = error.message;
    }
    this.renderList();
  }

  renderList() {
    const items = this.registration.listEmails().map((email) =>
      Object.assign(document.createElement('li'), { textContent: email }));
    this.list.replaceChildren(...items);
  }
}

function runSelfCheck() {
  const registration = new Registration(new InMemoryUserStore());
  registration.register('Ann@Example.com');
  try {
    registration.register(' ann@example.COM ');
    return false;
  } catch (error) {
    return error.message === 'Email already registered';
  }
}

const root = document.querySelector('#app');
root.innerHTML = \`
  <form>
    <input placeholder="you@example.com">
    <button>Register</button>
  </form>
  <p></p>
  <ul></ul>
  <small></small>\`;

new RegistrationForm(root, new Registration(new LocalStorageUserStore('users')));
root.querySelector('small').textContent =
  'Self-check: ' + (runSelfCheck() ? 'passed' : 'failed');`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1, 1],
        title: { ru: 'Ведомый порт - контракт ядра', en: 'The driven port - the core\'s contract' },
        explanation: {
          ru: 'В JavaScript нет интерфейсов, поэтому порт записан явно: список методов, которые ядру нужны от любого хранилища. Важно, где он живёт - рядом с ядром. Порт сформулирован по потребностям ядра («есть ли такой адрес», «добавь», «все адреса»), а не по возможностям конкретной базы.',
          en: 'JavaScript has no interfaces, so the port is written down explicitly: the list of methods the core needs from any store. What matters is where it lives - next to the core. The port is phrased by the core\'s needs ("is this address taken", "add it", "all addresses"), not by what a particular database can do.',
        },
      },
      {
        lines: [3, 9],
        title: { ru: 'Проверка, что адаптер подходит к порту', en: 'Checking that an adapter fits the port' },
        explanation: {
          ru: '`assertImplements` проходит по методам порта и падает с понятной ошибкой, если адаптер какой-то метод не реализовал. Так несовместимый адаптер обнаруживается сразу при сборке, а не посреди регистрации.',
          en: '`assertImplements` walks the port\'s methods and fails with a clear error if the adapter is missing one. That way an incompatible adapter is caught right at assembly, not halfway through a registration.',
        },
      },
      {
        lines: [11, 15],
        title: { ru: 'Ядро получает порт, а не адаптер', en: 'The core receives a port, not an adapter' },
        explanation: {
          ru: '`Registration` принимает любой объект, подходящий к `UserStorePort`. Сравните со слоистой архитектурой: там `UserService` получал `UserRepository`, то есть конкретный класс слоя ниже. Здесь ядро не называет ни одного класса хранилища - в реальном проекте этот файл не импортировал бы ни один адаптер.',
          en: '`Registration` accepts any object that fits `UserStorePort`. Compare with layered architecture: there `UserService` received `UserRepository`, a concrete class of the layer below. Here the core names no store class at all - in a real project this file would import no adapter.',
        },
      },
      {
        lines: [17, 21],
        title: { ru: 'Правило формата', en: 'The format rule' },
        explanation: {
          ru: 'Правила те же, что и в примере слоистой архитектуры: убрать пробелы по краям, привести к нижнему регистру, проверить формат. Внешне код почти не изменился - изменилось только то, от чего он зависит.',
          en: 'The rules are the same as in the layered example: trim the surrounding spaces, lower the case, check the format. The code looks almost unchanged - only what it depends on has changed.',
        },
      },
      {
        lines: [22, 27],
        title: { ru: 'Уникальность через ведомый порт', en: 'Uniqueness through the driven port' },
        explanation: {
          ru: 'Ядро спрашивает `this.users.has(email)` и сохраняет через `add`. Это вызов наружу, но ядро знает только порт: за ним может стоять `Set`, `localStorage` или что угодно ещё с теми же тремя методами.',
          en: 'The core asks `this.users.has(email)` and saves through `add`. This is a call outward, but the core knows only the port: behind it may be a `Set`, `localStorage`, or anything else with the same three methods.',
        },
      },
      {
        lines: [29, 32],
        title: { ru: 'Ведущий порт - публичные методы ядра', en: 'The driving port - the core\'s public methods' },
        explanation: {
          ru: '`register` и `listEmails` вместе и есть ведущий порт: всё, что внешний мир может попросить у ядра. Любой ведущий адаптер - форма, тест, будущий API - пользуется только этими двумя методами.',
          en: '`register` and `listEmails` together are the driving port: everything the outside world can ask of the core. Every driving adapter - the form, the test, a future API - uses only these two methods.',
        },
      },
      {
        lines: [34, 50],
        title: { ru: 'Адаптер в памяти', en: 'The in-memory adapter' },
        explanation: {
          ru: 'Самый простой ведомый адаптер: три метода порта поверх `Set`. Кокберн в исходной статье предлагает именно такой адаптер - базу «в памяти», которая не требует настоящей базы данных, - чтобы проверять ядро быстро и без инфраструктуры.',
          en: 'The simplest driven adapter: the port\'s three methods on top of a `Set`. Cockburn\'s original article suggests exactly this kind of adapter - an in-memory "database" that needs no real database - to check the core quickly and with no infrastructure.',
        },
      },
      {
        lines: [52, 68],
        title: { ru: 'Адаптер localStorage', en: 'The localStorage adapter' },
        explanation: {
          ru: 'Тот же порт, другая технология: список адресов хранится в `localStorage` как JSON и переживает перезагрузку. Подмена работает, потому что методы синхронные: ядро вызывает порт без `await`. Сетевое хранилище в JavaScript асинхронно - тогда пришлось бы сделать асинхронным сам порт, а это осознанная правка ядра, а не адаптера.',
          en: 'The same port, another technology: the address list is kept in `localStorage` as JSON and survives a reload. The swap works because the methods are synchronous: the core calls the port without `await`. Networked storage is asynchronous in JavaScript - the port itself would then have to become asynchronous, and that is a deliberate change to the core, not to an adapter.',
        },
      },
      {
        lines: [70, 81],
        title: { ru: 'Адаптер формы находит элементы', en: 'The form adapter finds its elements' },
        explanation: {
          ru: 'Ведущий адаптер получает ядро и элементы страницы. `preventDefault()` не даёт браузеру перезагрузить страницу при отправке формы. Адаптер знает ядро, а ядро про форму не знает ничего - это и есть зависимость, направленная внутрь.',
          en: 'The driving adapter receives the core and the page elements. `preventDefault()` stops the browser from reloading the page on form submit. The adapter knows the core while the core knows nothing about the form - that is the inward-pointing dependency.',
        },
      },
      {
        lines: [83, 99],
        title: { ru: 'Перевод между браузером и портом', en: 'Translating between the browser and the port' },
        explanation: {
          ru: '`submit` отдаёт строку из поля ведущему порту и показывает ответ или текст исключения. `renderList` строит список из `li` с `textContent`, поэтому адрес вроде `<b>x</b>@y.io` покажется как текст, а не станет разметкой.',
          en: '`submit` hands the field\'s string to the driving port and shows the answer or the exception text. `renderList` builds the list from `li` elements with `textContent`, so an address such as `<b>x</b>@y.io` shows as text instead of turning into markup.',
        },
      },
      {
        lines: [101, 110],
        title: { ru: 'Тест-драйвер - второй ведущий адаптер', en: 'The test driver - a second driving adapter' },
        explanation: {
          ru: '`runSelfCheck` собирает своё ядро с адаптером в памяти и через тот же ведущий порт проверяет правило: `Ann@Example.com` и ` ann@example.COM ` - один адрес, второй раз зарегистрировать его нельзя. Ни браузерной формы, ни `localStorage` для этого не нужно.',
          en: '`runSelfCheck` assembles its own core with the in-memory adapter and checks a rule through the same driving port: `Ann@Example.com` and ` ann@example.COM ` are one address, and it cannot be registered twice. No browser form and no `localStorage` are needed.',
        },
      },
      {
        lines: [112, 120],
        title: { ru: 'Разметка экрана', en: 'The screen markup' },
        explanation: {
          ru: 'Статичная разметка: форма, строка для сообщения, список и строка для результата самопроверки. Пользовательских данных в ней нет, поэтому `innerHTML` здесь безопасен.',
          en: 'Static markup: the form, a line for the message, the list, and a line for the self-check result. It contains no user data, so `innerHTML` is safe here.',
        },
      },
      {
        lines: [122, 124],
        title: { ru: 'Точка сборки', en: 'The assembly point' },
        explanation: {
          ru: 'Единственное место, которое знает и ядро, и конкретные адаптеры. Одна программа запускает ядро дважды с разными ведомыми адаптерами: форму - с `localStorage`, самопроверку - с памятью. Чтобы форма хранила адреса только в памяти, достаточно заменить `new LocalStorageUserStore(\'users\')` на `new InMemoryUserStore()` в строке 122.',
          en: 'The only place that knows both the core and the concrete adapters. One program runs the core twice with different driven adapters: the form with `localStorage`, the self-check with memory. To make the form keep addresses in memory only, replace `new LocalStorageUserStore(\'users\')` with `new InMemoryUserStore()` on line 122.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'Бизнес-правила проверяются без браузера, базы и сети: тест подключает ядро к адаптеру в памяти и работает за миллисекунды, как `runSelfCheck` в примере.',
      en: 'The business rules are tested with no browser, database, or network: a test plugs the core into an in-memory adapter and runs in milliseconds, like `runSelfCheck` in the example.',
    },
    {
      ru: 'Технологию снаружи можно заменить, не трогая ядро, пока она подходит к тому же порту: другое хранилище - это новый ведомый адаптер, новый вход (API, командная строка, очередь) - новый ведущий адаптер.',
      en: 'The technology outside can be replaced without touching the core, as long as it fits the same port: different storage is a new driven adapter, a new entry point (an API, a command line, a queue) is a new driving adapter.',
    },
    {
      ru: 'Правила не зависят от фреймворка и базы, поэтому выбор конкретной базы или фреймворка можно отложить: ядро пишется и тестируется раньше, чем выбрана инфраструктура.',
      en: 'The rules depend on no framework or database, so picking a particular database or framework can be postponed: the core is written and tested before the infrastructure is chosen.',
    },
  ],
  cons: [
    {
      ru: 'Больше кода и косвенности: порт, отдельный класс на каждый адаптер, сборка в одном месте. Для простого приложения «прочитать запись и показать» это церемония без пользы.',
      en: 'More code and indirection: a port, a separate class for each adapter, assembly in one place. For a simple "read a record and show it" application this is ceremony without benefit.',
    },
    {
      ru: 'Порт легко спроектировать плохо: если он повторяет одну технологию (метод `query(sql)`), адаптер просачивается в ядро, а если он слишком мелкий, ядро обрастает десятками портов.',
      en: 'A port is easy to design badly: if it mirrors one technology (a `query(sql)` method), the adapter leaks into the core, and if it is too fine-grained, the core grows dozens of ports.',
    },
    {
      ru: 'Паттерн говорит только о границе ядра: как устроить код внутри, сколько портов заводить и как их называть, команда решает сама, и разные проекты понимают «гексагональность» по-разному.',
      en: 'The pattern speaks only about the core\'s boundary: how to arrange the code inside, how many ports to have, and what to call them is up to the team, and different projects read "hexagonal" differently.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда бизнес-правила сложные и живут долго, а входов и хранилищ несколько или они будут меняться: веб-форма и API, база в продакшене и память в тестах.',
      en: 'When the business rules are complex and long-lived, and there are several entry points and storage systems, or they will change: a web form and an API, a database in production and memory in tests.',
    },
    {
      ru: 'Когда правила нужно быстро проверять автотестами, не поднимая базу и не открывая браузер, например при разработке через тесты (TDD).',
      en: 'When the rules need to be checked quickly by automated tests without starting a database or opening a browser, for example in test-driven development (TDD).',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Netflix** - в техническом блоге команда описала (статья «Ready for changes with Hexagonal Architecture»), как построила сервис по портам и адаптерам, чтобы менять источники данных, не трогая бизнес-логику.',
      en: '**Netflix** - the engineering team described on its tech blog (the post "Ready for changes with Hexagonal Architecture") how it built a service with ports and adapters so it could swap data sources without touching the business logic.',
    },
    {
      ru: '**Domain-Driven Design** - Вон Вернон в книге «Implementing Domain-Driven Design» (2013) предлагает гексагональную архитектуру как основу для приложения с богатой моделью предметной области: модель в центре, а интерфейсы, сообщения и хранилища подключаются через адаптеры.',
      en: '**Domain-Driven Design** - Vaughn Vernon in "Implementing Domain-Driven Design" (2013) presents hexagonal architecture as the basis for an application with a rich domain model: the model at the centre, with interfaces, messaging, and storage plugged in through adapters.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: 'Паттерн придумал **Алистер Кокберн** и в 2005 году описал его в статье **«Hexagonal (Ports & Adapters) Architecture»** (технический отчёт HaT). Сам паттерн в статье называется **Ports and Adapters**, а «гексагональная архитектура» указана как второе имя - в итоге прижились оба. Цель он сформулировал так: позволить приложению одинаково управляться пользователями, программами, автотестами или пакетными скриптами и разрабатываться и тестироваться в изоляции от устройств и баз данных, с которыми оно будет работать. В 2024 году Кокберн и Хуан Мануэль Гарридо де Пас выпустили книгу «Hexagonal Architecture Explained» - подробное изложение паттерна от его автора.',
        en: 'The pattern was devised by **Alistair Cockburn**, who described it in 2005 in the article **"Hexagonal (Ports & Adapters) Architecture"** (a HaT technical report). In the article the pattern itself is named **Ports and Adapters**, with "hexagonal architecture" given as its other name - and both stuck. He stated its intent like this: allow an application to equally be driven by users, programs, automated tests, or batch scripts, and to be developed and tested in isolation from its eventual run-time devices and databases. In 2024 Cockburn and Juan Manuel Garrido de Paz published "Hexagonal Architecture Explained", a detailed account of the pattern by its author.',
      },
      {
        ru: '**Шестиугольник** ничего не считает. Граней шесть не потому, что портов должно быть шесть: Кокберну нужна была фигура, на которой хватает места нарисовать столько портов и адаптеров, сколько понадобится, и которая не сводится к одномерной стопке слоёв с «верхом» и «низом». Главное на такой схеме - граница между внутренним и внешним: внутри ядро, снаружи все остальные, и порты по краям устроены одинаково.',
        en: 'The **hexagon** counts nothing. It has six sides not because there must be six ports: Cockburn wanted a shape with room to draw as many ports and adapters as needed, and one not confined to a one-dimensional stack of layers with a "top" and a "bottom". What such a picture stresses is the boundary between inside and outside: the core inside, everyone else outside, and the ports around the edge all alike.',
      },
      {
        ru: '**Порт** у Кокберна - это осмысленный разговор с приложением, оформленный как API: «зарегистрировать пользователя», «сохранить и найти адреса». **Адаптер** переводит этот API в сигналы конкретного устройства и обратно. К одному порту подключается сколько угодно адаптеров: в статье к одному порту подключены и графический интерфейс, и тестовый стенд FIT, а к порту базы - и настоящая база, и её заменитель в памяти.',
        en: 'A **port** for Cockburn is a purposeful conversation with the application, shaped as an API: "register a user", "store and find addresses". An **adapter** converts that API into the signals of a particular device and back. Any number of adapters can plug into one port: in the article both a GUI and the FIT test harness plug into one port, and both a real database and an in-memory stand-in plug into the database port.',
      },
      {
        ru: 'Стороны шестиугольника несимметричны. Слева (или сверху) **первичные** (primary), или **ведущие** (driving), участники - те, кто запускает приложение: пользователь, тест, другая программа. Справа (или снизу) **вторичные** (secondary), или **ведомые** (driven), - те, кого приложение использует само: база, почта, внешний сервис. Ведущий адаптер вызывает порт, ведомый адаптер реализует порт. Направление вызова разное, а направление зависимости одно - внутрь.',
        en: 'The sides of the hexagon are not symmetric. On the left (or top) are the **primary**, or **driving**, actors - the ones who start the application: a user, a test, another program. On the right (or bottom) are the **secondary**, or **driven**, actors - the ones the application uses itself: a database, mail, an external service. A driving adapter calls a port; a driven adapter implements one. The direction of the call differs, but the direction of dependency is the same - inward.',
      },
      {
        ru: 'В этом главное отличие от **слоистой архитектуры**. Там `UserService` получает `UserRepository` и зависит от слоя хранения. Здесь ядро само объявляет `UserStorePort`, а хранилище подстраивается под него - это **инверсия зависимостей** (Dependency Inversion Principle Роберта Мартина), применённая ко всей границе приложения. Код правил при этом почти не меняется: в примере `register` такой же, как в слоистом, а меняется только то, кто от кого зависит.',
        en: 'This is the main difference from **layered architecture**. There `UserService` receives a `UserRepository` and depends on the persistence layer. Here the core declares `UserStorePort` itself, and the storage adapts to it - that is **dependency inversion** (Robert Martin\'s Dependency Inversion Principle) applied to the whole boundary of the application. The rule code barely changes: in the example `register` is the same as in the layered one, and only who depends on whom changes.',
      },
      {
        ru: 'Порт проектируется **по потребностям ядра**, а не по возможностям технологии. Метод `has(email)` годится для `Set`, `localStorage` и SQL-базы, а метод `query(sql)` протащил бы базу прямо в ядро. Тонкость JavaScript: сетевое хранилище асинхронно, и если порт синхронный, адаптер для сервера к нему не подойдёт. Тогда меняют сам порт (методы возвращают `Promise`, ядро пишет `await`) - это правка ядра, и её делают осознанно, один раз для всех адаптеров.',
        en: 'A port is designed **by the core\'s needs**, not by a technology\'s abilities. A `has(email)` method suits a `Set`, `localStorage`, and an SQL database alike, while a `query(sql)` method would drag the database right into the core. A JavaScript subtlety: networked storage is asynchronous, and if the port is synchronous, a server adapter will not fit it. Then the port itself changes (the methods return a `Promise`, the core uses `await`) - that is a change to the core, made deliberately, once for every adapter.',
      },
      {
        ru: 'У гексагональной архитектуры есть близкие родственники. **Луковая архитектура** (Джеффри Палермо, 2008) рисует те же зависимости внутрь как концентрические кольца и добавляет кольца внутри ядра: модель предметной области, доменные сервисы, прикладные сервисы. **Чистая архитектура** (Роберт Мартин, 2012) объединяет эти идеи под одним правилом зависимостей: код зависит только от того, что ближе к центру. Марк Симан в 2013 году показал, что при последовательном применении принципа инверсии зависимостей все три схемы приводят к одному и тому же коду. Отличие гексагональной в том, что она говорит только о **границе** ядра и не предписывает, как устроено ядро внутри.',
        en: 'Hexagonal architecture has close relatives. **Onion architecture** (Jeffrey Palermo, 2008) draws the same inward dependencies as concentric rings and adds rings inside the core: the domain model, domain services, application services. **Clean architecture** (Robert Martin, 2012) unites these ideas under one dependency rule: code depends only on what is closer to the centre. Mark Seemann showed in 2013 that, when the dependency inversion principle is applied consistently, all three schemes lead to the same code. What sets hexagonal apart is that it speaks only about the core\'s **boundary** and does not prescribe how the core is arranged inside.',
      },
    ],
    whenToUse: [
      {
        ru: '**Следующий шаг после слоёв** - если в слоистом приложении правила стали сложными, а тесты сервисов требуют базы или хитрых заглушек репозиториев, пора развернуть зависимость: объявить порт в ядре и сделать репозиторий его адаптером. Переход можно делать постепенно, по одному порту.',
        en: '**The next step after layers** - if the rules in a layered application have grown complex and service tests need a database or tricky repository stubs, it is time to invert the dependency: declare a port in the core and make the repository its adapter. The move can be gradual, one port at a time.',
      },
      {
        ru: '**Много входов** - веб-форма, публичный API, консольная утилита, обработчик очереди и автотест вызывают одни и те же правила. Каждый вход - отдельный ведущий адаптер, и ни один из них не дублирует проверки.',
        en: '**Many entry points** - a web form, a public API, a command-line tool, a queue handler, and an automated test all call the same rules. Each entry is a separate driving adapter, and none of them duplicates the checks.',
      },
      {
        ru: '**Порт на разговор, а не на таблицу** - заводите порт под цель («хранилище пользователей», «отправка уведомлений»), а не под каждую таблицу или каждый внешний метод. Если портов стало столько же, сколько классов в ядре, граница проведена слишком мелко.',
        en: '**A port per conversation, not per table** - create a port for a purpose ("user storage", "sending notifications"), not for every table or every external method. If there are as many ports as classes in the core, the boundary has been drawn too finely.',
      },
      {
        ru: '**Против гексагона** - CRUD-приложение без настоящих правил, одна база навсегда, короткий срок жизни. Ядро будет пустым, а порты и адаптеры - просто лишним слоем пересылки. Здесь проще обычная слоистая архитектура или готовый CRUD-фреймворк.',
        en: '**Against the hexagon** - a CRUD application with no real rules, one database forever, a short lifespan. The core will be empty, and the ports and adapters just an extra forwarding layer. Plain layered architecture or a ready-made CRUD framework is simpler here.',
      },
      {
        ru: '**Гексагон, лук или чистая** - если нужна только граница (ядро отдельно от инфраструктуры), хватает гексагональной. Если команде нужна ещё и готовая схема слоёв внутри ядра, луковая и чистая архитектуры дают её прямо, сохраняя то же правило зависимостей.',
        en: '**Hexagon, onion, or clean** - if all you need is the boundary (the core apart from the infrastructure), hexagonal is enough. If the team also wants a ready scheme of layers inside the core, onion and clean architectures provide one directly, keeping the same dependency rule.',
      },
    ],
    realWorld: [
      {
        ru: '**Alistair Cockburn, «Hexagonal (Ports & Adapters) Architecture» (2005)** - исходная статья: цель паттерна, порты и адаптеры, первичные и вторичные участники, тестовый стенд FIT и база в памяти как адаптеры.',
        en: '**Alistair Cockburn, "Hexagonal (Ports & Adapters) Architecture" (2005)** - the original article: the pattern\'s intent, ports and adapters, primary and secondary actors, the FIT test harness and an in-memory database as adapters.',
      },
      {
        ru: '**Alistair Cockburn, Juan Manuel Garrido de Paz, «Hexagonal Architecture Explained» (2024)** - книга автора паттерна с подробным разбором портов, адаптеров, тестов и типичных ошибок применения.',
        en: '**Alistair Cockburn, Juan Manuel Garrido de Paz, "Hexagonal Architecture Explained" (2024)** - a book by the pattern\'s author with a detailed look at ports, adapters, tests, and common mistakes in applying it.',
      },
      {
        ru: '**Jeffrey Palermo, «The Onion Architecture» (2008)** - серия статей, где те же зависимости внутрь нарисованы кольцами и добавлены слои внутри ядра.',
        en: '**Jeffrey Palermo, "The Onion Architecture" (2008)** - a series of posts that draws the same inward dependencies as rings and adds layers inside the core.',
      },
      {
        ru: '**Robert C. Martin, «The Clean Architecture» (2012)** - статья, объединившая гексагональную, луковую и похожие схемы под одним правилом зависимостей; позже развёрнута в книгу «Clean Architecture» (2017).',
        en: '**Robert C. Martin, "The Clean Architecture" (2012)** - the post that united hexagonal, onion, and similar schemes under one dependency rule; later expanded into the book "Clean Architecture" (2017).',
      },
      {
        ru: '**Mark Seemann, «Layers, Onions, Ports, Adapters: it\'s all the same» (2013)** - статья о том, что последовательная инверсия зависимостей превращает слоистое приложение в луковое и гексагональное.',
        en: '**Mark Seemann, "Layers, Onions, Ports, Adapters: it\'s all the same" (2013)** - a post showing that consistent dependency inversion turns a layered application into an onion and a hexagonal one.',
      },
    ],
  },

  relatedPatterns: ['layered', 'microkernel'],

  quiz: [
    {
      question: {
        ru: 'Куда направлены зависимости в гексагональной архитектуре?',
        en: 'Which way do dependencies point in hexagonal architecture?',
      },
      options: [
        { ru: 'От ядра к адаптерам: ядро вызывает базу и интерфейс и поэтому зависит от них', en: 'From the core to the adapters: the core calls the database and UI, so it depends on them' },
        { ru: 'Внутрь, к ядру: адаптеры зависят от ядра, а само ядро не знает ни одного адаптера', en: 'Inward, to the core: adapters depend on the core, and the core itself knows no adapter' },
        { ru: 'Сверху вниз, как в слоях: интерфейс зависит от ядра, а ядро зависит от базы данных', en: 'Top to bottom, as in layers: the UI depends on the core, the core on the database' },
        { ru: 'В обе стороны: ядро и адаптеры хранят ссылки друг на друга и вызывают друг друга', en: 'Both ways: the core and the adapters hold references to each other and call each other' },
      ],
      correct: 1,
      explanation: {
        ru: 'Ядро объявляет порты, а адаптеры вызывают или реализуют их, поэтому все стрелки на схеме указывают на ядро. Ядро не называет ни одного адаптера по имени.',
        en: 'The core declares the ports, and the adapters call or implement them, so every arrow on the diagram points at the core. The core names no adapter.',
      },
      hint: {
        ru: 'Посмотрите, куда указывают стрелки на вкладке «Схема».',
        en: 'Look at where the arrows point on the "Diagram" tab.',
      },
    },
    {
      question: {
        ru: 'Что такое порт в гексагональной архитектуре?',
        en: 'What is a port in hexagonal architecture?',
      },
      options: [
        { ru: 'Сетевой порт вроде 8080, на котором сервер приложения принимает HTTP-запросы', en: 'A network port such as 8080 on which the application server accepts HTTP requests' },
        { ru: 'Класс, который переводит HTML-форму или запросы к базе в вызовы ядра', en: 'A class that turns an HTML form or database queries into calls on the core' },
        { ru: 'Интерфейс, который объявляет ядро: что оно умеет или что ему нужно от мира', en: 'An interface the core declares: what it can do, or what it needs from the world' },
        { ru: 'Копия ядра, которую разворачивают на отдельном сервере ради надёжности и скорости', en: 'A copy of the core that is deployed on a separate server for reliability and speed' },
      ],
      correct: 2,
      explanation: {
        ru: 'Порт - это API, принадлежащий ядру, вроде `register` или `UserStorePort`. Класс-переводчик - это адаптер, а не порт.',
        en: 'A port is an API owned by the core, such as `register` or `UserStorePort`. A translating class is an adapter, not a port.',
      },
      hint: {
        ru: 'Смотрите раздел «Решение» на вкладке «Суть».',
        en: 'See the "Solution" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Что означают шесть граней шестиугольника?',
        en: 'What do the six sides of the hexagon mean?',
      },
      options: [
        { ru: 'У приложения должно быть ровно шесть портов, по одному на каждую грань', en: 'An application must have exactly six ports, one per side' },
        { ru: 'Шесть обязательных слоёв, которые запрос проходит от интерфейса до базы', en: 'Six mandatory layers a request passes through from the UI to the database' },
        { ru: 'Ничего: это место для рисования портов и фигура без «верха» и «низа»', en: 'Nothing: it is room to draw ports and a shape with no "top" or "bottom"' },
        { ru: 'Шесть видов адаптеров: формы, API, тесты, базы, очереди и почта', en: 'Six kinds of adapters: forms, APIs, tests, databases, queues, and mail' },
      ],
      correct: 2,
      explanation: {
        ru: 'Кокберн выбрал шестиугольник, чтобы хватило места нарисовать нужное число портов, и чтобы схема не напоминала стопку слоёв. Число граней значения не имеет.',
        en: 'Cockburn chose a hexagon so there would be room to draw as many ports as needed, and so the picture would not resemble a stack of layers. The number of sides does not matter.',
      },
      hint: {
        ru: 'Смотрите второй абзац раздела «Как это работает».',
        en: 'See the second paragraph of the "How it works" section.',
      },
    },
    {
      question: {
        ru: 'Почему список `UserStorePort` в примере стоит рядом с ядром, а не рядом с адаптерами хранилища?',
        en: 'Why does the `UserStorePort` list in the example sit next to the core rather than next to the store adapters?',
      },
      options: [
        { ru: 'Порт принадлежит ядру: оно описывает, что ему нужно, а адаптеры под это подстраиваются', en: 'The port belongs to the core: it says what it needs, and the adapters fit themselves to it' },
        { ru: 'Так требует JavaScript: константу нужно объявить раньше всех классов, которые её используют', en: 'JavaScript requires it: a constant must always be declared before every class that uses it' },
        { ru: 'Так короче: если перенести список к адаптерам, его пришлось бы скопировать в каждый из них', en: 'It is shorter: moved next to the adapters, the list would have to be copied into each one' },
        { ru: 'Порт описывает `localStorage`, а ядро должно знать, как устроен браузер', en: 'The port describes `localStorage`, and the core must know how the browser works' },
      ],
      correct: 0,
      explanation: {
        ru: 'Кто объявляет интерфейс, от того и зависят остальные. Если бы порт описывал конкретное хранилище, ядро снова зависело бы от хранения, как в слоистой архитектуре.',
        en: 'Whoever declares the interface is the one the others depend on. If the port described a particular store, the core would depend on storage again, as in layered architecture.',
      },
      hint: {
        ru: 'Смотрите шаг «Ведомый порт - контракт ядра» на вкладке «Реализация».',
        en: 'See the "The driven port - the core\'s contract" step on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Форма в примере должна хранить адреса только в памяти, без `localStorage`. Что нужно изменить?',
        en: 'The example form should keep addresses in memory only, without `localStorage`. What needs to change?',
      },
      options: [
        { ru: 'Метод `register` в ядре, чтобы он сам выбирал хранилище в зависимости от браузера', en: 'The core\'s `register` method, so it picks the storage itself depending on the browser' },
        { ru: 'Одну строку сборки: передать в `Registration` объект `new InMemoryUserStore()`', en: 'Only one assembly line: pass `new InMemoryUserStore()` into `Registration` instead' },
        { ru: 'Класс `RegistrationForm`, потому что именно он показывает адреса на странице', en: 'The `RegistrationForm` class, because it is the one showing addresses on the page' },
        { ru: 'Список `UserStorePort`, убрав из него методы, которых у памяти нет', en: 'The `UserStorePort` list, dropping the methods the memory store lacks' },
      ],
      correct: 1,
      explanation: {
        ru: 'Адаптер в памяти реализует тот же порт, поэтому ядро и форма его не замечают. Конкретные адаптеры знает только точка сборки.',
        en: 'The in-memory adapter implements the same port, so neither the core nor the form notices. Only the assembly point knows the concrete adapters.',
      },
      hint: {
        ru: 'Смотрите шаг «Точка сборки» на вкладке «Реализация».',
        en: 'See the "The assembly point" step on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Какие адаптеры в примере ведущие (driving)?',
        en: 'Which adapters in the example are driving ones?',
      },
      options: [
        { ru: '`InMemoryUserStore` и `LocalStorageUserStore`, потому что именно они ведут учёт данных', en: '`InMemoryUserStore` and `LocalStorageUserStore`, because they are the ones keeping the data' },
        { ru: 'Только `Registration`, потому что всё остальное в программе управляется именно им', en: 'Only `Registration`, because everything else in the program is driven by it' },
        { ru: 'Только `LocalStorageUserStore`, потому что он единственный обращается к браузеру', en: 'Only `LocalStorageUserStore`, because it is the only one that talks to the browser' },
        { ru: '`RegistrationForm` и `runSelfCheck` - они сами вызывают ядро через ведущий порт', en: '`RegistrationForm` and `runSelfCheck` - they call the core through the driving port' },
      ],
      correct: 3,
      explanation: {
        ru: 'Ведущий адаптер запускает работу ядра через ведущий порт. Хранилища - ведомые адаптеры: их вызывает само ядро. `Registration` - это ядро, а не адаптер.',
        en: 'A driving adapter starts the core\'s work through the driving port. The stores are driven adapters: the core itself calls them. `Registration` is the core, not an adapter.',
      },
      hint: {
        ru: 'Смотрите роли узлов на вкладке «Схема» и шаг «Тест-драйвер - второй ведущий адаптер» на вкладке «Реализация».',
        en: 'See the node roles on the "Diagram" tab and the "The test driver - a second driving adapter" step on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Адреса решили хранить на сервере через `fetch`. Почему для этого недостаточно написать новый ведомый адаптер?',
        en: 'The addresses are to be stored on a server via `fetch`. Why is writing a new driven adapter not enough?',
      },
      options: [
        { ru: 'Гексагональная архитектура запрещает сетевые адаптеры: ядро должно работать без сети', en: 'Hexagonal architecture forbids network adapters: the core must work without a network' },
        { ru: 'Сервер нельзя подключить как адаптер, это всегда отдельное ядро со своими портами', en: 'A server cannot be plugged in as an adapter; it is always a separate core with its own ports' },
        { ru: '`fetch` нельзя вызывать из класса, поэтому код адаптера придётся перенести прямо в ядро', en: '`fetch` cannot be called from a class, so the adapter code would have to move into the core' },
        { ru: 'Сеть асинхронна, а порт синхронный: менять придётся сам порт и `await` в ядре', en: 'The network is async but the port is sync: the port and `await` in the core must change' },
      ],
      correct: 3,
      explanation: {
        ru: 'Адаптер должен подходить к порту, а `fetch` возвращает `Promise`. Порт принадлежит ядру, поэтому его меняют осознанно: методы становятся асинхронными, и ядро ждёт их через `await`.',
        en: 'An adapter has to fit the port, and `fetch` returns a `Promise`. The port belongs to the core, so it is changed deliberately: the methods become asynchronous, and the core waits on them with `await`.',
      },
      hint: {
        ru: 'Смотрите шаг «Адаптер localStorage» на вкладке «Реализация» и абзац про проектирование порта в разделе «Как это работает».',
        en: 'See the "The localStorage adapter" step on the "Implementation" tab and the paragraph about designing a port in the "How it works" section.',
      },
    },
    {
      question: {
        ru: 'Правило регистрации в примерах слоистой и гексагональной архитектуры почти одинаковое. В чём тогда разница?',
        en: 'The registration rule is almost identical in the layered and hexagonal examples. So where is the difference?',
      },
      options: [
        { ru: 'В скорости: гексагональный код работает быстрее, потому что пропускает слой хранения', en: 'In speed: the hexagonal code runs faster because it skips the whole persistence layer' },
        { ru: 'В направлении зависимости: ядро объявляет порт хранилища, а не получает класс слоя ниже', en: 'In the dependency direction: the core owns the store port, not a lower-layer class' },
        { ru: 'В числе слоёв: у гексагональной их шесть, а у слоистой только четыре, по одному на технологию', en: 'In the number of layers: hexagonal has six and layered has four, one for each technology' },
        { ru: 'Разницы нет: это два названия одного паттерна, просто нарисованные по-разному', en: 'There is none: they are just two names for one and the same pattern, drawn differently' },
      ],
      correct: 1,
      explanation: {
        ru: 'В слоистом примере `UserService` зависит от `UserRepository`. В гексагональном `Registration` зависит только от собственного порта, а хранилища подстраиваются под него. Правила те же, развёрнута зависимость.',
        en: 'In the layered example `UserService` depends on `UserRepository`. In the hexagonal one `Registration` depends only on its own port, and the stores fit themselves to it. The rules are the same; the dependency is inverted.',
      },
      hint: {
        ru: 'Смотрите шаг «Ядро получает порт, а не адаптер» на вкладке «Реализация» и пятый абзац раздела «Как это работает».',
        en: 'See the "The core receives a port, not an adapter" step on the "Implementation" tab and the fifth paragraph of the "How it works" section.',
      },
    },
    {
      question: {
        ru: 'Чем гексагональная архитектура отличается от луковой и чистой?',
        en: 'How does hexagonal architecture differ from onion and clean architectures?',
      },
      options: [
        { ru: 'Гексагональная задаёт только границу ядра, а луковая и чистая - ещё и кольца внутри', en: 'Hexagonal sets only the core\'s boundary, while onion and clean add rings inside it' },
        { ru: 'У луковой и чистой зависимости направлены наружу, к базе данных, а у гексагональной внутрь', en: 'In onion and clean, dependencies point outward to the database; in hexagonal, inward' },
        { ru: 'Луковая и чистая запрещают тесты с базой в памяти, а гексагональная на них построена', en: 'Onion and clean forbid tests with an in-memory database, while hexagonal is built on them' },
        { ru: 'Гексагональная появилась позже всех и заменила обе, поэтому их больше не применяют', en: 'Hexagonal came last and replaced both, so they are no longer used' },
      ],
      correct: 0,
      explanation: {
        ru: 'Правило зависимостей у всех трёх одно - внутрь, к предметной области. Гексагональная (2005) говорит только о границе, луковая (2008) и чистая (2012) дополнительно расписывают слои внутри ядра.',
        en: 'All three share one dependency rule - inward, toward the domain. Hexagonal (2005) speaks only about the boundary, while onion (2008) and clean (2012) also lay out the layers inside the core.',
      },
      hint: {
        ru: 'Смотрите последний абзац раздела «Как это работает» и пункт «Гексагон, лук или чистая» в разделе «Нюансы выбора».',
        en: 'See the last paragraph of the "How it works" section and the "Hexagon, onion, or clean" point in the "Choice nuances" section.',
      },
    },
    {
      question: {
        ru: 'Команда делает внутреннюю админку: таблица пользователей, формы «создать» и «изменить», одна база, правил почти нет, через полгода её заменят. Архитектор предлагает порты и адаптеры. Что ответить?',
        en: 'A team is building an internal admin panel: a users table, "create" and "edit" forms, one database, almost no rules, and it will be replaced in six months. The architect proposes ports and adapters. What should you answer?',
      },
      options: [
        { ru: 'Согласиться: без портов и адаптеров такую админку будет невозможно покрыть тестами', en: 'Agree: without ports and adapters such an admin panel cannot be covered by tests at all' },
        { ru: 'Согласиться, но завести порт на каждую таблицу и каждую форму, чтобы граница была строже', en: 'Agree, but create a port for every table and every form so the boundary is stricter' },
        { ru: 'Отказаться: ядро будет пустым, и порты станут лишней пересылкой - хватит простых слоёв', en: 'Decline: the core would be empty and ports mere forwarding - simple layers will do' },
        { ru: 'Отказаться, потому что гексагональная архитектура работает только с несколькими базами сразу', en: 'Decline, because hexagonal architecture only works with several databases at once' },
      ],
      correct: 2,
      explanation: {
        ru: 'Польза гексагона - в защите богатых и долгоживущих правил от инфраструктуры. Когда правил нет, а технология одна и временная, порты и адаптеры добавляют код без выгоды.',
        en: 'The hexagon pays off by shielding rich, long-lived rules from the infrastructure. When there are no rules and the technology is single and temporary, ports and adapters add code without gain.',
      },
      hint: {
        ru: 'Смотрите первый пункт минусов и пункт «Против гексагона» в разделе «Нюансы выбора».',
        en: 'See the first "Cons" item and the "Against the hexagon" point in the "Choice nuances" section.',
      },
    },
  ],
};

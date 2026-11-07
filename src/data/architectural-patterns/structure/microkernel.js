export const microkernel = {
  slug: 'microkernel',
  category: 'structure',
  name: { ru: 'Архитектура микроядра', en: 'Microkernel Architecture' },
  popularity: 2,
  tags: ['structure', 'plug-in', 'extensibility'],

  intent: {
    ru: 'Архитектура микроядра (Microkernel Architecture), её также называют архитектурой плагинов (plug-in architecture), делит приложение на маленькое ядро с минимумом функций и подключаемые к нему плагины. Ядро знает, какие плагины установлены, и вызывает их через общий контракт, а каждая новая функция или правило продукта приходит отдельным плагином. Поэтому возможности продукта растут и настраиваются под конкретного клиента подключением и отключением плагинов, а не правкой ядра - пока новый плагин укладывается в контракт ядра.',
    en: 'Microkernel architecture, also called plug-in architecture, splits an application into a small core with minimal functionality and plug-ins attached to it. The core knows which plug-ins are installed and calls them through a shared contract, while each new feature or product rule arrives as a separate plug-in. So the product\'s capabilities grow and are tailored to a particular customer by installing and removing plug-ins rather than by editing the core - as long as a new plug-in fits the core\'s contract.',
  },

  problem: {
    ru: 'Продукт продаётся многим клиентам, и каждый хочет своё: одному нужно запретить одноразовые адреса, другому - пускать только корпоративную почту, третьему - и то, и другое. Если писать это условиями прямо в коде регистрации, ядро обрастает ветками `if (client === ...)`, каждое новое правило требует правки и перевыпуска всего продукта, а ошибка в правиле одного клиента ломает регистрацию у всех. **Слоистая** и **гексагональная** архитектуры здесь не помогают: они разделяют код по ролям и отделяют правила от внешнего мира, но сами правила в обеих остаются одним фиксированным набором внутри.',
    en: 'A product is sold to many customers, and each wants something different: one needs disposable addresses banned, another wants corporate mail only, a third wants both. Written as conditions right in the registration code, the core sprouts `if (client === ...)` branches, every new rule needs an edit and a re-release of the whole product, and a bug in one customer\'s rule breaks registration for everyone. **Layered** and **hexagonal** architectures do not help here: they split code by role and separate the rules from the outside world, but in both the rules themselves stay one fixed set inside.',
  },

  solution: {
    ru: '**Ядро** делает только то, без чего система не работает: в примере это проверка формата, уникальность и хранение адресов. Всё изменчивое вынесено в **плагины** - самостоятельные модули с одинаковым **контрактом**: у плагина есть имя и метод `check(email)`, который возвращает текст ошибки или `null`. Ядро ведёт **реестр** установленных плагинов, при регистрации по очереди вызывает каждый и не знает, что именно он проверяет. Плагин можно установить или удалить во время работы, не трогая ядро, а плагины друг о друге не знают.',
    en: 'The **core** does only what the system cannot run without: in the example that is the format check, uniqueness, and storing addresses. Everything that varies goes into **plug-ins** - self-contained modules with the same **contract**: a plug-in has a name and a `check(email)` method that returns an error text or `null`. The core keeps a **registry** of installed plug-ins, calls each in turn during registration, and does not know what any of them checks. A plug-in can be installed or removed at run time without touching the core, and plug-ins know nothing about each other.',
  },

  diagram: {
    layout: 'plugin',
    nodes: [
      {
        id: 'kernel',
        label: { ru: 'Ядро', en: 'Core' },
        note: { ru: 'формат · уникальность · реестр плагинов', en: 'format · uniqueness · plug-in registry' },
        role: {
          ru: 'Класс `RegistrationCore`: минимальные правила (формат, уникальность), хранение адресов и реестр плагинов - `Map` с методами `install` и `uninstall`. Знает только контракт плагина, ни одного плагина по имени в коде ядра нет. На схеме слоты на нижней грани ядра - места подключения по контракту, пунктирный слот - место для следующего плагина.',
          en: 'The `RegistrationCore` class: the minimal rules (format, uniqueness), address storage, and the plug-in registry - a `Map` with `install` and `uninstall` methods. It knows only the plug-in contract; no plug-in is named anywhere in the core\'s code. On the diagram the sockets on the core\'s bottom edge are where plug-ins attach by the contract, and the dashed socket is room for the next plug-in.',
        },
      },
      {
        id: 'page',
        side: 'top',
        label: { ru: 'Страница', en: 'Page' },
        role: {
          ru: 'Интерфейс поверх ядра: форма регистрации и переключатели, которые устанавливают и удаляют плагины во время работы. Сама ничего не проверяет - только вызывает `register`, `listEmails`, `install` и `uninstall`.',
          en: 'The UI on top of the core: the sign-up form and toggles that install and remove plug-ins at run time. It checks nothing itself - it only calls `register`, `listEmails`, `install`, and `uninstall`.',
        },
      },
      {
        id: 'no-disposable',
        side: 'bottom',
        label: { ru: 'Без одноразовых', en: 'No disposable' },
        note: { ru: 'no-disposable', en: 'no-disposable' },
        role: {
          ru: 'Плагин-правило: отклоняет адреса одноразовых почтовых сервисов из своего списка доменов. О ядре знает только контракт: получает нормализованный email и возвращает текст ошибки или `null`.',
          en: 'A rule plug-in: rejects addresses from disposable mail services on its domain list. All it knows of the core is the contract: it receives a normalised email and returns an error text or `null`.',
        },
      },
      {
        id: 'corporate-only',
        side: 'bottom',
        label: { ru: 'Корпоративная почта', en: 'Corporate only' },
        note: { ru: 'corporate-only', en: 'corporate-only' },
        role: {
          ru: 'Плагин-правило: пропускает только адреса на `@example.com`. Независим от `no-disposable` - их можно включать в любом сочетании, и ни один не вызывает другой.',
          en: 'A rule plug-in: lets through only addresses at `@example.com`. It is independent of `no-disposable` - they can be switched on in any combination, and neither calls the other.',
        },
      },
      {
        id: 'broken-demo',
        side: 'bottom',
        label: { ru: 'Сломанный плагин', en: 'Broken plug-in' },
        note: { ru: 'broken-demo', en: 'broken-demo' },
        role: {
          ru: 'Нарочно сломанный плагин: его `check` всегда бросает исключение. Нужен, чтобы показать, что делает ядро с ошибкой плагина: останавливает регистрацию с понятным сообщением и ничего не сохраняет.',
          en: 'A deliberately broken plug-in: its `check` always throws. It is there to show what the core does with a plug-in failure: it stops the registration with a clear message and saves nothing.',
        },
      },
    ],
    connections: [
      { from: 'page', to: 'kernel', label: { ru: 'вызывает ядро', en: 'calls core' } },
      { from: 'no-disposable', to: 'kernel' },
      { from: 'corporate-only', to: 'kernel' },
      { from: 'broken-demo', to: 'kernel' },
    ],
  },

  steps: [
    {
      title: { ru: 'Ядро объявляет контракт', en: 'The core declares the contract' },
      explanation: {
        ru: 'Ядро задаёт, каким должен быть любой плагин: строковое имя и метод `check(email)`, возвращающий текст ошибки или `null`. Плагины пишутся под этот контракт, то есть зависят от ядра, а ядро от них - нет. Поэтому на схеме все стрелки направлены к ядру.',
        en: 'The core defines what any plug-in must look like: a string name and a `check(email)` method returning an error text or `null`. Plug-ins are written to this contract, so they depend on the core and not the other way round. That is why every arrow on the diagram points to the core.',
      },
    },
    {
      title: { ru: 'Плагин попадает в реестр', en: 'A plug-in enters the registry' },
      explanation: {
        ru: 'Пользователь включает переключатель, и страница вызывает `install`. Ядро проверяет, что плагин соблюдает контракт, и кладёт его в реестр под его именем. Выключение вызывает `uninstall` и убирает плагин из реестра - ядро при этом не меняется.',
        en: 'The user turns a toggle on, and the page calls `install`. The core checks that the plug-in honours the contract and puts it in the registry under its name. Turning it off calls `uninstall` and removes the plug-in from the registry - the core itself does not change.',
      },
    },
    {
      title: { ru: 'Ядро применяет свои правила', en: 'The core applies its own rules' },
      explanation: {
        ru: 'При регистрации ядро нормализует email и проверяет то, что нужно всегда: формат и уникальность. Эти правила не вынесены в плагины, потому что без них система просто не работает.',
        en: 'On registration the core normalises the email and checks what is always needed: the format and uniqueness. These rules are not moved into plug-ins, because without them the system simply does not work.',
      },
    },
    {
      title: { ru: 'Ядро вызывает плагины из реестра', en: 'The core calls the plug-ins from the registry' },
      explanation: {
        ru: 'Ядро по очереди вызывает `check` у каждого установленного плагина. Вызов идёт от ядра к плагину, но стрелка на схеме направлена к ядру: это стрелка зависимости от контракта, а не вызова. Если плагин вернул текст ошибки, регистрация отклоняется с этим текстом. Если плагин упал, ядро останавливает регистрацию и называет виновника.',
        en: 'The core calls `check` on each installed plug-in in turn. The call goes from the core to the plug-in, yet the arrow on the diagram points to the core: it is an arrow of dependency on the contract, not of the call. If a plug-in returns an error text, the registration is refused with that text. If a plug-in crashes, the core stops the registration and names the culprit.',
      },
    },
    {
      title: { ru: 'Результат возвращается странице', en: 'The result goes back to the page' },
      explanation: {
        ru: 'Если все проверки прошли, ядро сохраняет адрес и возвращает его, а страница показывает сообщение и обновлённый список. Набор правил определяется тем, какие плагины сейчас установлены, а не кодом ядра.',
        en: 'If every check passes, the core saves the address and returns it, and the page shows a message and the updated list. The set of rules is defined by which plug-ins are installed right now, not by the core\'s code.',
      },
    },
  ],

  implementation: {
    javascript: `class RegistrationCore {
  constructor() {
    this.emails = new Set();
    this.plugins = new Map();
  }

  install(plugin) {
    if (typeof plugin.name !== 'string' || typeof plugin.check !== 'function') {
      throw new Error('Plugin breaks the contract');
    }
    this.plugins.set(plugin.name, plugin);
  }

  uninstall(name) {
    this.plugins.delete(name);
  }

  register(rawEmail) {
    const email = rawEmail.trim().toLowerCase();
    if (!/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(email)) {
      throw new Error('Invalid email');
    }
    if (this.emails.has(email)) {
      throw new Error('Email already registered');
    }
    for (const plugin of this.plugins.values()) {
      let problem;
      try {
        problem = plugin.check(email);
      } catch {
        throw new Error('Plugin ' + plugin.name + ' failed, nothing saved');
      }
      if (problem) {
        throw new Error(problem);
      }
    }
    this.emails.add(email);
    return email;
  }

  listEmails() {
    return [...this.emails];
  }
}

const noDisposable = {
  name: 'no-disposable',
  check(email) {
    const domain = email.split('@')[1];
    return ['mailinator.com', 'tempmail.dev'].includes(domain)
      ? 'Disposable addresses are not allowed'
      : null;
  },
};

const corporateOnly = {
  name: 'corporate-only',
  check(email) {
    return email.endsWith('@example.com') ? null : 'Only @example.com addresses';
  },
};

const brokenDemo = {
  name: 'broken-demo',
  check() {
    throw new TypeError('Cannot read properties of undefined');
  },
};

class RegistrationPage {
  constructor(root, core, plugins) {
    this.core = core;
    this.input = root.querySelector('form input');
    this.message = root.querySelector('p');
    this.list = root.querySelector('ul');
    for (const plugin of plugins) {
      const box = Object.assign(document.createElement('input'), { type: 'checkbox' });
      box.addEventListener('change', () => {
        if (box.checked) core.install(plugin);
        else core.uninstall(plugin.name);
      });
      const label = document.createElement('label');
      label.append(box, ' ' + plugin.name);
      root.querySelector('fieldset').append(label);
    }
    root.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();
      this.submit();
    });
  }

  submit() {
    try {
      const email = this.core.register(this.input.value);
      this.message.textContent = 'Registered: ' + email;
      this.input.value = '';
    } catch (error) {
      this.message.textContent = error.message;
    }
    const items = this.core.listEmails().map((email) =>
      Object.assign(document.createElement('li'), { textContent: email }));
    this.list.replaceChildren(...items);
  }
}

const root = document.querySelector('#app');
root.innerHTML = \`
  <fieldset><legend>Plugins</legend></fieldset>
  <form>
    <input placeholder="you@example.com">
    <button>Register</button>
  </form>
  <p></p>
  <ul></ul>\`;

new RegistrationPage(root, new RegistrationCore(), [noDisposable, corporateOnly, brokenDemo]);`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1, 5],
        title: { ru: 'Ядро: данные и реестр', en: 'The core: data and registry' },
        explanation: {
          ru: 'У ядра два поля: множество зарегистрированных адресов и реестр плагинов. Реестр здесь - обычный `Map` от имени к плагину. В больших системах реестр хранит ещё и версию контракта и способ связи с плагином, но суть та же: ядро знает, какие плагины есть.',
          en: 'The core has two fields: the set of registered addresses and the plug-in registry. Here the registry is a plain `Map` from name to plug-in. In large systems the registry also keeps the contract version and how to reach the plug-in, but the essence is the same: the core knows which plug-ins exist.',
        },
      },
      {
        lines: [7, 12],
        title: { ru: 'install - проверка контракта', en: 'install - checking the contract' },
        explanation: {
          ru: 'Прежде чем принять плагин, ядро проверяет контракт: строковое имя и функция `check`. Плагин без них отклоняется сразу при установке, а не падает потом посреди регистрации.',
          en: 'Before accepting a plug-in, the core checks the contract: a string name and a `check` function. A plug-in without them is refused right at installation instead of failing later in the middle of a registration.',
        },
      },
      {
        lines: [14, 16],
        title: { ru: 'uninstall - удалить из реестра', en: 'uninstall - removing from the registry' },
        explanation: {
          ru: 'Удаление плагина - одна операция над реестром. Ни одна строка правил ядра от этого не меняется: правило просто перестаёт вызываться.',
          en: 'Removing a plug-in is one operation on the registry. Not a single line of the core\'s rules changes: the rule simply stops being called.',
        },
      },
      {
        lines: [18, 25],
        title: { ru: 'Правила самого ядра', en: 'The core\'s own rules' },
        explanation: {
          ru: 'Формат и уникальность - те же правила, что в примерах слоистой и гексагональной архитектуры. Они остались в ядре, потому что нужны любой конфигурации продукта: без них регистрация бессмысленна.',
          en: 'Format and uniqueness are the same rules as in the layered and hexagonal examples. They stay in the core because every configuration of the product needs them: without them registration makes no sense.',
        },
      },
      {
        lines: [26, 36],
        title: { ru: 'Вызов плагинов и их ошибки', en: 'Calling the plug-ins and their failures' },
        explanation: {
          ru: 'Ядро обходит реестр и вызывает `check` у каждого плагина. Текст ошибки от плагина отклоняет регистрацию. Исключение внутри плагина ядро перехватывает и превращает в понятное сообщение с именем плагина. Политика здесь «закрытая»: если проверка не смогла выполниться, адрес не сохраняется - для правил проверки это безопаснее, чем молча пропустить сломанный плагин.',
          en: 'The core walks the registry and calls `check` on each plug-in. An error text from a plug-in refuses the registration. An exception inside a plug-in is caught by the core and turned into a clear message naming the plug-in. The policy here is "fail closed": if a check could not run, the address is not saved - for validation rules that is safer than silently skipping a broken plug-in.',
        },
      },
      {
        lines: [37, 44],
        title: { ru: 'Сохранение и список', en: 'Saving and the list' },
        explanation: {
          ru: 'Только после всех проверок ядро сохраняет адрес. `listEmails` отдаёт копию списка, чтобы снаружи нельзя было изменить данные ядра.',
          en: 'Only after every check does the core save the address. `listEmails` hands out a copy of the list so outside code cannot change the core\'s data.',
        },
      },
      {
        lines: [46, 54],
        title: { ru: 'Плагин no-disposable', en: 'The no-disposable plug-in' },
        explanation: {
          ru: 'Обычный объект с именем и методом `check`. Он берёт домен из адреса и отклоняет одноразовые почтовые сервисы. Ни ядро, ни другие плагины он не импортирует и не вызывает - о системе он знает только контракт.',
          en: 'A plain object with a name and a `check` method. It takes the domain from the address and rejects disposable mail services. It neither imports nor calls the core or other plug-ins - all it knows of the system is the contract.',
        },
      },
      {
        lines: [56, 61],
        title: { ru: 'Плагин corporate-only', en: 'The corporate-only plug-in' },
        explanation: {
          ru: 'Второй плагин с тем же контрактом и совсем другим правилом. Он не зависит от `no-disposable`, поэтому их можно включать в любом сочетании, и порядок вызова не влияет на результат.',
          en: 'A second plug-in with the same contract and an entirely different rule. It does not depend on `no-disposable`, so they can be switched on in any combination, and the call order does not affect the result.',
        },
      },
      {
        lines: [63, 68],
        title: { ru: 'Сломанный плагин', en: 'A broken plug-in' },
        explanation: {
          ru: 'Демонстрация ошибки в чужом коде: `check` всегда бросает исключение. Ядро его перехватит, но учтите предел такой защиты: плагин, который зависнет в бесконечном цикле, остановит всю страницу, потому что работает в том же потоке, что и ядро.',
          en: 'A demonstration of a bug in someone else\'s code: `check` always throws. The core will catch it, but note the limit of this protection: a plug-in that hangs in an infinite loop stops the whole page, because it runs on the same thread as the core.',
        },
      },
      {
        lines: [70, 75],
        title: { ru: 'Страница знает только ядро', en: 'The page knows only the core' },
        explanation: {
          ru: 'Страница получает ядро и список доступных плагинов и находит свои элементы. Правил в ней нет - всё, что она делает, это вызовы ядра.',
          en: 'The page receives the core and the list of available plug-ins and finds its elements. There are no rules in it - all it does is call the core.',
        },
      },
      {
        lines: [76, 85],
        title: { ru: 'Переключатели устанавливают плагины', en: 'Toggles install the plug-ins' },
        explanation: {
          ru: 'Для каждого плагина создаётся флажок с подписью из `createElement` и текста. Включение вызывает `install`, выключение - `uninstall`: состав правил меняется во время работы, без перезагрузки и без правки ядра.',
          en: 'Each plug-in gets a checkbox with a label built from `createElement` and text. Checking it calls `install`, unchecking calls `uninstall`: the set of rules changes at run time, with no reload and no edit to the core.',
        },
      },
      {
        lines: [86, 90],
        title: { ru: 'Отправка формы без перезагрузки', en: 'Form submit without a reload' },
        explanation: {
          ru: '`preventDefault()` не даёт браузеру перезагрузить страницу при отправке формы, иначе пропали бы и адреса, и установленные плагины.',
          en: '`preventDefault()` stops the browser from reloading the page on form submit, which would otherwise wipe both the addresses and the installed plug-ins.',
        },
      },
      {
        lines: [92, 104],
        title: { ru: 'submit - вызвать ядро и показать ответ', en: 'submit - call the core and show the answer' },
        explanation: {
          ru: 'Страница передаёт строку из поля ядру и показывает результат или текст ошибки, в том числе ошибку от плагина. Список строится из `li` с `textContent`, поэтому адрес вроде `<b>x</b>@example.com` покажется как текст, а не станет разметкой.',
          en: 'The page passes the field\'s string to the core and shows the result or the error text, including an error from a plug-in. The list is built from `li` elements with `textContent`, so an address such as `<b>x</b>@example.com` shows as text instead of turning into markup.',
        },
      },
      {
        lines: [106, 114],
        title: { ru: 'Разметка экрана', en: 'The screen markup' },
        explanation: {
          ru: 'Статичная разметка: блок для переключателей плагинов, форма, строка для сообщения и пустой список. Пользовательских данных в ней нет, поэтому `innerHTML` здесь безопасен.',
          en: 'Static markup: a block for the plug-in toggles, the form, a line for the message, and an empty list. It contains no user data, so `innerHTML` is safe here.',
        },
      },
      {
        lines: [116, 116],
        title: { ru: 'Сборка: ядро и доступные плагины', en: 'Assembly: the core and the available plug-ins' },
        explanation: {
          ru: 'Ядро создаётся пустым, без плагинов, а список доступных плагинов передаётся странице. Новый плагин - это новый объект с тем же контрактом и ещё один элемент в этом массиве. Ядро для этого не правится.',
          en: 'The core is created empty, with no plug-ins, and the list of available plug-ins is handed to the page. A new plug-in is a new object with the same contract plus one more element in this array. The core is not edited for that.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'Новая функция или правило добавляется плагином, без правки ядра: в примере правила включаются и выключаются прямо во время работы.',
      en: 'A new feature or rule arrives as a plug-in, without editing the core: in the example rules are switched on and off right at run time.',
    },
    {
      ru: 'Продукт легко настраивается под клиента: у каждого свой набор плагинов поверх одного и того же ядра, без веток `if (client === ...)` в общем коде.',
      en: 'The product is easy to tailor per customer: each gets their own set of plug-ins on top of the same core, with no `if (client === ...)` branches in shared code.',
    },
    {
      ru: 'Ядро маленькое и меняется редко, поэтому его проще проверить. Плагин тестируется отдельно, как обычная функция: передал email - получил ошибку или `null`.',
      en: 'The core is small and rarely changes, so it is easier to verify. A plug-in is tested on its own like a plain function: pass an email, get an error or `null`.',
    },
  ],
  cons: [
    {
      ru: 'Контракт трудно менять: любая правка ломает все плагины сразу, включая написанные другими командами. Версионировать контракт приходится с самого начала.',
      en: 'The contract is hard to change: any edit breaks every plug-in at once, including ones written by other teams. The contract has to be versioned from the very start.',
    },
    {
      ru: 'Плагин в том же процессе может уронить или подвесить всё приложение: `try/catch` ловит исключения, но не бесконечный цикл и не утечку памяти. Настоящая изоляция требует отдельного процесса.',
      en: 'A plug-in in the same process can crash or hang the whole application: `try/catch` catches exceptions, but not an infinite loop or a memory leak. Real isolation takes a separate process.',
    },
    {
      ru: 'Это всё ещё одно приложение: ядро обрабатывает каждый запрос, масштабируется система только целиком, а если плагинам нужно общаться друг с другом, ядро превращается в узкое место.',
      en: 'It is still one application: the core handles every request, the system scales only as a whole, and if plug-ins need to talk to each other, the core turns into a bottleneck.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда продукт ставится многим клиентам и у каждого свои правила или функции: проверки, тарифы, интеграции, отчёты.',
      en: 'When a product is installed for many customers and each has their own rules or features: checks, pricing, integrations, reports.',
    },
    {
      ru: 'Когда вокруг продукта должна вырасти экосистема расширений от сторонних разработчиков, как у редакторов кода и браузеров.',
      en: 'When an ecosystem of third-party extensions is meant to grow around the product, as with code editors and browsers.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Eclipse** - сама среда разработки почти целиком собрана из плагинов поверх небольшой платформы, включая инструменты для Java. С версии 3.0 (2004) плагины Eclipse работают на модульной среде **OSGi**.',
      en: '**Eclipse** - the IDE itself is built almost entirely of plug-ins on top of a small platform, including its Java tools. Since version 3.0 (2004) Eclipse plug-ins run on the **OSGi** module runtime.',
    },
    {
      ru: '**Visual Studio Code** - редактор с ядром и расширениями, которые подключаются через описанные точки расширения. Расширения работают в отдельном процессе (Extension Host), поэтому медленное или сломанное расширение не подвешивает интерфейс редактора.',
      en: '**Visual Studio Code** - an editor with a core and extensions that plug in through declared extension points. Extensions run in a separate process (the Extension Host), so a slow or broken extension does not freeze the editor\'s UI.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: 'У слова **микроядро** два значения, и их легко спутать. В операционных системах микроядро - это ядро ОС, в котором оставлен минимум: процессы, память, обмен сообщениями, а драйверы и файловые системы работают отдельными процессами вне ядра. Так устроены **Mach** (Университет Карнеги - Меллона, с 1985 года), **L4** (Йохен Лидтке, 1993) и **MINIX 3** (Эндрю Таненбаум, 2005). **Linux** - наоборот, монолитное ядро, и спор Таненбаума и Торвальдса об этом в 1992 году стал знаменитым.',
        en: 'The word **microkernel** has two meanings, and they are easy to mix up. In operating systems a microkernel is an OS kernel cut down to the minimum: processes, memory, message passing, while drivers and file systems run as separate processes outside the kernel. That is how **Mach** (Carnegie Mellon University, from 1985), **L4** (Jochen Liedtke, 1993), and **MINIX 3** (Andrew Tanenbaum, 2005) work. **Linux** is the opposite, a monolithic kernel, and the 1992 debate between Tanenbaum and Torvalds about it became famous.',
      },
      {
        ru: 'Эта страница - про второе значение, **архитектурный стиль приложения**, который перенёс ту же идею с ОС на прикладные программы. В книге **«Pattern-Oriented Software Architecture»** (Бушман и соавторы, 1996) паттерн Microkernel описан с участниками: микроядро, внутренние серверы, которые расширяют ядро, внешние серверы, которые строят на нём свои интерфейсы, и адаптеры для клиентов. Общая мысль у обоих значений одна: ядро держит только неизменную основу, а всё изменчивое живёт снаружи.',
        en: 'This page is about the second meaning, an **application architecture style** that carried the same idea over from operating systems to application software. **"Pattern-Oriented Software Architecture"** (Buschmann et al., 1996) describes the Microkernel pattern with these participants: the microkernel, internal servers that extend it, external servers that build their own interfaces on top of it, and adapters for clients. Both meanings share one thought: the core holds only the stable foundation, and everything that varies lives outside.',
      },
      {
        ru: 'В нынешнем виде стиль описал **Марк Ричардс** в «Software Architecture Patterns» (O\'Reilly, 2015): **ядро** (core system) с минимумом функций и **плагины** (plug-in modules), и по его словам это естественный выбор для продуктов, которые ставятся клиентам. В «Fundamentals of Software Architecture» (Ричардс и Нил Форд, 2020) добавлено, что ядро внутри может быть устроено слоями или как модульный монолит, а плагины подключаются либо при сборке, либо во время работы.',
        en: 'The style in its current form was described by **Mark Richards** in "Software Architecture Patterns" (O\'Reilly, 2015): a **core system** with minimal functionality plus **plug-in modules**, which he calls a natural fit for products installed at customer sites. "Fundamentals of Software Architecture" (Richards and Neal Ford, 2020) adds that the core may itself be layered or a modular monolith inside, and that plug-ins are connected either at build time or at run time.',
      },
      {
        ru: 'Две детали связывают ядро с плагинами. **Реестр** знает, какие плагины есть, и как к ним обратиться: в примере это `Map`, в больших системах - каталог с версиями. **Контракт** описывает, что плагин получает и что возвращает. Если сторонний плагин говорит на своём контракте, между ним и ядром ставят **адаптер**, чтобы в ядре не появлялся код под конкретный плагин.',
        en: 'Two details tie the core to the plug-ins. The **registry** knows which plug-ins exist and how to reach them: in the example it is a `Map`, in large systems a catalogue with versions. The **contract** describes what a plug-in receives and returns. If a third-party plug-in speaks its own contract, an **adapter** sits between it and the core, so no plug-in-specific code appears in the core.',
      },
      {
        ru: 'Плагины должны быть **независимы друг от друга**: каждый общается только с ядром. Как только один плагин начинает вызывать другой или зависеть от порядка вызова, их уже нельзя включать в любом сочетании, и архитектура теряет главное свойство. В примере `no-disposable` и `corporate-only` ничего не знают друг о друге, и порядок, в котором ядро их вызывает, на результат не влияет.',
        en: 'Plug-ins must be **independent of each other**: each talks only to the core. As soon as one plug-in starts calling another or depending on the call order, they can no longer be switched on in any combination, and the architecture loses its main property. In the example `no-disposable` and `corporate-only` know nothing of each other, and the order in which the core calls them does not affect the result.',
      },
      {
        ru: '**Ошибки плагинов** - отдельная забота ядра. Пример перехватывает исключение и работает по «закрытой» политике: проверка не выполнилась - адрес не сохраняется. Но плагин в том же потоке может зависнуть, и тогда никакой `try/catch` не поможет. Поэтому **VS Code** запускает расширения в отдельном процессе, а браузеры изолируют свои расширения от страниц - за изоляцию платят сложностью и скоростью вызовов.',
        en: '**Plug-in failures** are a separate concern of the core. The example catches the exception and follows a "fail closed" policy: if a check did not run, the address is not saved. But a plug-in on the same thread may hang, and then no `try/catch` helps. That is why **VS Code** runs extensions in a separate process, and browsers isolate their extensions from pages - isolation is paid for with complexity and slower calls.',
      },
      {
        ru: 'Сравнение с соседями по категории. В **слоистой** архитектуре код делится по технической роли. В **гексагональной** адаптеры подключают внешний мир - интерфейс, хранилище, тесты - к неизменному набору правил. В **микроядре** плагины расширяют сами правила и функции продукта. Стили сочетаются: ядро микроядерной системы вполне может быть слоистым или гексагональным внутри.',
        en: 'A comparison with the neighbours in this category. In **layered** architecture code is split by technical role. In **hexagonal** architecture adapters connect the outside world - UI, storage, tests - to an unchanging set of rules. In a **microkernel** plug-ins extend the product\'s rules and features themselves. The styles combine: the core of a microkernel system may well be layered or hexagonal inside.',
      },
    ],
    whenToUse: [
      {
        ru: '**Микроядро или гексагон** - смотрите, что меняется. Если меняются технологии вокруг (база, интерфейс, внешние сервисы), а правила одни - гексагональная архитектура. Если меняется сам набор правил и функций, причём по-разному у разных клиентов, - микроядро.',
        en: '**Microkernel or hexagon** - look at what changes. If the technology around changes (the database, the UI, external services) while the rules stay one set - hexagonal architecture. If the set of rules and features itself changes, and differently for different customers - microkernel.',
      },
      {
        ru: '**Правила по регионам и клиентам** - классический пример Ричардса и Форда: обработка страховых заявок, где правила каждой юрисдикции лежат в своём плагине. Новый регион - новый плагин, а общий процесс обработки в ядре не трогается.',
        en: '**Rules per region and customer** - Richards and Ford\'s classic example: insurance claims processing, where each jurisdiction\'s rules live in their own plug-in. A new region is a new plug-in, and the shared processing flow in the core is not touched.',
      },
      {
        ru: '**В процессе или отдельно** - плагины в том же процессе быстрые и простые, но любой из них может уронить всё. Если плагины пишут посторонние люди, выносите их в отдельный процесс или песочницу, как VS Code и браузеры.',
        en: '**In process or separate** - plug-ins in the same process are fast and simple, but any of them can bring everything down. If outsiders write the plug-ins, move them into a separate process or sandbox, as VS Code and browsers do.',
      },
      {
        ru: '**Закрытая или открытая политика** - если плагин-проверка упал, что безопаснее: отказать или пропустить? Для проверок и безопасности обычно отказ, для необязательных функций вроде подсветки или подсказок - пропустить плагин и работать дальше.',
        en: '**Fail closed or fail open** - if a checking plug-in crashes, which is safer: refuse or let it through? For checks and security, usually refuse; for optional features such as highlighting or suggestions, skip the plug-in and carry on.',
      },
      {
        ru: '**Против микроядра** - если набор функций один для всех и меняется вместе с продуктом, реестр и контракт будут лишней церемонией. То же, если «плагины» постоянно зависят друг от друга: это признак, что граница проведена неверно.',
        en: '**Against a microkernel** - if the feature set is one for everyone and changes together with the product, the registry and contract are extra ceremony. The same goes if the "plug-ins" constantly depend on each other: it is a sign the boundary is drawn in the wrong place.',
      },
    ],
    realWorld: [
      {
        ru: '**Frank Buschmann и соавторы, «Pattern-Oriented Software Architecture, Volume 1» (1996)** - описание паттерна Microkernel: микроядро, внутренние и внешние серверы, адаптеры.',
        en: '**Frank Buschmann et al., "Pattern-Oriented Software Architecture, Volume 1" (1996)** - the description of the Microkernel pattern: the microkernel, internal and external servers, adapters.',
      },
      {
        ru: '**Mark Richards, «Software Architecture Patterns» (O\'Reilly, 2015)** - глава о микроядре: ядро и плагины, реестр, контракты, применение в продуктах.',
        en: '**Mark Richards, "Software Architecture Patterns" (O\'Reilly, 2015)** - the chapter on the microkernel: core and plug-ins, the registry, contracts, use in products.',
      },
      {
        ru: '**Mark Richards, Neal Ford, «Fundamentals of Software Architecture» (2020)** - глава о стиле микроядра: плагины при сборке и во время работы, удалённые плагины, адаптеры контрактов, пример со страховыми заявками.',
        en: '**Mark Richards, Neal Ford, "Fundamentals of Software Architecture" (2020)** - the chapter on the microkernel style: build-time and run-time plug-ins, remote plug-ins, contract adapters, the insurance claims example.',
      },
      {
        ru: '**Jochen Liedtke, «On µ-Kernel Construction» (SOSP, 1995)** - статья автора L4 о том, каким должно быть минимальное ядро ОС: откуда пришла сама идея «оставить в ядре только необходимое».',
        en: '**Jochen Liedtke, "On µ-Kernel Construction" (SOSP, 1995)** - the paper by L4\'s author on what a minimal OS kernel should be: where the very idea of "keep only the essentials in the kernel" comes from.',
      },
      {
        ru: '**Eclipse и OSGi** - платформа, где почти всё, включая инструменты для Java, сделано плагинами; с Eclipse 3.0 (2004) плагины работают на модульной среде OSGi.',
        en: '**Eclipse and OSGi** - a platform where almost everything, including the Java tools, is a plug-in; since Eclipse 3.0 (2004) plug-ins run on the OSGi module runtime.',
      },
    ],
  },

  relatedPatterns: ['layered', 'hexagonal', 'client-server'],

  quiz: [
    {
      question: {
        ru: 'Из каких двух основных частей состоит архитектура микроядра?',
        en: 'What two main parts make up a microkernel architecture?',
      },
      options: [
        { ru: 'Из клиента и сервера, которые общаются по сети через HTTP', en: 'A client and a server that talk over the network via HTTP' },
        { ru: 'Из ядра с минимумом функций и подключаемых к нему плагинов', en: 'A core with minimal functionality and plug-ins attached to it' },
        { ru: 'Из слоя представления и слоя хранения, между которыми нет ничего', en: 'A presentation layer and a persistence layer with nothing between them' },
        { ru: 'Из ведущих и ведомых адаптеров вокруг порта', en: 'Driving and driven adapters around a port' },
      ],
      correct: 1,
      explanation: {
        ru: 'Ядро держит только то, без чего система не работает, а всё изменчивое приходит плагинами. Адаптеры вокруг портов - это гексагональная архитектура.',
        en: 'The core holds only what the system cannot run without, and everything that varies comes as plug-ins. Adapters around ports belong to hexagonal architecture.',
      },
      hint: {
        ru: 'Смотрите раздел «Решение» на вкладке «Суть».',
        en: 'See the "Solution" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Зачем ядру реестр плагинов?',
        en: 'Why does the core need a plug-in registry?',
      },
      options: [
        { ru: 'Чтобы хранить в нём адреса всех зарегистрированных пользователей', en: 'To store the addresses of all registered users in it' },
        { ru: 'Чтобы плагины могли через него вызывать друг друга напрямую', en: 'So the plug-ins can call each other directly through it' },
        { ru: 'Чтобы скачивать обновления ядра с сервера разработчика', en: 'To download new core updates from the developer\'s server' },
        { ru: 'Чтобы знать, какие плагины установлены, и вызывать их', en: 'To know which plug-ins are installed and to call them' },
      ],
      correct: 3,
      explanation: {
        ru: 'Реестр - это список установленных плагинов: ядро обходит его при каждой регистрации. Адреса хранятся отдельно, а плагины друг друга не вызывают.',
        en: 'The registry is the list of installed plug-ins: the core walks it on every registration. Addresses are kept separately, and plug-ins do not call each other.',
      },
      hint: {
        ru: 'Смотрите шаг «Ядро: данные и реестр» на вкладке «Реализация».',
        en: 'See the "The core: data and registry" step on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'В примере включили плагин `no-disposable`. Что произойдёт при попытке зарегистрировать `b@mailinator.com`?',
        en: 'The `no-disposable` plug-in is switched on in the example. What happens when you try to register `b@mailinator.com`?',
      },
      options: [
        { ru: 'Регистрация пройдёт, потому что ядро не знает про одноразовые адреса и не смотрит на домен', en: 'It goes through, because the core knows nothing of disposable addresses and ignores the domain' },
        { ru: 'Регистрация будет отклонена, и страница покажет текст ошибки, который вернул плагин', en: 'It is refused, and the page shows the error text that the plug-in returned' },
        { ru: 'Страница перезагрузится, потому что плагин изменил код ядра и его нужно перечитать', en: 'The page reloads, because the plug-in changed the core\'s code and it must be re-read' },
        { ru: 'Ядро выключит плагин, потому что он нарушил контракт, вернув строку вместо `null`', en: 'The core switches the plug-in off for breaking the contract by returning a string instead of `null`' },
      ],
      correct: 1,
      explanation: {
        ru: 'Ядро вызывает `check` у каждого установленного плагина и отклоняет регистрацию с его текстом, если тот вернул не `null`. Строка с ошибкой - это часть контракта, а не его нарушение.',
        en: 'The core calls `check` on each installed plug-in and refuses the registration with its text if it returned anything but `null`. An error string is part of the contract, not a breach of it.',
      },
      hint: {
        ru: 'Смотрите шаг «Ядро вызывает плагины из реестра» на вкладке «Схема».',
        en: 'See the "The core calls the plug-ins from the registry" step on the "Diagram" tab.',
      },
    },
    {
      question: {
        ru: 'Зачем `install` проверяет, что у плагина есть строковое `name` и функция `check`?',
        en: 'Why does `install` check that the plug-in has a string `name` and a `check` function?',
      },
      options: [
        { ru: 'Так JavaScript требует от любых объектов, которые кладут в коллекцию `Map`', en: 'JavaScript demands it of any object that is ever put into a `Map`' },
        { ru: 'Чтобы плагин мог позже переименовать себя и подменить другой плагин', en: 'So the plug-in can later rename itself and quietly replace another one' },
        { ru: 'Это контракт: плохой плагин отклоняется сразу, а не посреди регистрации', en: 'It is the contract: a bad plug-in is refused at once, not mid-registration' },
        { ru: 'Чтобы ядро знало, какое правило проверяет плагин, и могло его оптимизировать', en: 'So the core knows which rule the plug-in checks and can optimise that rule' },
      ],
      correct: 2,
      explanation: {
        ru: 'Контракт - единственное, что ядро знает о плагинах. Проверка при установке ловит несовместимый плагин раньше, чем его вызовут. Что именно проверяет плагин, ядро не знает и знать не должно.',
        en: 'The contract is the only thing the core knows about plug-ins. Checking it at installation catches an incompatible plug-in before it is ever called. What a plug-in actually checks, the core does not and should not know.',
      },
      hint: {
        ru: 'Смотрите шаг «install - проверка контракта» на вкладке «Реализация».',
        en: 'See the "install - checking the contract" step on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Почему ядро в примере отказывает в регистрации, если плагин бросил исключение, а не просто пропускает его?',
        en: 'Why does the example core refuse the registration when a plug-in throws, instead of just skipping it?',
      },
      options: [
        { ru: 'Иначе исключение уронило бы весь браузер вместе с другими вкладками', en: 'Otherwise the exception would crash the whole browser along with other tabs' },
        { ru: 'Пропустить плагин невозможно технически: после исключения реестр очищается', en: 'Skipping is technically impossible: the registry is cleared after an exception' },
        { ru: 'Для проверок безопаснее отказать, чем молча пропустить невыполненное правило', en: 'For checks it is safer to refuse than to silently skip a rule that did not run' },
        { ru: 'Так требует контракт: плагин обязан бросать исключение вместо возврата ошибки', en: 'The contract demands it: a plug-in must throw rather than return an error' },
      ],
      correct: 2,
      explanation: {
        ru: 'Это осознанная «закрытая» политика: если правило не смогло выполниться, лучше не сохранять адрес. Для необязательных функций разумнее обратное - пропустить плагин и работать дальше.',
        en: 'It is a deliberate "fail closed" policy: if a rule could not run, better not to save the address. For optional features the opposite makes sense - skip the plug-in and carry on.',
      },
      hint: {
        ru: 'Смотрите шаг «Вызов плагинов и их ошибки» на вкладке «Реализация» и пункт «Закрытая или открытая политика» в разделе «Нюансы выбора».',
        en: 'See the "Calling the plug-ins and their failures" step on the "Implementation" tab and the "Fail closed or fail open" point in the "Choice nuances" section.',
      },
    },
    {
      question: {
        ru: 'Почему плагины в архитектуре микроядра не должны вызывать друг друга?',
        en: 'Why should plug-ins in a microkernel architecture not call each other?',
      },
      options: [
        { ru: 'Иначе их нельзя будет включать в любом сочетании, и важным станет порядок вызова', en: 'Otherwise they cannot be switched on in any combination, and call order starts to matter' },
        { ru: 'Потому что в JavaScript объект не может вызвать метод другого объекта из того же массива', en: 'Because in JavaScript an object cannot call a method of another object in the same array' },
        { ru: 'Потому что вызовы между плагинами всегда идут по сети и поэтому слишком медленные', en: 'Because calls between plug-ins always go over the network and are therefore too slow' },
        { ru: 'Потому что каждый плагин работает в своём процессе, и общих объектов у них нет', en: 'Because each plug-in runs in its own process and they share no objects' },
      ],
      correct: 0,
      explanation: {
        ru: 'Независимость плагинов - главное свойство стиля. Связанные плагины превращаются в один модуль, разрезанный на части, и включать их по отдельности уже нельзя.',
        en: 'Independent plug-ins are the style\'s main property. Coupled plug-ins turn into one module cut into pieces, and they can no longer be switched on separately.',
      },
      hint: {
        ru: 'Смотрите пятый абзац раздела «Как это работает».',
        en: 'See the fifth paragraph of the "How it works" section.',
      },
    },
    {
      question: {
        ru: 'Сторонний плагин завис в бесконечном цикле внутри `check`. Поможет ли `try/catch` из примера?',
        en: 'A third-party plug-in hangs in an infinite loop inside `check`. Will the `try/catch` from the example help?',
      },
      options: [
        { ru: 'Да: `catch` сработает через несколько секунд и покажет сообщение с именем плагина', en: 'Yes: `catch` fires after a few seconds and shows a message naming the plug-in' },
        { ru: 'Да, если перед вызовом удалить плагин из реестра через `uninstall`', en: 'Yes, if the plug-in is removed from the registry with `uninstall` before the call' },
        { ru: 'Нет, но ядро само перезапустит плагин в отдельном потоке после зависания', en: 'No, but the core restarts the plug-in on its own thread after the hang' },
        { ru: 'Нет: цикл не бросает исключение, поможет только отдельный процесс для плагина', en: 'No: a loop throws nothing; only running the plug-in in a separate process helps' },
      ],
      correct: 3,
      explanation: {
        ru: '`try/catch` ловит только исключения. Зависший плагин в том же потоке останавливает всё приложение, поэтому VS Code и браузеры выносят расширения в отдельные процессы.',
        en: '`try/catch` catches only exceptions. A hung plug-in on the same thread stops the whole application, which is why VS Code and browsers move extensions into separate processes.',
      },
      hint: {
        ru: 'Смотрите шаг «Сломанный плагин» на вкладке «Реализация» и второй пункт минусов.',
        en: 'See the "A broken plug-in" step on the "Implementation" tab and the second "Cons" item.',
      },
    },
    {
      question: {
        ru: 'И у гексагональной архитектуры, и у микроядра «ядро в центре и что-то вокруг». В чём главная разница?',
        en: 'Both hexagonal architecture and a microkernel have "a core in the middle and things around it". What is the main difference?',
      },
      options: [
        { ru: 'Разницы нет: «плагин» и «адаптер» - это просто два названия одного и того же', en: 'There is none: "plug-in" and "adapter" are just two different names for one and the same thing' },
        { ru: 'Адаптеры подключают к правилам внешний мир, а плагины расширяют сами правила продукта', en: 'Adapters connect the outside world to the rules; plug-ins extend the rules themselves' },
        { ru: 'В гексагональной зависимости направлены наружу, а в микроядре - внутрь, к ядру', en: 'In hexagonal, dependencies point outward to the world; in a microkernel, inward to the core' },
        { ru: 'Микроядро бывает только в операционных системах, а гексагон - только в веб-приложениях', en: 'A microkernel exists only in operating systems, and a hexagon only in web applications' },
      ],
      correct: 1,
      explanation: {
        ru: 'В гексагоне меняются технологии вокруг неизменных правил: база, интерфейс, тесты. В микроядре меняется сам набор правил и функций. Зависимости в обоих случаях направлены к ядру.',
        en: 'In a hexagon the technologies around unchanging rules vary: the database, the UI, the tests. In a microkernel the set of rules and features itself varies. Dependencies point to the core in both.',
      },
      hint: {
        ru: 'Смотрите последний абзац раздела «Как это работает» и пункт «Микроядро или гексагон» в разделе «Нюансы выбора».',
        en: 'See the last paragraph of the "How it works" section and the "Microkernel or hexagon" point in the "Choice nuances" section.',
      },
    },
    {
      question: {
        ru: 'Чем микроядро операционной системы отличается от архитектуры микроядра приложения?',
        en: 'How does an operating system microkernel differ from the microkernel architecture of an application?',
      },
      options: [
        { ru: 'Ничем: архитектура микроядра применима только при написании операционных систем', en: 'In nothing: microkernel architecture applies only to writing operating systems' },
        { ru: 'В ОС ядро самое большое и всё в нём, а в приложении ядро самое маленькое', en: 'In an OS the core is the biggest and holds everything; in an app the core is the smallest' },
        { ru: 'Микроядро ОС выносит драйверы в процессы, приложение выносит функции в плагины', en: 'An OS microkernel moves drivers into processes; an app moves features into plug-ins' },
        { ru: 'Микроядро ОС - это Linux, а архитектура микроядра - это его плагины-модули', en: 'An OS microkernel is Linux, and microkernel architecture is its plug-in modules' },
      ],
      correct: 2,
      explanation: {
        ru: 'Идея одна - оставить в ядре только неизменную основу, - но применяется на разных уровнях: в Mach, L4 и MINIX 3 вне ядра работают драйверы и файловые системы, в приложении - функции и правила продукта. Linux, кстати, монолитное ядро.',
        en: 'The idea is the same - keep only the stable foundation in the core - but applied at different levels: in Mach, L4, and MINIX 3 drivers and file systems run outside the kernel; in an application, product features and rules do. Linux, by the way, is a monolithic kernel.',
      },
      hint: {
        ru: 'Смотрите первые два абзаца раздела «Как это работает».',
        en: 'See the first two paragraphs of the "How it works" section.',
      },
    },
    {
      question: {
        ru: 'Страховая компания работает в 12 регионах, у каждого свои правила проверки заявок, и регионы добавляются каждый год. Общий процесс обработки заявки почти не меняется. Какой стиль подходит лучше всего?',
        en: 'An insurer operates in 12 regions, each with its own claim-checking rules, and regions are added every year. The shared claim-processing flow barely changes. Which style fits best?',
      },
      options: [
        { ru: 'Слоистая архитектура: правила всех регионов в одном сервисе, разведённые условиями по коду региона', en: 'Layered architecture: every region\'s rules in one service, split by conditions on the region code' },
        { ru: 'Гексагональная: на каждый регион отдельный ведомый адаптер хранилища', en: 'Hexagonal: a separate driven storage adapter for each region' },
        { ru: 'Микроядро: процесс обработки в ядре, правила каждого региона - в своём плагине', en: 'Microkernel: the flow in the core, each region\'s rules in their own plug-in' },
        { ru: 'Отдельная копия всего приложения на каждый регион, чтобы правила никогда не пересекались', en: 'A separate copy of the whole application per region so the rules never overlap' },
      ],
      correct: 2,
      explanation: {
        ru: 'Это пример Ричардса и Форда: стабильный процесс в ядре, изменчивые правила по юрисдикциям - в плагинах. Новый регион - новый плагин без правки ядра. Адаптер хранилища меняет технологию, а не правила.',
        en: 'This is Richards and Ford\'s example: a stable flow in the core, the volatile per-jurisdiction rules in plug-ins. A new region is a new plug-in with no core edit. A storage adapter changes technology, not rules.',
      },
      hint: {
        ru: 'Смотрите пункт «Правила по регионам и клиентам» в разделе «Нюансы выбора».',
        en: 'See the "Rules per region and customer" point in the "Choice nuances" section.',
      },
    },
  ],
};

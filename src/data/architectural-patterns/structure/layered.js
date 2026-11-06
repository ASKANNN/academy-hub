export const layered = {
  slug: 'layered',
  category: 'structure',
  name: { ru: 'Слоистая архитектура', en: 'Layered Architecture' },
  popularity: 3,
  tags: ['structure', 'separation-of-concerns', 'n-tier'],

  intent: {
    ru: 'Слоистая архитектура (Layered Architecture) делит приложение на горизонтальные слои, у каждого из которых одна техническая роль: показать данные пользователю, применить бизнес-правила, сохранить и прочитать данные. Слой обращается только к слою под ним, а нижние слои ничего не знают о верхних. Поэтому любой слой можно понять, протестировать и заменить, не разбираясь в остальных.',
    en: 'Layered architecture splits an application into horizontal layers, each with one technical role: showing data to the user, applying business rules, storing and loading data. A layer calls only the layer below it, and lower layers know nothing about the ones above. That makes any layer possible to understand, test, and replace without digging into the rest.',
  },

  problem: {
    ru: 'В приложении без структуры обработчик кнопки сам проверяет ввод, сам собирает SQL-запрос, сам решает, можно ли регистрировать пользователя, и сам рисует ответ. Бизнес-правило вроде «email должен быть уникальным» оказывается размазано по экранам, и форма регистрации, API и импорт из файла проверяют его каждый по-своему. Смена базы данных или фреймворка интерфейса превращается в переписывание всего кода, потому что у каждой строки есть зависимость от всего сразу.',
    en: 'In an unstructured application a button handler validates the input, builds the SQL query, decides whether a user may register, and renders the response, all by itself. A business rule such as "the email must be unique" ends up smeared across screens, and the sign-up form, the API, and a file import each check it in their own way. Switching databases or UI frameworks turns into rewriting everything, because every line depends on everything else.',
  },

  solution: {
    ru: 'Код раскладывается по слоям сверху вниз. **Слой представления** принимает ввод и показывает результат, но правил не знает. **Бизнес-слой** (сервисы) содержит правила предметной области и решает, что делать. **Слой хранения** (репозитории) переводит вопросы бизнес-слоя в запросы к базе и возвращает готовые объекты. **База данных** хранит сами данные. Каждый слой вызывает только соседа снизу, а результат возвращается обратно тем же путём, как значение вызова - нижний слой никогда сам не обращается к верхнему.',
    en: 'Code is arranged in layers from top to bottom. The **presentation layer** takes input and shows results but knows no rules. The **business layer** (services) holds the domain rules and decides what to do. The **persistence layer** (repositories) turns the business layer\'s questions into database queries and returns ready objects. The **database** stores the data itself. Each layer calls only its neighbour below, and the result travels back up the same path as a return value - a lower layer never calls an upper one on its own.',
  },

  diagram: {
    layout: 'stack',
    nodes: [
      {
        id: 'presentation',
        label: { ru: 'Представление', en: 'Presentation' },
        role: {
          ru: 'Экран, форма или HTTP-обработчик. Забирает ввод, передаёт его в бизнес-слой и показывает результат или текст ошибки. Бизнес-правил здесь нет, и о базе этот слой не знает.',
          en: 'A screen, a form, or an HTTP handler. Takes input, hands it to the business layer, and shows the result or the error text. There are no business rules here, and this layer knows nothing about the database.',
        },
      },
      {
        id: 'business',
        label: { ru: 'Бизнес-логика', en: 'Business' },
        role: {
          ru: 'Сервисы с правилами предметной области: нормализовать email, проверить формат и уникальность, решить, можно ли сохранять. Данные получает и сохраняет только через слой хранения, а об экране не знает ничего.',
          en: 'Services holding the domain rules: normalise the email, check its format and uniqueness, decide whether it may be saved. It reads and writes data only through the persistence layer and knows nothing about the screen.',
        },
      },
      {
        id: 'persistence',
        label: { ru: 'Хранение', en: 'Persistence' },
        role: {
          ru: 'Репозитории: переводят вопросы бизнес-слоя («есть ли пользователь с таким email?») в запросы к базе и возвращают обычные объекты. Из слоёв приложения только этот знает, как устроены таблицы.',
          en: 'Repositories: turn the business layer\'s questions ("is there a user with this email?") into database queries and return plain objects. Of the application\'s layers, only this one knows how the tables are laid out.',
        },
      },
      {
        id: 'database',
        label: { ru: 'База данных', en: 'Database' },
        role: {
          ru: 'Хранит строки таблиц и выполняет запросы. В реальной системе это СУБД вроде PostgreSQL, в примере на вкладке «Реализация» - объект в памяти с методами `insert` и `select`.',
          en: 'Stores table rows and runs queries. In a real system it is a DBMS such as PostgreSQL; in the example on the "Implementation" tab it is an in-memory object with `insert` and `select` methods.',
        },
      },
    ],
    connections: [
      { from: 'presentation', to: 'business', label: { ru: 'вызывает сервис', en: 'calls service' } },
      { from: 'business', to: 'persistence', label: { ru: 'вызывает репозиторий', en: 'calls repository' } },
      { from: 'persistence', to: 'database', label: { ru: 'запрос', en: 'query' } },
    ],
  },

  steps: [
    {
      title: { ru: 'Представление принимает ввод', en: 'Presentation takes the input' },
      explanation: {
        ru: 'Пользователь вводит email и отправляет форму. Слой представления не проверяет, хороший ли это email, а просто передаёт введённую строку в бизнес-слой, вызывая метод сервиса.',
        en: 'The user types an email and submits the form. The presentation layer does not judge whether the email is any good - it just passes the raw string to the business layer by calling a service method.',
      },
    },
    {
      title: { ru: 'Бизнес-слой применяет правила', en: 'The business layer applies the rules' },
      explanation: {
        ru: 'Сервис нормализует email, проверяет формат, а для проверки уникальности спрашивает слой хранения, нет ли уже такого пользователя. Если правило нарушено, сервис бросает исключение, и до сохранения дело не доходит.',
        en: 'The service normalises the email, checks its format, and asks the persistence layer whether such a user already exists to check uniqueness. If a rule is broken the service throws, and nothing gets saved.',
      },
    },
    {
      title: { ru: 'Слой хранения обращается к базе', en: 'The persistence layer queries the database' },
      explanation: {
        ru: 'Репозиторий превращает вопрос «найди по email» или команду «сохрани» в запрос к базе. Как устроены таблицы, знает только он - сервис работает с обычными объектами.',
        en: 'The repository turns the question "find by email" or the command "save" into a database query. Only it knows how the tables are laid out - the service works with plain objects.',
      },
    },
    {
      title: { ru: 'Результат поднимается обратно', en: 'The result travels back up' },
      explanation: {
        ru: 'Строки из базы возвращаются в репозиторий, тот отдаёт объекты сервису, сервис - результат или исключение представлению, а оно показывает сообщение и обновлённый список. Ответ идёт как значение вызова: ни один нижний слой не вызывает верхний сам.',
        en: 'Rows come back from the database to the repository, which hands objects to the service, which hands a result or an exception to the presentation layer, which shows a message and the updated list. The answer travels as a return value: no lower layer calls an upper one by itself.',
      },
    },
  ],

  implementation: {
    javascript: `class Database {
  constructor() {
    this.tables = { users: [] };
  }

  insert(table, row) {
    this.tables[table].push({ ...row });
  }

  select(table, where) {
    return this.tables[table].filter(where).map((row) => ({ ...row }));
  }
}

class UserRepository {
  constructor(db) {
    this.db = db;
  }

  findByEmail(email) {
    return this.db.select('users', (row) => row.email === email)[0] ?? null;
  }

  findAll() {
    return this.db.select('users', () => true);
  }

  save(user) {
    this.db.insert('users', user);
  }
}

class UserService {
  constructor(repository) {
    this.repository = repository;
  }

  register(rawEmail) {
    const email = rawEmail.trim().toLowerCase();
    if (!/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(email)) {
      throw new Error('Invalid email');
    }
    if (this.repository.findByEmail(email)) {
      throw new Error('Email already registered');
    }
    this.repository.save({ email });
    return email;
  }

  listEmails() {
    return this.repository.findAll().map((user) => user.email);
  }
}

class RegistrationPage {
  constructor(root, service) {
    this.service = service;
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
      const email = this.service.register(this.input.value);
      this.message.textContent = 'Registered: ' + email;
      this.input.value = '';
    } catch (error) {
      this.message.textContent = error.message;
    }
    this.renderList();
  }

  renderList() {
    const items = this.service.listEmails().map((email) =>
      Object.assign(document.createElement('li'), { textContent: email }));
    this.list.replaceChildren(...items);
  }
}

const root = document.querySelector('#app');
root.innerHTML = \`
  <form>
    <input placeholder="you@example.com">
    <button>Register</button>
  </form>
  <p></p>
  <ul></ul>\`;

new RegistrationPage(root, new UserService(new UserRepository(new Database())));`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1, 13],
        title: { ru: 'Database - самый нижний слой', en: 'Database - the bottom layer' },
        explanation: {
          ru: 'Заменитель настоящей СУБД: таблицы в памяти, `insert` и `select` с условием. Обратите внимание, что строки копируются и при записи, и при чтении - снаружи нельзя случайно поменять данные внутри «базы», как и в настоящей СУБД.',
          en: 'A stand-in for a real DBMS: in-memory tables, `insert`, and `select` with a condition. Note that rows are copied both on write and on read - outside code cannot accidentally change data inside the "database", just as with a real DBMS.',
        },
      },
      {
        lines: [15, 18],
        title: { ru: 'Репозиторий знает только базу', en: 'The repository knows only the database' },
        explanation: {
          ru: 'Слой хранения получает в конструкторе единственную зависимость - объект базы. О сервисах и экранах он не знает: никаких ссылок наверх здесь нет и быть не должно.',
          en: 'The persistence layer receives a single dependency in its constructor - the database object. It knows nothing about services or screens: there are no upward references here, and there must not be.',
        },
      },
      {
        lines: [20, 31],
        title: { ru: 'Вопросы предметной области -> запросы', en: 'Domain questions -> queries' },
        explanation: {
          ru: '`findByEmail`, `findAll` и `save` говорят на языке предметной области, а внутри превращаются в обращения к таблице `users`. Если данные переедут, например, в `localStorage`, перепишутся только тела этих методов, а их сигнатуры и весь код выше останутся прежними. С сетевой СУБД вроде PostgreSQL методы в JavaScript стали бы ещё и асинхронными, и `await` пришлось бы добавить в сервис - но сами правила не изменились бы.',
          en: '`findByEmail`, `findAll`, and `save` speak the domain\'s language and turn into calls on the `users` table inside. If the data moves to, say, `localStorage`, only the bodies of these methods get rewritten while their signatures and all the code above stay the same. With a networked DBMS such as PostgreSQL the methods would also become asynchronous in JavaScript, and the service would need `await` - but the rules themselves would not change.',
        },
      },
      {
        lines: [33, 36],
        title: { ru: 'Сервис знает только репозиторий', en: 'The service knows only the repository' },
        explanation: {
          ru: 'Бизнес-слой получает репозиторий, а не базу. Поэтому в тесте сервису можно передать заглушку с теми же тремя методами и проверить правила без всякого хранилища.',
          en: 'The business layer receives the repository, not the database. So a test can hand the service a stub with the same three methods and check the rules with no storage at all.',
        },
      },
      {
        lines: [38, 42],
        title: { ru: 'Правило формата', en: 'The format rule' },
        explanation: {
          ru: 'Сервис сам приводит email к одному виду (пробелы по краям, регистр) и проверяет формат. Это бизнес-правило, поэтому оно здесь, а не в форме: одинаково сработает для формы, API и импорта из файла.',
          en: 'The service itself brings the email to one form (surrounding spaces, letter case) and checks the format. It is a business rule, so it lives here rather than in the form: it works the same for the form, an API, and a file import.',
        },
      },
      {
        lines: [43, 48],
        title: { ru: 'Правило уникальности и сохранение', en: 'The uniqueness rule and saving' },
        explanation: {
          ru: 'Чтобы проверить уникальность, сервис спрашивает слой ниже через `findByEmail`. Благодаря нормализации выше `Ann@Example.com` и `ann@example.COM` по правилу этого сервиса считаются одним адресом. Если всё в порядке, сервис сохраняет пользователя и возвращает итоговый email.',
          en: 'To check uniqueness, the service asks the layer below through `findByEmail`. Thanks to the normalisation above, `Ann@Example.com` and `ann@example.COM` count as one address under this service\'s rule. If all is well, the service saves the user and returns the final email.',
        },
      },
      {
        lines: [50, 53],
        title: { ru: 'listEmails - ответ без деталей хранения', en: 'listEmails - an answer without storage details' },
        explanation: {
          ru: 'Сервис отдаёт наверх список адресов, а не строки таблицы. Слою представления не нужно знать, какие ещё поля лежат в базе.',
          en: 'The service hands up a list of addresses, not table rows. The presentation layer does not need to know what other fields live in the database.',
        },
      },
      {
        lines: [55, 66],
        title: { ru: 'Страница знает только сервис', en: 'The page knows only the service' },
        explanation: {
          ru: 'Слой представления получает сервис и находит свои элементы. `preventDefault()` не даёт браузеру перезагрузить страницу при отправке формы, иначе пропали бы все данные, которые «база» держит в памяти. Репозитория и базы страница не видит - в слоистой архитектуре нельзя перепрыгнуть через слой.',
          en: 'The presentation layer receives the service and finds its elements. `preventDefault()` stops the browser from reloading the page on form submit, which would otherwise wipe everything the "database" keeps in memory. The page never sees the repository or the database - in a layered architecture you do not jump over a layer.',
        },
      },
      {
        lines: [68, 77],
        title: { ru: 'submit - передать и показать', en: 'submit - hand over and show' },
        explanation: {
          ru: 'Страница отдаёт строку из поля сервису как есть и показывает результат. Если сервис бросил исключение, его текст становится сообщением об ошибке. Решения «можно или нельзя» здесь нет - только перевод между пользователем и бизнес-слоем.',
          en: 'The page hands the field\'s string to the service as is and shows the result. If the service throws, its message becomes the error text. There is no "allowed or not" decision here - only translation between the user and the business layer.',
        },
      },
      {
        lines: [79, 84],
        title: { ru: 'renderList - вывод через textContent', en: 'renderList - output through textContent' },
        explanation: {
          ru: 'Список строится из `li` с `textContent`, а не через `innerHTML`. Адрес, введённый пользователем, может содержать `<` и `>`, и так он всегда покажется как текст, а не превратится в разметку.',
          en: 'The list is built from `li` elements with `textContent`, not through `innerHTML`. An address typed by the user may contain `<` and `>`, and this way it always shows as text instead of turning into markup.',
        },
      },
      {
        lines: [86, 93],
        title: { ru: 'Разметка экрана', en: 'The screen markup' },
        explanation: {
          ru: 'Статичная разметка формы: поле, кнопка, строка для сообщения и пустой список. Пользовательских данных в ней нет, поэтому `innerHTML` здесь безопасен.',
          en: 'Static form markup: a field, a button, a line for the message, and an empty list. It contains no user data, so `innerHTML` is safe here.',
        },
      },
      {
        lines: [95, 95],
        title: { ru: 'Сборка слоёв снизу вверх', en: 'Assembling the layers bottom up' },
        explanation: {
          ru: 'Одна строка собирает всю систему: база передаётся в репозиторий, репозиторий - в сервис, сервис - в страницу. Каждый объект получает только соседа снизу, поэтому любой слой можно подменить, не трогая остальные.',
          en: 'One line assembles the whole system: the database goes into the repository, the repository into the service, the service into the page. Each object receives only its neighbour below, so any layer can be swapped without touching the rest.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'Структура понятна почти любому разработчику: по названию слоя ясно, где искать проверку ввода, бизнес-правило или запрос к базе. Новичку в проекте не нужно долго разбираться, куда класть код.',
      en: 'Almost any developer understands the structure: the layer name tells you where to look for input handling, a business rule, or a database query. A newcomer does not need long to work out where code goes.',
    },
    {
      ru: 'Изменения изолированы: замена базы данных затрагивает слой хранения, смена фреймворка интерфейса - слой представления, а бизнес-правила остаются на месте.',
      en: 'Changes stay isolated: swapping the database touches the persistence layer, switching the UI framework touches the presentation layer, and the business rules stay where they are.',
    },
    {
      ru: 'Слои тестируются по отдельности: сервис проверяют с заглушкой репозитория, без базы и без интерфейса, а репозиторий - на тестовой базе, без сервисов.',
      en: 'Layers are tested separately: a service is checked with a stub repository, with no database and no UI, and a repository against a test database, with no services.',
    },
  ],
  cons: [
    {
      ru: 'Часть запросов проходит слои насквозь: сервис просто передаёт вызов репозиторию, ничего не добавив. Это лишний код и лишние вызовы, а в простом CRUD-приложении таких запросов большинство.',
      en: 'Some requests pass straight through the layers: the service just forwards the call to the repository without adding anything. That is extra code and extra calls, and in a simple CRUD app such requests are the majority.',
    },
    {
      ru: 'Бизнес-слой зависит от слоя хранения, а значит правила предметной области оказываются привязаны к тому, как устроено хранилище. Гексагональная и чистая архитектуры появились во многом как ответ на эту проблему.',
      en: 'The business layer depends on the persistence layer, so the domain rules end up tied to how storage works. Hexagonal and clean architectures arose largely as an answer to this problem.',
    },
    {
      ru: 'Код разделён по технической роли, а не по функциям продукта: добавление одного поля в форму обычно требует правок во всех слоях сразу, и с ростом системы её трудно разделить на независимые части.',
      en: 'Code is split by technical role rather than by product feature: adding one field to a form usually means edits in every layer at once, and as the system grows it becomes hard to split into independent parts.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда начинается обычное бизнес-приложение - учёт, личный кабинет, внутренняя система - и требования ещё не устоялись. Слоистая архитектура даёт понятный порядок без лишних абстракций, и от неё легко перейти к более строгим стилям.',
      en: 'When an ordinary business application is starting - bookkeeping, a customer portal, an internal system - and the requirements have not settled yet. Layered architecture gives clear order without extra abstractions, and it is easy to move on from it to stricter styles.',
    },
    {
      ru: 'Когда команда разделена по специализациям (интерфейс, бэкенд, база данных) и каждой группе удобно отвечать за свой слой.',
      en: 'When the team is split by speciality (UI, backend, database) and each group is comfortable owning its own layer.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Spring** - типичное Spring-приложение раскладывает классы по аннотациям `@Controller`, `@Service` и `@Repository`, которые прямо соответствуют слоям представления, бизнес-логики и хранения.',
      en: '**Spring** - a typical Spring application sorts its classes by the `@Controller`, `@Service`, and `@Repository` annotations, which map directly onto the presentation, business, and persistence layers.',
    },
    {
      ru: '**Сетевой стек** - модель OSI и стек TCP/IP устроены слоями: HTTP работает поверх TCP, TCP поверх IP, IP поверх Ethernet или Wi-Fi, и замена нижнего слоя не требует менять верхние.',
      en: '**The network stack** - the OSI model and the TCP/IP stack are layered: HTTP runs on TCP, TCP on IP, IP on Ethernet or Wi-Fi, and replacing a lower layer does not require changing the upper ones.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: 'Идея слоёв старше программной архитектуры как дисциплины. В 1968 году **Эдсгер Дейкстра** описал операционную систему **THE** (Technische Hogeschool Eindhoven) как иерархию из шести уровней, от распределения процессора и памяти внизу до программ пользователя и оператора наверху. Каждый уровень пользовался только услугами уровней ниже, и благодаря этому систему можно было проверять по частям, снизу вверх.',
        en: 'The idea of layers predates software architecture as a discipline. In 1968 **Edsger Dijkstra** described the **THE** operating system (Technische Hogeschool Eindhoven) as a hierarchy of six levels, from processor and memory allocation at the bottom to user programs and the operator at the top. Each level used only the services of the levels below it, which made it possible to verify the system piece by piece, bottom up.',
      },
      {
        ru: 'Самый известный пример слоёв - **сетевые протоколы**. Модель **OSI** (стандарт ISO 7498, 1984) насчитывает семь уровней, практический стек **TCP/IP** - четыре. Каждый уровень даёт верхнему сервис через чёткий интерфейс: HTTP не знает, идут ли пакеты по Ethernet или по Wi-Fi, и поэтому физическую сеть можно менять, не трогая браузер.',
        en: 'The best-known example of layering is **network protocols**. The **OSI** model (ISO 7498, 1984) has seven layers, the practical **TCP/IP** stack has four. Each layer offers a service to the one above through a clear interface: HTTP does not know whether packets travel over Ethernet or Wi-Fi, so the physical network can change without touching the browser.',
      },
      {
        ru: 'Как архитектурный паттерн Layers описан в книге **«Pattern-Oriented Software Architecture»** (Бушман и соавторы, 1996). Там же различаются строгий вариант, где слой обращается только к соседу снизу, и **ослабленный** (Relaxed Layered System), где слой может обратиться к любому нижележащему. Ослабленный вариант гибче и может работать быстрее, но слабее изолирует слои: изменение внизу может задеть сразу несколько верхних.',
        en: 'As an architectural pattern, Layers is described in **"Pattern-Oriented Software Architecture"** (Buschmann et al., 1996). The book distinguishes the strict variant, where a layer calls only its neighbour below, from the **relaxed** one (Relaxed Layered System), where a layer may call any layer beneath it. The relaxed variant is more flexible and can be faster, but isolates layers less: a change at the bottom can hit several upper layers at once.',
      },
      {
        ru: 'В корпоративных приложениях число слоёв разное, а правило одно. **Мартин Фаулер** в «Patterns of Enterprise Application Architecture» (2002) выделяет три основных слоя: представление, предметная область и источник данных. **Эрик Эванс** в «Domain-Driven Design» (2003) - четыре: интерфейс пользователя, прикладной слой, предметная область и инфраструктура. **Марк Ричардс** в «Software Architecture Patterns» (O\'Reilly, 2015) использует вариант со схемы: представление, бизнес-логика, хранение и база данных.',
        en: 'In enterprise applications the number of layers varies, but the rule does not. **Martin Fowler** in "Patterns of Enterprise Application Architecture" (2002) names three principal layers: presentation, domain, and data source. **Eric Evans** in "Domain-Driven Design" (2003) uses four: user interface, application, domain, and infrastructure. **Mark Richards** in "Software Architecture Patterns" (O\'Reilly, 2015) uses the variant from the diagram: presentation, business, persistence, and database.',
      },
      {
        ru: 'Ричардс называет слой **закрытым**, если запрос обязан через него пройти, и **открытым**, если его можно обойти. Обычно все слои закрыты: представление не может обратиться к репозиторию напрямую, даже когда сервис ничего не добавляет. Так получается изоляция слоёв - изменение в слое хранения не доходит до представления. Открытым иногда делают вспомогательный слой общих сервисов, к которому бизнес-слой обращается по необходимости.',
        en: 'Richards calls a layer **closed** if a request must pass through it and **open** if it may be bypassed. Usually every layer is closed: the presentation layer may not call a repository directly, even when the service adds nothing. That is what gives layer isolation - a change in the persistence layer does not reach the presentation layer. An auxiliary shared-services layer is sometimes made open, so the business layer can use it only when needed.',
      },
      {
        ru: 'У закрытых слоёв есть цена - **антипаттерн «архитектурная воронка»** (architecture sinkhole): запрос проходит все слои, и ни один из них ничего с ним не делает, кроме передачи дальше. Ричардс предлагает правило 80/20: если так проходят около 20% запросов, это нормально, а если около 80%, слоистая архитектура, скорее всего, не подходит задаче.',
        en: 'Closed layers have a cost - the **architecture sinkhole anti-pattern**: a request passes through every layer and none of them does anything with it except hand it on. Richards suggests an 80/20 rule: if about 20% of requests pass through like that, it is fine, but if about 80% do, layered architecture is probably the wrong fit.',
      },
      {
        ru: 'Слои не надо путать с **уровнями** (tiers). Слой - это логическое разделение кода, уровень - физическое: отдельная машина или процесс, как в трёхуровневой архитектуре «браузер - сервер приложений - сервер базы данных». В примере на вкладке «Реализация» все четыре слоя работают в одной вкладке браузера, и это всё ещё слоистая архитектура.',
        en: 'Layers should not be confused with **tiers**. A layer is a logical division of code, a tier is a physical one: a separate machine or process, as in the three-tier "browser - application server - database server" setup. In the example on the "Implementation" tab all four layers run in one browser tab, and it is still a layered architecture.',
      },
      {
        ru: 'Главная критика классической схемы - **направление зависимости**: бизнес-слой зависит от слоя хранения, поэтому правила предметной области привязаны к хранилищу. **Гексагональная архитектура** (Алистер Кокберн, 2005), **луковая** (Джеффри Палермо, 2008) и **чистая** (Роберт Мартин, 2012) разворачивают эту зависимость: в центре предметная область, а база данных и интерфейс становятся внешними деталями. Вторая претензия - разделение по технической роли: Ричардс и Нил Форд в «Fundamentals of Software Architecture» (2020) противопоставляют ему разделение по предметным областям, при котором одна функция продукта живёт в одном модуле, а не размазана по всем слоям.',
        en: 'The main criticism of the classic scheme is the **direction of dependency**: the business layer depends on the persistence layer, so the domain rules are tied to storage. **Hexagonal architecture** (Alistair Cockburn, 2005), **onion** (Jeffrey Palermo, 2008), and **clean** (Robert Martin, 2012) invert that dependency: the domain sits at the centre, and the database and the UI become outer details. The second complaint is technical partitioning: Richards and Neal Ford in "Fundamentals of Software Architecture" (2020) contrast it with domain partitioning, where one product feature lives in one module instead of being spread over every layer.',
      },
    ],
    whenToUse: [
      {
        ru: '**Отправная точка** - если неясно, какой стиль выбрать, слоистая архитектура почти всегда приемлема для начала: она проста, всем знакома и не мешает позже вынести предметную область в центр, как в гексагональной архитектуре.',
        en: '**A starting point** - if it is unclear which style to pick, layered architecture is almost always acceptable to begin with: it is simple, familiar to everyone, and does not stop you from later moving the domain to the centre, as in hexagonal architecture.',
      },
      {
        ru: '**Строгие или ослабленные слои** - строгий вариант надёжнее изолирует изменения, ослабленный экономит вызовы. Если разрешаете обход, делайте его явным исключением для конкретного слоя (открытый слой), а не общим правилом «кто как хочет».',
        en: '**Strict or relaxed layers** - the strict variant isolates changes more reliably, the relaxed one saves calls. If you allow bypassing, make it an explicit exception for a specific layer (an open layer), not a general "anything goes" rule.',
      },
      {
        ru: '**Против слоёв** - если приложение почти целиком состоит из «прочитать запись и показать её», большинство запросов пройдёт через сервисы насквозь. Здесь слои дают церемонии без пользы, и проще обойтись двумя слоями или готовым CRUD-фреймворком.',
        en: '**Against layers** - if the application is almost entirely "read a record and show it", most requests will pass straight through the services. Here layers bring ceremony without benefit, and two layers or a ready-made CRUD framework are simpler.',
      },
      {
        ru: '**Против слоёв, когда правила сложные** - если предметная область богатая и живёт долго, а хранилищ и интерфейсов несколько, зависимость бизнес-слоя от хранения начинает мешать. Тогда лучше подходят гексагональная или чистая архитектура, где правила не зависят ни от базы, ни от экрана.',
        en: '**Against layers when the rules are complex** - if the domain is rich and long-lived, and there are several storage systems and interfaces, the business layer\'s dependency on persistence starts to get in the way. Hexagonal or clean architecture fits better then, since the rules depend on neither the database nor the screen.',
      },
      {
        ru: '**Большая система и много команд** - когда над продуктом работают десятки человек и каждая задача задевает все слои, команды начинают мешать друг другу. Это сигнал перейти к разделению по предметным областям (модульный монолит, затем, возможно, микросервисы).',
        en: '**A large system and many teams** - when dozens of people work on the product and every task touches every layer, teams start getting in each other\'s way. That is the signal to move to domain partitioning (a modular monolith, then possibly microservices).',
      },
    ],
    realWorld: [
      {
        ru: '**Edsger W. Dijkstra, «The Structure of the "THE"-Multiprogramming System» (Communications of the ACM, 1968)** - статья, где операционная система впервые описана как иерархия уровней, каждый из которых пользуется только нижними.',
        en: '**Edsger W. Dijkstra, "The Structure of the \'THE\'-Multiprogramming System" (Communications of the ACM, 1968)** - the paper that first described an operating system as a hierarchy of levels, each using only the ones below.',
      },
      {
        ru: '**Frank Buschmann и соавторы, «Pattern-Oriented Software Architecture, Volume 1» (1996)** - каноническое описание паттерна Layers со строгим и ослабленным вариантами.',
        en: '**Frank Buschmann et al., "Pattern-Oriented Software Architecture, Volume 1" (1996)** - the canonical description of the Layers pattern, with its strict and relaxed variants.',
      },
      {
        ru: '**Martin Fowler, «Patterns of Enterprise Application Architecture» (2002)** - глава о разделении на слои представления, предметной области и источника данных, а также паттерн **Service Layer**.',
        en: '**Martin Fowler, "Patterns of Enterprise Application Architecture" (2002)** - the chapter on splitting into presentation, domain, and data source layers, plus the **Service Layer** pattern.',
      },
      {
        ru: '**Mark Richards, «Software Architecture Patterns» (O\'Reilly, 2015)** - короткая книга, откуда взяты закрытые и открытые слои, изоляция слоёв и антипаттерн «архитектурная воронка».',
        en: '**Mark Richards, "Software Architecture Patterns" (O\'Reilly, 2015)** - the short book that gives closed and open layers, layer isolation, and the architecture sinkhole anti-pattern.',
      },
      {
        ru: '**Руководство по архитектуре Android-приложений (Google)** - рекомендует слой интерфейса, необязательный слой предметной области и слой данных; зависимости направлены от интерфейса к данным, а не наоборот.',
        en: '**Google\'s Guide to Android app architecture** - recommends a UI layer, an optional domain layer, and a data layer; dependencies point from the UI towards the data, not the other way round.',
      },
    ],
  },

  relatedPatterns: ['hexagonal', 'microkernel'],

  quiz: [
    {
      question: {
        ru: 'Какое главное правило зависимостей в слоистой архитектуре?',
        en: 'What is the main dependency rule in layered architecture?',
      },
      options: [
        { ru: 'Слой обращается только к слою под ним, а нижние слои о верхних не знают', en: 'A layer calls only the layer below it, and lower layers know nothing of upper ones' },
        { ru: 'Любой слой может вызвать любой другой, если так получается короче', en: 'Any layer may call any other one if that makes the code shorter' },
        { ru: 'Нижние слои сами вызывают верхние, чтобы сообщить им о новых данных из базы', en: 'Lower layers call upper ones themselves to tell them about new data from the database' },
        { ru: 'Каждый слой ходит в базу данных напрямую, минуя все остальные', en: 'Every layer goes to the database directly, bypassing all the others' },
      ],
      correct: 0,
      explanation: {
        ru: 'Вызовы идут только сверху вниз, к соседнему слою. Ответ возвращается как значение вызова, поэтому нижнему слою не нужна ни одна ссылка наверх.',
        en: 'Calls go only downward, to the neighbouring layer. The answer comes back as a return value, so a lower layer needs no reference upward at all.',
      },
      hint: {
        ru: 'Смотрите раздел «Решение» на вкладке «Суть» и направление стрелок на вкладке «Схема».',
        en: 'See the "Solution" section on the "Intent" tab and the direction of the arrows on the "Diagram" tab.',
      },
    },
    {
      question: {
        ru: 'Из каких слоёв состоит вариант, показанный на схеме?',
        en: 'Which layers make up the variant shown in the diagram?',
      },
      options: [
        { ru: 'Model, View, Controller и отдельный слой базы данных под ними', en: 'Model, View, Controller, and a separate database layer beneath them' },
        { ru: 'Представление, бизнес-логика, хранение и база данных', en: 'Presentation, business, persistence, and database' },
        { ru: 'Клиент, балансировщик нагрузки, сервер приложений и кэш', en: 'Client, load balancer, application server, and cache' },
        { ru: 'Ядро, плагины, порты и адаптеры', en: 'Core, plug-ins, ports, and adapters' },
      ],
      correct: 1,
      explanation: {
        ru: 'Это вариант Марка Ричардса: представление, бизнес-логика, хранение и база данных. У Фаулера и Эванса слоёв три или четыре с другими названиями, но правило зависимостей то же.',
        en: 'This is Mark Richards\'s variant: presentation, business, persistence, and database. Fowler and Evans have three or four layers with other names, but the same dependency rule.',
      },
      hint: {
        ru: 'Посмотрите на узлы вкладки «Схема».',
        en: 'Look at the nodes on the "Diagram" tab.',
      },
    },
    {
      question: {
        ru: 'Что делает слой хранения (репозиторий)?',
        en: 'What does the persistence layer (the repository) do?',
      },
      options: [
        { ru: 'Проверяет бизнес-правила, например уникальность email, перед сохранением', en: 'Checks business rules, such as email uniqueness, before saving' },
        { ru: 'Рисует форму регистрации и выводит сообщения об ошибках', en: 'Draws the sign-up form and shows the error messages' },
        { ru: 'Переводит вопросы бизнес-слоя в запросы к базе и возвращает объекты', en: 'Turns the business layer\'s questions into queries and returns objects' },
        { ru: 'Держит копию всех данных в памяти, чтобы настоящая база данных вообще не понадобилась', en: 'Keeps a cached copy of all the data in memory so no real database is ever needed' },
      ],
      correct: 2,
      explanation: {
        ru: 'Репозиторий говорит с сервисом на языке предметной области (`findByEmail`, `save`), а с базой - на языке таблиц. Правила - забота сервиса, экран - забота представления.',
        en: 'The repository talks to the service in domain terms (`findByEmail`, `save`) and to the database in terms of tables. Rules are the service\'s job, the screen is the presentation layer\'s.',
      },
      hint: {
        ru: 'Смотрите роль слоя «Хранение» на вкладке «Схема».',
        en: 'See the role of the "Persistence" layer on the "Diagram" tab.',
      },
    },
    {
      question: {
        ru: 'Почему в примере проверка «email уже занят» находится в `UserService`, а не в `RegistrationPage`?',
        en: 'Why does the "email already taken" check live in `UserService` rather than `RegistrationPage` in the example?',
      },
      options: [
        { ru: 'Потому что в JavaScript исключения можно бросать только из классов-сервисов, а не из классов страниц', en: 'Because JavaScript only allows throwing exceptions from service classes, not from page classes' },
        { ru: 'Это бизнес-правило: в сервисе оно сработает для формы, API и импорта одинаково', en: 'It is a business rule: in the service it works the same for the form, an API, and an import' },
        { ru: 'Потому что страница вызывается раньше сервиса и к этому моменту ещё не знает введённый адрес', en: 'Because the page runs before the service and does not know the typed address yet at that point' },
        { ru: 'Потому что база в примере требует, чтобы все проверки шли из одного класса', en: 'Because the example database demands that all checks come from one class' },
      ],
      correct: 1,
      explanation: {
        ru: 'Если правило живёт в форме, другие входы (API, импорт) его обойдут. В бизнес-слое оно одно на всех, и представлению остаётся только показать результат.',
        en: 'If the rule lives in the form, other entry points (an API, an import) bypass it. In the business layer there is one copy for everyone, and the presentation layer only shows the result.',
      },
      hint: {
        ru: 'Смотрите шаг «Правило уникальности и сохранение» в разборе кода на вкладке «Реализация» и раздел «Проблема».',
        en: 'See the "The uniqueness rule and saving" step in the code walkthrough on the "Implementation" tab and the "Problem" section.',
      },
    },
    {
      question: {
        ru: 'Чем закрытый слой отличается от открытого?',
        en: 'How does a closed layer differ from an open one?',
      },
      options: [
        { ru: 'Закрытый слой недоступен из тестов, а открытый можно тестировать как обычный код', en: 'A closed layer cannot be reached from tests, while an open one can be tested like normal code' },
        { ru: 'Закрытый слой работает в отдельном процессе, а открытый - в том же, что и остальные', en: 'A closed layer runs in a separate process, while an open one shares a process with the rest' },
        { ru: 'Через закрытый слой запрос обязан пройти, а открытый можно обойти', en: 'A request must pass through a closed layer, while an open one may be bypassed' },
        { ru: 'Закрытый слой нельзя менять после релиза, а открытый можно', en: 'A closed layer cannot change after release, while an open one can' },
      ],
      correct: 2,
      explanation: {
        ru: 'Закрытость - это правило вызовов, а не доступа или размещения. Закрытые слои дают изоляцию изменений, открытым обычно делают только вспомогательный слой общих сервисов.',
        en: 'Being closed is a rule about calls, not access or deployment. Closed layers give change isolation; usually only an auxiliary shared-services layer is made open.',
      },
      hint: {
        ru: 'Смотрите абзац про закрытые и открытые слои в разделе «Как это работает».',
        en: 'See the paragraph about closed and open layers in the "How it works" section.',
      },
    },
    {
      question: {
        ru: 'Что такое антипаттерн «архитектурная воронка» (architecture sinkhole)?',
        en: 'What is the architecture sinkhole anti-pattern?',
      },
      options: [
        { ru: 'Запросы проходят через все слои, и ни один слой ничего с ними не делает', en: 'Requests pass through every layer and no layer does anything with them' },
        { ru: 'Все данные стекаются в один огромный слой хранения, который со временем перестаёт помещаться в память', en: 'All data drains into one huge persistence layer that eventually no longer fits in memory' },
        { ru: 'Нижний слой начинает вызывать верхние, и зависимости замыкаются в кольцо', en: 'A lower layer starts calling upper ones, and the dependencies close into a ring' },
        { ru: 'Ошибки из базы данных теряются по пути и не доходят до пользователя', en: 'Database errors get lost on the way and never reach the user' },
      ],
      correct: 0,
      explanation: {
        ru: 'Это цена закрытых слоёв: сервис, который просто передаёт вызов репозиторию, - лишний код. Немного таких запросов - нормально, но если их большинство, слои задаче не подходят.',
        en: 'It is the price of closed layers: a service that just forwards a call to a repository is extra code. A few such requests are fine, but if they are the majority, layers do not fit the task.',
      },
      hint: {
        ru: 'Смотрите абзац про правило 80/20 в разделе «Как это работает» и первый пункт минусов.',
        en: 'See the paragraph about the 80/20 rule in the "How it works" section and the first "Cons" item.',
      },
    },
    {
      question: {
        ru: 'В примере данные решили хранить в `localStorage` вместо объекта `Database`. Какой код придётся переписать?',
        en: 'In the example, data is moved into `localStorage` instead of the `Database` object. Which code has to be rewritten?',
      },
      options: [
        { ru: 'Весь: в слоистой архитектуре смена базы всегда означает переписывание всех четырёх слоёв', en: 'All of it: in layered architecture a database change always means rewriting all four layers' },
        { ru: 'Только `RegistrationPage`, потому что именно она показывает данные из базы пользователю', en: 'Only `RegistrationPage`, because it is the one that shows database data to the user' },
        { ru: 'Только `UserService`, потому что правило уникальности зависит от того, где лежат данные', en: 'Only `UserService`, because the uniqueness rule depends on where the data lives' },
        { ru: 'Только два нижних слоя - хранение и база; сервис и страница не изменятся', en: 'Only the two bottom layers - persistence and database; the service and page stay as is' },
      ],
      correct: 3,
      explanation: {
        ru: 'Сервис общается с репозиторием через `findByEmail`, `findAll` и `save`, и эти сигнатуры остаются прежними. Где именно лежат данные, знают только два нижних слоя.',
        en: 'The service talks to the repository through `findByEmail`, `findAll`, and `save`, and those signatures stay the same. Where the data actually lives is known only to the two bottom layers.',
      },
      hint: {
        ru: 'Смотрите шаг «Вопросы предметной области -> запросы» на вкладке «Реализация».',
        en: 'See the "Domain questions -> queries" step on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Чем слой (layer) отличается от уровня (tier)?',
        en: 'How does a layer differ from a tier?',
      },
      options: [
        { ru: 'Ничем - это два перевода одного и того же термина, и все слои всегда работают на отдельных серверах', en: 'Nothing - they are two translations of one term, and every layer always runs on its own server' },
        { ru: 'Слой - логическое деление кода, уровень - физическое: отдельная машина или процесс', en: 'A layer is a logical division of code, a tier a physical one: a separate machine or process' },
        { ru: 'Уровень - это слой, который можно обойти, то есть то же самое, что открытый слой', en: 'A tier is a layer that may be bypassed, the same thing as an open layer' },
        { ru: 'Слой бывает только в сетевых протоколах, а уровень - в бизнес-приложениях', en: 'Layers exist only in network protocols, tiers only in business applications' },
      ],
      correct: 1,
      explanation: {
        ru: 'Слои описывают, как разделён код, уровни - где он работает. Все четыре слоя примера живут в одной вкладке браузера, а трёхуровневая система обычно разнесена по трём машинам или процессам.',
        en: 'Layers describe how code is divided, tiers describe where it runs. All four layers of the example live in one browser tab, while a three-tier system is usually spread over three machines or processes.',
      },
      hint: {
        ru: 'Смотрите абзац про уровни (tiers) в разделе «Как это работает».',
        en: 'See the paragraph about tiers in the "How it works" section.',
      },
    },
    {
      question: {
        ru: 'За что гексагональную и чистую архитектуры называют ответом на слоистую?',
        en: 'Why are hexagonal and clean architectures called an answer to layered architecture?',
      },
      options: [
        { ru: 'В слоистой бизнес-слой зависит от хранения, а они разворачивают эту зависимость к предметной области', en: 'In layered, business depends on persistence, and they invert that dependency toward the domain' },
        { ru: 'Слоистая архитектура не разрешает писать тесты, а гексагональная впервые сделала код тестируемым', en: 'Layered architecture does not allow tests, and hexagonal was the first to make code testable' },
        { ru: 'Слоистая архитектура работает только с реляционными базами, а они - с любыми', en: 'Layered architecture only works with relational databases, while they work with any' },
        { ru: 'Они просто добавляют пятый слой между сервисами и репозиториями, а правило зависимостей сверху вниз оставляют прежним', en: 'They just add a fifth layer between services and repositories and keep the top-down dependency rule as it was' },
      ],
      correct: 0,
      explanation: {
        ru: 'В классической схеме правила предметной области зависят от слоя хранения. В гексагональной, луковой и чистой архитектурах предметная область в центре и ни от чего не зависит, а база и интерфейс подключаются к ней снаружи.',
        en: 'In the classic scheme the domain rules depend on the persistence layer. In hexagonal, onion, and clean architectures the domain sits at the centre and depends on nothing, while the database and the UI plug into it from outside.',
      },
      hint: {
        ru: 'Смотрите последний абзац раздела «Как это работает» и второй пункт минусов.',
        en: 'See the last paragraph of the "How it works" section and the second "Cons" item.',
      },
    },
    {
      question: {
        ru: 'В слоистом приложении работают 40 человек. Почти каждая задача - например, «добавить телефон в профиль» - требует правок в контроллере, сервисе, репозитории и схеме базы, и команды постоянно мешают друг другу. В чём причина?',
        en: 'Forty people work on a layered application. Almost every task - say, "add a phone number to the profile" - needs edits in the controller, service, repository, and database schema, and teams keep getting in each other\'s way. What is the cause?',
      },
      options: [
        { ru: 'Слои слишком тонкие: нужно слить их в один, чтобы каждая задача правила ровно один файл', en: 'The layers are too thin: merge them into one so every task edits exactly one file' },
        { ru: 'Код делится по технической роли, а не по функциям, и задача задевает все слои', en: 'Code is split by technical role, not by feature, so a task touches every layer' },
        { ru: 'Слои сделаны открытыми: если их закрыть, правки в разных слоях станут независимыми', en: 'The layers were made open: closing them would make edits in different layers independent' },
        { ru: 'В проекте мало слоёв: если добавить ещё два, каждая команда получит свой слой', en: 'The project has too few layers: add two more and every team gets its own' },
      ],
      correct: 1,
      explanation: {
        ru: 'Слои режут систему поперёк функций продукта, поэтому одна функция размазана по всем слоям. На большом продукте помогает разделение по предметным областям - модульный монолит или сервисы, где функция живёт в одном модуле.',
        en: 'Layers cut the system across product features, so one feature is spread over every layer. In a large product, domain partitioning helps - a modular monolith or services, where a feature lives in one module.',
      },
      hint: {
        ru: 'Смотрите третий пункт минусов и пункт «Большая система и много команд» в разделе «Нюансы выбора».',
        en: 'See the third "Cons" item and the "A large system and many teams" point in the "Choice nuances" section.',
      },
    },
  ],
};

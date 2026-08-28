export const mvc = {
  slug: 'mvc',
  category: 'presentation',
  name: { ru: 'MVC', en: 'MVC' },
  popularity: 3,
  tags: ['presentation-layer', 'separation-of-concerns', 'ui'],

  intent: {
    ru: 'MVC разделяет приложение на три взаимосвязанные части: Model хранит данные и бизнес-логику, View отображает их пользователю, а Controller принимает пользовательский ввод и решает, как на него отреагировать - так экран, данные и логика ввода можно менять и тестировать по отдельности.',
    en: 'MVC splits an application into three interconnected parts: the Model holds data and business logic, the View displays it to the user, and the Controller takes user input and decides how to react to it - so the screen, the data, and the input logic can each be changed and tested independently.',
  },

  problem: {
    ru: 'Когда экран, данные и логика обработки ввода перемешаны в одном классе, любое изменение дизайна интерфейса рискует сломать бизнес-логику, а любой тест бизнес-правил вынужден тянуть за собой весь UI. Нужен способ развести эти три ответственности так, чтобы каждую можно было менять, не трогая остальные.',
    en: 'When the screen, the data, and the input-handling logic are all tangled together in one class, any interface redesign risks breaking business logic, and any test of business rules is forced to drag the whole UI along with it. What is needed is a way to split these three responsibilities so each can change without touching the others.',
  },

  solution: {
    ru: 'Model хранит состояние приложения и правила, по которым оно меняется, и ничего не знает об экране. View - это чистое отображение состояния Model, оно не содержит логики принятия решений. Controller получает событие от пользователя (клик, ввод текста), обновляет Model через её методы и, если нужно, выбирает, какой View показать дальше. Model, изменившись, оповещает View (напрямую или через подписку), и View перерисовывает себя, читая новое состояние - Controller в этот момент уже не участвует.',
    en: 'The Model holds the application\'s state and the rules for changing it, and knows nothing about the screen. The View is a pure rendering of the Model\'s state and contains no decision logic. The Controller receives a user event (a click, typed text), updates the Model through its methods, and, if needed, picks which View to show next. Once the Model changes, it notifies the View (directly or via a subscription), and the View re-renders itself by reading the new state - the Controller is not involved at that point.',
  },

  diagram: {
    layout: 'stack',
    nodes: [
      {
        id: 'view',
        label: { ru: 'View', en: 'View' },
        role: {
          ru: 'Отображает текущее состояние Model пользователю и передаёт события ввода (клики, ввод текста) Controller-у. Не содержит бизнес-логики и не меняет Model напрямую.',
          en: 'Displays the Model\'s current state to the user and forwards input events (clicks, typed text) to the Controller. Contains no business logic and never changes the Model directly.',
        },
      },
      {
        id: 'controller',
        label: { ru: 'Controller', en: 'Controller' },
        role: {
          ru: 'Принимает события от View, решает, какие методы Model вызвать в ответ, и при необходимости выбирает, какой View показать следующим.',
          en: 'Receives events from the View, decides which Model methods to call in response, and, if needed, picks which View to show next.',
        },
      },
      {
        id: 'model',
        label: { ru: 'Model', en: 'Model' },
        role: {
          ru: 'Хранит состояние приложения и правила его изменения. Оповещает View об изменениях (напрямую или через подписку), не зная, кто именно на них смотрит.',
          en: 'Holds the application\'s state and the rules for changing it. Notifies the View of changes (directly or via subscription) without knowing who is actually watching.',
        },
      },
    ],
    connections: [
      { from: 'view', to: 'controller', label: { ru: 'событие ввода', en: 'input event' } },
      { from: 'controller', to: 'model', label: { ru: 'обновляет', en: 'updates' } },
      { from: 'model', to: 'view', label: { ru: 'уведомляет', en: 'notifies' } },
    ],
  },

  steps: [
    {
      title: { ru: 'Пользователь действует', en: 'The user acts' },
      explanation: {
        ru: 'Пользователь кликает или вводит текст в View. View сама не решает, что с этим делать, - она передаёт событие Controller-у.',
        en: 'The user clicks or types into the View. The View does not decide what to do with it - it hands the event off to the Controller.',
      },
    },
    {
      title: { ru: 'Controller решает', en: 'The Controller decides' },
      explanation: {
        ru: 'Controller разбирает событие и вызывает подходящий метод Model, передавая ему только те данные, что нужны для изменения состояния.',
        en: 'The Controller parses the event and calls the appropriate Model method, passing along only the data needed to change the state.',
      },
    },
    {
      title: { ru: 'Model меняет состояние', en: 'The Model changes state' },
      explanation: {
        ru: 'Model выполняет свою бизнес-логику, обновляет внутреннее состояние и вызывает уведомление всех подписчиков о том, что состояние изменилось.',
        en: 'The Model runs its business logic, updates its internal state, and notifies every subscriber that the state has changed.',
      },
    },
    {
      title: { ru: 'View перерисовывается', en: 'The View re-renders' },
      explanation: {
        ru: 'Получив уведомление, View читает новое состояние Model и обновляет то, что видит пользователь. Controller в этом шаге уже не участвует.',
        en: 'Upon notification, the View reads the Model\'s new state and updates what the user sees. The Controller plays no part in this step.',
      },
    },
  ],

  implementation: {
    javascript: `class TodoModel {
  constructor() {
    this.items = [];
    this.listeners = [];
  }

  addItem(text) {
    this.items.push({ text, done: false });
    this._notify();
  }

  toggleItem(index) {
    this.items[index].done = !this.items[index].done;
    this._notify();
  }

  onChange(listener) {
    this.listeners.push(listener);
  }

  _notify() {
    this.listeners.forEach((listener) => listener(this.items));
  }
}

class TodoView {
  constructor(root) {
    this.root = root;
  }

  render(items) {
    this.root.innerHTML = items
      .map((item, i) => \`<li data-index="\${i}">\${item.done ? 'x' : ' '} \${item.text}</li>\`)
      .join('');
  }

  onItemClick(handler) {
    this.root.addEventListener('click', (event) => {
      const li = event.target.closest('li');
      if (li) handler(Number(li.dataset.index));
    });
  }
}

class TodoController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.model.onChange((items) => this.view.render(items));
    this.view.onItemClick((index) => this.model.toggleItem(index));
  }

  addItem(text) {
    this.model.addItem(text);
  }
}

const controller = new TodoController(new TodoModel(), new TodoView(document.querySelector('#list')));
controller.addItem('Learn MVC');`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1, 5],
        title: { ru: 'Состояние Model', en: 'The Model\'s state' },
        explanation: {
          ru: 'Model хранит только два поля: `items` - сами данные, и `listeners` - список подписчиков на будущие изменения. Ничего про экран или ввод здесь нет и быть не должно.',
          en: 'The Model holds only two fields: `items` - the actual data, and `listeners` - the list of subscribers to future changes. There is nothing about the screen or input here, and there shouldn\'t be.',
        },
      },
      {
        lines: [7, 10],
        title: { ru: 'addItem меняет состояние и оповещает', en: 'addItem changes state and notifies' },
        explanation: {
          ru: 'Первый из двух методов, которые реально меняют `items`. Оба заканчиваются одинаково - вызовом `this._notify()` - это и есть дисциплина, о которой говорилось в разделе «Проблема»: состояние меняется только через методы Model, никогда напрямую.',
          en: 'The first of two methods that actually mutate `items`. Both end the same way - a call to `this._notify()` - that\'s the discipline discussed in the "Problem" section: state changes only through the Model\'s own methods, never directly.',
        },
      },
      {
        lines: [12, 15],
        title: { ru: 'toggleItem - вторая точка изменения', en: 'toggleItem - the second mutation point' },
        explanation: {
          ru: 'Симметрично `addItem`: меняет один элемент по индексу и вызывает тот же `_notify()`. Два места изменения состояния, один и тот же способ о нём сообщить - это не совпадение, а то, ради чего вообще существует `_notify()` как отдельный метод.',
          en: 'Symmetric to `addItem`: changes one element by index and calls the same `_notify()`. Two places that change state, one single way to announce it - that\'s not a coincidence, it\'s exactly why `_notify()` exists as its own method.',
        },
      },
      {
        lines: [17, 19],
        title: { ru: 'onChange - подписка View на Model', en: 'onChange - the View subscribes to the Model' },
        explanation: {
          ru: 'Публичный метод, через который любой заинтересованный объект - в этом примере View - добавляет себя в список `listeners`. Model не знает, кто подписался и зачем, только то, что нужно вызвать каждого при изменении.',
          en: 'The public method through which any interested object - the View, in this example - adds itself to the `listeners` list. The Model doesn\'t know who subscribed or why, only that it must call each of them on change.',
        },
      },
      {
        lines: [21, 23],
        title: { ru: '_notify - сердце Observer-цикла', en: '_notify - the heart of the Observer loop' },
        explanation: {
          ru: 'Приватный метод, который перебирает `listeners` и вызывает каждого с текущим состоянием `items`. Это именно тот механизм оповещения, о котором шла речь в разделе «Как это работает» - здесь он не абстракция, а четыре строки конкретного кода.',
          en: 'A private method that walks `listeners` and calls each one with the current `items` state. This is exactly the notification mechanism discussed in "How it works" - here it isn\'t an abstraction, it\'s four concrete lines of code.',
        },
      },
      {
        lines: [26, 35],
        title: { ru: 'TodoView - только чтение и отрисовка', en: 'TodoView - reading and rendering only' },
        explanation: {
          ru: '`render` строит HTML напрямую из массива `items`, полученного аргументом - View никогда не читает `model.items` сама и не хранит собственную копию данных. Условие `item.done ? \'x\' : \' \'` - единственная «логика» здесь, и она про отображение, не про бизнес-правила.',
          en: '`render` builds HTML directly from the `items` array it receives as an argument - the View never reads `model.items` itself and keeps no copy of the data. The `item.done ? \'x\' : \' \'` check is the only "logic" here, and it\'s about display, not business rules.',
        },
      },
      {
        lines: [37, 42],
        title: { ru: 'onItemClick - View передаёт событие дальше', en: 'onItemClick - the View forwards the event' },
        explanation: {
          ru: 'View подписывается на клик по DOM и вычисляет, по какому элементу списка кликнули, но сама ничего не решает - просто вызывает переданный ей `handler` с индексом. Кто передаст этот `handler` и что он сделает - решает Controller, не View.',
          en: 'The View listens for a DOM click and figures out which list item was clicked, but decides nothing itself - it just calls the `handler` it was given with the index. Who provides that `handler` and what it does is the Controller\'s decision, not the View\'s.',
        },
      },
      {
        lines: [45, 51],
        title: { ru: 'Controller - обе связи собираются в конструкторе', en: 'The Controller - both links wired in the constructor' },
        explanation: {
          ru: 'Две строки здесь - это буквально диаграмма со вкладки «Схема»: `model.onChange(...)` подписывает View на Model (стрелка «уведомляет»), `view.onItemClick(...)` подключает Controller к событиям View (стрелка «событие ввода»). Без этих двух строк остальные классы просто не узнают друг о друге.',
          en: 'These two lines are literally the diagram from the "Diagram" tab: `model.onChange(...)` subscribes the View to the Model (the "notifies" arrow), `view.onItemClick(...)` connects the Controller to the View\'s events (the "input event" arrow). Without these two lines, the other classes simply never learn about each other.',
        },
      },
      {
        lines: [53, 55],
        title: { ru: 'Controller.addItem - третий путь ввода', en: 'Controller.addItem - a third input path' },
        explanation: {
          ru: 'Не каждый ввод обязан идти через DOM-событие: этот метод показывает, что Controller может вызвать метод Model и в ответ на что угодно ещё (например, программный вызов ниже) - роль Controller-а не в том, откуда пришёл сигнал, а в том, что он решает, какой метод Model вызвать.',
          en: 'Not every input has to arrive through a DOM event: this method shows the Controller can call a Model method in response to anything else too (the plain function call below, for instance) - the Controller\'s role isn\'t about where the signal came from, it\'s about deciding which Model method to call.',
        },
      },
      {
        lines: [58, 59],
        title: { ru: 'Сборка триады и первый запуск цикла', en: 'Wiring the triad and firing the cycle once' },
        explanation: {
          ru: 'Три объекта создаются и передаются друг другу только здесь, снаружи всех трёх классов - ни один из них не создаёт себе партнёров сам. `controller.addItem(...)` запускает ровно тот цикл из четырёх шагов, что описан на вкладке «Схема»: Controller -> Model -> _notify -> View.render.',
          en: 'The three objects are created and handed to each other only here, outside all three classes - none of them creates its own partners. `controller.addItem(...)` fires exactly the four-step cycle described on the "Diagram" tab: Controller -> Model -> _notify -> View.render.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'Три ответственности разведены по разным классам - изменить дизайн экрана можно, не трогая бизнес-логику Model, и наоборот.',
      en: 'The three responsibilities live in separate classes - the screen\'s design can change without touching the Model\'s business logic, and vice versa.',
    },
    {
      ru: 'Model не зависит ни от View, ни от Controller, поэтому её бизнес-правила тестируются юнит-тестами без какого-либо UI.',
      en: 'The Model depends on neither the View nor the Controller, so its business rules can be unit-tested without any UI at all.',
    },
    {
      ru: 'Одна и та же Model может обслуживать сразу несколько View - например, таблицу и график для одних и тех же данных.',
      en: 'The same Model can serve more than one View at once - for example, a table and a chart built on the same data.',
    },
  ],
  cons: [
    {
      ru: 'На практике Controller часто разрастается в «god object», который знает слишком много о View и о бизнес-правилах сразу.',
      en: 'In practice the Controller often grows into a "god object" that knows too much about both the View and the business rules at once.',
    },
    {
      ru: 'Оповещение View об изменениях Model требует отдельного механизма подписки - забытая отписка приводит к утечкам памяти и лишним перерисовкам.',
      en: 'Notifying the View of Model changes needs a separate subscription mechanism - a forgotten unsubscribe leads to memory leaks and stray re-renders.',
    },
    {
      ru: 'Границы между Controller и View на практике часто размываются - обработчики событий незаметно обрастают логикой, которая должна была остаться в Controller.',
      en: 'The line between Controller and View tends to blur in practice - event handlers quietly accumulate logic that should have stayed in the Controller.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда одну и ту же Model нужно показывать в нескольких видах одновременно или переключать между ними без переписывания бизнес-логики.',
      en: 'When the same Model needs to appear in several views at once, or switch between them, without rewriting the business logic.',
    },
    {
      ru: 'В серверных веб-фреймворках, где Controller естественно соответствует обработчику HTTP-запроса, а View - шаблону ответа.',
      en: 'In server-side web frameworks, where the Controller naturally maps to an HTTP request handler and the View to a response template.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**Ruby on Rails** и **Django** организуют серверный код вокруг MVC: маршрут ведёт к методу Controller-а, тот обращается к Model (ActiveRecord/ORM) и рендерит View-шаблон.',
      en: '**Ruby on Rails** and **Django** organize server-side code around MVC: a route dispatches to a Controller method, which talks to the Model (ActiveRecord/ORM) and renders a View template.',
    },
    {
      ru: '**Spring MVC** в Java-экосистеме и классический **Apple Cocoa/UIKit** до появления SwiftUI - оба явно называют свои базовые классы Model, View и Controller.',
      en: '**Spring MVC** in the Java ecosystem and classic **Apple Cocoa/UIKit** before SwiftUI both explicitly name their base classes Model, View, and Controller.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: 'MVC придумал **Трюгве Реенскауг (Trygve Reenskaug)** в 1978-1979 годах в исследовательском центре **Xerox PARC**, работая над средой **Smalltalk-79**. Его первоначальное название было длиннее и точнее сути - «Thing-Model-View-Editor»: «Thing» обозначало объект предметной области, а «Editor» позже сократили до «Controller». Цель была не архитектурной абстракцией ради красоты, а конкретной инженерной задачей - позволить конечным пользователям Smalltalk самим собирать интерфейсы из готовых блоков, не переписывая бизнес-логику.',
        en: '**Trygve Reenskaug** invented MVC in 1978-1979 at the **Xerox PARC** research center while working on the **Smalltalk-79** environment. His original name was longer and closer to the point - "Thing-Model-View-Editor": "Thing" stood for the domain object, and "Editor" was later shortened to "Controller". The goal wasn\'t architectural abstraction for its own sake but a concrete engineering problem - letting end users of Smalltalk assemble interfaces from reusable pieces without rewriting business logic.',
      },
      {
        ru: 'В оригинальной задумке View - это не один класс, а потенциально несколько объектов, одновременно наблюдающих за одной Model через классический **паттерн Observer**: изменение Model рассылает уведомление всем подписанным View сразу. Controller изначально был жёстко связан один-к-одному со своим View, образуя маленький «триад» Model-View-Controller, и такие триады можно было вкладывать друг в друга - составной View собирался из под-View, у каждого из которых был свой Controller.',
        en: 'In the original design the View isn\'t a single class but potentially several objects simultaneously watching one Model through the classic **Observer pattern**: a Model change broadcasts a notification to every subscribed View at once. The Controller was originally paired one-to-one with its View, forming a small Model-View-Controller "triad", and such triads could be nested - a composite View was assembled from sub-Views, each with its own Controller.',
      },
      {
        ru: 'Спустя почти три десятилетия **Мартин Фаулер (Martin Fowler)** в статье «GUI Architectures» (2006) формализовал два варианта того, как именно View узнаёт об изменениях Model: **Passive View**, где Controller (или Presenter) явно дёргает методы View после каждого изменения, и **Supervising Controller**, где View сама подписана на простые изменения через data binding, а Controller вмешивается только в сложную логику. Первый вариант проще тестировать - можно проверить, что Controller вызвал нужный метод View через mock-объект, вообще не поднимая реальный UI.',
        en: 'Nearly three decades later **Martin Fowler**, in his "GUI Architectures" article (2006), formalized two variants of how exactly the View learns about Model changes: **Passive View**, where the Controller (or Presenter) explicitly pokes View methods after every change, and **Supervising Controller**, where the View is itself subscribed to simple changes via data binding, and the Controller only steps in for complex logic. The first variant is easier to test - you can verify the Controller called the right View method through a mock object without spinning up any real UI at all.',
      },
      {
        ru: 'Именно проблема тестирования Controller-а, завязанного на конкретный View, подтолкнула экосистему **IBM/Taligent** в начале 1990-х предложить отдельный паттерн **Model-View-Presenter**: там Presenter общается с View только через абстрактный интерфейс, а не с конкретным виджетом напрямую, что позволяет подменить View на тестовую заглушку. MVC этого разделения не требует - Controller в классической схеме может свободно обращаться к View напрямую, и это одна из причин, почему код Controller-а в реальных проектах постепенно обрастает знаниями об устройстве конкретного экрана.',
        en: 'It was precisely the problem of testing a Controller tied to a concrete View that pushed the **IBM/Taligent** ecosystem in the early 1990s to propose a separate **Model-View-Presenter** pattern: there the Presenter talks to the View only through an abstract interface rather than a concrete widget, which lets the View be swapped for a test double. MVC doesn\'t require that separation - the Controller in the classic scheme can freely reach into the View directly, and that\'s one reason a Controller\'s code in real projects gradually accumulates knowledge of one specific screen\'s layout.',
      },
      {
        ru: 'Веб-фреймворки вроде **Ruby on Rails** и **Django** называют себя MVC, но реализуют его в урезанном виде: на каждый HTTP-запрос создаётся новый экземпляр Controller-а, который один раз читает Model и один раз рендерит View в HTML-ответ - никакого долгоживущего объекта, который «уведомляет» View о будущих изменениях, там физически нет. То, что в оригинальном Smalltalk-варианте было подпиской через Observer, в вебе превращается в простой прямой вызов метода рендеринга внутри тела обработчика запроса.',
        en: 'Web frameworks like **Ruby on Rails** and **Django** call themselves MVC but implement a trimmed-down version of it: a fresh Controller instance is created per HTTP request, reads the Model exactly once, and renders the View to an HTML response exactly once - there is no long-lived object physically "notifying" the View of future changes. What was an Observer subscription in the original Smalltalk design becomes a plain, direct call to a render method inside the request handler\'s body.',
      },
      {
        ru: 'Настольные и десктопные GUI-среды, напротив, сохраняют настоящий цикл уведомления. Классический **Apple Cocoa AppKit** использует `NSNotificationCenter` и key-value observing именно для того, чтобы Model могла оповестить произвольное число View о своём изменении без прямой ссылки на них - это ближе всего к тому, что задумывал Реенскауг в 1979 году, чем request-response модель веба.',
        en: 'Desktop GUI environments, by contrast, keep the real notification loop alive. The classic **Apple Cocoa AppKit** uses `NSNotificationCenter` and key-value observing precisely so a Model can notify an arbitrary number of Views of its change without holding a direct reference to them - this is much closer to what Reenskaug envisioned in 1979 than the web\'s request-response model.',
      },
      {
        ru: 'На практике именно Controller чаще всего перестаёт соответствовать первоначальному замыслу. В маленьком приложении с одним экраном граница между «разбором пользовательского события» и «отображением результата» легко стирается, и код, который по идее принадлежит View, оседает в обработчике клика внутри Controller-а - паттерн не содержит механизма, который бы автоматически удерживал эту границу на месте.',
        en: 'In practice it\'s the Controller that most often drifts from the original intent. In a small single-screen application the line between "parsing a user event" and "displaying the result" blurs easily, and code that logically belongs to the View ends up sitting inside a click handler inside the Controller - the pattern has no built-in mechanism that automatically keeps that boundary in place.',
      },
      {
        ru: 'Спустя более 45 лет с публикации оригинального меморандума Реенскауга ядро идеи не изменилось: View и Controller знают о Model, а Model ничего не знает ни о том, ни о другом. Именно эта односторонняя зависимость - а не конкретный механизм уведомления, который различается от Smalltalk до Rails, - и есть то единственное, что должно пережить перенос MVC на новую платформу.',
        en: 'More than 45 years after Reenskaug\'s original memo was published, the core idea hasn\'t changed: the View and Controller know about the Model, and the Model knows about neither of them. That one-directional dependency - not the specific notification mechanism, which differs wildly from Smalltalk to Rails - is the one thing that has to survive whenever MVC gets carried over to a new platform.',
      },
    ],
    whenToUse: [
      {
        ru: '**Настольные приложения с долгоживущей Model** - редакторы, IDE, графические программы, где один и тот же объект Model меняется сотни раз за сессию и реально выгодно держать постоянную подписку View на его изменения, как в оригинальном замысле Реенскауга.',
        en: '**Desktop applications with a long-lived Model** - editors, IDEs, graphics programs, where the same Model object changes hundreds of times per session and it genuinely pays off to keep the View permanently subscribed to its changes, as in Reenskaug\'s original design.',
      },
      {
        ru: '**Против Model-View-Presenter** - если Controller-у действительно нужно тестироваться без поднятия реального UI, MVP с его абстрактным интерфейсом View подходит лучше; в чистом MVC Controller обычно обращается к View напрямую, и это усложняет unit-тесты.',
        en: '**Against Model-View-Presenter** - if the Controller genuinely needs to be tested without spinning up a real UI, MVP with its abstract View interface fits better; in plain MVC the Controller usually reaches into the View directly, which complicates unit tests.',
      },
      {
        ru: '**Серверные веб-фреймворки с циклом запрос-ответ** - Rails, Django и подобные им фреймворки, где Controller и так создаётся заново на каждый запрос, так что урезанная версия MVC без постоянной подписки View ничего не теряет по сравнению с оригинальной схемой.',
        en: '**Server-side web frameworks with a request-response cycle** - Rails, Django, and similar frameworks, where the Controller is recreated on every request anyway, so the trimmed-down version of MVC without a permanent View subscription loses nothing compared to the original scheme.',
      },
      {
        ru: '**Несколько независимых представлений одной Model одновременно** - например таблица и график, построенные на одних и тех же данных: любой другой паттерн презентационного слоя решает эту задачу похожим способом, но именно для неё MVC изначально и проектировался.',
        en: '**Several independent views of the same Model at once** - a table and a chart built on the same data, for example: every other presentation-layer pattern solves this task in a similar way, but this is exactly the case MVC was originally designed for.',
      },
      {
        ru: '**Совсем без паттерна** - для формы из двух-трёх полей и одной кнопки три отдельных класса добавляют больше церемонии, чем экономят: накладные расходы MVC окупаются только когда логика ввода или бизнес-правила достаточно велики, чтобы их вообще имело смысл разделять.',
        en: '**No pattern at all** - for a form with two or three fields and one button, three separate classes add more ceremony than they save: MVC\'s overhead only pays for itself once the input logic or business rules are large enough to be worth separating in the first place.',
      },
    ],
    realWorld: [
      {
        ru: '**Trygve Reenskaug, внутренний меморандум «Models-Views-Controllers» (Xerox PARC, 1979)** - оригинальный документ, впервые описавший паттерн и его мотивацию для системы Smalltalk-79.',
        en: '**Trygve Reenskaug\'s internal memo "Models-Views-Controllers" (Xerox PARC, 1979)** - the original document that first described the pattern and its motivation for the Smalltalk-79 system.',
      },
      {
        ru: '**Adele Goldberg и David Robson, «Smalltalk-80: The Language and Its Implementation» (1983, «Голубая книга»)** - формализовала MVC как часть стандартной библиотеки Smalltalk-80 для широкой аудитории разработчиков.',
        en: '**Adele Goldberg and David Robson, "Smalltalk-80: The Language and Its Implementation" (1983, the "Blue Book")** - formalized MVC as part of the Smalltalk-80 standard library for a wide developer audience.',
      },
      {
        ru: '**Martin Fowler, «GUI Architectures» (martinfowler.com, 2006)** - статья, которая ввела разграничение Passive View / Supervising Controller и до сих пор остаётся стандартной точкой отсчёта при сравнении презентационных паттернов.',
        en: '**Martin Fowler, "GUI Architectures" (martinfowler.com, 2006)** - the article that introduced the Passive View / Supervising Controller distinction and remains the standard reference point when comparing presentation-layer patterns.',
      },
      {
        ru: '**ASP.NET MVC (Microsoft, 2009)** - явно назван в честь паттерна и выпущен как альтернатива ASP.NET WebForms именно ради того разделения ответственностей, которого не хватало в более старом фреймворке.',
        en: '**ASP.NET MVC (Microsoft, 2009)** - explicitly named after the pattern and shipped as an alternative to ASP.NET WebForms specifically for the separation of concerns the older framework lacked.',
      },
      {
        ru: '**NSNotificationCenter в Apple Cocoa AppKit (с 1988 года, NeXTSTEP)** - механизм рассылки уведомлений, который до сих пор используется в macOS-приложениях как реальная реализация оповещения View со стороны Model, максимально близкая к оригинальному замыслу Реенскауга.',
        en: '**NSNotificationCenter in Apple Cocoa AppKit (since 1988, NeXTSTEP)** - a notification-broadcasting mechanism still used in macOS applications today as a real implementation of the Model notifying the View, staying as close to Reenskaug\'s original design as any mainstream framework gets.',
      },
    ],
  },

  relatedPatterns: [],

  quiz: [
    {
      question: {
        ru: 'Какой из трёх компонентов MVC хранит состояние приложения и правила его изменения?',
        en: 'Which of the three MVC components holds the application\'s state and the rules for changing it?',
      },
      options: [
        { ru: 'Model - он хранит данные и бизнес-логику и ничего не знает об экране', en: 'The Model - it holds the data and business logic and knows nothing about the screen' },
        { ru: 'View - он хранит данные и передаёт их в Model только по явному запросу', en: 'The View - it holds the data and passes it to the Model only on explicit request' },
        { ru: 'Controller - он хранит данные между запросами пользователя к экрану', en: 'The Controller - it holds the data between the user\'s requests to the screen' },
        { ru: 'Ни один компонент по отдельности - данные размазаны сразу по всем трём без единого владельца', en: 'No single component - the data is smeared across the code of all three at once, with no clear owner' },
      ],
      correct: 0,
      explanation: {
        ru: 'Model - единственный компонент, который знает о данных и бизнес-правилах; View и Controller за хранение состояния не отвечают.',
        en: 'The Model is the only component that knows about the data and business rules; the View and Controller are not responsible for holding state.',
      },
      hint: {
        ru: 'Смотрите раздел «Решение» на вкладке «Суть» и роль Model на вкладке «Схема».',
        en: 'See the "Solution" section on the "Intent" tab and the Model\'s role on the "Diagram" tab.',
      },
    },
    {
      question: {
        ru: 'Кто в MVC отображает текущее состояние Model пользователю?',
        en: 'Who in MVC displays the Model\'s current state to the user?',
      },
      options: [
        { ru: 'View - чистое отображение состояния, без логики принятия решений', en: 'The View - a pure rendering of the state, with no decision logic' },
        { ru: 'Model - он же и хранит, и рисует собственное состояние на экране', en: 'The Model - it both holds and draws its own state on the screen' },
        { ru: 'Controller - он получает события и сам же рисует результат', en: 'The Controller - it receives events and draws the result itself' },
        { ru: 'Экран рисуется совместно Model и Controller без участия View', en: 'The screen is drawn jointly by the Model and Controller with no View involved' },
      ],
      correct: 0,
      explanation: {
        ru: 'View существует именно для того, чтобы отображать состояние Model, не решая ничего сама.',
        en: 'The View exists precisely to display the Model\'s state, without deciding anything itself.',
      },
      hint: {
        ru: 'Смотрите роль View на вкладке «Схема».',
        en: 'See the View\'s role on the "Diagram" tab.',
      },
    },
    {
      question: {
        ru: 'Что делает Controller, получив событие от пользователя?',
        en: 'What does the Controller do when it receives an event from the user?',
      },
      options: [
        { ru: 'Обновляет Model через её методы и, если нужно, выбирает следующий View', en: 'Updates the Model through its methods and, if needed, picks the next View' },
        { ru: 'Напрямую перерисовывает View, полностью минуя Model и её методы вызова', en: 'Directly re-renders the View, completely bypassing the Model and its methods' },
        { ru: 'Сохраняет событие в Model как есть, без вызова каких-либо её методов вообще', en: 'Stores the raw event inside the Model, without calling any of its methods at all' },
        { ru: 'Пересылает событие сразу во все существующие View без каких-либо изменений', en: 'Forwards the event unchanged to every existing View in the application at once' },
      ],
      correct: 0,
      explanation: {
        ru: 'Controller - посредник: он вызывает методы Model в ответ на событие и может выбрать, какой View показать дальше.',
        en: 'The Controller is a mediator: it calls Model methods in response to the event and can pick which View to show next.',
      },
      hint: {
        ru: 'Смотрите шаг «Controller решает» на вкладке «Схема».',
        en: 'See the "The Controller decides" step on the "Diagram" tab.',
      },
    },
    {
      question: {
        ru: 'Что произойдёт, если View начнёт напрямую менять поля Model, минуя её методы?',
        en: 'What happens if the View starts changing the Model\'s fields directly, bypassing its methods?',
      },
      options: [
        { ru: 'Model перестанет быть единственным источником правил изменения состояния, и логику станет сложнее тестировать', en: 'The Model stops being the single source of truth for state changes, and the logic becomes harder to test' },
        { ru: 'Ничего не изменится вовсе - View и так по умолчанию имеет полное право менять Model, это часть стандартного MVC', en: 'Nothing changes at all - the View already has full, entirely unrestricted rights to change the Model, that is standard MVC' },
        { ru: 'Controller автоматически откатит такое изменение при следующем же событии от пользователя', en: 'The Controller will automatically roll back such a change on the very next user event it handles' },
        { ru: 'Приложение перестанет запускаться вовсе, потому что View физически не может ссылаться на Model', en: 'The application stops running entirely, because the View cannot physically hold a reference to the Model' },
      ],
      correct: 0,
      explanation: {
        ru: 'Именно эта дисциплина - менять Model только через её методы - и даёт возможность тестировать и предсказывать бизнес-логику отдельно от экрана.',
        en: 'That discipline - changing the Model only through its methods - is exactly what makes the business logic testable and predictable independent of the screen.',
      },
      hint: {
        ru: 'Смотрите раздел «Проблема» - зачем вообще разводить данные и экран по разным классам.',
        en: 'See the "Problem" section - why split data and screen into separate classes in the first place.',
      },
    },
    {
      question: {
        ru: 'Почему в примере реализации `TodoModel` вызывает `_notify()` и внутри `addItem`, и внутри `toggleItem`?',
        en: 'Why does the `TodoModel` in the implementation example call `_notify()` inside both `addItem` and `toggleItem`?',
      },
      options: [
        { ru: 'Чтобы View узнавала об изменении состояния и перерисовывалась, какой бы метод его ни вызвал', en: 'So the View learns about the state change and re-renders, no matter which method triggered it' },
        { ru: 'Чтобы Controller получал уведомление и заново создавал всю Model целиком с нуля', en: 'So the Controller gets notified of the change and rebuilds the whole Model from scratch' },
        { ru: 'Чтобы предотвратить повторный вызов addItem или toggleItem одним и тем же экземпляром Controller-а', en: 'To prevent addItem or toggleItem from ever being called twice by the same Controller instance' },
        { ru: 'Чтобы View могла напрямую изменить массив items в обход всех методов Model', en: 'So the View can directly change the items array, bypassing all of the Model\'s methods' },
      ],
      correct: 0,
      explanation: {
        ru: 'Каждый метод, меняющий состояние, обязан вызвать `_notify()` - иначе подписанная View не узнает об изменении и не перерисуется.',
        en: 'Every method that changes state must call `_notify()` - otherwise the subscribed View never learns about the change and never re-renders.',
      },
      hint: {
        ru: 'Смотрите вкладку «Реализация», методы `addItem`, `toggleItem` и `_notify` класса `TodoModel`.',
        en: 'See the "Implementation" tab, the `addItem`, `toggleItem`, and `_notify` methods of `TodoModel`.',
      },
    },
    {
      question: {
        ru: 'Что случится, если в конструкторе `TodoController` пропустить строку с подпиской `view.onItemClick`?',
        en: 'What happens if the `TodoController` constructor is missing the `view.onItemClick` subscription line?',
      },
      options: [
        { ru: 'Клики по элементам списка перестанут доходить до Model, и её состояние не будет обновляться', en: 'Clicks on list items stop reaching the Model, and its state never gets updated by user action' },
        { ru: 'Model перестанет вызывать `_notify()`, и View вообще ни разу не отрисуется', en: 'The Model stops calling `_notify()`, and the View never renders even once' },
        { ru: 'Приложение сразу же выбросит ошибку прямо при запуске, потому что такая подписка строго обязательна для создания Model', en: 'The application immediately throws an error right on startup, because the subscription is strictly required to create the Model' },
        { ru: 'View начнёт менять свои данные самостоятельно, без участия Model и Controller', en: 'The View starts changing its own data by itself, with no Model or Controller involved' },
      ],
      correct: 0,
      explanation: {
        ru: 'Без подписки View клики остаются событиями внутри View и никогда не превращаются в вызов метода Model.',
        en: 'Without that subscription, clicks stay events inside the View and never turn into a call to a Model method.',
      },
      hint: {
        ru: 'Смотрите конструктор `TodoController` на вкладке «Реализация» - две строки подписки.',
        en: 'See the `TodoController` constructor on the "Implementation" tab - the two subscription lines.',
      },
    },
    {
      question: {
        ru: 'Чем на практике оправдан минус «Controller разрастается в god object»?',
        en: 'What justifies the "Controller grows into a god object" downside in practice?',
      },
      options: [
        { ru: 'В Controller стекаются и разбор ввода, и выбор View, и часть бизнес-правил, которые логичнее было бы держать в Model', en: 'Input parsing, View selection, and business rules that should live in the Model all pile up in the Controller' },
        { ru: 'Controller технически не может существовать без Model, поэтому их код почти всегда физически объединяют в один файл', en: 'The Controller technically cannot exist without the Model at all, so their code always ends up physically merged together' },
        { ru: 'View в MVC вообще никогда не умеет принимать пользовательский ввод, и вся нагрузка целиком ложится на Controller', en: 'The View in MVC can never receive user input at all, so the entire load always falls squarely on the Controller' },
        { ru: 'Model в классическом MVC всегда жёстко ограничена по размеру своего кода, поэтому вся лишняя логика неизбежно уходит в Controller', en: 'The Model in classic MVC is always strictly limited in code size, so any excess logic inevitably spills over into the Controller' },
      ],
      correct: 0,
      explanation: {
        ru: 'Ничто в самом паттерне не запрещает класть в Controller лишнюю логику - дисциплину приходится поддерживать вручную, и на практике она часто ослабевает.',
        en: 'Nothing in the pattern itself forbids piling extra logic into the Controller - that discipline has to be maintained by hand, and in practice it often slips.',
      },
      hint: {
        ru: 'Смотрите первый пункт минусов на вкладке «Плюсы и минусы».',
        en: 'See the first "Cons" item on the "Pros & Cons" tab.',
      },
    },
    {
      question: {
        ru: 'Чем Model-View-Presenter принципиально отличается от классического MVC, судя по причине его появления?',
        en: 'What is the essential difference between Model-View-Presenter and classic MVC, given the reason MVP was created?',
      },
      options: [
        { ru: 'Presenter общается с View только через абстрактный интерфейс, а не напрямую, что позволяет тестировать его логику без запуска реального UI вообще', en: 'The Presenter talks to the View only through an abstract interface rather than directly, which lets it be tested without a real UI' },
        { ru: 'MVP полностью отказывается от Model и хранит все данные приложения прямо внутри самого Presenter-а, объединяя состояние и бизнес-логику в одном классе', en: 'MVP drops the Model entirely and keeps all of the application\'s data directly inside the Presenter itself, merging state and business rules into one class' },
        { ru: 'MVP в принципе не умеет показывать одну и ту же Model сразу в нескольких разных представлениях, как бы ни были связаны Presenter и View', en: 'MVP is fundamentally unable to show the same Model in more than one view at the same time, no matter how Presenter and View end up wired together' },
        { ru: 'MVP исторически появился на несколько лет раньше MVC и с тех пор был полностью вытеснен им почти во всех современных UI-фреймворках', en: 'MVP historically predates MVC by several years and has since been fully displaced by it in almost every modern user-interface framework' },
      ],
      correct: 0,
      explanation: {
        ru: 'MVP появился именно из проблемы тестирования - Controller в MVC обычно обращается к View напрямую, а Presenter в MVP - только через интерфейс, который легко подменить заглушкой.',
        en: 'MVP arose precisely from the testing problem - the Controller in MVC usually reaches into the View directly, while the Presenter in MVP does so only through an interface that\'s easy to swap for a test double.',
      },
      hint: {
        ru: 'Смотрите раздел «Как это работает» на вкладке «Суть» - абзац про IBM/Taligent и Model-View-Presenter.',
        en: 'See the "How it works" section on the "Intent" tab - the paragraph about IBM/Taligent and Model-View-Presenter.',
      },
    },
    {
      question: {
        ru: 'Почему у веб-фреймворков вроде Rails и Django нет настоящего цикла подписки View на изменения Model, как в оригинальном Smalltalk-варианте MVC?',
        en: 'Why do web frameworks like Rails and Django lack a real View-subscribes-to-Model loop, unlike the original Smalltalk version of MVC?',
      },
      options: [
        { ru: 'Controller создаётся заново на каждый HTTP-запрос и рендерит View один-единственный раз, поэтому держать постоянную подписку попросту не для чего', en: 'The Controller is recreated on every HTTP request and renders the View exactly once, so there is simply nothing for a permanent subscription to serve' },
        { ru: 'Model в веб-фреймворках технически не способна содержать вообще никакой бизнес-логики, только сырые необработанные данные прямо из таблиц базы', en: 'The Model in web frameworks is technically incapable of holding any business logic at all, storing only raw, unprocessed data pulled straight from the database' },
        { ru: 'View в таких фреймворках всегда рендерится ещё до момента создания самого объекта Controller-а, поэтому любая подписка опоздала бы физически', en: 'The View in such frameworks always renders before the Controller object even exists, so a subscription set up afterward would arrive far too late to matter' },
        { ru: 'Протокол HTTP как таковой технически и полностью запрещает использовать паттерн Observer где бы то ни было внутри обработчика входящего запроса на сервере', en: 'The HTTP protocol itself technically forbids using the Observer pattern anywhere inside a request handler, by design of the specification' },
      ],
      correct: 0,
      explanation: {
        ru: 'Без долгоживущего объекта Model, который пережил бы один запрос, подписка через Observer не даёт никакой выгоды - проще один раз явно вызвать рендер внутри обработчика.',
        en: 'Without a long-lived Model object that outlives a single request, an Observer subscription buys nothing - it\'s simpler to just call render explicitly once inside the handler.',
      },
      hint: {
        ru: 'Смотрите раздел «Как это работает» на вкладке «Суть» - абзац про Rails, Django и HTTP-запрос.',
        en: 'See the "How it works" section on the "Intent" tab - the paragraph about Rails, Django, and the HTTP request.',
      },
    },
    {
      question: {
        ru: 'Как правильнее всего показать одни и те же данные сразу и в виде таблицы, и в виде графика, оставаясь в рамках MVC?',
        en: 'What is the right way to show the same data as both a table and a chart at once, while staying within MVC?',
      },
      options: [
        { ru: 'Завести два View, подписанных на одну и ту же Model, - каждый рендерит своё представление одного состояния', en: 'Create two Views subscribed to the same Model - each one renders its own representation of the one state' },
        { ru: 'Продублировать Model целиком дважды - по одной копии данных для таблицы и для графика отдельно', en: 'Duplicate the whole Model twice - one separate copy of the data for the table and one for the chart' },
        { ru: 'Встроить всю логику отрисовки графика прямо внутрь Controller, чтобы не создавать ещё один лишний View', en: 'Build the entire chart-drawing logic directly inside the Controller to avoid creating one more extra View' },
        { ru: 'Хранить данные для графика прямо в самой Model, а данные для таблицы держать отдельно прямо внутри Controller целиком', en: 'Keep the chart\'s data inside the Model itself, and the table\'s data separately directly inside the whole Controller' },
      ],
      correct: 0,
      explanation: {
        ru: 'Это ровно тот сценарий, ради которого Model держат независимой от View - одно состояние может питать сколько угодно представлений сразу.',
        en: 'This is exactly the scenario the Model\'s independence from the View is meant for - one piece of state can feed any number of representations at once.',
      },
      hint: {
        ru: 'Смотрите первый пункт плюсов на вкладке «Плюсы и минусы» - одна Model, несколько View.',
        en: 'See the first "Pros" item on the "Pros & Cons" tab - one Model, several Views.',
      },
    },
  ],
};

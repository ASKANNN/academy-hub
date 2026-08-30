export const mvp = {
  slug: 'mvp',
  category: 'presentation',
  name: { ru: 'MVP', en: 'MVP' },
  popularity: 2,
  tags: ['presentation-layer', 'separation-of-concerns', 'testability'],

  intent: {
    ru: 'MVP развивает MVC и доводит View до полной пассивности: он не выполняет никакой логики и лишь передаёт действия пользователя в Presenter, а для обновления экрана предоставляет несколько простых методов. Presenter закреплён за своим View один к одному, работает с ним через интерфейс, меняет Model и готовит её данные к выводу. За счёт этого всю логику представления можно покрыть юнит-тестами, подставив вместо настоящего View заглушку.',
    en: 'MVP grows out of MVC by making the View fully passive: the screen holds no logic, it only forwards the user\'s actions to the Presenter and exposes simple update methods. The Presenter is paired one to one with its View, talks to it through an interface, changes the Model, and prepares its data for display - so the entire presentation logic can be unit-tested by swapping the real View for a stub.',
  },

  problem: {
    ru: 'В классическом MVC Controller может напрямую дёргать методы конкретного виджета, а View - сам читать Model. Из-за этих поблажек логику представления не проверить без запуска настоящих элементов интерфейса, а форматирование вывода расходится сразу по трём классам. Командам, которые собирали громоздкие экраны с множеством форм на десктопе и мобильных, нужен был вариант, где всё, что видит пользователь, задаётся в одном месте, пригодном для тестов.',
    en: 'In classic MVC the Controller is free to poke a concrete widget\'s methods, and the View is free to read the Model directly. Both of these shortcuts make the presentation logic untestable without launching real UI elements, and they let display formatting spread across all three classes at once. Teams building large form-heavy screens on desktop and mobile needed a variant where every decision about what the user sees lives in one testable place.',
  },

  solution: {
    ru: 'View сводится к интерфейсу с методами вроде showItems(list), showError(text), setSubmitEnabled(flag) и к конкретному виджету, который этот интерфейс реализует. Виджет передаёт в Presenter сырые события (нажали кнопку, изменили текст) и никак их не трактует. Presenter держит ссылку на интерфейс View (не на сам виджет) и на Model: получив событие, он выполняет логику взаимодействия, вызывает методы Model, забирает результат и через интерфейс отдаёт View уже готовые к отрисовке значения. В классическом варианте (Dolphin Smalltalk) View вдобавок сам подписан на Model ради простых изменений значений; в варианте Passive View и это идёт через Presenter, а виджет о Model не знает вообще ничего.',
    en: 'The View is reduced to an interface with methods like showItems(list), showError(text), setSubmitEnabled(flag), plus a concrete widget class that implements them. The View forwards raw events (button pressed, text changed) to the Presenter without interpreting anything. The Presenter holds a reference to the View interface (not the widget) and to the Model: on each event it runs the interaction logic, calls Model methods, reads the result, and pushes ready-to-render values back through the View interface. In the classic form (Dolphin Smalltalk) the View also observes the Model directly for simple value updates; in the Passive View form even that goes through the Presenter, and the widget knows nothing about the Model at all.',
  },

  diagram: {
    layout: 'stack',
    nodes: [
      {
        id: 'view',
        label: { ru: 'View', en: 'View' },
        role: {
          ru: 'Лёгкий виджет и интерфейс, который он реализует. Без изменений передаёт события пользователя в Presenter и предоставляет методы (showItems, showError), которыми Presenter обновляет экран. Форматирования и решений в нём нет.',
          en: 'A thin widget plus the interface it implements. Forwards user events to the Presenter unchanged and exposes methods (showItems, showError) that the Presenter calls to update the screen. Holds no formatting and no decision logic.',
        },
      },
      {
        id: 'presenter',
        label: { ru: 'Presenter', en: 'Presenter' },
        role: {
          ru: 'Закреплён за одним интерфейсом View один к одному. Превращает каждое событие пользователя в вызовы Model, забирает у Model результат, форматирует его и отдаёт View через интерфейс. Единственный компонент, который можно покрыть юнит-тестами без настоящих виджетов.',
          en: 'Paired one to one with a single View interface. Turns each user event into Model calls, reads the Model back, formats the result, and hands it to the View through the interface - the only component that can be unit-tested without real widgets.',
        },
      },
      {
        id: 'model',
        label: { ru: 'Model', en: 'Model' },
        role: {
          ru: 'Хранит состояние приложения и бизнес-правила - как и в MVC. При изменении оповещает подписчиков; в классическом MVP на неё может подписаться сам View ради простых значений, в Passive View - только Presenter.',
          en: 'Holds the application\'s state and business rules, same as in MVC. Notifies observers on change; in classic MVP the View may subscribe to it directly for simple values, in Passive View only the Presenter does.',
        },
      },
    ],
    connections: [
      { from: 'view', to: 'presenter', label: { ru: 'событие ввода', en: 'input event' } },
      { from: 'presenter', to: 'model', label: { ru: 'меняет', en: 'updates' } },
      { from: 'model', to: 'presenter', label: { ru: 'результат', en: 'result' } },
      { from: 'presenter', to: 'view', label: { ru: 'обновляет', en: 'updates view' } },
    ],
  },

  steps: [
    {
      title: { ru: 'Пользователь действует, View молчит', en: 'The user acts, the View stays silent' },
      explanation: {
        ru: 'Пользователь нажимает кнопку или вводит текст. View просто передаёт событие в Presenter через колбэк и ничего от себя не добавляет - ни проверок, ни форматирования.',
        en: 'The user presses a button or types. Through a plain callback the View passes the event to the Presenter, adding nothing of its own - no validation, no formatting.',
      },
    },
    {
      title: { ru: 'Presenter разбирает событие', en: 'The Presenter interprets the event' },
      explanation: {
        ru: 'Presenter понимает, что означает событие, берёт нужные значения и вызывает подходящий метод Model. Вся логика взаимодействия собрана здесь.',
        en: 'The Presenter decides what the event means, pulls the values it needs, and calls the matching Model method. All the interaction logic sits here.',
      },
    },
    {
      title: { ru: 'Model меняет состояние', en: 'The Model changes state' },
      explanation: {
        ru: 'Model применяет свои бизнес-правила, обновляет состояние и оповещает подписчиков - так же, как в MVC.',
        en: 'The Model applies its business rules, updates its state, and notifies its observers - the same as in MVC.',
      },
    },
    {
      title: { ru: 'Presenter обновляет View через интерфейс', en: 'The Presenter updates the View through the interface' },
      explanation: {
        ru: 'Presenter читает новое состояние, приводит его к строкам и флагам и вызывает методы интерфейса View (showItems, showError). Конкретный виджет просто рисует то, что ему передали.',
        en: 'The Presenter reads the new state, formats it into strings and flags, and calls View-interface methods (showItems, showError). The concrete widget just draws what it was handed.',
      },
    },
  ],

  implementation: {
    javascript: `class TodoModel {
  constructor() {
    this.items = [];
  }

  addItem(text) {
    if (!text.trim()) throw new Error('empty text');
    this.items.push({ text, done: false });
  }

  toggleItem(index) {
    this.items[index].done = !this.items[index].done;
  }

  remaining() {
    return this.items.filter((item) => !item.done).length;
  }
}

class TodoPresenter {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  onAddClicked(text) {
    try {
      this.model.addItem(text);
    } catch {
      this.view.showError('Text cannot be empty');
      return;
    }
    this.render();
  }

  onItemClicked(index) {
    this.model.toggleItem(index);
    this.render();
  }

  render() {
    this.view.showItems(
      this.model.items.map((item) => (item.done ? '[x] ' : '[ ] ') + item.text),
    );
    this.view.showRemaining(this.model.remaining() + ' left');
  }
}

class TodoView {
  constructor(listRoot, form) {
    this.listRoot = listRoot;
    this.form = form;
  }

  bind(presenter) {
    this.form.addEventListener('submit', () => presenter.onAddClicked(this.form.text.value));
    this.listRoot.addEventListener('click', (event) => {
      const li = event.target.closest('li');
      if (li) presenter.onItemClicked(Number(li.dataset.index));
    });
  }

  showItems(lines) {
    this.listRoot.innerHTML = lines
      .map((line, i) => \`<li data-index="\${i}">\${line}</li>\`)
      .join('');
  }

  showRemaining(text) {
    this.listRoot.dataset.remaining = text;
  }

  showError(text) {
    this.listRoot.dataset.error = text;
  }
}

const model = new TodoModel();
const view = new TodoView(document.querySelector('#list'), document.querySelector('#form'));
const presenter = new TodoPresenter(view, model);
view.bind(presenter);
presenter.onAddClicked('Learn MVP');`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1, 4],
        title: { ru: 'Model без списка подписчиков', en: 'A Model with no observer list' },
        explanation: {
          ru: 'В этом варианте Passive View у Model есть только `items` - ни `listeners`, ни `onChange`. Её никто не слушает: Presenter сам явно читает из неё после каждого изменения, поэтому механизм подписки здесь не нужен.',
          en: 'In this Passive View version the Model holds only `items` - no `listeners`, no `onChange`. Nothing observes it: the Presenter reads from it explicitly after every change, so a subscription mechanism is not needed here.',
        },
      },
      {
        lines: [6, 9],
        title: { ru: 'addItem отвечает за бизнес-правило', en: 'addItem owns the business rule' },
        explanation: {
          ru: '`addItem` сам проверяет, что текст не пустой, и бросает исключение, если это не так. Что считать допустимым, решает Model, а не View или Presenter - поэтому правило и лежит здесь, а не в обработчике поля ввода.',
          en: '`addItem` checks that the text is non-empty itself and throws if it is not. What counts as valid is the Model\'s decision, not the View\'s or the Presenter\'s - which is why the rule lives here and not in a text-field handler.',
        },
      },
      {
        lines: [11, 13],
        title: { ru: 'toggleItem - вторая точка изменения', en: 'toggleItem - the second mutation point' },
        explanation: {
          ru: 'Меняет один элемент по индексу. Как и в примере MVC, состояние меняется в двух местах, но здесь ни одно из них не рассылает уведомлений - за обновление экрана отвечает Presenter, который потом вызовет `render()`.',
          en: 'Changes one element by index. As in the MVC example there are two mutation points, but here neither of them broadcasts a notification - updating the screen is the Presenter\'s job, via a `render()` call afterwards.',
        },
      },
      {
        lines: [15, 17],
        title: { ru: 'remaining - производное значение', en: 'remaining - a derived value' },
        explanation: {
          ru: 'Model умеет посчитать число невыполненных пунктов, но не превращает его в текст для экрана и не должна этого делать. Presenter возьмёт это число и отформатирует, а View получит уже готовую строку.',
          en: 'The Model can count the unfinished items, but it does not and should not turn that into on-screen text. The Presenter takes the number and formats it; the View receives a finished string.',
        },
      },
      {
        lines: [20, 24],
        title: { ru: 'Presenter держит View и Model', en: 'The Presenter holds the View and the Model' },
        explanation: {
          ru: '`this.view` - это что угодно с методами `showItems`, `showRemaining`, `showError`. В юнит-тесте сюда передают обычный объект, который записывает вызовы, и настоящий виджет не поднимается вовсе.',
          en: '`this.view` is anything with `showItems`, `showRemaining`, `showError` methods. In a unit test a plain object that records calls is passed here, and no real widget is ever created.',
        },
      },
      {
        lines: [26, 34],
        title: { ru: 'onAddClicked - логика взаимодействия', en: 'onAddClicked - the interaction logic' },
        explanation: {
          ru: 'Метод вызывает Model, а неудачную ветку превращает в вызов `view.showError(...)`. View не видит ни исключения, ни Model - только строку, которую ей велели показать. Именно эти вызовы и проверяет тест.',
          en: 'The method calls the Model and converts the failure path into a `view.showError(...)` call. The View sees neither the exception nor the Model - only the string it was told to show. A test asserts on exactly these calls.',
        },
      },
      {
        lines: [36, 39],
        title: { ru: 'onItemClicked - мелочь, но тоже через Presenter', en: 'onItemClicked - trivial, but still routed through the Presenter' },
        explanation: {
          ru: 'Даже простое переключение галочки идёт тем же путём: поменять Model, затем `render()`. Забытый вызов `render()` - классическая ошибка MVP: состояние изменилось, а пассивный View об этом не узнал.',
          en: 'Even a simple checkbox toggle takes the same path: change the Model, then `render()`. A forgotten `render()` call is the classic MVP bug - the state changed and the passive screen never found out.',
        },
      },
      {
        lines: [41, 47],
        title: { ru: 'render - единственное место, где идёт форматирование', en: 'render - the single place formatting happens' },
        explanation: {
          ru: 'Здесь состояние Model превращается в то, что видно на экране: префиксы `[x] ` / `[ ] `, строка `"N left"`. Всё это уходит через интерфейс View. Именно этот метод и проверяет юнит-тест логики представления.',
          en: 'This is where Model state becomes display values: the `[x] ` / `[ ] ` prefixes, the `"N left"` string. All of it is handed out through the View interface. This is the method the presentation-logic unit test asserts against.',
        },
      },
      {
        lines: [49, 61],
        title: { ru: 'TodoView - конкретный виджет', en: 'TodoView - the concrete widget' },
        explanation: {
          ru: '`bind` связывает DOM-события с методами Presenter и больше ничего не делает: `submit` формы превращается в `onAddClicked`, клик по `<li>` - в `onItemClicked`. Сам виджет ничего не трактует.',
          en: '`bind` wires DOM events to Presenter methods and does nothing else: the form\'s `submit` becomes `onAddClicked`, a click on an `<li>` becomes `onItemClicked`. The widget interprets nothing.',
        },
      },
      {
        lines: [63, 75],
        title: { ru: 'showItems / showRemaining / showError - интерфейс View в коде', en: 'showItems / showRemaining / showError - the View interface made concrete' },
        explanation: {
          ru: 'Три метода, каждый просто пишет полученное в DOM. Ни Model, ни форматирования, ни ветвлений сложнее `map`. Это и есть тот интерфейс, который в тесте подменяют заглушкой.',
          en: 'Three methods, each just writes what it received into the DOM. No Model, no formatting, no branching beyond `map`. This is the interface a test replaces with a stub.',
        },
      },
      {
        lines: [78, 82],
        title: { ru: 'Сборка триады снаружи', en: 'Wiring the triad from outside' },
        explanation: {
          ru: 'Model, View и Presenter создаются вне всех трёх классов; `view.bind(presenter)` замыкает связь View -> Presenter, а один вызов `onAddClicked` прогоняет весь цикл из четырёх шагов со вкладки «Схема».',
          en: 'The Model, View, and Presenter are created outside all three classes, `view.bind(presenter)` closes the View -> Presenter link, and a single `onAddClicked` call runs the full four-step cycle from the "Diagram" tab.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'View - это пассивный интерфейс, поэтому любую ветку логики представления можно прогнать обычным юнит-тестом с поддельным View: без эмулятора, без DOM, без библиотеки виджетов.',
      en: 'The View is a passive interface, so every branch of the presentation logic can be run through a plain unit test with a fake View: no emulator, no DOM, no widget toolkit.',
    },
    {
      ru: 'Presenter завязан на интерфейс View, а не на конкретный виджет, поэтому один и тот же Presenter без изменений работает и с экраном телефона, и с планшетной раскладкой, и с тестовой заглушкой.',
      en: 'The Presenter is bound to a View interface rather than a concrete widget, so the same Presenter drives a phone screen, a tablet layout, or a test double without changes.',
    },
    {
      ru: 'У View нет доступа к Model, поэтому форматирование вывода не может просочиться в виджет - остаётся ровно одно место (Presenter), где решается, что увидит пользователь.',
      en: 'The View has no access to the Model, so display formatting cannot leak into the widget - there is exactly one place (the Presenter) where what the user sees is decided.',
    },
  ],
  cons: [
    {
      ru: 'Каждому экрану нужен написанный вручную интерфейс View и его реализация, поэтому даже простая форма превращается в три файла и горсть методов `showX`, которые просто прокидывают строку насквозь.',
      en: 'Every screen needs a hand-written View interface plus its implementation, so a trivial form turns into three files and a handful of `showX` methods that just pass a string straight through.',
    },
    {
      ru: 'У Presenter появляется отдельный метод почти на каждое состояние экрана - `showLoading`, `showEmpty`, `showError`, `showContent` - и на больших экранах интерфейс разрастается до десятков методов.',
      en: 'The Presenter accumulates a separate method per screen state - `showLoading`, `showEmpty`, `showError`, `showContent` - and on large screens the interface swells to dozens of members.',
    },
    {
      ru: 'Схема «один Presenter на один View» плохо ложится на экраны, где одну Model нужно показать сразу в нескольких видах - с этим случаем MVC или MVVM справляются естественнее.',
      en: 'The one-Presenter-per-one-View pairing fits badly on screens that must show one Model in several views at once - MVC or MVVM handle that case more naturally.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда логика представления на экране достаточно сложная (многошаговая проверка, условные поля, состояния ошибок), чтобы держать её под юнит-тестами без запущенного интерфейса.',
      en: 'When a screen\'s presentation logic is complex enough (multi-step validation, conditional fields, error states) to keep it under unit tests without a running UI.',
    },
    {
      ru: 'На платформах, где настоящий View поднимается медленно или его трудно автоматизировать - исторически это Android до ViewModel, GWT и Windows Forms.',
      en: 'On platforms where spinning up the real View is slow or awkward to automate - historically Android before ViewModel, GWT, and Windows Forms.',
    },
  ],

  realWorldExamples: [
    {
      ru: 'Приложения на **Android** примерно 2015-2019 годов активно строились на MVP: интерфейс `Contract` с вложенными типами `View` и `Presenter` для каждого экрана был самым распространённым приёмом в сообществе, пока Google не выпустил `ViewModel` и `LiveData`.',
      en: '**Android** apps of roughly 2015-2019 leaned heavily on MVP: a `Contract` interface with nested `View` and `Presenter` types per screen was the dominant community approach before Google shipped `ViewModel` and `LiveData`.',
    },
    {
      ru: '**Google Web Toolkit (GWT)** предлагал MVP как официальную архитектуру для крупных приложений: Places и Activities соответствовали Presenter-ам, которые управляли пассивными виджетами View, скомпилированными в JavaScript.',
      en: '**Google Web Toolkit (GWT)** promoted MVP as its official architecture for large applications: Places and Activities mapped to Presenters driving passive View widgets compiled to JavaScript.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: 'Термин Model-View-Presenter появился в **Taligent** - совместном предприятии **Apple, IBM и Hewlett-Packard** (1992-1998), которое собиралось построить объектно-ориентированную операционную систему нового поколения. **Майк Потел (Mike Potel)**, технический директор Taligent, в 1996 году опубликовал работу «MVP: Model-View-Presenter - The Taligent Programming Model for C++ and Java». MVP у самой Taligent был громоздким: взаимодействие дробилось на Interactor, Command, Selection и координирующий их Presenter. Операционная система так и не вышла, но терминология осталась.',
        en: 'The name Model-View-Presenter came from **Taligent** - the 1992-1998 joint venture of **Apple, IBM, and Hewlett-Packard** that set out to build a next-generation object-oriented operating system. **Mike Potel**, Taligent\'s CTO, published "MVP: Model-View-Presenter - The Taligent Programming Model for C++ and Java" in 1996. Taligent\'s own MVP was bulky: it split interaction into Interactor, Command, Selection, and a Presenter that coordinated them. The operating system never shipped, but its vocabulary outlived the project.',
      },
      {
        ru: 'Под MVP сегодня почти все понимают гораздо более простой вариант, который около 2000 года описали **Энди Бауэр (Andy Bower) и Блэр Макглашан (Blair McGlashan)** из команды **Dolphin Smalltalk** в статье, обычно известной как «Twisting the Triad». Тройное деление MVC они сохранили, но перераспределили связи: **View подписан прямо на Model** ради простого показа значений, а **все жесты пользователя обрабатывает Presenter**, и меняет Model только он. Controller из MVC - в Smalltalk он в основном разбирал сырые события мыши и клавиатуры - пропал: современные наборы виджетов делают эту работу сами.',
        en: 'What almost everyone calls MVP today is the far simpler version described by **Andy Bower and Blair McGlashan** of the **Dolphin Smalltalk** team around 2000, in a write-up usually cited as "Twisting the Triad". They kept MVC\'s three-way split but changed who talks to whom: the **View observes the Model directly** for plain value display, while the **Presenter handles every user gesture** and stays the only party that changes the Model. MVC\'s Controller - which in Smalltalk mostly routed raw mouse and keyboard events - disappeared, because modern widget toolkits already do that routing.',
      },
      {
        ru: 'В 2006 году **Мартин Фаулер (Martin Fowler)** разобрал всё это семейство и решил, что название «MVP» стало слишком размытым, чтобы оставаться одним. Он разделил его на **Passive View** - у View ноль логики и ноль доступа к Model, каждый пиксель через интерфейс рисует Presenter - и **Supervising Controller** - простые свойства Model View связывает с экраном сам, а Presenter подключается только к сложным правилам. Passive View выжимает максимум тестируемости ценой большого интерфейса View; Supervising Controller требует меньше связующего кода, но часть логики связывания снова оказывается в виджете и вне тестов.',
        en: 'In 2006 **Martin Fowler** catalogued this family and concluded that the name "MVP" had become too vague to keep as one. He split it into **Passive View** - the View has zero logic and zero Model access, the Presenter draws every pixel through the View interface - and **Supervising Controller** - the View binds itself to simple Model properties, and the Presenter only steps in for complex rules. Passive View pushes testability to its maximum at the cost of a large View interface; Supervising Controller writes less glue code but puts some untested binding logic back in the widget.',
      },
      {
        ru: 'Чаще всего разницу с MVC описывают через то, кто управляет отрисовкой. В MVC следующий View выбирает Controller, а View волен читать Model; в MVP Presenter намертво закреплён за своим интерфейсом View и - по крайней мере в Passive View - только он этот View и обновляет. Поэтому Presenter оказывается обычным объектом без зависимостей от виджетов, и в этом весь смысл: его создают с поддельным View, подают ему события и смотрят, какие `showX` он вызвал.',
        en: 'The most cited difference from MVC is framed as the direction of control over rendering. In MVC the Controller picks the next View, and the View is free to read the Model; in MVP the Presenter is welded one to one to its View interface and - at least in Passive View - stays the only thing that updates it. This makes the Presenter a plain object with no widget dependencies, which is the whole point: you construct it with a fake View, feed it events, and check which `showX` calls it made.',
      },
      {
        ru: 'MVP и **MVVM** решают одну и ту же задачу - тестируемую логику представления - противоположными способами. В MVP вызовы обновления View пишут руками (`view.showItems(...)`); в MVVM их убирают: **слой связывания данных** сам синхронизирует виджеты View со свойствами ViewModel. Поэтому MVP не нужна поддержка со стороны фреймворка и он работает на любом языке, а MVVM нужен биндер, и окупается он прежде всего там, где биндер уже есть.',
        en: 'MVP and **MVVM** solve the same task - testable presentation logic - by opposite means. MVP writes the View-updating calls by hand (`view.showItems(...)`); MVVM removes them by handing a **data-binding layer** the job of synchronising View widgets with ViewModel properties automatically. So MVP needs no framework support and works in any language; MVVM needs a binder and pays off mostly where one already exists.',
      },
      {
        ru: 'Больше всего MVP применяли в **Android примерно 2015-2019 годов**. Стандартным приёмом был интерфейс `LoginContract` с вложенными `interface View { showProgress(); showError(String); }` и `interface Presenter { onLoginClicked(...); }`: `Activity` или `Fragment` реализовывал `View`, а всё остальное передавал Presenter-у на чистой Java, который можно было гонять в JUnit без устройства. После того как Google в 2017-2019 годах взял курс на `ViewModel`, `LiveData`, а позже Compose, почти весь этот шаблонный код устарел - но в больших старых проектах его до сих пор много.',
        en: 'MVP\'s largest deployment was **Android, roughly 2015-2019**. The common approach was a `LoginContract` interface with nested `interface View { showProgress(); showError(String); }` and `interface Presenter { onLoginClicked(...); }`, where an `Activity` or `Fragment` implemented `View` and delegated everything else to a plain-Java Presenter that could run in JUnit off-device. Google\'s 2017-2019 push toward `ViewModel`, `LiveData`, and later Compose made this boilerplate largely obsolete, but it still fills large legacy codebases.',
      },
      {
        ru: 'Постоянная претензия к MVP: интерфейс View разрастается - по методу на каждое визуальное состояние (`showLoading`, `showEmpty`, `showError`, `showRetry`, `showContent`), - а Presenter превращается в длинный набор веток, которые вызывают их в разных сочетаниях. Часть команд отвечает на это иначе: передаёт один неизменяемый объект `ViewState` в единственный метод `render(state)` - и это уже шаг от MVP в сторону подхода «нарисуй объект состояния», как в MVVM и современном React.',
        en: 'A recurring complaint about MVP: the View interface grows one method per visual state - `showLoading`, `showEmpty`, `showError`, `showRetry`, `showContent` - and the Presenter turns into a long set of branches that call them in different combinations. Some teams answer this by passing a single immutable `ViewState` object into one `render(state)` method - which is already a step from MVP toward the "render a state object" style of MVVM and modern React.',
      },
      {
        ru: 'Если убрать платформенные детали, от MVP остаётся одна мысль: **граница между логикой представления и набором виджетов должна быть явным интерфейсом**, чтобы логику можно было тестировать в отрыве от UI. Сколько бы методов ни было у этого интерфейса - двадцать `showX` (Passive View) или один `render(state)` (современный вариант) - и заполняет ли его за вас биндер (MVVM), граница проходит там же, где её провёл MVP.',
        en: 'Strip away the platform specifics and MVP\'s durable contribution is one idea: **make the boundary between presentation logic and the widget toolkit an explicit interface**, so the logic can be tested in isolation. Whether that interface has twenty `showX` methods (Passive View) or one `render(state)` method (the modern form), and whether a binder fills it in for you (MVVM), the seam is the same seam MVP drew.',
      },
    ],
    whenToUse: [
      {
        ru: '**Сложная логика одного экрана под тестами** - формы-мастера, экраны с множеством условных полей и состояний ошибок, где каждую ветку нужно закрыть быстрым юнит-тестом, а поднимать ради каждого прогона настоящий UI недопустимо.',
        en: '**Complex single-screen logic under test** - wizard-style forms, screens with many conditional fields and error states, where every branch needs a fast unit test and booting the real UI for each run is out of the question.',
      },
      {
        ru: '**Вместо MVC** - если ваш Controller в MVC уже дёргает методы конкретных виджетов и не поддаётся юнит-тестам, оформить View как интерфейс (то есть перейти на MVP) - это самая маленькая правка, которая решает проблему.',
        en: '**Against MVC** - when your MVC Controller starts poking concrete widget methods and cannot be unit-tested, formalising the View as an interface (that is, moving to MVP) is the smallest fix that solves it.',
      },
      {
        ru: '**Вместо MVVM** - берите MVP, когда в вашем языке или на платформе нет слоя связывания данных или когда вы намеренно хотите, чтобы вызовы обновления View были явными и находились обычным поиском по коду, а не прятались в выражениях привязки.',
        en: '**Against MVVM** - pick MVP when your language or platform has no data-binding layer, or when you deliberately want the View-update calls to be explicit and greppable rather than hidden inside binding expressions.',
      },
      {
        ru: '**Старый Android и корпоративный десктоп** - MVP разумная цель при рефакторинге Android-приложения образца 2016 года или приложения на Windows Forms: новый фреймворк не нужен, нужна дисциплина и по интерфейсу на экран.',
        en: '**Legacy Android and enterprise desktop** - MVP is a sensible target when refactoring a 2016-era Android app or a Windows Forms application: no new framework is needed, just discipline and one interface per screen.',
      },
      {
        ru: '**Не для нескольких видов одной Model** - на дашбордах, где одни и те же данные показаны сразу таблицей и графиком, правило «один Presenter на один View» только мешает; под такую форму лучше подходят MVC или MVVM.',
        en: '**Not for several views of one Model** - dashboards showing the same data as a table and a chart at once fight the one-Presenter-per-View rule; MVC or MVVM fit that shape better.',
      },
    ],
    realWorld: [
      {
        ru: '**Mike Potel, «MVP: Model-View-Presenter - The Taligent Programming Model for C++ and Java» (Taligent Inc., 1996)** - работа, давшая паттерну имя и описавшая громоздкий вариант с Interactor / Command / Selection, сделанный под операционную систему Taligent.',
        en: '**Mike Potel, "MVP: Model-View-Presenter - The Taligent Programming Model for C++ and Java" (Taligent Inc., 1996)** - the document that gave the pattern its name and described the bulky Interactor / Command / Selection version built for the Taligent operating system.',
      },
      {
        ru: '**Andy Bower и Blair McGlashan, «Twisting the Triad» (Dolphin Smalltalk, около 2000)** - текст, который свёл MVP к тому виду, каким им пользуются на практике: View подписан на Model, жестами занимается Presenter.',
        en: '**Andy Bower and Blair McGlashan, "Twisting the Triad" (Dolphin Smalltalk, ~2000)** - the write-up that reduced MVP to the version practitioners actually use: the View observes the Model, the Presenter owns the gestures.',
      },
      {
        ru: '**Martin Fowler, «GUI Architectures» (martinfowler.com, 2006)** - делит MVP на Passive View и Supervising Controller и доказывает, что общий термин пора убрать; до сих пор основная точка отсчёта.',
        en: '**Martin Fowler, "GUI Architectures" (martinfowler.com, 2006)** - splits MVP into Passive View and Supervising Controller and argues the umbrella term should be retired; still the standard reference point.',
      },
      {
        ru: '**Google Web Toolkit, «Large scale application development and MVP» (Google, 2010)** - официальное руководство GWT, где MVP назначен рекомендованной структурой для крупных GWT-приложений, а роль Presenter-ов играют Activities.',
        en: '**Google Web Toolkit, "Large scale application development and MVP" (Google, 2010)** - GWT\'s official guide making MVP the recommended structure for large GWT applications, with Activities acting as Presenters.',
      },
      {
        ru: '**Android Architecture Blueprints - `todo-mvp` (Google, 2016-2019)** - собственный образцовый репозиторий Google со стилем интерфейса `Contract`, который и задал канон MVP в Android-сообществе до Architecture Components.',
        en: '**Android Architecture Blueprints - `todo-mvp` (Google, 2016-2019)** - Google\'s own reference repository demonstrating the `Contract` interface style that set the canon for Android MVP before Architecture Components.',
      },
    ],
  },

  relatedPatterns: ['mvc'],

  quiz: [
    {
      question: {
        ru: 'Чем становится View в MVP?',
        en: 'What does the View become in MVP?',
      },
      options: [
        { ru: 'Интерфейсом с методами обновления и тонким виджетом, который только передаёт события', en: 'An interface of update methods plus a thin widget that only forwards events' },
        { ru: 'Единственным классом, который хранит все данные, форматирует их и сам решает, что именно показать пользователю', en: 'The one and only class that holds all the data, formats it, and decides entirely on its own what to show on screen' },
        { ru: 'Подклассом Model, который получает право менять её поля напрямую, минуя методы', en: 'A subclass of the Model that gains the right to change its fields directly, bypassing methods' },
        { ru: 'Обёрткой над Presenter, через которую тот рассылает события всем остальным экранам', en: 'A wrapper around the Presenter through which it broadcasts events to every other screen' },
      ],
      correct: 0,
      explanation: {
        ru: 'View в MVP - это интерфейс (`showItems`, `showError` и подобные) и конкретный виджет, который его реализует и лишь передаёт события в Presenter.',
        en: 'The View in MVP is an interface (`showItems`, `showError`, and so on) plus a concrete widget that implements it and merely forwards events to the Presenter.',
      },
      hint: {
        ru: 'Смотрите раздел «Решение» на вкладке «Суть» и роль View на вкладке «Схема».',
        en: 'See the "Solution" section on the "Intent" tab and the View\'s role on the "Diagram" tab.',
      },
    },
    {
      question: {
        ru: 'Кому в MVP разрешено менять Model?',
        en: 'Who is allowed to change the Model in MVP?',
      },
      options: [
        { ru: 'Presenter - он вызывает методы Model в ответ на события пользователя', en: 'The Presenter - it calls Model methods in response to user events' },
        { ru: 'View - виджет пишет прямо в поля Model сразу после каждого клика пользователя', en: 'The View - the widget writes to the Model\'s fields directly right after every click' },
        { ru: 'Самой Model по таймеру - она периодически заново собирает всё своё состояние с нуля', en: 'The Model itself on a timer - it periodically regenerates its whole state from scratch' },
        { ru: 'Любому из трёх компонентов - в MVP владелец изменений состояния специально не задан', en: 'Any of the three components - MVP deliberately leaves the owner of state changes unassigned' },
      ],
      correct: 0,
      explanation: {
        ru: 'В MVP жесты пользователя обрабатывает и Model меняет только Presenter; View к Model не обращается совсем (в Passive View) либо лишь читает её.',
        en: 'In MVP only the Presenter handles user gestures and changes the Model; the View does not touch the Model at all (in Passive View) or only reads it.',
      },
      hint: {
        ru: 'Смотрите роль Presenter на вкладке «Схема» и шаг «Presenter разбирает событие».',
        en: 'See the Presenter\'s role on the "Diagram" tab and the "The Presenter interprets the event" step.',
      },
    },
    {
      question: {
        ru: 'Почему Presenter получает интерфейс View, а не конкретный виджет?',
        en: 'Why is the Presenter given a View interface rather than the concrete widget?',
      },
      options: [
        { ru: 'Чтобы его логику можно было покрыть юнит-тестами с поддельным View, без настоящего UI', en: 'So its logic can be unit-tested with a fake View, without a real UI' },
        { ru: 'Чтобы виджет мог существовать сразу в нескольких экземплярах и рисовать себя в разных окнах', en: 'So the widget can exist in several instances and draw itself in different windows at once' },
        { ru: 'Чтобы Model могла подписаться на интерфейс и обновлять его напрямую, минуя Presenter', en: 'So the Model can subscribe to the interface and update it directly, bypassing the Presenter' },
        { ru: 'Чтобы вообще отказаться от Model и хранить всё состояние прямо внутри интерфейса View', en: 'To get rid of the Model entirely and keep all state directly inside the View interface' },
      ],
      correct: 0,
      explanation: {
        ru: 'Зависимость от интерфейса, а не от виджета, и есть суть MVP: в тесте вместо виджета подставляют объект-заглушку и проверяют вызовы `showX`.',
        en: 'Depending on an interface rather than a widget is the point of MVP: in a test a stub object replaces the widget and the `showX` calls are asserted.',
      },
      hint: {
        ru: 'Смотрите раздел «Как это работает» на вкладке «Суть» и первый пункт плюсов.',
        en: 'See the "How it works" section on the "Intent" tab and the first "Pros" item.',
      },
    },
    {
      question: {
        ru: 'Что теряется, если конкретный виджет начнёт сам форматировать данные Model вместо Presenter?',
        en: 'What is lost if the concrete widget starts formatting Model data itself instead of the Presenter?',
      },
      options: [
        { ru: 'Пропадает единственное место, где решается, что видит пользователь, и логику снова не покрыть тестом', en: 'The guarantee of a single place deciding what the user sees is gone, and the logic is untestable again' },
        { ru: 'Ничего не теряется - в MVP форматирование данных как раз и есть прямая обязанность конкретного виджета', en: 'Nothing is lost at all - in MVP formatting the data is in fact the widget\'s direct responsibility' },
        { ru: 'Presenter сразу перестанет запускаться, потому что без форматирования внутри его конструктор бросит ошибку', en: 'The Presenter stops running immediately, because without formatting in it its constructor throws an error' },
        { ru: 'Model потеряет доступ к своим подписчикам и больше никогда не сможет отправить ни одного уведомления', en: 'The Model loses access to its observers and can never send out a single notification again' },
      ],
      correct: 0,
      explanation: {
        ru: 'Смысл пассивного View в том, что форматирование живёт только в Presenter. Как только оно переезжает в виджет, его не проверить без UI, и появляется второй источник правды.',
        en: 'The point of a passive View is that formatting lives only in the Presenter. Once it moves into the widget it cannot be tested without a UI and a second source of truth appears.',
      },
      hint: {
        ru: 'Смотрите третий пункт плюсов и раздел «Проблема» на вкладке «Суть».',
        en: 'See the third "Pros" item and the "Problem" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'В примере реализации - почему `onAddClicked` ловит исключение и вызывает `view.showError`, а не даёт ошибке уйти дальше?',
        en: 'In the implementation example, why does `onAddClicked` catch the exception and call `view.showError` instead of letting the error propagate?',
      },
      options: [
        { ru: 'Presenter превращает исход из Model, в том числе неудачный, в вызовы интерфейса View - сам View ни Model, ни исключения не видит', en: 'The Presenter turns a Model outcome, failure included, into View-interface calls - the View sees neither the Model nor the exception' },
        { ru: 'Иначе исключение поднимется в Model, и та удалит все уже добавленные пункты, чтобы откатиться в полностью согласованное состояние без частичных записей', en: 'Otherwise the exception rises into the Model, which then deletes every already-added item to roll itself back to a fully consistent state with no leftover partial writes' },
        { ru: 'Иначе конструктор `TodoView` откажется создавать виджет, потому что требует заранее переданный обработчик ошибок', en: 'Otherwise the `TodoView` constructor refuses to create the widget, since it requires an error handler passed in advance' },
        { ru: 'Потому что необработанное исключение в JavaScript всегда молча откатывает все изменения DOM за последний кадр', en: 'Because an unhandled exception in JavaScript always silently rolls back every DOM change from the last frame' },
      ],
      correct: 0,
      explanation: {
        ru: 'Presenter - переводчик между Model и View: и удачный, и неудачный исход он превращает в конкретные вызовы `showItems` / `showError`, а View остаётся пассивным.',
        en: 'The Presenter is the translator between Model and View: it converts both the success and the failure outcome into concrete `showItems` / `showError` calls, and the View stays passive.',
      },
      hint: {
        ru: 'Смотрите разбор `onAddClicked` на вкладке «Реализация».',
        en: 'See the `onAddClicked` walkthrough on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Что произойдёт, если в примере убрать вызов `render()` в конце `onItemClicked`?',
        en: 'What happens if the `render()` call at the end of `onItemClicked` is removed in the example?',
      },
      options: [
        { ru: 'Model изменится, но пассивному View об этом не скажут, и на экране останется старое', en: 'The Model changes, but the passive View is not told, and the screen stays stale' },
        { ru: 'Model откатит переключение галочки назад, раз никто не подтвердил изменение вызовом render', en: 'The Model rolls the checkbox toggle back, since nobody confirmed the change with a render call' },
        { ru: 'Presenter при следующем событии сам заметит расхождение и перерисует экран задним числом', en: 'On the next event the Presenter notices the mismatch itself and re-renders the screen after the fact' },
        { ru: 'View начнёт сам читать `model.items` напрямую, чтобы восполнить пропущенное обновление', en: 'The View starts reading `model.items` directly to make up for the missed update on its own' },
      ],
      correct: 0,
      explanation: {
        ru: 'Пассивный View не следит за Model и сам не обновляется. Если Presenter не вызвал `render()`, состояние поменялось, а на экране осталась прежняя картинка.',
        en: 'A passive View does not observe the Model and does not update itself. If the Presenter did not call `render()`, the state changed while the screen kept the old picture.',
      },
      hint: {
        ru: 'Смотрите разбор `onItemClicked` и `render` на вкладке «Реализация».',
        en: 'See the `onItemClicked` and `render` walkthrough on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Почему в варианте MVP от Dolphin Smalltalk пропал Controller, который был в MVC?',
        en: 'Why did the Controller from MVC disappear in the Dolphin Smalltalk version of MVP?',
      },
      options: [
        { ru: 'Современные наборы виджетов уже сами разбирают сырые события мыши и клавиатуры, и его основная работа отпала', en: 'Modern widget toolkits already route raw mouse and keyboard events themselves, so its main job was gone' },
        { ru: 'Его обязанности целиком забрала Model, которая с тех пор сама напрямую подписывает виджеты на свои события ввода, без посредника', en: 'The Model took over its duties entirely and since then subscribes widgets directly to its own input events' },
        { ru: 'Команда Dolphin сочла слово Controller неудачным и просто переименовала тот же самый класс в Presenter', en: 'The Dolphin team found the word Controller unfortunate and simply renamed the very same class to Presenter' },
        { ru: 'В Smalltalk нельзя было держать три объекта на один экран, поэтому один из трёх всегда приходилось убирать', en: 'Smalltalk could not have three objects per screen, so one of the three always had to be removed' },
      ],
      correct: 0,
      explanation: {
        ru: 'В Smalltalk Controller в основном занимался маршрутизацией низкоуровневого ввода. Когда это взял на себя тулкит, отдельный класс под задачу стал не нужен, а логику жестов подобрал Presenter.',
        en: 'In Smalltalk the Controller mostly routed low-level input. Once the toolkit took that over, a separate class for it was unnecessary, and the Presenter absorbed the gesture logic.',
      },
      hint: {
        ru: 'Смотрите абзац про Dolphin Smalltalk и «Twisting the Triad» в разделе «Как это работает».',
        en: 'See the paragraph about Dolphin Smalltalk and "Twisting the Triad" in the "How it works" section.',
      },
    },
    {
      question: {
        ru: 'Чем по-разному MVP и MVVM добиваются тестируемой логики представления?',
        en: 'How do MVP and MVVM achieve testable presentation logic differently?',
      },
      options: [
        { ru: 'В MVP вызовы обновления View пишут руками, в MVVM их убирает автоматический слой связывания данных', en: 'MVP writes the View-update calls by hand, MVVM removes them with an automatic data-binding layer' },
        { ru: 'MVP тестирует логику на настоящих виджетах, а MVVM запрещает любые юнит-тесты и требует только ручной проверки', en: 'MVP tests the logic against real widgets, while MVVM forbids any unit tests and requires only manual checking' },
        { ru: 'MVP держит бизнес-правила в Presenter, а MVVM переносит их в View и полностью отказывается от отдельной Model', en: 'MVP keeps business rules in the Presenter, while MVVM moves them into the View and drops a separate Model entirely' },
        { ru: 'Разницы в подходе к тестированию между ними нет - MVVM это просто более новое название того же самого MVP', en: 'There is no difference in their testing approach - MVVM is just a newer name for the very same MVP' },
      ],
      correct: 0,
      explanation: {
        ru: 'Цель одна, средства противоположны: в MVP связь с View обновляют явными вызовами `showX`, в MVVM её держит биндер, синхронизируя свойства ViewModel с виджетами.',
        en: 'The goal is the same, the means are opposite: in MVP the View link is updated by explicit `showX` calls, in MVVM a binder maintains it by syncing ViewModel properties with widgets.',
      },
      hint: {
        ru: 'Смотрите абзац про MVVM и слой связывания данных в разделе «Как это работает».',
        en: 'See the paragraph about MVVM and the data-binding layer in the "How it works" section.',
      },
    },
    {
      question: {
        ru: 'В чём разница между вариантами Passive View и Supervising Controller?',
        en: 'What is the difference between the Passive View and Supervising Controller variants?',
      },
      options: [
        { ru: 'В Passive View у экрана ноль логики и всё рисует Presenter; в Supervising Controller простые поля View связывает сам', en: 'In Passive View the screen has zero logic and the Presenter draws everything; in Supervising Controller the View binds simple fields itself' },
        { ru: 'В Passive View одна и та же Model общается сразу с двумя разными Presenter-ами, а в Supervising Controller - строго с одним и только одним', en: 'In Passive View one and the same Model talks to two entirely different Presenters at once, and in Supervising Controller to strictly one only' },
        { ru: 'Passive View применяют только на сервере, а Supervising Controller - исключительно в мобильных и десктопных клиентах', en: 'Passive View is used only on the server, while Supervising Controller is exclusively for mobile and desktop clients' },
        { ru: 'В Passive View юнит-тесты Presenter запрещены, а Supervising Controller, наоборот, требует стопроцентного покрытия', en: 'Passive View forbids unit-testing the Presenter, while Supervising Controller instead demands one hundred percent coverage' },
      ],
      correct: 0,
      explanation: {
        ru: 'Passive View выжимает максимум тестируемости, но раздувает интерфейс View. Supervising Controller оставляет простое связывание в виджете: кода меньше, но часть логики опять вне тестов.',
        en: 'Passive View maximises testability but inflates the View interface. Supervising Controller leaves simple binding in the widget: less code, but some logic is outside tests again.',
      },
      hint: {
        ru: 'Смотрите абзац про Мартина Фаулера и разделение 2006 года в разделе «Как это работает».',
        en: 'See the paragraph about Martin Fowler and the 2006 split in the "How it works" section.',
      },
    },
    {
      question: {
        ru: 'Дашборд должен показывать один и тот же набор данных сразу живой таблицей и живым графиком. Почему чистый MVP тут неудобен?',
        en: 'A dashboard must show the same dataset as both a live table and a live chart at once. Why is plain MVP an awkward fit here?',
      },
      options: [
        { ru: 'MVP связывает один Presenter с одним интерфейсом View, а несколько одновременных видов одной Model этому правилу противоречат', en: 'MVP binds one Presenter to one View interface, and several simultaneous views of one Model go against that rule' },
        { ru: 'MVP запрещает Model содержать больше одного поля, поэтому её данных физически не хватит сразу на таблицу и график', en: 'MVP forbids the Model from holding more than one field, so its data physically cannot feed both a table and a chart' },
        { ru: 'MVP требует пересоздавать каждый Presenter на каждый кадр анимации, и два живых вида неизбежно дадут бесконечный цикл лишних перерисовок экрана', en: 'MVP requires every Presenter to be recreated on each animation frame, and two live views cause an endless re-render loop' },
        { ru: 'MVP работает только там, где есть слой связывания данных, а таблицы и графики рисуются вообще без всякой привязки', en: 'MVP works only where a data-binding layer exists, and tables and charts are drawn without any binding at all' },
      ],
      correct: 0,
      explanation: {
        ru: 'Схема «один Presenter - один View» рассчитана на один экран. Когда одну Model нужно одновременно отдавать в несколько представлений, естественнее ложатся MVC или MVVM.',
        en: 'The one-Presenter-one-View pairing assumes a single screen. When one Model must feed several representations at once, MVC or MVVM fit more naturally.',
      },
      hint: {
        ru: 'Смотрите третий пункт минусов и последний пункт раздела «Когда применять» в подробностях.',
        en: 'See the third "Cons" item and the last "When to use" point in the details.',
      },
    },
  ],
};

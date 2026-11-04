export const mvvm = {
  slug: 'mvvm',
  category: 'presentation',
  name: { ru: 'MVVM', en: 'MVVM' },
  popularity: 3,
  tags: ['presentation-layer', 'data-binding', 'testability'],

  intent: {
    ru: 'MVVM (Model-View-ViewModel) выносит состояние и поведение экрана в ViewModel - обычный объект с наблюдаемыми свойствами и командами, который ничего не знает о View. View описывает, какой виджет к какому свойству привязан, а синхронизацию в обе стороны берёт на себя слой связывания данных. Логику экрана можно тестировать без UI, и при этом не нужно писать ни одного ручного вызова обновления экрана.',
    en: 'MVVM (Model-View-ViewModel) moves a screen\'s state and behaviour into a ViewModel - a plain object with observable properties and commands that knows nothing about the View. The View declares which widget is bound to which property, and a data-binding layer keeps both sides in sync. The screen logic can be tested without a UI, and nobody has to write a single manual screen-update call.',
  },

  problem: {
    ru: 'MVP сделал логику представления тестируемой, но за это пришлось платить связующим кодом: на каждое поле экрана - метод `showX` в интерфейсе View и его вызов в Presenter, на каждое поле ввода - обработчик, который переносит значение обратно. На формах с десятками полей этот код занимает больше места, чем сама логика, и в нём легко забыть одно обновление. Платформы, где привязка данных уже встроена (WPF, позже браузерные фреймворки), позволяли эту рутину не писать вовсе - нужен был паттерн, который на это опирается.',
    en: 'MVP made presentation logic testable, but paid for it in glue code: every on-screen field needs a `showX` method in the View interface and a call to it in the Presenter, and every input field needs a handler that copies the value back. On forms with dozens of fields this glue outgrows the logic itself, and it is easy to miss one update. Platforms with built-in data binding (WPF, later browser frameworks) made it possible to skip that routine entirely - what was needed was a pattern built on top of it.',
  },

  solution: {
    ru: 'ViewModel хранит всё, что нужно экрану, в виде наблюдаемых свойств (текст в поле ввода, флаг доступности кнопки, готовые строки списка) и выставляет действия пользователя как команды (`add`, `save`). Ссылки на View у неё нет. View - это разметка, где у каждого виджета указано, к какому свойству он привязан. Биндер подписывается на свойства и обновляет виджеты при каждом изменении, а ввод пользователя записывает обратно в свойства. ViewModel обращается к Model за данными и бизнес-правилами, подписывается на её изменения и пересчитывает свои свойства - дальше биндер сам доносит их до экрана.',
    en: 'The ViewModel holds everything the screen needs as observable properties (the text in an input, whether a button is enabled, the ready-to-show list lines) and exposes user actions as commands (`add`, `save`). It has no reference to the View. The View is markup in which every widget declares the property it is bound to. A binder subscribes to the properties and updates the widgets on every change, and writes user input back into the properties. The ViewModel calls the Model for data and business rules, observes its changes, and recalculates its own properties - from there the binder carries them to the screen.',
  },

  diagram: {
    layout: 'stack',
    nodes: [
      {
        id: 'view',
        label: { ru: 'View', en: 'View' },
        role: {
          ru: 'Разметка с привязками: у каждого виджета указано, к какому свойству или команде ViewModel он подключён. Своего кода у View почти нет - значения в виджеты записывает и забирает из них биндер.',
          en: 'Markup with bindings: every widget declares which ViewModel property or command it is wired to. The View has almost no code of its own - the binder writes values into the widgets and reads them back.',
        },
      },
      {
        id: 'viewmodel',
        label: { ru: 'ViewModel', en: 'ViewModel' },
        role: {
          ru: 'Состояние экрана в виде наблюдаемых свойств и действия в виде команд. Обращается к Model, форматирует её данные для показа и сообщает об изменении свойств. Ссылки на View не держит, поэтому тестируется как обычный объект.',
          en: 'The screen\'s state as observable properties and its actions as commands. Calls the Model, formats its data for display, and announces property changes. Holds no reference to the View, so it is tested like any plain object.',
        },
      },
      {
        id: 'model',
        label: { ru: 'Model', en: 'Model' },
        role: {
          ru: 'Данные и бизнес-правила, как в MVC и MVP. Об экране и о ViewModel ничего не знает - просто оповещает подписчиков, когда её состояние меняется.',
          en: 'Data and business rules, as in MVC and MVP. Knows nothing about the screen or the ViewModel - it simply notifies its observers when its state changes.',
        },
      },
    ],
    connections: [
      { from: 'view', to: 'viewmodel', label: { ru: 'ввод и команды', en: 'input, commands' } },
      { from: 'viewmodel', to: 'model', label: { ru: 'вызывает', en: 'calls' } },
      { from: 'model', to: 'viewmodel', label: { ru: 'уведомляет', en: 'notifies' } },
      { from: 'viewmodel', to: 'view', label: { ru: 'привязка', en: 'binding' } },
    ],
  },

  steps: [
    {
      title: { ru: 'Пользователь вводит, биндер записывает', en: 'The user types, the binder writes' },
      explanation: {
        ru: 'Пользователь печатает в поле или нажимает кнопку. Обработчика в View нет: биндер сам записывает новый текст в свойство ViewModel, а нажатие превращает в вызов команды.',
        en: 'The user types into a field or presses a button. The View has no handler for it: the binder writes the new text into a ViewModel property itself and turns the press into a command call.',
      },
    },
    {
      title: { ru: 'ViewModel выполняет команду', en: 'The ViewModel runs the command' },
      explanation: {
        ru: 'Команда берёт значения из свойств ViewModel и вызывает нужный метод Model. Производные свойства, например доступность кнопки, ViewModel пересчитывает сразу при изменении исходных.',
        en: 'The command reads values from the ViewModel\'s properties and calls the matching Model method. Derived properties, such as whether a button is enabled, are recalculated as soon as their inputs change.',
      },
    },
    {
      title: { ru: 'Model меняется и оповещает', en: 'The Model changes and notifies' },
      explanation: {
        ru: 'Model применяет свои правила, обновляет состояние и оповещает подписчиков. Подписчик здесь - ViewModel, а не View.',
        en: 'The Model applies its rules, updates its state, and notifies its observers. The observer here is the ViewModel, not the View.',
      },
    },
    {
      title: { ru: 'Привязка обновляет экран', en: 'Binding updates the screen' },
      explanation: {
        ru: 'ViewModel пересчитывает свои свойства из нового состояния Model и сообщает, что они изменились. Биндер получает это уведомление и перерисовывает привязанные виджеты - никто не вызывает методы View вручную.',
        en: 'The ViewModel recalculates its properties from the Model\'s new state and announces that they changed. The binder receives the notification and redraws the bound widgets - nobody calls View methods by hand.',
      },
    },
  ],

  implementation: {
    javascript: `class Observable {
  constructor(value) {
    this.value = value;
    this.listeners = [];
  }

  set(value) {
    this.value = value;
    this.listeners.forEach((fn) => fn(value));
  }

  subscribe(fn) {
    this.listeners.push(fn);
    fn(this.value);
  }
}

class TodoModel {
  constructor() {
    this.items = [];
    this.listeners = [];
  }

  addItem(text) {
    if (!text.trim()) throw new Error('empty text');
    this.items.push(text);
    this.listeners.forEach((fn) => fn());
  }

  onChange(fn) {
    this.listeners.push(fn);
  }
}

class TodoViewModel {
  constructor(model) {
    this.model = model;
    this.draft = new Observable('');
    this.canAdd = new Observable(false);
    this.lines = new Observable([]);
    this.count = new Observable('');
    this.draft.subscribe((text) => this.canAdd.set(text.trim() !== ''));
    model.onChange(() => this.sync());
    this.sync();
  }

  add() {
    this.model.addItem(this.draft.value);
    this.draft.set('');
  }

  sync() {
    this.lines.set(this.model.items.map((text, i) => i + 1 + '. ' + text));
    this.count.set('Items: ' + this.model.items.length);
  }
}

function bind(root, vm) {
  for (const el of root.querySelectorAll('[data-value]')) {
    const prop = vm[el.dataset.value];
    prop.subscribe((value) => {
      if (el.value !== value) el.value = value;
    });
    el.addEventListener('input', () => prop.set(el.value));
  }
  for (const el of root.querySelectorAll('[data-text]')) {
    vm[el.dataset.text].subscribe((value) => (el.textContent = value));
  }
  for (const el of root.querySelectorAll('[data-enabled]')) {
    vm[el.dataset.enabled].subscribe((value) => (el.disabled = !value));
  }
  for (const el of root.querySelectorAll('[data-list]')) {
    vm[el.dataset.list].subscribe((lines) => {
      el.replaceChildren(...lines.map((line) => Object.assign(document.createElement('li'), { textContent: line })));
    });
  }
  for (const el of root.querySelectorAll('[data-click]')) {
    el.addEventListener('click', () => vm[el.dataset.click]());
  }
}

const root = document.querySelector('#todo');
root.innerHTML = \`
  <input data-value="draft">
  <button data-enabled="canAdd" data-click="add">Add</button>
  <ul data-list="lines"></ul>
  <p data-text="count"></p>\`;

const vm = new TodoViewModel(new TodoModel());
bind(root, vm);
vm.draft.set('Learn MVVM');
vm.add();`,
  },

  walkthrough: {
    javascript: [
      {
        lines: [1, 16],
        title: { ru: 'Observable - наблюдаемое свойство', en: 'Observable - an observable property' },
        explanation: {
          ru: 'Самая маленькая деталь MVVM: значение плюс список подписчиков. `set` меняет значение и оповещает всех, `subscribe` добавляет подписчика и сразу отдаёт ему текущее значение. В WPF ту же роль играет `INotifyPropertyChanged`, в Knockout - `ko.observable`, в Android - `LiveData` и `StateFlow`.',
          en: 'The smallest building block of MVVM: a value plus a list of subscribers. `set` changes the value and notifies everyone, `subscribe` adds a subscriber and immediately hands it the current value. In WPF `INotifyPropertyChanged` plays this role, in Knockout `ko.observable`, on Android `LiveData` and `StateFlow`.',
        },
      },
      {
        lines: [18, 22],
        title: { ru: 'Model снова со списком подписчиков', en: 'A Model with an observer list again' },
        explanation: {
          ru: 'В отличие от примера Passive View на странице MVP, здесь у Model есть `listeners`. Подписывается на неё ViewModel: так она узнаёт об изменении данных, даже если их поменял кто-то другой.',
          en: 'Unlike the Passive View example on the MVP page, the Model here has `listeners`. The ViewModel subscribes to it, so it learns about data changes even when someone else made them.',
        },
      },
      {
        lines: [24, 33],
        title: { ru: 'addItem и onChange', en: 'addItem and onChange' },
        explanation: {
          ru: 'Правило «текст не может быть пустым» по-прежнему принадлежит Model, и она бросает исключение, если его нарушить. После изменения Model вызывает всех подписчиков из `onChange` и при этом не знает, кто они.',
          en: 'The "text cannot be empty" rule still belongs to the Model, which throws if it is broken. After a change the Model calls every subscriber registered through `onChange`, without knowing who they are.',
        },
      },
      {
        lines: [35, 45],
        title: { ru: 'ViewModel: свойства экрана', en: 'The ViewModel: the screen\'s properties' },
        explanation: {
          ru: 'Четыре свойства описывают весь экран: `draft` (текст в поле), `canAdd` (доступна ли кнопка), `lines` (строки списка), `count` (подпись). `canAdd` - производное: оно пересчитывается при каждом изменении `draft`. Обратите внимание, чего здесь нет: ни DOM, ни ссылки на View.',
          en: 'Four properties describe the whole screen: `draft` (the input text), `canAdd` (whether the button is enabled), `lines` (the list rows), `count` (the caption). `canAdd` is derived: it is recalculated on every `draft` change. Note what is missing: no DOM and no reference to the View.',
        },
      },
      {
        lines: [47, 50],
        title: { ru: 'add - команда', en: 'add - a command' },
        explanation: {
          ru: 'Команда берёт текст не из виджета, а из свойства `draft` - биндер уже положил его туда. После вызова Model она очищает `draft`, и поле ввода опустеет само, потому что привязано к этому свойству.',
          en: 'The command reads the text not from a widget but from the `draft` property - the binder has already put it there. After calling the Model it clears `draft`, and the input empties itself because it is bound to that property.',
        },
      },
      {
        lines: [52, 55],
        title: { ru: 'sync - форматирование для экрана', en: 'sync - formatting for the screen' },
        explanation: {
          ru: 'Здесь данные Model превращаются в то, что показывается: нумерованные строки и подпись `"Items: N"`. Это та же работа, что делал `render()` у Presenter в MVP, но результат записывается в свойства, а не передаётся в методы View.',
          en: 'This is where Model data turns into what is shown: numbered lines and the `"Items: N"` caption. It is the same job MVP\'s Presenter did in `render()`, but the result goes into properties instead of View methods.',
        },
      },
      {
        lines: [58, 65],
        title: { ru: 'Биндер: двусторонняя привязка поля', en: 'The binder: two-way binding for a field' },
        explanation: {
          ru: 'Для `data-value` биндер связывает обе стороны: подписка переносит значение из свойства в поле, обработчик `input` - из поля в свойство. Проверка `el.value !== value` не даёт перезаписать поле тем же текстом, пока пользователь печатает, иначе прыгал бы курсор.',
          en: 'For `data-value` the binder wires both directions: the subscription copies the property into the field, the `input` handler copies the field into the property. The `el.value !== value` check avoids rewriting the field with the same text while the user types, which would make the cursor jump.',
        },
      },
      {
        lines: [66, 80],
        title: { ru: 'Односторонние привязки и команды', en: 'One-way bindings and commands' },
        explanation: {
          ru: '`data-text`, `data-enabled` и `data-list` работают только в одну сторону, от свойства к виджету. `data-click` связывает кнопку с командой ViewModel по имени. Настоящие биндеры (WPF, Knockout, Vue) устроены сложнее, но идея та же: обновление экрана - забота инфраструктуры, а не ViewModel.',
          en: '`data-text`, `data-enabled`, and `data-list` work one way only, from property to widget. `data-click` wires a button to a ViewModel command by name. Real binders (WPF, Knockout, Vue) are more elaborate, but the idea is the same: updating the screen is the infrastructure\'s job, not the ViewModel\'s.',
        },
      },
      {
        lines: [82, 87],
        title: { ru: 'View - только разметка', en: 'The View - markup only' },
        explanation: {
          ru: 'У View в этом примере нет класса и нет ни одной строки логики: только виджеты и атрибуты, которые называют свойства и команды ViewModel. Сравните с `TodoView` из примера MVP, где были `bind`, `showItems`, `showRemaining` и `showError`.',
          en: 'In this example the View has no class and not a single line of logic: just widgets and attributes naming ViewModel properties and commands. Compare with `TodoView` in the MVP example, which had `bind`, `showItems`, `showRemaining`, and `showError`.',
        },
      },
      {
        lines: [89, 92],
        title: { ru: 'Сборка и полный цикл', en: 'Wiring and the full cycle' },
        explanation: {
          ru: 'ViewModel создаётся с Model, а `bind` соединяет её с разметкой. `vm.draft.set(...)` и `vm.add()` делают то же, что сделал бы пользователь: текст попадает в поле, Model получает новый пункт, и через уведомление и привязку список на экране обновляется сам.',
          en: 'The ViewModel is created with the Model, and `bind` connects it to the markup. `vm.draft.set(...)` and `vm.add()` do what a user would: the text appears in the field, the Model gets a new item, and through the notification and the binding the on-screen list updates itself.',
        },
      },
    ],
  },

  pros: [
    {
      ru: 'Ручного кода синхронизации нет: ни методов `showX`, ни обработчиков, переносящих значение из поля в переменную. На формах с десятками полей это заметно сокращает объём кода и убирает класс ошибок «забыли обновить экран».',
      en: 'There is no hand-written sync code: no `showX` methods and no handlers copying a field into a variable. On forms with dozens of fields this noticeably shrinks the code and removes the whole "forgot to update the screen" class of bugs.',
    },
    {
      ru: 'ViewModel не держит ссылку на View, поэтому в тесте её создают как обычный объект, меняют свойства, вызывают команды и проверяют значения. Даже заглушка View, как в MVP, не нужна.',
      en: 'The ViewModel holds no reference to the View, so a test creates it as a plain object, sets properties, calls commands, and checks values. Not even a stub View, as in MVP, is needed.',
    },
    {
      ru: 'Одну ViewModel можно привязать к нескольким View сразу или заменить разметку целиком, не трогая логику - так дизайнер и разработчик могут работать над экраном параллельно.',
      en: 'One ViewModel can be bound to several Views at once, or the markup can be replaced entirely without touching the logic - so a designer and a developer can work on a screen in parallel.',
    },
  ],
  cons: [
    {
      ru: 'Паттерн почти бесполезен без готового биндера: писать свой, как в примере, для реального приложения дорого. Поэтому MVVM привязан к платформам, где связывание уже есть.',
      en: 'The pattern is close to useless without a ready-made binder: writing your own, as in the example, is expensive for a real app. So MVVM is tied to platforms that already ship binding.',
    },
    {
      ru: 'Ошибки в привязках трудно отлаживать: опечатка в имени свойства в разметке часто не роняет приложение, а просто молча ничего не показывает, и путь от изменения до перерисовки не виден в коде.',
      en: 'Binding errors are hard to debug: a typo in a property name inside the markup often does not crash the app but silently shows nothing, and the path from a change to a redraw is invisible in the code.',
    },
    {
      ru: 'Для простого экрана это избыточно: наблюдаемые свойства, команды и инфраструктура привязки на форме из двух полей дают больше сложности, чем убирают.',
      en: 'For a simple screen it is overkill: observable properties, commands, and binding infrastructure on a two-field form add more complexity than they remove.',
    },
  ],

  whenToUse: [
    {
      ru: 'Когда платформа уже предоставляет привязку данных - WPF и .NET MAUI, Android с `ViewModel` и Compose, SwiftUI, Vue или Angular - и экран содержит много полей, состояний и производных значений.',
      en: 'When the platform already provides data binding - WPF and .NET MAUI, Android with `ViewModel` and Compose, SwiftUI, Vue or Angular - and the screen has many fields, states, and derived values.',
    },
    {
      ru: 'Когда логику экрана нужно покрыть тестами, а разметку будут часто менять или делить между несколькими видами одних и тех же данных.',
      en: 'When the screen logic must be covered by tests while the markup changes often or is shared between several views of the same data.',
    },
  ],

  realWorldExamples: [
    {
      ru: '**WPF, UWP и .NET MAUI** - MVVM здесь стандартный подход: ViewModel реализует `INotifyPropertyChanged`, действия выставляются через `ICommand`, а XAML связывает виджеты выражениями вроде `{Binding Name, Mode=TwoWay}`.',
      en: '**WPF, UWP, and .NET MAUI** use MVVM as the standard approach: the ViewModel implements `INotifyPropertyChanged`, actions are exposed through `ICommand`, and XAML binds widgets with expressions like `{Binding Name, Mode=TwoWay}`.',
    },
    {
      ru: '**Android Jetpack** - класс `ViewModel` хранит состояние экрана в `LiveData` или `StateFlow`, а `Activity`, `Fragment` или функция Compose подписываются на него и перерисовываются сами. Этот подход заменил в Android-сообществе прежний MVP.',
      en: '**Android Jetpack** - the `ViewModel` class keeps screen state in `LiveData` or `StateFlow`, and an `Activity`, `Fragment`, or Compose function observes it and redraws itself. This approach replaced MVP as the Android community default.',
    },
  ],

  details: {
    deepDive: [
      {
        ru: 'MVVM придумали в **Microsoft** под **WPF** (тогда ещё Avalon): архитекторы **Кен Купер (Ken Cooper)** и **Тед Питерс (Ted Peters)** искали способ строить интерфейсы на новой платформе с мощной привязкой данных. Публично паттерн описал **Джон Госсман (John Gossman)** в блоге в 2005 году. Главная мотивация была не только в тестах: в XAML разметку мог править дизайнер в отдельном инструменте, и нужна была чёткая граница: дизайнер правит разметку, не касаясь кода.',
        en: 'MVVM was invented at **Microsoft** for **WPF** (then still Avalon): architects **Ken Cooper** and **Ted Peters** were looking for a way to build UIs on a new platform with powerful data binding. **John Gossman** described the pattern publicly on his blog in 2005. The motivation was not only tests: in XAML the markup could be edited by a designer in a separate tool, and a boundary was needed that the designer could work up to without touching code.',
      },
      {
        ru: 'Идейно MVVM - это **Presentation Model** Мартина Фаулера (2004), приспособленная к платформе с привязкой данных. Presentation Model уже предлагала держать состояние и поведение экрана в отдельном объекте, не зависящем от виджетов, но синхронизацию с View оставляла на ручной код. MVVM делает тот же шаг, а синхронизацию отдаёт биндеру - отсюда и всё отличие.',
        en: 'Conceptually MVVM is Martin Fowler\'s **Presentation Model** (2004) adapted to a platform with data binding. Presentation Model already proposed keeping a screen\'s state and behaviour in a separate, widget-independent object, but left syncing with the View to hand-written code. MVVM takes the same step and hands the syncing to a binder - and that is the whole difference.',
      },
      {
        ru: 'Ключевое отличие от **MVP** - направление зависимости. Presenter знает интерфейс View и вызывает его методы; ViewModel не знает о View ничего, это View (через привязки) знает о ViewModel. Поэтому у ViewModel нет методов вида `showError`, есть только свойство `errorText`, а будет ли оно показано красной строкой, всплывающим окном или не показано вовсе, решает разметка.',
        en: 'The key difference from **MVP** is the direction of the dependency. A Presenter knows the View interface and calls its methods; a ViewModel knows nothing about the View - it is the View (through bindings) that knows about the ViewModel. So a ViewModel has no methods like `showError`, only an `errorText` property, and whether it shows as a red line, a popup, or not at all is up to the markup.',
      },
      {
        ru: 'Связывание бывает **односторонним** (свойство -> виджет: подпись, список, доступность кнопки) и **двусторонним** (поле ввода, где значение течёт в обе стороны). Действия пользователя оформляются **командами**: в WPF это `ICommand` с методами `Execute` и `CanExecute`, и кнопка сама становится недоступной, когда `CanExecute` возвращает `false` - ровно то, что в примере делает свойство `canAdd`.',
        en: 'Binding can be **one-way** (property -> widget: a caption, a list, a button\'s enabled state) or **two-way** (an input field where the value flows both directions). User actions are modelled as **commands**: in WPF that is `ICommand` with `Execute` and `CanExecute` methods, and a button disables itself when `CanExecute` returns `false` - exactly what the `canAdd` property does in the example.',
      },
      {
        ru: 'В браузер MVVM принёс **Knockout.js** (Стив Сандерсон, 2010): `ko.observable` для свойств и атрибуты `data-bind` в HTML - пример на вкладке «Реализация» почти повторяет эту модель. Затем идею подхватили **AngularJS** с двусторонним `ng-model` и **Vue**, чья документация прямо называет MVVM одним из источников вдохновения. **React** пошёл другим путём - однонаправленный поток данных без двусторонней привязки, - но разделение на «состояние и логику» и «декларативное описание экрана» у него то же.',
        en: '**Knockout.js** (Steve Sanderson, 2010) brought MVVM to the browser: `ko.observable` for properties and `data-bind` attributes in HTML - the example on the "Implementation" tab closely follows that model. **AngularJS** with its two-way `ng-model` and **Vue**, whose docs explicitly name MVVM as an inspiration, picked the idea up next. **React** took a different route - one-way data flow with no two-way binding - but keeps the same split between "state and logic" and "a declarative description of the screen".',
      },
      {
        ru: 'В **Android** MVVM стал официальным курсом после **Architecture Components** (Google I/O 2017): класс `ViewModel` переживает поворот экрана, состояние лежит в `LiveData`, позже в `StateFlow`, а UI подписывается на него. С приходом **Jetpack Compose** и **SwiftUI** на iOS (`ObservableObject`, `@Published`) View стало функцией от состояния, и привязка превратилась в простое «перерисуй, когда свойство изменилось».',
        en: 'On **Android** MVVM became the official direction after **Architecture Components** (Google I/O 2017): the `ViewModel` class survives screen rotation, state lives in `LiveData`, later `StateFlow`, and the UI observes it. With **Jetpack Compose** and **SwiftUI** on iOS (`ObservableObject`, `@Published`) the View became a function of state, and binding reduced to a simple "redraw when the property changes".',
      },
      {
        ru: 'Слабые места известны давно, и о части из них писал сам Госсман вскоре после публикации: на простом экране MVVM избыточен, а на большом трудно заранее спроектировать ViewModel. Привязки декларативны, поэтому опечатка в имени свойства часто не даёт ни ошибки компиляции, ни исключения - виджет просто остаётся пустым. На практике частая болезнь - **«толстая ViewModel»**: в неё начинают складывать бизнес-логику, которой место в Model, и она разрастается так же, как Controller в плохом MVC.',
        en: 'The weak spots have been known for a long time, and Gossman himself wrote about some of them soon after publishing: MVVM is overkill on a simple screen, and on a large one the ViewModel is hard to design up front. Bindings are declarative, so a typo in a property name often produces neither a compile error nor an exception - the widget just stays empty. A common practical illness is the **"fat ViewModel"**: business logic that belongs in the Model gets piled into it, and it grows the same way the Controller does in bad MVC.',
      },
      {
        ru: 'Итог для всего семейства: **MVC**, **MVP** и **MVVM** отвечают на один вопрос - кто доставляет изменения на экран. В MVC это делает сам View, читая Model; в MVP - Presenter явными вызовами через интерфейс; в MVVM - инфраструктура привязки, а ViewModel об экране вообще не знает. Чем дальше по этому ряду, тем меньше ручного кода и тем больше работы перекладывается на платформу.',
        en: 'The takeaway for the whole family: **MVC**, **MVP**, and **MVVM** answer one question - who delivers changes to the screen. In MVC the View does it by reading the Model; in MVP the Presenter does it with explicit calls through an interface; in MVVM the binding infrastructure does it, and the ViewModel does not know about the screen at all. The further along this line, the less hand-written code and the more work is handed to the platform.',
      },
    ],
    whenToUse: [
      {
        ru: '**Платформа с готовой привязкой** - WPF, .NET MAUI, Android с Jetpack, SwiftUI, Vue, Angular. Здесь MVVM - путь наименьшего сопротивления: инфраструктура уже написана, и паттерн просто объясняет, как ей пользоваться.',
        en: '**A platform with ready-made binding** - WPF, .NET MAUI, Android with Jetpack, SwiftUI, Vue, Angular. Here MVVM is the path of least resistance: the infrastructure already exists, and the pattern just explains how to use it.',
      },
      {
        ru: '**Вместо MVP** - когда интерфейс View разросся до десятков методов `showX`, а Presenter в основном переносит значения туда и обратно. Если биндер доступен, этот код можно удалить, а логика останется в ViewModel и под тестами.',
        en: '**Against MVP** - when the View interface has grown to dozens of `showX` methods and the Presenter mostly copies values back and forth. If a binder is available, that code can be deleted while the logic stays in the ViewModel and under test.',
      },
      {
        ru: '**Против MVVM** - если биндера нет, а писать свой нет причины. Самодельная привязка быстро обрастает краевыми случаями (циклы обновлений, списки, фокус), и явные вызовы MVP в такой ситуации честнее и проще в отладке.',
        en: '**Against MVVM** - if there is no binder and no reason to write one. Homemade binding quickly sprouts edge cases (update loops, lists, focus), and MVP\'s explicit calls are more honest and easier to debug in that situation.',
      },
      {
        ru: '**Несколько видов одних данных** - когда одно и то же состояние показывается таблицей и графиком, в компактном и полном режиме. Одну ViewModel привязывают к нескольким View, и правило «один Presenter на один View» из MVP не мешает.',
        en: '**Several views of the same data** - when the same state is shown as a table and a chart, or in compact and full modes. One ViewModel is bound to several Views, and MVP\'s one-Presenter-per-View rule does not get in the way.',
      },
      {
        ru: '**Не для экрана из двух полей** - если на форме нечего тестировать и нечего синхронизировать, наблюдаемые свойства и команды добавят больше церемоний, чем пользы. Хватит простого компонента.',
        en: '**Not for a two-field screen** - if a form has nothing to test and nothing to sync, observable properties and commands add more ceremony than value. A plain component is enough.',
      },
    ],
    realWorld: [
      {
        ru: '**John Gossman, «Introduction to Model/View/ViewModel pattern for building WPF apps» (блог, 2005)** - первая публичная запись о паттерне от одного из архитекторов WPF.',
        en: '**John Gossman, "Introduction to Model/View/ViewModel pattern for building WPF apps" (blog, 2005)** - the first public write-up of the pattern, by one of WPF\'s architects.',
      },
      {
        ru: '**Martin Fowler, «Presentation Model» (martinfowler.com, 2004)** - описание паттерна, из которого вырос MVVM: состояние и поведение экрана в отдельном объекте, независимом от виджетов.',
        en: '**Martin Fowler, "Presentation Model" (martinfowler.com, 2004)** - the pattern MVVM grew out of: a screen\'s state and behaviour in a separate object independent of the widgets.',
      },
      {
        ru: '**Josh Smith, «WPF Apps With The Model-View-ViewModel Design Pattern» (MSDN Magazine, 2009)** - статья, после которой MVVM стал стандартом в .NET-сообществе; в ней разобран `RelayCommand` - простая реализация `ICommand`.',
        en: '**Josh Smith, "WPF Apps With The Model-View-ViewModel Design Pattern" (MSDN Magazine, 2009)** - the article that made MVVM the .NET community standard; it walks through `RelayCommand`, a simple `ICommand` implementation.',
      },
      {
        ru: '**Knockout.js (Steve Sanderson, 2010)** - первая популярная MVVM-библиотека для браузера с `ko.observable` и атрибутами `data-bind`; на её модель похож пример на вкладке «Реализация».',
        en: '**Knockout.js (Steve Sanderson, 2010)** - the first popular browser MVVM library, with `ko.observable` and `data-bind` attributes; the example on the "Implementation" tab resembles its model.',
      },
      {
        ru: '**Android Architecture Components (Google I/O 2017)** - `ViewModel` и `LiveData`, с которыми Google сделал MVVM рекомендуемой архитектурой Android-приложений вместо MVP.',
        en: '**Android Architecture Components (Google I/O 2017)** - `ViewModel` and `LiveData`, with which Google made MVVM the recommended Android app architecture in place of MVP.',
      },
    ],
  },

  relatedPatterns: ['mvc', 'mvp'],

  quiz: [
    {
      question: {
        ru: 'Что знает ViewModel о View в MVVM?',
        en: 'What does the ViewModel know about the View in MVVM?',
      },
      options: [
        { ru: 'Ничего - ссылки на View у неё нет, а с экраном её связывают привязки', en: 'Nothing - it holds no View reference, bindings connect it to the screen' },
        { ru: 'Знает интерфейс View и вызывает его методы вроде showItems после каждого изменения данных', en: 'It knows the View interface and calls methods like showItems after every data change' },
        { ru: 'Держит ссылки на все конкретные виджеты экрана и сама записывает в них новые значения', en: 'It holds references to every concrete widget and writes new values into them itself' },
        { ru: 'Сама создаёт View при открытии экрана и удаляет его при уходе', en: 'It creates the View when the screen opens and destroys it on exit' },
      ],
      correct: 0,
      explanation: {
        ru: 'ViewModel только выставляет свойства и команды. Зависимость направлена в другую сторону: это View через привязки знает о ViewModel.',
        en: 'The ViewModel only exposes properties and commands. The dependency points the other way: it is the View, through bindings, that knows about the ViewModel.',
      },
      hint: {
        ru: 'Смотрите роль ViewModel на вкладке «Схема» и раздел «Решение» на вкладке «Суть».',
        en: 'See the ViewModel\'s role on the "Diagram" tab and the "Solution" section on the "Intent" tab.',
      },
    },
    {
      question: {
        ru: 'Кто в MVVM переносит новое значение свойства на экран?',
        en: 'Who carries a new property value onto the screen in MVVM?',
      },
      options: [
        { ru: 'Слой связывания данных - он подписан на свойства и обновляет виджеты', en: 'The data-binding layer - it observes the properties and updates the widgets' },
        { ru: 'ViewModel - после каждого изменения она вызывает метод отрисовки у конкретного View', en: 'The ViewModel - after each change it calls a render method on the concrete View' },
        { ru: 'Model - она подписана прямо на виджеты и сама переписывает их содержимое при изменении', en: 'The Model - it is subscribed straight to the widgets and rewrites their contents itself' },
        { ru: 'Никто - экран обновляется только при перезагрузке страницы', en: 'Nobody - the screen only updates on a page reload' },
      ],
      correct: 0,
      explanation: {
        ru: 'Синхронизацию делает биндер: он подписан на наблюдаемые свойства и перерисовывает привязанные виджеты, а ViewModel только сообщает, что значение изменилось.',
        en: 'The binder does the syncing: it observes the properties and redraws the bound widgets, while the ViewModel only announces that a value changed.',
      },
      hint: {
        ru: 'Смотрите шаг «Привязка обновляет экран» на вкладке «Схема».',
        en: 'See the "Binding updates the screen" step on the "Diagram" tab.',
      },
    },
    {
      question: {
        ru: 'Как в MVVM оформляются действия пользователя вроде нажатия кнопки «Добавить»?',
        en: 'How are user actions such as pressing an "Add" button modelled in MVVM?',
      },
      options: [
        { ru: 'Как команды ViewModel, к которым кнопка подключена привязкой', en: 'As ViewModel commands that the button is wired to by a binding' },
        { ru: 'Как обработчики внутри класса View, которые напрямую меняют поля Model в обход ViewModel', en: 'As handlers inside the View class that change the Model\'s fields directly, bypassing the ViewModel' },
        { ru: 'Как методы Model, которые разметка вызывает прямо из атрибутов, без всякой ViewModel', en: 'As Model methods the markup calls straight from attributes, with no ViewModel at all' },
        { ru: 'Как события Model, которые рассылаются всем экранам', en: 'As Model events broadcast to every screen' },
      ],
      correct: 0,
      explanation: {
        ru: 'Действия - это команды ViewModel (`add`, `save`, в WPF - `ICommand`). Разметка лишь указывает, какая команда висит на кнопке.',
        en: 'Actions are ViewModel commands (`add`, `save`, in WPF `ICommand`). The markup only says which command sits on the button.',
      },
      hint: {
        ru: 'Смотрите разбор команды `add` на вкладке «Реализация».',
        en: 'See the `add` command walkthrough on the "Implementation" tab.',
      },
    },
    {
      question: {
        ru: 'Почему ViewModel можно тестировать даже без заглушки View, которая нужна в MVP?',
        en: 'Why can a ViewModel be tested without even the stub View that MVP needs?',
      },
      options: [
        { ru: 'Она не вызывает View, поэтому тест просто меняет свойства, вызывает команды и проверяет значения', en: 'It never calls the View, so a test just sets properties, calls commands, and checks values' },
        { ru: 'Потому что биндер в тестах отключается и сам подменяет все виджеты заглушками без участия разработчика', en: 'Because the binder switches off in tests and replaces every widget with a stub without the developer\'s help' },
        { ru: 'Потому что ViewModel хранит готовый снимок экрана и сравнивает его с эталоном попиксельно', en: 'Because the ViewModel stores a ready screenshot and compares it with a reference pixel by pixel' },
        { ru: 'Потому что вся логика в MVVM живёт в разметке View, а в ViewModel проверять просто нечего', en: 'Because all the logic in MVVM lives in the View markup, so there is nothing in the ViewModel to test' },
      ],
      correct: 0,
      explanation: {
        ru: 'В MVP тест проверяет, какие методы View вызвал Presenter, поэтому нужна заглушка. ViewModel никого не вызывает - результат её работы виден прямо в значениях свойств.',
        en: 'In MVP a test checks which View methods the Presenter called, so a stub is needed. A ViewModel calls nobody - its output is visible directly in its property values.',
      },
      hint: {
        ru: 'Смотрите второй пункт плюсов на вкладке «Плюсы и минусы».',
        en: 'See the second "Pros" item on the "Pros & Cons" tab.',
      },
    },
    {
      question: {
        ru: 'В примере реализации - зачем `canAdd` сделан отдельным свойством, а не проверкой внутри команды `add`?',
        en: 'In the implementation example, why is `canAdd` a separate property rather than a check inside the `add` command?',
      },
      options: [
        { ru: 'Чтобы доступность кнопки была состоянием экрана, которое биндер показывает, а тест проверяет', en: 'So the button\'s enabled state is screen state the binder displays and a test can check' },
        { ru: 'Потому что команды в MVVM не имеют права читать свойства ViewModel и должны получать всё через аргументы', en: 'Because commands in MVVM may not read ViewModel properties and must receive everything as arguments' },
        { ru: 'Чтобы Model могла подписаться на `canAdd` и сама решать, принимать ли новый пункт в список', en: 'So the Model can subscribe to `canAdd` and decide on its own whether to accept a new item' },
        { ru: 'Потому что без отдельного свойства браузер не даёт отключить кнопку через атрибут disabled', en: 'Because without a separate property the browser refuses to disable a button via the disabled attribute' },
      ],
      correct: 0,
      explanation: {
        ru: '«Можно ли сейчас добавить» - часть состояния экрана. Выраженное свойством, оно автоматически блокирует кнопку через привязку и проверяется тестом без UI - как `CanExecute` у `ICommand` в WPF.',
        en: '"Can we add right now" is part of the screen state. As a property it disables the button automatically through the binding and can be tested without a UI - like `CanExecute` on WPF\'s `ICommand`.',
      },
      hint: {
        ru: 'Смотрите разбор конструктора ViewModel на вкладке «Реализация» и абзац про команды в разделе «Как это работает».',
        en: 'See the ViewModel constructor walkthrough on the "Implementation" tab and the paragraph about commands in the "How it works" section.',
      },
    },
    {
      question: {
        ru: 'Что произойдёт в примере, если в разметке опечататься и написать `data-text="cuont"`?',
        en: 'What happens in the example if the markup has a typo, `data-text="cuont"`?',
      },
      options: [
        { ru: 'Привязка сломается, и проблема видна только при запуске - типичная трудность отладки MVVM', en: 'The binding breaks, and the problem shows only at runtime - a typical MVVM debugging pain' },
        { ru: 'ViewModel заметит неизвестное имя и автоматически создаст новое пустое свойство с этим названием', en: 'The ViewModel notices the unknown name and automatically creates a new empty property with that name' },
        { ru: 'Сборка проекта остановится с ошибкой компиляции, указывающей точную строку разметки с опечаткой', en: 'The build stops with a compile error pointing to the exact markup line with the typo' },
        { ru: 'Model перехватит обращение к несуществующему свойству и вернёт значение по умолчанию', en: 'The Model intercepts the access to the missing property and returns a default value' },
      ],
      correct: 0,
      explanation: {
        ru: 'Имена в привязках - это строки, которые никто не проверяет при сборке. В примере `bind` упадёт при запуске, а настоящие биндеры часто вообще молча оставляют виджет пустым.',
        en: 'Binding names are strings nobody checks at build time. In the example `bind` throws at startup, and real binders often just leave the widget silently empty.',
      },
      hint: {
        ru: 'Смотрите второй пункт минусов на вкладке «Плюсы и минусы».',
        en: 'See the second "Cons" item on the "Pros & Cons" tab.',
      },
    },
    {
      question: {
        ru: 'Чем MVVM отличается от Presentation Model Мартина Фаулера?',
        en: 'How does MVVM differ from Martin Fowler\'s Presentation Model?',
      },
      options: [
        { ru: 'Идея та же, но синхронизацию с View в MVVM делает биндер, а не ручной код', en: 'The idea is the same, but in MVVM a binder syncs the View instead of hand-written code' },
        { ru: 'Presentation Model хранит состояние экрана прямо в виджетах, а MVVM впервые выносит его в отдельный объект', en: 'Presentation Model keeps screen state in the widgets, while MVVM is the first to move it into a separate object' },
        { ru: 'Presentation Model - серверный паттерн для HTTP-запросов, а MVVM - его клиентская версия для десктопа', en: 'Presentation Model is a server-side pattern for HTTP requests, and MVVM is its client version for desktop' },
        { ru: 'Это два независимых паттерна без общих идей', en: 'They are two unrelated patterns with no shared ideas' },
      ],
      correct: 0,
      explanation: {
        ru: 'Presentation Model уже держала состояние и поведение экрана в отдельном объекте. MVVM - её вариант для платформы с привязкой данных, где синхронизацию с View берёт на себя инфраструктура.',
        en: 'Presentation Model already kept screen state and behaviour in a separate object. MVVM is its variant for a platform with data binding, where the infrastructure takes over syncing with the View.',
      },
      hint: {
        ru: 'Смотрите второй абзац раздела «Как это работает».',
        en: 'See the second paragraph of the "How it works" section.',
      },
    },
    {
      question: {
        ru: 'Команда пишет на чистом JavaScript без фреймворка, и на экране три поля. Почему MVVM здесь может быть хуже MVP?',
        en: 'A team writes plain JavaScript with no framework, and the screen has three fields. Why might MVVM be worse than MVP here?',
      },
      options: [
        { ru: 'Биндер придётся писать самим, а явные вызовы MVP на таком экране проще и в коде, и в отладке', en: 'They would write the binder themselves, and MVP\'s explicit calls are simpler to write and debug here' },
        { ru: 'Потому что MVVM требует отдельной ViewModel на каждое поле, и трёх полей уже слишком много для паттерна', en: 'Because MVVM requires a separate ViewModel per field, and three fields are already too many for the pattern' },
        { ru: 'Потому что без фреймворка ViewModel не может обращаться к Model и вынуждена хранить данные сама', en: 'Because without a framework the ViewModel cannot call the Model and has to store the data itself' },
        { ru: 'Не может - MVVM всегда лучше MVP, потому что ViewModel тестировать проще, чем Presenter', en: 'It cannot - MVVM is always better than MVP, because a ViewModel is easier to test than a Presenter' },
      ],
      correct: 0,
      explanation: {
        ru: 'Главная выгода MVVM - готовая привязка. Без неё её надо писать и поддерживать, и на маленьком экране эти затраты больше, чем несколько явных вызовов `showX`.',
        en: 'MVVM\'s main payoff is ready-made binding. Without it you must write and maintain one, and on a small screen that costs more than a few explicit `showX` calls.',
      },
      hint: {
        ru: 'Смотрите пункт «Против MVVM» в разделе «Нюансы выбора» и первый пункт минусов.',
        en: 'See the "Against MVVM" point in the "Choice nuances" section and the first "Cons" item.',
      },
    },
    {
      question: {
        ru: 'Чем принципиально отличается доставка изменений на экран в MVC, MVP и MVVM?',
        en: 'What fundamentally differs in how changes reach the screen in MVC, MVP, and MVVM?',
      },
      options: [
        { ru: 'В MVC View читает Model сам, в MVP Presenter вызывает View явно, в MVVM это делает биндер', en: 'In MVC the View reads the Model, in MVP the Presenter calls the View, in MVVM a binder does it' },
        { ru: 'Ничем - во всех трёх паттернах экран обновляет Controller, просто под разными названиями и в разных фреймворках', en: 'Nothing - in all three patterns the Controller updates the screen, just under different names and frameworks' },
        { ru: 'В MVC экран обновляет Model, в MVP - сам View по таймеру, а в MVVM - только перезагрузка страницы', en: 'In MVC the Model updates the screen, in MVP the View does it on a timer, and in MVVM only a page reload' },
        { ru: 'В MVC и MVVM изменения на экран вообще не попадают без участия пользователя, а в MVP попадают', en: 'In MVC and MVVM changes never reach the screen without the user\'s help, while in MVP they do' },
      ],
      correct: 0,
      explanation: {
        ru: 'Это главная ось всего семейства: от View, который сам читает Model, через явные вызовы Presenter к автоматической привязке, где ViewModel об экране не знает.',
        en: 'This is the main axis of the whole family: from a View that reads the Model itself, through the Presenter\'s explicit calls, to automatic binding where the ViewModel does not know about the screen.',
      },
      hint: {
        ru: 'Смотрите последний абзац раздела «Как это работает».',
        en: 'See the last paragraph of the "How it works" section.',
      },
    },
    {
      question: {
        ru: 'В ViewModel экрана заказа оказались расчёт скидки, проверка остатков на складе и формирование счёта. Что пошло не так?',
        en: 'An order screen\'s ViewModel now contains discount calculation, stock checks, and invoice generation. What went wrong?',
      },
      options: [
        { ru: 'Это «толстая ViewModel»: бизнес-правила должны жить в Model, а ViewModel - только готовить данные для экрана', en: 'It is a "fat ViewModel": business rules belong in the Model, the ViewModel only prepares data for the screen' },
        { ru: 'Ничего - в MVVM вся бизнес-логика по определению живёт в ViewModel, а Model хранит только сырые поля из базы', en: 'Nothing - in MVVM all business logic lives in the ViewModel by definition, and the Model holds only raw database fields' },
        { ru: 'Ошибка только в том, что эта логика не вынесена в разметку View, где ей и положено быть по паттерну', en: 'The only mistake is that this logic was not moved into the View markup, where the pattern says it belongs' },
        { ru: 'Ошибка в том, что ViewModel не держит ссылку на View, - с ней эту логику можно было бы разнести по виджетам', en: 'The mistake is that the ViewModel holds no View reference - with one this logic could be spread across widgets' },
      ],
      correct: 0,
      explanation: {
        ru: 'ViewModel - модель экрана, а не модель предметной области. Когда в неё уходят бизнес-правила, она разрастается так же, как Controller в плохом MVC, и правила уже не переиспользовать на другом экране.',
        en: 'A ViewModel is a model of the screen, not of the domain. When business rules move into it, it grows the same way a Controller does in bad MVC, and the rules can no longer be reused on another screen.',
      },
      hint: {
        ru: 'Смотрите абзац про слабые места MVVM в разделе «Как это работает».',
        en: 'See the paragraph about MVVM\'s weak spots in the "How it works" section.',
      },
    },
  ],
};

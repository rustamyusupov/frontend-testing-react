# Домашние задания по тестированию фронтенда

* [Введение](#введение)
* [Структура домашних заданий](#структура-домашних-заданий)
* [Решаем "Hello, Hexlet!"](#решаем-hello-hexlet)
* [Проверка линтером](#проверка-линтером)
* [Отправляем на проверку](#отправляем-на-проверку)

## Введение

Откройте для себя первое домашнее задание в программе тестирования фронтенда.

В этом документе мы разберёмся:
* какие инструменты используются;
* как выполнять домашние задания;
* как запускать тесты и читать их вывод.

Для решения домашних заданий на компьютере должно быть подготовлено рабочее окружения — [установлен](https://github.com/Hexlet/instructions) Node.js, npm и редактор для кода.
Для скачивания и отправки домашних заданий используется утилита [hexlet/cli](https://github.com/Hexlet/cli/blob/main/src/templates/program/README.md).

## Структура домашних заданий

Изучим структуру каталога *exercises* с домашним заданием *Hello, World!*:

```text
hello-world
├── Makefile
├── package.json
├── README.md
├── __tests__
│ └── index.test.js
└── TUTORIAL.md <-- мы здесь
```

* на верхнем уровне *README* содержит текст задачи. Здесь описывается что нужно сделать;
* *package.json* описывает зависимости, которые понадобятся для решения проекта;
* *\_\_tests\_\_/index.test.js* содержит один или несколько файлов для решения студента.


## Решаем "Hello, Hexlet!"

Ниже показан пример тестирования функции, которая только возвращает строку:

```javascript
const helloHexlet = () => 'This is Hexlet!';
```

Поскольку сама реализация в ходе написания тестов не меняется, мы просто тестируем "чёрный ящик".

### Шаг 1: Подготавливаемся к работе

Установим зависимости и попробуем запустить тесты:

```sh
npm install
# вывод об установке зависимостей

npm test
```

Если окружение было корректно настроено и зависимости установлены, вывод ошибки будет подобный такому:

```sh
 FAIL  __tests__/index.test.js
  ● Test suite failed to run

    Your test suite must contain at least one test.

      # прочий вывод

Test Suites: 1 failed, 1 total
Tests:       0 total
Snapshots:   0 total
Time:        0.838 s
Ran all test suites.
```

### Шаг 2: Пишем решение

Откроем в редакторе кода файл для решения по пути *\_\_tests\_\_/index.test.js*:

```javascript
// BEGIN

// END
```

Своё решение нужно размещать между маркерами *BEGIN* и *END*. Разместим там код решения:

```javajavascript
// BEGIN
test('Positive case', () => {
  expect(helloHexlet()).toEqual(''); // проверим, что из функции возвращается пустая строка
});
// END
```

Запустим тесты ещё раз:

```sh
npm test
```

Теперь тесты сообщают, что ожидалась (Expected) пуста строка "", а был получена (Received) строка "This is Hexlet!".

```sh
 FAIL  __tests__/index.test.js
  ✕ Positive case (9 ms)

  ● Positive case

    expect(received).toBe(expected) // Object.is equality

    Expected: ""
    Received: "This is Hexlet!"

      1 | test('Positive case', () => {
    > 2 |   expect(helloHexlet()).toEqual('Hello, Hexlet!');
        |                            ^
      3 | });
      4 |

      at Object.<anonymous> (__tests__/index.test.js:2:28)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        0.843 s
Ran all test suites.
```

### Шаг 3: Добавим негативные кейсы

Тесты выступают основной спецификацией к коду и раскрывают те детали требований, которые в README могли быть отражены в общих чертах. Теперь мы знаем, как приложение должно себя вести и как не должно. Поэтому исправим положительный кейс, а ниже добавим негативный кейс на пустую строку:

```javascript
// BEGIN
test('Positive case', () => {
  expect(helloHexlet()).toEqual('This is Hexlet!');
});

test('Negative case', () => {
  expect(helloHexlet()).not.toHaveLength(0); // проверяем, что строка не пустая
});
// END
```

Запустим тесты повторно на проверку.

```sh
npm test

 PASS  __tests__/index.test.js
  ✓ Positive case
  ✓ Negative case

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        0.843 s, estimated 1 s
Ran all test suites.
```

Готово, тесты пройдены! Теперь можно сдавать домашнюю работу.

### Проверка линтером

Сейчас домашние задания скачиваются без линтера, чтобы студентам не приходилось загружать много зависимостей в каждом упражнении. Но проверка линтером происходит в CI/CD.

Чтобы сделать локально проверку линтером, необходимо на уровне своего каталога с домашними заданиями создать файлы *package.json* с зависимостями линтера и *.eslintrc.yml* с правилами линтера. Вот их содержимое:

package.json:

```json
  "devDependencies": {
    "eslint": "^7.23.0",
    "eslint-config-airbnb": "^18.2.1",
    "eslint-plugin-import": "^2.22.1",
    "eslint-plugin-jest": "^24.3.2",
    "eslint-plugin-jsx-a11y": "^6.4.1",
    "eslint-plugin-react": "^7.23.1"
  }
```

.eslintrc.yml

```yaml
env:
  browser: true
  es2021: true
  jest/globals: true

extends:
  - 'airbnb'
  - 'plugin:jest/recommended'

settings:
  react:
    version: latest

parserOptions:
  ecmaVersion: 12
  sourceType: module

rules: {}
```

Запуск линтера нужно выполнять в корневой директории программы:

```sh
npx eslint .
```

Пример ошибки линтера:

```sh
~/Hexlet/react-testing/exercises/unit-testing/__tests__/index.test.js
  10:1  error  Too many blank lines at the end of file. Max of 0 allowed  no-multiple-empty-lines
  # ошибка "no-multiple-empty-lines"

✖ 1 problem (1 error, 0 warnings)
  1 error and 0 warnings potentially fixable with the `--fix` option.
```

Описание ошибок дано на сайте [eslint](https://eslint.org/).

## Отправляем на проверку

Используя команду *submit* из [hexlet/cli](https://github.com/Hexlet/cli/blob/main/src/templates/program/README.md), отправляем своё решение в Gitlab. Там оно пройдёт проверку автоматической системой. При её успешно завершении можно запрашивать проверку у своего наставника.

Подробнее этот процесс описан в [статье в Notion](https://www.notion.so/hexlet/780f724542b14ecb883a6ebf8ea6e54e#041a70d9e70243d3b4773fa751c3c0fa).

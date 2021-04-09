# Домашние задания

Работа над [домашними заданиями](https://www.notion.so/hexlet/780f724542b14ecb883a6ebf8ea6e54e) выполняется на компьютере студента. Мы подготовили для каждого задания наборы файлов, таких как README (текст задачи), тесты, линтер, файл зависимостей и файл для решения студента. Все эти файлы хранятся на нашем Gitlab, а утилита *Hexlet CLI* выступает интерфейсом для работы с этой системой.

*Некоторые процессы требуют выполнения определённых действий вручную. Но позже они будут автоматизироваться, упрощаться и получать интерфейсы с кнопками. Регулярно заглядывайте в этот документ, чтобы получать актуальную информацию о работе с утилитой.*

## Hexlet CLI

Утилита вызывается по имени *hexlet*, и содержит одну главную главную команду *program*, за которой идёт одна из команд ниже.

### Команды

* *init* — создаёт репозиторий в Gitlab и конфигурационный файл на компьютере студента.

    Этот репозиторий будет связан с конкретной учебной программой и содержать несколько файлов, включая данное README. Для каждой учебной программы репозиторий будет свой. 

* *download* — скачивает домашнее задание.

    В процессе обучения преподаватель будет сообщать студентам какое домашнее задание нужно скачать. Команда 
  *download* создаёт в домашнем каталоге */home/&lt;username&gt;* подкаталог с домашним заданием. Там будут содержаться файлы 
  для решения, текст задачи, тесты, линтер и другие необходимые для локальной разработки файлы.

* *submit* — отправляет все домашние задания в Gitlab.

    Всё, что будет скачано на локальный компьютер, необходимо запушить в свой удалённый репозиторий, это делает 
  *submit*. В Gitlab также подключены тесты и линтер. Когда решение студента готово, тесты и линтер пройдены, то 
  можно перейти к сдаче домашнего задания наставнику.

### Аргументы

У каждой команды есть несколько аргументов. Ниже будет показано, как они используются и где взять нужные значения.

* *program* — название учебной программы. Берётся из адресной строки в Gitlab.
* *exercise* — название упражнения для скачивания/отправки.

## Опции

* *gitlab-group-id* — идентификатор группы.
* *hexlet-user-id* — идентификатор студента на Хекслете.
* *gitlab-token* — *Personal access token* из Gitlab. О нём рассказывается в [статье в Notion](https://www.notion.so/hexlet/780f724542b14ecb883a6ebf8ea6e54e).

### Использование

Представим себе, что мы состоим в группе **Student Group**, в программе **Java-программист**.

На вкладке [Обучение](https://ru.hexlet.io/my/learning) личного кабинета студента идентификаторы *groupId* и *userId* уже подставлены в команду для утилиты, а снизу в `program` указано название программы:

```sh
hexlet program init --gitlab-group-id=12345 --hexlet-user-id=1 --gitlab-token=<ваш токен GitLab>

# program: java-programmer
```

Для инициализации проекта остаётся скопировать команду, указать свой токен и выполнить её:

```sh
# Можно вызывать из любого каталога
hexlet program init --gitlab-group-id=12345 --hexlet-user-id=1 --gitlab-token=<ваш токен>

# Gitlab repository: https://gitlab.com/hexlethq/programs/java-programmer/hexlet-groups/student-group/1
# Config: /home/<username>/Hexlet/.config.json
# Program name: java-programmer
# Program path: /home/<username>/Hexlet/java-programmer
```

Для команд *download* и *submit* аргументами нужно указывать название учебной программы (*program*) и урок (*exercise*), с которым ведётся работа:

```sh
# скачать на компьютер упражнение Массивы из программы Java-программист
hexlet program download java-programmer arrays

# отправить упражнение в Gitlab (git add, commit, push)
hexlet program submit java-programmer arrays

# program: java-programmer
# exercise: arrays
```

Не забывайте выводить справочную информацию. чтобы получить список актуальных команд. Например
```shell
hexlet program --help
```

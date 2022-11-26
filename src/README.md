# Учебный проект - "Mesto". Яндекс Практикум. Спринты 5 - 7.
# Автор - Константин Узких

Проект размещен по адресу: https://konstantinuzkikh.github.io/mesto-project-bootcamp/

# Обзор
Проектная работа предусматривает разработку интерактивного сервиса Mesto - web-страницы, куда можно добавлять подписанные фотографии (карточки), удалять их и ставить лайки. Предусмотрена возможность просмотра фотографий в крупном размере при нажатии на карточку. Сайт также отражает профиль его владельца (аватар, имя и вид деятельности) с возможностью его редактирования в интерактивном режиме.
Страница состоит из трех частей: "ОСНОВНАЯ СТРАНИЦА", "МОДАЛЬНЫЕ ОКНА", "ШАБЛОНЫ".
  *ОСНОВНАЯ СТРАНИЦА*
Реализована "пассивная" часть сайта: шапка, отображение профиля, картотека и подвал.
Первоначальный набор карточек загружается с использованием JS.
  *МОДАЛЬНЫЕ ОКНА*
Реализованы для отображения в режиме модальных окон:
- форма редактирования профиля,
- форма ввода новых карточек,
- окно просмотра фотографии в крупном размере.
  *ШАБЛОНЫ*
Реализован html-шаблон для загрузки карточек.

Интерактивность сайта реализована с использованием JS.
На данном этапе разработки сайта не реализовано его взаимодействие с сервером для загрузки и выгрузки данных.

**Основные техники, использованные при разработке web-сайта**
- разработка сайта на основе заданного макета в Figma;
- методология БЭМ для структурирования именования классов html-кода и файлов стилей;
  *** HTML и CSS ***
- строчные и блоковые элементы, немаркированные списки, встроенные и фоновые рисунки, логотипы и иконки;
- изменение прозрачности активных элементов при наведении мышки;
- использование вендорных картинок и оптимизация их размеров;
- использование вендорноых шрифтов;
- технологии flex и grid для построения сетки;
- использование медиазапросов для задания стилей, адаптивных к различной ширине экрана;
- адаптивное перестроение сетки в зависимости от ширины экрана (использование auto-fit и minmax);
- модальные диалоговые окна, затемненный полупрозрачный фон, проявление (открытие) и растворение (закрытие) окон;
  *** JS ***
- модульная структура скриптов;
- загрузка контента на сайт из заданного массива и картинок из внешних источников;
- редактирование профиля владельца сайта;
- добавление на сайт карточек с названием места и url-адресом фотографии;
- валидация полей ввода форм;
- адаптивное оформление полей ввода в зависимости от наличия или отсутствия ошибки;
- контекстные сообщения об ошибках валидации в зависимости от активного поля ввода;
- управление оформлением и доступностью кнопки сохранения формы (активна \ деактивирована) в зависимости от результатов валидации.
- удаление карточек;
- проставление карточкам лайков;
- появление и исчезание модальных окон путем изменения их прозрачности;
- закрытие модальных окон нажатием на клавишу 'Escape' или кликом мышки за пределами формы.

**Figma**
[Ссылка на макет в Figma](https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?node-id=0%3A1)
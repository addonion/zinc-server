# Карта проекта

Документ описывает исходники репозитория. Настройки живого сервера, данные, роли и потребители API здесь не подтверждены; перед изменением сверяй карту с текущим кодом.

## Назначение и точки входа

`zinc-server` — CMS/API на Strapi для контента сайта: главной страницы, дизайн-проекта, проектов, партнёров, команды, контактов и цен. Отдельного клиентского сайта в репозитории нет; зависимости React используются для админки Strapi.

| Область | Где читать | Текущее состояние |
| --- | --- | --- |
| Зависимости и команды | [package.json](../../package.json), [package-lock.json](../../package-lock.json) | Strapi и Users & Permissions 5.56.0; Jodit Editor 1.1.5, PostgreSQL-драйвер `pg`; npm lockfile |
| Инициализация | [src/index.js](../../src/index.js) | `register` и `bootstrap` без пользовательской логики |
| Контентный API | `src/api/<name>/` | Все семь наборов controllers/routes/services используют `createCoreController`, `createCoreRouter`, `createCoreService` без переопределений |
| Повторно используемые компоненты | `src/components/` | Два media-компонента и два SEO-компонента |
| Админка | [app.example.js](../../src/admin/app.example.js), [webpack.config.example.js](../../src/admin/webpack.config.example.js) | Только примеры настройки; активного пользовательского entrypoint в `src/admin/` нет |
| Расширения плагинов и миграции | `src/extensions/`, `database/migrations/` | Только `.gitkeep`; пользовательских реализаций нет |
| Генерация | `types/generated/`, `.strapi/client/` | TypeScript-декларации схем и сгенерированный клиент админки; файлы отслеживаются Git |

## Типы контента

Полный UID имеет вид `api::<name>.<name>`. Имена полей ниже приведены с исходным регистром. Настройки локализации описаны по схемам, а не по состоянию сервера.

| Модель и схема | Тип | Draft & Publish | Локализация | Основные поля |
| --- | --- | --- | --- | --- |
| [contact](../../src/api/contact/content-types/contact/schema.json) | singleType | нет | да | `Map`, `member` |
| [dizajn-proekt](../../src/api/dizajn-proekt/content-types/dizajn-proekt/schema.json) | singleType | да | да | `seo`, `content` |
| [main-page](../../src/api/main-page/content-types/main-page/schema.json) | singleType | нет | да | `seo`, `content`, `steps` |
| [partner](../../src/api/partner/content-types/partner/schema.json) | collectionType | да | не задана | `Name`, `Site`, `Logo`, `projects`, `Slug` |
| [plan](../../src/api/plan/content-types/plan/schema.json) | collectionType | нет | не задана | `Name`, `Price` |
| [project](../../src/api/project/content-types/project/schema.json) | collectionType | да | не задана | `title`, `slug`, `content`, `partners` |
| [team](../../src/api/team/content-types/team/schema.json) | collectionType | да | не задана | `Name`, `Role`, `Phone`, `Email`, `Photo` |

Связи и форматы, которые нужно учитывать при изменениях:

- `contact.member` — `oneToOne` на `api::team.team`; обратное поле в схеме команды не задано.
- `partner.projects` и `project.partners` образуют `manyToMany`: у партнёра `inversedBy: "partners"`, у проекта `mappedBy: "projects"`. Проверяй обе стороны.
- `partner.Slug` — UID с `targetField: "Name"`; у `project.slug` источник автозаполнения не задан.
- `main-page.content`, `main-page.steps` и `dizajn-proekt.content` — custom field `plugin::jodit-editor.jodit`; содержимое хранится как HTML в текстовом поле. Учитывай формат HTML при изменении выдачи и потребителей.
- `project.content` — dynamic zone из `media.3-d-tour` и `media.gallery`.
- В схемах присутствуют `pluginOptions.i18n`; в `package.json` отдельная зависимость i18n не объявлена. Список локалей и работу локализации проверяй на запущенном приложении.

## Компоненты

| UID и схема | Использование и особенности |
| --- | --- |
| [media.3-d-tour](../../src/components/media/3-d-tour.json) | Dynamic zone проекта; поле `ftp` имеет тип string. Способ использования ссылки клиентским сайтом не описан |
| [media.gallery](../../src/components/media/gallery.json) | Dynamic zone проекта; `gallery` — множественное media-поле |
| [shared.seo](../../src/components/shared/seo.json) | `seo` главной страницы и дизайн-проекта; обязательны `metaTitle`, `metaDescription`, `metaImage`; ограничения длины находятся в схеме |
| [shared.meta-social](../../src/components/shared/meta-social.json) | Повторяемый `shared.seo.metaSocial`; enum `socialNetwork` — `Facebook`/`Twitter` |

Некоторые media-поля допускают файлы, видео и аудио наряду с изображениями. Название поля вроде `Photo` или `Logo` не определяет допустимые типы; сверяй `allowedTypes` в схеме.

## Конфигурация

| Файл | Ответственность |
| --- | --- |
| [database.js](../../config/database.js) | Активное подключение PostgreSQL через `DATABASE_*`. SQLite присутствует только в закомментированном примере |
| [server.js](../../config/server.js) | `HOST`, `PORT`, `APP_KEYS` |
| [admin.js](../../config/admin.js) | `ADMIN_JWT_SECRET`, `API_TOKEN_SALT` |
| [api.js](../../config/api.js) | REST: `defaultLimit: 25`, `maxLimit: 100`, `withCount: true` |
| [middlewares.js](../../config/middlewares.js) | Порядок middleware, security/CSP и CORS; CSP разрешает запросы к своему origin через `connect-src: 'self'`; редактор включён в сборку админки |
| [plugins.js](../../config/plugins.js) | Локальный upload provider и breakpoints изображений; Sentry только в закомментированном блоке |

Настройки ролей Users & Permissions, API-токенов и разрешений не представлены отдельным конфигурационным файлом проекта. Не делай выводов о публичном доступе по core router, декларациям `types/generated/` или схеме.

`public/uploads/` предназначен для локальных медиа и исключён из Git, кроме `.gitkeep`. Сохранность файлов при деплое и настройки внешнего хранения репозиторием не подтверждены.

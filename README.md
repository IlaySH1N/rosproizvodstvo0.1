# РосПроизводство - B2B Платформа

> Современная платформа для объединения российских производственных компаний с клиентами

## 🚀 Описание проекта

**РосПроизводство** - это инновационная B2B платформа, созданная для соединения российских производственных компаний с потенциальными клиентами. Платформа обеспечивает эффективное взаимодействие между производителями и заказчиками через удобный веб-интерфейс.

### ✨ Основные возможности

- 🏭 **Бесплатное размещение компаний** - создание карточек производств с подробным описанием
- 📋 **Система заказов** - публикация и поиск заказов с гибкой фильтрацией
- 🎯 **Умный поиск** - фильтрация по категориям, регионам, бюджету и срокам
- 💰 **Тарифные планы** - базовый бесплатный и премиум тарифы для продвижения
- 📊 **Аналитика** - отслеживание откликов и эффективности
- 🔐 **Безопасная авторизация** - интеграция с Replit Auth
- 📱 **Адаптивный дизайн** - корректное отображение на всех устройствах

## 🛠 Технологический стек

### Frontend
- **React 18** - современная библиотека для создания UI
- **TypeScript** - типизированный JavaScript для надежности
- **Tailwind CSS** - utility-first CSS фреймворк
- **Wouter** - легкий роутер для React
- **TanStack Query** - управление состоянием и кэширование
- **shadcn/ui** - современные UI компоненты
- **Lucide React** - иконки

### Backend
- **Node.js** - серверная среда выполнения
- **Express.js** - веб-фреймворк
- **TypeScript** - типизация для backend
- **Drizzle ORM** - современная ORM для работы с БД
- **PostgreSQL** - надежная реляционная БД
- **Replit Auth** - система аутентификации

### DevOps & Tools
- **Vite** - быстрый сборщик проектов
- **ESLint & Prettier** - линтинг и форматирование кода
- **Drizzle Kit** - миграции базы данных

## 📦 Установка и запуск

### Предварительные требования

- Node.js 18+ 
- PostgreSQL 14+
- Git

### 1. Клонирование репозитория

```bash
git clone https://github.com/your-username/rosproizvodstvo.git
cd rosproizvodstvo
```

### 2. Установка зависимостей

```bash
npm install
```

### 3. Настройка базы данных

#### Создание PostgreSQL базы данных

```bash
# Подключитесь к PostgreSQL
psql -U postgres

# Создайте базу данных
CREATE DATABASE rosproizvodstvo;

# Создайте пользователя (опционально)
CREATE USER rosproizvodstvo_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE rosproizvodstvo TO rosproizvodstvo_user;
```

#### Настройка переменных окружения

Создайте файл `.env` в корневой папке:

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/rosproizvodstvo
PGHOST=localhost
PGPORT=5432
PGUSER=your_username
PGPASSWORD=your_password
PGDATABASE=rosproizvodstvo

# Session
SESSION_SECRET=your-super-secret-session-key-here

# Replit Auth (если используете Replit)
REPL_ID=your-repl-id
ISSUER_URL=https://replit.com/oidc
REPLIT_DOMAINS=your-domain.replit.dev
```

### 4. Миграция базы данных

```bash
# Применить схему к базе данных
npm run db:push
```

### 5. Запуск проекта

```bash
# Режим разработки
npm run dev

# Проект будет доступен по адресу: http://localhost:5000
```

## 🗄 Структура проекта

```
rosproizvodstvo/
├── client/                 # Frontend приложение
│   ├── src/
│   │   ├── components/     # Переиспользуемые компоненты
│   │   ├── pages/         # Страницы приложения
│   │   ├── hooks/         # React хуки
│   │   ├── lib/           # Утилиты и конфигурация
│   │   └── App.tsx        # Основной компонент
│   └── index.html         # HTML шаблон
├── server/                # Backend приложение
│   ├── index.ts          # Точка входа сервера
│   ├── routes.ts         # API маршруты
│   ├── storage.ts        # Слой работы с данными
│   ├── db.ts             # Подключение к БД
│   └── replitAuth.ts     # Система аутентификации
├── shared/               # Общие типы и схемы
│   └── schema.ts         # Схема базы данных
├── package.json          # Зависимости проекта
├── drizzle.config.ts     # Конфигурация ORM
└── README.md            # Документация
```

## 🎯 Основные сущности

### Пользователи (Users)
- Аутентификация через Replit Auth
- Роли: клиент, компания, администратор
- Профиль с основной информацией

### Компании (Companies)
- Подробная информация о производстве
- Категории и теги специализации
- Фотографии и контактные данные
- Рейтинг и отзывы
- Привязка к тарифным планам

### Заказы (Orders)
- Техническое задание
- Бюджет и сроки выполнения
- Категория и регион
- Система откликов производств

### Тарифы (Tariffs)
- Базовый (бесплатный)
- Стандарт (2,900 ₽/мес)
- Премиум (4,900 ₽/мес)

## 🔧 API Endpoints

### Аутентификация
- `GET /api/auth/user` - получение текущего пользователя
- `GET /api/login` - вход в систему
- `GET /api/logout` - выход из системы

### Компании
- `GET /api/companies` - список компаний с фильтрацией
- `GET /api/companies/:id` - карточка компании
- `POST /api/companies` - создание компании
- `PUT /api/companies/:id` - обновление компании

### Заказы
- `GET /api/orders` - список заказов с фильтрацией
- `GET /api/orders/:id` - детали заказа
- `POST /api/orders` - создание заказа
- `PUT /api/orders/:id` - обновление заказа

### Отклики
- `GET /api/orders/:id/responses` - отклики на заказ
- `POST /api/orders/:id/responses` - создание отклика

## 🚀 Деплой на Replit

1. Создайте новый Repl на replit.com
2. Импортируйте проект из GitHub
3. Настройте переменные окружения в Secrets
4. Запустите команду `npm run dev`

## 🚀 Деплой на других платформах

### Vercel
```bash
npm install -g vercel
vercel --prod
```

### Heroku
```bash
# Установите Heroku CLI
heroku create your-app-name
heroku addons:create heroku-postgresql:hobby-dev
git push heroku main
```

## 🤝 Участие в разработке

1. Форкните репозиторий
2. Создайте ветку для новой функции: `git checkout -b feature/amazing-feature`
3. Зафиксируйте изменения: `git commit -m 'Add amazing feature'`
4. Запушьте в ветку: `git push origin feature/amazing-feature`
5. Откройте Pull Request

## 📝 Лицензия

Этот проект распространяется под лицензией MIT. См. файл `LICENSE` для подробностей.

## 📞 Контакты

- **Email**: support@rosproizvodstvo.ru
- **Телефон**: +7 (495) 123-45-67
- **Сайт**: https://rosproizvodstvo.ru

## 🙏 Благодарности

- Команде Replit за отличную платформу разработки
- Сообществу React за мощную экосистему
- Всем контрибьюторам проекта

---

**Сделано с ❤️ для российского производства**
# 🚀 Руководство по развертыванию РосПроизводство

## 📋 Быстрый чеклист готовности

### ✅ Перед развертыванием убедитесь:
- [ ] Все файлы проекта сохранены
- [ ] База данных PostgreSQL настроена
- [ ] Переменные окружения заданы
- [ ] Проект запускается локально без ошибок
- [ ] Тестовые данные добавлены в базу

## 🌐 Варианты развертывания

### 1. Replit (Рекомендуется для начала)

**Преимущества**: Бесплатно, быстро, встроенная база данных

```bash
# Уже настроено в вашем проекте!
# Просто нажмите кнопку "Run" в Replit
```

**Настройка переменных:**
- Откройте Secrets в Replit
- Добавьте необходимые переменные окружения

### 2. Vercel (Для продакшена)

**Преимущества**: Быстрый CDN, автоматический деплой из GitHub

```bash
# 1. Установите Vercel CLI
npm install -g vercel

# 2. Войдите в аккаунт
vercel login

# 3. Деплой
vercel --prod
```

**Настройка:**
1. Подключите к внешней PostgreSQL (Neon, Supabase)
2. Настройте переменные окружения в Vercel
3. Настройте домен

### 3. Railway

**Преимущества**: Простая настройка, встроенная PostgreSQL

```bash
# 1. Установите Railway CLI
npm install -g @railway/cli

# 2. Войдите
railway login

# 3. Деплой
railway up
```

### 4. Heroku

**Преимущества**: Классическая платформа, много дополнений

```bash
# 1. Установите Heroku CLI
# 2. Войдите
heroku login

# 3. Создайте приложение
heroku create your-app-name

# 4. Добавьте PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# 5. Деплой
git push heroku main
```

## ⚙️ Настройка переменных окружения

### Обязательные переменные:

```env
# База данных
DATABASE_URL=postgresql://user:password@host:port/database
PGHOST=your-db-host
PGPORT=5432
PGUSER=your-username
PGPASSWORD=your-password
PGDATABASE=your-database

# Сессии
SESSION_SECRET=super-secret-key-change-this

# Replit Auth (если используете)
REPL_ID=your-repl-id
ISSUER_URL=https://replit.com/oidc
REPLIT_DOMAINS=your-domain.replit.dev,your-custom-domain.com
```

## 🗄 Настройка внешней базы данных

### Neon (Рекомендуется)

1. Зарегистрируйтесь на [neon.tech](https://neon.tech)
2. Создайте новый проект
3. Скопируйте строку подключения
4. Добавьте в переменные окружения

### Supabase

1. Зарегистрируйтесь на [supabase.com](https://supabase.com)
2. Создайте новый проект
3. Перейдите в Settings → Database
4. Скопируйте строку подключения

### PlanetScale

1. Зарегистрируйтесь на [planetscale.com](https://planetscale.com)
2. Создайте новую базу данных
3. Получите данные подключения

## 🔧 Настройка домена

### Для Vercel:
1. Domains в панели проекта
2. Add domain
3. Настройте DNS записи

### Для Railway:
1. Settings → Domains
2. Generate domain или Custom domain

### Для Heroku:
```bash
heroku domains:add yourdomain.com
```

## 📊 Мониторинг и логи

### Просмотр логов:

**Vercel:**
```bash
vercel logs
```

**Railway:**
```bash
railway logs
```

**Heroku:**
```bash
heroku logs --tail
```

## 🚨 Решение проблем

### Проблема: База данных не подключается
- Проверьте строку подключения
- Убедитесь, что IP адрес разрешен
- Проверьте правильность логина/пароля

### Проблема: 500 ошибка
- Проверьте логи приложения
- Убедитесь, что все переменные окружения заданы
- Проверьте, что сборка прошла успешно

### Проблема: Статические файлы не загружаются
- Убедитесь, что build папка включена в деплой
- Проверьте настройки сервера для раздачи статики

## 🔐 Безопасность

### Обязательно:
- [ ] Смените SESSION_SECRET на уникальный
- [ ] Используйте HTTPS
- [ ] Настройте CORS правильно
- [ ] Ограничьте доступ к базе данных
- [ ] Настройте файрволл

### Рекомендуется:
- [ ] Настройте мониторинг
- [ ] Добавьте логирование ошибок
- [ ] Настройте бэкапы базы данных
- [ ] Используйте CDN для статики

## 📈 Оптимизация производительности

### Frontend:
- [ ] Минификация и сжатие
- [ ] Оптимизация изображений
- [ ] Ленивая загрузка
- [ ] Кэширование

### Backend:
- [ ] Индексы в базе данных
- [ ] Кэширование запросов
- [ ] Пулы соединений
- [ ] Сжатие ответов

## 📞 Поддержка

При возникновении проблем с развертыванием:
1. Проверьте логи приложения
2. Убедитесь в правильности всех настроек
3. Обратитесь к документации платформы
4. Создайте issue в репозитории проекта

---

**Удачного развертывания! 🚀**
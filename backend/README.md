# Labs Backend - Email API

Backend сервер для отправки email сообщений с формы контактов на сайте Labs.

## 🚀 Быстрый старт

### 1. Установка зависимостей
```bash
npm install
```

### 2. Настройка переменных окружения
Скопируйте файл `env.example` в `.env` и заполните необходимые данные:

```bash
cp env.example .env
```

### 3. Настройка Gmail для отправки email

#### Вариант 1: Использование App Password (Рекомендуется)
1. Включите двухфакторную аутентификацию в Google аккаунте
2. Перейдите в [Google Account Settings](https://myaccount.google.com/apppasswords)
3. Создайте новый App Password для "Mail"
4. Используйте этот пароль в переменной `EMAIL_PASS`

#### Вариант 2: Использование обычного пароля
1. Включите "Less secure app access" в настройках Google аккаунта
2. Используйте обычный пароль от Gmail

### 4. Заполнение .env файла
```env
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
EMAIL_TO=labs@anteyko.com

# Server Configuration
PORT=3001
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

### 5. Запуск сервера
```bash
# Разработка (с автоперезагрузкой)
npm run dev

# Продакшн
npm start
```

## 📧 API Endpoints

### POST /api/contact
Отправляет email с данными формы контактов.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "company": "Example Corp",
  "projectDetails": "Need a web application..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Your message has been sent successfully!",
  "messageId": "message-id-here"
}
```

### GET /api/health
Проверка состояния сервера.

## 🔧 Настройка для других email провайдеров

### Outlook/Hotmail
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-password
```

### Yahoo
```env
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
EMAIL_USER=your-email@yahoo.com
EMAIL_PASS=your-app-password
```

### Custom SMTP Server
```env
EMAIL_HOST=your-smtp-server.com
EMAIL_PORT=587
EMAIL_USER=your-username
EMAIL_PASS=your-password
```

## 🛡️ Безопасность

- Валидация email адресов
- Защита от CORS атак
- Обработка ошибок без утечки информации
- Логирование всех операций

## 📝 Логи

Сервер логирует:
- Успешные отправки email
- Ошибки при отправке
- Запросы к API
- Состояние сервера

## 🚨 Troubleshooting

### Ошибка "Invalid login"
- Проверьте правильность email и пароля
- Убедитесь, что включена двухфакторная аутентификация
- Используйте App Password вместо обычного пароля

### Ошибка "Connection timeout"
- Проверьте настройки файрвола
- Убедитесь, что порт 587 открыт
- Проверьте настройки SMTP сервера

### Email не отправляется
- Проверьте логи сервера
- Убедитесь, что .env файл настроен правильно
- Проверьте настройки CORS

## 🔄 Обновление

Для обновления зависимостей:
```bash
npm update
```

## 📞 Поддержка

При возникновении проблем:
1. Проверьте логи сервера
2. Убедитесь в правильности настроек .env
3. Проверьте документацию nodemailer
4. Создайте issue в репозитории

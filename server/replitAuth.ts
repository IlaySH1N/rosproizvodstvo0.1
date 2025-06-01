// server/replitAuth.ts
// Локальная заглушка для отключения Replit Auth при разработке на Windows

// Заглушка для авторизации (всегда пропускает запросы)
export const isAuthenticated = (_req: any, _res: any, next: any) => {
  // Для локальной разработки пропускаем аутентификацию
  return next();
};

// Пустая функция setupAuth (ничего не делает)
export const setupAuth = async (_app: any) => {
  // Replit Auth отключён для локального запуска
  console.log("⚠️ Replit Auth отключён для локальной разработки");
};
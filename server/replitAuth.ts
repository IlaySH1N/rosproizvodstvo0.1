// server/replitAuth.ts — временная заглушка для отключения Replit Auth

// Локальная аутентификация (пропускает все запросы)
export const isAuthenticated = (_req: any, _res: any, next: any) => {
  return next();
};

// Пустая функция setupAuth — ничего не делает
export const setupAuth = async (_app: any) => {
  console.log("⚠️ Replit Auth отключён для локальной разработки");
};
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { User, LogOut, Building2, BarChart3, Menu, Phone, Mail, MapPin, Star } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const { user, isAuthenticated } = useAuth();
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Главная", href: "/" },
    { name: "Поиск заказов", href: "/orders" },
    { name: "Каталог компаний", href: "/companies" },
    { name: "Тарифы", href: "/#pricing" },
    { name: "Помощь", href: "/#help" },
  ];

  const isActive = (href: string) => {
    if (href.startsWith('/#')) return false; // Hash links on landing page
    return location === href || location.startsWith(href + '/');
  };

  const handleLogout = () => {
    window.location.href = '/api/logout';
  };

  const handleLogin = () => {
    window.location.href = '/api/login';
  };

  return (
    <>
      {/* Top info bar */}
      <div className="bg-primary text-white py-2 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1">
                <Phone className="h-3 w-3" />
                <span>+7 (495) 123-45-67</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="h-3 w-3" />
                <span>support@rosproizvodstvo.ru</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span>Работаем по всей России</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 text-yellow-400" />
                <span>Надежная платформа с 2024 года</span>
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white">
                Бесплатная регистрация
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <nav className="bg-white shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href={isAuthenticated ? "/" : "/"} className="flex-shrink-0">
              <h1 className="text-2xl font-montserrat font-bold text-primary">
                РосПроизводство
              </h1>
            </Link>

            {/* Desktop Navigation */}
            {isAuthenticated && (
              <div className="hidden md:block ml-10">
                <div className="flex items-baseline space-x-8">
                  {navigation.map((item) => (
                    <Link 
                      key={item.name} 
                      href={item.href}
                      className={`px-3 py-2 text-sm font-medium transition-colors ${
                        isActive(item.href)
                          ? 'text-primary border-b-2 border-primary'
                          : 'text-muted-foreground hover:text-primary'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Desktop User Menu */}
                <div className="hidden md:flex items-center space-x-4">
                  <Link href="/dashboard">
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                      <BarChart3 className="h-4 w-4" />
                      <span>Дашборд</span>
                    </Button>
                  </Link>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user?.profileImageUrl} alt={user?.firstName || 'User'} />
                          <AvatarFallback>
                            {user?.firstName?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <div className="flex items-center justify-start gap-2 p-2">
                        <div className="flex flex-col space-y-1 leading-none">
                          <p className="font-medium">
                            {user?.firstName} {user?.lastName}
                          </p>
                          <p className="w-[200px] truncate text-sm text-muted-foreground">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard">
                          <User className="mr-2 h-4 w-4" />
                          <span>Личный кабинет</span>
                        </Link>
                      </DropdownMenuItem>
                      {user?.company && (
                        <DropdownMenuItem asChild>
                          <Link href={`/companies/${user.company.id}`}>
                            <Building2 className="mr-2 h-4 w-4" />
                            <span>Моя компания</span>
                          </Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Выйти</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Mobile Menu Button */}
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="sm" className="md:hidden">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                    <div className="flex flex-col space-y-4 mt-6">
                      {navigation.map((item) => (
                        <Link 
                          key={item.name} 
                          href={item.href}
                          className={`block px-3 py-2 text-base font-medium transition-colors ${
                            isActive(item.href)
                              ? 'text-primary bg-primary/10 rounded-lg'
                              : 'text-muted-foreground hover:text-primary hover:bg-muted rounded-lg'
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                      <hr />
                      <Link 
                        href="/dashboard"
                        className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-lg"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Дашборд
                      </Link>
                      {user?.company && (
                        <Link 
                          href={`/companies/${user.company.id}`}
                          className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-lg"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Моя компания
                        </Link>
                      )}
                      <Button 
                        variant="outline" 
                        onClick={handleLogout}
                        className="justify-start"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Выйти
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={handleLogin}>
                  Войти
                </Button>
                <Button onClick={handleLogin} className="btn-primary">
                  Регистрация
                </Button>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

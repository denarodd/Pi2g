import { Link, useLocation } from 'react-router-dom';
import { Bell, PiggyBank, BookOpen, History, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function Header() {
  const location = useLocation();
  const activeAlerts = 2; // Mock data

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <PiggyBank className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-emerald-900">SuinoParto</h1>
              <p className="text-xs text-slate-500">Monitoramento Inteligente</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link to="/">
              <Button 
                variant={isActive('/') ? 'default' : 'ghost'}
                className={isActive('/') ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
              >
                Início
              </Button>
            </Link>
            <Link to="/educational">
              <Button 
                variant={isActive('/educational') ? 'default' : 'ghost'}
                className={isActive('/educational') ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Educação
              </Button>
            </Link>
            <Link to="/history">
              <Button 
                variant={isActive('/history') ? 'default' : 'ghost'}
                className={isActive('/history') ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
              >
                <History className="w-4 h-4 mr-2" />
                Histórico
              </Button>
            </Link>
            <Link to="/settings">
              <Button 
                variant={isActive('/settings') ? 'default' : 'ghost'}
                className={isActive('/settings') ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
              >
                <Settings className="w-4 h-4 mr-2" />
                Configurações
              </Button>
            </Link>
          </nav>

          {/* Notifications */}
          <Button variant="outline" className="relative">
            <Bell className="w-5 h-5" />
            {activeAlerts > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 min-w-5 h-5 flex items-center justify-center p-0">
                {activeAlerts}
              </Badge>
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex gap-2 pb-3 overflow-x-auto">
          <Link to="/">
            <Button 
              size="sm"
              variant={isActive('/') ? 'default' : 'outline'}
              className={isActive('/') ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
            >
              Início
            </Button>
          </Link>
          <Link to="/educational">
            <Button 
              size="sm"
              variant={isActive('/educational') ? 'default' : 'outline'}
              className={isActive('/educational') ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
            >
              Educação
            </Button>
          </Link>
          <Link to="/history">
            <Button 
              size="sm"
              variant={isActive('/history') ? 'default' : 'outline'}
              className={isActive('/history') ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
            >
              Histórico
            </Button>
          </Link>
          <Link to="/settings">
            <Button 
              size="sm"
              variant={isActive('/settings') ? 'default' : 'outline'}
              className={isActive('/settings') ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
            >
              Configurações
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}

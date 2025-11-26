import { Link } from 'react-router-dom';
import { AlertTriangle, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Progress } from './ui/progress';

// Mock data
const activeParturitions = [
  {
    id: '1',
    sowName: 'Porca #234',
    status: 'Em progresso',
    startTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    pigletsBorn: 8,
    lastPigletTime: 15, // minutes ago
    contractionInterval: 12, // minutes
    isNormal: true,
  },
  {
    id: '2',
    sowName: 'Porca #156',
    status: 'Atenção necessária',
    startTime: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    pigletsBorn: 5,
    lastPigletTime: 45, // minutes ago
    contractionInterval: 25, // minutes
    isNormal: false,
  },
  {
    id: '3',
    sowName: 'Porca #892',
    status: 'Em progresso',
    startTime: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    pigletsBorn: 3,
    lastPigletTime: 8, // minutes ago
    contractionInterval: 10, // minutes
    isNormal: true,
  },
];

const alerts = [
  {
    id: '1',
    type: 'warning',
    sowName: 'Porca #156',
    message: 'Intervalo entre nascimentos acima de 45 minutos',
    time: '5 min atrás',
  },
  {
    id: '2',
    type: 'info',
    sowName: 'Porca #234',
    message: 'Parto progredindo normalmente',
    time: '15 min atrás',
  },
];

const stats = [
  { label: 'Partos Ativos', value: '3', icon: Clock, color: 'text-blue-600' },
  { label: 'Leitões Nascidos Hoje', value: '24', icon: CheckCircle, color: 'text-emerald-600' },
  { label: 'Taxa de Sucesso', value: '94%', icon: TrendingUp, color: 'text-emerald-600' },
  { label: 'Alertas Ativos', value: '1', icon: AlertTriangle, color: 'text-amber-600' },
];

export function HomePage() {
  const formatDuration = (startTime: Date) => {
    const hours = Math.floor((Date.now() - startTime.getTime()) / (1000 * 60 * 60));
    const minutes = Math.floor(((Date.now() - startTime.getTime()) % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}min`;
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-emerald-900 mb-2">Visão Geral dos Partos</h1>
        <p className="text-slate-600">Acompanhe em tempo real o status de todos os partos ativos</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">{stat.label}</p>
                  <p className="text-slate-900 mt-1">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alerts Section */}
      <Card>
        <CardHeader>
          <CardTitle>Alertas e Notificações</CardTitle>
          <CardDescription>Acompanhe os eventos importantes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {alerts.map((alert) => (
            <Alert key={alert.id} variant={alert.type === 'warning' ? 'destructive' : 'default'}>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>{alert.sowName}</AlertTitle>
              <AlertDescription className="flex items-center justify-between">
                <span>{alert.message}</span>
                <span className="text-xs">{alert.time}</span>
              </AlertDescription>
            </Alert>
          ))}
        </CardContent>
      </Card>

      {/* Active Parturitions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-emerald-900">Partos Ativos</h2>
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
            {activeParturitions.length} em andamento
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {activeParturitions.map((parturition) => (
            <Card key={parturition.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{parturition.sowName}</CardTitle>
                    <CardDescription>Iniciado há {formatDuration(parturition.startTime)}</CardDescription>
                  </div>
                  <Badge 
                    variant={parturition.isNormal ? 'default' : 'destructive'}
                    className={parturition.isNormal ? 'bg-emerald-600' : ''}
                  >
                    {parturition.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Leitões nascidos:</span>
                    <span className="text-emerald-900">{parturition.pigletsBorn}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Último nascimento:</span>
                    <span className="text-emerald-900">{parturition.lastPigletTime} min atrás</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Intervalo de contrações:</span>
                    <span className="text-emerald-900">{parturition.contractionInterval} min</span>
                  </div>
                </div>

                {!parturition.isNormal && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription className="text-xs">
                      Intervalo prolongado - considere verificação
                    </AlertDescription>
                  </Alert>
                )}

                <Progress value={parturition.pigletsBorn * 7} className="h-2" />

                <Link to={`/monitoring/${parturition.id}`}>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    Ver Detalhes do Parto
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acesso Rápido</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link to="/educational">
              <Button variant="outline" className="w-full">
                Guias Educativos
              </Button>
            </Link>
            <Link to="/history">
              <Button variant="outline" className="w-full">
                Histórico de Partos
              </Button>
            </Link>
            <Link to="/settings">
              <Button variant="outline" className="w-full">
                Cadastrar Nova Suína
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
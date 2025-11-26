import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, Clock, Activity, Heart, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

// Mock data
const parturitionData = {
  '1': {
    sowName: 'Porca #234',
    status: 'normal',
    startTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
    pigletsBorn: 8,
    expectedTotal: 12,
    contractionInterval: 12,
    lastPigletTime: 15,
    temperature: 38.5,
    heartRate: 85,
    timeline: [
      { time: new Date(Date.now() - 2 * 60 * 60 * 1000), event: 'Início das contrações', type: 'start' },
      { time: new Date(Date.now() - 105 * 60 * 1000), event: 'Nascimento do 1º leitão', type: 'birth' },
      { time: new Date(Date.now() - 95 * 60 * 1000), event: 'Nascimento do 2º leitão', type: 'birth' },
      { time: new Date(Date.now() - 80 * 60 * 1000), event: 'Nascimento do 3º leitão', type: 'birth' },
      { time: new Date(Date.now() - 65 * 60 * 1000), event: 'Nascimento do 4º leitão', type: 'birth' },
      { time: new Date(Date.now() - 50 * 60 * 1000), event: 'Nascimento do 5º leitão', type: 'birth' },
      { time: new Date(Date.now() - 35 * 60 * 1000), event: 'Nascimento do 6º leitão', type: 'birth' },
      { time: new Date(Date.now() - 25 * 60 * 1000), event: 'Nascimento do 7º leitão', type: 'birth' },
      { time: new Date(Date.now() - 15 * 60 * 1000), event: 'Nascimento do 8º leitão', type: 'birth' },
    ],
  },
  '2': {
    sowName: 'Porca #156',
    status: 'attention',
    startTime: new Date(Date.now() - 4 * 60 * 60 * 1000),
    pigletsBorn: 5,
    expectedTotal: 11,
    contractionInterval: 25,
    lastPigletTime: 45,
    temperature: 39.2,
    heartRate: 95,
    timeline: [
      { time: new Date(Date.now() - 4 * 60 * 60 * 1000), event: 'Início das contrações', type: 'start' },
      { time: new Date(Date.now() - 210 * 60 * 1000), event: 'Nascimento do 1º leitão', type: 'birth' },
      { time: new Date(Date.now() - 180 * 60 * 1000), event: 'Nascimento do 2º leitão', type: 'birth' },
      { time: new Date(Date.now() - 140 * 60 * 1000), event: 'Nascimento do 3º leitão', type: 'birth' },
      { time: new Date(Date.now() - 90 * 60 * 1000), event: 'Nascimento do 4º leitão', type: 'birth' },
      { time: new Date(Date.now() - 45 * 60 * 1000), event: 'Nascimento do 5º leitão', type: 'birth' },
      { time: new Date(Date.now() - 30 * 60 * 1000), event: 'Alerta: Intervalo prolongado', type: 'alert' },
    ],
  },
};

export function MonitoringPage() {
  const { sowId } = useParams();
  const data = parturitionData[sowId as keyof typeof parturitionData];

  if (!data) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">Parto não encontrado</p>
        <Link to="/">
          <Button className="mt-4 bg-emerald-600 hover:bg-emerald-700">Voltar para Início</Button>
        </Link>
      </div>
    );
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDuration = (startTime: Date) => {
    const hours = Math.floor((Date.now() - startTime.getTime()) / (1000 * 60 * 60));
    const minutes = Math.floor(((Date.now() - startTime.getTime()) % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}min`;
  };

  const progress = (data.pigletsBorn / data.expectedTotal) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-emerald-900">{data.sowName}</h1>
            <Badge 
              variant={data.status === 'normal' ? 'default' : 'destructive'}
              className={data.status === 'normal' ? 'bg-emerald-600' : ''}
            >
              {data.status === 'normal' ? 'Em progresso' : 'Atenção necessária'}
            </Badge>
          </div>
          <p className="text-slate-600 mt-1">Monitoramento em tempo real do parto</p>
        </div>
      </div>

      {/* Alert Banner */}
      {data.status === 'attention' && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Intervenção pode ser necessária</AlertTitle>
          <AlertDescription>
            O intervalo entre os nascimentos está acima de 45 minutos. Recomenda-se monitoramento
            próximo. Se o intervalo ultrapassar 60 minutos sem sinais de contração, considere
            verificar a posição dos leitões e contatar um veterinário.
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Duração Total</p>
                <p className="text-emerald-900 mt-1">{formatDuration(data.startTime)}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Leitões Nascidos</p>
                <p className="text-emerald-900 mt-1">{data.pigletsBorn} / {data.expectedTotal}</p>
              </div>
              <Activity className="w-8 h-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Último Nascimento</p>
                <p className="text-emerald-900 mt-1">{data.lastPigletTime} min atrás</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Intervalo de Contrações</p>
                <p className="text-emerald-900 mt-1">{data.contractionInterval} min</p>
              </div>
              <Heart className="w-8 h-8 text-rose-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Section */}
      <Card>
        <CardHeader>
          <CardTitle>Progresso do Parto</CardTitle>
          <CardDescription>Acompanhamento dos nascimentos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Progresso estimado</span>
              <span className="text-emerald-900">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <p className="text-sm text-slate-600">Temperatura corporal</p>
              <p className="text-emerald-900">{data.temperature}°C</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Frequência cardíaca</p>
              <p className="text-emerald-900">{data.heartRate} bpm</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Linha do Tempo do Parto</CardTitle>
              <CardDescription>Registro cronológico de todos os eventos</CardDescription>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Info className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-sm">
                    A linha do tempo mostra todos os eventos importantes do parto,
                    incluindo contrações e nascimentos.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-0">
            {data.timeline.map((item, index) => (
              <div key={index}>
                <div className="flex gap-4 pb-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${
                      item.type === 'start' ? 'bg-blue-600' :
                      item.type === 'birth' ? 'bg-emerald-600' :
                      'bg-amber-600'
                    }`} />
                    {index < data.timeline.length - 1 && (
                      <div className="w-0.5 h-full min-h-12 bg-slate-200 mt-1" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-emerald-900">{item.event}</p>
                      <Badge variant="outline" className="text-xs">
                        {formatTime(item.time)}
                      </Badge>
                    </div>
                    {item.type === 'birth' && (
                      <p className="text-sm text-slate-600">
                        Intervalo desde o último: {index > 0 ? 
                          `${Math.round((data.timeline[index-1].time.getTime() - item.time.getTime()) / (1000 * 60))} min` : 
                          '-'}
                      </p>
                    )}
                  </div>
                </div>
                {index < data.timeline.length - 1 && <Separator className="mb-4" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Recomendações</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.status === 'normal' ? (
            <Alert>
              <Activity className="h-4 w-4" />
              <AlertTitle>Parto progredindo normalmente</AlertTitle>
              <AlertDescription>
                Continue monitorando. O intervalo entre nascimentos está dentro do esperado
                (10-20 minutos). Mantenha o ambiente calmo e confortável para a porca.
              </AlertDescription>
            </Alert>
          ) : (
            <>
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Aguarde mais 15-30 minutos</AlertTitle>
                <AlertDescription>
                  O intervalo está prolongado, mas ainda dentro de limites aceitáveis. Continue
                  observando sinais de contração.
                </AlertDescription>
              </Alert>
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Quando intervir</AlertTitle>
                <AlertDescription>
                  Se não houver nascimento após 60 minutos ou se observar sinais de distócia
                  (esforço excessivo sem resultado, descarga anormal, prostração), contate
                  imediatamente um veterinário.
                </AlertDescription>
              </Alert>
            </>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Link to="/educational" className="flex-1">
          <Button variant="outline" className="w-full">
            Ver Guia de Intervenções
          </Button>
        </Link>
        <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">
          Registrar Evento Manual
        </Button>
      </div>
    </div>
  );
}

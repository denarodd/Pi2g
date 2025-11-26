import { useState } from 'react';
import { Search, TrendingUp, Calendar, Filter, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data
const historyData = [
  {
    id: '1',
    sowName: 'Porca #234',
    date: '2025-11-10',
    duration: '3h 15min',
    pigletsBorn: 12,
    interventions: 0,
    status: 'Normal',
  },
  {
    id: '2',
    sowName: 'Porca #156',
    date: '2025-11-09',
    duration: '5h 30min',
    pigletsBorn: 10,
    interventions: 1,
    status: 'Distócia',
  },
  {
    id: '3',
    sowName: 'Porca #892',
    date: '2025-11-08',
    duration: '2h 45min',
    pigletsBorn: 11,
    interventions: 0,
    status: 'Normal',
  },
  {
    id: '4',
    sowName: 'Porca #567',
    date: '2025-11-07',
    duration: '4h 10min',
    pigletsBorn: 13,
    interventions: 0,
    status: 'Normal',
  },
  {
    id: '5',
    sowName: 'Porca #234',
    date: '2025-10-15',
    duration: '3h 45min',
    pigletsBorn: 11,
    interventions: 0,
    status: 'Normal',
  },
  {
    id: '6',
    sowName: 'Porca #789',
    date: '2025-10-12',
    duration: '6h 20min',
    pigletsBorn: 9,
    interventions: 2,
    status: 'Distócia',
  },
];

const monthlyData = [
  { month: 'Jun', partos: 8, leitoes: 95, taxa: 92 },
  { month: 'Jul', partos: 12, leitoes: 142, taxa: 94 },
  { month: 'Ago', partos: 10, leitoes: 118, taxa: 91 },
  { month: 'Set', partos: 15, leitoes: 178, taxa: 95 },
  { month: 'Out', partos: 11, leitoes: 130, taxa: 93 },
  { month: 'Nov', partos: 14, leitoes: 165, taxa: 96 },
];

const avgData = [
  { sow: 'Porca #234', partos: 3, mediaLeitoes: 11.7, mediaDuracao: 3.3 },
  { sow: 'Porca #156', partos: 2, mediaLeitoes: 10.5, mediaDuracao: 5.2 },
  { sow: 'Porca #892', partos: 1, mediaLeitoes: 11.0, mediaDuracao: 2.8 },
  { sow: 'Porca #567', partos: 2, mediaLeitoes: 12.5, mediaDuracao: 3.9 },
  { sow: 'Porca #789', partos: 1, mediaLeitoes: 9.0, mediaDuracao: 6.3 },
];

export function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredData = historyData.filter((record) => {
    const matchesSearch = record.sowName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-emerald-900 mb-2">Histórico de Partos</h1>
        <p className="text-slate-600">
          Análise completa dos partos anteriores e tendências da granja
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total de Partos</p>
                <p className="text-emerald-900 mt-1">70</p>
              </div>
              <TrendingUp className="w-8 h-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Média de Leitões</p>
                <p className="text-emerald-900 mt-1">11.4</p>
              </div>
              <TrendingUp className="w-8 h-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Taxa de Sucesso</p>
                <p className="text-emerald-900 mt-1">94%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Duração Média</p>
                <p className="text-emerald-900 mt-1">3h 45min</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Desempenho Mensal</CardTitle>
            <CardDescription>Partos e leitões nascidos por mês</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="partos" fill="#10b981" name="Partos" />
                <Bar dataKey="leitoes" fill="#3b82f6" name="Leitões" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Success Rate Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Taxa de Sucesso</CardTitle>
            <CardDescription>Evolução da taxa de sucesso dos partos</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[85, 100]} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="taxa" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Taxa de Sucesso (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Average Performance by Sow */}
      <Card>
        <CardHeader>
          <CardTitle>Desempenho Médio por Suína</CardTitle>
          <CardDescription>Análise individual das principais matrizes</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={avgData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sow" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="mediaLeitoes" fill="#10b981" name="Média de Leitões" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Registro de Partos</CardTitle>
          <CardDescription>Histórico completo com filtros e busca</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Buscar por nome da suína..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="distócia">Distócia</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>

          {/* Table */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Suína</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Duração</TableHead>
                  <TableHead>Leitões</TableHead>
                  <TableHead>Intervenções</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.sowName}</TableCell>
                    <TableCell>{new Date(record.date).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>{record.duration}</TableCell>
                    <TableCell>{record.pigletsBorn}</TableCell>
                    <TableCell>{record.interventions}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={record.status === 'Normal' ? 'default' : 'destructive'}
                        className={record.status === 'Normal' ? 'bg-emerald-600' : ''}
                      >
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Ver Detalhes
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              Nenhum registro encontrado com os filtros aplicados
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
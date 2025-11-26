import { useState } from 'react';
import { Save, Plus, Bell, User, Database } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Separator } from './ui/separator';
import { useToast } from './ui/use-toast';
import { Toaster } from './ui/sonner';
import { toast } from 'sonner@2.0.3';

// Mock data
const sows = [
  { id: '1', name: 'Porca #234', breed: 'Landrace', birthDate: '2023-03-15', totalParturitions: 3 },
  { id: '2', name: 'Porca #156', breed: 'Large White', birthDate: '2022-11-20', totalParturitions: 5 },
  { id: '3', name: 'Porca #892', breed: 'Duroc', birthDate: '2023-07-10', totalParturitions: 2 },
];

export function SettingsPage() {
  const [notifyParturitionStart, setNotifyParturitionStart] = useState(true);
  const [notifyIrregularContractions, setNotifyIrregularContractions] = useState(true);
  const [notifyProlongedInterval, setNotifyProlongedInterval] = useState(true);
  const [notifyParturitionEnd, setNotifyParturitionEnd] = useState(false);
  const [intervalThreshold, setIntervalThreshold] = useState('45');

  const handleSaveSow = () => {
    toast.success('Suína cadastrada com sucesso!');
  };

  const handleSaveNotifications = () => {
    toast.success('Preferências de notificação salvas!');
  };

  const handleSaveProfile = () => {
    toast.success('Perfil atualizado com sucesso!');
  };

  return (
    <div className="space-y-6">
      <Toaster />
      
      {/* Header */}
      <div>
        <h1 className="text-emerald-900 mb-2">Configurações</h1>
        <p className="text-slate-600">
          Gerencie suas suínas, preferências de notificação e dados da conta
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="sows" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sows">
            <Database className="w-4 h-4 mr-2" />
            Suínas
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="w-4 h-4 mr-2" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="profile">
            <User className="w-4 h-4 mr-2" />
            Perfil
          </TabsTrigger>
        </TabsList>

        {/* Sows Management Tab */}
        <TabsContent value="sows" className="space-y-6 mt-6">
          {/* Add New Sow Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-600" />
                Cadastrar Nova Suína
              </CardTitle>
              <CardDescription>
                Adicione uma nova matriz ao sistema de monitoramento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sowName">Nome/Identificação</Label>
                  <Input id="sowName" placeholder="Ex: Porca #345" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="breed">Raça</Label>
                  <Select>
                    <SelectTrigger id="breed">
                      <SelectValue placeholder="Selecione a raça" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="landrace">Landrace</SelectItem>
                      <SelectItem value="largewhite">Large White</SelectItem>
                      <SelectItem value="duroc">Duroc</SelectItem>
                      <SelectItem value="pietrain">Pietrain</SelectItem>
                      <SelectItem value="hybrid">Híbrido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Data de Nascimento</Label>
                  <Input id="birthDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input id="weight" type="number" placeholder="Ex: 220" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Observações</Label>
                <Input id="notes" placeholder="Informações adicionais sobre a suína" />
              </div>
              <Button onClick={handleSaveSow} className="w-full bg-emerald-600 hover:bg-emerald-700">
                <Plus className="w-4 h-4 mr-2" />
                Cadastrar Suína
              </Button>
            </CardContent>
          </Card>

          {/* Existing Sows List */}
          <Card>
            <CardHeader>
              <CardTitle>Suínas Cadastradas</CardTitle>
              <CardDescription>
                Lista de todas as matrizes no sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sows.map((sow) => (
                  <div key={sow.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="space-y-1">
                      <h3 className="text-emerald-900">{sow.name}</h3>
                      <div className="flex gap-4 text-sm text-slate-600">
                        <span>Raça: {sow.breed}</span>
                        <span>•</span>
                        <span>Nascimento: {new Date(sow.birthDate).toLocaleDateString('pt-BR')}</span>
                        <span>•</span>
                        <span>Partos: {sow.totalParturitions}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                      <Button variant="outline" size="sm">
                        Histórico
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificação</CardTitle>
              <CardDescription>
                Configure quando deseja ser alertado sobre eventos importantes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Notification Toggles */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="notify-start">Início de Parto</Label>
                    <p className="text-sm text-slate-600">
                      Receba notificação quando um parto for detectado
                    </p>
                  </div>
                  <Switch
                    id="notify-start"
                    checked={notifyParturitionStart}
                    onCheckedChange={setNotifyParturitionStart}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="notify-contractions">Contrações Irregulares</Label>
                    <p className="text-sm text-slate-600">
                      Alerta quando contrações estiverem fora do padrão normal
                    </p>
                  </div>
                  <Switch
                    id="notify-contractions"
                    checked={notifyIrregularContractions}
                    onCheckedChange={setNotifyIrregularContractions}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="notify-interval">Intervalo Prolongado</Label>
                    <p className="text-sm text-slate-600">
                      Notificação quando o tempo entre nascimentos for muito longo
                    </p>
                  </div>
                  <Switch
                    id="notify-interval"
                    checked={notifyProlongedInterval}
                    onCheckedChange={setNotifyProlongedInterval}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="notify-end">Conclusão de Parto</Label>
                    <p className="text-sm text-slate-600">
                      Receba notificação quando um parto for concluído
                    </p>
                  </div>
                  <Switch
                    id="notify-end"
                    checked={notifyParturitionEnd}
                    onCheckedChange={setNotifyParturitionEnd}
                  />
                </div>
              </div>

              <Separator />

              {/* Threshold Settings */}
              <div className="space-y-4">
                <h3 className="text-emerald-900">Limites de Alerta</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="interval-threshold">
                    Intervalo máximo entre nascimentos (minutos)
                  </Label>
                  <Select value={intervalThreshold} onValueChange={setIntervalThreshold}>
                    <SelectTrigger id="interval-threshold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutos</SelectItem>
                      <SelectItem value="45">45 minutos</SelectItem>
                      <SelectItem value="60">60 minutos</SelectItem>
                      <SelectItem value="90">90 minutos</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-slate-600">
                    Você será notificado se o intervalo exceder este tempo
                  </p>
                </div>
              </div>

              <Button onClick={handleSaveNotifications} className="w-full bg-emerald-600 hover:bg-emerald-700">
                <Save className="w-4 h-4 mr-2" />
                Salvar Preferências
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Conta</CardTitle>
              <CardDescription>
                Gerencie seus dados pessoais e informações da granja
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nome Completo</Label>
                  <Input id="fullName" defaultValue="João Silva" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" defaultValue="joao@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" type="tel" defaultValue="(11) 98765-4321" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="farmName">Nome da Granja</Label>
                  <Input id="farmName" defaultValue="Granja São José" />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input id="address" defaultValue="Rodovia BR-123, Km 45" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input id="city" defaultValue="São Paulo" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">Estado</Label>
                  <Input id="state" defaultValue="SP" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">CEP</Label>
                  <Input id="zip" defaultValue="12345-678" />
                </div>
              </div>

              <Button onClick={handleSaveProfile} className="w-full bg-emerald-600 hover:bg-emerald-700">
                <Save className="w-4 h-4 mr-2" />
                Salvar Alterações
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configurações de Conta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full">
                Alterar Senha
              </Button>
              <Button variant="outline" className="w-full">
                Exportar Dados
              </Button>
              <Button variant="destructive" className="w-full">
                Excluir Conta
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

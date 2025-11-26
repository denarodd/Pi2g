import { BookOpen, Video, AlertCircle, CheckCircle, HelpCircle, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

const guides = [
  {
    id: '1',
    title: 'Sinais de Parto Normal',
    description: 'Aprenda a identificar quando o parto está progredindo adequadamente',
    duration: '5 min',
    type: 'guide',
    icon: CheckCircle,
    content: [
      'Contrações regulares a cada 10-20 minutos',
      'Intervalo entre nascimentos de 15-20 minutos',
      'Leitões nascendo com vitalidade',
      'Porca calma entre as contrações',
      'Duração total do parto: 2-6 horas',
    ],
  },
  {
    id: '2',
    title: 'Identificando Distócia',
    description: 'Reconheça os sinais de complicações no parto',
    duration: '7 min',
    type: 'guide',
    icon: AlertCircle,
    content: [
      'Contrações fracas ou ausentes por mais de 30 minutos',
      'Intervalo superior a 60 minutos entre nascimentos',
      'Esforço excessivo sem resultado',
      'Descarga vulvar anormal (verde-escura ou com odor forte)',
      'Porca prostrada ou com sinais de dor intensa',
    ],
  },
  {
    id: '3',
    title: 'Quando e Como Intervir',
    description: 'Guia prático de intervenções durante o parto',
    duration: '10 min',
    type: 'video',
    icon: Video,
    content: [
      'Aguardar 45-60 minutos antes de qualquer intervenção',
      'Higienizar as mãos e usar luvas descartáveis',
      'Examinar suavemente o canal do parto',
      'Auxiliar apenas se houver obstrução evidente',
      'Contatar veterinário se não houver progresso',
    ],
  },
];

const scenarios = [
  {
    title: 'Cenário 1: Intervalo de 40 minutos sem nascimento',
    situation: 'A porca teve 5 leitões, mas o último nasceu há 40 minutos. Ela apresenta contrações fracas.',
    action: 'AGUARDAR',
    reasoning: 'Até 60 minutos é considerado aceitável. Continue monitorando. Se ultrapassar 60 minutos ou as contrações cessarem, considere exame.',
    color: 'border-amber-200 bg-amber-50',
  },
  {
    title: 'Cenário 2: Esforço sem resultado há 45 minutos',
    situation: 'A porca está fazendo força há 45 minutos mas nenhum leitão nasceu. Apresenta sinais de cansaço.',
    action: 'INTERVIR',
    reasoning: 'Esforço prolongado sem resultado indica possível obstrução. Realizar exame suave do canal do parto e contatar veterinário.',
    color: 'border-red-200 bg-red-50',
  },
  {
    title: 'Cenário 3: Parto progredindo, mas lento',
    situation: 'Nasceram 8 leitões em 3 horas. Intervalos de 20-25 minutos. Contrações regulares.',
    action: 'MONITORAR',
    reasoning: 'Parto dentro da normalidade, apenas um pouco mais lento. Mantenha ambiente tranquilo e continue observando.',
    color: 'border-emerald-200 bg-emerald-50',
  },
];

const faqs = [
  {
    question: 'Quanto tempo deve durar um parto normal de suínas?',
    answer: 'Um parto normal geralmente dura entre 2 a 6 horas, com intervalos de 15-20 minutos entre os nascimentos dos leitões. Variações podem ocorrer dependendo do número de leitões e da condição da porca.',
  },
  {
    question: 'Quando devo chamar um veterinário?',
    answer: 'Chame o veterinário se: (1) houver mais de 60 minutos sem nascimento e sem contrações, (2) a porca apresentar esforço intenso por mais de 45 minutos sem resultado, (3) houver descarga vulvar anormal, (4) a porca mostrar sinais de prostração severa ou dor extrema.',
  },
  {
    question: 'Posso dar ocitocina durante o parto?',
    answer: 'A ocitocina só deve ser administrada por veterinários e apenas em situações específicas. O uso inadequado pode causar ruptura uterina. Nunca administre ocitocina sem orientação veterinária.',
  },
  {
    question: 'Como saber se todos os leitões nasceram?',
    answer: 'Após o nascimento do último leitão, a porca geralmente expele a placenta (em até 4 horas). Ela ficará mais relaxada e começará a interagir mais com os leitões. Em caso de dúvida, consulte um veterinário para confirmação.',
  },
  {
    question: 'O que é o período expulsivo?',
    answer: 'É a fase do parto onde ocorrem as contrações abdominais fortes e visíveis, resultando na expulsão dos leitões. Cada leitão é expulso após uma série de contrações, normalmente em intervalos de 15-20 minutos.',
  },
  {
    question: 'Como preparar o ambiente para o parto?',
    answer: 'Mantenha a maternidade limpa, seca e aquecida (18-22°C). Disponibilize área de escape térmico para os leitões (32-35°C). Minimize ruídos e movimentação. Tenha material de limpeza e toalhas disponíveis.',
  },
];

const bestPractices = [
  'Monitore a temperatura retal da porca - deve cair cerca de 1°C 12-24h antes do parto',
  'Garanta que a porca tenha água fresca disponível durante todo o parto',
  'Evite interferências desnecessárias - a natureza geralmente resolve',
  'Mantenha registro detalhado de cada parto para análise futura',
  'Seque e estimule cada leitão logo após o nascimento',
  'Certifique-se de que todos os leitões mamaram colostro nas primeiras 6 horas',
];

export function EducationalPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-emerald-900 mb-2">Centro Educacional</h1>
        <p className="text-slate-600">
          Aprenda sobre o manejo adequado de partos e tome decisões mais assertivas
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="guides" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="guides">Guias</TabsTrigger>
          <TabsTrigger value="scenarios">Cenários Práticos</TabsTrigger>
          <TabsTrigger value="faq">Perguntas Frequentes</TabsTrigger>
        </TabsList>

        {/* Guides Tab */}
        <TabsContent value="guides" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {guides.map((guide) => (
              <Card key={guide.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <guide.icon className="w-8 h-8 text-emerald-600 mb-2" />
                    <Badge variant="outline">{guide.duration}</Badge>
                  </div>
                  <CardTitle>{guide.title}</CardTitle>
                  <CardDescription>{guide.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {guide.content.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                        <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    {guide.type === 'video' ? (
                      <>
                        <Video className="w-4 h-4 mr-2" />
                        Assistir Vídeo
                      </>
                    ) : (
                      <>
                        <BookOpen className="w-4 h-4 mr-2" />
                        Ler Guia Completo
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Best Practices */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-600" />
                Boas Práticas de Manejo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {bestPractices.map((practice, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>{practice}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Scenarios Tab */}
        <TabsContent value="scenarios" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Exemplos Práticos de Decisão</CardTitle>
              <CardDescription>
                Aprenda com situações reais e entenda quando agir ou aguardar
              </CardDescription>
            </CardHeader>
          </Card>

          {scenarios.map((scenario, index) => (
            <Card key={index} className={`border-2 ${scenario.color}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-emerald-900">{scenario.title}</CardTitle>
                  <Badge 
                    variant={
                      scenario.action === 'INTERVIR' ? 'destructive' :
                      scenario.action === 'AGUARDAR' ? 'default' :
                      'outline'
                    }
                    className={scenario.action === 'MONITORAR' ? 'bg-emerald-600' : ''}
                  >
                    {scenario.action}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Situação:</p>
                  <p className="text-slate-800">{scenario.situation}</p>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <p className="text-sm text-slate-600 mb-1">Por que essa ação?</p>
                  <p className="text-sm text-slate-800">{scenario.reasoning}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* FAQ Tab */}
        <TabsContent value="faq" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-600" />
                Perguntas Frequentes
              </CardTitle>
              <CardDescription>
                Respostas para as dúvidas mais comuns sobre partos de suínas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-700">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { useState } from "react";

import {
  ArrowLeft,
  HelpCircle,
  FileText,
  Clock,
  CheckCircle,
  Search,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";

const faqCategories = [
  {
    id: "1",
    title: "Cadastro de Atividades",
    description: "Como registrar atividades complementares",
    icon: FileText,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    id: "2",
    title: "Pontuação",
    description: "Regras de cálculo e limites de pontos",
    icon: CheckCircle,
    color: "from-emerald-500 to-green-500",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  {
    id: "3",
    title: "Validação",
    description: "Entrega de documentos e análise final",
    icon: Clock,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/30",
  },
];

const faqItems = [
  {
    question: "Como cadastrar uma atividade complementar?",
    answer:
      "Acesse 'Minhas Atividades', clique em 'Adicionar' e selecione o grupo e a atividade correspondente. Informe a quantidade realizada e anexe o comprovante.",
  },
  {
    question: "Como a pontuação é calculada?",
    answer:
      "Cada atividade possui uma quantidade de pontos definida pelo regulamento do curso. O sistema calcula automaticamente a pontuação com base na quantidade informada.",
  },
  {
    question: "Posso ultrapassar o limite de pontos de uma atividade?",
    answer:
      "Não. O sistema bloqueia cadastros que excedam a pontuação máxima permitida para cada atividade.",
  },
  {
    question: "Quando minhas horas são validadas?",
    answer:
      "O cadastro serve para acompanhamento durante o curso. A validação oficial ocorre no momento da entrega da documentação para análise da coordenação.",
  },
  {
    question: "Preciso anexar comprovantes?",
    answer:
      "Sim. Recomenda-se anexar certificados, declarações ou comprovantes para facilitar a conferência das atividades realizadas.",
  },
  {
    question: "Como acompanhar meu progresso?",
    answer:
      "Na tela 'Minhas Atividades' existe uma barra de progresso que mostra a quantidade de pontos obtidos em relação ao mínimo exigido para cada grupo.",
  },
  {
    question: "Qual a diferença entre pontos mínimos e máximos?",
    answer:
      "Cada grupo possui uma pontuação mínima obrigatória para conclusão das horas complementares e uma pontuação máxima considerada para contabilização.",
  },
  {
    question: "Posso cadastrar a mesma atividade mais de uma vez?",
    answer:
      "Sim, desde que o limite máximo de pontuação definido para a atividade não seja ultrapassado.",
  },
  {
    question: "O que acontece quando atinjo o limite de uma atividade?",
    answer:
      "O sistema bloqueia novos cadastros para aquela atividade quando o limite máximo de pontos permitido já foi atingido.",
  },
  {
    question: "O que são os grupos de atividades?",
    answer:
      "As atividades complementares são divididas em grupos definidos pelo regulamento do curso. Cada grupo possui pontuação mínima e máxima que deve ser respeitada para integralização das horas complementares.",
  },
];

export default function Explore() {
  const [, setLocation] = useLocation();

  const [search, setSearch] = useState("");

  const filteredFaq = faqItems.filter((item) =>
    item.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="px-4 py-6 pb-20 max-w-5xl mx-auto space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex items-center">
        <Button variant="ghost" size="sm" onClick={() => setLocation("/")} className="mr-1">
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-xl font-bold">Ajuda e FAQ</h1>
      </div>

      {/* Categorias */}
      <section>
        <h2 className="text-base font-semibold mb-3">Categorias</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {faqCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Card key={cat.id} className="border-0 shadow-sm overflow-hidden group hover:shadow-md transition-all duration-200">
                <CardContent className="p-0">
                  <div className={`h-1 w-full bg-gradient-to-r ${cat.color}`} />
                  <div className="p-4 flex gap-3">
                    <div className={`w-12 h-12 rounded-xl ${cat.bgColor} flex items-center justify-center shrink-0`}>
                      <Icon className="text-foreground" size={22} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-sm">{cat.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{cat.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Busca */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <Input
          placeholder="Pesquisar dúvida..."
          className="pl-10 h-11 rounded-xl border-gray-200 dark:border-gray-700"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Card de contato */}
      <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center shrink-0">
            <MessageCircle className="text-blue-600 dark:text-blue-400" size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Não encontrou sua resposta?</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Entre em contato com a coordenação do curso.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <section>
        <h2 className="text-base font-semibold mb-3">Perguntas Frequentes</h2>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-2">
            <Accordion type="single" collapsible>
              {filteredFaq.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-border last:border-b-0">
                  <AccordionTrigger className="px-3 py-4 hover:no-underline hover:bg-muted/30 rounded-lg transition-colors text-sm font-medium">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-3 pb-4 text-sm text-muted-foreground leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

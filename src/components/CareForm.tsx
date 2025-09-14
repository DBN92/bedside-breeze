import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Droplets, 
  Utensils, 
  Pill, 
  Activity, 
  WashingMachine,
  Save,
  Clock
} from "lucide-react"

interface CareFormProps {
  patientId?: string
  onSave?: (data: any) => void
}

export function CareForm({ patientId, onSave }: CareFormProps) {
  const [activeTab, setActiveTab] = useState("liquids")
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria a lógica de salvamento
    onSave && onSave({})
  }

  return (
    <Card className="medical-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Registro de Cuidados
        </CardTitle>
        <CardDescription>
          Registre os cuidados realizados para o paciente
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="liquids" className="flex items-center gap-2">
              <Droplets className="h-4 w-4" />
              Líquidos
            </TabsTrigger>
            <TabsTrigger value="food" className="flex items-center gap-2">
              <Utensils className="h-4 w-4" />
              Alimentos
            </TabsTrigger>
            <TabsTrigger value="medication" className="flex items-center gap-2">
              <Pill className="h-4 w-4" />
              Medicamentos
            </TabsTrigger>
            <TabsTrigger value="drain" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Dreno
            </TabsTrigger>
            <TabsTrigger value="bathroom" className="flex items-center gap-2">
              <WashingMachine className="h-4 w-4" />
              Banheiro
            </TabsTrigger>
          </TabsList>

          {/* Líquidos */}
          <TabsContent value="liquids" className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="liquid-type">Tipo de Líquido</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="water">Água</SelectItem>
                      <SelectItem value="juice">Suco</SelectItem>
                      <SelectItem value="tea">Chá</SelectItem>
                      <SelectItem value="milk">Leite</SelectItem>
                      <SelectItem value="soup">Sopa</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="liquid-amount">Quantidade (ml)</Label>
                  <Input id="liquid-amount" type="number" placeholder="0" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="liquid-time">Horário</Label>
                <Input id="liquid-time" type="datetime-local" />
              </div>
              
              <div>
                <Label htmlFor="liquid-notes">Observações</Label>
                <Textarea id="liquid-notes" placeholder="Observações adicionais..." />
              </div>
              
              <Button type="submit" className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Registrar Líquidos
              </Button>
            </form>
          </TabsContent>

          {/* Alimentos */}
          <TabsContent value="food" className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="food-type">Tipo de Refeição</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="breakfast">Café da Manhã</SelectItem>
                      <SelectItem value="lunch">Almoço</SelectItem>
                      <SelectItem value="dinner">Jantar</SelectItem>
                      <SelectItem value="snack">Lanche</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="food-amount">Quantidade Consumida (%)</Label>
                  <Input id="food-amount" type="number" min="0" max="100" placeholder="0" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="food-time">Horário</Label>
                <Input id="food-time" type="datetime-local" />
              </div>
              
              <div>
                <Label htmlFor="food-description">Descrição dos Alimentos</Label>
                <Textarea id="food-description" placeholder="Descreva os alimentos consumidos..." />
              </div>
              
              <Button type="submit" className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Registrar Alimentação
              </Button>
            </form>
          </TabsContent>

          {/* Medicamentos */}
          <TabsContent value="medication" className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="med-name">Nome do Medicamento</Label>
                  <Input id="med-name" placeholder="Nome do medicamento" />
                </div>
                
                <div>
                  <Label htmlFor="med-dosage">Dosagem</Label>
                  <Input id="med-dosage" placeholder="Ex: 500mg" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="med-route">Via de Administração</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a via" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oral">Oral</SelectItem>
                      <SelectItem value="iv">Intravenosa</SelectItem>
                      <SelectItem value="im">Intramuscular</SelectItem>
                      <SelectItem value="topical">Tópica</SelectItem>
                      <SelectItem value="other">Outra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="med-time">Horário de Administração</Label>
                  <Input id="med-time" type="datetime-local" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="med-notes">Observações</Label>
                <Textarea id="med-notes" placeholder="Reações, efeitos observados..." />
              </div>
              
              <Button type="submit" className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Registrar Medicamento
              </Button>
            </form>
          </TabsContent>

          {/* Dreno */}
          <TabsContent value="drain" className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="drain-type">Tipo de Dreno</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="abdominal">Abdominal</SelectItem>
                      <SelectItem value="toracico">Torácico</SelectItem>
                      <SelectItem value="vesical">Vesical</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="drain-amount">Volume (ml)</Label>
                  <Input id="drain-amount" type="number" placeholder="0" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="drain-color">Cor/Aspecto</Label>
                  <Input id="drain-color" placeholder="Cor e aspecto do líquido" />
                </div>
                
                <div>
                  <Label htmlFor="drain-time">Horário</Label>
                  <Input id="drain-time" type="datetime-local" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="drain-notes">Observações</Label>
                <Textarea id="drain-notes" placeholder="Observações sobre o débito..." />
              </div>
              
              <Button type="submit" className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Registrar Débito
              </Button>
            </form>
          </TabsContent>

          {/* Banheiro */}
          <TabsContent value="bathroom" className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bathroom-type">Tipo</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urine">Urina</SelectItem>
                      <SelectItem value="feces">Fezes</SelectItem>
                      <SelectItem value="both">Ambos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="bathroom-time">Horário</Label>
                  <Input id="bathroom-time" type="datetime-local" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="bathroom-notes">Observações</Label>
                <Textarea id="bathroom-notes" placeholder="Características, volume, dificuldades..." />
              </div>
              
              <Button type="submit" className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Registrar Ida ao Banheiro
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
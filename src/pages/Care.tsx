import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CareForm } from "@/components/CareForm"
import { usePatients } from "@/hooks/usePatients"
import { useCareEvents } from "@/hooks/useCareEvents"
import { 
  Heart, 
  Search, 
  Filter,
  Calendar,
  Clock,
  Droplets,
  Pill,
  Activity,
  Utensils,
  Toilet
} from "lucide-react"

const Care = () => {
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  
  const { patients } = usePatients()
  const { events, addEvent } = useCareEvents()

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'drink': return Droplets
      case 'med': return Pill
      case 'note': return Activity
      case 'meal': return Utensils
      case 'bathroom': return Toilet
      default: return Heart
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'drink': return 'text-primary'
      case 'med': return 'text-accent'
      case 'note': return 'text-secondary'
      case 'meal': return 'text-warning'
      case 'bathroom': return 'text-muted-foreground'
      default: return 'text-foreground'
    }
  }

  const getTypeName = (type: string) => {
    switch (type) {
      case 'drink': return 'Líquidos'
      case 'med': return 'Medicamento'
      case 'note': return 'Anotação'
      case 'meal': return 'Alimentação'
      case 'bathroom': return 'Banheiro'
      default: return type
    }
  }

  const filteredPatients = patients.filter(patient =>
    patient.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.bed.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Cuidados</h1>
          <p className="text-muted-foreground">Registro e acompanhamento de cuidados dos pacientes</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Relatório Diário
          </Button>
          <Button variant="medical">
            <Heart className="h-4 w-4 mr-2" />
            Novo Registro
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Selection */}
        <div className="lg:col-span-1">
          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Selecionar Paciente
              </CardTitle>
              <CardDescription>
                Escolha o paciente para registrar cuidados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar paciente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="space-y-2">
                {filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      selectedPatient === patient.id
                        ? "border-primary bg-primary-light"
                        : "border-border hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedPatient(patient.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">{patient.full_name}</p>
                        <p className="text-sm text-muted-foreground">Leito {patient.bed}</p>
                      </div>
                      <Badge 
                        variant={patient.notes?.includes('crítico') ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {patient.notes?.includes('crítico') ? 'Crítico' : 'Estável'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Care Form */}
        <div className="lg:col-span-2">
          {selectedPatient ? (
            <CareForm 
              patientId={selectedPatient}
              onSave={async (data) => {
                try {
                  const eventType = data.type === 'liquid' ? 'drink' :
                                  data.type === 'medication' ? 'med' :
                                  data.type === 'drainage' ? 'note' :
                                  data.type as 'drink' | 'meal' | 'med' | 'bathroom' | 'note'
                  
                  await addEvent({
                    patient_id: selectedPatient!,
                    type: eventType,
                    occurred_at: new Date().toISOString(),
                    volume_ml: data.volume_ml,
                    meal_desc: data.meal_desc,
                    med_name: data.med_name,
                    med_dose: data.med_dose,
                    bathroom_type: data.bathroom_type,
                    notes: data.notes
                  })
                } catch (error) {
                  console.error("Erro ao salvar:", error)
                }
              }}
            />
          ) : (
            <Card className="medical-card">
              <CardContent className="py-12 text-center">
                <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Selecione um Paciente
                </h3>
                <p className="text-muted-foreground">
                  Escolha um paciente da lista ao lado para começar a registrar cuidados.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Recent Care Records */}
      <Card className="medical-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Registros Recentes
              </CardTitle>
              <CardDescription>
                Últimos cuidados registrados no sistema
              </CardDescription>
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtrar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.slice(0, 10).map((event) => {
              const patient = patients.find(p => p.id === event.patient_id)
              const Icon = getTypeIcon(event.type)
              const description = event.type === 'drink' ? `${event.volume_ml}ml` :
                               event.type === 'med' ? `${event.med_name} - ${event.med_dose}` :
                               event.type === 'note' ? event.notes || 'Anotação' :
                               event.type === 'meal' ? event.meal_desc :
                               event.type === 'bathroom' ? event.bathroom_type :
                               event.notes || 'Sem descrição'
              
              return (
                <div key={event.id} className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className={`p-2 rounded-lg bg-muted ${getTypeColor(event.type)}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-foreground">{getTypeName(event.type)}</p>
                      <Badge variant="outline" className="text-xs">
                        {patient?.full_name || 'Paciente removido'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">
                      {new Date(event.occurred_at).toLocaleTimeString('pt-BR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(event.occurred_at).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Care
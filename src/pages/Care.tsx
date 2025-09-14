import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CareForm } from "@/components/CareForm"
import { 
  Heart, 
  Search, 
  Filter,
  Calendar,
  Clock,
  Droplets,
  Pill,
  Activity,
  Utensils
} from "lucide-react"

const Care = () => {
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const patients = [
    { id: "1", name: "Maria Silva", room: "101-A", status: "Estável" },
    { id: "2", name: "João Costa", room: "102-B", status: "Crítico" },
    { id: "3", name: "Ana Lima", room: "103-A", status: "Recuperação" },
  ]

  const recentCareRecords = [
    {
      id: 1,
      patient: "Maria Silva",
      type: "Medicamento",
      description: "Dipirona 500mg - Via oral",
      time: "14:30",
      date: "2024-01-20",
      icon: Pill,
      color: "text-accent"
    },
    {
      id: 2,
      patient: "João Costa",
      type: "Líquidos",
      description: "Água - 200ml",
      time: "14:15",
      date: "2024-01-20",
      icon: Droplets,
      color: "text-primary"
    },
    {
      id: 3,
      patient: "Ana Lima",
      type: "Débito de Dreno",
      description: "Dreno abdominal - 50ml",
      time: "14:00",
      date: "2024-01-20",
      icon: Activity,
      color: "text-secondary"
    },
    {
      id: 4,
      patient: "Maria Silva",
      type: "Alimentação",
      description: "Almoço - 80% consumido",
      time: "13:30",
      date: "2024-01-20",
      icon: Utensils,
      color: "text-warning"
    }
  ]

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
                {patients.map((patient) => (
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
                        <p className="font-medium text-foreground">{patient.name}</p>
                        <p className="text-sm text-muted-foreground">Quarto {patient.room}</p>
                      </div>
                      <Badge 
                        variant={patient.status === 'Crítico' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {patient.status}
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
              onSave={(data) => {
                console.log("Care data saved:", data)
                // Aqui você implementaria a lógica de salvamento
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
            {recentCareRecords.map((record) => (
              <div key={record.id} className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <div className={`p-2 rounded-lg bg-muted ${record.color}`}>
                  <record.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-foreground">{record.type}</p>
                    <Badge variant="outline" className="text-xs">
                      {record.patient}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{record.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{record.time}</p>
                  <p className="text-xs text-muted-foreground">{record.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Care
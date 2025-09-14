import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Search, 
  Users, 
  Edit,
  Eye,
  Trash2,
  UserPlus
} from "lucide-react"

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState("")
  
  const patients = [
    {
      id: 1,
      name: "Maria Silva Santos",
      age: 45,
      room: "101-A",
      bed: "1",
      admission: "2024-01-15",
      condition: "Pós-operatório",
      status: "Estável",
      observations: "Paciente consciente, orientada. Dor controlada."
    },
    {
      id: 2,
      name: "João Pedro Costa",
      age: 67,
      room: "102-B",
      bed: "2",
      admission: "2024-01-12",
      condition: "Pneumonia",
      status: "Crítico",
      observations: "Necessita monitoramento constante. Oxigenoterapia."
    },
    {
      id: 3,
      name: "Ana Beatriz Lima",
      age: 32,
      room: "103-A",
      bed: "1",
      admission: "2024-01-18",
      condition: "Fratura de fêmur",
      status: "Recuperação",
      observations: "Mobilização progressiva. Fisioterapia iniciada."
    },
    {
      id: 4,
      name: "Carlos Eduardo Souza",
      age: 58,
      room: "104-B",
      bed: "2",
      admission: "2024-01-10",
      condition: "Diabetes descompensada",
      status: "Estável",
      observations: "Glicemia controlada. Dieta específica."
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Crítico': return 'bg-destructive text-destructive-foreground'
      case 'Estável': return 'bg-secondary text-secondary-foreground'
      case 'Recuperação': return 'bg-accent text-accent-foreground'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pacientes</h1>
          <p className="text-muted-foreground">Gestão de pacientes internados</p>
        </div>
        <Button variant="medical">
          <UserPlus className="h-4 w-4 mr-2" />
          Novo Paciente
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="medical-card">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar por nome, quarto ou condição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Filtros</Button>
              <Button variant="outline">Exportar</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patients Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="medical-card">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold text-foreground">
                    {patient.name}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {patient.age} anos • Quarto {patient.room} - Leito {patient.bed}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(patient.status)}>
                  {patient.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Internação</p>
                  <p className="font-medium text-foreground">
                    {new Date(patient.admission).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Condição</p>
                  <p className="font-medium text-foreground">{patient.condition}</p>
                </div>
              </div>
              
              <div>
                <p className="text-muted-foreground text-sm mb-1">Observações</p>
                <p className="text-sm text-foreground bg-muted/50 p-2 rounded-md">
                  {patient.observations}
                </p>
              </div>
              
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  Ver
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Editar
                </Button>
                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Remover
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredPatients.length === 0 && (
        <Card className="medical-card">
          <CardContent className="py-12 text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Nenhum paciente encontrado
            </h3>
            <p className="text-muted-foreground mb-4">
              Não foram encontrados pacientes com os critérios de busca informados.
            </p>
            <Button variant="outline" onClick={() => setSearchTerm("")}>
              Limpar busca
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default Patients
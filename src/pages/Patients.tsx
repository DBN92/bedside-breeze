import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { usePatients } from "@/hooks/usePatients"
import { useToast } from "@/hooks/use-toast"
import { PatientForm } from "@/components/PatientForm"
import { 
  Plus, 
  Search, 
  Users, 
  Edit,
  Eye,
  Trash2,
  UserPlus,
  Loader2
} from "lucide-react"

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [showPatientForm, setShowPatientForm] = useState(false)
  const { patients, loading, deletePatient, refetch } = usePatients()
  const { toast } = useToast()

  const handleDeletePatient = async (id: string, name: string) => {
    try {
      await deletePatient(id)
      toast({
        title: "Paciente removido",
        description: `${name} foi removido com sucesso.`
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível remover o paciente.",
        variant: "destructive"
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Crítico': return 'bg-destructive text-destructive-foreground'
      case 'Estável': return 'bg-secondary text-secondary-foreground'
      case 'Recuperação': return 'bg-accent text-accent-foreground'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const getAge = (birthDate: string) => {
    return new Date().getFullYear() - new Date(birthDate).getFullYear()
  }

  const filteredPatients = patients.filter(patient =>
    patient.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.bed.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (patient.notes && patient.notes.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pacientes</h1>
          <p className="text-muted-foreground">Gestão de pacientes internados</p>
        </div>
        <Button variant="medical" onClick={() => setShowPatientForm(true)}>
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
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPatients.map((patient) => (
            <Card key={patient.id} className="medical-card">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-foreground">
                      {patient.full_name}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {getAge(patient.birth_date)} anos • Leito {patient.bed}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(patient.notes?.includes('crítico') ? 'Crítico' : 'Estável')}>
                    {patient.notes?.includes('crítico') ? 'Crítico' : 'Estável'}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Internação</p>
                    <p className="font-medium text-foreground">
                      {new Date(patient.created_at).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Nascimento</p>
                    <p className="font-medium text-foreground">
                      {new Date(patient.birth_date).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
                
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Observações</p>
                  <p className="text-sm text-foreground bg-muted/50 p-2 rounded-md">
                    {patient.notes || 'Nenhuma observação registrada'}
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
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDeletePatient(patient.id, patient.full_name)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remover
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

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

      {/* Patient Form Modal */}
      {showPatientForm && (
        <PatientForm
          onClose={() => setShowPatientForm(false)}
          onSuccess={() => {
            refetch()
            setShowPatientForm(false)
          }}
        />
      )}
    </div>
  )
}

export default Patients
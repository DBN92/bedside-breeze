import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'

export interface Patient {
  id: string
  full_name: string
  birth_date: string
  bed: string
  notes: string
  is_active: boolean
  created_at: string
}

export const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPatients = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (error) throw error
      setPatients(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar pacientes')
    } finally {
      setLoading(false)
    }
  }

  const addPatient = async (patient: Omit<Patient, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('patients')
        .insert([patient])
        .select()
        .single()

      if (error) throw error
      setPatients(prev => [data, ...prev])
      return data
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Erro ao adicionar paciente')
    }
  }

  const updatePatient = async (id: string, updates: Partial<Patient>) => {
    try {
      const { data, error } = await supabase
        .from('patients')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      setPatients(prev => prev.map(p => p.id === id ? data : p))
      return data
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Erro ao atualizar paciente')
    }
  }

  const deletePatient = async (id: string) => {
    try {
      const { error } = await supabase
        .from('patients')
        .update({ is_active: false })
        .eq('id', id)

      if (error) throw error
      setPatients(prev => prev.filter(p => p.id !== id))
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Erro ao remover paciente')
    }
  }

  useEffect(() => {
    fetchPatients()
  }, [])

  return {
    patients,
    loading,
    error,
    addPatient,
    updatePatient,
    deletePatient,
    refetch: fetchPatients
  }
}
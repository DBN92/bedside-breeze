import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'

export interface CareEvent {
  id: string
  patient_id: string
  type: 'drink' | 'meal' | 'med' | 'bathroom' | 'note'
  scheduled_at?: string
  occurred_at: string
  volume_ml?: number
  meal_desc?: string
  med_name?: string
  med_dose?: string
  bathroom_type?: string
  notes?: string
  created_at: string
}

export const useCareEvents = (patientId?: string) => {
  const [events, setEvents] = useState<CareEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEvents = async () => {
    try {
      setLoading(true)
      let query = supabase
        .from('events')
        .select(`
          *,
          patients(full_name, bed)
        `)
        .order('occurred_at', { ascending: false })

      if (patientId) {
        query = query.eq('patient_id', patientId)
      }

      const { data, error } = await query
      if (error) throw error
      setEvents(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar registros')
    } finally {
      setLoading(false)
    }
  }

  const addEvent = async (event: Omit<CareEvent, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .insert([event])
        .select()
        .single()

      if (error) throw error
      setEvents(prev => [data, ...prev])
      return data
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Erro ao adicionar registro')
    }
  }

  const getTodayStats = () => {
    const today = new Date().toISOString().split('T')[0]
    const todayEvents = events.filter(event => 
      event.occurred_at.startsWith(today)
    )

    return {
      total: todayEvents.length,
      liquids: todayEvents.filter(e => e.type === 'drink').length,
      medications: todayEvents.filter(e => e.type === 'med').length,
      drainage: todayEvents.filter(e => e.type === 'note').length,
      meals: todayEvents.filter(e => e.type === 'meal').length,
      bathroom: todayEvents.filter(e => e.type === 'bathroom').length
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [patientId])

  return {
    events,
    loading,
    error,
    addEvent,
    refetch: fetchEvents,
    getTodayStats
  }
}
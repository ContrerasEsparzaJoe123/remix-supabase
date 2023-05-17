import { useQuery } from 'react-query'
import { supabase } from '../DB/supabase'

const fetchRecommendations = async () => {
  const { data, error } = await supabase
    .from('questions')
    .select('*')

  if(error) {
    throw new Error(error.message)
  }

  return data
}

export default function useRecommendations() {
  return useQuery('questions', () => fetchRecommendations())
}
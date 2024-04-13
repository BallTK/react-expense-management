import { useQuery } from "@tanstack/react-query"
import { getCatFacts } from "../services/fetch-cat-facts"

export const catFactQueryKey = 'getCatFacts'

export const useGetCatFacts = () => {
  return useQuery({ queryKey: catFactQueryKey, queryFn: getCatFacts })
}
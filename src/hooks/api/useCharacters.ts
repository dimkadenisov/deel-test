import { Character, CharacterFilter, Info } from '../../types';
import { useQuery } from '../common/useQuery';

// possible improvements:
// pass to useQuery function who will be fetch data
// this will allow to refuse passing urls and types to useQuery
// example: useQuery(getCharacters, { variables })
export function useCharacters(variables?: CharacterFilter) {
  return useQuery<Info<Character[]>>(
    'https://rickandmortyapi.com/api/character',
    variables
  );
}

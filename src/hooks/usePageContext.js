import { useOutletContext } from 'react-router-dom';

export function usePageContext() {
  return useOutletContext();
}

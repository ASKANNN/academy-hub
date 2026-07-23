import { useState } from 'react';

export function useIntro() {
  const [done, setDone] = useState(() => sessionStorage.getItem('academy-intro') === '1');
  const finish = () => { sessionStorage.setItem('academy-intro', '1'); setDone(true); };
  return { done, finish };
}

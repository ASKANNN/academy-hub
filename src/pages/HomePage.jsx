import { Hero } from '../components/Hero.jsx';
import { AcademyTree } from '../components/AcademyTree.jsx';
import { usePageContext } from '../hooks/usePageContext.js';

export default function HomePage() {
  const { lang } = usePageContext();

  return (
    <>
      <Hero lang={lang} />
      <AcademyTree lang={lang} />
    </>
  );
}

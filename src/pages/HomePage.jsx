import { Hero } from '../components/Hero.jsx';
import { AcademyTree } from '../components/AcademyTree.jsx';
import { usePageContext } from '../components/Layout.jsx';

export default function HomePage() {
  const { lang } = usePageContext();

  return (
    <>
      <Hero lang={lang} />
      <AcademyTree lang={lang} />
    </>
  );
}

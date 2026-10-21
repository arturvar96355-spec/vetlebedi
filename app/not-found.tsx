import { PageHero } from '@/components/layout/PageHero';
import { Button } from '@/components/ui/Button';
import { site } from '@/content/site';

export default function NotFound() {
  return (
    <PageHero eyebrow="Ошибка 404" title="Такой страницы нет" lead={<>Возможно, она переехала. Вернитесь на главную или позвоните: <a className="underline underline-offset-4" href={site.phoneHref}>{site.phone}</a>.</>}>
      <Button href="/" variant="lake">На главную</Button>
    </PageHero>
  );
}

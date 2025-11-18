import { posts } from '@/.velite';
import MapContent from './map-content';

export default function Page() {
  const data = posts.filter((p) => p.published).map((p) => ({
    slug: p.slug,
    title: p.title,
    tags: p.tags || [],
    status: p.status,
    date: p.date,
  }));
  return <MapContent posts={data} />;
}
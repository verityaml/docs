import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getContent, getAllSlugs } from '@/lib/content';
import { mdxComponents } from '@/components/mdx';
import { DocsLayout } from '@/components/layout/docs-layout';

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({
    slug: slug.length === 0 ? undefined : slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const page = getContent(slug ?? []);
  if (!page) return {};
  return {
    title: page.meta.title,
    description: page.meta.description,
  };
}

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params;
  const slugArray = slug ?? [];
  const page = getContent(slugArray);
  if (!page) notFound();

  const pathname = slugArray.length === 0 ? '/' : '/' + slugArray.join('/');

  return (
    <DocsLayout
      pathname={pathname}
      title={page.meta.title}
      description={page.meta.description}
    >
      <MDXRemote
        source={page.content}
        components={mdxComponents}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
    </DocsLayout>
  );
}

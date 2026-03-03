import fs from 'fs';
import path from 'path';
import { cache } from 'react';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content');

export interface ContentMeta {
  title: string;
  description: string;
  slug: string;
}

export interface ContentPage {
  meta: ContentMeta;
  content: string;
}

export const getContent = cache(function getContent(slug: string[]): ContentPage | null {
  const filePath = slug.length === 0
    ? path.join(contentDir, 'index.mdx')
    : path.join(contentDir, ...slug) + '.mdx';

  let raw: string;
  try {
    raw = fs.readFileSync(filePath, 'utf-8');
  } catch {
    return null;
  }

  const { data, content } = matter(raw);

  return {
    meta: {
      title: data.title ?? '',
      description: data.description ?? '',
      slug: slug.join('/'),
    },
    content,
  };
});

export function getAllSlugs(): string[][] {
  const slugs: string[][] = [];

  function walk(dir: string, prefix: string[]) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        walk(path.join(dir, entry.name), [...prefix, entry.name]);
      } else if (entry.name.endsWith('.mdx')) {
        const name = entry.name.replace(/\.mdx$/, '');
        if (name === 'index' && prefix.length === 0) {
          slugs.push([]);
        } else {
          slugs.push([...prefix, name]);
        }
      }
    }
  }

  walk(contentDir, []);
  return slugs;
}

import { Clock } from 'lucide-react';
import type { BlogPostMeta } from '../../blog/types';
import { cn } from '../../lib/cn';
import { Picture } from '../ui/Primitives';

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

interface BlogCardProps {
  post: BlogPostMeta;
  /** The first card on a listing is the likely LCP image. */
  eager?: boolean;
  /** Heading level inside the card, so the outline stays correct on each page. */
  as?: 'h2' | 'h3';
  /** No excerpt, for swipe rows. */
  compact?: boolean;
  /** The lead card on the blog listing. */
  featured?: boolean;
  className?: string;
}

/** Post card: 16:9 image, category, title, two-line excerpt and read time. The whole card is one link. */
export function BlogCard({ post, eager = false, as: Heading = 'h3', compact = false, featured = false, className }: BlogCardProps) {
  return (
    <article className={cn('svc-card svc-card-hover group relative flex h-full flex-col overflow-hidden', featured && 'sm:grid sm:grid-cols-2', className)}>
      <Picture
        image={{ ...post.featuredImage, alt: post.featuredImageAlt }}
        eager={eager}
        priority={eager}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className={cn('aspect-video w-full object-cover', featured && 'sm:h-full sm:aspect-auto')}
      />
      <div className={cn('flex flex-1 flex-col p-5', featured && 'sm:p-8')}>
        <p className="text-eyebrow font-medium uppercase text-berry">{featured ? 'Featured guide · ' : ''}{post.category}</p>
        <Heading className={cn('mt-2 font-display font-medium leading-snug text-ink', featured ? 'text-3xl sm:text-4xl' : 'text-xl')}>
          {/* The link's ::after covers the card, so the whole card is one tap target. */}
          <a href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </a>
        </Heading>
        {!compact && <p className={cn('mt-2 text-sm leading-relaxed text-muted', !featured && 'line-clamp-2', featured && 'sm:text-base')}>{post.metaDescription}</p>}
        <p className="mt-auto flex items-center gap-2 pt-4 text-xs text-muted">
          <Clock aria-hidden className="size-3.5 text-berry" />
          {post.readTime} min read
          {post.draft && <span className="ml-auto rounded-full bg-gold px-2 py-0.5 font-semibold text-ink">Draft</span>}
        </p>
      </div>
    </article>
  );
}

'use client';

import { Blog } from '@/lib/microcms';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

type BlogDetailBadgesProps = {
  post: Blog;
};

export default function BlogDetailBadges({ post }: BlogDetailBadgesProps) {
  const router = useRouter();

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/?category=${categoryId}`);
  };

  const handleTagClick = (tag: string) => {
    router.push(`/?q=${encodeURIComponent(tag)}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {post.category && (
        <Badge
          variant="default"
          className={cn(
            "cursor-pointer select-none transition-all duration-200 hover:bg-primary/90"
          )}
          onClick={() => handleCategoryClick(post.category!.id)}
        >
          {post.category.name}
        </Badge>
      )}
      {post.tags && post.tags.length > 0 && post.tags.map((tag) => (
        <Badge
          key={tag}
          variant="secondary"
          className="cursor-pointer select-none transition-all duration-200 hover:bg-secondary/80"
          onClick={() => handleTagClick(tag)}
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}
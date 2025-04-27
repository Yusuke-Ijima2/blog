'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Blog } from '@/lib/microcms';
import { formatDate } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

type BlogCardProps = {
  post: Blog;
};

export default function BlogCard({ post }: BlogCardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryClick = (e: React.MouseEvent, categoryId: string) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', categoryId);
    params.delete('page');
    router.push(`/?${params.toString()}`);
  };

  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    params.set('q', tag);
    params.delete('page');
    router.push(`/?${params.toString()}`);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <Link href={`/blog/${post.id}`} className="group">
        {post.eyecatch ? (
          <div className="aspect-video overflow-hidden">
            <Image
              src={post.eyecatch.url}
              alt={post.title}
              width={post.eyecatch.width}
              height={post.eyecatch.height}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="aspect-video bg-muted" />
        )}
        
        <CardHeader className="p-4 pb-0">
          <h3 className="line-clamp-2 text-lg font-semibold">{post.title}</h3>
        </CardHeader>
        
        <CardContent className="p-4 pt-2">
          <div className="flex flex-wrap gap-2">
            {post.category && (
              <Badge
                variant="default"
                className={cn(
                  "cursor-pointer select-none transition-all duration-200 hover:bg-primary/90"
                )}
                onClick={(e) => handleCategoryClick(e, post.category!.id)}
              >
                {post.category.name}
              </Badge>
            )}
            {post.tags && post.tags.length > 0 && post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="cursor-pointer select-none transition-all duration-200 hover:bg-secondary/80"
                onClick={(e) => handleTagClick(e, tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 text-sm text-muted-foreground">
          {formatDate(post.publishedAt)}
        </CardFooter>
      </Link>
    </Card>
  );
}
import { getBlogDetail } from '@/lib/microcms';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft } from 'lucide-react';
import BlogDetailBadges from '@/components/blog-detail-badges';

type Props = {
  params: {
    id: string;
  };
};

export default async function BlogDetailPage({ params }: Props) {
  if (!params.id) {
    return notFound();
  }

  try {
    const post = await getBlogDetail(params.id);

    if (!post) {
      return notFound();
    }

    return (
      <div className="container max-w-4xl py-10">
        <div className="mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> 記事一覧に戻る
          </Link>
        </div>

        <article className="prose prose-neutral dark:prose-invert mx-auto max-w-3xl lg:prose-lg">
          <h1 className="mb-2 text-3xl font-bold md:text-4xl">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <time dateTime={post.publishedAt} className="text-muted-foreground">
              {formatDate(post.publishedAt)}
            </time>
            <BlogDetailBadges post={post} />
          </div>
          
          {post.eyecatch && (
            <div className="my-6 overflow-hidden rounded-lg">
              <Image
                src={post.eyecatch.url}
                alt={post.title}
                width={post.eyecatch.width || 800}
                height={post.eyecatch.height || 400}
                priority
                className="w-full object-cover"
              />
            </div>
          )}
          
          <Separator className="my-6" />
          
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="mt-6"
          />
        </article>
      </div>
    );
  } catch (error) {
    console.error('Error in BlogDetailPage:', error);
    return notFound();
  }
}
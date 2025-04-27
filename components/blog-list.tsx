import { BlogResponse } from '@/lib/microcms';
import BlogCard from './blog-card';
import Pagination from './pagination';

type BlogListProps = {
  posts: BlogResponse;
  currentPage: number;
  query?: string;
  category?: string;
};

export default function BlogList({ posts, currentPage, query = '', category = '' }: BlogListProps) {
  const totalPages = Math.ceil(posts.totalCount / posts.limit);

  return (
    <div className="space-y-10">
      {posts.totalCount === 0 ? (
        <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
          <p className="text-center text-muted-foreground">
            記事が見つかりませんでした。
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.contents.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              query={query}
              category={category}
            />
          )}
        </>
      )}
    </div>
  );
}
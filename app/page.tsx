import BlogList from '@/components/blog-list';
import { getBlogList, getCategories } from '@/lib/microcms';
import CategoryList from '@/components/category-list';
import SearchBar from '@/components/search-bar';

export default async function Home({
  searchParams,
}: {
  searchParams: { page?: string; q?: string; category?: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const limit = 6;
  const offset = (page - 1) * limit;
  const query = searchParams.q || '';
  const categoryId = searchParams.category || '';

  const [posts, categories] = await Promise.all([
    getBlogList({
      offset,
      limit,
      q: query,
      filters: categoryId ? `category[equals]${categoryId}` : undefined,
    }),
    getCategories(),
  ]);

  const categoryName = categoryId
    ? categories.contents.find((cat) => cat.id === categoryId)?.name
    : '';

  return (
    <div className="container py-8 md:py-12">
      <div className="space-y-6 pb-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {query ? `検索結果: ${query}` : '最新の記事'}
        </h1>
        <div className="max-w-md">
          <SearchBar />
        </div>
        <p className="text-muted-foreground">
          {query
            ? `"${query}" に一致する記事が ${posts.totalCount} 件見つかりました`
            : categoryName
            ? `${posts.totalCount} 件の記事`
            : 'ブログの最新記事をご覧ください。'}
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-[200px_1fr]">
        <CategoryList />
        <BlogList posts={posts} currentPage={page} query={query} category={categoryId} />
      </div>
    </div>
  );
}
import { getBlogList, getCategories } from "@/lib/microcms";
import BlogList from "./blog-list";
import CategoryList from "./category-list";
import { useEffect } from "react";

interface BlogPostsContentProps {
  page: number;
  limit: number;
  query: string;
  categoryId: string;
  onDataLoaded?: (totalCount: number, categoryName?: string) => void;
}

export async function BlogPostsContent({
  page,
  limit,
  query,
  categoryId,
  onDataLoaded,
}: BlogPostsContentProps) {
  const offset = (page - 1) * limit;

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
    : "";

  // データが読み込まれたことを表示するためのJSX
  return (
    <>
      {/* 検索結果情報 */}
      {query || categoryId ? (
        <div className="mb-6">
          <p className="text-muted-foreground">
            {query
              ? `"${query}" に一致する記事が ${posts.totalCount} 件見つかりました`
              : categoryName
              ? `${categoryName}の記事が ${posts.totalCount} 件あります`
              : `${posts.totalCount} 件の記事`}
          </p>
        </div>
      ) : null}

      {/* メインコンテンツ */}
      <div className="grid gap-8 md:grid-cols-[200px_1fr]">
        <CategoryList categories={categories} />
        <BlogList
          posts={posts}
          currentPage={page}
          query={query}
          category={categoryId}
        />
      </div>
    </>
  );
}

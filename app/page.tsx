import { Suspense } from "react";
import { BlogPostsContent } from "@/components/blog-posts-content";
import { Loading } from "@/components/ui/loading";
import SearchBar from "@/components/search-bar";

export default function Home({
  searchParams,
}: {
  searchParams: { page?: string; q?: string; category?: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const limit = 6;
  const query = searchParams.q || "";
  const categoryId = searchParams.category || "";

  return (
    <div className="container py-8 md:py-12">
      <div className="space-y-6 pb-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {query
            ? `検索結果: ${query}`
            : categoryId
            ? "カテゴリ別記事"
            : "最新の記事"}
        </h1>
        <div className="max-w-md">
          <SearchBar />
        </div>
      </div>
      <Suspense
        fallback={
          <div>
            <p className="text-muted-foreground mb-6">
              {query
                ? `"${query}" に一致する記事を検索中...`
                : categoryId
                ? "カテゴリの記事を読み込み中..."
                : "記事を読み込み中..."}
            </p>
            <Loading text="記事を読み込み中..." />
          </div>
        }
      >
        <BlogPostsContent
          page={page}
          limit={limit}
          query={query}
          categoryId={categoryId}
        />
      </Suspense>
    </div>
  );
}

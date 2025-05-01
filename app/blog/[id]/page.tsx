import { Suspense } from "react";
import { BlogDetail } from "@/components/blog-detail";
import { Loading } from "@/components/ui/loading";

type Props = {
  params: {
    id: string;
  };
};

export default function BlogDetailPage({ params }: Props) {
  return (
    <Suspense fallback={<Loading text="記事を読み込み中..." />}>
      <BlogDetail id={params.id} />
    </Suspense>
  );
}

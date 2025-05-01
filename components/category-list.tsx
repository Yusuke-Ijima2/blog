"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { CategoryResponse } from "@/lib/microcms";

type CategoryListProps = {
  categories: CategoryResponse;
};

export default function CategoryList({ categories }: CategoryListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  const handleCategoryClick = (categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (currentCategory === categoryId) {
      params.delete("category");
    } else {
      params.set("category", categoryId);
    }

    params.delete("page");
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">カテゴリー</h2>
      <div className="flex flex-wrap gap-2">
        {categories.contents.map((category) => (
          <Badge
            key={category.id}
            variant={currentCategory === category.id ? "default" : "secondary"}
            className={cn(
              "cursor-pointer select-none transition-all duration-200",
              currentCategory === category.id
                ? "hover:bg-primary/90 scale-105"
                : "hover:bg-secondary/80"
            )}
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.name}
          </Badge>
        ))}
      </div>
    </div>
  );
}

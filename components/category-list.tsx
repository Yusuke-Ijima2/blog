'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import { Category } from '@/lib/microcms';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

export default function CategoryList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category');
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('/api/categories');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setCategories(data.contents);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('カテゴリーの読み込みに失敗しました。後でもう一度お試しください。');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (currentCategory === categoryId) {
      params.delete('category');
    } else {
      params.set('category', categoryId);
    }
    
    params.delete('page');
    router.push(`/?${params.toString()}`);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">カテゴリー</h2>
        <div className="flex flex-wrap gap-2">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="h-6 w-20 animate-pulse rounded-full bg-secondary"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">カテゴリー</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
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
import { createClient } from 'microcms-js-sdk';

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required');
}

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

export type Category = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

export type CategoryResponse = {
  contents: Category[];
  totalCount: number;
  offset: number;
  limit: number;
};

export type Blog = {
  id: string;
  title: string;
  content: string;
  eyecatch?: {
    url: string;
    height: number;
    width: number;
  };
  category?: Category;
  tags?: string[];
  publishedAt: string;
  revisedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type BlogResponse = {
  contents: Blog[];
  totalCount: number;
  offset: number;
  limit: number;
};

export const getBlogList = async (options?: {
  offset?: number;
  limit?: number;
  q?: string;
  filters?: string;
}) => {
  const data = await client.get<BlogResponse>({
    endpoint: 'blogs', // Changed from 'blog' to 'blogs' as this is a more common convention
    queries: {
      offset: options?.offset || 0,
      limit: options?.limit || 10,
      q: options?.q,
      filters: options?.filters,
      fields: 'id,title,eyecatch,publishedAt,category,tags',
    },
  });
  
  return data;
};

export const getBlogDetail = async (contentId: string) => {
  try {
    const data = await client.get<Blog>({
      endpoint: 'blogs',
      contentId,
    });
    return data;
  } catch (error) {
    console.error('Error fetching blog detail:', error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const data = await client.get<CategoryResponse>({
      endpoint: 'categories',
    });
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};
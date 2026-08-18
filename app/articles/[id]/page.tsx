import { notFound } from "next/navigation";
import { getArticleById } from "@/lib/data";
import ArticleDetailPage from "@/components/ArticleDetailPage";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const article = getArticleById(id);
  if (!article) return { title: "Article Not Found | TakeCare" };
  return {
    title: `${article.title} | TakeCare Clinical Insights`,
    description: article.summary,
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { id } = await params;
  const article = getArticleById(id);

  if (!article) {
    notFound();
  }

  return (
    <div className="py-6">
      <ArticleDetailPage article={article} />
    </div>
  );
}

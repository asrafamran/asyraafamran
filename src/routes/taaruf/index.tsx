import { createFileRoute } from "@tanstack/react-router";
import { getTaarufCategories } from "@/db/services/taaruf";
import type { Category } from "@/db/schema";
import {
  Heart,
  Users,
  Star,
  BookOpen,
  Target,
  Zap,
  Home,
  Briefcase,
  Smile,
} from "lucide-react";

export const Route = createFileRoute("/taaruf/")({
  ssr: false,
  loader: () => {
    return getTaarufCategories();
  },
  component: HomePage,
});

function HomePage() {
  const data = Route.useLoaderData() as Category[] | undefined;

  const getIcon = (slug: string) => {
    const icons: Record<string, React.ComponentType<{ className?: string }>> = {
      "deen-spirituality": BookOpen,
      "marriage-compatibility": Heart,
      "family-parenting": Home,
      "career-lifestyle": Briefcase,
      "personality-habits": Smile,
      funny: Zap,
      random: Star,
      "deep-reflective": BookOpen,
      "daily-life": Home,
      hypothetical: Target,
    };
    return icons[slug] || Users;
  };

  return (
    <div className="p-7">
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold text-emerald-900">
            Taaruf Questions
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Discover meaningful questions to know each other better. Select a
            category below to get a random question.
          </p>
        </div>

        {/* Categories Grid */}
        {data && data.length > 0 ? (
          <div className="grid max-w-4xl grid-cols-2 gap-3 mx-auto sm:grid-cols-2 lg:grid-cols-3">
            {data.map((category) => {
              const Icon = getIcon(category.slug);
              return (
                <a
                  key={category.slug}
                  href={`/taaruf/${category.slug}`}
                  className="flex flex-col items-center p-6 text-center transition-all duration-200 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-emerald-500"
                >
                  <Icon className="w-8 h-8 mb-3 text-emerald-600" />
                  <h2 className="text-lg font-semibold text-emerald-800">
                    {category.name}
                  </h2>
                </a>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-gray-500">No categories found.</div>
        )}
      </div>
    </div>
  );
}

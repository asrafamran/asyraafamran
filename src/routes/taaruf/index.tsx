import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const Route = createFileRoute("/taaruf/")({
  component: HomePage,
});

// Category emoji icons
const categoryIcons: Record<string, string> = {
  faith: "🕌",
  lifestyle: "💫",
  family: "👨👩👧👦",
  goals: "🎯",
  values: "💎",
};

// Fetch categories
async function fetchCategories() {
  const res = await fetch("/api/taaruf/categories");
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

// Fetch random question
async function fetchRandomQuestion(categorySlug: string) {
  const res = await fetch(`/api/taaruf/random?category=${categorySlug}`);
  if (!res.ok) throw new Error("Failed to fetch question");
  return res.json();
}

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Fetch categories
  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // Fetch random question when category is selected
  const {
    data: questionData,
    isLoading: questionLoading,
    refetch: refetchQuestion,
    isFetching,
  } = useQuery({
    queryKey: ["randomQuestion", selectedCategory],
    queryFn: () => fetchRandomQuestion(selectedCategory!),
    enabled: !!selectedCategory,
  });

  const categories = categoriesData?.categories ?? [];

  return (
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
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-center text-gray-800">
          Choose a Category
        </h2>

        {categoriesLoading ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-24 bg-gray-200 animate-pulse rounded-xl"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {categories.map((category: any) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className={`
                  p-4 rounded-xl border-2 transition-all duration-200
                  flex flex-col items-center gap-2
                  hover:shadow-lg hover:scale-105
                  ${
                    selectedCategory === category.slug
                      ? "border-emerald-500 bg-emerald-50 shadow-md"
                      : "border-gray-200 bg-white hover:border-emerald-300"
                  }
                `}
              >
                <span className="text-3xl">
                  {categoryIcons[category.slug] || "❓"}
                </span>
                <span className="text-sm font-medium text-gray-800">
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Question Display */}
      {selectedCategory && (
        <div className="mt-8">
          <div className="p-6 bg-white border shadow-lg rounded-2xl border-emerald-100 md:p-8">
            {questionLoading ? (
              <div className="py-8 text-center">
                <div className="inline-block w-8 h-8 border-4 rounded-full border-emerald-500 border-t-transparent animate-spin" />
                <p className="mt-4 text-gray-500">Loading question...</p>
              </div>
            ) : questionData?.question ? (
              <div className="space-y-6">
                {/* Category Badge */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-full bg-emerald-100 text-emerald-800">
                    <span>{categoryIcons[selectedCategory] || "❓"}</span>
                    {questionData.category.name}
                  </span>
                </div>

                {/* Question Text */}
                <blockquote className="text-xl font-medium leading-relaxed text-gray-800 md:text-2xl">
                  "{questionData.question.text}"
                </blockquote>

                {/* Actions */}
                <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                  <button
                    onClick={() => refetchQuestion()}
                    disabled={isFetching}
                    className="flex items-center justify-center flex-1 gap-2 px-6 py-3 font-medium text-white transition-colors bg-emerald-600 rounded-xl hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isFetching ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                        Another Question
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="px-6 py-3 font-medium text-gray-700 transition-colors border border-gray-300 rounded-xl hover:bg-gray-50"
                  >
                    Change Category
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500">
                No questions available for this category.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Getting Started Hint */}
      {!selectedCategory && !categoriesLoading && categories.length > 0 && (
        <div className="text-sm text-center text-gray-500">
          👆 Click a category above to get started
        </div>
      )}
    </div>
  );
}

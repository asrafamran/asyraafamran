import { createFileRoute } from "@tanstack/react-router";
import { getRandomQuestionByCategory } from "@/db/services/taaruf";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/taaruf/$categorySlug")({
  ssr: false,
  component: CategoryPage,
});

function CategoryPage() {
  const params = Route.useParams();
  const categorySlug = params.categorySlug;
  const queryClient = useQueryClient();
  const queryKey = ["randomQuestion", categorySlug];

  const { data } = useQuery({
    queryKey,
    queryFn: async () => {
      const fn = getRandomQuestionByCategory;
      // @ts-ignore - TanStack Router server fn type inference issue
      return await fn({ data: { categorySlug } });
    },
  });

  const categoryName = categorySlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const getNewQuestion = async () => {
    // Invalidate the query to trigger a refetch with new random data
    await queryClient.invalidateQueries({ queryKey });
  };

  return (
    <div className="h-full p-6">
      <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto space-y-8 ">
        {/* Header */}
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold text-emerald-900">
            {categoryName}
          </h1>
        </div>

        {/* Question Card */}
        {data ? (
          <div className="p-8 text-center bg-white border border-gray-200 rounded-lg shadow-lg">
            <p className="text-xl font-medium text-gray-800">
              {data.questionText}
            </p>
          </div>
        ) : (
          <div className="p-8 text-center border border-gray-200 rounded-lg bg-gray-50">
            <p className="text-gray-500">
              No questions found in this category.
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <button
            onClick={getNewQuestion}
            className="px-6 py-3 text-center text-white transition-colors rounded-lg bg-emerald-600 hover:bg-emerald-700"
          >
            Get New Question
          </button>
          <a
            href="/taaruf/"
            className="px-6 py-3 text-center text-gray-700 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Back to Categories
          </a>
        </div>
      </div>
    </div>
  );
}

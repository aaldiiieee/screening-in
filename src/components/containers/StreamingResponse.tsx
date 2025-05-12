import { useState, useEffect } from "react";
import { Check, Clock, Loader2 } from "lucide-react";

type StreamingResponseItem = {
  message: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StreamingResponse = ({ data }: any) => {
  const [completedItems, setCompletedItems] = useState<number[]>([]);

  // Simulate items being completed one by one for demo purposes
  useEffect(() => {
    if (data.length === 0) return;

    const timer = setInterval(() => {
      setCompletedItems((prev) => {
        if (prev.length < data.length) {
          return [...prev, prev.length];
        }
        clearInterval(timer);
        return prev;
      });
    }, 1500);

    return () => clearInterval(timer);
  }, [data]);

  if (data.length === 0) {
    return (
      <div className="w-full max-w-lg mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-center justify-center h-24">
          <p className="text-gray-500 text-center">
            No processing data available yet...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-visible">
      <div className="w-full max-w-lg mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="font-medium text-lg mb-4 flex items-center gap-2">
          <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
          Processing Your Resume
        </h3>

        <div className="relative">
          {/* Progress bar */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 z-0"></div>

          <div className="space-y-4 relative z-10">
            {data.map((item: StreamingResponseItem, index: number) => {
              const isCompleted: boolean = completedItems.includes(index);
              const isActive: boolean = index === completedItems.length;

              return (
                <div
                  key={index}
                  className={`progress-item pl-8 py-3 relative transition-all duration-300 ${
                    isCompleted
                      ? "opacity-80"
                      : isActive
                      ? "opacity-100"
                      : "opacity-60"
                  }`}
                >
                  {/* Status indicator dot */}
                  <div
                    className={`absolute left-0 top-4 w-8 h-8 rounded-full flex items-center justify-center ${
                      isCompleted
                        ? "bg-green-100"
                        : isActive
                        ? "bg-blue-100"
                        : "bg-gray-100"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : isActive ? (
                      <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
                    ) : (
                      <Clock className="h-4 w-4 text-gray-400" />
                    )}
                  </div>

                  {/* Content */}
                  <div
                    className={`p-4 rounded-lg ${
                      isCompleted
                        ? "bg-green-50 border border-green-100"
                        : isActive
                        ? "bg-blue-50 border border-blue-100 shadow-sm"
                        : "bg-gray-50 border border-gray-100"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <p
                        className={`font-medium ${
                          isCompleted
                            ? "text-green-700"
                            : isActive
                            ? "text-blue-700"
                            : "text-gray-500"
                        }`}
                      >
                        {isCompleted
                          ? "Completed"
                          : isActive
                          ? "Processing"
                          : "Pending"}
                      </p>
                      <span className="text-xs text-gray-500">
                        Step {index + 1}/{data.length}
                      </span>
                    </div>

                    <p className="mt-1 text-gray-700">{item.message}</p>

                    {isActive && (
                      <div className="mt-2 w-full bg-blue-100 rounded-full h-1.5">
                        <div className="bg-blue-500 h-1.5 rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex justify-between text-sm">
          <span className="text-gray-500">
            {completedItems.length} of {data.length} steps completed
          </span>
          <span
            className={`font-medium ${
              completedItems.length === data.length
                ? "text-green-600"
                : "text-blue-600"
            }`}
          >
            {completedItems.length === data.length
              ? "Analysis Complete!"
              : "Analyzing..."}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StreamingResponse;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { useSession } from "@/context/AuthContext";
import { IAuthContext } from "@/types/context";
import AnalyzeImage from "@/assets/images/upload-frame.png";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, FileText, AlertCircle, CheckCircle2 } from "lucide-react";
import StreamingResponse from "@/components/containers/StreamingResponse";

const AnalyzeResumePage: React.FC = () => {
  const { token } = useSession() as IAuthContext;
  const [data, setData] = useState<{ type: string; message: any }[]>([]);
  const [resultData, setResultData] = useState<{
    resume: string;
    job_description: any;
    analysis: { title: string; improvement: string }[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobUrl, setJobUrl] = useState<string>("");
  const [coverLetter, setCoverLetter] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      console.error("Token is null or undefined");
      setError("Authentication token is missing. Please log in again.");
      return;
    }

    if (!resumeFile || !jobUrl) {
      setError("Please upload a resume file and provide a job URL.");
      return;
    }

    setError(null);
    setIsLoading(true);
    setData([]);
    setResultData(null);

    const formData = new FormData();
    formData.append("job_url", jobUrl);
    formData.append("cover_letter", coverLetter);
    formData.append("resume", resumeFile);

    try {
      // Gunakan fetch dengan opsi yang benar untuk mendukung streaming
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/analyze`,
        {
          method: "POST",
          headers: {
            Authorization: token,
          },
          body: formData,
          signal: new AbortController().signal,
        }
      );

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || response.statusText);
      }

      // Pastikan response.body ada
      if (!response.body) {
        throw new Error("ReadableStream not supported");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";

      // Fungsi untuk memproses response secara rekursif
      const processStream = async () => {
        try {
          const { value, done } = await reader.read();

          if (done) {
            console.log("Stream complete");
            return;
          }

          // Decode chunk dan tambahkan ke buffer
          const chunk = decoder.decode(value, { stream: true });
          buffer += chunk;

          // Proses semua baris lengkap
          const lines = buffer.split("\n");
          // Simpan baris terakhir (yang mungkin belum lengkap) di buffer
          buffer = lines.pop() || "";

          console.log(`Received ${lines.length} lines`);

          for (const line of lines) {
            if (!line.trim()) continue;

            try {
              console.log("Processing line:", line);
              const msg = JSON.parse(line);
              const { status, message, result, data } = msg;

              if (status === "processing") {
                console.log("Processing message:", message);
                setData((prev) => [...prev, { type: "processing", message }]);
              } else if (status === "error") {
                console.log("Error message:", message);
                setError(message);
              } else if (status === "completed") {
                console.log("Completed with data:", data || result);
                // Handle both 'data' and 'result' fields for flexibility
                setResultData(data || result);
              }
            } catch (err) {
              console.error("Failed to parse line:", line, err);
            }
          }

          // Continue processing the stream
          return processStream();
        } catch (err) {
          console.error("Error in stream processing:", err);
          setError(err instanceof Error ? err.message : String(err));
          setIsLoading(false);
        }
      };

      // Start processing the stream
      await processStream();
    } catch (error) {
      console.error("Error fetching streaming data:", error);
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setResumeFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResumeFile(e.target.files[0]);
    }
  };

  if (isLoading) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "scroll";
  }

  return (
    <MainLayout>
      {resultData ? (
        <div className="result-container p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle2 className="text-green-500 w-6 h-6" />
            <h3 className="text-2xl font-bold">Analysis Results</h3>
          </div>

          <div className="analysis-results grid md:grid-cols-2 gap-4">
            {resultData.analysis &&
              resultData.analysis.map((item, index) => (
                <div
                  key={index}
                  className="analysis-item bg-gray-50 p-4 rounded-lg border border-gray-200"
                >
                  <h4 className="font-medium text-lg mb-2 text-blue-700">
                    {item.title}
                  </h4>
                  <p className="text-gray-700">{item.improvement}</p>
                </div>
              ))}
            {(!resultData.analysis || resultData.analysis.length === 0) && (
              <p className="text-gray-500 col-span-2 p-4 bg-gray-50 rounded-lg">
                No analysis results available.
              </p>
            )}
          </div>

          <div className="raw-result mt-6">
            <details className="bg-gray-100 p-2 rounded-md">
              <summary className="font-medium cursor-pointer p-2">
                View Raw JSON Results
              </summary>
              <pre className="bg-gray-800 text-gray-200 p-4 rounded-md overflow-x-auto text-sm mt-2">
                {JSON.stringify(resultData, null, 2)}
              </pre>
            </details>
          </div>

          <Button
            onClick={() => setResultData(null)}
            className="mt-6"
            variant="outline"
          >
            Analyze Another Resume
          </Button>
        </div>
      ) : (
        <section className="md:pt-20 pt-2 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="w-full max-w-[504px] flex flex-col gap-5">
            <h1 className="text-3xl font-bold">Analyze Now!</h1>
            <h4 className="text-xl font-light font-[Outfit]">
              Upload your CV and get analysis and improvement suggestions that
              match your dream job.
            </h4>

            <form
              onSubmit={handleSubmit}
              className="font-[Outfit] flex flex-col gap-4"
            >
              <div className="form-group">
                <Label
                  htmlFor="jobUrl"
                  className="font-medium text-lg mb-2 flex items-center gap-1"
                >
                  <FileText className="w-4 h-4" /> Job URL
                </Label>
                <Input
                  type="url"
                  value={jobUrl}
                  onChange={(e) => setJobUrl(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-[48px] border-2 border-black rounded-md"
                  placeholder="https://example.com/job-posting"
                />
              </div>

              <div className="form-group">
                <Label
                  htmlFor="coverLetter"
                  className="font-medium text-lg mb-2 flex items-center gap-1"
                >
                  <FileText className="w-4 h-4" /> Cover Letter
                </Label>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="w-full h-[200px] p-2 border-2 border-black rounded-md"
                  rows={4}
                  disabled={isLoading}
                  placeholder="Include your cover letter here (optional)"
                />
              </div>

              <div
                className={`border-2 border-dashed rounded-md p-8 text-center transition-all ${
                  isDragging
                    ? "border-blue-500 bg-blue-50"
                    : resumeFile
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleFileDrop}
              >
                {resumeFile ? (
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-green-600 font-medium">
                      {resumeFile.name}
                    </p>
                    <p className="text-sm text-green-500 mt-1">
                      File is ready to upload
                    </p>
                    <button
                      type="button"
                      onClick={() => setResumeFile(null)}
                      className="mt-3 text-sm text-gray-500 hover:text-red-500"
                    >
                      Remove file
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <Upload className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-700 font-medium">
                      Click here or Drag and drop
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Only supported PDF and DOC files. Max 5 MB
                    </p>
                    <input
                      type="file"
                      id="resume-upload"
                      className="hidden"
                      onChange={handleFileSelect}
                      accept=".pdf,.doc,.docx"
                    />
                    <label
                      htmlFor="resume-upload"
                      className="inline-block mt-4 px-6 py-2 bg-gray-100 border border-gray-300 rounded-md text-blue-600 font-medium cursor-pointer hover:bg-gray-200 transition-colors"
                    >
                      Browse files
                    </label>
                  </div>
                )}
              </div>

              <Button
                size="lg"
                type="submit"
                disabled={isLoading}
                className="h-12 font-medium"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    </span>
                    Processing...
                  </span>
                ) : (
                  "Analyze The Resume"
                )}
              </Button>
            </form>

            {isLoading && data.length > 0 && <StreamingResponse data={data} />}

            {error && (
              <div className="error-message bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mt-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Error</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            )}
          </div>

          <div className="hidden md:block">
            <img
              src={AnalyzeImage}
              alt="Illustration"
              className="w-full max-w-[575px]"
            />
          </div>
        </section>
      )}
    </MainLayout>
  );
};

export default AnalyzeResumePage;

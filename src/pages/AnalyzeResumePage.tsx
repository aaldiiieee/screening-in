/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { useSession } from "@/context/AuthContext";
import { IAuthContext } from "@/types/context";
import AnalyzeImage from "@/assets/images/upload-frame.png";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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

  return (
    <MainLayout>
      <section className="md:pt-20 pt-2 flex justify-between items-center">
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
              <Label htmlFor="jobUrl" className="font-medium text-lg mb-2">
                Job Url
              </Label>
              <Input
                type="url"
                value={jobUrl}
                onChange={(e) => setJobUrl(e.target.value)}
                required
                disabled={isLoading}
                className="h-[48px] border-2 border-black rounded-md"
              />
            </div>

            <div className="form-group">
              <Label htmlFor="coverLetter" className="font-medium text-lg mb-2">
                Cover Letter:
              </Label>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="w-full h-[200px] p-2 border-2 border-black rounded-md"
                rows={4}
                disabled={isLoading}
              />
            </div>

            <div
              className={`border-2 border-dashed rounded-md p-6 text-center ${
                isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleFileDrop}
            >
              {resumeFile ? (
                <p className="text-green-600 font-medium">
                  {resumeFile.name} is ready to upload.
                </p>
              ) : (
                <>
                  <p className="text-gray-600 font-medium">
                    Click here or Drag and drop
                  </p>
                  <p className="text-sm text-gray-500">
                    Only supported PDF and DOC files. Max 5 MB
                  </p>
                  <input
                    type="file"
                    id="resume-upload"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                  <label
                    htmlFor="resume-upload"
                    className="inline-block mt-4 px-4 py-2 border border-gray-300 rounded-md text-blue-500 cursor-pointer hover:bg-gray-100"
                  >
                    Browse files
                  </label>
                </>
              )}
            </div>

            <Button
              size={"lg"}
              type="submit"
              disabled={isLoading}
              className="font-light"
            >
              {isLoading ? "Processing..." : "Analyze The Resume"}
            </Button>
          </form>

          <div className="results-section">
            <h2>Progress</h2>
            <div className="progress-container">
              {data.length === 0 && !isLoading && !resultData && (
                <p className="empty-state">Analysis output will appear here</p>
              )}

              {data.map((item, index) => (
                <div key={index} className="progress-item">
                  {item.type === "processing" && (
                    <p className="processing-message">
                      <span className="status-indicator">Processing:</span>{" "}
                      {item.message}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {resultData && (
              <div className="result-container">
                <h3>Analysis Results</h3>
                <div className="analysis-results">
                  {resultData.analysis &&
                    resultData.analysis.map((item, index) => (
                      <div key={index} className="analysis-item">
                        <h4>{item.title}</h4>
                        <p>{item.improvement}</p>
                      </div>
                    ))}
                  {(!resultData.analysis ||
                    resultData.analysis.length === 0) && (
                    <p>No analysis results available.</p>
                  )}
                </div>

                <div className="raw-result">
                  <details>
                    <summary>View Raw JSON Results</summary>
                    <pre>{JSON.stringify(resultData, null, 2)}</pre>
                  </details>
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <img
            src={AnalyzeImage}
            alt="Illustration"
            className="w-full max-w-[575px]"
          />
        </div>

        {error && (
          <div className="error-alert">
            <p>Error: {error}</p>
          </div>
        )}
      </section>
    </MainLayout>
  );
};

export default AnalyzeResumePage;

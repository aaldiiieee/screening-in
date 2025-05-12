export const analyzeResume = async (token: string) => {
 try {
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

  return response;

 } catch (error) {
  console.log("Error fetching data:", error);
 } 
}
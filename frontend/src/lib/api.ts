const API_URL = "http://localhost:3001";

export async function uploadResume(file: File) {
  const formData = new FormData();
  formData.append("resume", file);

  const response = await fetch(`${API_URL}/api/uploadResume`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload resume");
  }

  return response.json();
}

export async function startInterview(data: {
  company: string;
  role: string;
  difficulty: string;
  resume: any;
}) {
  const response = await fetch(`${API_URL}/api/startInterview`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to start interview");
  }

  return response.json();
}

export async function nextQuestion(data: {
  company: string;
  role: string;
  difficulty: string;
  answer: string;
}) {
  const response = await fetch(`${API_URL}/api/nextQuestion`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to generate next question");
  }

  return response.json();
}

export async function generateReport(conversation: any[]) {
  const response = await fetch(`${API_URL}/api/generateReport`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      conversation,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate report");
  }

  return response.json();
}
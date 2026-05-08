type FormspreeResult = {
  ok: boolean;
  message: string;
};

const missingEndpointMessage =
  "Form endpoint is not configured yet. Please add your Formspree endpoint in Cloudflare environment variables.";

export async function submitToFormspree(endpoint: string | undefined, payload: Record<string, string>): Promise<FormspreeResult> {
  if (!endpoint || endpoint.includes("your-form-id")) {
    return { ok: false, message: missingEndpointMessage };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return { ok: false, message: "Unable to send the form right now. Please call the hospital directly." };
    }

    return { ok: true, message: "Submitted successfully" };
  } catch {
    return { ok: false, message: "Network error. Please call the hospital directly." };
  }
}

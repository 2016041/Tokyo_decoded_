type RecaptchaResponse = {
  success?: boolean;
  score?: number;
};

export async function verifyRecaptcha(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret || !token) {
    if (!secret) {
      console.warn("RECAPTCHA_SECRET_KEY is not configured.");
    }
    return false;
  }

  const body = new URLSearchParams({ secret, response: token });
  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!response.ok) {
    return false;
  }

  const result = (await response.json()) as RecaptchaResponse;
  return result.success === true && typeof result.score === "number" && result.score >= 0.5;
}

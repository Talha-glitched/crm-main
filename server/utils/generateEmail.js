import OpenAI from "openai";
 
// GitHub Models Proxy configuration
const token = process.env["GITHUB_TOKEN"];       // Your GitHub-provided token
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";

// Initialize OpenAI client with custom baseURL
const openaiClient = new OpenAI({ baseURL: endpoint, apiKey: token });

/**
 * Generates an onboarding email body for a new lead
 * @param {string} clientName   - Name of the lead/client
 * @param {string} projectName  - Title of the project they are interested in
 * @param {string} details      - Additional context or description
 * @returns {Promise<string>}   - AI-generated email body
 */
export async function generateEmail(clientName, projectName, details) {
  // Craft the prompt for the model
  const prompt = `
Write a short, friendly, professional onboarding email to a client named ${clientName}. 
The email should highlight their interest in "${projectName}" and reference the following details: "${details}".
End with an encouraging note and a warm sign-off.
Respond with only the email body, without extra formatting so that it can be directly sent.
`;

  try {
    // Call the OpenAI proxy endpoint
    const response = await openaiClient.chat.completions.create({
      model,
      messages: [
        { role: "system", content: "You are a helpful assistant that writes onboarding emails." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      top_p: 1.0,
      max_tokens: 300,
    });

    // Return the generated content
    return response.choices[0].message.content.trim();
    console.log(response.choices[0].message.content.trim());
  } catch (error) {
    console.error("❌ OpenAI email generation error:", error);
    // Fallback template if AI fails
    return `Hi ${clientName},\n\nThank you for your interest in ${projectName}. Our team will be in touch shortly to assist with next steps.\n\nBest regards,\nEGS`;
  }
} 
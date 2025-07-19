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
  console.log('🤖 generateEmail called with:', { clientName, projectName, details });
  console.log('🔑 Checking GitHub token:', !!process.env.GITHUB_TOKEN);

  // Craft the prompt for the model
  const prompt = `
Write a short, friendly, professional onboarding email to a client named ${clientName}. 
The email should highlight their interest in "${projectName}" and reference the following details: "${details}".
End with an encouraging note and a warm sign-off.
Respond with only the email body, without extra formatting so that it can be directly sent no generic text should be added so it can be sent directly to the client.
`;

  try {
    console.log('🌐 Calling GitHub Models Proxy...');
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

    const generatedContent = response.choices[0].message.content.trim();
    console.log('✅ AI content generated successfully:', generatedContent.substring(0, 100) + '...');

    // Return the generated content
    return generatedContent;
  } catch (error) {
    console.error("❌ OpenAI email generation error:", error);
    console.error("❌ Error details:", {
      message: error.message,
      status: error.status,
      statusText: error.statusText,
      response: error.response?.data
    });

    // Fallback template if AI fails
    const fallbackContent = `Hi ${clientName},\n\nThank you for your interest in ${projectName}. Our team will be in touch shortly to assist with next steps.\n\nBest regards,\nEGS`;
    console.log('🔄 Using fallback email template');
    return fallbackContent;
  }
}

/**
 * Generates an update notification email body for a lead
 * @param {string} clientName   - Name of the lead/client
 * @param {string} projectName  - Title of the project they are interested in
 * @param {object} changes      - Object containing what was updated
 * @param {string} updatedBy    - Name of the person who updated the lead
 * @returns {Promise<string>}   - AI-generated email body
 */
export async function generateUpdateEmail(clientName, projectName, changes, updatedBy) {
  console.log('🤖 generateUpdateEmail called with:', { clientName, projectName, changes, updatedBy });
  console.log('🔑 Checking GitHub token:', !!process.env.GITHUB_TOKEN);

  // Create a description of changes
  const changesDescription = Object.entries(changes)
    .map(([key, value]) => `${key}: ${value}`)
    .join(', ');

  // Craft the prompt for the model
  const prompt = `
Write a short, professional update notification email to a client named ${clientName}. 
The email should inform them about updates to their lead for "${projectName}".
The following changes were made: ${changesDescription}.
The update was performed by: ${updatedBy}.
Keep it friendly and professional, assuring them that their inquiry is being actively managed.
End with a warm sign-off.
Respond with only the email body, without extra formatting so that it can be directly sent.
`;

  try {
    console.log('🌐 Calling GitHub Models Proxy for update email...');
    // Call the OpenAI proxy endpoint
    const response = await openaiClient.chat.completions.create({
      model,
      messages: [
        { role: "system", content: "You are a helpful assistant that writes professional update notification emails." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      top_p: 1.0,
      max_tokens: 300,
    });

    const generatedContent = response.choices[0].message.content.trim();
    console.log('✅ Update email content generated successfully:', generatedContent.substring(0, 100) + '...');

    // Return the generated content
    return generatedContent;
  } catch (error) {
    console.error("❌ OpenAI update email generation error:", error);
    console.error("❌ Error details:", {
      message: error.message,
      status: error.status,
      statusText: error.statusText,
      response: error.response?.data
    });

    // Fallback template if AI fails
    const fallbackContent = `Hi ${clientName},\n\nWe wanted to let you know that your inquiry for ${projectName} has been updated. Our team is actively working on your request and will keep you informed of any progress.\n\nBest regards,\nEGS Team`;
    console.log('🔄 Using fallback update email template');
    return fallbackContent;
  }
} 
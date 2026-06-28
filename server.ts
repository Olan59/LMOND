import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Body parser
app.use(express.json());

// Lazy-loaded Gemini client to prevent server crash if API key is not present initially
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is required to access AI features.');
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// ==========================================
// API Endpoints
// ==========================================

// 1. Skincare Assistant / Chatbot
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { messages, skinProfile } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: 'Messages array is required.' });
      return;
    }

    const ai = getGeminiClient();
    
    // Construct skin profile context if provided
    let profileContext = '';
    if (skinProfile) {
      profileContext = `The user has the following skin profile:
- Skin Type: ${skinProfile.skinType || 'Unknown'}
- Main Concerns: ${skinProfile.concerns?.join(', ') || 'None specified'}
- Age Range: ${skinProfile.age || 'Unknown'}
- Goals: ${skinProfile.goals?.join(', ') || 'None specified'}
Please tailor your advice specifically to this profile if relevant.`;
    }

    const systemInstruction = `You are the LMOND Skincare Consultant, a highly professional, clinical, elegant, and empathetic AI Skincare Expert. You provide scientifically-backed, gentle advice based on the LMOND philosophy of minimalist, clean, and highly effective formulas.
Our core ingredients are:
1. Niacinamide (Vitamin B3) - Pore refining, barrier-strengthening, oil regulation.
2. Squalane (Sugarcane derived) - Weightless hydration, bio-identical lipid lock.
3. Hyaluronic Acid (Sodium Hyaluronate) - Deep multi-weight hydration, plumping.
4. Salicylic Acid (BHA) - Deep pore exfoliation, blackhead/congestion dissolving.
5. Retinol (Vitamin A) - Collagen stimulation, rapid cellular turn-over, anti-aging.
6. Centella Asiatica (Cica) - Intense barrier repair, calming inflammation and redness.

Our featured product line:
- LMOND Refining Face Cleanser ($32) - Gentle Squalane & Cica emulsion.
- LMOND 10% Niacinamide Serum ($38) - Refines pores and strengthens barrier.
- LMOND 100% Sugarcane Squalane ($34) - Weightless hydration locking lipid.
- LMOND Salicylic Acid 2% Purifier ($36) - Targets congestion, acne, and blackheads.
- LMOND Retinol Rejuvenating Elixir ($45) - 0.5% stabilized Retinol in Squalane.
- LMOND Ceramide Barrier Restorative Cream ($42) - Healing whipped cream for compromised skin.

Keep your tone refined, luxury-focused, science-backed, and calm (no excessive excitement or emojis). Do not offer medical treatments, but provide educational advice on symptoms, active ingredients, routines, and lifestyle factors. Recommend specific LMOND products where appropriate.
${profileContext}`;

    // Map messages for Gemini Chat API
    // We can use generateContent or Chats API. Let's use simple chats or generateContent with formatting
    const prompt = messages[messages.length - 1]?.content || 'Hello';
    const history = messages.slice(0, -1).map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    const chatSession = ai.chats.create({
      model: 'gemini-3.5-flash',
      config: {
        systemInstruction,
        temperature: 0.7,
      },
      history: history as any
    });

    const response = await chatSession.sendMessage({ message: prompt });
    res.json({ content: response.text });

  } catch (error: any) {
    console.error('Chat endpoint error:', error);
    res.status(500).json({ 
      error: error.message || 'An error occurred during AI processing. Please ensure your Gemini API Key is configured.' 
    });
  }
});

// 2. Ingredient explainer & interaction checker
app.post('/api/ai/ingredient-analysis', async (req, res) => {
  try {
    const { ingredients } = req.body;
    
    if (!ingredients) {
      res.status(400).json({ error: 'Ingredients list or query is required.' });
      return;
    }

    const ai = getGeminiClient();

    const systemInstruction = `You are the LMOND Lead Formulation Scientist & Ingredient Library Director. Analyze the skincare ingredients provided by the user. 
Provide a clean, premium, science-backed response covering:
1. Scientific Name & Common Classifications.
2. Clinical Mechanism (How it works in the epidermis).
3. Primary Skin Benefits & Target Skin Concerns.
4. Synergistic Compatibilities (Ingredients that pair beautifully together to enhance efficacy).
5. Adverse Interactions (Ingredients that should NOT be layered in the same routine, explaining the scientific reason).
6. Suitability (Which skin types benefit most, and warnings/contraindications).

Maintain an elegant, clinical, authoritative yet easy-to-understand tone. Use clean markdown formatting with clear headings, lists, and bold text. No fluff or marketing hype—focus on biological science and derm-backed facts.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: `Please analyze the following skincare ingredients: ${ingredients}`,
      config: {
        systemInstruction,
        temperature: 0.3,
      }
    });

    res.json({ analysis: response.text });

  } catch (error: any) {
    console.error('Ingredient analysis error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to analyze ingredients. Check your Gemini API Key configuration.' 
    });
  }
});

// 3. Smart routine recommender wizard
app.post('/api/ai/routine', async (req, res) => {
  try {
    const { profile } = req.body;
    
    if (!profile) {
      res.status(400).json({ error: 'Skin profile details are required.' });
      return;
    }

    const ai = getGeminiClient();

    const systemInstruction = `You are the LMOND Digital Dermatologist. Based on the user's detailed skin profile (skin type, age, main concerns, goals, and routine complexity), design a personalized, luxurious, clinical-grade skincare routine.
The routine must utilize LMOND's premium product line:
1. LMOND Refining Face Cleanser (Gentle, pH 5.5, hydrating Squalane & Centella emulsion)
2. LMOND 10% Niacinamide Serum (Refines pores, controls oil, strengthens skin barrier)
3. LMOND Salicylic Acid 2% Purifier (Exfoliates inside pores, clears congestion/acne)
4. LMOND Retinol Rejuvenating Elixir (0.5% stabilized Retinol in Squalane for line smoothing and dark spots)
5. LMOND 100% Sugarcane Squalane (Weightless, bio-identical lipid hydration lock)
6. LMOND Ceramide Barrier Restorative Cream (Rich soothing, lipid-restoring whipped barrier rescue)

Your response must be returned in highly structured markdown. Provide:
- A compassionate skin assessment (explaining why they are experiencing their symptoms).
- A detailed Morning (AM) Routine step-by-step with application instructions.
- A detailed Evening (PM) Routine step-by-step with application instructions, emphasizing proper ingredient sequencing and safety warnings.
- The scientific reasoning behind your recommended pairings.
- Essential lifestyle and dietary recommendations to support their skin goals from within.

Keep the advice clean, modern, and deeply professional. Avoid overly dramatic claims, focusing instead on molecular synergy and epidermal barrier protection.`;

    const prompt = `Formulate a skincare routine for this profile:
- Skin Type: ${profile.skinType}
- Age Group: ${profile.age}
- Primary Skin Concerns: ${profile.concerns?.join(', ') || 'General maintenance'}
- Key Skin Goals: ${profile.goals?.join(', ') || 'Healthy glow'}
- Routine Complexity: ${profile.complexity || 'Standard'} (number of steps they prefer)
- Daily Budget: ${profile.budget || 'Flexible'}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.5,
      }
    });

    res.json({ recommendation: response.text });

  } catch (error: any) {
    console.error('Routine recommendation error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to generate routine recommendation. Verify your Gemini API Key.' 
    });
  }
});

// ==========================================
// Vite Dev Server / Static Ingress
// ==========================================

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`LMOND Server successfully running on http://localhost:${PORT}`);
  });
}

startServer();

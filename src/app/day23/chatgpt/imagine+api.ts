import OpenAi from "openai";

const OPEN_AI_KEY = process.env.OPEN_AI_KEY;

const openai = new OpenAi({ apiKey: OPEN_AI_KEY })

export async function POST(request: Request) {
    const body = await request.json()

    const response = await openai.images.generate({
        prompt: body.prompt,
        model: "dall-e-3",
        n: 1,
        size:"1024x1024"
    });

    return Response.json(response);
}

export async function GET(request: Request) {
    
    return Response.json({ hello: 'world' });
}
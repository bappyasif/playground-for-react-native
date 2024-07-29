import OpenAi from "openai";

const OPEN_AI_KEY = process.env.OPEN_AI_KEY;

const openai = new OpenAi({ apiKey: OPEN_AI_KEY })

export async function POST(request: Request) {
    const body = await request.json()

    const completion = await openai.chat.completions.create({
        messages: body,
        // messages: [
        //     { "role": "system", "content": "You are a helpful assistant." },
        //     { "role": "user", "content": "Who won the world series in 2020?" },
        //     { "role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020." },
        //     { "role": "user", "content": "Where was it played?" }
        // ],
        model: "gpt-4o-mini",
    });

    console.log(completion.choices[0]);

    return Response.json(completion);
}

export async function GET(request: Request) {
    
    return Response.json({ hello: 'world' });
}
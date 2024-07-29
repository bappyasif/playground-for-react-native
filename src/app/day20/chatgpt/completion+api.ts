const OPEN_AI_KEY = process.env.OPEN_AI_KEY;

export function GET(request: Request) {
    return Response.json({ hello: 'world' });
}
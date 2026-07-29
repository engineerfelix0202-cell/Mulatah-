import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return Response.json({ error: "Prompt is required" }, { status: 400 });
    }

    const output = await replicate.run(
      "black-forest-labs/flux-schnell",
      {
        input: {
          prompt: prompt,
          aspect_ratio: "1:1",
        },
      }
    );

    return Response.json({ image: output[0] });
    
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to generate image" }, { status: 500 });
  }
}

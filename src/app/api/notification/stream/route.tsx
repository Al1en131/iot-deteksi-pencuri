export async function GET(request: Request) {
  const encoder = new TextEncoder();

  let interval: NodeJS.Timeout;

  const stream = new ReadableStream({
    start(controller) {
      const sendData = () => {
        const now = new Date().toISOString();
        const data = `data: ${JSON.stringify({ time: now })}\n\n`;
        controller.enqueue(encoder.encode(data));
      };

      sendData(); 

      interval = setInterval(() => {
        sendData();
      }, 5000);
    },

    cancel() {
      clearInterval(interval); 
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

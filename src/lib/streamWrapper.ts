import { Context } from 'hono';
import { stream } from 'hono/streaming';

// Stream wrapper function

export async function streamWrapper(c: Context, asyncFunction: (stream: any) => Promise<void>, intervalSeconds: number = 60, maxEvents: number = 10) {
  return stream(c, async (stream) => {
    let isAborted = false;

    stream.onAbort(() => {
      console.log('Stream aborted!');
      isAborted = true;
    });

    let counter = 0;
    while (!isAborted && counter < maxEvents) {
      try {
        if (!isAborted) {
          counter++;
          await asyncFunction(stream);
        }
        await new Promise(resolve => setTimeout(resolve, intervalSeconds * 1000))
      } catch (error) {
        console.error('Error in streamWrapper:', error)
        isAborted = true
      }
    }
  })
}

import { Context } from 'hono';
import { stream } from 'hono/streaming';

// Stream wrapper function

export async function streamWrapper(c: Context, asyncFunction: (stream: any) => Promise<void>, interval: number = 60000, maxEvents: number = 10) {
  return stream(c, async (stream) => {
    let isAborted = false;

    stream.onAbort(() => {
      console.log('Stream aborted!');
      isAborted = true;
    });

    let counter = 0;
    while (!isAborted && counter < maxEvents) {
      if (!isAborted) {
        counter++;
        await asyncFunction(stream);
      }
      await new Promise(resolve => setTimeout(resolve, interval)); // Sleep for 1 second
    }
  });
}

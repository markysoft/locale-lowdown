
// Helper function for datastar SSE events
export async function patchElement(stream: any, elements: string) {
  const encoder = new TextEncoder()
  const sseMessage = `event: datastar-patch-elements\ndata: elements ${elements}\n\n`
  await stream.write(encoder.encode(sseMessage))
}

export async function patchTag(stream: any, tag: string, value: string) {
  const encoder = new TextEncoder()
  const sseMessage = `event: datastar-patch-elements\ndata: selector ${tag}\ndata: elements <${tag}>${value}</${tag}>\n\n`
  await stream.write(encoder.encode(sseMessage))
}

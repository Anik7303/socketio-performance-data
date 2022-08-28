export function handleDisconnect(id: string, _reason: string): void {
  console.log(`[server] ${id} disconnected`);
}

export function handleDisconnecting(id: string, _reason: string): void {
  console.log(`[server] ${id} disconnecting`);
}

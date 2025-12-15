from fastapi import WebSocket, WebSocketDisconnect

class WSManager:
  def __init__(self):
    self.clients: set[WebSocket] = set()

  async def connect(self, ws: WebSocket):
    await ws.accept()
    self.clients.add(ws)
    await ws.send_json({"type": "welcome", "msg": "WS conectado ✅"})

  def disconnect(self, ws: WebSocket):
    self.clients.discard(ws)

  async def broadcast(self, payload: dict):
    dead = []
    for c in list(self.clients):
      try:
        await c.send_json(payload)
      except Exception:
        dead.append(c)
    for d in dead:
      self.clients.discard(d)

ws_manager = WSManager()

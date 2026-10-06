import { Hono } from "hono";
import type { Context } from "hono";

type Bindings = { DB: D1Database };
const app = new Hono<{ Bindings: Bindings }>();

app.get("/api/health", (c) => c.json({ status: "healthy", api: "operational" }));

app.get("/api/projects", async (c) => {
  const { results } = await c.env.DB.prepare(
    "SELECT id AS _id, title, description, tech, link FROM projects ORDER BY id DESC",
  ).all<{ tech: string | null }>();
  return c.json(
    results.map((p) => {
      let tech: string[] = [];
      try { tech = p.tech ? JSON.parse(p.tech) : []; } catch { tech = []; }
      return { ...p, tech };
    }),
  );
});

const saveContact = async (c: Context<{ Bindings: Bindings }>) => {
  let body: { name?: unknown; email?: unknown; message?: unknown };
  try { body = await c.req.json(); } catch { return c.json({ message: "Invalid JSON" }, 400); }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !email || !message || message.length > 2000 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return c.json({ message: "Invalid input" }, 400);
  }

  await c.env.DB.prepare("INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)")
    .bind(name, email, message)
    .run();
  return c.json({ success: true }, 201);
};

app.post("/api/contact", saveContact);
app.post("/api/contact/submit", saveContact);

export default app;

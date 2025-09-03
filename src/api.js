const API = import.meta.env.VITE_API_URL || 'http://localhost:8080';

async function handle(res) {
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export function getNotes() {
  return fetch(`${API}/api/notes`).then(handle);
}

export function getNote(id) {
  return fetch(`${API}/api/notes/${id}`).then(handle);
}

export function createNote(note) {
  return fetch(`${API}/api/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note)
  }).then(handle);
}

export function updateNote(id, note) {
  return fetch(`${API}/api/notes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note)
  }).then(handle);
}

export function deleteNote(id) {
  return fetch(`${API}/api/notes/${id}`, { method: 'DELETE' }).then(() => {});
}

export function getPublicNote(slug) {
  return fetch(`${API}/api/public/${slug}`).then(handle);
}

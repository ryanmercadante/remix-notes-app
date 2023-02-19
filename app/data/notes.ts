import fs from 'fs/promises'

export type Note = {
  id: string;
  title: string;
  content: string;
}

export async function getStoredNotes() {
  const rawFileContent = await fs.readFile('notes.json', { encoding: 'utf8' })
  const data = JSON.parse(rawFileContent)
  const storedNotes: Array<Note> = data.notes ?? []
  return storedNotes
}

export function storeNotes(notes: Array<Note>) {
  return fs.writeFile('notes.json', JSON.stringify({ notes: notes || [] }))
}
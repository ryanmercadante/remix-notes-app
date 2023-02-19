import type {
  ActionFunction,
  LinksFunction,
  LoaderFunction,
} from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import NewNote, { links as newNoteLinks } from "~/components/NewNote";
import NoteList, { links as noteListLinks } from "~/components/NoteList";
import type { Note } from "~/data/notes";
import { getStoredNotes, storeNotes } from "~/data/notes";

type LoaderData = {
  notes: Array<Note>;
};

export default function NotesPage() {
  const data = useLoaderData() as LoaderData;

  return (
    <main>
      <NewNote />
      <NoteList notes={data.notes} />
    </main>
  );
}

export const loader: LoaderFunction = async () => {
  const notes = await getStoredNotes();
  return json<LoaderData>({ notes });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData);
  // Add validation...
  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updatedNotes = existingNotes.concat(noteData as Note);
  await storeNotes(updatedNotes);
  return redirect("/notes");
};

export const links: LinksFunction = () => [
  ...newNoteLinks(),
  ...noteListLinks(),
];

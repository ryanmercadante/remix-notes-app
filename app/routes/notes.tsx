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

export type ActionData = {
  errors?: {
    title?: string;
    content?: string;
  };
};

export default function NotesPage() {
  const { notes } = useLoaderData() as LoaderData;

  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}

export const loader: LoaderFunction = async () => {
  const notes = await getStoredNotes();
  return json<LoaderData>({ notes });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const id = new Date().toISOString();
  const title = formData.get("title");
  const content = formData.get("content");

  if (typeof title !== "string" || title.trim().length < 3) {
    return json<ActionData>(
      { errors: { title: "Title must be at least 3 characters long" } },
      { status: 400 }
    );
  }

  if (typeof content !== "string" || content.trim().length < 3) {
    return json<ActionData>(
      { errors: { content: "Content must be at least 3 characters long" } },
      { status: 400 }
    );
  }

  const note: Note = { id, title, content };

  const existingNotes = await getStoredNotes();
  const updatedNotes = existingNotes.concat(note);
  await storeNotes(updatedNotes);
  return redirect("/notes");
};

export const links: LinksFunction = () => [
  ...newNoteLinks(),
  ...noteListLinks(),
];

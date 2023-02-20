import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import type { Note } from "~/data/notes";
import { getStoredNotes } from "~/data/notes";

import styles from "~/styles/note-details.css";

type LoaderData = {
  note: Note;
};

type LoaderDataNotFound = {
  message: string;
};

export default function NoteDetailsPage() {
  const data = useLoaderData() as LoaderData;

  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all Notes</Link>
        </nav>
        <h1>{data.note.title}</h1>
      </header>
      <p id="note-details-content">{data.note.content}</p>
    </main>
  );
}

export const loader: LoaderFunction = async ({ params }) => {
  const notes = await getStoredNotes();
  const selectedNote = notes.find((n) => n.id === params.noteId);
  if (!selectedNote) {
    throw json<LoaderDataNotFound>(
      { message: `Could not find note with id ${params.noteId}` },
      { status: 404, statusText: "Note not found." }
    );
  }
  return json<LoaderData>({ note: selectedNote });
};

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

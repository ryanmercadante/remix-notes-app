import type { LinksFunction } from "@remix-run/node";
import NewNote, { links as newNoteLinks } from "~/components/NewNote";

export default function NotesPage() {
  return (
    <main>
      <NewNote />
    </main>
  );
}

export const links: LinksFunction = () => [...newNoteLinks()];

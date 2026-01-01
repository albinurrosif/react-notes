import { NotebookIcon } from 'lucide-react';
import { Link } from 'react-router';

function NotesNotfound() {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      <div className="bg-primary/10 rounded-full p-8">
        <NotebookIcon className="size-10 text-primary" />
      </div>
      <h2 className="text-2xl font-bold">No notes yet</h2>
      <p className="text-base-content/70 mt-2">Create your first note to get started.</p>
      <Link to="/create" className="btn btn-primary hover:scale-125 transition-all duration-200">
        Create New Note
      </Link>
    </div>
  );
}

export default NotesNotfound;

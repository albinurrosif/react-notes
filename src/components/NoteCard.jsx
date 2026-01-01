import React from 'react';
import { Link } from 'react-router';
import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import { formatDate } from '../lib/utils.js';
import api from '../lib/axios.js';
import toast from 'react-hot-toast';
import { confirmToast } from '../lib/confirmToast.jsx';

function NoteCard({ note, setNotes }) {
  const handleDelete = async (e, id) => {
    e.preventDefault();
    console.log('Delete note with id:', id);

    const ok = await confirmToast('Delete this note? This action cannot be undone.');
    if (!ok) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success('Note deleted successfully');
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.log(error);

      const status = error.response?.status;
      const message = error.response?.data?.message || 'Something went wrong';

      if (status === 404) {
        toast.error('Note not found');
      } else if (status === 500) {
        toast.error('Server error. Please try again later.');
      } else {
        toast.error(message);
      }
    }
  };

  return (
    <div className="card bg-base-100 shadow-2xl active:scale-95 transition-all duration-200 rounded-lg relative">
      <div className="absolute inset-x-0 top-0 h-1 bg-primary rounded-t-lg" />
      <Link to={`/note/${note.id}`}>
        <div className="card-body">
          <h2 className="card-title text-base-content text-lg font-bold mb-2">{note.title}</h2>
          <div className="relative">
            <p className="text-base-content whitespace-pre-wrap max-h-60 overflow-hidden wrap-break-word">{note.content}</p>
          </div>
          <div className="card-actions justify-between items-center mt-2">
            <span className="text-sm text-secondary">{formatDate(note.createdAt)}</span>
            <div className="flex items-center gap-3">
              <PenSquareIcon className="text-base-content hover:scale-125 active:scale-95 transition-all duration-200 size-5" />

              <Trash2Icon onClick={(e) => handleDelete(e, note.id)} className="text-error hover:scale-125 active:scale-95 transition-all duration-200 size-5" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default NoteCard;

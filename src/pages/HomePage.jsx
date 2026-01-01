import { useState } from 'react';
import { useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import RateLimitedUI from '../components/RateLimitedUI.jsx';
import toast from 'react-hot-toast';
import NoteCard from '../components/NoteCard.jsx';
import NotesNotfound from '../components/NotesNotfound.jsx';
import api from '../lib/axios.js';
import { LoaderIcon, PlusIcon } from 'lucide-react';
import { Link } from 'react-router';

function HomePage() {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get('/notes');
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log('Error fetching notes');
        console.log(error.response);

        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error('Failed to load notes');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  if (isRateLimited) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <RateLimitedUI />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 py-6">
        <div className="flex justify-end">
          <Link to="/create" className="hover:scale-110 active:scale-95 transition-all duration-200 btn btn-primary btn-sm sm:btn-md">
            <PlusIcon className="size-4 sm:size-5" />
            <span>New Note</span>
          </Link>
        </div>
        {notes.length === 0 ? (
          <NotesNotfound />
        ) : (
          <div
            className="
    mt-6
    columns-2
    md:columns-3
    lg:columns-4
    gap-3
  "
          >
            {notes.map((note) => (
              <div key={note.id} className="mb-3 break-inside-avoid">
                <NoteCard note={note} setNotes={setNotes} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;

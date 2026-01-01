import { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router';
import api from '../lib/axios.js';
import toast from 'react-hot-toast';
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react';
import { confirmToast } from '../lib/confirmToast.jsx';
import { useRef } from 'react';

function NoteDetailPage() {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);

const textareaRef = useRef(null);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log(error);

        const status = error.response?.status;
        const message = error.response?.data?.message || 'Something went wrong';

        if (status === 404) {
          toast.error('Note not found');
          navigate('/');
        } else if (status === 429) {
          setIsRateLimited(true);
        } else if (status === 500) {
          toast.error('Server error. Please try again later.');
        } else {
          toast.error(message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  useEffect(() => {
    if (note?.content && textareaRef.current) {
      resizeTextarea(textareaRef.current);
    }
  }, [note?.content]);


  const handleDelete = async () => {
    const ok = await confirmToast('Delete this note? This action cannot be undone.');
    if (!ok) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success('Note deleted successfully');
      navigate('/');
    } catch (error) {
      console.log(error);

      const status = error.response?.status;
      const message = error.response?.data?.message || 'Something went wrong';

      if (status === 404) {
        toast.error('Note not found');
        navigate('/');
      } else if (status === 500) {
        toast.error('Server error. Please try again later.');
      } else {
        toast.error(message);
      }
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error('Title and Content are required', { duration: 5000 });
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, { title: note.title, content: note.content });
      toast.success('Note updated successfully');
      navigate('/');
    } catch (error) {
      console.log(error);

      const status = error.response?.status;
      const message = error.response?.data?.message || 'Something went wrong';

      if (status === 404) {
        toast.error('Note not found');
        navigate('/');
      } else if (status === 500) {
        toast.error('Server error. Please try again later.');
      } else {
        toast.error(message);
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  const resizeTextarea = (el) => {
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 1000) + 'px';
  };


  const handleContentChange = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 1000) + 'px';
    setNote({ ...note, content: e.target.value });
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="size-5" />
              Back to Notes
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outlined hover:scale-110 active:scale-95 transition-all duration-200">
              <Trash2Icon className="size-5 mr-2" />
              Delete Notes
            </button>
          </div>
          <div className="card bg-base-300 shadow-lg">
            <div className="card-body">
              <fieldset className="fieldset mb-4">
                <legend className="fieldset-legend" htmlFor="title">
                  Title
                </legend>

                <input id="title" type="text" maxLength={80} placeholder="Note Title" className="input w-full" value={note.title} onChange={(e) => setNote({ ...note, title: e.target.value })} />
                <p className="text-sm text-right text-base-content/60">{note.title.length}/80</p>
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend" htmlFor="content">
                  Content
                </legend>

                <textarea ref={textareaRef} id="content" maxLength={5000} placeholder="Note Content" className="textarea w-full overflow-y-auto" value={note.content} onChange={handleContentChange}></textarea>
                <p className="text-sm text-right text-base-content/60">{note.content.length}/5000</p>
              </fieldset>

              <div className="card-actions justify-end mt-4 sticky bottom-0 bg-base-300 py-2">
                <button className="btn btn-primary hover:scale-110 active:scale-95 transition-all duration-200" disabled={saving} onClick={handleSave}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteDetailPage;

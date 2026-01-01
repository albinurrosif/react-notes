import React from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowLeftIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../lib/axios.js';

function CreatePage() {
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error('Title and Content are required', { duration: 5000 });
      return;
    }

    setLoading(true);

    try {
      await api.post('/notes', { title, content });
      toast.success('Note created successfully');

      navigate('/');
    } catch (error) {
      console.log(error);

      const status = error.response?.status;
      const message = error.response?.data?.message || 'Something went wrong';

      if (status === 429) {
        toast.error('Too many requests. Please try again later.', { duration: 5000, icon: '⏳' });
      } else if (status === 400) {
        toast.error(`Bad request: ${message}`);
      } else if (status === 500) {
        toast.error('Server error. Please try again later.');
      } else {
        toast.error(message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleContentChange = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 1000) + 'px';
    setContent(e.target.value);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="btn btn-ghost mb-6 active:scale-95">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>
          <div className="card bg-base-300 shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create a New Note</h2>
              <form onSubmit={handleSubmit}>
                <fieldset className="fieldset mb-4">
                  <legend className="fieldset-legend" htmlFor="title">
                    Title
                  </legend>

                  <input id="title" type="text" maxLength={80} placeholder="Note Title" className="input w-full" value={title} onChange={(e) => setTitle(e.target.value)} />
                  <p className="text-sm text-right text-base-content/60">{title.length}/80</p>
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend" htmlFor="content">
                    Content
                  </legend>

                  <textarea
                    id="content"
                    maxLength={5000}
                    placeholder="Write your note..."
                    className="textarea
    w-full
    
    overflow-y-auto
  "
                    value={content}
                    onChange={handleContentChange}
                  ></textarea>
                  <p className="text-sm text-right text-base-content/60">{content.length}/5000</p>
                </fieldset>

                <div className="card-actions justify-end mt-4 sticky bottom-0 bg-base-300 py-2">
                  <button type="submit" className="btn btn-primary hover:scale-110 active:scale-95 transition-all duration-200" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Note'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;

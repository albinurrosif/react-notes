import toast from 'react-hot-toast';

export function confirmToast(message = 'Are you sure?') {
  return new Promise((resolve) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <p className="font-medium">{message}</p>
          <div className="flex justify-end gap-2">
            <button
              className="btn btn-xs btn-error hover:scale-110 active:scale-95 transition-all duration-200"
              onClick={() => {
                toast.dismiss(t.id);
                resolve(true);
              }}
            >
              Yes
            </button>
            <button
              className="btn btn-xs hover:scale-110 active:scale-95 transition-all duration-200"
              onClick={() => {
                toast.dismiss(t.id);
                resolve(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        position: 'top-center',
      }
    );
  });
}

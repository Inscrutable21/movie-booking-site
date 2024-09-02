import { useRouter } from 'next/navigation';

export default function DeleteMovie() {
  const { push, back } = useRouter();
  const { id } = useRouter().query;

  const handleDelete = async () => {
    const response = await fetch(`/api/movies/${id}`, { method: 'DELETE' });
    if (response.ok) {
      push('/admin/movies');
    }
  };

  return (
    <div>
      <h1>Delete Movie</h1>
      <p>Are you sure you want to delete this movie?</p>
      <button onClick={handleDelete}>Yes, Delete</button>
      <button onClick={back}>Cancel</button>
    </div>
  );
}

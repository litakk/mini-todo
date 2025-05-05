"use client"

interface DeleteProps {
  id: number;
}

const Delete: React.FC<DeleteProps> = ({ id }) => {
  const handleDelete = async () => {
    const confirmed = confirm("Удалить этого пользователя?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        window.location.reload();
      } else {
        alert("Ошибка при удалении пользователя");
      }
    } catch (error) {
      alert("Ошибка соединения с сервером");
    }
  };
  return (
    <button
      onClick={handleDelete}
      className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
    >
      Delete
    </button>
  );
};

export default Delete;

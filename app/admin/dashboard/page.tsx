import Delete from "@/components/custom/Delete";
import Edit from "@/components/custom/Edit";
import prisma from "@/lib/prisma";

async function getUsers() {
  try {
    return await prisma.user.findMany();
  } catch (error) {
    console.error("Ошибка при загрузке пользователей:", error);
    return [];
  }
}

export default async function AdminPage() {
  const users = await getUsers();

  const usersWithPhotos = users.map((user) => ({
    ...user,
    photoUrl: `/users/${user.id}.jpg`,
  }));

  return (
    <main className="min-h-screen bg-gray-100 py-16 px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome to Admin Panel
        </h1>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {usersWithPhotos.length === 0 ? (
          <p>Пользователи не найдены</p>
        ) : (
          usersWithPhotos.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden flex flex-col"
            >
              <img
                src={user.photoUrl}
                alt={`Фото ${user.name}`}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 flex flex-col flex-1">
                <h2 className="text-lg font-semibold text-gray-900 mb-1">
                  {user.name}
                </h2>
                <p className="text-sm text-gray-600 mb-4 break-words">
                  {user.email}
                </p>
                <div className="flex gap-2 mt-auto">
                  <Edit />
                  <Delete id={user.id} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}

// app/page.tsx
import prisma from "@/lib/prisma";
import Link from "next/link";

async function getUsers() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Имитация загрузки
    return await prisma.user.findMany();
  } catch (error) {
    console.error("Ошибка при загрузке пользователей:", error);
    return [];
  }
}

export default async function Home() {
  const users = await getUsers();

  // Добавляем пути к фотографиям
  const usersWithPhotos = users.map(user => ({
    ...user,
    photoUrl: `/users/${user.id}.jpg` // Предполагаем что фото лежат в public/users/
  }));

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fdfbfb] to-[#ebedee] py-16 px-6">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {usersWithPhotos.length === 0 ? (
          <p>Пользователи не найдены</p>
        ) : (
          usersWithPhotos.map(user => (
            <div key={user.id} className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden flex flex-col">
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
                <Link href={`/product/${user.id}`} className="text-center mt-auto bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-700 transition">
                  See Detail
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
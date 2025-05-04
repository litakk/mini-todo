import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: { id: parseInt(params.id) },
    include: { author: true },
  });

  if (!post) {
    notFound();
  }

  const photoUrl = `/users/${post.id}.jpg`;

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#e9ecef] flex items-center justify-center py-16 px-4 sm:px-6">
      <div className="max-w-4xl w-full">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-2xl">
          <div className="md:flex">
            {/* Изображение */}
            <div className="md:w-1/2 h-80 md:h-auto relative overflow-hidden">
              <img
                src={photoUrl}
                alt={`Фото ${post.title}`}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white text-sm font-medium">
                  Фото автора
                </span>
              </div>
            </div>
            
            {/* Контент */}
            <div className="md:w-1/2 p-8 flex flex-col">
              <div className="flex-1">
                <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold mb-1">
                  Мебель: {post.author.name}
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {post.title}
                </h1>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  {post.content ? post.content : "Нет описания для этого продукта."}
                </p>
              </div>
              
              <div className="mt-8 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">ID: {post.id}</span>
                  <button className="px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-full hover:bg-indigo-700 transition-colors duration-300 shadow-md hover:shadow-lg">
                    Сохранить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Дополнительная информация */}
        <div className="mt-8 bg-white rounded-3xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Детали</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Статус</p>
              <p className="font-medium text-green-600">Активный</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
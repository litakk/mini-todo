interface EditProps {}

const Edit: React.FC<EditProps> = () => {
  return (
    <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
      Edit
    </button>
  );
};

export default Edit;
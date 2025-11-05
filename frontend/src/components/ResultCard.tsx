type Props = {
  id: string;
  title: string;
  content: string;
};

export default function ResultCard({ id, title, content }: Props) {
  return (
    <div className="bg-white shadow rounded p-4">
      <div className="text-sm text-gray-500">{id}</div>
      <h3 className="font-semibold mt-1">{title}</h3>
      <p className="text-sm mt-2">{content}</p>
    </div>
  );
}

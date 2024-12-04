type AddCommentProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export function AddComment({ value, onChange, onSubmit }: AddCommentProps) {
  return (
    <div className="mt-4">
      <label className="block mb-2 font-semibold">Comentar:</label>
      <textarea
        className="border border-gray-300 rounded p-2 w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={onSubmit}
      >
        Enviar
      </button>
    </div>
  );
}

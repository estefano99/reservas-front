export function SpaceSelector({ spaces, onSpaceChange }) {
  return (
    <div className="space-y-2">
      <label htmlFor="space" className="text-sm font-medium">
        Espacio
      </label>
      <select
        id="space"
        onChange={(e) => {
          const selected = spaces.find(
            (s) => s.id === parseInt(e.target.value)
          );
          onSpaceChange(selected);
        }}
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Selecciona un espacio...</option>
        {spaces.map((space) => (
          <option key={space.id} value={space.id}>
            {space.name} – {space.description}
          </option>
        ))}
      </select>
    </div>
  );
}

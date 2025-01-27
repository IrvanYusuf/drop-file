export default function SelectedCircle({ position, size, x, y, onClick, selected }) {
  // const isActive = selected.includes(position);
  const isActive = selected.some((item) => item.positions.includes(position));
  return (
    <circle
      cx={x}
      cy={y}
      r={size}
      stroke="black"
      strokeWidth={isActive ? 2 : 0}
      style={{
        fill: isActive ? '#455a64' : 'transparent',
        cursor: 'pointer',
      }}
      onClick={() => onClick(position)}
    >
      <title>{position} Item</title>
    </circle>
  );
}

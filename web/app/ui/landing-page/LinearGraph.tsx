const LinearGraph = ({ className }: { className: string }) => {
  return (
    <ul className="grid grid-cols-4 gap-2 h-32 items-end">
      {Array.from({ length: 4 }).map((_, index) => (
        <li
          key={index}
          className={`${className} rounded-xs`}
          style={{ height: `${20 + 20 * (index + 1)}%` }}
        ></li>
      ))}
    </ul>
  );
};

export default LinearGraph;

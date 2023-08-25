export const SongSkeleton = () => {
  const skeletonItems = Array.from({ length: 10 }, (_, index) => (
    <li
      key={index}
      className="flex items-center justify-between gap-x-6 py-5 animate-pulse"
    >
      <div className="min-w-0 w-full">
        <div className="flex items-start gap-x-3">
          <div className="h-5 bg-gray-200 w-3/4 rounded-sm"></div>
        </div>
        <div className="flex items-center gap-x-2 text-xs leading-5 text-gray-300 mt-2">
          <div className="h-4 bg-gray-200 w-1/4 rounded-sm"></div>
          <div className="h-4 bg-gray-200 w-1/8 rounded-sm"></div>
          <div className="h-4 bg-gray-200 w-1/4 rounded-sm"></div>
        </div>
      </div>
      <div className="flex flex-none items-center gap-x-4">
        <div className="h-8 w-8 bg-gray-200 rounded-sm"></div>
        <div className="h-8 w-24 bg-gray-200 rounded-sm"></div>
      </div>
    </li>
  ));

  return (
    <ul role="list" className="w-full h-full divide-y divide-gray-100">
      {skeletonItems}
    </ul>
  );
};

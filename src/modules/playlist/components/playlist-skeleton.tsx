export const PlaylistSkeleton = () => {
  const skeletonItems = Array.from({ length: 10 }, (_, index) => (
    <div
      key={index}
      className="flex items-center w-full justify-start font-normal space-x-2 py-2 px-2 animate-pulse"
    >
      <div className="h-16 w-16 bg-gray-200 rounded-sm"></div>
      <div className="flex flex-col space-y-2">
        <div className="h-4 bg-gray-200 w-40 rounded-md"></div>
        <div className="h-3 bg-gray-200 w-28 rounded-md"></div>
      </div>
    </div>
  ));

  return <div className="space-y-2 p-2">{skeletonItems}</div>;
};

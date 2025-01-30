const MainContent = () => {
  const albums = [
    { title: 'Album 1', artist: 'Artist 1' },
    { title: 'Album 2', artist: 'Artist 2' },
    { title: 'Album 3', artist: 'Artist 3' },
  ];

  return (
    <>
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <h1 className="text-3xl font-bold text-white">
          How are you feeling today?
        </h1>
        <form className="flex space-x-2">
          <input
            type="text"
            className="p-2 rounded-lg bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg text-white placeholder-gray-400"
            placeholder="Type something..."
          />
          <button
            type="submit"
            className="p-2 rounded-lg bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg text-white"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="flex flex-col space-y-4 p-4 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg">
        <div className="flex gap-2">
          <div className="w-32 h-32 bg-gray-300 rounded-lg animate-pulse"></div>
          <div className="w-48 h-6 bg-gray-300 rounded-lg animate-pulse"></div>
        </div>
        <div className="w-full space-y-2">
          <div className="flex gap-1">
            <div className="w-16 aspect-square bg-gray-300 rounded-lg animate-pulse"></div>
            <div className="w-full h-6 bg-gray-300 rounded-lg animate-pulse"></div>
          </div>
          <div className="w-full h-6 bg-gray-300 rounded-lg animate-pulse"></div>
          <div className="w-full h-6 bg-gray-300 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </>
  );
};

export default MainContent;

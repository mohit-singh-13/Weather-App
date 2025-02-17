const Loader = () => {
  return (
    <div className="w-[14rem] h-[14rem] mx-auto relative">
      <img src="/loading.gif" alt="loader" className="w-full h-full" />
      <p className="text-white text-lg text-center absolute left-[50%] translate-x-[-40%] bottom-0">Loading ...</p>
    </div>
  );
};

export default Loader;

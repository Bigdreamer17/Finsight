const ThreeDotsLoading = () => {
  return (
    <div className="flex items-center">
      <div className="w-2 h-2 mr-1 bg-[#27AA43] rounded-full bounce-slow"></div>
      <div
        className="w-2 h-2 mr-1 bg-[#27AA43] rounded-full bounce-slow"
        style={{ animationDelay: "0.15s" }}
      ></div>
      <div
        className="w-2 h-2 bg-[#27AA43] rounded-full bounce-slow"
        style={{ animationDelay: "0.3s" }}
      ></div>
    </div>
  );
};

export default ThreeDotsLoading;

const TopbarSkeleton = () => {
  return (
    <section className="sticky bg-[#1C1C21] z-20 top-0 left-0 right-0 w-full py-5 px-3 flex flex-col sm:flex-row items-center justify-between gap-3">
      <div className="relative w-full grow flex-1">
        <div className="relative z-0 w-full">
          <div className="h-[42px] rounded-full min-w-80 w-full bg-[#2C2C35] peer placeholder:text-[#AFAFB6] py-2 pr-4 pl-10 animate-pulse" />
        </div>
      </div>

      <div className="flex justify-between gap-3 items-center w-full sm:w-fit">
        <div className="rounded-full py-2 px-[42px] animate-pulse bg-[#2C2C35]">
          <div className="h-5 w-16"></div>
        </div>

        <div className="lg:hidden h-4 w-5 bg-[#2C2C35] animate-pulse" />
      </div>
    </section>
  );
};

export default TopbarSkeleton;

import { CiFolderOff } from "react-icons/ci";

const EmptyTable = () => {
  const description = "There doesn't seem to be relevant table data.";

  return (
    <div className="h-full min-h-80 w-full bg-[#2C2C35] border-[#AFAFB6]/40 border grid place-items-center rounded-md">
      <div className="flex flex-col items-center gap-5">
        <CiFolderOff size={100} />

        <div className="text-center flex flex-col gap-2">
          <p className="text-[13px] font-light max-w-2xl">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default EmptyTable;

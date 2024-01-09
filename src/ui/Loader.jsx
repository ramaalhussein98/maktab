import { CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <div className="flex h-full w-full justify-center items-center fixed inset-0 z-[1000] backdrop-blur-[1px]">
      <CircularProgress color="success" size={"40px"} />
    </div>
  );
};

export default Loader;

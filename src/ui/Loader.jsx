import { CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <div className="flex h-full w-full justify-center items-center absolute inset-0 ">
      <CircularProgress color="success" />
    </div>
  );
};

export default Loader;

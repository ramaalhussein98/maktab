import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const useQueryHook = (queryKey, getDataFun) => {
  const queryClient = useQueryClient();

  const { data, error, isError, isFetching, status } = useQuery({
    queryKey: queryKey,
    queryFn: getDataFun,
  });

  return {
    data,
    error,
    isError,
    isFetching,
    status,
    queryClient,
  };
};

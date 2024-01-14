import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import myAxios from "../api/myAxios";
import { filter } from "lodash";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export const useOfficeHook = ({ page = 1, filter }) => {
  const location = useLocation().pathname;
  const speacilPage = location.split("/").includes("features");
  const endpoint = speacilPage
    ? `/api/v1/user/offices/special`
    : `/api/v1/user/offices`;
  const { data, error, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ["Offices", page, filter],
    queryFn: () =>
      myAxios
        .get(endpoint, {
          params: {
            page: page,
            ...filter,
          },
        })
        .then((res) => res?.data?.data),
    config: {
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  });
  useEffect(() => {
    refetch();
  }, [speacilPage, refetch]);
  return {
    data,
    error,
    isLoading,
    refetch,
    isRefetching,
  };
};

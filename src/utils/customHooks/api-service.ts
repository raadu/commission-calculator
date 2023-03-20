import { useCallback, useState } from "react";
import { BASE_URL_ENDPOINT } from "utils/endpoints";
import axios from "axios";

export const useFetch = () => {
  const [fetchInfo, setFetchInfo] = useState<Record<string, any>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const getData = useCallback(
    async (query: string, data?: Record<string, any>) => {
      setFetchInfo((prevState) => {
        return { ...prevState, isLoading: true };
      });

      try {
        let response = await axios({
          method: "GET",
          url: `${BASE_URL_ENDPOINT}${query}`,
          data: data,
        });
        if (response) {
          setFetchInfo((prevState) => {
            return {
              ...prevState,
              data: response,
              isLoading: false,
              error: null,
            };
          });
          return response;
        }
      } catch (error) {
        if (error) {
          setFetchInfo((prevState) => {
            return { ...prevState, isLoading: false, error: error };
          });
        }
      }
    },
    [],
  );

  return [fetchInfo, getData] as const;
};

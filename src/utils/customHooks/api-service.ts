import { useCallback, useState } from "react";
import axios from "axios";

const useFetch = () => {
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
        const response = await axios({
          method: "GET",
          url: `${process.env.REACT_APP_BASE_URL_ENDPOINT}${query}`,
          data,
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
            return { ...prevState, isLoading: false, error };
          });
        }
      }

      return null;
    },
    [],
  );

  return [fetchInfo, getData] as const;
};

export default useFetch;

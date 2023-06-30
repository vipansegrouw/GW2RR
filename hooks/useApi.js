import { useEffect, useState } from 'react';

export const useApi = ({ endpoint, id }) => {
  const [isLoading, setLoading] = useState(true);
  const [output, setOutput] = useState(null);

  const getApiResponseJson = async (request) => {
    try {
      const response = await fetch(request);
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
      return null; // TODO probably the issue is here but I can't get the error to investigate
    }
  };

  useEffect(() => {
    const getFromApi = async () => {
      try {
        const url = `https://api.guildwars2.com/v2/${endpoint}/${id}`;
        const json = await getApiResponseJson(url);
        setOutput(json);
      } finally {
        setLoading(false);
      }
    };

    getFromApi();
  }, [endpoint, id]);

  return output;
};

import { useEffect, useState } from 'react';


export const useApi = ({ endpoint, id }) => {
  const [isLoading, setLoading] = useState(true);
  const [output, setData] = useState([]);

  const getApiResponseJson = async (request) => {
    return fetch(request).then(response => {
      return response.json();
    }
    );
  };

  const getFromApi = async () => {
    try {
      const url = `https://api.guildwars2.com/v2/${endpoint}/${id}`;
      const json = await getApiResponseJson(url);
      setData(json);
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFromApi();
  }, []);

  return (output);
};

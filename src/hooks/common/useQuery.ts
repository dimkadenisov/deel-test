import { useEffect, useState } from 'react';

function prepareEndpoint(url: string, variables: Record<string, string>) {
  const paramsString = new URLSearchParams(variables).toString();

  return `${url}?${paramsString}`;
}

export function useQuery<T>(url: string, variables?: Record<string, string>) {
  const endpoint = variables ? prepareEndpoint(url, variables) : url;
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    setLoading(true);
    fetch(endpoint)
      .then((res) => res.json())
      .then((res: T) => {
        return res;
      })
      .then((result) => {
        setData(result);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [endpoint]);

  return { data, loading, error };
}

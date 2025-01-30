import { useState } from 'react';

const useFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (url, method = 'GET', body = null, headers = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        // Não estamos mais disparando erro ou exibindo mensagem de erro
        return null;  // Apenas retorna null se a requisição falhar
      }

      const result = await response.json();
      setData(result);
      return result; // Retornar os dados para quem chamou
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, request };
};

export default useFetch;

import { useEffect, useState } from "react";

import { endPoints } from "../services/api";

import type { JPChar } from "../models/charsets.model";

export const useSelectCharset = (charsetName: string) => {
  const [charSet, setCharset] = useState<JPChar[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // const API = process.env.REACT_APP_API_KEY;
    const fetchData = async () => {

      const response = await fetch(endPoints(charsetName), {
        headers: {
          "X-Master-Key": `$2a$10$z1TAV4blkJ1ZIobFO9.5Auz/l8/wu4Fi3hSML.QdvhchrhiVOj9OC`,
        },
      });

      const data = await response.json();
      const newCharset = Object.keys(data.record)[0];
   
      setCharset(data.record[newCharset]);
    };
    fetchData().then(() => setIsLoading(false));
  }, [charsetName]);

  return { charSet, isLoading, error };

};
import {useState, useEffect} from 'react';
import {QueryClient} from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QUERY_CACHE_KEY = 'QUERY_CACHE';

export const usePersistedQueryClient = () => {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    const restoreCache = async () => {
      const cacheString = await AsyncStorage.getItem(QUERY_CACHE_KEY);
      if (cacheString) {
        queryClient.setQueryData(JSON.parse(cacheString));
      }
    };

    restoreCache();

    return () => {
      const saveCache = async () => {
        const cacheToSave = JSON.stringify(queryClient.getQueryData());
        await AsyncStorage.setItem(QUERY_CACHE_KEY, cacheToSave);
      };

      saveCache();
    };
  }, [queryClient]);

  return queryClient;
};

import { myTableUtilsFunc } from './utils/myTableUtils';
import { testFunction } from '../db/core/myTable';

export const coreFunctionality = async () => {
  const data = await testFunction();
  return myTableUtilsFunc(data);
};

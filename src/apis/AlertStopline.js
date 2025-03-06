import { request } from '../utils/request';

export const fetchListLean = async () => {
  const res = await request.get(`/Stopline/list-lean`);

  return res.data;
};

// Lay du lieu tuong ung voi Lean'
export const fetchDataLean = async (lean) => {
  const res = await request.get(`/Stopline/${lean}`);
  return res.data;
};

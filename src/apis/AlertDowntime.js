import { request } from '../utils/request';

export const fetchListFloorLine = async () => {
  const res = await request.get(`/Downtime/list-floor-line`);
  return res.data;
};

export const fetchDataDownTime = async (floor, line) => {
  const res = await request.get(`/Downtime?floor=${floor}&line=${line}`);
  return res.data;
};

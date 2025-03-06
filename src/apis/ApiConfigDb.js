import { request } from '../utils/request';

export const fetchProjectType = async (projectType) => {
  const res = await request.post(
    `/config/set-project-type`,
    { projectType: projectType },
    { headers: { 'Content-Type': 'application/json' } }
  );

  return res.data;
};

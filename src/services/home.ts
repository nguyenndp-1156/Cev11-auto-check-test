import axiosApp from './axiosApp';

function createCheckEstimate(data: Record<string, unknown>) {
  return axiosApp.post('/spreadsheets/checking_estimate', data);
}

export { createCheckEstimate };

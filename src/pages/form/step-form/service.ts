import request from 'umi-request';
export async function fakeSubmitform(params: any) {
  return request('/api/forms', {
    method: 'POST',
    data: params,
  });
}

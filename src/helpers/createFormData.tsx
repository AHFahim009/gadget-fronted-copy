/* eslint-disable @typescript-eslint/no-explicit-any */
const createFormData = (payload: any) => {
  console.log(payload);

  const formData = new FormData();

  if (payload.photo) {
    formData.append("photo", payload.photo);
  }
  if (payload.data) {
    formData.append("data", JSON.stringify(payload.data));
  }

  return formData;
};

export default createFormData;

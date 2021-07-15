const createToast = (response) => {
  console.log(response);
  const data = response.data;
  const toast = {
    solid: true,
    variant: 'default'
  };
  if (response.status >= 400) {
    toast.variant = 'danger';
    toast.title = data ? data.message : 'Error';
    toast.content = data ? createTextErrors(data.errors) : [];
  } else if (response.status >= 200) {
    toast.variant = 'success';
    toast.title = 'Éxito';
    toast.content = data ? data.message : 'OK';
  }
  console.log(toast);
  return toast;
};

const createTextErrors = (errors) => {
  let text = '';
  Object.keys(errors).forEach((element) => {
    const array = errors[element];
    array.forEach((e) => {
      text += e + '. ';
    });
  });
  return text;
};

export {
  createToast
};

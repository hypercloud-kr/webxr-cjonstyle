export const InputFormatter: Record<
  string,
  (e: React.ChangeEvent<HTMLInputElement>) => string
> = {};

InputFormatter.phone = e => {
  e.target.value = e.target.value.replace(/[^0-9]/g, '');
  e.target.value = e.target.value.slice(0, 11);
  if (e.target.value.length < 4) {
    return e.target.value;
  }
  if (e.target.value.length < 8) {
    e.target.value = e.target.value.replace(/(\d{3})(\d*)/, '$1-$2');
    return e.target.value;
  }
  e.target.value = e.target.value.replace(/(\d{3})(\d{4})(\d*)/, '$1-$2-$3');
  return e.target.value;
};

InputFormatter.date8 = e => {
  e.target.value = e.target.value.replace(/[^0-9]/g, '');
  e.target.value = e.target.value.slice(0, 8);
  if (e.target.value.length < 5) {
    return e.target.value;
  }
  if (e.target.value.length < 7) {
    e.target.value = e.target.value.replace(/(\d{4})(\d*)/, '$1.$2');
    return e.target.value;
  }
  e.target.value = e.target.value.replace(/(\d{4})(\d{2})(\d*)/, '$1.$2.$3');
  return e.target.value;
};

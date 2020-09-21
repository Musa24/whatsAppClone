const truncate = (str, length) => {
  if (str) {
    return str.split('').splice(0, length).join('') + '...';
  }
};

export default truncate;

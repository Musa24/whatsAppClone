const truncate = (str, length) => {
  if (str) {
    if (str.length > 41) {
      return str.split('').splice(0, length).join('') + '...';
    } else {
      return str.split('').splice(0, length).join('');
    }
  }
};

export default truncate;

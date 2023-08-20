const QuadSum = (props) => {
  const handleChange = (e) => {
    props.onChange(props.coords[1], props.coords[0], e.target.value);
  };

  return (
    <input
      className={props.className}
      type="number"
      value={props.quads[props.coords[1]][props.coords[0]]}
      onChange={(e) => handleChange(e)}
    />
  );
};

export default QuadSum;

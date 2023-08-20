function Square({value, color, row, col, onChange, onClick}:any) {
  const handleChange = (e) => {
    const value = e.target.value;
    onChange(row, col, value);
  };

  const handleClick = () => {
    onClick(row, col);
  };

  return (
    <td onClick={handleClick}>
      <input
        className="square"
        type="number"
        value={value}
        onChange={handleChange}
        style={{
          backgroundColor: color,
        }}
      />
    </td>
  );
}

const Grid = (props) => {
  return (
    <table className="grid">
      <tbody>
        {props.grid.map((row, i) => (
          <tr key={i}>
            {row.map((col, j) => (
              <Square
                key={j}
                value={props.grid[i][j]}
                color={props.colors[i][j]}
                row={i}
                col={j}
                onChange={props.onChange}
                onClick={props.onClick}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default Grid;

function ResumeOption(props) {
  return (
    <div className="option-container">
      <label htmlFor={props.value} className="option">
        {props.name}
        <input
          type="checkbox"
          id={props.value}
          name={props.value}
          value={props.value}
        />
        <span className="checkmark"></span>
      </label>
    </div>
  );
}

export default ResumeOption;

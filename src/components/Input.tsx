type InputProps = {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const Input: React.FC<InputProps> = ({ id, label, type, value, onChange, error }) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <label htmlFor={id} style={{ display: "block", marginBottom: "5px" }}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        required
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      {error && <div style={{ color: "red", marginTop: "5px" }}>{error}</div>}
    </div>
  );
};

export default Input;

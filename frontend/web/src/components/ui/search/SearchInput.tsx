// components/SearchInput.tsx
import React from 'react';

type CustomTextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  errorMessage?: string;
};

export function SearchInput({
  label,
  errorMessage,
  style,
  ...props
}: CustomTextInputProps){
  return (
    <div style={{ marginBottom: '10px' }}>
      {label && <label style={styles.label}>{label}</label>}
      <input
        type="text"
        style={{ ...styles.input, ...style }}
        {...props}
      />
      {errorMessage && <div style={styles.error}>{errorMessage}</div>}
    </div>
  );
};

const styles = {
  label: {
    display: 'block',
    marginBottom: '4px',
    fontSize: '14px',
    color: '#555',
  },
  input: {
    width: '100%',
    height: '40px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '0 8px',
    fontSize: '16px',
    backgroundColor: '#fff',
    color: '#000',
  },
  error: {
    marginTop: '4px',
    fontSize: '12px',
    color: 'red',
  },
} as const;

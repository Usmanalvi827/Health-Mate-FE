function Input({
  label,
  id,
  name,
  type = "text",
  placeholder,
  defaultValue,
  value,
  onChange,
  ...rest
}) {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-ink">
          {label}
        </label>
      )}
      <input
        id={id}
        name={name || id}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-ink outline-none placeholder:text-ink-soft/60 focus:border-brand focus:ring-2 focus:ring-brand-soft"
        {...rest}
      />
    </div>
  );
}

export default Input;

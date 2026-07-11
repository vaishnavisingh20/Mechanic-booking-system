"use client";

interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  onChange: (value: string) => void;
}

export default function InputField({
  label,
  type = "text",
  placeholder,
  value,
  error,
  required = false,
  disabled = false,
  autoComplete,
  onChange,
}: InputFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
        {label}
        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <input
        aria-label={label}
        type={type}
        placeholder={placeholder || `Enter ${label.toLowerCase()}`}
        value={value}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-xl border px-4 py-3 text-sm shadow-sm outline-none transition-all duration-200
                    ${error
            ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-200"
            : "border-gray-300 bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          }
                    ${disabled
            ? "cursor-not-allowed bg-gray-100 opacity-70"
            : ""
          }
                    dark:border-gray-700
                    dark:bg-gray-900
                    dark:text-white
                    dark:placeholder:text-gray-400`}
      />

      {error && (
        <p className="text-sm font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
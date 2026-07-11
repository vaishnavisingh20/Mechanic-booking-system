"use client";

import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
  loading: boolean;
  text: string;
}

export default function SubmitButton({
  loading,
  text,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      aria-label={text}
      className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-blue-400"
    >
      {loading ? (
        <>
          <Loader2
            className="mr-2 animate-spin"
            size={18}
          />
          Please wait...
        </>
      ) : (
        text
      )}
    </button>
  );
}
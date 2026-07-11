import { NextResponse } from "next/server";

export function success(
  message = "Success",
  data?: unknown,
  status = 200
) {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status }
  );
}

export function failure(
  message = "Something went wrong",
  status = 400,
  errors?: unknown
) {
  return NextResponse.json(
    {
      success: false,
      message,
      errors,
    },
    { status }
  );
}


export const error = failure;
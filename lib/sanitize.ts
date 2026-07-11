import DOMPurify from "isomorphic-dompurify";

export function sanitizeInput(value: string) {
  return DOMPurify.sanitize(value.trim());
}
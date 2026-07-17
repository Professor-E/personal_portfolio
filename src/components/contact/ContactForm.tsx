"use client";

import { useState, useId, isValidElement, cloneElement } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────
type FormState = "idle" | "loading" | "success" | "error";

interface FieldValues {
  name: string;
  email: string;
  message: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

// ── Validation ────────────────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FieldValues): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.name.trim() || values.name.trim().length < 2)
    errors.name = "Name must be at least 2 characters.";
  if (!values.email.trim() || !EMAIL_RE.test(values.email))
    errors.email = "Please enter a valid email address.";
  if (!values.message.trim() || values.message.trim().length < 10)
    errors.message = "Message must be at least 10 characters.";
  return errors;
}

// ── Shake animation (x: 0 → -8 → 8 → -4 → 4 → 0, 0.4s) ─────────────────────
const shakeVariants = {
  idle: { x: 0 },
  shake: {
    x: [0, -8, 8, -4, 4, 0],
    transition: { duration: 0.4, ease: "easeInOut" },
  },
};

// ── Reusable field wrapper ─────────────────────────────────────────────────────
interface FieldProps {
  id: string;
  label: string;
  error?: string;
  shakeKey: number;
  children: React.ReactNode;
}

function Field({ id, label, error, shakeKey, children }: FieldProps) {
  const errorId = `${id}-error`;
  return (
    <motion.div
      className="flex flex-col w-full"
      variants={shakeVariants}
      animate={error ? "shake" : "idle"}
      key={`shake-${shakeKey}`}
    >
      {/* Label — 11px uppercase, tracking-[1.6px], mb-2 */}
      <label
        htmlFor={id}
        className="font-medium mb-2"
        style={{
          fontSize: "11px",
          color: "var(--text-secondary)",
          letterSpacing: "1.6px",
          textTransform: "uppercase",
          lineHeight: "normal",
        }}
      >
        {label} *
      </label>
      {/* aria-invalid / aria-describedby are wired via cloneElement so callers
          can keep passing a plain <input>/<textarea> as children. */}
      {isValidElement(children)
        ? cloneElement(children as React.ReactElement<Record<string, unknown>>, {
            "aria-invalid": error ? "true" : undefined,
            "aria-describedby": error ? errorId : undefined,
          })
        : children}
      {/* Inline error */}
      <AnimatePresence>
        {error && (
          <motion.p
            id={errorId}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="font-medium mt-1"
            style={{ fontSize: "12px", color: "#ef4444", lineHeight: 1.3 }}
            role="alert"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Shared input base style ────────────────────────────────────────────────────
// h-12 (48px) for text inputs — achieved via explicit height on the element.
// Rest state: quiet background fill + hairline border; focus swaps to the
// surface color with an accent border + soft ring (see focusStyle below).
const inputBaseStyle: React.CSSProperties = {
  backgroundColor: "var(--background)",
  border: "1px solid var(--border)",
  borderRadius: "10px",
  padding: "0 14px",
  fontSize: "16px",
  fontFamily: "inherit",
  fontWeight: 500,
  color: "var(--text-primary)",
  lineHeight: "normal",
  outline: "none",
  width: "100%",
  height: "48px",
  transition: "border-color 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease",
};

const textareaBaseStyle: React.CSSProperties = {
  ...inputBaseStyle,
  height: "144px",   // h-36 — tall enough to read, fits viewport
  padding: "12px 14px",
  resize: "none",
};

const focusStyle: React.CSSProperties = {
  borderColor: "var(--accent)",
  backgroundColor: "var(--surface)",
  boxShadow: "0 0 0 3px color-mix(in srgb, var(--accent) 18%, transparent)",
};

// ── ContactForm ────────────────────────────────────────────────────────────────
export default function ContactForm() {
  const uid = useId();
  const [values, setValues] = useState<FieldValues>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formState, setFormState] = useState<FormState>("idle");
  // Server-provided failure detail (e.g. "Email service is not configured") —
  // shown in the error banner in place of the generic first sentence so real
  // failures are diagnosable instead of always reading "Something went wrong".
  const [serverError, setServerError] = useState<string | null>(null);
  const [shakeKey, setShakeKey] = useState(0);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  function handleChange(field: keyof FieldValues, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors = validate(values);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setShakeKey((k) => k + 1);
      return;
    }
    setFormState("loading");
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        try {
          const data = (await res.json()) as { error?: unknown };
          if (typeof data.error === "string") setServerError(data.error);
        } catch {
          // Non-JSON failure body — keep the generic banner text.
        }
        throw new Error("Server error");
      }
      setFormState("success");
    } catch {
      setFormState("error");
    }
  }

  function reset() {
    setValues({ name: "", email: "", message: "" });
    setErrors({});
    setFormState("idle");
    setServerError(null);
    setShakeKey(0);
  }

  function getInputStyle(field: string, isTextarea = false): React.CSSProperties {
    const base = isTextarea ? textareaBaseStyle : inputBaseStyle;
    return focusedField === field ? { ...base, ...focusStyle } : base;
  }

  // ── Success state ─────────────────────────────────────────────────────────
  if (formState === "success") {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="success"
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center justify-center gap-4 text-center h-full"
          style={{ minHeight: "260px" }}
        >
          <CheckCircle2
            size={48}
            style={{ color: "var(--accent)" }}
            aria-hidden="true"
          />
          <div>
            <p
              className="font-semibold text-[var(--text-primary)]"
              style={{ fontSize: "20px", lineHeight: 1.3 }}
            >
              Message sent!
            </p>
            <p
              className="font-medium text-[var(--text-secondary)] mt-2"
              style={{ fontSize: "16px", lineHeight: 1.4 }}
            >
              I&apos;ll get back to you soon.
            </p>
          </div>
          <button
            onClick={reset}
            className="font-medium transition-colors mt-2 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)]"
            style={{
              fontSize: "12px",
              color: "var(--accent)",
              letterSpacing: "1.6px",
              textTransform: "uppercase",
            }}
          >
            Send another message →
          </button>
        </motion.div>
      </AnimatePresence>
    );
  }

  // ── Normal / loading / error form ────────────────────────────────────────
  const isLoading = formState === "loading";
  const disabled = isLoading;

  return (
    <AnimatePresence mode="wait">
      <motion.form
        key="form"
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col w-full"
        style={{ gap: "20px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* ── Error banner ─────────────────────────────────────────────── */}
        <AnimatePresence>
          {formState === "error" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="font-medium"
              style={{
                fontSize: "14px",
                color: "#ef4444",
                backgroundColor: "rgba(239,68,68,0.08)",
                borderRadius: "8px",
                padding: "10px 14px",
                border: "1px solid rgba(239,68,68,0.25)",
                lineHeight: 1.5,
              }}
              role="alert"
            >
              {serverError ?? "Something went wrong."} Please try again or email
              me directly at{" "}
              <a
                href="mailto:dominikgrzeszczak28@gmail.com"
                style={{ color: "var(--accent)", textDecoration: "underline" }}
              >
                dominikgrzeszczak28@gmail.com
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── NAME — h-12 (48px) ────────────────────────────────────────── */}
        <Field id={`${uid}-name`} label="Name" error={errors.name} shakeKey={shakeKey}>
          <input
            id={`${uid}-name`}
            type="text"
            autoComplete="name"
            placeholder="John Doe"
            value={values.name}
            disabled={disabled}
            onChange={(e) => handleChange("name", e.target.value)}
            onFocus={() => setFocusedField("name")}
            onBlur={() => setFocusedField(null)}
            style={getInputStyle("name")}
          />
        </Field>

        {/* ── EMAIL — h-12 (48px) ───────────────────────────────────────── */}
        <Field id={`${uid}-email`} label="Email" error={errors.email} shakeKey={shakeKey}>
          <input
            id={`${uid}-email`}
            type="email"
            autoComplete="email"
            placeholder="john.doe@email.com"
            value={values.email}
            disabled={disabled}
            onChange={(e) => handleChange("email", e.target.value)}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            style={getInputStyle("email")}
          />
        </Field>

        {/* ── MESSAGE — h-36 (144px) ────────────────────────────────────── */}
        <Field id={`${uid}-message`} label="Message" error={errors.message} shakeKey={shakeKey}>
          <textarea
            id={`${uid}-message`}
            placeholder="Tell me about a bug, suggest anything, or tell me about your day..."
            value={values.message}
            disabled={disabled}
            onChange={(e) => handleChange("message", e.target.value)}
            onFocus={() => setFocusedField("message")}
            onBlur={() => setFocusedField(null)}
            style={getInputStyle("message", true)}
          />
        </Field>

        {/* ── Submit — h-12 (48px), full width, mt-6 ───────────────────── */}
        <button
          type="submit"
          disabled={disabled}
          className="flex items-center justify-center font-bold text-white w-full transition-all duration-200 mt-6 hover:opacity-95 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)]"
          style={{
            backgroundColor: "var(--accent)",
            borderRadius: "12px",
            height: "48px",
            fontSize: "16px",
            letterSpacing: "0.3px",
            border: "none",
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.7 : 1,
            flexShrink: 0,
            boxShadow:
              "0 8px 20px -8px color-mix(in srgb, var(--accent) 55%, transparent)",
          }}
        >
          {isLoading ? (
            <Loader2 size={20} className="animate-spin" aria-label="Sending…" />
          ) : (
            "Submit"
          )}
        </button>
      </motion.form>
    </AnimatePresence>
  );
}

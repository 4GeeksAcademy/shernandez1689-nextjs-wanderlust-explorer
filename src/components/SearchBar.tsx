"use client";

import { useEffect, useRef, useState } from "react";

const DEBOUNCE_MS = 300;

interface SearchBarProps {
  /** Término actual en la URL */
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [term, setTerm] = useState(value);
  // Último valor de la URL visto y último valor enviado a la URL
  const [syncedValue, setSyncedValue] = useState(value);
  const [sentValue, setSentValue] = useState(value);

  // Si la URL cambia desde fuera (botón "Limpiar", atrás/adelante del navegador),
  // el input se actualiza. Se ignora el eco de lo que acabamos de escribir para
  // no pisar las teclas pulsadas mientras la URL se actualizaba.
  if (value !== syncedValue) {
    setSyncedValue(value);
    if (value !== sentValue) setTerm(value);
  }

  // Escribe el término en la URL cuando el usuario deja de teclear.
  useEffect(() => {
    if (term === value) return;
    const timeout = setTimeout(() => {
      setSentValue(term);
      onChange(term);
    }, DEBOUNCE_MS);
    return () => clearTimeout(timeout);
  }, [term, value, onChange]);

  // Atajo de teclado: "/" enfoca la búsqueda.
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement;
      const isTyping =
        target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;
      if (event.key === "/" && !isTyping) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative">
      <label htmlFor="experience-search" className="sr-only">
        Buscar experiencias por título
      </label>
      <svg
        viewBox="0 0 24 24"
        className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 fill-none stroke-muted"
        strokeWidth={2}
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <input
        ref={inputRef}
        id="experience-search"
        type="search"
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        placeholder="Busca por título: vela, tapas, yoga…"
        autoComplete="off"
        className="h-12 w-full rounded-full border border-line bg-white pl-12 pr-12 text-base shadow-sm outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
      <kbd className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 rounded border border-line px-1.5 text-xs text-muted sm:block">
        /
      </kbd>
    </div>
  );
}

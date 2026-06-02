// Marca PAUZEfem™ — logotipo em texto com acento neon.
export default function Logo({ size = 'md', onClick }) {
  const sizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  }
  return (
    <button
      onClick={onClick}
      className={`font-extrabold tracking-tight ${sizes[size]} select-none`}
      aria-label="PAUZEfem"
    >
      <span className="text-white">PAUZE</span>
      <span className="text-neon-green drop-shadow-[0_0_10px_rgba(57,255,139,0.6)]">fem</span>
      <span className="text-haze text-[0.6em] align-super ml-0.5">™</span>
    </button>
  )
}

// Rodapé com disclaimer educacional obrigatório.
export default function Footer() {
  return (
    <footer className="mt-12 border-t border-white/5 px-5 py-6 text-center">
      <p className="mx-auto max-w-md text-xs leading-relaxed text-haze/80">
        O <span className="text-haze">PAUZEfem™</span> é uma ferramenta educacional de
        bem-estar. Não diagnostica, trata, cura ou previne doenças. Consulte profissionais
        de saúde para orientações individuais.
      </p>
      <p className="mt-3 text-[10px] text-haze/40">
        © {new Date().getFullYear()} PAUZEfem™ · Seu corpo de volta ao eixo.
      </p>
    </footer>
  )
}

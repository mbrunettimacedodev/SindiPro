// Ícone do SindiPro (usado no header, no footer e na tela de login).
export default function Logo({ className = 'h-8 w-8' }) {
  return (
    <svg className={className} viewBox="0 0 512 512" aria-hidden="true">
      <rect width="512" height="512" rx="112" fill="#0284c7" />
      <rect x="144" y="112" width="224" height="288" rx="32" fill="#ffffff" />
      <g fill="#0284c7">
        <rect x="192" y="160" width="48" height="48" rx="10" />
        <rect x="272" y="160" width="48" height="48" rx="10" />
        <rect x="192" y="240" width="48" height="48" rx="10" />
        <rect x="272" y="240" width="48" height="48" rx="10" />
        <rect x="232" y="320" width="48" height="80" rx="10" />
      </g>
    </svg>
  )
}

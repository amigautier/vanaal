import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* COLUMNA IZQUIERDA: Logotipo SVG, descripción e Instagram */}
        <div className="footer-brand">
          <Link href="/" className="footer-logo-link">
            <Image
              src="/logotype.svg"
              alt="Vanaal Magazine"
              width={180}
              height={40}
              className="footer-logo-img"
              priority
            />
          </Link>
          <p className="footer-description">
            Las últimas noticias de moda local, marcas independientes, belleza, estilo de vida,
            coberturas de festivales y cultura.
          </p>
          <div className="footer-social">
            <a
              href="https://instagram.com/vanaalmagazine"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Vanaal"
              className="social-icon"
            >
              <svg
                width="35"
                height="35"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>

        {/* COLUMNA CENTRAL: Más acerca de Vanaal */}
        <div className="footer-column">
          <h3 className="footer-title">Más acerca de Vanaal</h3>
          <ul className="footer-links">
            <li>
              <Link href="/about">About Vanaal</Link>
            </li>
            <li>
              <Link href="/contacto">Contáctanos</Link>
            </li>
            <li>
              <Link href="/colabora">Colabora con nosotros</Link>
            </li>
            <li>
              <Link href="/acuerdo-usuario">Acuerdo de usuario</Link>
            </li>
            <li>
              <Link href="/politica-privacidad">Política de privacidad</Link>
            </li>
          </ul>
        </div>

        {/* COLUMNA DERECHA: Nuestras historias */}
        <div className="footer-column">
          <h3 className="footer-title">Nuestras historias</h3>
          <ul className="footer-links">
            <li>
              <Link href="/categoria/moda-local">Moda local</Link>
            </li>
            <li>
              <Link href="/categoria/makeup-style">Makeup & Style</Link>
            </li>
            <li>
              <Link href="/categoria/eventos-conciertos">Eventos y conciertos</Link>
            </li>
            <li>
              <Link href="/categoria/lifestyle">Lifestyle</Link>
            </li>
            <li>
              <Link href="/categoria/cultura">Cultura</Link>
            </li>
            <li>
              <Link href="/categoria/horoscopo">Horóscopo</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* SUB-FOOTER: Copyright centrado */}
      <div className="footer-bottom">
        <p>© {currentYear} Vanaal Magazine. Todos los derechos reservados.</p>
        <p className="footer-copyright">
          Todas las imágenes y contenido son propiedad exclusiva de Vanaal, están protegidos y queda
          estrictamente prohibida su reproducción total o parcial.
        </p>
      </div>
    </footer>
  )
}

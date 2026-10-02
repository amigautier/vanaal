'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Heart, User, X, ChevronRight, ChevronDown } from 'lucide-react'

// Estructura con tus textos y enlaces exactos
const NAV_CATEGORIES = [
  {
    name: 'Moda local',
    href: '/categorias/moda-local',
    subcategories: [
      { name: 'Marcas y diseñadores', href: '/categorias/moda-local/marcas-y-disenadores' },
      { name: 'Streetwear', href: '/categorias/moda-local/streetwear' },
      { name: 'Segunda mano y upcycling', href: '/categorias/moda-local/segunda-mano-y-upcycling' },
      { name: 'Tendencias y Styling', href: '/categorias/moda-local/tendencias-y-styling' },
    ],
  },
  {
    name: 'Makeup & beauty',
    href: '/categorias/makeup-beauty',
    subcategories: [
      { name: 'Makeup', href: '/categorias/makeup-beauty/makeup' },
      { name: 'Cuidado de la piel', href: '/categorias/makeup-beauty/cuidado-de-la-piel' },
      { name: 'Cabello y uñas', href: '/categorias/makeup-beauty/cabello-y-unas' },
      { name: 'Reseñas y favoritos', href: '/categorias/makeup-beauty/resenas-y-favoritos' },
    ],
  },
  {
    name: 'Festivales y eventos',
    href: '/categorias/festivales-eventos',
    subcategories: [
      { name: 'Festivales', href: '/categorias/festivales-eventos/festivales' },
      { name: 'Conciertos', href: '/categorias/festivales-eventos/conciertos' },
      { name: 'Ferias locales', href: '/categorias/festivales-eventos/ferias-locales' },
      { name: 'Vida nocturna', href: '/categorias/festivales-eventos/vida-nocturna' },
    ],
  },
  {
    name: 'Lifestyle',
    href: '/categorias/lifestyle',
    subcategories: [
      { name: 'Decoración', href: '/categorias/lifestyle/decoracion' },
      { name: 'Relaciones y sexualidad', href: '/categorias/lifestyle/relaciones-y-sexualidad' },
      { name: 'App favoritas', href: '/categorias/lifestyle/app-favoritas' },
      { name: 'Cuidado y bienestar', href: '/categorias/lifestyle/cuidado-y-bienestar' },
    ],
  },
  {
    name: 'Cultura',
    href: '/categorias/cultura',
    subcategories: [
      { name: 'Cine y series', href: '/categorias/cultura/cine-y-series' },
      { name: 'Lecturas', href: '/categorias/cultura/lecturas' },
      { name: 'Música', href: '/categorias/cultura/musica' },
      { name: 'Arte', href: '/categorias/cultura/arte' },
      { name: 'Voces y ensayos', href: '/categorias/cultura/voces-y-ensayos' },
    ],
  },
  {
    name: 'Horóscopo',
    href: '/categorias/horoscopo',
    subcategories: [
      { name: 'Rituales e intenciones', href: '/categorias/horoscopo/rituales-e-intenciones' },
    ],
  },
]

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const toggleMobileCategory = (categoryName: string) => {
    setExpandedMobileCategory((prev) => (prev === categoryName ? null : categoryName))
  }

  return (
    <>
      <header
        style={{
          backgroundColor: '#ffffff',
          width: '100%',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 50,
        }}
        onMouseLeave={() => setActiveCategory(null)}
      >
        {/* BARRA SUPERIOR EXCLUSIVA PARA MÓVIL */}
        <div className="mobile-top-bar">
          <Link
            href="/suscribirse"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none',
              color: '#242525',
              fontSize: '0.8rem',
              fontFamily: "'Noto Sans KR', sans-serif",
            }}
          >
            <Heart size={16} color="#242525" />
            <span>Suscribirse</span>
          </Link>

          <Link
            href="/login"
            style={{
              textDecoration: 'none',
              color: '#242525',
              fontSize: '0.8rem',
              fontWeight: 500,
              fontFamily: "'Noto Sans KR', sans-serif",
            }}
          >
            Sign In
          </Link>
        </div>

        {/* SECCIÓN PRINCIPAL HEADER */}
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '15px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* IZQUIERDA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', minWidth: '80px' }}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Abrir menú"
              className="mobile-menu-btn"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                display: 'flex',
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#242525"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" /> <line x1="3" y1="12" x2="21" y2="12" />{' '}
                <line x1="3" y1="18" x2="21" y2="18" />{' '}
              </svg>
            </button>

            <div className="desktop-suscribe" style={{ display: 'flex', alignItems: 'center' }}>
              <Link
                href="/suscribirse"
                aria-label="Suscribirse"
                style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
              >
                <Heart size={21} color="#242525" />
              </Link>
            </div>
          </div>

          {/* LOGO EN EL CENTRO */}
          <Link
            href="/"
            style={{
              textDecoration: 'none',
              textAlign: 'center',
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <img
              src="/logotype.svg"
              alt="Vanaal Magazine"
              className="main-logo-img"
              style={{ width: 'auto', objectFit: 'contain', display: 'block' }}
            />
          </Link>

          {/* DERECHA */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '18px',
              minWidth: '80px',
            }}
          >
            <button
              aria-label="Buscar"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                display: 'flex',
              }}
            >
              <Search size={21} color="#242525" />
            </button>

            <div className="desktop-user">
              <Link
                href="/login"
                aria-label="Cuenta"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <User size={22} color="#242525" />
              </Link>
            </div>
          </div>
        </div>

        {/* LÍNEA DIVISORA GRIS */}
        <div style={{ width: '100%', height: '1px', backgroundColor: '#e5e5e5' }} />

        {/* MENÚ DE CATEGORÍAS EN DESKTOP Y SCROLL MÓVIL */}
        <nav
          className="categories-scroll-bar"
          style={{
            width: '100%',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <div
            className="categories-inner-container"
            style={{ display: 'inline-block', minWidth: '100%' }}
          >
            <ul
              className="categories-list"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '25px',
                listStyle: 'none',
                margin: 0,
                padding: '14px 30px',
                textTransform: 'uppercase',
                fontSize: '0.85rem',
                letterSpacing: '0.5px',
                fontWeight: 500,
                fontFamily: "'Noto Sans KR', sans-serif",
              }}
            >
              {NAV_CATEGORIES.map((category) => (
                <li
                  key={category.name}
                  onMouseEnter={() => setActiveCategory(category.name)}
                  style={{ position: 'relative' }}
                >
                  <Link
                    href={category.href}
                    style={{
                      textDecoration: 'none',
                      color: activeCategory === category.name ? '#000000' : '#242525',
                      display: 'inline-block',
                    }}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* MEGA MENU FULL WIDTH DESKTOP */}
        {NAV_CATEGORIES.map((category) => {
          const isVisible = activeCategory === category.name
          return (
            <div
              key={category.name}
              className="desktop-megamenu-panel"
              onMouseEnter={() => setActiveCategory(category.name)}
              onMouseLeave={() => setActiveCategory(null)}
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                width: '100vw',
                backgroundColor: '#ffffff',
                borderTop: '1px solid #f0f0f0',
                borderBottom: '1px solid #e5e5e5',
                boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.05)',
                display: isVisible ? 'block' : 'none',
                zIndex: 60,
              }}
            >
              <div
                style={{
                  maxWidth: '1280px',
                  margin: '0 auto',
                  padding: '30px 30px 35px 30px',
                  textAlign: 'left',
                  boxSizing: 'border-box',
                  fontFamily: "'Noto Sans KR', sans-serif",
                }}
              >
                {/* TÍTULO PRINCIPAL DE LA CATEGORÍA */}
                <div style={{ marginBottom: '20px' }}>
                  <Link
                    href={category.href}
                    className="megamenu-sublink"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      textDecoration: 'underline',
                      color: '#242525',
                      fontWeight: 500,
                      fontSize: '0.8rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.8px',
                    }}
                  >
                    <span>{category.name}</span>
                    <ChevronRight size={18} color="#242525" strokeWidth={2.5} />
                  </Link>
                </div>

                {/* LISTA DE SUBCATEGORÍAS */}
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 45px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    textAlign: 'left',
                  }}
                >
                  {category.subcategories.map((sub) => (
                    <li key={sub.name}>
                      <Link
                        href={sub.href}
                        style={{
                          textDecoration: 'none',
                          color: '#242525',
                          fontSize: '0.9rem',
                          fontWeight: 400,
                          transition: 'color 0.2s ease',
                        }}
                        className="megamenu-sublink"
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* ENLACE VER TODO */}
                <div>
                  <Link
                    href={category.href}
                    className="megamenu-sublink"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      textDecoration: 'underline',
                      color: '#242525',
                      fontSize: '0.8rem',
                      letterSpacing: '0.5px',
                    }}
                  >
                    <span>Ver todo {category.name}</span>
                    <ChevronRight size={15} color="#242525" strokeWidth={2.5} />
                  </Link>
                </div>
              </div>
            </div>
          )
        })}

        <div style={{ width: '100%', height: '1px', backgroundColor: '#f0f0f0' }} />
      </header>

      {/* MENÚ LATERAL FULLSCREEN PARA MÓVIL (HAMBURGUESA) */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: isOpen ? 0 : '-100%',
          width: '100vw',
          height: '100vh',
          backgroundColor: '#ffffff',
          zIndex: 100,
          transition: 'left 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          flexDirection: 'column',
          padding: '30px 25px 25px 25px',
          boxSizing: 'border-box',
          overflowY: 'auto',
        }}
      >
        {/* CABECERA MENÚ MÓVIL */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '30px',
            marginTop: '5px',
            position: 'relative',
          }}
        >
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Cerrar menú"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '5px',
              display: 'flex',
              zIndex: 2,
            }}
          >
            <X size={28} color="#242525" strokeWidth={1} />
          </button>

          <div
            style={{
              position: 'absolute',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            <img
              src="/logotype.svg"
              alt="Vanaal Magazine"
              style={{ height: '35px', width: 'auto', objectFit: 'contain' }}
            />
          </div>

          <div style={{ width: '28px' }} />
        </div>

        {/* BUSCADOR MÓVIL */}
        <div style={{ position: 'relative', width: '100%', marginBottom: '25px' }}>
          <input
            type="text"
            placeholder="Buscar en Vanaal..."
            style={{
              width: '100%',
              padding: '12px 40px 12px 15px',
              borderRadius: '4px',
              border: '1px solid #e0e0e0',
              backgroundColor: '#f9f9f9',
              fontSize: '0.9rem',
              outline: 'none',
              boxSizing: 'border-box',
              fontFamily: "'Noto Sans KR', sans-serif",
            }}
          />
          <Search
            size={18}
            color="#777"
            style={{
              position: 'absolute',
              right: '15px',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          />
        </div>

        {/* SECCIONES Y CATEGORÍAS MÓVIL */}
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            fontFamily: "'Noto Sans KR', sans-serif",
          }}
        >
          {NAV_CATEGORIES.map((cat, idx) => {
            const isExpanded = expandedMobileCategory === cat.name
            const isLast = idx === NAV_CATEGORIES.length - 1

            return (
              <li
                key={cat.name}
                style={{
                  borderTop: '1px solid #eeeeee',
                  borderBottom: isLast ? '1px solid #eeeeee' : 'none',
                }}
              >
                {/* CLIC EN EL TÍTULO O LA FLECHA DESPLIEGA EL SUBMENÚ MÓVIL */}
                <button
                  onClick={() => toggleMobileCategory(cat.name)}
                  aria-label={`Desplegar submenú de ${cat.name}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    padding: '16px 5px',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span
                    style={{
                      color: '#242525',
                      fontSize: '0.95rem',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                    }}
                  >
                    {cat.name}
                  </span>

                  <ChevronDown
                    size={18}
                    color="#242525"
                    style={{
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s ease',
                    }}
                  />
                </button>

                {/* CONTENIDO DESPLEGABLE CON SUBCATEGORÍAS MÓVIL */}
                {isExpanded && (
                  <div className="mobile-submenu-container">
                    <ul
                      style={{
                        listStyle: 'none',
                        padding: '12px 15px',
                        margin: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                      }}
                    >
                      {cat.subcategories.map((sub) => (
                        <li key={sub.name}>
                          <Link
                            href={sub.href}
                            onClick={() => setIsOpen(false)}
                            style={{
                              textDecoration: 'none',
                              color: '#242525',
                              fontSize: '1.0rem',
                              display: 'block',
                              padding: '9px 0',
                              fontWeight: 400,
                            }}
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                      <li style={{ paddingTop: '6px' }}>
                        <Link
                          href={cat.href}
                          onClick={() => setIsOpen(false)}
                          style={{
                            textDecoration: 'none',
                            color: '#242525',
                            fontSize: '1.0rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontWeight: 400,
                            marginBottom: '13px',
                          }}
                        >
                          <span>Ver todo {cat.name}</span>
                          <ChevronRight size={14} color="#242525" strokeWidth={2.5} />
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            )
          })}

          {/* CUENTA Y ENLACES SECUNDARIOS */}
          {[
            { name: 'Sign In', href: '/login', icon: User, isAccount: true, isFirstAccount: true },
            { name: 'Suscribirse', href: '/suscribirse', icon: Heart, isAccount: true },
            { name: 'Contact', href: '/contact', isSecondary: true, isFirstSecondary: true },
            { name: 'About Vanaal', href: '/about', isSecondary: true },
          ].map((item, index) => {
            const IconComponent = item.icon

            let marginTopStyle = '0px'
            if (item.isFirstAccount) {
              marginTopStyle = '25px'
            } else if (item.isFirstSecondary) {
              marginTopStyle = '20px'
            }

            return (
              <li key={index} style={{ marginTop: marginTopStyle }}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: item.isSecondary
                      ? '8px 5px'
                      : item.isAccount
                        ? '12px 5px'
                        : '16px 5px',
                    textDecoration: 'none',
                    color: item.isSecondary ? '#242525' : '#242525',
                    fontSize: item.isSecondary ? '0.8rem' : '0.95rem',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    fontWeight: item.isSecondary ? 400 : 500,
                    textAlign: 'left',
                  }}
                >
                  {IconComponent && <IconComponent size={18} color="#242525" />}
                  <span>{item.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>

        {/* FOOTER INSTAGRAM */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '20px',
            borderTop: '1px solid #eeeeee',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <a
            href="https://instagram.com/vanaalmagazine"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px',
              textDecoration: 'none',
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#242525"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </a>
        </div>
      </div>

      {/* ESTILOS CSS RESPONSIVE */}
      <style jsx global>{`
        .mobile-top-bar {
          display: none;
        }

        .megamenu-sublink:hover {
          color: rgb(131, 133, 136) !important;
          text-decoration: none;
        }

        .mobile-submenu-container {
          background-color: #f8f8f8;
          border-radius: 4px;
          margin: 0 0 12px 0;
        }

        @media (min-width: 768px) {
          .categories-scroll-bar {
            overflow-x: visible !important;
          }
          .categories-inner-container {
            display: flex !important;
            justify-content: center !important;
            width: 100% !important;
          }
          .categories-list {
            justify-content: center !important;
            width: fit-content;
            margin: 0 auto !important;
          }
        }

        @media (max-width: 767px) {
          .desktop-megamenu-panel {
            display: none !important;
          }
          .categories-scroll-bar::-webkit-scrollbar {
            display: none;
          }
          .categories-scroll-bar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .categories-inner-container {
            padding-right: 5px !important;
          }
        }

        @media (min-width: 768px) {
          .mobile-menu-btn {
            display: none !important;
          }
        }

        @media (max-width: 767px) {
          .desktop-suscribe,
          .desktop-user {
            display: none !important;
          }
          .mobile-top-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 20px;
            background-color: #ffffff;
            border-bottom: 1px solid #eeeeee;
          }
        }

        .main-logo-img {
          height: 35px !important;
        }

        @media (min-width: 768px) {
          .main-logo-img {
            height: 45px !important;
          }
        }
      `}</style>
    </>
  )
}

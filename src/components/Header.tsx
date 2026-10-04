'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Search, Heart, User, X, ChevronRight, ChevronDown, Loader2 } from 'lucide-react'

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || ''

interface SearchResult {
  id: string
  title: string
  slug: string
  category?:
    | {
        name?: string
      }
    | string
  featuredImage?: {
    url?: string
    alt?: string
  }
}

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
  const [isScrolled, setIsScrolled] = useState(false)

  // Estado para la visibilidad en móvil al scroll
  const [isMobileHeaderHidden, setIsMobileHeaderHidden] = useState(false)
  const lastScrollY = useRef(0)

  // ESTADOS DE BÚSQUEDA (Móvil y Desktop)
  const [isDesktopSearchOpen, setIsDesktopSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isLoadingSearch, setIsLoadingSearch] = useState(false)

  // Cierra menú móvil y resetea estados
  const handleCloseMobileMenu = () => {
    setIsOpen(false)
    setExpandedMobileCategory(null)
    setActiveCategory(null)
    setSearchQuery('')
    setSearchResults([])
  }

  // Cierra la búsqueda desktop
  const handleCloseDesktopSearch = () => {
    setIsDesktopSearchOpen(false)
    setSearchQuery('')
    setSearchResults([])
  }

  // Listener para atajo Command + K / Ctrl + K y Tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsDesktopSearchOpen((prev) => !prev)
      }
      if (e.key === 'Escape' && isDesktopSearchOpen) {
        handleCloseDesktopSearch()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isDesktopSearchOpen])

  // Petición con Debounce a Payload CMS
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      setIsLoadingSearch(false)
      return
    }

    setIsLoadingSearch(true)

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `${PAYLOAD_URL}/api/posts?where[title][like]=${encodeURIComponent(searchQuery)}&limit=5&depth=1`,
        )

        if (res.ok) {
          const data = await res.json()
          setSearchResults(data.docs || [])
        } else {
          setSearchResults([])
        }
      } catch (error) {
        console.error('Error buscando en Payload:', error)
        setSearchResults([])
      } finally {
        setIsLoadingSearch(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  useEffect(() => {
    if (isOpen || isDesktopSearchOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, isDesktopSearchOpen])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const halfViewportHeight = window.innerHeight / 2

      if (currentScrollY > 40) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      if (window.innerWidth < 768) {
        if (currentScrollY > halfViewportHeight) {
          if (currentScrollY > lastScrollY.current) {
            setIsMobileHeaderHidden(true)
          } else if (currentScrollY < lastScrollY.current) {
            setIsMobileHeaderHidden(false)
          }
        } else {
          setIsMobileHeaderHidden(false)
        }
      } else {
        setIsMobileHeaderHidden(false)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileCategory = (categoryName: string) => {
    setExpandedMobileCategory((prev) => (prev === categoryName ? null : categoryName))
  }

  return (
    <>
      <header
        className={`main-header-root ${isMobileHeaderHidden ? 'mobile-hidden' : ''}`}
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

        {/* CONTENEDOR CON TRANSICIÓN SUAVE DE SCROLL PARA LA PARTE SUPERIOR */}
        <div className={`smooth-collapse-container ${isScrolled ? 'collapsed' : ''}`}>
          <div
            style={{
              maxWidth: '1500px',
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
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
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
                onClick={() => setIsDesktopSearchOpen(true)}
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
        </div>

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
            style={{
              maxWidth: '1500px',
              margin: '0 auto',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <div className="nav-wrapper-desktop">
              {/* ÍCONO CORAZÓN (IZQUIERDA) - SOLO VISIBLE EN SCROLL DESKTOP */}
              <div className={`sticky-actions-left ${isScrolled ? 'show-sticky' : ''}`}>
                <Link
                  href="/suscribirse"
                  aria-label="Suscribirse"
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <Heart size={19} color="#242525" />
                </Link>
              </div>

              <ul
                className="categories-list"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '25px',
                  listStyle: 'none',
                  margin: 0,
                  textTransform: 'uppercase',
                  fontSize: '0.85rem',
                  letterSpacing: '0.5px',
                  fontWeight: 500,
                  fontFamily: "'Noto Sans KR', sans-serif",
                }}
              >
                {/* LOGO DESKTOP JUNTO A MODA LOCAL */}
                <li className="desktop-nav-logo">
                  <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src="/logotype.svg"
                      alt="Vanaal Magazine"
                      style={{ height: '24px', width: 'auto', objectFit: 'contain' }}
                    />
                  </Link>
                </li>

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

              {/* ÍCONOS BUSCAR Y LOGIN (DERECHA) - SOLO VISIBLES EN SCROLL DESKTOP */}
              <div className={`sticky-actions-right ${isScrolled ? 'show-sticky' : ''}`}>
                <button
                  onClick={() => setIsDesktopSearchOpen(true)}
                  aria-label="Buscar"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    display: 'flex',
                  }}
                >
                  <Search size={19} color="#242525" />
                </button>
                <Link
                  href="/login"
                  aria-label="Cuenta"
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <User size={20} color="#242525" />
                </Link>
              </div>
            </div>
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
                  maxWidth: '900px',
                  margin: '0 auto',
                  padding: '30px 20px 35px 20px',
                  textAlign: 'left',
                  boxSizing: 'border-box',
                  fontFamily: "'Noto Sans KR', sans-serif",
                }}
              >
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

      {/* MODAL BÚSQUEDA CENTRADO ESTILO COMMAND / K */}
      {isDesktopSearchOpen && (
        <div
          onClick={handleCloseDesktopSearch}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            zIndex: 120,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '12vh',
            paddingLeft: '20px',
            paddingRight: '20px',
            boxSizing: 'border-box',
            fontFamily: "'Noto Sans KR', sans-serif",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '640px',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid #e5e5e5',
            }}
          >
            {/* ENTRADA DE TEXTO COMMAND / K */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '16px 20px',
                borderBottom: '1px solid #eeeeee',
                gap: '12px',
              }}
            >
              {isLoadingSearch ? (
                <Loader2 className="animate-spin" size={20} color="#777" />
              ) : (
                <Search size={20} color="#777" />
              )}
              <input
                type="text"
                autoFocus
                placeholder="Buscar artículos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  fontSize: '1rem',
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  color: '#242525',
                }}
              />
              <span
                style={{
                  fontSize: '0.75rem',
                  color: '#999',
                  backgroundColor: '#f3f3f3',
                  padding: '3px 7px',
                  borderRadius: '4px',
                  border: '1px solid #e0e0e0',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                }}
              >
                ESC
              </span>
            </div>

            {/* RESULTADOS O MENSAJES */}
            <div style={{ maxHeight: '380px', overflowY: 'auto', padding: '10px 0' }}>
              {searchResults.length > 0 ? (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {searchResults.map((post) => (
                    <li key={post.id}>
                      <Link
                        href={`/articulos/${post.slug}`}
                        onClick={handleCloseDesktopSearch}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '14px',
                          padding: '12px 20px',
                          textDecoration: 'none',
                          color: '#242525',
                          transition: 'background-color 0.15s ease',
                        }}
                        className="cmd-k-item"
                      >
                        {post.featuredImage?.url && (
                          <img
                            src={`${PAYLOAD_URL}${post.featuredImage.url}`}
                            alt={post.featuredImage.alt || post.title}
                            style={{
                              width: '48px',
                              height: '48px',
                              objectFit: 'cover',
                              borderRadius: '6px',
                            }}
                          />
                        )}
                        <div style={{ flex: 1 }}>
                          <h4
                            style={{
                              margin: 0,
                              fontSize: '0.95rem',
                              fontWeight: 500,
                              lineHeight: '1.3',
                            }}
                          >
                            {post.title}
                          </h4>
                          {typeof post.category === 'object' && post.category?.name && (
                            <span
                              style={{
                                fontSize: '0.75rem',
                                color: '#888',
                                textTransform: 'uppercase',
                                marginTop: '2px',
                                display: 'block',
                              }}
                            >
                              {post.category.name}
                            </span>
                          )}
                        </div>
                        <ChevronRight size={16} color="#aaa" />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : searchQuery.trim() && !isLoadingSearch ? (
                <p
                  style={{
                    color: '#888',
                    textAlign: 'center',
                    margin: '30px 0',
                    fontSize: '0.9rem',
                  }}
                >
                  No se encontraron resultados para "{searchQuery}".
                </p>
              ) : (
                <p
                  style={{
                    color: '#aaa',
                    textAlign: 'center',
                    margin: '25px 0',
                    fontSize: '0.85rem',
                  }}
                >
                  Escribe para buscar publicaciones o artículos...
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MENÚ LATERAL MÓVIL */}
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
            onClick={handleCloseMobileMenu}
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

        {/* INPUT DE BÚSQUEDA MÓVIL CONECTADO A PAYLOAD */}
        <div style={{ position: 'relative', width: '100%', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Buscar en Vanaal..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
          <div
            style={{
              position: 'absolute',
              right: '15px',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          >
            {isLoadingSearch ? (
              <Loader2 className="animate-spin" size={18} color="#777" />
            ) : (
              <Search size={18} color="#777" />
            )}
          </div>
        </div>

        {/* RESULTADOS DE BÚSQUEDA MÓVIL */}
        {searchQuery.trim() !== '' && (
          <div
            style={{ marginBottom: '25px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}
          >
            {searchResults.length > 0 ? (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {searchResults.map((post) => (
                  <li key={post.id} style={{ borderBottom: '1px solid #f8f8f8' }}>
                    <Link
                      href={`/articulos/${post.slug}`}
                      onClick={handleCloseMobileMenu}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '10px 0',
                        textDecoration: 'none',
                        color: '#242525',
                      }}
                    >
                      {post.featuredImage?.url && (
                        <img
                          src={`${PAYLOAD_URL}${post.featuredImage.url}`}
                          alt={post.featuredImage.alt || post.title}
                          style={{
                            width: '45px',
                            height: '45px',
                            objectFit: 'cover',
                            borderRadius: '4px',
                          }}
                        />
                      )}
                      <div>
                        <h5 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 500 }}>
                          {post.title}
                        </h5>
                        {typeof post.category === 'object' && post.category?.name && (
                          <span style={{ fontSize: '0.75rem', color: '#888' }}>
                            {post.category.name}
                          </span>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : !isLoadingSearch ? (
              <p style={{ fontSize: '0.85rem', color: '#888', margin: '10px 0' }}>
                Sin resultados para "{searchQuery}"
              </p>
            ) : null}
          </div>
        )}

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
                            onClick={handleCloseMobileMenu}
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
                          onClick={handleCloseMobileMenu}
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
                  onClick={handleCloseMobileMenu}
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
        .main-header-root {
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .mobile-top-bar {
          display: none;
        }

        .desktop-nav-logo {
          display: none;
          margin-right: 10px;
        }

        .sticky-actions-left,
        .sticky-actions-right {
          display: none;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .nav-wrapper-desktop {
          display: flex;
          align-items: center;
          justifycontent: center;
          position: relative;
          width: 100%;
        }

        .categories-list {
          padding: 14px 20px;
        }

        .megamenu-sublink:hover {
          color: rgb(131, 133, 136) !important;
          text-decoration: none;
        }

        .cmd-k-item:hover {
          background-color: #f7f7f7;
        }

        .mobile-submenu-container {
          background-color: #f8f8f8;
          border-radius: 4px;
          margin: 0 0 12px 0;
        }

        .smooth-collapse-container {
          max-height: 120px;
          opacity: 1;
          overflow: hidden;
          transition:
            max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1),
            opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        @media (min-width: 768px) {
          .categories-inner-container {
            padding: 0 20px;
          }

          .categories-list {
            padding: 14px 20px 14px 0;
          }

          .smooth-collapse-container.collapsed {
            max-height: 0px !important;
            opacity: 0 !important;
          }

          .desktop-nav-logo {
            display: flex;
            align-items: center;
          }

          .categories-scroll-bar {
            overflow-x: visible !important;
          }

          .sticky-actions-left {
            display: flex;
            align-items: center;
            position: absolute;
            left: 0px;
          }

          .sticky-actions-right {
            display: flex;
            align-items: center;
            gap: 18px;
            position: absolute;
            right: 0px;
          }

          .sticky-actions-left.show-sticky,
          .sticky-actions-right.show-sticky {
            opacity: 1;
            pointer-events: auto;
          }

          .categories-list {
            justify-content: center !important;
            width: fit-content;
            margin: 0 auto !important;
          }
        }

        @media (max-width: 767px) {
          .categories-inner-container {
            padding: 0;
          }

          .categories-list {
            padding: 12px 20px !important;
          }

          .main-header-root.mobile-hidden {
            transform: translateY(-100%);
          }

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

        @media (min-width: 768px) {
          .mobile-menu-btn {
            display: none !important;
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

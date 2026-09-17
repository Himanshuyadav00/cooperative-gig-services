import { useEffect, useState } from 'react'
import {
  auth,
  createUserWithEmailAndPassword,
  firebaseEnabled,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from './firebase'
import './App.css'

const metrics = [
  { value: '12k+', label: 'gig workers' },
  { value: '4.9/5', label: 'community rating' },
  { value: '86%', label: 'repeat bookings' },
]

const partnerBrands = ['Harbor Goods', 'Green Leaf', 'NorthLoop', 'City Works', 'Summit Labs']

const features = [
  {
    icon: '🤝',
    title: 'Transparent matching',
    text: 'Smart local matching connects workers to jobs that fit their skill, schedule, and neighborhood.',
  },
  {
    icon: '💸',
    title: 'Fair pay model',
    text: 'Clear pricing and cooperative payouts reduce platform friction and improve worker trust.',
  },
  {
    icon: '📈',
    title: 'Skill growth',
    text: 'Upskilling, badges, and recurring work help gig workers build stable income over time.',
  },
  {
    icon: '🏘️',
    title: 'Local impact',
    text: 'Businesses get reliable help while communities keep more value in the neighborhoods they serve.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Create your profile',
    description: 'Set your skills, availability, and preferred work types in minutes.',
  },
  {
    number: '02',
    title: 'Match with local needs',
    description: 'Get curated opportunities from nearby businesses and community groups.',
  },
  {
    number: '03',
    title: 'Complete, review, repeat',
    description: 'Earn confidently with transparent terms and clear community feedback.',
  },
]

const testimonials = [
  {
    quote:
      'I finally found gigs that respect my time and pay what I’m worth. It feels like a real community, not a platform that takes everything.',
    name: 'Marina K.',
    role: 'Freelance designer',
  },
  {
    quote:
      'Our café needed flexible, dependable help. The platform made it easy to hire local workers who genuinely cared about quality.',
    name: 'Daniel H.',
    role: 'Owner, North Street Café',
  },
  {
    quote:
      'The cooperative model gives workers ownership and businesses more trust. It’s the future of local services.',
    name: 'Sonia P.',
    role: 'Operations lead',
  },
]

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [loginError, setLoginError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCreatingAccount, setIsCreatingAccount] = useState(false)

  useEffect(() => {
    if (!auth) return undefined

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsSignedIn(Boolean(user))
      setUserEmail(user?.email || '')
    })

    return unsubscribe
  }, [])

  const handleSignIn = async (event) => {
    event.preventDefault()

    if (!email.trim() || !password.trim()) {
      setLoginError('Please enter both your email and password.')
      return
    }

    if (!auth || !firebaseEnabled) {
      setLoginError('Firebase is not configured. Add your Firebase environment variables to continue.')
      return
    }

    setIsSubmitting(true)
    setLoginError('')

    try {
      if (isCreatingAccount) {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
      setIsModalOpen(false)
      setPassword('')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Authentication failed. Please try again.'
      setLoginError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSignOut = async () => {
    if (!auth) return

    try {
      await signOut(auth)
      setUserEmail('')
      setIsSignedIn(false)
    } catch (error) {
      console.error('Sign out failed', error)
    }
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="container nav-wrap">
          <a href="#top" className="brand" aria-label="Cooperative Gig Services home">
            <span className="brand-mark">C</span>
            <span>CoopGig</span>
          </a>

          <nav className="site-nav" aria-label="Main navigation">
            <a href="#features">Features</a>
            <a href="#how-it-works">How it works</a>
            <a href="#community">Community</a>
            <a href="#pricing">Pricing</a>
          </nav>

          <div className="nav-actions">
            {isSignedIn ? (
              <button type="button" className="btn btn-ghost sign-in-button" onClick={handleSignOut}>
                Sign out
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-ghost sign-in-button"
                onClick={() => {
                  setIsModalOpen(true)
                  setLoginError('')
                }}
              >
                Sign in
              </button>
            )}
            <a href="#join" className="btn btn-primary">Join now</a>
          </div>
        </div>
      </header>

      {isModalOpen && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="signin-title">
          <div className="modal-card">
            <button
              type="button"
              className="modal-close"
              onClick={() => {
                setIsModalOpen(false)
                setLoginError('')
              }}
              aria-label="Close sign in form"
            >
              ×
            </button>

            <div className="modal-header">
              <span className="eyebrow">{isCreatingAccount ? 'Join the cooperative' : 'Welcome back'}</span>
              <h2 id="signin-title">{isCreatingAccount ? 'Create your CoopGig account' : 'Sign in to CoopGig'}</h2>
            </div>

            <form className="signin-form" onSubmit={handleSignIn}>
              <label>
                <span>Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                />
              </label>

              <label>
                <span>Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                />
              </label>

              {loginError && <p className="form-error">{loginError}</p>}

              <button type="submit" className="btn btn-primary btn-full" disabled={isSubmitting}>
                {isSubmitting ? 'Please wait...' : isCreatingAccount ? 'Create account' : 'Sign in'}
              </button>
              <button
                type="button"
                className="auth-switch"
                onClick={() => {
                  setIsCreatingAccount((current) => !current)
                  setLoginError('')
                }}
              >
                {isCreatingAccount ? 'Already have an account? Sign in' : 'New here? Create an account'}
              </button>
            </form>
          </div>
        </div>
      )}

      <main id="top">
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">Community-powered work</span>
              <h1>Work together. Earn fairly. Grow locally.</h1>
              <p>
                Cooperative Gig Services helps local workers and businesses connect through transparent gigs,
                shared opportunities, and fairer earnings.
              </p>

              <div className="cta-row">
                <a href="#join" className="btn btn-primary">Get started</a>
                <a href="#features" className="btn btn-secondary">Explore platform</a>
              </div>

              {isSignedIn && (
                <div className="welcome-badge">
                  Signed in as <strong>{userEmail || 'member@coopgig.com'}</strong>
                </div>
              )}

              <ul className="hero-metrics" aria-label="Platform metrics">
                {metrics.map((metric) => (
                  <li key={metric.label}>
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hero-visual" aria-label="Platform preview">
              <div className="dashboard-card main-card">
                <div className="card-topline">
                  <span className="dot green" />
                  <span className="dot amber" />
                  <span className="dot red" />
                </div>

                <div className="mini-panel">
                  <span className="mini-label">This week</span>
                  <strong>$4,820</strong>
                  <small>total payouts</small>
                </div>

                <div className="task-list">
                  <div className="task-item">
                    <div>
                      <span className="task-title">Delivery route</span>
                      <small>3.2 hrs · 12 stops</small>
                    </div>
                    <span className="pill success">Booked</span>
                  </div>
                  <div className="task-item">
                    <div>
                      <span className="task-title">Home setup</span>
                      <small>2.5 hrs · 1 job</small>
                    </div>
                    <span className="pill neutral">Pending</span>
                  </div>
                  <div className="task-item">
                    <div>
                      <span className="task-title">Brand support</span>
                      <small>5 hrs · 2 tasks</small>
                    </div>
                    <span className="pill accent">Available</span>
                  </div>
                </div>
              </div>

              <div className="floating-card worker-card">
                <div className="avatar">AL</div>
                <div>
                  <strong>Alicia</strong>
                  <small>Design assistant</small>
                </div>
                <span className="score">+92%</span>
              </div>

              <div className="floating-card business-card">
                <small>Local business</small>
                <strong>North Street Café</strong>
                <span>4 new tasks</span>
              </div>
            </div>
          </div>
        </section>

        <section className="logo-strip">
          <div className="container logo-row" aria-label="Partner brands">
            {partnerBrands.map((brand) => (
              <span key={brand}>{brand}</span>
            ))}
          </div>
        </section>

        <section id="features" className="features">
          <div className="container section-heading">
            <span className="eyebrow">Why CoopGig</span>
            <h2>Built for fair, flexible work.</h2>
          </div>

          <div className="container feature-grid">
            {features.map((feature) => (
              <article className="feature-card" key={feature.title}>
                <div className="icon-wrap">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="process">
          <div className="container section-heading narrow">
            <span className="eyebrow">How it works</span>
            <h2>Simple steps, better outcomes.</h2>
          </div>

          <div className="container steps-grid">
            {steps.map((step) => (
              <div className="step" key={step.number}>
                <span className="step-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="community" className="split-section">
          <div className="container split-grid">
            <div className="split-panel left-panel">
              <span className="eyebrow">For workers</span>
              <h2>Flexible work that fits your life.</h2>
              <ul>
                <li>Choose your own hours and service areas</li>
                <li>Access consistent local opportunities</li>
                <li>Build reputation through verified reviews</li>
              </ul>
              <a href="#join" className="btn btn-primary">Join as a worker</a>
            </div>

            <div className="split-panel right-panel">
              <span className="eyebrow">For businesses</span>
              <h2>Reliable help for everyday operations.</h2>
              <ul>
                <li>Book vetted community talent quickly</li>
                <li>Keep costs predictable with clear pricing</li>
                <li>Support local growth through cooperative networks</li>
              </ul>
              <a href="#join" className="btn btn-secondary">Hire with CoopGig</a>
            </div>
          </div>
        </section>

        <section id="pricing" className="testimonials">
          <div className="container section-heading">
            <span className="eyebrow">Community voices</span>
            <h2>People trust the way we work.</h2>
          </div>

          <div className="container testimonial-grid">
            {testimonials.map((item) => (
              <blockquote className="quote-card" key={item.name}>
                “{item.quote}”
                <footer>
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="cta-banner" id="join">
          <div className="container cta-wrap">
            <div>
              <span className="eyebrow light">Ready to grow together?</span>
              <h2>Start building a stronger local gig network.</h2>
            </div>
            <a href="#top" className="btn btn-light">Get started today</a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-wrap">
          <div>
            <a href="#top" className="brand footer-brand">
              <span className="brand-mark">C</span>
              <span>CoopGig</span>
            </a>
          </div>
          <div className="footer-links">
            <a href="#features">Features</a>
            <a href="#community">Community</a>
            <a href="#pricing">Reviews</a>
          </div>
          <p>© {new Date().getFullYear()} Cooperative Gig Services</p>
        </div>
      </footer>
    </div>
  )
}

export default App

'use client'
// Imports
import { useState, useLayoutEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'react-hot-toast'
import Link from "next/link"
import Layout from "@/components/layout/Layout"

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [screenSize, setScreenSize] = useState('desktop')
  const { login } = useAuth()
  const router = useRouter()

  useLayoutEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      if (width <= 767) {
        setScreenSize('mobile')
      } else if (width >= 768 && width <= 991) {
        setScreenSize('tablet')
      } else {
        setScreenSize('desktop')
      }
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast.error('Email dan password harus diisi')
      return
    }

    setIsLoading(true)
    
    try {
      const result = await login(email, password) // Gunakan context login
      
      if (result.success) {
        toast.success('Login berhasil!')
        router.push('/') // Mengarahkan ke halaman dashboard setelah login
        router.refresh() // Refresh halaman agar context dan komponen sinkron
      } else {
        toast.error(result.error || 'Login gagal. Silakan coba lagi.')
      }
    } catch (error) {
      toast.error('Terjadi kesalahan. Silakan coba lagi.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <style jsx global>{`
        .auth-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0f1c 0%, #1a2332 25%, #16213e 50%, #0f3460 75%, #0a0f1c 100%);
          position: relative;
          overflow: hidden;
        }

        .auth-page::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #ff6b6b 0%, #4ecdc4 20%, #45b7d1 40%, #96ceb4 60%, #ffeaa7 80%, #dda0dd 100%);
          box-shadow: 0 0 30px rgba(255, 107, 107, 0.5);
        }

        .auth-container {
          position: relative;
          z-index: 2;
          padding: 120px 0 80px 0;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .auth-card {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          padding: 40px;
          width: 100%;
          max-width: 450px;
          position: relative;
          overflow: hidden;
        }

        .auth-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #86FF00 0%, #4ecdc4 50%, #86FF00 100%);
          box-shadow: 0 0 20px rgba(134, 255, 0, 0.5);
        }

        .auth-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .auth-logo {
          width: 80px;
          height: 80px;
          margin: 0 auto 20px;
          background: linear-gradient(135deg, #86FF00 0%, #4ecdc4 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          font-weight: bold;
          color: #000;
          box-shadow: 0 4px 20px rgba(134, 255, 0, 0.4);
        }

        .auth-title {
          font-size: 32px;
          font-weight: 700;
          background: linear-gradient(135deg, #fff 0%, #f0f0f0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .auth-subtitle {
          color: #cbd5e1;
          font-size: 16px;
          font-weight: 300;
          letter-spacing: 0.3px;
        }

        .auth-tabs {
          display: flex;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 4px;
          margin-bottom: 30px;
        }

        .auth-tab {
          flex: 1;
          padding: 12px 20px;
          text-align: center;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s ease;
          text-decoration: none;
          color: #94a3b8;
        }

        .auth-tab.active {
          background: linear-gradient(135deg, #86FF00 0%, #4ecdc4 100%);
          color: #000;
          box-shadow: 0 4px 15px rgba(134, 255, 0, 0.3);
        }

        .auth-tab:not(.active):hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.1);
        }

        .auth-form {
          margin-bottom: 30px;
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-label {
          display: block;
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 8px;
          letter-spacing: 0.5px;
        }

        .form-input {
          width: 100%;
          padding: 16px 20px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          color: #fff;
          font-size: 16px;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .form-input::placeholder {
          color: #94a3b8;
        }

        .form-input:focus {
          outline: none;
          border-color: #86FF00;
          box-shadow: 0 0 0 3px rgba(134, 255, 0, 0.1);
          background: rgba(255, 255, 255, 0.12);
        }

        .auth-button {
          width: 100%;
          padding: 16px 24px;
          background: linear-gradient(135deg, #86FF00 0%, #4ecdc4 100%);
          color: #000;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(134, 255, 0, 0.3);
          letter-spacing: 0.5px;
        }

        .auth-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(134, 255, 0, 0.4);
        }

        .auth-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .auth-footer {
          text-align: center;
          margin-top: 30px;
          color: #94a3b8;
          font-size: 14px;
        }

        .auth-link {
          color: #86FF00;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .auth-link:hover {
          color: #4ecdc4;
        }

        @media (max-width: 768px) {
          .auth-container {
            padding: 100px 15px 40px 15px;
            min-height: calc(100vh - 60px);
          }
          
          .auth-card {
            padding: 25px 20px;
            max-width: 100%;
            margin: 0 auto;
            border-radius: 20px;
          }
          
          .auth-header {
            margin-bottom: 30px;
          }
          
          .auth-title {
            font-size: 26px;
            line-height: 1.2;
          }
          
          .auth-subtitle {
            font-size: 14px;
            line-height: 1.4;
          }
          
          .auth-logo {
            width: 60px;
            height: 60px;
            font-size: 24px;
            margin-bottom: 15px;
          }
          
          .auth-tabs {
            margin-bottom: 25px;
          }
          
          .auth-tab {
            padding: 10px 16px;
            font-size: 13px;
          }
          
          .form-group {
            margin-bottom: 18px;
          }
          
          .form-label {
            font-size: 13px;
            margin-bottom: 6px;
          }
          
          .form-input {
            padding: 14px 16px;
            font-size: 15px;
            border-radius: 10px;
          }
          
          .auth-button {
            padding: 14px 20px;
            font-size: 15px;
            border-radius: 10px;
          }
          
          .auth-footer {
            margin-top: 25px;
            font-size: 13px;
          }
        }

        @media (max-width: 480px) {
          .auth-container {
            padding: 90px 10px 30px 10px;
          }
          
          .auth-card {
            padding: 20px 15px;
            border-radius: 16px;
          }
          
          .auth-header {
            margin-bottom: 25px;
          }
          
          .auth-title {
            font-size: 24px;
          }
          
          .auth-subtitle {
            font-size: 13px;
          }
          
          .auth-logo {
            width: 50px;
            height: 50px;
            font-size: 20px;
            margin-bottom: 12px;
          }
          
          .auth-tabs {
            margin-bottom: 20px;
          }
          
          .auth-tab {
            padding: 8px 12px;
            font-size: 12px;
          }
          
          .form-group {
            margin-bottom: 16px;
          }
          
          .form-label {
            font-size: 12px;
            margin-bottom: 5px;
          }
          
          .form-input {
            padding: 12px 14px;
            font-size: 14px;
            border-radius: 8px;
          }
          
          .auth-button {
            padding: 12px 18px;
            font-size: 14px;
            border-radius: 8px;
          }
          
          .auth-footer {
            margin-top: 20px;
            font-size: 12px;
          }
        }

        @media (max-width: 360px) {
          .auth-container {
            padding: 80px 8px 25px 8px;
          }
          
          .auth-card {
            padding: 18px 12px;
            border-radius: 14px;
          }
          
          .auth-title {
            font-size: 22px;
          }
          
          .auth-logo {
            width: 45px;
            height: 45px;
            font-size: 18px;
          }
          
          .form-input {
            padding: 11px 12px;
            font-size: 13px;
          }
          
          .auth-button {
            padding: 11px 16px;
            font-size: 13px;
          }
        }
      `}</style>

      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-header">
              <div className="auth-logo">U</div>
              <h1 className="auth-title">Welcome Back</h1>
              <p className="auth-subtitle">Sign in to your UglyDog account</p>
            </div>

            <div className="auth-tabs">
              <Link href="/register" className="auth-tab">Register</Link>
              <Link href="#" className="auth-tab active">Login</Link>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input 
                  type="email" 
                  className="form-input"
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Password *</label>
                <input 
                  type="password" 
                  className="form-input"
                  placeholder="Enter your password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>

              <button 
                type="submit" 
                className="auth-button"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <div className="auth-footer">
              Don't have an account? <Link href="/register" className="auth-link">Create one here</Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
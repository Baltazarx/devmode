
'use client'
// Imports
import { useState, useLayoutEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import Link from "next/link"
import Layout from "@/components/layout/Layout"
import api from '@/api'

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [screenSize, setScreenSize] = useState('desktop')
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validasi
    if (formData.password !== formData.confirmPassword) {
      toast.error('Password dan konfirmasi password tidak sama')
      return
    }

    if (!formData.agreeTerms) {
      toast.error('Anda harus menyetujui syarat dan ketentuan')
      return
    }

    setIsLoading(true)

    try {
      // CSRF untuk Sanctum (sudah ditangani oleh interceptor axios)
      await api.get('/sanctum/csrf-cookie');

      const response = await api.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword // backend laravel memerlukan ini
      })

      // const data = await response.json()
      const data = response.data

      if (!response.status === 200) {
        throw new Error(data.message || 'Registrasi gagal')
      }

      toast.success('Registrasi berhasil! Silakan login')
      router.push('/login')
    } catch (error) {
      toast.error(error.message || 'Terjadi kesalahan. Silakan coba lagi.')
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
          max-width: 500px;
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
          margin-bottom: 20px;
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

        .form-checkbox {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 24px;
        }

        .checkbox-input {
          width: 20px;
          height: 20px;
          accent-color: #86FF00;
          margin-top: 2px;
        }

        .checkbox-label {
          color: #cbd5e1;
          font-size: 14px;
          line-height: 1.5;
          cursor: pointer;
        }

        .checkbox-link {
          color: #86FF00;
          text-decoration: none;
          font-weight: 600;
        }

        .checkbox-link:hover {
          color: #4ecdc4;
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
          
          .form-checkbox {
            margin-bottom: 20px;
            gap: 10px;
          }
          
          .checkbox-input {
            width: 18px;
            height: 18px;
            margin-top: 1px;
          }
          
          .checkbox-label {
            font-size: 13px;
            line-height: 1.4;
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
          
          .form-checkbox {
            margin-bottom: 18px;
            gap: 8px;
          }
          
          .checkbox-input {
            width: 16px;
            height: 16px;
          }
          
          .checkbox-label {
            font-size: 12px;
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
              <h1 className="auth-title">Join UglyDog</h1>
              <p className="auth-subtitle">Create your account and start playing</p>
            </div>

            <div className="auth-tabs">
              <Link href="#" className="auth-tab active">Register</Link>
              <Link href="/login" className="auth-tab">Login</Link>
                    </div>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                        <input 
                          type="text" 
                          name="name"
                  className="form-input"
                  placeholder="Enter your full name" 
                          value={formData.name}
                          onChange={handleChange}
                          required 
                        />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                        <input 
                          type="email" 
                          name="email"
                  className="form-input"
                  placeholder="Enter your email" 
                          value={formData.email}
                          onChange={handleChange}
                          required 
                        />
              </div>

              <div className="form-group">
                <label className="form-label">Password *</label>
                        <input 
                          type="password" 
                          name="password"
                  className="form-input"
                  placeholder="Create a password" 
                          value={formData.password}
                          onChange={handleChange}
                          required 
                        />
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Password *</label>
                        <input 
                          type="password" 
                          name="confirmPassword"
                  className="form-input"
                  placeholder="Confirm your password" 
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required 
                        />
              </div>

              <div className="form-checkbox">
                        <input 
                          type="checkbox" 
                          id="agreeTerms" 
                          name="agreeTerms"
                  className="checkbox-input"
                          checked={formData.agreeTerms}
                          onChange={handleChange}
                        />
                <label htmlFor="agreeTerms" className="checkbox-label">
                  I accept the <Link href="#" className="checkbox-link">Terms of Conditions</Link> and <Link href="#" className="checkbox-link">Privacy Policy</Link>
                        </label>  
                    </div>

                      <button 
                        type="submit" 
                className="auth-button"
                        disabled={isLoading}
                      >
                {isLoading ? 'Creating Account...' : 'Create Account'}
                      </button>
                </form>

            <div className="auth-footer">
              Already have an account? <Link href="/login" className="auth-link">Sign in here</Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
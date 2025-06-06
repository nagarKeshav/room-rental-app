import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import {Link, useNavigate} from 'react-router-dom';
import authService from '../FirebaseService/auth';
import { authSlice } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import { Login } from '../store/authSlice';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  // Password validation
  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters long';
    if (!/(?=.*[a-z])/.test(password)) return 'Password must contain at least one lowercase letter';
    if (!/(?=.*[A-Z])/.test(password)) return 'Password must contain at least one uppercase letter';
    if (!/(?=.*\d)/.test(password)) return 'Password must contain at least one number';
    if (!/(?=.*[@$!%*?&])/.test(password)) return 'Password must contain at least one special character (@$!%*?&)';
    return '';
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation
    if (touched[name]) {
      const error = name === 'email' ? validateEmail(value) : validatePassword(value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  // Handle input blur
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = name === 'email' ? validateEmail(value) : validatePassword(value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
  if (e && e.preventDefault) e.preventDefault();
  setIsSubmitting(true);

  const emailError = validateEmail(formData.email);
  const passwordError = validatePassword(formData.password);
  
  const newErrors = {
    email: emailError,
    password: passwordError
  };

  setErrors(newErrors);
  setTouched({ email: true, password: true });

  if (!emailError && !passwordError) {
    try {
      const session = await authService.loginAccount({
        email: formData.email.trim(),
        password: formData.password.trim()
      });

      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(Login(userData));
          navigate('/');
        }
      }
    } catch (error) {
      setErrors({ ...newErrors, email: error.message });
    } finally {
      setIsSubmitting(false);
    }
  } else {
    setIsSubmitting(false);
  }
};


  const getInputClasses = (fieldName) => {
    const baseClasses = "w-full pl-12 pr-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 bg-gray-50";
    
    if (touched[fieldName] && errors[fieldName]) {
      return `${baseClasses} border-red-300 focus:border-red-500 focus:ring-red-100 bg-red-50`;
    } else if (touched[fieldName] && !errors[fieldName] && formData[fieldName]) {
      return `${baseClasses} border-green-300 focus:border-green-500 focus:ring-green-100 bg-green-50`;
    }
    
    return `${baseClasses} border-gray-200 focus:border-orange-400 focus:ring-orange-100`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-500">Please sign in to your account</p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClasses('email')}
                  placeholder="Enter your email"
                  autoComplete="email"
                />
                {touched.email && !errors.email && formData.email && (
                  <CheckCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                )}
                {touched.email && errors.email && (
                  <AlertCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                )}
              </div>
              {touched.email && errors.email && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClasses('password')}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {touched.password && errors.password && (
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-red-600 flex items-start">
                    <AlertCircle className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" />
                    {errors.password}
                  </p>
                </div>
              )}
              
              {/* Password Requirements */}
              {formData.password && (
                <div className="mt-2 space-y-1">
                  <p className="text-xs font-medium text-gray-600">Password requirements:</p>
                  <div className="grid grid-cols-1 gap-1 text-xs">
                    <div className={`flex items-center ${formData.password.length >= 8 ? 'text-green-600' : 'text-gray-500'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full mr-2 ${formData.password.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      At least 8 characters
                    </div>
                    <div className={`flex items-center ${/(?=.*[a-z])/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full mr-2 ${/(?=.*[a-z])/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      One lowercase letter
                    </div>
                    <div className={`flex items-center ${/(?=.*[A-Z])/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full mr-2 ${/(?=.*[A-Z])/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      One uppercase letter
                    </div>
                    <div className={`flex items-center ${/(?=.*\d)/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full mr-2 ${/(?=.*\d)/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      One number
                    </div>
                    <div className={`flex items-center ${/(?=.*[@$!%*?&])/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full mr-2 ${/(?=.*[@$!%*?&])/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      One special character (@$!%*?&)
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-400"
                />
                <span className="ml-2 text-sm text-gray-500">Remember me</span>
              </label>
              <a href="#" className="text-sm text-orange-600 hover:text-orange-500 transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || Object.values(errors).some(error => error)}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg hover:from-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{' '}
              <Link to="/signup" className="text-orange-600 hover:text-orange-500 font-medium transition-colors">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
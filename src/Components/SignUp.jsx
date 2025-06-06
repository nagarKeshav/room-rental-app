import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../FirebaseService/auth';
import { useDispatch } from 'react-redux';
import { Login } from '../store/authSlice';

export default function SignUpPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation functions
  const validators = {
    name: (value) => {
      if (!value.trim()) return 'Name is required';
      if (value.length < 2) return 'Name must be at least 2 characters';
      if (value.length > 50) return 'Name must be under 50 characters';
      if (!/^[a-zA-Z\s'-]+$/.test(value)) return 'Only letters, spaces, hyphens, apostrophes allowed';
      return '';
    },
    email: (value) => {
      if (!value) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
      return '';
    },
    password: (value) => {
      if (!value) return 'Password is required';
      if (value.length < 8) return 'At least 8 characters';
      if (!/[a-z]/.test(value)) return 'Must include a lowercase letter';
      if (!/[A-Z]/.test(value)) return 'Must include an uppercase letter';
      if (!/\d/.test(value)) return 'Must include a number';
      if (!/[@$!%*?&]/.test(value)) return 'Must include special character (@$!%*?&)';
      return '';
    },
    confirmPassword: (value, password) => {
      if (!value) return 'Confirm your password';
      if (value !== password) return 'Passwords do not match';
      return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = name === 'confirmPassword'
        ? validators.confirmPassword(value, formData.password)
        : validators[name](value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const error = name === 'confirmPassword'
      ? validators.confirmPassword(value, formData.password)
      : validators[name](value);

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all fields
    const nameError = validators.name(formData.name);
    const emailError = validators.email(formData.email);
    const passwordError = validators.password(formData.password);
    const confirmPasswordError = validators.confirmPassword(formData.confirmPassword, formData.password);

    const newErrors = {
      name: nameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError
    };

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true
    });

    // If any error exists, stop
    if (Object.values(newErrors).some(err => err)) {
      setIsSubmitting(false);
      return;
    }

    // Register user with Firebase
    try {
      const userData = await authService.createAccount(
        formData.name,
        formData.email,
        formData.password
      );
      if (userData) {
        dispatch(Login(userData));
        navigate('/');
      }
    } catch (error) {
      setErrors({ ...newErrors, email: error.message }); // show firebase error
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputClasses = (field) => {
    const base = "w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 bg-gray-50 transition-all";
    if (touched[field] && errors[field]) return `${base} border-red-300 focus:ring-red-100 bg-red-50`;
    if (touched[field] && !errors[field]) return `${base} border-green-300 focus:ring-green-100 bg-green-50`;
    return `${base} border-gray-200 focus:ring-orange-100`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h1>
          <p className="text-gray-500">Join us today and get started</p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleRegister}>
          {/* Input fields: You can reuse your existing inputs here, same as your original component */}

          {/* Example: Name field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputClasses('name')}
                placeholder="Enter your full name"
              />
              {touched.name && errors.name && (
                <AlertCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500 w-5 h-5" />
              )}
              {touched.name && !errors.name && (
                <CheckCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
              )}
            </div>
            {touched.name && errors.name && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" /> {errors.name}
              </p>
            )}
                     </div>
           
                     {/* Add other inputs here: email, password, confirmPassword (you can reuse your current JSX) */}
                     {/* Email Field */}
           <div>
             <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">Email</label>
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
               />
               {touched.email && errors.email && (
                 <AlertCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500 w-5 h-5" />
               )}
               {touched.email && !errors.email && (
                 <CheckCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
               )}
             </div>
             {touched.email && errors.email && (
               <p className="mt-1 text-sm text-red-600 flex items-center">
                 <AlertCircle className="w-4 h-4 mr-1" /> {errors.email}
               </p>
             )}
           </div>
           
           {/* Password Field */}
           <div>
             <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">Password</label>
             <div className="relative">
               <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
               <input
                 type={showPassword ? "text" : "password"}
                 id="password"
                 name="password"
                 value={formData.password}
                 onChange={handleChange}
                 onBlur={handleBlur}
                 className={getInputClasses('password')}
                 placeholder="Enter your password"
               />
               <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2">
                 {showPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
               </button>
             </div>
             {touched.password && errors.password && (
               <p className="mt-1 text-sm text-red-600 flex items-center">
                 <AlertCircle className="w-4 h-4 mr-1" /> {errors.password}
               </p>
             )}
           </div>
           
           {/* Confirm Password Field */}
           <div>
             <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600 mb-2">Confirm Password</label>
             <div className="relative">
               <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
               <input
                 type={showConfirmPassword ? "text" : "password"}
                 id="confirmPassword"
                 name="confirmPassword"
                 value={formData.confirmPassword}
                 onChange={handleChange}
                 onBlur={handleBlur}
                 className={getInputClasses('confirmPassword')}
                 placeholder="Confirm your password"
               />
               <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2">
                 {showConfirmPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
               </button>
             </div>
             {touched.confirmPassword && errors.confirmPassword && (
               <p className="mt-1 text-sm text-red-600 flex items-center">
                 <AlertCircle className="w-4 h-4 mr-1" /> {errors.confirmPassword}
               </p>
             )}
           </div>
           
           

          {/* Terms */}
          <div className="flex items-start text-sm text-gray-500">
            <input type="checkbox" className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-400 mt-1" required />
            <span className="ml-2">
              I agree to the <a href="#" className="text-orange-600 hover:text-orange-500">Terms</a> and <a href="#" className="text-orange-600 hover:text-orange-500">Privacy Policy</a>
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-600 hover:text-orange-500 font-medium">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}

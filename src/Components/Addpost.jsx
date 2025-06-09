import { useState } from 'react';
import {auth} from '../Firebase/Firebase'
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../Firebase/Firebase"; // Adjust path as per your project



const Addpost = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    facilities: [],
    image: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const availableFacilities = [
    'WiFi',
    'TV',
    'Air Conditioning',
    'Private Bathroom',
    'Kitchen Access',
    'Parking',
    'Laundry',
    'Gym Access',
    'Swimming Pool',
    'Balcony'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          image: 'Please select a valid image file (JPEG, PNG, or WebP)'
        }));
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          image: 'Image size must be less than 5MB'
        }));
        return;
      }

      const data = new FormData(); // Capital F is important
data.append('file', file);
data.append('upload_preset', 'unsigned_preset');
// cloud_name is NOT needed in body; it's in the URL

const res = await fetch('https://api.cloudinary.com/v1_1/dfy2yr2f0/image/upload', {
  method: 'POST',
  body: data
});

const uploadImageUrl = await res.json();

console.log(uploadImageUrl.secure_url);

        

      

      setFormData(prev => ({
        ...prev,
        image: uploadImageUrl.secure_url
      }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);

      // Clear any existing error
      if (errors.image) {
        setErrors(prev => ({
          ...prev,
          image: ''
        }));
      }
    }
  };

  const handleFacilityChange = (facility) => {
    setFormData(prev => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter(f => f !== facility)
        : [...prev.facilities, facility]
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters long';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters long';
    }

    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be a valid positive number';
    }

    if (!formData.image) {
      newErrors.image = 'Room image is required';
    }

    if (formData.facilities.length === 0) {
      newErrors.facilities = 'Please select at least one facility';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsSubmitting(false);
      return;


      

    }

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('price', formData.price);
      submitData.append('facilities', JSON.stringify(formData.facilities));
      submitData.append('image', formData.image);

      // Mock API call - replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Room data submitted:', formData);
      setSubmitSuccess(true);

      try {
  const roomData = {
    title: formData.title,
    description: formData.description,
    price: parseFloat(formData.price),
    facilities: formData.facilities,
    imageUrl: formData.image,
    createdAt: Timestamp.now(),
    ownerId: auth.currentUser.uid 
  };

  await addDoc(collection(db, "rooms"), roomData); // 👈 Saving to Firestore

  console.log('Room data submitted to Firestore:', roomData);
  setSubmitSuccess(true);

  // Reset form
  setFormData({
    title: '',
    description: '',
    price: '',
    facilities: [],
    image: null
  });
  setImagePreview(null);
  setErrors({});
  
  // Reset file input
  const fileInput = document.getElementById('image');
  if (fileInput) fileInput.value = '';
} catch (error) {
  console.error("Firestore submit error:", error);
  setErrors({ submit: 'Failed to submit room. Please try again.' });
}


      // Reset form after successful submission
      setFormData({
        title: '',
        description: '',
        price: '',
        facilities: [],
        image: null
      });
      setImagePreview(null);
      setErrors({});

      // Reset file input
      const fileInput = document.getElementById('image');
      if (fileInput) fileInput.value = '';

    } catch (error) {
      setErrors({ submit: 'Failed to submit room. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Room</h1>
            <p className="text-gray-600">Create a new room listing with all the details</p>
          </div>

          {submitSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">✓ Room added successfully!</p>
            </div>
          )}

          <div className="space-y-6">
            {/* Title Field */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Room Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${errors.title ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                placeholder="Enter room title (e.g., Cozy Downtown Apartment)"
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>

            {/* Description Field */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors resize-vertical ${errors.description ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                placeholder="Describe your room in detail. Include location, amenities, and what makes it special..."
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>

            {/* Price Field */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                Price per Night ($) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${errors.price ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                placeholder="0.00"
              />
              {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
            </div>

            {/* Facilities Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Facilities & Amenities *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {availableFacilities.map((facility) => (
                  <label
                    key={facility}
                    className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-orange-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={formData.facilities.includes(facility)}
                      onChange={() => handleFacilityChange(facility)}
                      className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <span className="ml-3 text-sm text-gray-700">{facility}</span>
                  </label>
                ))}
              </div>
              {errors.facilities && <p className="mt-2 text-sm text-red-600">{errors.facilities}</p>}
            </div>

            {/* Image Upload Field */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Room Image *
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-orange-400 transition-colors">
                <div className="space-y-1 text-center">
                  {imagePreview ? (
                    <div className="mb-4">
                      <img
                        src={imagePreview}
                        alt="Room preview"
                        className="mx-auto h-32 w-auto object-cover rounded-lg"
                      />
                      <p className="mt-2 text-sm text-gray-500">Click to change image</p>
                    </div>
                  ) : (
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="image"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500"
                    >
                      <span>{imagePreview ? 'Change image' : 'Upload a file'}</span>
                      <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, WebP up to 5MB</p>
                </div>
              </div>
              {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-all duration-200 ${isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 focus:ring-4 focus:ring-orange-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                  }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding Room...
                  </span>
                ) : (
                  'Add Room'
                )}
              </button>
            </div>

            {errors.submit && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800">{errors.submit}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addpost;
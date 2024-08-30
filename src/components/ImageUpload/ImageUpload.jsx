import React from 'react';
import './ImageUpload.css';

const uploadUrl = import.meta.env.VITE_CLOUDINARY_URL;  // Cloudinary URL or your server endpoint
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;  // Cloudinary upload preset

const ImageUpload = ({ name, label, profileImage, handleImageUpload, setMessage }) => {

  const handleSelectImage = async (event) => {
    const file = event.target.files[0];

    if (file.size > 80000) {
      return setMessage('Image too large. Please select a smaller image (max: 80KB)');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
      const res = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      });

      const imageData = await res.json();
      handleImageUpload(imageData.secure_url);  // Update the profile image URL
      setMessage('');
    } catch (error) {
      console.error('Image upload failed:', error);
      setMessage('Image upload failed. Please try again.');
    }
  };

  return (
    <>
      {profileImage ? (
        <div 
          className="profile-image" 
          style={{ backgroundImage: `url(${profileImage})` }}
        ></div>
      ) : (
        <>
          <label htmlFor={name}>{label}</label>
          <input 
            type="file" 
            name={name} 
            id={name} 
            accept="image/*" 
            onChange={handleSelectImage} 
          />
        </>
      )}
    </>
  );
};

export default ImageUpload;


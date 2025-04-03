import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import './MyProfile.css'; // We'll create this file next
import { toast } from 'react-toastify';

const MyProfile = () => {
    const { url, token } = useContext(StoreContext);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [userData, setUserData] = useState({
      name: "",
      email: "",
      phone: "",
      address: "",
      image: "",
      id:""
    });
    const [isEdit, setIsEdit] = useState(false);
    const [imageFile, setImageFile] = useState(null);

    const fetchProfile = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${url}/api/user/profile`, {
                headers: { token }
            });
            if (response.data.success) {
                const user = response.data.user;
                setUserData(prev => ({
                    ...prev,
                    name: user.name,
                    email: user.email,
                    phone: user.phone || '',
                    address: user.address || '',
                    image: user.image || assets.profile_pic,
                    id: user.id
                }));
            }
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching profile:", error);
            setMessage({ text: 'Failed to load profile data', type: 'error' });
            setIsLoading(false);
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
            setUserData({
                ...userData,
                image: URL.createObjectURL(e.target.files[0])
            });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const updateProfile = async () => {
        try {
            setIsLoading(true);
            
            // Create FormData for image upload
            const formData = new FormData();
            formData.append('name', userData.name);
            formData.append('phone', userData.phone);
            formData.append('address', userData.address);
            formData.append('id', userData.id);
            if (imageFile) {
                formData.append('image', imageFile);
            }
            
            const response = await axios.post(
                `${url}/api/user/update`,
                formData,
                {
                    headers: { 
                        token,
                        
                    }
                }
            );
            
            if (response.data.success) {
               toast.success("profile Updated Successfully")
                setIsEdit(false);
            } else {
                setMessage({ text: response.data.message || 'Update failed', type: 'error' });
            }
            setIsLoading(false);
        } catch (error) {
            console.error("Error updating profile:", error);
           toast.error("Failed to Update Profile")
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchProfile();
        }
    }, [token]);

  
  return (
    <div className='profile-container'>
      {isLoading && <div className="loader">Loading...</div>}
      
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      
      <div className='profile-card'>
        <div className='profile-header'>
          <div className='profile-image-container'>
          <img 
  src={
    userData.image.startsWith('blob:')
      ? userData.image
      : `${url}/images/${userData.image}`
  } 
  alt="Profile" 
  className='profile-image'  />
            {isEdit && (
              <div className='image-upload'>
                <label htmlFor="image-input">
                  <div className='edit-icon'>
                    <i className="fas fa-camera"></i>
                  </div>
                </label>
                <input 
                  id="image-input" 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  style={{ display: 'none' }}
                />
              </div>
            )}
          </div>
          
          <div className='profile-name'>
            {isEdit ? (
              <input 
                name="name"
                value={userData.name} 
                type="text" 
                onChange={handleInputChange}
                className="edit-input"
                placeholder="Your Name"
              />
            ) : (
              <h2>{userData.name}</h2>
            )}
          </div>
        </div>
        
        <div className='profile-info'>
          <h3>Contact Information</h3>
          
          <div className='info-item'>
            <div className='info-label'>Email:</div>
            <div className='info-value'>{userData.email}</div>
          </div>
          
          <div className='info-item'>
            <div className='info-label'>Phone:</div>
            <div className='info-value'>
              {isEdit ? (
                <input 
                  name="phone"
                  value={userData.phone} 
                  type="text" 
                  onChange={handleInputChange}
                  className="edit-input"
                  placeholder="Your Phone Number"
                />
              ) : (
                <span>{userData.phone || 'Not provided'}</span>
              )}
            </div>
          </div>
          
          <div className='info-item'>
            <div className='info-label'>Address:</div>
            <div className='info-value'>
              {isEdit ? (
                <textarea 
                  name="address"
                  value={userData.address} 
                  onChange={handleInputChange}
                  className="edit-input"
                  placeholder="Your Address"
                  rows="3"
                />
              ) : (
                <span>{userData.address || 'Not provided'}</span>
              )}
            </div>
          </div>
        </div>
        
        <div className='profile-actions'>
          {isEdit ? (
            <>
              <button 
                className='btn-save' 
                onClick={updateProfile} 
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
              <button 
                className='btn-cancel' 
                onClick={() => {
                  setIsEdit(false);
                  fetchProfile(); 
                }}
                disabled={isLoading}
              >
                Cancel
              </button>
            </>
          ) : (
            <button 
              className='btn-edit' 
              onClick={() => setIsEdit(true)}
              disabled={isLoading}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyProfile

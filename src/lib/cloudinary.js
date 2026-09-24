// Cloudinary Direct Client-Side Upload Utility
const DEFAULT_CLOUD_NAME = 'dgvxxshjd';
const DEFAULT_PRESET = 'faudi_uploads';

export const getCloudinaryConfig = () => {
  const cloudName =
    (typeof window !== 'undefined' && localStorage.getItem('faudi_cloudinary_cloud_name')) ||
    import.meta.env.VITE_CLOUDINARY_CLOUD_NAME ||
    DEFAULT_CLOUD_NAME;

  const uploadPreset =
    (typeof window !== 'undefined' && localStorage.getItem('faudi_cloudinary_preset')) ||
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET ||
    DEFAULT_PRESET;

  return { cloudName, uploadPreset };
};

/**
 * Upload an image file directly to Cloudinary using an unsigned upload preset
 * @param {File} file - Browser File object from input[type="file"]
 * @returns {Promise<{ url: string, public_id: string }>}
 */
export async function uploadToCloudinary(file) {
  const { cloudName, uploadPreset } = getCloudinaryConfig();

  if (!cloudName) {
    throw new Error('Cloudinary Cloud Name is not configured.');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  formData.append('folder', 'faudi_products');

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();

    if (!res.ok || data.error) {
      const errorMsg = data.error?.message || 'Upload failed';
      if (errorMsg.includes('preset') || errorMsg.includes('unsigned')) {
        throw new Error(
          `Cloudinary preset "${uploadPreset}" not found or not set to Unsigned. In Cloudinary: Settings > Upload > Add upload preset > set Signing Mode to "Unsigned" and name it "${uploadPreset}".`
        );
      }
      throw new Error(errorMsg);
    }

    // Return the secure optimized URL
    return {
      url: data.secure_url,
      publicId: data.public_id,
    };
  } catch (err) {
    console.error('Cloudinary upload error:', err);
    throw err;
  }
}

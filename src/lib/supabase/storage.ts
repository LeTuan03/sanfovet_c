import { supabase } from "./config";

export const uploadFile = async (
  file: File,
  path: string,
  onProgress?: (percent: number) => void
): Promise<string> => {
  try {
    const bucketName = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || 'sanfovet';
    
    // Simulating progress for better UX since Supabase standard upload doesn't provide it
    // For real progress, one would need TUS or a custom XHR/Fetch with progress
    if (onProgress) {
      onProgress(10);
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
    const filePath = path ? `${path}/${fileName}` : fileName;

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      throw error;
    }

    if (onProgress) {
      onProgress(100);
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error("Supabase Storage Error:", error);
    throw error;
  }
};

export const deleteFile = async (path: string): Promise<void> => {
  try {
    const bucketName = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || 'sanfovet';
    const { error } = await supabase.storage
      .from(bucketName)
      .remove([path]);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("Supabase Delete Error:", error);
    throw error;
  }
};

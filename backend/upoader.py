from supabase import create_client
import mimetypes
import os

url = "https://wuwnrcjociifqmfjiyvc.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1d25yY2pvY2lpZnFtZmppeXZjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjcwNjQ1OCwiZXhwIjoyMDYyMjgyNDU4fQ.PtK-zEfDnIfVCJLzdNpKQswKJl6SiyYktI7bVGC75g0"

supabase = create_client(url, key)
bucket = "company-logos"

# Directory where your images are stored
image_dir = "/home/estifanosfm/Pictures/finsight"
image_files = os.listdir(image_dir)

for file_name in image_files:
    file_path = os.path.join(image_dir, file_name)
    content_type, _ = mimetypes.guess_type(file_path)
    
    with open(file_path, "rb") as f:
        # Upload image
        storage_path = f"{file_name}"  # or f"company123/{file_name}" for subfolders
        res = supabase.storage.from_(bucket).upload(
            storage_path, f, {"content-type": content_type}
        )
        
        # Get public URL
        public_url = f"{url}/storage/v1/object/public/{bucket}/{storage_path}"
        print(f"{file_name} uploaded at: {public_url}")
        
        # Optional: Save public_url to your companies table

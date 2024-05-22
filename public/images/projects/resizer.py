import os
from PIL import Image

def resize_images(input_folder, output_folder, target_height=200):
    # Create the output folder if it doesn't exist
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
    
    # Iterate through each file in the input folder
    for filename in os.listdir(input_folder):
        # Check for file extensions
        if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
            # Construct full file path
            input_path = os.path.join(input_folder, filename)
            output_path = os.path.join(output_folder, filename)

            # Open the image
            with Image.open(input_path) as img:
                # Check if the image height is greater than the target height
                if img.height > target_height:
                    # Calculate the new width to maintain aspect ratio
                    width = int((target_height / img.height) * img.width)
                    # Resize the image
                    resized_img = img.resize((width, target_height), Image.ANTIALIAS)
                    # Save the resized image
                    resized_img.save(output_path)
                else:
                    # Save the original image if no resizing is needed
                    img.save(output_path)

# Example usage
input_folder_path = './thumbnails'
output_folder_path = './thumbnails-resized'
resize_images(input_folder_path, output_folder_path)

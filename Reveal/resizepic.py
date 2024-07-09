from PIL import Image

def resize_image(input_path, output_path, size=(1000, 800)):
    # Mở ảnh từ đường dẫn
    with Image.open(input_path) as img:
        # Đổi kích thước ảnh
        resized_img = img.resize(size)
        # Lưu ảnh đã đổi kích thước
        resized_img.save(output_path)
        print(f"Đã lưu ảnh đã đổi kích thước tại: {output_path}")

# Đường dẫn ảnh gốc và ảnh sau khi thay đổi kích thước
input_path = "C:/Users/84914/Dropbox/PC/Downloads/Reveal/Reveal/assets/img/portfolio/dodung1.jpg"
output_path = "C:/Users/84914/Dropbox/PC/Downloads/Reveal/Reveal/assets/img/portfolio/dodung1.jpg"

# Gọi hàm để đổi kích thước ảnh
resize_image(input_path, output_path)
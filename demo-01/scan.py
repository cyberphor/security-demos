import socket
import sys

def scan_file(file_path):
    host = 'localhost'
    port = 3310
    
    with open(file_path, 'rb') as f:
        file_data = f.read()
    
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.connect((host, port))
        s.sendall(b'zINSTREAM\0' + len(file_data).to_bytes(4, byteorder='big') + file_data + b'\0\0\0\0')
        response = s.recv(4096)
    
    return response.decode('utf-8')

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python scan_file.py <file_path>")
        sys.exit(1)

    file_path = sys.argv[1]
    result = scan_file(file_path)
    print("Scan result:", result)

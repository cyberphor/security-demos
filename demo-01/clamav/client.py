from argparse import ArgumentParser
import socket

def scan(clamav_server: tuple, file_name: str):
    with open(file_name, "rb") as f:
        data = f.read()
        length = len(data).to_bytes(4, byteorder="big")
        header = b"zINSTREAM\0"
        footer = b"\0\0\0\0"
        file_to_scan = header + length + data + footer 
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.connect(clamav_server)
        s.sendall(file_to_scan)
        response = s.recv(4096).decode("UTF-8").split("stream: ")[1]
        return response

if __name__ == "__main__":
    parser = ArgumentParser()
    parser.add_argument("-a", help="ClamAV server address", default="localhost")
    parser.add_argument("-p", help="ClamAV server port", default=3310)
    parser.add_argument("-f", required=True, help="file to scan")
    args = parser.parse_args()
    report = scan(clamav_server=(args.a, args.p), file_name=args.f)
    print(report)


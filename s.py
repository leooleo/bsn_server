import socket
import random
from time import sleep

host = socket.gethostname()
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)


s.connect((host, 8080))

arr = [5,15,35,65,89,95]
for i in arr:
    sleep(3)
    s.sendall(str(i))
    print(i)

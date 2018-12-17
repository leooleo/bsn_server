import socket
import random
from time import sleep

host = socket.gethostname()

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((host, 6060))


while(True):
    data = random.uniform(0,100)
    packet = str(data) + '*'
    s.sendall(str.encode(packet))
    sleep(1)
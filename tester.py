import socket
import random
from time import sleep

host = socket.gethostname()

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((host, 6060))

data_file = open('bsn_output.txt', 'r')
lines = data_file.readlines()

for line in lines:
    packet = line + '*'
    s.sendall(str.encode(packet))
    sleep(1)
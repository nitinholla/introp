import sys
import serial
import time 
import platform

if (platform.system() == 'Linux'):
	s = serial.Serial('/dev/ttyACM0',57600,timeout=5)
elif (platform.system() == 'Windows'):
    s = serial.Serial('COM2',57600,timeout=5)
#print sys.argv[0]
data = sys.argv[1] + sys.argv[2]
#s.write('1901')
s.write(data)
#time.sleep(1)
#msg= s.readline()
#print msg

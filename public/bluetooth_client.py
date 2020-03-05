# Written By Liam Wang and Dylan Smith

# from bluetooth import *
import sys, time, json, os, logging, threading

from watchdog.observers import Observer
from watchdog.events import *
import bluetooth.msbt as bluetooth
import bluetooth._msbt as bt

path = ""

if os.name == "posix":
    path = os.path.expanduser("~")+"/Library/Application Support/ScoutKit/data/"
elif os.name == "nt":
    path = os.path.expanduser("~")+"/AppData/Roaming/ScoutKit/data/"
def set_interval(func, sec):
    def func_wrapper():
        set_interval(func, sec)
        func()
    t = threading.Timer(sec, func_wrapper)
    t.start()
    return t

def check_for_addrs():
	try:
		nearby_devices = bluetooth.discover_devices(lookup_names=True)
		file = open(path + "resources/bluetooth.json", "r+")
		data = json.loads(file.read())
		data["possible_addrs"] = nearby_devices
		file.seek(0)
		file.write(json.dumps(data))
		file.truncate()
		file.close()
	except OSError:
		pass

set_interval(check_for_addrs, 60)

class NewEventHandler(FileSystemEventHandler):
    def on_any_event(self,event):
        if (event.event_type == "modified" or event.event_type == "created") and not os.path.isdir(event.src_path):
            file = open(event.src_path, "r")
            message = file.read()
            if not len(message) == 0 and message[0] == "{" and "info" in json.loads(message):

                bluetoothFile = open(path + "resources/bluetooth.json", "r")
                bluetoothJSON = json.loads(bluetoothFile.read())

                uuid = bluetoothJSON["uuid"]
                addr = bluetoothJSON["target_addr"]

                bluetoothFile.close()

                service_matches = bluetooth.find_service(address=addr, uuid=uuid)

                go_on = False
                while not go_on:
                    if len(service_matches) == 0:
                        addr = None
                        service_matches = bluetooth.find_service(uuid=uuid, address=addr)
                        if len(service_matches) == 0:
                            time.sleep(.5)
                            continue
                    go_on = True
                first_match = service_matches[0]
                port = first_match["port"]
                host = first_match["host"]

                # Create the client socket
                sock = bluetooth.BluetoothSocket(bluetooth.RFCOMM)
                sock.connect((host, port))

                sock.send(message)
                time.sleep(.1)
                sock.send("end")

                sock.close()

if __name__ == "__main__":
    pass
    logging.basicConfig(level=logging.INFO,
                        format='%(asctime)s - %(message)s',
                        datefmt='%Y-%m-%d %H:%M:%S')
    # path = sys.argv[1] if len(sys.argv) > 1 else '.'
    event_handler = NewEventHandler()
    observer = Observer()
    observer.schedule(event_handler, path, recursive=True)
    observer.start()
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()

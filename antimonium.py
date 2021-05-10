import eel

import json
import os
import subprocess as sub
import threading
import time

if __name__ == "__main__":
	eel.init("assets")
	eel.start("index.html", port=0, size=(600,600), mode="chrome")
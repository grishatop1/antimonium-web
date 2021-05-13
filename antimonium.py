import eel

import json
import os
import subprocess as sub
import threading
import time
import sys

import tkinter as tk
from tkinter.filedialog import askopenfilename

class App:
	def __init__(self):
		self.process = None

class AppProcess:
	def __init__(self, filepath, name):
		self.filepath = filepath
		self.name = name
		self.running = False

	def kill(self):
		self.running = False
		self.process.terminate()

	def detector(self):
		while True:
			poll = self.process.poll()
			if poll is None:
				break
			else:
				time.sleep(0.2)
		
		self.process.wait()
		self.running = False
		eel.setNormalState()

	def run(self):
		try:
			self.process = sub.Popen([self.filepath],
											stdout=sub.PIPE, stderr=sub.PIPE)
			self.running = True
			return True
		except os.error:
			return

@eel.expose
def loadItems():
	with open("games.json", "r") as f:
		games = f.read()
		return games

def addFileToJson(filename, filepath, date):
	with open("games.json", "r") as f:
		try:
			games = json.load(f)
		except json.JSONDecodeError:
			games = {}
		
		games[filename] = [filepath, date]
		with open("games.json", "w") as f:
			json.dump(games, f)

def addFileToList(filename, filepath, date):
	eel.addProgram(filename, filepath, date)

@eel.expose
def addFile():
	root = tk.Tk()
	root.attributes("-topmost", True)
	root.withdraw()
	filepath = askopenfilename(title="Select a program",
                                   filetypes=(("Executable", ".exe"),))
	if not filepath: return

	filename = os.path.splitext(os.path.basename(filepath))[0].title()
	date = int(time.time())
	addFileToJson(filename, filepath, date)
	addFileToList(filename, filepath, date)

@eel.expose
def runApp(name, path, doClose):
	app.process = AppProcess(path, name)
	if app.process.run():
		threading.Thread(target=app.process.detector, daemon=True).start()
		return True
	
@eel.expose
def stopApp():
	app.process.kill()

@eel.expose
def renameApp(oldname, newname):
	games = json.loads(loadItems())
	data = games[oldname]
	del games[oldname]
	games[newname] = data
	with open("games.json", "w") as f:
		json.dump(games, f)

@eel.expose
def removeApp(name):
	games = json.loads(loadItems())
	del games[name]
	with open("games.json", "w") as f:
		json.dump(games, f)

def checkForTheJsonFile():
	if not os.path.isfile("games.json"):
		with open("games.json", "w") as f:
			pass

if __name__ == "__main__":
	checkForTheJsonFile()
	app = App()
	eel.init("assets")
	eel.start("index.html", port=0, size=(600,600), mode="chrome")

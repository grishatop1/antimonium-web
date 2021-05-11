import eel

import json
import os
import subprocess as sub
import threading
import time

import tkinter as tk
from tkinter.filedialog import askopenfilename

@eel.expose
def loadItems():
	with open("games.json", "r") as f:
		games = f.read()
		return games

def addFileToJson(filename, filepath):
	with open("games.json", "r") as f:
		try:
			games = json.load(f)
		except json.JSONDecodeError:
			games = {}
		
		games[filename] = filepath
		with open("games.json", "w") as f:
			json.dump(games, f)

def addFileToList(filename, filepath):
	eel.addProgram(filename, filepath)

@eel.expose
def addFile():
	root = tk.Tk()
	root.withdraw()
	filepath = askopenfilename(title="Select a program",
								filetypes=(("Executable", ".exe"),))
	if not filepath: return

	filename = os.path.splitext(os.path.basename(filepath))[0].title()
	addFileToJson(filename, filepath)
	addFileToList(filename, filepath)

if __name__ == "__main__":
	eel.init("assets")
	eel.start("index.html", port=0, size=(600,600), mode="chrome")
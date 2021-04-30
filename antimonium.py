import json
import os
import multiprocessing as mp
import subprocess
import threading

from tkinter import *
from tkinter.ttk import *

from tkinter.filedialog import askopenfilename

class AppProcess:
	def __init__(self, filepath):
		self.filepath = filepath
		self.parent_conn, self.child_conn = mp.Pipe()
		self.proc = mp.Process(target=self.run, args=(self.child_conn,), daemon=True)
		self.proc.start()
		threading.Thread(target=self.killDetector, daemon=True).start()
		

	def killDetector(self):
		if self.parent_conn.recv():
			app.play.play_btn.config(
				state = "normal",
				text = "PLAY"
			)

	def run(self, trans):
		os.system(self.filepath)
		trans.send("done")

class PlaySection(Frame):
	def __init__(self, parent, *args, **kwargs):
		Frame.__init__(self, parent, *args, **kwargs)
		self.parent = parent
		self.current = None

		self.play_btn = Button(self, text="PLAY", command=self.runGame)
		self.play_btn.pack(padx=5, pady=5, fill="x", ipady=10, side="bottom")

	def runGame(self):
		data = self.parent.list.getSelectedItem()
		if data:
			filename, filepath = data
			if filepath:
				self.play_btn.config(
					state = "disabled",
					text = "Running..."
				)
				root.focus()
				self.current = AppProcess(filepath)

class SettingsSection(Frame):
	def __init__(self, parent, *args, **kwargs):
		Frame.__init__(self, parent, *args, **kwargs)
		self.parent = parent

		self.chkValue = BooleanVar() 
		self.chkValue.set(False)

		self.select_btn = Button(self, text="Browse game", command=self.addGameToList)
		self.remove_btn = Button(self, text="Remove selected game")
		self.close_chk = Checkbutton(self, text="Close antimonium on launch", var=self.chkValue)

		self.select_btn.pack(padx=5, pady=5)
		self.remove_btn.pack(padx=5, pady=5)
		self.close_chk.pack(padx=5, pady=5)

	def addGameToList(self):
		filepath = askopenfilename(title="Select a game", filetypes=(("Executable files", ".exe"),))
		filename = os.path.splitext(os.path.basename(filepath))[0].title()
		with open("games.json", "r") as f:
			try:
				games = json.load(f)
			except json.JSONDecodeError:
				games = {}
		
		games[filename] = filepath
		self.parent.list.current_items = games
		with open("games.json", "w") as f:
			json.dump(games, f)
		self.parent.list.addItem(filename)
		

class ListSection(LabelFrame):
	def __init__(self, parent, *args, **kwargs):
		LabelFrame.__init__(self, parent, *args, **kwargs)
		self.parent = parent
		self.current_items = []

		self.list = Listbox(self, width=40, height=25)
		self.list.pack(padx=5, pady=5)

		self.loadItems()

	def loadItems(self):
		with open("games.json", "r") as f:
			try:
				games = json.load(f)
			except json.JSONDecodeError:
				games = {}
		self.current_items = games
		for game in games:
			self.addItem(game)

	def addItem(self, name):
		self.list.insert(END, name)

	def getSelectedItem(self):
		if self.list.curselection():
			filename = self.list.get(self.list.curselection())
			filepath = self.current_items[filename]
			return (filename, filepath)

class MainApplication(Frame):
	def __init__(self, parent, *args, **kwargs):
		Frame.__init__(self, parent, *args, **kwargs)
		self.parent = parent

		self.list = ListSection(self, text="Games")
		self.settings = SettingsSection(self)
		self.play = PlaySection(self)

		self.list.grid(row=0, column=0, rowspan=2, padx=5, pady=5)
		self.settings.grid(row=0, column=1)
		self.play.grid(row=1, column=1, sticky="nswe")

if __name__ == "__main__":
	root = Tk()
	root.title("Antimonium")
	root.resizable(0,0)
	app = MainApplication(root)
	app.pack(side="top", fill="both", expand=True)
	root.mainloop()
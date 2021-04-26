from tkinter import *
from tkinter.ttk import *

class PlaySection(Frame):
	def __init__(self, parent, *args, **kwargs):
		Frame.__init__(self, parent, *args, **kwargs)
		self.parent = parent

		self.play_btn = Button(self, text="PLAY")
		self.play_btn.pack(fill="both")

class SettingsSection(Frame):
	def __init__(self, parent, *args, **kwargs):
		Frame.__init__(self, parent, *args, **kwargs)
		self.parent = parent

		self.chkValue = BooleanVar() 
		self.chkValue.set(False)

		self.select_btn = Button(self, text="Browse game")
		self.remove_btn = Button(self, text="Remove selected game")
		self.close_chk = Checkbutton(self, text="Close antimonium", var=self.chkValue)

		self.select_btn.pack()
		self.remove_btn.pack()
		self.close_chk.pack()

class ListSection(LabelFrame):
	def __init__(self, parent, *args, **kwargs):
		LabelFrame.__init__(self, parent, *args, **kwargs)
		self.parent = parent

		self.list = Listbox(self)
		self.list.pack()

class MainApplication(Frame):
	def __init__(self, parent, *args, **kwargs):
		Frame.__init__(self, parent, *args, **kwargs)
		self.parent = parent

		self.list = ListSection(self, text="Games")
		self.settings = SettingsSection(self)
		self.play = PlaySection(self)

		self.list.grid(row=0, column=0, rowspan=2)
		self.settings.grid(row=0, column=1)
		self.play.grid(row=1, column=1)

if __name__ == "__main__":
	root = Tk()
	root.title("Antimonium")
	MainApplication(root).pack(side="top", fill="both", expand=True)
	root.mainloop()
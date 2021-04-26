from tkinter import *
from tkinter.ttk import *

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
		self.list.grid(row=0, column=0)

if __name__ == "__main__":
	root = Tk()
	root.title("Antimonium")
	MainApplication(root).pack(side="top", fill="both", expand=True)
	root.mainloop()
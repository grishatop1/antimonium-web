import win32ui
import win32gui
import win32con
import win32api
from PIL import Image
import os

_path_cache = f'{os.getcwd()}\\assets\\cache\\'

def makeIcon(path, name):
    checkForDir()
    ico_x = win32api.GetSystemMetrics(win32con.SM_CXICON)
    ico_y = win32api.GetSystemMetrics(win32con.SM_CYICON)

    large, small = win32gui.ExtractIconEx(path,0)
    win32gui.DestroyIcon(small[0])

    hdc = win32ui.CreateDCFromHandle( win32gui.GetDC(0) )
    hbmp = win32ui.CreateBitmap()
    hbmp.CreateCompatibleBitmap( hdc, ico_x, ico_x )
    hdc = hdc.CreateCompatibleDC()

    hdc.SelectObject( hbmp )
    hdc.DrawIcon( (0,0), large[0] )

    bmpstr = hbmp.GetBitmapBits(True)
    img = Image.frombuffer(
        'RGBA',
        (32,32),
        bmpstr, 'raw', 'BGRA', 0, 1
    )

    img.save(f'{_path_cache}{name}.png')

def renameIcon(old, new):
    os.rename(_path_cache + old + ".png", _path_cache + new + ".png")

def removeIcon(name):
    os.remove(_path_cache + name + ".png")

def checkForDir():
    if not os.path.exists(_path_cache):
        os.makedirs(_path_cache)
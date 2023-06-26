import sys
import signal
import numpy as np
from os import system, fork
from objects import *
import config
import colorama
from threading import Timer
from time import sleep
from getch import _getChUnix


class AlarmException(Exception):
    pass


def setlevel1(scene):
    for i in range(0, 45, 2):
        scene.draw_obj(Floor(i, 28))
    scene.draw_obj(Floor(32, 20))
    scene.draw_obj(Floor(48, 24))
    scene.draw_obj(Floor(52, 20))
    scene.draw_obj(Floor(52, 24))
    for i in range(56, 109, 2):
        scene.draw_obj(Floor(i, 28))
    for i in [112, 114, 116, 120, 124]:
        scene.draw_obj(Floor(i, 20))
    scene.draw_obj(Wall(64, 24))
    scene.draw_obj(Wall(76, 24))
    scene.draw_obj(Wall(76, 20))
    scene.draw_obj(Wall(96, 20))
    scene.draw_obj(Wall(96, 24))

    scene.draw_obj(Coin(128, 16))
    scene.draw_obj(Box(128, 24))
    for i in range (128,150,4):
        scene.draw_obj(Floor(i, 28))

    scene.draw_obj(Box(36, 20))
    for i in np.random.randint(1, 150, 10):
        scene.draw_obj(Cloud(i, 0))
    
    for i in range(0,31,4):
        scene.draw_obj(End(150,i))



def setlevel2(scene):
    for i in range(0, 45, 2):
        scene.draw_obj(Floor(i, 28))
    scene.draw_obj(Floor(32, 20))
    scene.draw_obj(Floor(48, 24))
    scene.draw_obj(Floor(52, 20))
    scene.draw_obj(Floor(52, 24))
    for i in range(56, 109, 2):
        scene.draw_obj(Floor(i, 28))
    for i in [112, 114, 116, 120, 124]:
        scene.draw_obj(Floor(i, 20))
    scene.draw_obj(Wall(64, 24))
    scene.draw_obj(Wall(76, 24))
    scene.draw_obj(Wall(76, 20))
    scene.draw_obj(Wall(96, 20))
    scene.draw_obj(Wall(96, 24))

    scene.draw_obj(Coin(128, 16))
    scene.draw_obj(Box(128, 24))
    
    scene.draw_obj(Floor(128, 28))
    scene.draw_obj(Floor(132, 28))
    scene.draw_obj(Floor(136, 28))
    scene.draw_obj(Box(36, 20))
    for i in np.random.randint(1, 150, 10):
        scene.draw_obj(Cloud(i, 0))

    for i in range(0,31,4):
        scene.draw_obj(End(150,i))


class Scene:

    '''Each scene consists of a 44 x  20 character representation'''

    def __init__(self, level=1):
        self.level = level
        self.map = np.chararray((32, 200))
        self.map[:, :] = config._empty
        self.storage = {
            config._floor: [],
            config._wall: [],
            config._box: [],
            config._enemy: [],
            config._mario: [],
            config._coin: [],
            config._cloud: [],
            config._end: []
        }
        if level == 1:
            setlevel1(self)
        else:
            setlevel2(self)
        self.loe = []
        self.width = 44
        self.height = 32
        self.frame = np.chararray((32, 44))
        self.frame = self.map[0:32, 0:44]

    def draw_obj(self, obj):
        '''Draws the Object in the Level'''
        x, y = obj.get_xy()
        try:
            for i in range(0, 4):
                for j in range(0, 4):
                    self.storage[obj.get_ch()].append((x + i, y + j))
        except:
            pass
        self.map[y:y + 4, x:x + 4] = obj.structure

    def clear_obj(self, obj):
        x, y = obj.get_xy()
        try:
            for i in range(0, 4):
                for j in range(0, 4):
                    self.storage[obj.get_ch()].remove((x + i, y + j))
        except:
            pass
        self.map[y:y + 4, x:x + 4] = config._empty

    def update_scene(self):
        '''check changes in position of Mario everytime and updates all elements accordingly'''
        # check Mario position
        for x, y in self.storage[config._floor]:
            self.map[y, x] = config._floor
        for x, y in self.storage[config._wall]:
            self.map[y, x] = config._wall
        for i in range(0, len(self.storage[config._cloud]), 16):
            x, y = self.storage[config._cloud][i]
            self.map[y:y + 4, x:x + 4] = Cloud(0, 0).structure[:, :]
        temp = self.storage[config._mario[0]]
        mx, my = temp[0]
        self.frame = self.map[0:32, mx - 20:mx + 24]

    def process_input(self, mario):
        def alarmhandler(signum, frame):
            ''' input method '''
            raise AlarmException

        def user_input(timeout=0.1):
            ''' input method '''
            signal.signal(signal.SIGALRM, alarmhandler)
            signal.setitimer(signal.ITIMER_REAL, timeout)
            try:
                text = _getChUnix()()
                signal.alarm(0)
                return text
            except AlarmException:
                pass
            signal.signal(signal.SIGALRM, signal.SIG_IGN)
            return ''

        key_press = user_input()

        if key_press == 'a':
            mx, my = self.storage[config._mario[0]][0]
            flag = 0
            if mx > 20:
                for i in range(0, 4):
                    if (mx - 1, my + i) in self.storage[config._floor] or (mx - 1, my + i) in self.storage[config._wall]:
                        flag = 1
                        break
                if flag == 0:
                    mario.update_location(self, mx - 4, my)
        elif key_press == 'd':
            mx, my = self.storage[config._mario[0]][0]
            flag = 0
            for i in range(0, 4):
                if (mx + 4, my + i) in self.storage[config._floor] or (mx + 4, my + i) in self.storage[config._wall]:
                    flag = 1
            if flag == 0:
                mario.update_location(self, mx + 4, my)
        elif key_press == 'w':
            # initiates the multicycle jump for mario
            mx, my = self.storage[config._mario[0]][0]
            if mx == 0:
                return 0
            if mario.jump == 0:
                if (mx, my - 1) not in self.storage[config._floor] and (mx, my - 1) not in self.storage[config._wall]:
                    mario.jump = 4
                    system('aplay bigjump.wav> /dev/null 2>&1 &')
                    
        elif key_press == 'q':
            return -10

        # if mario has ability to jump and nothing is above him, he can jump
        if mario.jump > 0:
            mx, my = self.storage[config._mario[0]][0]
            if (mx, my - 1) not in self.storage[config._floor] and (mx, my - 1) not in self.storage[config._wall]:
                mario.update_location(self, mx, my - 1)
                mario.jump -= 1
            else:
                mario.jump = 0

        # if mario is at the top, he can't jump any higher
        mx, my = self.storage[config._mario[0]][0]
        if my == 0:
            mario.jump = 0

        # if he lands and there is no footholding below, then he keeps dropping
        if mario.jump == 0 and (mx, my + 4) not in self.storage[config._floor] and (mx, my + 4) not in self.storage[config._wall]:
            if(my == 28):
                mario.update_location(self, mx, 0)
                return -1
            mario.update_location(self, mx, my + 1)
            self.render()
            print(mario.lives)
            print(mario.get_xy())

        # check if mario has opened any box
        if mario.get_xy() in self.storage[config._box]:
            self.storage[config._box].remove(mario.get_xy())
            
            mario.score += 200

        if (mx, my) in self.storage[config._coin]:
            system('aplay coin.wav> /dev/null 2>&1 ')
            mario.score += 100

        return 0

    def moveenemies(self):
        # movement of enemies
        for enemy in self.loe:
            x, y = enemy.get_xy()
            if enemy.dir == 'r':
                enemy.update_location(self, x + 1, y)
                if enemy.boss:
                    enemy.update_location(self, x + 1, y)
            else:
                enemy.update_location(self, x - 1, y)
                if enemy.boss:
                    enemy.update_location(self, x - 1, y)

            if x == enemy.x2 and enemy.dir == 'r':
                enemy.dir = 'l'
            elif x == enemy.x1 and enemy.dir == 'l':
                enemy.dir = 'r'
            newx, newy = enemy.get_xy()
            mx, my = self.storage[config._mario[0]][0]
            if abs(newx - mx) <= 2 and abs(newy - my) <= 2:
                if my < newy and not enemy.boss:
                    self.clear_obj(enemy)
                    self.loe.remove(enemy)
                    return 1
                elif enemy.boss and my < newy:
                    enemy.lives -= 1
                    if enemy.lives == 0:
                        self.clear_obj(enemy)
                        self.loe.remove(enemy)
                else:
                    return -1
        return 0

    def render(self):
        '''# displaying the board at every frame'''
        colorama.init()
        sys.stdout.flush()
        system('tput reset')

        temp_board = np.matrix(self.frame)
        for row in range(self.height):
            for col in range(self.width):
                sys.stdout.write(config.getcc((temp_board[row, col]).decode()))
            sys.stdout.write("\n")
        del temp_board

    def __repr__(self):
        '''# printing the board for debugging purposes'''
        temp_board = np.matrix(self.frame)
        for row in range(self.height):
            for col in range(self.width):
                try:
                    print(temp_board[row, col].decode(), end="")
                except BaseException:
                    print(temp_board[row, col], end="")
            print()
        del temp_board
        return ""

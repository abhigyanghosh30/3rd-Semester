'''

contains the structure of each object

'''

import config
# from config import x_fac, y_fac
import numpy as np


class Object:

    '''Mario, Enemy, Floor, Boxes and Pillars '''

    def __init__(self, x, y, ch=config._empty):
        '''thr x and y coords wrt top left of board'''
        self._x = x
        self._y = y
        self.width = 4
        self.height = 4
        self.is_killable = False
        self._ch = ch
        self.structure = np.chararray((self.height, self.width))
        self.structure[:, :] = self._ch
        self._type = config.types[self._ch]

    def get_type(self):
        '''returns the type of Object eg: Mario, Enemy, etc '''
        return self._type

    def get_ch(self):
        return self._ch

    def get_size(self):
        '''returns (height, width)'''
        return self.structure.shape

    def get_xy(self):
        '''Returns xy coordinates of the person/object'''
        return (self._x, self._y)

    def update_location(self, scene, new_x, new_y, init=False):
        '''update the location of the object'''

            # inital update will not clear original
        scene.clear_obj(self)
        self._x, self._y = new_x, new_y
        if self.get_ch() == config._enemy:
            scene.draw_obj(type(self)(new_x, new_y, self.x2))
        else:
            scene.draw_obj(type(self)(new_x, new_y))


class Floor(Object):

    '''Defines the floor'''

    def __init__(self, x, y):
        super(Floor, self).__init__(x, y, config._floor)

    def __repr__(self):
        ''' Representation on Scene '''
        for y in range(self.height):
            print("\n")
            for x in range(self.width):
                try:
                    print(self.structure[x, y].decode(), end="")
                except UnicodeDecodeError:
                    print(self.structure[x, y], end="")
        return ""


class Box(Object):

    '''Defines the powerup boxes'''

    def __init__(self, x, y):
        super(Box, self).__init__(x, y, config._box)

    def __repr__(self):
        ''' Representation on Scene '''
        for y in range(self.height):
            print("\n")
            for x in range(self.width):
                try:
                    print(self.structure[x, y].decode(), end="")
                except UnicodeDecodeError:
                    print(self.structure[x, y], end="")
        return ""


class Wall(Object):

    '''Defines the Pipes'''

    def __init__(self, x, y):
        super(Wall, self).__init__(x, y, config._wall)

    def __repr__(self):
        ''' Representation on Scene '''
        for y in range(self.height):
            print("\n")
            for x in range(self.width):
                try:
                    print(self.structure[x, y].decode(), end="")
                except UnicodeDecodeError:
                    print(self.structure[x, y], end="")
        return ""


class Coin(Object):

    '''Defines the coins'''

    def __init__(self, x, y):
        super(Coin, self).__init__(x, y, config._coin)

    def __repr__(self):
        ''' Representation on Scene '''
        for y in range(self.height):
            print("\n")
            for x in range(self.width):
                try:
                    print(self.structure[x, y].decode(), end="")
                except UnicodeDecodeError:
                    print(self.structure[x, y], end="")


class Cloud(Object):

    '''Defines the coins'''

    def __init__(self, x, y):
        super(Cloud, self).__init__(x, y, config._cloud)
        temp_skel = np.matrix(
            [[config._empty, config._cloud, config._cloud, config._empty],
             [config._empty, config._cloud, config._cloud, config._cloud],
             [config._cloud, config._cloud,
              config._cloud, config._cloud],
             [config._empty, config._empty, config._empty, config._empty]])
        self.structure[:, :] = temp_skel
        del temp_skel

    def __repr__(self):
        ''' Representation on Scene '''
        for y in range(self.height):
            print("\n")
            for x in range(self.width):
                try:
                    print(self.structure[x, y].decode(), end="")
                except UnicodeDecodeError:
                    print(self.structure[x, y], end="")

class End(Object):

    '''Defines the coins'''

    def __init__(self, x, y):
        super(End, self).__init__(x, y, config._end)
        temp_skel = np.matrix(
            [[config._end, config._box, config._end, config._box],
             [config._box, config._end, config._box, config._end],
             [config._end, config._box,
              config._end, config._box],
             [config._box, config._end, config._box, config._end]])
        self.structure[:, :] = temp_skel
        del temp_skel

    def __repr__(self):
        ''' Representation on Scene '''
        for y in range(self.height):
            print("\n")
            for x in range(self.width):
                try:
                    print(self.structure[x, y].decode(), end="")
                except UnicodeDecodeError:
                    print(self.structure[x, y], end="")

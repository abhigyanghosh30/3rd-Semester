'''The Mario Class

The Mario Class has all the variables and functionality of Mario
including the generation, movement and shooting.
This inherits Enemy and Shoot. '''

import config
import numpy as np
from objects import Object

class Person(Object):
    
    ''' MultiLevel Inheritance between Objects->Person->Mario/Enemy'''
    
    def __repr__(self):
        return "<Person : %s | (%d, %d)>" % (self.get_type(), self._x, self._y)

class Mario(Person):
    '''Class for Mario
    movement and behaviour are defined here'''

    def __init__(self, x, y, lives=config.lives[0]):
        super(Mario, self).__init__(x, y, config._mario)
        temp_skel = np.matrix([[config._empty, config._mario, config._mario, config._empty],
                                ['|', config._mario, config._mario, '|'],
                                ['|', config._mario, config._mario, '|'],
                                [config._empty, '|', '|', config._empty]])
        self.structure[:,:] = temp_skel
        self.lives = lives
        self.score = 0
        self.jump = 0
        del temp_skel

class Enemy(Person):
    '''Class for Enemies
    Methods for movement and behaviour'''
    def __init__(self, x, y, x2):
        super(Enemy, self).__init__(x, y, config._enemy)
        temp_skel = np.matrix([['[', self._ch, self._ch, ']'],
                                [config._empty, config._enemy, config._enemy, config._empty],
                                [config._empty, config._enemy, config._enemy, config._empty],
                               [config._empty, ']', '[', config._empty]])
        self.x1 = x
        self.x2 = x2
        self.dir = 'r'
        self.boss = False
        self.structure[:,:] = temp_skel
        del temp_skel

class Boss(Enemy):
    '''Class for Enemy Boss'''
    def __init__(self, x, y, x2):
        super(Boss, self).__init__(x, y, config._enemy)
        temp_skel = np.matrix([['[', self._ch, self._ch, ']'],
                                [config._wall, config._enemy, config._enemy, config._wall],
                                [config._wall, config._enemy, config._enemy, config._wall],
                               [config._empty, ']', '[', config._empty]])
        self.x1 = x
        self.x2 = x2
        self.dir = 'r'
        self.boss = True
        self.lives = 3
        self.structure[:,:] = temp_skel
        del temp_skel

'''

contains all the symbols, constatnts
directions, etc

'''


# character representation of objects
_wall = "|"
_mario = "M"
_empty = " "
_enemy = "E"
_floor = "-"
_box = "X"
_coin = "O"
_cloud = "@"
_end = 'F'

types = {

    _empty: "Unassigned",
    _wall: "Wall",
    _floor: "Floor",
    _box: "Box",
    _mario: "Mario",
    _enemy: "Enemy",
    _coin: "Coin",
    _cloud: "Cloud",
    _end: "End"
}

lives = [3, 10]


def getcc(ch):
    try:
        color = "\033[44m"
        if ch == _empty:
            # light blue
            color = "\033[34;44m"
        elif ch == _wall:
            # yellow
            color = "\033[33;43m"
        elif ch == _mario:
            # red
            color = "\033[31;41m"
        elif ch == _floor:
            # green
            color = "\033[32;42m"
        elif ch == _enemy or ch == '[' or ch == ']':
            # purple
            color = "\033[35;45m"
        elif ch == _box:
            # bold white
            color = "\033[1;37;47m"
        elif ch == _cloud:
            # bold and white
            color = "\033[1;37m"
        elif ch == _coin:
            # bold and yellow
            color = "\033[1;33m"
        elif ch == _end:
            color = "\033[40;30m"
        return color + ch + "\033[30;47m"
    except KeyError:
        return ch

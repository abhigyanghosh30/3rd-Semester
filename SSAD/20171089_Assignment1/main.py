''' The run file
# Instances of classes created here
# for running the application.'''
import time
import os
import sys
import people
import config
import getch
import scene
import colorama


def main():
    colorama.init()
    # the initial Welcome Print.
    print("Welcome, to this rendition of SuperMario!")
    newpid = os.fork()
    if newpid == 0:
        os.system('cvlc christmas_theme.ogg > /dev/null 2>&1 &')
    else:
        os.waitpid(newpid, 0)
        print("Press 1 for Level 1 and 2 for Level 2")
        level = input()
        if not level:
            level = 1
        sc = scene.Scene(int(level))
        print("Press 'Enter' to start playing.")
        TAKENINPUT = input()

        mario = people.Mario(20, 0, config.lives[int(level) - 1])
        sc.draw_obj(mario)
        if int(level) == 1:
            sc.loe = [people.Enemy(24, 24, 40), people.Enemy(
                80, 24, 88), people.Enemy(100, 24, 112), people.Boss(132, 24, 140)]
        else:
            sc.loe = [people.Enemy(24, 24, 40), people.Enemy(
                80, 24, 88), people.Enemy(100, 24, 112), people.Boss(132, 24, 140)]

        for enemy in sc.loe:
            sc.draw_obj(enemy)
        starttime = time.time()
        while True:
            sc.update_scene()
            mvene = sc.moveenemies()
            if mvene == -1:
                mario.lives -= 1
                mx, my = mario.get_xy()
                mario.update_location(sc, mx, 0)
            if mvene == 1:
                mario.score += 100
            sc.render()
            print(mario.lives)
            print(mario.score)
            uiput = sc.process_input(mario)
            if uiput < 0:
                if uiput == -10:
                    break
                mario.lives -= 1
                os.system('aplay hurt.wav> /dev/null 2>&1')
                sc.render()
                print(mario.lives)
                print(mario.get_xy())
            if mario.lives <= 0:
                break
            mx, my = mario.get_xy()
            if mx >= 150:
                break
        timetaken = time.time() - starttime
        os.system('fuser -k -TERM christmas_theme.ogg')

        os.system('tput reset')
        if mario.lives < 0:
            print("You are dead")
            os.system("espeak 'You are dead'")
            os.system("espeak 'You are dead'")
            os.system("espeak 'You are dead'")
        else:
            print("You cleared this level")
            os.system("espeak Congratulations")
        print("Time Taken", int(timetaken), "Secconds")
        print("Score: ", mario.score - int(timetaken))
main()

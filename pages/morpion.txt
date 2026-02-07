# Morpion - CLI

display = """1│2│3
─┼─┼─
4│5│6
─┼─┼─
7│8│9
"""

bl = {"│", "┼", "─"} # black list
wl = {"1", "2", "3", "4", "5", "6", "7", "8", "9"} # white list

def win(winner):
    print(f"({winner}) won!")
    print("+"*5)
    print(display+"+"*5)
    quit()

def loose():
    print(f"{"\n"*5}Draw!")
    print("-"*5)
    print(display+"-"*5)


def check(d : str):

    for i in bl:
        d = d.replace(i, "")
    d = d.replace("\n\n", "\n").splitlines()
    for value in players:
        if value*3 in d or value*3 in ["".join(k) for k in zip(*d)] or (d[0][0] == value and d[1][1] == value and d[2][2] == value) or (d[0][2] == value and d[1][1] == value and d[2][0] == value):
        #  [check rows]    [check columns-------------------------]    [check diagonal upper left to lower right------------------]    [check diagonal upper right to lower left------------------]
            win(value)


print(display)
player1 = "O"
player2 = "X"
players = (player1, player2)
tries = 0 # is actually the player's turn which is decided with tries%2
while tries < 9:
    coor = input(f"num ({players[tries%2]}) : ") #coor for coordinates
    if coor in wl:
        display = display.replace(str(coor), players[tries%2])
        wl.remove(coor) # forbid placing in the same spot
        print(display) # display the grid
        check(display) # check if there's a winner
        tries+=1 # add 1 to tries
    else:
        print(f"Unusual value : {coor}")
else:
    loose()
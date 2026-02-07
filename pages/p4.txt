#Puissance 4 - CLI - grid 7 by 6

#│┼─ characters used for the grid

letters = ("1", "2", "3", "4", "5", "6", "7")
bl = {"│", "┼", "─"} # black list
wl = set(letters) # white list

column = ["0", "0", "0", "0", "0", "0"]
display_dict = {1 : column, 2 : column, 3 : column, 4 : column, 5 : column, 6 : column, 7 : column}
display = (lambda : "│".join(letters)+"\n"+"\n─┼─┼─┼─┼─┼─┼─\n".join(map("│".join, [[display_dict[key][i] for key in display_dict] for i in range(len(column))])) +"\n"+"│".join(letters))

def win():
    winner = players[tries % 2]
    print(f"({winner}) won!")
    print("+"*13)
    print(display()+"\n"+"+"*13)
    quit()

def loose():
    print(f"{"\n"*5}Draw!")
    print("-"*13)
    print(display()+"\n"+"-"*13)

def choose():
    coordinate = int(input(f"num ({players[tries % 2]}) : "))  # coor for coordinates
    if str(coordinate) in wl:
        display_dict.update({coordinate : display_dict[coordinate][:"".join(display_dict[coordinate]).rfind("0")]+[players[tries % 2]]+display_dict[coordinate]["".join(display_dict[coordinate]).rfind("0")+1:]})
        print("\n"*5+display())  # display the grid
        check()  # check if there's a winner
    else:
        raise ZeroDivisionError # why not

def check():
    grid = display().translate("".maketrans("","","".join(bl))).replace("\n\n", "\n").splitlines()[1:-1]
    for value in players:
        if any([value*4 in x for x in grid]) or any([value*4 in x for x in ["".join(k) for k in zip(*grid)]]) or any([any([True if ([display_dict[key+add][i+add] for add in range(4)].count(value) if key < 5 and i < 3 else False) == 4 else False for i in range(len(display_dict[key]))]) for key in display_dict]) or any([any([True if ([display_dict[key+add][i-add] for add in range(4)].count(value) if key < 5 and i > 2 else False) == 4 else False for i in reversed(range(len(display_dict[key])))]) for key in display_dict]):
        # check row, column and DIAGONALs
            win()

player1 = "#"
player2 = "@"
players = (player1, player2)
tries = 0

print(display())
while tries < 42:
    try:
        choose()
        tries+=1
    except ZeroDivisionError as error_value:
        print(f"Unusual value : {error_value}")
else:
    loose()
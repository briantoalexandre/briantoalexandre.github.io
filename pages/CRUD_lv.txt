"""
Exercice Python BTS SIO - Gestion d'une entreprise de location de véhicules

Contexte :
Vous travaillez pour une entreprise de location de véhicules. Vous devez développer une application en Python permettant de gérer les véhicules, les clients et les locations. Les données seront simulées à l'aide de listes représentant des tables de base de données.

Objectifs :
- Utiliser les variables, les conditions, les listes et les boucles.
- Implémenter les opérations CRUD (Créer, Lire, Mettre à jour, Supprimer) pour chaque table simulée.
- Organiser le code avec des fonctions.

Tables simulées :
- Véhicules : id, marque, modèle, année, disponible (True/False)
- Clients : id, nom, prénom, email
- Locations : id, id_client, id_vehicule, date_debut, date_fin

Travail demandé :
1. Créez les listes pour simuler les tables.
2. Implémentez les fonctions CRUD pour chaque table.
3. Ajoutez un menu permettant à l'utilisateur de choisir l'action à effectuer.
4. Gérez la logique métier : un véhicule ne peut être loué que s'il est disponible.

Exemple de structure de code :
"""

"""
def Arrange(): #rearrange id correctly
    try:
        for table in (vehicules, clients, locations):
            for dicts in table:
                dicts.update({"id" : table.index(dicts)+1})

    except Exception as e:
        print(e)
"""

def blacklist(table : list) -> list:
    bl = set()
    for dicts in table:
        bl.add(dicts.get("id"))
    return bl

# CRUD function
def Create(table : list, table_title : tuple, table_name : str):
    bl = blacklist(table) 
    table.append({})
    while True:
        try:
            for key in table_title:
                if key == "id":
                    for k in range(1, len(bl)+1):
                        if k not in bl:
                            table[-1].update({"key" : k})
                            break
                    continue
                answer = input(f"{key} : ")
                if isinstance(table[0][key], bool):
                    table[-1].update({key: bool(answer)})
                elif isinstance(table[0][key], int):
                    table[-1].update({key: int(answer)})
                elif isinstance(table[0][key], str):
                    table[-1].update({key: answer})
            try:
                print(table[-1])##################
            except Exception as e:
                print("\n"+str(e)+"\n")
                raise e
            break
        except Exception as e:
            print("missing parameter at " + str(e))
            table.pop(-1)
            raise e

def Update(table : list, table_title : tuple, table_name : str):
    if len(table) != 0:
        while True:
            try:
                choice = int(input("id you want to change : "))-1
                for key in table_title:
                    if key == "id":                                    
                        continue
                    answer = input(f"{key} : ")
                    if len(answer) == 0: #if nothing is given in choice input
                        answer = table[choice][key]
                    if isinstance(table[0][key], bool): #transform accordingly 
                        table[choice].update({key: bool(answer)})
                    elif isinstance(table[0][key], int):
                        table[choice].update({key: int(answer)})
                    elif isinstance(table[0][key], str):
                        table[choice].update({key: answer})
                break
            except Exception as e:
                print("missing parameter at " + str(e))
                raise e
    else:
        print(f"The table {table_name} is empty")

"""
longest = (lambda tables: [map(len, x) for x in [value for value in zip(*[[f"{key}"for key in tables[0]]],*[[f"{table[key]}"for key in table] for table in tables])]] )
Read =  (lambda tables: ["|".join([f"{bool(x):>{y}}" if isinstance(x, bool) else f"{x:>{y}}" for x, y in zip(value, longest(tables))]) for value in [[f"{key}"for key in tables[0]]]+[[f"{table[key]}"for key in table] for table in tables]])
"""

def Read(table, table_title, table_name):
    if len(table) != 0:
        l1 = [] #column title
        l2 = [] #column content
        l3 = [] #longest size
        
        l4 = [] #debug
        for t in table[0]:
            l1.append(t)
        for t, i in zip(table, range(len(table))):
            l2.append([])
            for key in t:
                l2[i].append(t[key])
        for value in (zip(l1,*l2)):
            l3.append(max(map(len ,map(str, value)))) #pick the longest string from l1 and l2
        print(table_name)
        for value in [l1]+l2:
            for x, y in zip(value, l3):
                if isinstance(x, bool):
                    print(f"{bool(x):>{y}}", end=" | ")
                else:
                    print(f"{x:>{y}}", end=" | ")
            print()
        print()
    else:
        print(f"The table {table_name} is empty")

def Delete(table, table_title, table_name):
    if len(table) != 0:
        while True:
            try:
                choice = int(input("id you want to delete : "))-1
                if choice.__lt__(0):
                    raise IndexError
                choice2 = input(f"Do you really want to remove\n{table[choice]} (yes/no) : ").lower()
                if choice2[0] == "y":
                    table.pop(choice)
                    break
                elif choice2[0] == "n":
                    break
            except IndexError:
                print("no negative or nul numbers")
    else:
        print(f"The table {table_name} is empty")


def CRUD(table : list, table_title : tuple, table_name : str):
    try:
        choice = input(f"Choose an action (Create|Read|Update|Delete) for the table {table_name}: ").lower()
        if len(choice) == 0:
            raise NameError
        if choice[0] == "c":
            Create(table, table_title, table_name)
        elif choice[0] == "r":
            Read(table, table_title, table_name)
        elif choice[0] == "u":
            Update(table, table_title, table_name)
        elif choice[0] == "d":
            Delete(table, table_title, table_name)
        else:
            raise NameError
        
    except NameError:
        print(f"Command : \"{choice}\" doesn't exist")

def table_choice():
    running = True
    while running:
        try:
            choice = input("Choose a table (vehicules|clients|locations) or stop : ").lower()
            if len(choice) == 0:
                raise NameError
            if choice[0] == "v":
                CRUD(vehicules, vehicules_title, "vehicles")
            elif choice[0] == "c" or choice[0] == "u": #"u" for users
                CRUD(clients, clients_title, "clients")
            elif choice[0] == "l":
                CRUD(locations, locations_title, "locations")
            elif choice[0].upper() == "R": #read all tables
                for table, table_title, table_name in zip((vehicules, clients, locations), (vehicules_title, clients_title, locations_title), ("vehicles", "clients", "locations")):
                    Read(table, table_title, table_name)
            elif choice[0] == "s": #stop
                running = False
            else:
                raise NameError
        except NameError:
            print(f"Table : \"{choice}\" doesn't exist")
    else:
        print("program stopped!")



# Tables simulées
vehicules_title = {"id" : int(), "marque" : str(), "modele" : str(), "annee" : int(), "disponible" : bool()}
vehicules = [
    {"id": 1, "marque": "Renault", "modele": "Clio", "annee": 2020, "disponible": True},
    {"id": 2, "marque": "Peugeot", "modele": "208", "annee": 2019, "disponible": True}
]

clients_title = {"id" : int(), "nom" : str(), "prenom" : str(), "email" : str()}
clients = [
    {"id" : 1, "nom" : "Renault", "prenom" : "Louis", "email" : "R.Louis@mail.com"},
    {"id" : 2, "nom" : "Peugeot", "prenom" : "Armand", "email" : "P.Armand@mail.com"}
]

locations_title = {"id" : int(), "id_client" : int(), "id_vehicule" : int(), "date_debut" : str(), "date_fin" : str()}
locations = [
    {"id" : 1, "id_client" : 1, "id_vehicule" : 1, "date_debut" : "25/12/21", "date_fin" : "01/01/22"},
    {"id" : 2, "id_client" : 2, "id_vehicule" : 2, "date_debut" : "05/03/19", "date_fin" : "28/04/20"}
]

table_choice()
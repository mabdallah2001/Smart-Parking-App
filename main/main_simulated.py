from datetime import datetime, timedelta
import pytz
import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("firebaseCreds.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

def facialDetection():
    # Let's prompt the user to select or input a scenario
    print("Select a scenario for facialDetection:")
    print("1: John Doe")
    print("2: David Boland")
    print("3: Undetected person")
    choice_name = input("Enter your choice (1/2/3): ")

    if choice_name == '1':
        name = "john-doe"
    elif choice_name == '2':
        name = "david-boland"
    else:
        name = "undetected-person"

    print("Select a scenario for camera location:")
    print("1: Entrance")
    print("2: Conference")
    print("3: Office A")
    print("4: Office B")
    print("5: Office C")
    choice_camera = input("Enter your choice (1/2/3/4/5): ")

    if choice_camera == '1':
        camera = "Entrance"
    elif choice_camera == '2':
        camera = "Conference"
    elif choice_camera == '3':
        camera = "Office A"
    elif choice_camera == '4':
        camera = "Office B"
    elif choice_camera == '5':
        camera = "Office C"
    else:
        camera = "Unknown Location"
    
    return (name, camera)

    # returns the name of the person detected. Otherwise returns 'undetected-person'
def objectDetection():
    # Let's prompt the user to select a scenario
    print("Select a scenario for objectDetection:")
    
    print("1: Female, Blue shirt, Black pants, Black hair, No jacket, With glasses")
    print("2: Male, White shirt, Blue jeans, Blonde hair, Leather jacket, No glasses")
    print("3: Female, Red shirt, Brown pants, Brown hair, No jacket, With sunglasses")
    print("4: Male, Black shirt, Black pants, Black hair, No jacket, No glasses")
    print("5: Female, Yellow shirt, Green pants, Red hair, No jacket, No glasses")

    choice = input("Enter your choice (1/2/3/4/5): ")

    if choice == '1':
        return {
            "gender": "female",
            "shirt": "blue",
            "pants": "black",
            "hair": "black",
            "jacket": "no",
            "glasses": "yes"
        }
    elif choice == '2':
        return {
            "gender": "male",
            "shirt": "white",
            "pants": "blue jeans",
            "hair": "blonde",
            "jacket": "leather",
            "glasses": "no"
        }
    elif choice == '3':
        return {
            "gender": "female",
            "shirt": "red",
            "pants": "brown",
            "hair": "brown",
            "jacket": "no",
            "glasses": "sunglasses"
        }
    elif choice == '4':
        return {
            "gender": "male",
            "shirt": "black",
            "pants": "black",
            "hair": "black",
            "jacket": "no",
            "glasses": "no"
        }
    elif choice == '5':
        return {
            "gender": "female",
            "shirt": "yellow",
            "pants": "green",
            "hair": "red",
            "jacket": "no",
            "glasses": "no"
        }
    else:
        print("Invalid choice. Defaulting to scenario 1.")
        return {
            "gender": "female",
            "shirt": "blue",
            "pants": "black",
            "hair": "black",
            "jacket": "no",
            "glasses": "yes"
        }


    # returns a map of meta data including: hair color, shirt color, pants color, glasses.


def getEmployeeID(fname, lname):
    # Query the 'FireEvac' collection based on fname and lname
    docs = db.collection('Employees').where("FirstName", "==", fname).where("LastName", "==", lname).get()

    # If the document exists, retrieve the EmployeeID
    for doc in docs:
        if doc.exists:
            return doc.to_dict().get("EmployeeID", None)
    return None

def getEmployeeIDfromFireEvac(fname, lname):
    # Query the 'FireEvac' collection based on fname and lname
    docs = db.collection('FireEvac').where("Name", "==", fname + ' ' + lname).get()

    # If the document exists, retrieve the EmployeeID
    for doc in docs:
        if doc.exists:
            return doc.to_dict().get("EmployeeID", None)
    return None

def main():
    name, camera = facialDetection()
    metaData = objectDetection()


    # If name is not recognized, assign him/her as a Guest and record his/her meta data
    if (name == "undetected-person"):
        docs = db.collection('FireEvac').where("Gender" ,"==" ,metaData['gender']).where("Shirt" ,"==" ,metaData['shirt']).where("Pants", "==", metaData['pants']).where("Hair" ,"==" ,metaData['hair']).where("Jacket", "==", metaData['jacket']).where("Glasses", "==", metaData['glasses']).get()
        if camera == "Entrance":
            guestID = None
            guestCounter = db.collection('Guests').document('oYxN4xzMS2AWbDMpKcYT').get().to_dict()['Counter']
            guestCounter+=1
            db.collection('Guests').document('oYxN4xzMS2AWbDMpKcYT').update({"Counter": guestCounter})
            for doc in docs:
                guestID = doc.to_dict()["EmployeeID"]
                guestKey = doc.id
            if guestID is not None:
                db.collection('FireEvac').document(guestKey).delete()
            else:
                timeEntered = datetime.now()
                db.collection('FireEvac').add({'TimeEntered': timeEntered,'EmployeeID': 'Guest #' + str(guestCounter), 'Gender': metaData['gender'],'Shirt': metaData['shirt'], 'Pants':metaData['pants'], 'Hair': metaData['hair'], 'Jacket': metaData['jacket'], 'Glasses': metaData['glasses']})
        else:
            for doc in docs:
                doc_id = doc.id
                update_data = {
                    'Location': camera,
                }
                db.collection('FireEvac').document(doc_id).update(update_data)


    else:
        fullname = name.split("-")
        fname = fullname[0].capitalize()
        lname = fullname[1].capitalize()

        employeeID = getEmployeeID(fname, lname)
        employeeID_checker = getEmployeeIDfromFireEvac(fname,lname)  # Get EmployeeID from fireEvac if it exists. if not returns None


        # When employee enters/exits the office, add or remove from fire-evac respectively
        if employeeID_checker is None and camera == "Entrance":
            timeEntered = datetime.now()
     
            
            docs = db.collection('Employees').where("EmployeeID", "==", employeeID).get()
            for doc in docs:
                dept = doc.to_dict()["Department"]
            #if detected name is an employee, i.e. exists in the employee table:
            if employeeID is not None:
                db.collection('Attendance').add({'EmployeeID': employeeID,'Name': fname + ' ' + lname, 'Entered': timeEntered, 'Exited':''})
                db.collection('FireEvac').add({'EmployeeID': employeeID,'Name': fname + ' ' + lname, 'Department': dept, 'Location':camera, 'Date': timeEntered, 'Gender': metaData['gender'],'Shirt': metaData['shirt'], 'Pants':metaData['pants'], 'Hair': metaData['hair'], 'Jacket': metaData['jacket'], 'Glasses': metaData['glasses']})
            #if detected name is NOT an employee:
            else:
                guestCounter = db.collection('Guests').document('oYxN4xzMS2AWbDMpKcYT').get().to_dict()['Counter']
                guestCounter+=1
                db.collection('Guests').document('oYxN4xzMS2AWbDMpKcYT').update({"Counter": guestCounter})
                db.collection('FireEvac').add({'EmployeeID': 'Guest #' + str(guestCounter)  ,'Name': fname + ' ' + lname, 'Department': '', 'Location':'', 'Date': timeEntered, 'Gender': metaData['gender'],'Shirt': metaData['shirt'], 'Pants':metaData['pants'], 'Hair': metaData['hair'], 'Jacket': metaData['jacket'], 'Glasses': metaData['glasses']})


        elif employeeID_checker and camera == "Entrance":
            # If user is exiting the building, first retrieve the time they entered.
            docs = db.collection('Attendance').where("Name", "==", fname + ' ' + lname).where("Exited", "==", "").get()
            for doc in docs:
                timeEntered = doc.to_dict()["Entered"]
                key = doc.id
            utc=pytz.UTC
            if( datetime.now().replace(tzinfo=utc) > (timeEntered + timedelta(seconds=20)).replace(tzinfo=utc)):
                timeExited = datetime.now()
                db.collection('Attendance').document(key).update({"Exited":timeExited})
            
                docs = db.collection('FireEvac').where("Name", "==", fname + ' ' + lname).get()
                for doc in docs:
                    key = doc.id
                db.collection('FireEvac').document(key).delete()

        elif employeeID_checker and camera != "Entrance":  # if the person detected is already registered as an employee
            docs = db.collection('FireEvac').where("EmployeeID", "==", employeeID).get()
            for doc in docs:
                doc_id = doc.id
                update_data = {
                    'Location': camera,
                    'Gender': metaData['gender'],
                    'Shirt': metaData['shirt'],
                    'Pants': metaData['pants'],
                    'Hair': metaData['hair'],
                    'Jacket': metaData['jacket'],
                    'Glasses': metaData['glasses']
                }
                db.collection('FireEvac').document(doc_id).update(update_data)
        
        else:
            docs = db.collection('Employees').where("EmployeeID", "==", employeeID).get()
            for doc in docs:
                dept = doc.to_dict()["Department"]
            docs = db.collection('FireEvac').where("Gender" ,"==" ,metaData['gender']).where("Shirt" ,"==" ,metaData['shirt']).where("Pants", "==", metaData['pants']).where("Hair" ,"==" ,metaData['hair']).where("Jacket", "==", metaData['jacket']).where("Glasses", "==", metaData['glasses']).get()
            for doc in docs:
                doc_id = doc.id
                update_data = {
                    'EmployeeID': employeeID,
                    'Name': fname + ' ' + lname,
                    'Department': dept,
                    'Location': camera,
                    'Gender': metaData['gender'],
                    'Shirt': metaData['shirt'],
                    'Pants': metaData['pants'],
                    'Hair': metaData['hair'],
                    'Jacket': metaData['jacket'],
                    'Glasses': metaData['glasses']
                }
                db.collection('FireEvac').document(doc_id).update(update_data)


while(True):
    main()
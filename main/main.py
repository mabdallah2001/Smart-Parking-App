from datetime import datetime, timedelta
import pytz
import time
import warnings
import firebase_admin
from firebase_admin import credentials, firestore
warnings.filterwarnings('ignore', category=UserWarning)


cred = credentials.Certificate("firebaseCreds.json")
firebase_admin.initialize_app(cred)
db = firestore.client()


input_file = open("input_data.txt", "r")

def facialDetection():
    name = input_file.readline().strip()
    camera = input_file.readline().strip()
    return (name, camera)

    # returns the name of the person detected. Otherwise returns 'undetected-person'
def objectDetection():
    line = input_file.readline().strip()
    attributes = [x.strip() for x in line.split(",")]

    return{
        "gender": attributes[0],
        "shirt": attributes[1].split()[0],
        "pants": attributes[2].split()[0],
        "hair": attributes[3].split()[0],
        "jacket": attributes[4].split()[0],
        "glasses": attributes[5].split()[0]
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
                db.collection('FireEvac').add({'Date': timeEntered,'EmployeeID': 'Guest #' + str(guestCounter), 'Gender': metaData['gender'],'Shirt': metaData['shirt'], 'Pants':metaData['pants'], 'Hair': metaData['hair'], 'Jacket': metaData['jacket'], 'Glasses': metaData['glasses']})
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
            docs = db.collection('FireEvac').where("Name", "==", fname + ' ' + lname).where("Exited", "==", "").get()

            if len(docs) == 0:
                docs = db.collection('FireEvac').where("EmployeeID", "==", employeeID).get()
                for doc in docs:
                    timeEntered = doc.to_dict()["Date"]
                db.collection('Attendance').add({'EmployeeID': employeeID,'Name': fname + ' ' + lname, 'Entered': timeEntered, 'Exited':""})
               
            # docs = db.collection('FireEvac').where("Name", "==", fname + ' ' + lname).where("Exited", "==", "").get()
            # for doc in docs:
            #     timeEntered = doc.to_dict()["Entered"]
            #     key = doc.id
            # utc=pytz.UTC
            # if( datetime.now().replace(tzinfo=utc) > (timeEntered + timedelta(seconds=20)).replace(tzinfo=utc)):
            #     timeExited = datetime.now()
            #     db.collection('Attendance').document(key).update({"Exited":timeExited})
            
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


while True:
    # Read and print the Scenario description
    scenario_description = input_file.readline().strip()
    if not scenario_description:  # If this line is empty, end of file is reached
        break
    print(scenario_description)
    time.sleep(1)  # Pause for 1 second

    # Read and print the name and camera location
    name = input_file.readline().strip()
    print(name)
    time.sleep(1)
    camera_location = input_file.readline().strip()
    print(camera_location)
    time.sleep(1)

    main()
    enter = input()

input_file.close()
     

# We assume that all meta data values are read consistently and are constant.

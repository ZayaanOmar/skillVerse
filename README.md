Follow the steps below to clone the project, install dependencies, and run the application locally.

---

### Clone the Repository

Go to the folder you want to clone the repository into. Open a terminal in this folder an enter the following command:
```bash
git clone https://github.com/SkillVerser/freelancer-management-platform.git
```
Alternatively, use GitHub Desktop.

Once this is done, open this file location in a terminal. You should see something like 
```bash
some-file-path\freelancer-manager-platform>
```
### Install Dependencies
Next, run the following:
```bash
cd backend
npm install
```
Once that is done, use ```cd ..``` to go back to the root folder, then:
```bash
cd frontend
npm install
```
You have now installed the necessary dependencies.
### Add .env file
From the root directory, use ```code .``` to open the project in VS Code. In the left pane, you should see the project structure, with subfolders `backend` and `frontend`.
In the `backend` directory, create a new file and call it `.env`. This will hold environment variables (See Discord).
You are now ready to run the app locally.
### Running the App
Open a terminal in VS Code. You should be in the root directory bu default. To start the backend server, run
```bash
cd backend
node server.js
```
Open another separate terminal. Again, you should be in the root directory. Run
```bash
cd frontend
npm start
```
After a few seconds, it should take you to the webpage on your browser. To stop both servers, go to each terminal and use Ctrl+C.
Make sure that you restart the backend server after any changes if you want to see them on the web page.

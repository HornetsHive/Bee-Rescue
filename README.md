# Bee Rescue
> Developed by team Hornet's Hive

**Description**:  Bee Rescue has two components, a mobile application and a website. The website is for the general public to be able to quickly report swarms of bees on their property by submiting a short form. The application is for beekeepers to be notified about swarms that are nearby so that they can collect them. The combined application is designed to expedite the process of property owners finding beekeepers to remove hives from their property. Redundant phone calls and wasted time are minimized, as only beekeepers who have specified they they are available at that time and area are notified. The app is being developed for the Sacramento Area Beekeepers Association (SABA).

 **Technology stack**: Standalone application and website
  - **Frontend**: Javascript/HTML/CSS, Visual Studio (IDE), React Native and React Native add ons (SDK)
  - **Backend**: MySQL - relational, NodeJS
  - **API**: Google Maps static map *(not yet implemented)*
  - **Server**: Testing: Local/Linode, Official product: AWS *(not finalized)*
  - **Status**: Working Beta [CHANGELOG](CHANGELOG.md).
  - **Links to production or demo instances**

**Website Screenshot**:

![image](https://user-images.githubusercontent.com/31836580/205386331-446fddb4-d866-4358-a9fb-48b4f22cc698.png)

**Application Screenshots**:

![image](https://user-images.githubusercontent.com/31836580/205385750-7063e857-e5bf-4e67-b474-95151b6d7152.png)
![image](https://user-images.githubusercontent.com/31836580/205385767-ce102a7d-4f81-4c70-b570-aeb9243a4f8f.png)
![image](https://user-images.githubusercontent.com/31836580/205385806-daa9205c-80ef-4b13-81da-8c148dcf8b07.png)
![image](https://user-images.githubusercontent.com/31836580/205385823-c9fdae69-e687-4812-a54d-eb5dd0a07792.png)
![image](https://user-images.githubusercontent.com/31836580/205385853-c20da159-c14b-4e3c-9ec1-22cf0f42f5c9.png)
![image](https://user-images.githubusercontent.com/31836580/205385884-2baf3d41-4c18-4427-a699-b50b5ec59f98.png)

## Dependencies

*Describe any dependencies that must be installed for this software to work.
**React** - https://github.com/facebook/react
   -Javascript framework for developing web applications
**Evergreen UI** - https://evergreen.segment.com/
   -React Native components and UI framework
**Axios** - https://github.com/axios/axios
   -Easy API calls with NodeJS backend
**Exp** - https://www.npmjs.com/package/expo/v/42.0.0-alpha.1
   -adds functionality for contacts, camera, and location

**MySQL** - https://www.mysql.com/
   -SQL database implementation

**NodeJS**- https://nodejs.org/en/
   -Asynchronous event-driven JavaScript runtime, Node.js is designed to build scalable network applications
-**body-parser** https://www.npmjs.com/package/body-parser
   -Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
-**cors** - https://www.npmjs.com/package/cors
   -CORS is a node.js package for providing a Connect/Express middleware
-**express** - https://www.npmjs.com/package/express
   -provide small, robust tooling for HTTP servers, making it a great solution for single page applications, websites, hybrids, or public HTTP APIs.
-**install** - https://www.npmjs.com/package/install
   -JS module installer and loader
-**nodemon** - https://www.npmjs.com/package/nodemon
   -tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.

## Installation

1. install nodejs libraries https://nodejs.org/en/download/
   - download for your OS and install

2. install chocolately windows package manager (if you're on windows) https://chocolatey.org/install
   - open powershell as admin 
   - then run `Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))` (this step may take a minute or two)
   - open command prompt and confirm installation with `choco --version`

3. install nodejs
   - open command prompt as admin and type `choco install nodejs`

4. restart VSCode
5. navigate to or create an empty folder in your file explorer
6. open that folder in VSCode
7. in the VSCode terminal, run `npx create-react-app new_app` (this may take a few minutes)
   - *new_app* is the name of your react app
   - this will install a bunch of packages and dependencies.
8. You can delete the folder when you're done
   - (for the next steps continue to use the VScode terminal, instalation may take a few minutes)
9. `npm install express`
10. `npm install body-parser`
11. `npm install mysql`
12. `npm install axios`
13. `npm install cors`
14. `npm install react`
15. `npm install nodemon`
16. `npm install evergreen-ui`

17. install mySQL workbench https://dev.mysql.com/downloads/file/?id=514051
    - when the webpage opens, click "no thanks, just start my download"
18. install mysql
    - open command prompt as admin and run `choco install mysql`
    - select yes to all by typing `A` (this will take a while) 

## Configuration
--There is currently no configuration settings

## Usage
--start webpage
1. navigate terminal to `client_webpage`
2. run `npm run start`

--start server
1. navigate terminal to `server`
2. run `npm run devStart`

--start mobile app
1. navigate terminal to `app`
2. run 

## How to test the software
WIP, To be updated

## Known issues
WIP, To be updated

## Deplyment
WIP, To be updated

## Developer Instructions
WIP, To be updated

## Timeline
September 2022 - December 2022
-Make contact with client and finalize desired project
-Finish planning, outlines, wireframes, ERD diagrams, etc.
-Create functional UI for public webpage and beekeeper mobile app
-Finalize alpha version by coupling all components and having a beekeeper
   able to respond to a request then confirm the completion

February 2023 - May 2023
-Finalze UI design and implementation
-Implement detailed email updates for reporters and beekeepers
-Google maps (or other map API) integration with live updates of report locations
-misc. bugfixing
-Final release

## Getting help
If there is a bug report please file at https://github.com/HornetsHive/Bee_Project/issues

To get in contact with the developers please send an email to mrsmith@csus.edu


----

## Credits and references
**Hornet's Hive Team**
> Matthew Smith, Jarod Cavagnaro, Steven Maggs, John Wishek, Kiana Bruberg, Dane Leineke, Lawrence Matias, Sean Hackett



# Bee Rescue
> Developed by team Hornet's Hive

**Description**:  Bee Rescue has two components, a mobile application and a website. The website is for the general public to be able to quickly report swarms of bees on their property by submiting a short form. The application is for beekeepers to be notified about swarms that are nearby so that they can collect them. The combined application is designed to expedite the process of property owners finding beekeepers to remove hives from their property. Redundant phone calls and wasted time are minimized, as only beekeepers who have specified they they are available at that time and area are notified. The app is being developed for the Sacramento Area Beekeepers Association (SABA).

 **Technology stack**: Standalone application and website
  - **Frontend**: Javascript/HTML/CSS, Visual Studio (IDE), React Native and React Native add ons (SDK)
  - **Backend**: MySQL - relational, NodeJS
  - **API**: Google Maps static map
  - **Server**: Testing: Local/Linode, Official product: AWS *(not finalized)*
  - **Status**: Working Beta

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
**Dependencies**:
To check package dependencies, type `npm list` in the `app`, `client_webpage`, or `server` directories.

## Installation

1. install nodejs libraries https://nodejs.org/en/download/
   - download for your OS and install

2. install mySQL workbench https://dev.mysql.com/downloads/workbench/

3. Configure your SQL server
   - to create the required server schema, copy and paste `SQLsetup.txt` into mySQL workbench and run. The current schema name is "brdb"
   - To run locally, input host (localhost), user, password, and database name in `BEE_PROJECT/server/index.js`

3. install android studio https://developer.android.com/studio
   - default settings
   
4. Configure an android VM
   - more actions > virtual device manager > choose a device and android version

5. clone the repo
   - `git clone https://github.com/HornetsHive/Bee_Project.git`

6. Install dependencies
   - in the terminal navigate to `BEE_PROJECT` folder
   - run the following commands
   `cd app`  
   `npm install`  
   `cd ..`  
   `cd client_webpage`  
   `npm install`  
   `cd ..`  
   `cd server`  
   `npm install`  

## Configuration
   - There are currently no configuration settings

## Usage
start webpage  
   1. navigate terminal to `client_webpage`
   2. run `npm run start`

start server  
   1. navigate terminal to `server`
   2. run `npm run devStart`

start mobile app  
   1. start your Android VM through android studio
   2. navigate terminal to `app`
   3. run `expo start`. Your android VM should be detected automatically. 

## How to test the software
WIP, To be updated

## Known issues
WIP, To be updated

## Deployment
WIP, To be updated

## Developer Instructions
WIP, To be updated

## Timeline
September 2022 - December 2022
 1. Make contact with client and finalize desired project
 2. Finish planning, outlines, wireframes, ERD diagrams, etc.
 3. Create functional UI for public webpage and beekeeper mobile app
 4. Finalize alpha version by coupling all components and having a beekeeper able to respond to a request then confirm the completion

February 2023 - May 2023
 1. Finalze UI design and implementation
 2. Implement detailed email updates for reporters and beekeepers
 3. Google maps (or other map API) integration with live updates of report locations
 4. misc. bugfixing
 5. Final release

## Getting help
If there is a bug report please file at https://github.com/HornetsHive/Bee_Project/issues

To get in contact with the developers please send an email to mrsmith@csus.edu
----

## Credits and references
**Hornet's Hive Team**
> Matthew Smith, Jarod Cavagnaro, Steven Maggs, John Wishek, Kiana Bruberg, Dane Leineke, Lawrence Matias, Sean Hackett

<p align="center"> <img width="150" src="https://user-images.githubusercontent.com/31836580/236601725-e9c02dcd-b5d5-45cd-866a-bc7cdd8a082c.png" alt="beeRescueLogo"></p>

# Bee Rescue
> Developed by team Hornet's Hive

**Description**:  Bee Rescue has two components, a mobile application and a website. The website is for the general public to be able to quickly report swarms of bees on their property by submiting a short form. The application is for beekeepers to be notified about swarms that are nearby so that they can collect them. The combined application is designed to expedite the process of property owners finding beekeepers to remove hives from their property. Redundant phone calls and wasted time are minimized, as only beekeepers who have specified they they are available at that time and area are notified. The app is being developed for the Sacramento Area Beekeepers Association (SABA).

 **Technology stack**: Standalone application and website
  - **Frontend**: Javascript/HTML/CSS, Visual Studio (IDE), React Native and React Native add ons (SDK)
  - **Backend**: MySQL - relational, NodeJS
  - **API**: Google Maps interactive map
  - **Server**: Testing: Local/Linode, Official product: AWS *(not finalized)*
  - **Status**: Almost deployed

**Website Screenshot**:

![Screenshot 2023-05-05 220622](https://user-images.githubusercontent.com/31836580/236601123-2efa34a4-d842-4efd-bbb3-1975b36aab6e.png)
<p align="center"> <img width="300" src="https://user-images.githubusercontent.com/31836580/236603391-92786eb5-f58d-47af-bc1b-d7652b5a5c9e.png">
<img width="300" src="https://user-images.githubusercontent.com/31836580/236603393-6e88e7b4-9678-4fbc-9cf3-82ff5cbd50d3.png"></p>

**Application Screenshots**: </br>
<p align="center">
  <img width="300" src="https://user-images.githubusercontent.com/31836580/236602930-261be2f2-4d41-4cc7-9e0b-8158baed9f51.png">
<img width="300" src="https://user-images.githubusercontent.com/31836580/236602945-fe6c8103-a660-40ab-b72e-b5baee1db3bd.png">
<img width="300" src="https://user-images.githubusercontent.com/31836580/236602923-1fc04ae2-9585-49b3-b669-56df92b25bce.png">
<img width="300" src="https://user-images.githubusercontent.com/31836580/236602924-1e1474c2-f522-4b6f-a9ba-a2e73ae02e6e.png">
<img width="300" src="https://user-images.githubusercontent.com/31836580/236602925-65532255-e64d-4404-960d-7e7f9e0a28fc.png">
  </p>

## Dependencies
**Dependencies**:
To check package dependencies, type `npm list` in the `app`, `client_webpage`, or `server` directories.

## Installation
> *once app is launched, download it from app the google paay store or apple store*

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
> Testing manual: [System-Test-Report_Hornets_Hive.pdf](https://github.com/HornetsHive/Bee_Project/files/11411411/System-Test-Report_Hornets_Hive.pdf)

## Known Issues
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
 3. Google maps integration with live updates of report locations
 4. misc. bugfixing
 5. Final release on app store

## Getting help
If there is a bug report please file at https://github.com/HornetsHive/Bee_Project/issues

## Credits and references
**Hornet's Hive Team**
> Matthew Smith: mrsmith@csus.edu </br>
> Dane Leineke: dleineke@csus.edu </br>
> Kiana Brunberg: brunbergkiana@gmail.com </br>
> Jarod Cavagnaro: jcavagnaro@csus.edu </br>
> John Wishek: johnwishek@csus.edu </br>
> Steven Maggs: stevenmaggs@csus.edu </br>
> Sean Hackett: shackett@csus.edu </br>
> Lawrence Matias: lmatias@csus.edu </br>

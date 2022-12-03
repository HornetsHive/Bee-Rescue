# Bee Rescue
> Developed by team Hornet's Hive

**Description**:  Bee Rescue has two components, a mobile application and a website. The website is for people to be able to quickly report swarms of bees on their property by submiting a short form. The application is for beekeepers to be notified about swarms that are nearby so that they can collect them. This is to aid the current process the beekeepers of Sacramento have for collecting swarms by minimizing the amount of phone calls back and forth as well as ensuring that only available and nearby beekeepers are contacted.

> Bee Rescue aims to help beekeepers whithin and outside of Sacramento efficiently collect swarms of bees so those affected by bee swarms can trust their report will be taken care of quickly.


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
This includes programming languages, databases or other storage mechanisms, build tools, frameworks, and so forth.
If specific versions of other software are required, or known not to work, call that out.*

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
12. `npm i axios`
13. `npm install cors`
14. `npm install react`

15. install mySQL workbench https://dev.mysql.com/downloads/file/?id=514051 <br>
    - when the webpage opens, click "no thanks, just start my download"
16. install mysql
    - open command prompt as admin and run `choco install mysql`
    - select yes to all by typing `A` (this will take a while) 

## Configuration

*If the software is configurable, describe it in detail, either here or in other documentation to which you link.*

## Usage

*Show users how to use the software.
Be specific.
Use appropriate formatting when showing code snippets.*

## How to test the software

*If the software includes automated tests, detail how to run those tests.*

## Known issues

*Document any known significant shortcomings with the software.*

## Deplyment

...

## Developer Instructions

...

## Timeline

*Use your JIRA to create a timeline section with key milestones for your project
(When coming up with the timeline this is the timeline for what you expect to get done in 191 based on the user stories you created in the backlog for all the key features with estimates.)*

## Getting help

*Instruct users how to get help with this software; this might include links to an issue tracker, wiki, mailing list, etc.
If you have questions, concerns, bug reports, etc, please file an issue in this repository's Issue Tracker.*

----

## Credits and references

**Hornet's Hive Team**
> Matthew Smith, Jarod Cavagnaro, Steven Maggs, John Wishek, Kiana Bruberg, Dane Leineke, Lawrence Matias, Sean Hackett



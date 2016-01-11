This application is based on Hackathon starter:
https://github.com/sahat/hackathon-starter

This project provides skeleton application in Express.js, it uses the following:
- Sequelize as DB ORM
- MsSQL as the database
- SQlite as the database
- It runs in Nodewebkit mode (Desktop)
- It runs in Web mode (standard)
- It uses the same code base


**Startup:**
Application has two startup files.
App.js. This file contains routes that are protected with the passport. Please add the routes as required. To start the applicaiton in Webmode, please change the config/secrets.js file entry. 
Appnw.js. This file contains routes that are used for startup with Nodewebkit


**Nodewebkit details:**
nw.js v0.12.3
io.js v1.2.0
Chromium 41.0.2272.76

If you use sqlite, then the applicaiton is started clicking on the nw.exe which is included in this commit (dont forget to change the config/secrets.js entry, mssql/sqlite).

Since the NW.js uses precompiled sqlite3 files, regular sqlite verison can't be used. You can compile it, or can used already precompiled version (included in this commit) in node_modules.

Nodewebkit version is not using some feature as the webverison, namely passport and lusca/csrf protection. There is already implemented basic security check for the startup that requires a file in the root of the application (lic.bin). In that file, please include a MAC of you computer so the applicaiton can start

**Database:**
Node_modules has two folders. Nodesqlite3, this is regular sqlite verison that will run on web version (if you ever need it). sqlite3 is precompiled version that runs fine when the applicaiton is run as NW.js version.

In the folder models, you can simply include your model (look at the examples), and the applicaiton will do the rest. Models are agnostic regarding the database they use. For more details please look at the sequelize ORM.

You can easily change your database by modifying the models/index.js file. If you change the database, please do not forgte to install the module for it.

**Encryption:**
Project uses very simple encryption for the values that are stored in the database. You can check the controllers/material.js for more details. In essence everything that is written to the database is encrypted, at least for this controller.

**Package files:**
Currently there are two package files. One is intended as a normal installatin package for the web version, and another one is intended as a Nodewebkit startup file. Nodewebkit requires a package.json file to be present for the startup, and that package.json is very different then the normal one I have left as package.json. 
If you want to run the application in web mode, please use projectpackage.json

**Multicore support for the Application:**
For more details, please see: https://keymetrics.io/2015/03/26/pm2-clustering-made-easy/

**TODO:**
- Better organize the configuration files, right now there are thing that are not used
- Imrove the encryption to use another value (maybe MAC address) instead of the hard coded value.
- Maybe there are some dependencies missing in the project.json file.

-- 
Live long and prosper

# Expense-Tracker 💰💰
This is an application made with the ionic framework, whose objective is to help control our expenses and improve the individual economy of each person. 
The application will try to be in a near future a multiplatform application, that works in android, ios and in web version.

## Run it 🚀
Just go to the web https://expense-tracker-39c01.web.app/ and that it's! 

This is just a beta version in a web form, in order to check how the application will work on mobile phones. The development process for android or ios has not started, 
although it is true that the transfer from web version to android or ios should not be very complicated thanks to the ionic framework. __At the moment the application is only available in Spanish, although it can be translated easily since most browsers give the automatic option to do so.__ Support for more languages is a pending task in the app and part of the code is also written in Spanish, so please contact the creator if you have any questions.

__Warning:__ *The app is not responsive design yet, so desktop users will have an ugly view of the app. For a better view go to the config of your browser and select the developer options
(in Chrome pressing Ctrl+Shift+I) and select your favourite device.*

## Where the data is stored? 🔗
At the moment the data is stored in the creator's personal firebase account, Enriqueloz88. This information is not subject to any type of encryption so storing compromising data is not recommended yet. 
If appropriate, the transfer to another database will be studied.

__Warning:__ *Please bear in mind that the free version of the database only supports 50,000 readings per day, so make responsible use of the application until it is optimized for its actual release on the market.*

## For developers💻
You will have to install ionic in version 5. To check how to install just refer to https://ionicframework.com/docs/intro/cli. You will also have to add the firebase library for the database storage, the chartjs library to see correctly the graphs, and maybe some other minor dependecies of the app. In order to do that just type in your console:

> npm install

Make sure that you are in the correct directory when you do that. To compile your project just type *ionic serve* in your console in the root directory. If you have any problems running the app, try installing manually some dependencies:

> npm install chart.js --save

> npm install firebase @angular/fire --save

## Next updates🔜
The priority now is to make a user system, preferably stored in firebase (since the rest of the database is also stored there). Later and after improvements in visual and performance aspects, an apk could be developed. Please, refer to the projects section (https://github.com/enriqueloz88/Expense-Tracker/projects) if you want to check what to do or how to colaborate and make something cool. Any error in the code or suggestion can be written in the issues section as well (https://github.com/enriqueloz88/Expense-Tracker/issues). This is an open project and everyone is free to collaborate.

## Need help ❓
Feel free to contact the developer if you have any questions or suggestions about the project or how you can help with it. It is a very simple project made with Ionic, 
therefore it is very useful if you want to start in the world of application programming.

# Screenshots

__Init Page:__


<img src="/screenshots/sc1.jpg" alt="Vue Expenses Stats" width="50%" height="50%" />


__Categories evolution:__


<img src="/screenshots/sc2.jpg" alt="Vue Expenses Stats" width="50%" height="50%" />


__Transactions List:__


<img src="/screenshots/sc3.jpg" alt="Vue Expenses Stats" width="50%" height="50%" />


__Monthly category balance:__


<img src="/screenshots/sc4.jpg" alt="Vue Expenses Stats" width="50%" height="50%" />


__Income/Expense graph:__


<img src="/screenshots/sc5.jpg" alt="Vue Expenses Stats" width="50%" height="50%" />


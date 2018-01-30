# liri-node-app

LIRI is a Language Interpretation and Recognition Interface. This command-line node app takes in parameters and gives back data such as recent tweets, song info, and movie info.


## Getting Started

First clone this repository:

```
https://github.com/emmapankey/liri-node-app
```


## Prerequisites

#### Node.js and npm
Go to the Node.js site: https://nodejs.org/en. Click the download button, and run through the installation file.
When you install node.js, npm is automatically installed.
To check if you have Node.js installed, run this command in your terminal:
```
node -v
```
To confirm that you have npm installed you can run this command in your terminal:
```
npm -v
```


## Installing Node Packages


In the terminal execute the following command to install all node dependencies (see package.json for list):

```
npm install
```


## Run

In the terminal type one of the following commands:

```
node liri.js show-tweets '<twitter username here>'
```
Username can be any existing twitter name. If no username is entered the default value is my username.

```
node liri.js spotify-this-song '<song name here>'
```
If no song name is entered the default value is "The Sign" by Ace of Base.

```
node liri.js movie-this '<movie title here>'
```
If no movie title is entered the default value is "Mr. Nobody".

```
node liri.js do-what-it-says
```
This will execute a command contained within random.txt file.


## Author

**Emma Pankey** (https://github.com/emmapankey)


## Technologies Used

* Javascript
* Node.js


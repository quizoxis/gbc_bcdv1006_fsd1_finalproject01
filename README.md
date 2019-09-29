Readme.md

# FULL STACK DEVELOPER – 1 – FINAL PROJECT

# Student Information

| Syntax | Description |
| ----------- | ----------- |
| Student ID | 101260567 |
| Student Name | Mohammad Jamshed Qureshi |
| Program Name | Blockchain Development T175 Fall 2019 |
| Course | Full Stack Development I - BCDV 1006 - 100 | 

---
# Application Description
A single interactive web page application that provides a way to fetch Ethereum balance for an Eth Address.

# Dependencies
This application depends on following external libraries/frameworks.
* Bootstrap 4.3.1
* Jquery 3.3.1
* Popper 1.14.7

# Requirements
Following requirements must be met before running this demo app.
* Browser: Chrome with Metamask extension and account.
* Internet connection 

# Application Components
| Component | Description |
| ----------- | ----------- |
| readme.md  | Readme file (this) in markdown format |
| index.html | Main application page |
| image | directory contains images used in this project |
| css | directory contains website styling information |
| lib/app.js | Main application code lives here |
| data/about.json | Data directory contains data files. about.json provides data for About page. |

---
# Usage

## Application Startup
* Upon startup applications displays a bootstrap modal with a welcome message.
* Once welcome screen is passed, the applications performs two api calls to EtherScan in order to fetch *Total Supply of Ether* and *Ethereum Lastest Prices* against Bitcoin and U.S. Dollars.

---
## Navigation

### Fetch Ethererum Balance
* Clicking on this navbar shows a form, once Ether Address is provided and submitted, balance about is fetched using web3 api.
* Address balance is displayed in the main home window.

### About
* Clicking on *About* opens a modal screen, fetching data via a json/get call.
* Once data is fetched it is displayed in the window area as a html list.

### References
* Provides a drop down list of some of the references used for this project.

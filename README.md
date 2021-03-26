This is an Ethereum decentralized Electronical Medical Record (EMR) web application developed with Angular JS (TypeScript, CSS, HTML), Truffle framework for DApp, Ganache used as personal Ethereum Test Chain. Smart Contract created using Solidity. 

Comprised of 3 main entities, namely, Governing body, Doctors, and Patients. 
Blockchain integration in Health Care Records can enhance healthcare data security as each individual has a public identifier or key and a private key, which can be unlocked only as and for the period necessary. Healthcare data stored on the blockchain could allow individual patients to easily unlock and share their health data with other providers or organizations, through a shareable private key. Patients have the privilege of personal health record data management.

This app allows patients to selectively grant and revoke access to doctors who are registered by a governing body. Only authorized doctors granted permission are able to add medical records to patients address.


Steps for setup : 


npm install -g truffle
npm install -g @angular/cli
npm install -g ganache-cli OR Ganache GUI

npm install dotenv && npm install truffle-hdwallet-provider


Run this command in different terminal ` ganache-cli` OR If you installed Ganache GUI, open Ganache GUI

Navigate to Blockchain folder.
Run this command   `truffle compile`
Run this command   `truffle migrate`


Navigate to frontend folder.
Run this command  `npm install`
 Run this command  `ng serve `


Open in browser :  http://localhost:4200

Install metamask in browser.

Setup metamask to run application in browser.




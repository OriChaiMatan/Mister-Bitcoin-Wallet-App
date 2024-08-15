# MisterBitcoin

## Project Overview
Mister-BITCoin is a digital wallet application built with Angular that allows users to manage their Bitcoin balance and send (fake) transactions to contacts. This frontend-only app simulates a wallet where the user’s balance is reduced when they transfer Bitcoin to contacts, although no real funds are involved.

The project demonstrates concepts such as Angular services, routing, components, CRUDL operations, and data fetching from external APIs to render charts.

![image](https://github.com/user-attachments/assets/2ff5d15e-6bb3-4f34-9c1d-bb0ad52a971a)


## Features
- Home Page: Displays the user’s name, balance, and the current Bitcoin rate.
- Contacts Page: Lists all contacts and allows users to filter contacts by name or phone.
- Contact Details Page: Displays detailed information about a contact, allows Bitcoin transfers to that contact, and shows a history of transactions with the contact.
- User Authentication: Simple signup page that stores the user’s information locally.
- CRUDL Operations: Full Create, Read, Update, Delete, and List functionality for managing contacts.
## Services
- ContactService: Manages contact data including fetching, adding, and updating contacts.
- UserService: Manages user data and handles functions like signup and adding transactions.
- BitcoinService: Fetches Bitcoin-related data from external APIs (e.g., market price, transaction volume).
## Technologies Used
- Angular
- TypeScript
- RxJS
- Angular Routing
- Change Detection
- Lifecycle Hooks
- Reactive Forms
- API Integration (Blockchain.info)
- Angular Google Charts
 ## Installation
1. Clone the repository:
   ```bash
   https://github.com/OriChaiMatan/Mister-Bitcoin-Wallet-App.git

2. Install dependencies:
   ```bash
   npm install

3. Start the application:
   ```bash
   ng serve
  ## Contributor
- [Ori Chai Matan](https://github.com/OriChaiMatan)
## Feel free to contact us for any questions ! 💻

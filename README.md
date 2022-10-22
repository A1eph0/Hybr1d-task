# Hybr1d Backend Task
## Task: Build a REST API for an e-commerce marketplace

# Overview
The task was to built backend APIs for an e-commerce portal. There are two types of users (namely **buyers** and **sellers**). 

For instructions running the portal, click [here](#Running-the-Project).

# APIs implemented
The following APIs were implemented in this project:

## Authorisation:
* `POST /api/auth/registeration`: Allows the addition of new users in the database

* `POST /api/auth/login`: Generates JWT token for the session and thus allows existing users to access other relevant APIs

## Buyer Use-case:
* `GET /api/buyer/list-of-sellers`: Gives the buyer the list of all sellers registered on the portal
* `GET /api/buyer/seller-catalog/:seller_id`: The buyer can access the catalog for a specified seller
* `POST /api/buyer/create-order/:seller_id`: Creates an order for seller with the specified id

## Seller Use-case:
* `POST /api/seller/create-catalog`:
Creates the catalog for the seller. If the catalog already exists, it is updated

* `GET /api/seller/orders`: Gives the seller the list of orders recieved

# Miscellaneous information on Authentication
The portal uses security measures including password hashing using `bcryptJS` and token-based authentication middleware, powered by `JWT` (JSON Web Token).

Access to the APIs is restricted as per user type. Only buyers can use the buyer use-case APIs and only sellers can use the seller use-case APIs. Authorisation APIs are publically accessible.

# Running the Project
To run the backend, first clone the repository. Then within the parent directory, run the following commands in order:

```
$ npm install
$ npm start
```

Alternatively, you can run the following:
```
$ npm install
$ npm run server
```

And then Enjoy!!

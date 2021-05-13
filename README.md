# Cryptography-Project

## Usage
~~~
git clone https://github.com/hhhaaahhhaa/Cryptography-Project.git
cd Cryptography-Project
~~~
### Client
~~~
cd client
yarn install
yarn start
~~~
### Server
~~~
cd server
touch .env  # add MONGO_URL in .env
yarn install
yarn start
~~~
### Graphql playground
browser open http://localhost:4000/graphql
#### add user
ex:
~~~
mutation {
  createUser(uid: "0") 
}
~~~
#### add key
ex:
~~~
mutation {
  createKey(keys: ["d"], uid: "0")
}
~~~
#### add data
ex:
~~~
mutation {
  createData(uid: "0", data: "Hello World!")
}
~~~

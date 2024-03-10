# User API Spec

## Register User

Endpoint : POST /api/users

Request Body :

```json
{
    "username" : "Fadel",
    "password" : "secret",
    "name" : "Arrasyid Fadel Fatonsyah"
}
```

Response Body (Success) :

```json
{
    "data" : {
        "username" : "Fadel",
        "name" : "Arrasyid Fadel Fatonsyah"
    }
}
```

Response Body (Failed) :

```json
{
    "errors" : "Username must not blank, ..."
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
    "username" : "Fadel",
    "password" : "secret",
}
```

Response Body (Success) :

```json
{
    "data" : {
        "username" : "Fadel",
        "name" : "Arrasyid Fadel Fatonsyah",
        "token" : "uuid" // -->> random token
    }
}
```

Response Body (Failed) :

```json
{
    "errors" : "Username or password wrong ..."
}
```

## Get User

Endpoint : GET /api/users/current

Request Header :
- X-API-TOKEN : token

Response Body (Success) :

```json
{
    "data" : {
        "username" : "Fadel",
        "name" : "Arrasyid Fadel Fatonsyah",
    }
}
```

Response Body (Failed) :

```json
{
    "errors" : "Unauthorize"
}
```

## Update User

Endpoint : PATCH /api/users/current

Request Header :
- X-API-TOKEN : token

Request Body :

```json
{
    "name" : "Arrasyid Fadel Fatonsyah", // optional
    "password" : "secret123" // optional
}
```

Response Body (Success) :

```json
{
    "data" : {
        "username" : "Fadel",
        "name" : "Arrasyid Fadel Fatonsyah"
    }
}
```

Response Body (Failed) :

```json
{
    "errors" : "Unauthorize"
}
```

## Logout User

Endpoint : DELETE /api/users/current

Request Header :
- X-API-TOKEN : token

Response Body (Success) :

```json
{
    "data" : "OK"
}
```

Response Body (Failed) :

```json
{
    "errors" : "Unauthorize"
}
```
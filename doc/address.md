# Address API Spec

## Create Address

Endpoint : POST /api/contacts/:contactId/addresses

Request Header :
- X-API-TOKEN : token

Request Body : 

```json
{
    "street" : "whats street",
    "city" : "whats city",
    "province": "what province",
    "country": "what country",
    "postal_code": "12312"
}
```

Response Body (Success) : 

```json
{
    "data" : {
        "id" : 1,
        "street" : "whats street",
        "city" : "whats city",
        "province": "what province",
        "country": "what country",
        "postal_code": "12312"
    }
}
```

Response Body (Failed) : 

```json
{
    "errors" : "postal_code is required"
}
```

## Get Address

Endpoint : GET /api/contacts/:contactId/addresses/:addressId

Request Header :
- X-API-TOKEN : token

Request Body : 

```json
{
    "street" : "whats street",
    "city" : "whats city",
    "province": "what province",
    "country": "what country",
    "postal_code": "12312"
}
```

Response Body (Success) : 

```json
{
    "data" : {
        "id" : 1,
        "street" : "whats street",
        "city" : "whats city",
        "province": "what province",
        "country": "what country",
        "postal_code": "12312"
    }
}
```

Response Body (Failed) : 

```json
{
    "errors" : "Address is not found",
}
```

## Update Address

Endpoint : PUT /api/contacts/:contactId/addresses/:addressId

Request Header :
- X-API-TOKEN : token

Request Body : 

```json
{
    "street" : "whats street",
    "city" : "whats city",
    "province": "what province",
    "country": "what country",
    "postal_code": "12312"
}
```

Response Body (Success) : 

```json
{
    "data" : {
        "id" : 1,
        "street" : "whats street",
        "city" : "whats city",
        "province": "what province",
        "country": "what country",
        "postal_code": "12312"
    }
}
```

Response Body (Failed) : 

```json
{
    "errors" : "postal_code is required"
}
```

## Remove Address

Endpoint : DELETE /api/contacts/:contactId/addresses/:addressId

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
    "errors" : "Address is not found"
}
```

## List Address

Endpoint : GET /api/contacts/:contactId/addresses

Request Header :
- X-API-TOKEN : token

Response Body (Success) : 

```json
{
    "data" : [
        {
            "id" : 1,
            "street" : "whats street",
            "city" : "whats city",
            "province": "what province",
            "country": "what country",
            "postal_code": "12312"
        }
    ]
}
```

Response Body (Failed) : 

```json
{
    "errors" : "Contact is not found"
}
```
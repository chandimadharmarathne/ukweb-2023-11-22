# Chats

## get chats `[GET]/chat`
#### request `headers: Authorization`
    {

    }
#### response 
    {
        "success": true,
        "chats": [
            {
                "chat_id": 2,
                "user_id": 3,
                "user_name": "User 3",
                "lastupdate": "2022-03-13T16:29:19.000Z"
            },
            {
                "chat_id": 3,
                "user_id": 4,
                "user_name": "User 4",
                "lastupdate": "2022-03-14T13:25:00.000Z"
            },
            {
                "chat_id": 1,
                "user_id": 1,
                "user_name": "User 1",
                "lastupdate": "2022-03-14T13:29:00.000Z"
            }
        ]
    }

## get chat id `[POST]/chat`
#### request `headers: Authorization`
    This creates chat if doesn't exist
    {
        "reciever":4
    }
#### response 
    {
        "success": true,
        "chat_id": 19
    }

## delete chat `[DELETE]/chat`
#### request `headers: Authorization`
    {
        "chat":1
    }
#### response
    {
        "success": true,
        "chats": [
            {
                "chat_id": 2,
                "user_id": 3,
                "user_name": "User 3",
                "lastupdate": "2022-03-13T16:29:19.000Z"
            },
            {
                "chat_id": 3,
                "user_id": 4,
                "user_name": "User 4",
                "lastupdate": "2022-03-14T13:25:00.000Z"
            }
        ]
    }


    
## get messages `[GET]/chat-message`
#### request `headers: Authorization`
    {
        "user_id":1
    }
#### response
    {
        "success": true,
        "chats": [
            {
                "sender": 2,
                "msg": "This is a message",
                "timestamp": "2022-03-15T15:58:15.000Z"
            },
            {
                "sender": 2,
                "msg": "This is a message",
                "timestamp": "2022-03-15T15:58:13.000Z"
            }
        ]
    }

## send message `[POST]/chat-message`
#### request `headers: Authorization`
    {
        "chat":1,
        "msg":"This is a message"
    }
#### response
    {
        "success": true,
        "chats": [
            {
                "chat_id": 2,
                "user_id": 3,
                "user_name": "User 3",
                "lastupdate": "2022-03-13T16:29:19.000Z"
            },
            {
                "chat_id": 3,
                "user_id": 4,
                "user_name": "User 4",
                "lastupdate": "2022-03-14T13:25:00.000Z"
            },
            {
                "chat_id": 1,
                "user_id": 1,
                "user_name": "User 1",
                "lastupdate": "2022-03-14T13:29:00.000Z"
            }
        ]
    }

## delete message `[DELETE]/chat-message` 
#### request `headers: Authorization`
    {
        "chat":1,
        "timestamp":"2022-03-13T16:29:19.000Z"
    }
#### response
    {
        "success": true,
        "chats": [
            {
                "chat_id": 2,
                "user_id": 3,
                "user_name": "User 3",
                "lastupdate": "2022-03-13T16:29:19.000Z"
            },
            {
                "chat_id": 3,
                "user_id": 4,
                "user_name": "User 4",
                "lastupdate": "2022-03-14T13:25:00.000Z"
            },
            {
                "chat_id": 1,
                "user_id": 1,
                "user_name": "User 1",
                "lastupdate": "2022-03-14T13:29:00.000Z"
            }
        ]
    }


## new chat list `[SOCKET]: new-messages` 
    [
        {
            "chat_id": 1,
            "user_id": 2,
            "user_name": "Dulranga Dhawanitha",
            "lastupdate": "2022-03-14T13:29:00.000Z"
        }
    ]
## new messages for current chat `[SOCKET]: new-messages-chat`     
    {
        "chat_id": 1,
        "data": [
            {
                "sender": 2,
                "msg": "This is a message",
                "timestamp": "2022-03-14T16:52:47.000Z"
            },
            {
                "sender": 2,
                "msg": "This is a message",
                "timestamp": "2022-03-14T23:22:02.000Z"
            }
        ]
    }


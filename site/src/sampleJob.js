export function getSampleJob() {
    return {
        "id": "63ff5724a3f5e3c7f65fed4d", "name": "Welcome assign role", "chain": {
            "store": {},
            "chainLinks": [{
                "name": "MessageCreate",
                "type": "EVENT",
                "description": "Fired when a user sends a message.",
                "store": {},
                "acceptParams": [],
                "exposesArguments": ["userId", "username", "messageContent"],
                "params": []
            }, {
                "name": "SendMessage",
                "type": "TASK",
                "description": "Sends a message to the given channel.",
                "store": {},
                "acceptParams": [{"name": "channelId", "type": "CHANNEL_ID"}, {"name": "message", "type": "STRING"}],
                "exposesArguments": [],
                "params": [{
                    "name": "channelId",
                    "type": "CHANNEL_ID",
                    "value": "1079541272739590225"
                }, {
                    "name": "message",
                    "type": "STRING",
                    "value": "asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf"
                }]
            }, {
                "name": "Equals",
                "type": "CONDITION",
                "description": "Checks if op1 = op2",
                "store": {},
                "acceptParams": [{"name": "op1", "type": "STRING"}, {"name": "op2", "type": "STRING"}],
                "exposesArguments": [],
                "params": [{"name": "op1", "type": "STRING", "value": "{{messageContent}}"}, {
                    "name": "op2",
                    "type": "STRING",
                    "value": "Hello!"
                }]
            }, {
                "name": "AssignRole",
                "type": "TASK",
                "description": "Assigns the given role to the user.",
                "store": {},
                "acceptParams": [{"name": "userId", "type": "STRING"}, {"name": "roleId", "type": "ROLE_ID"}],
                "exposesArguments": [],
                "params": [{"name": "userId", "type": "STRING", "value": "{{userId}}"}, {
                    "name": "roleId",
                    "type": "ROLE_ID",
                    "value": "1080193005803274351"
                }]
            }]
        }, "guild": null, "store": {}
    }
}

export function getSampleJob2() {
    return {
        "id": "63ff5724a3f5e3c7f65fed4d", "name": "Ban user on message", "chain": {
            "store": {},
            "chainLinks": [{
                "name": "MessageCreate",
                "type": "EVENT",
                "description": "Fired when a user sends a message.",
                "store": {},
                "acceptParams": [],
                "exposesArguments": ["userId", "username", "messageContent"],
                "params": []
            }, {
                "name": "SendMessage",
                "type": "TASK",
                "description": "Sends a message to the given channel.",
                "store": {},
                "acceptParams": [{"name": "channelId", "type": "CHANNEL_ID"}, {"name": "message", "type": "STRING"}],
                "exposesArguments": [],
                "params": [{
                    "name": "channelId",
                    "type": "CHANNEL_ID",
                    "value": "1079541272739590225"
                }, {
                    "name": "message",
                    "type": "STRING",
                    "value": "asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf"
                }]
            }, {
                "name": "Equals",
                "type": "CONDITION",
                "description": "Checks if op1 = op2",
                "store": {},
                "acceptParams": [{"name": "op1", "type": "STRING"}, {"name": "op2", "type": "STRING"}],
                "exposesArguments": [],
                "params": [{"name": "op1", "type": "STRING", "value": "{{messageContent}}"}, {
                    "name": "op2",
                    "type": "STRING",
                    "value": "Hello!"
                }]
            }, {
                "name": "AssignRole",
                "type": "TASK",
                "description": "Assigns the given role to the user.",
                "store": {},
                "acceptParams": [{"name": "userId", "type": "STRING"}, {"name": "roleId", "type": "ROLE_ID"}],
                "exposesArguments": [],
                "params": [{"name": "userId", "type": "STRING", "value": "{{userId}}"}, {
                    "name": "roleId",
                    "type": "ROLE_ID",
                    "value": "1080193005803274351"
                }]
            }]
        }, "guild": null, "store": {}
    }
}
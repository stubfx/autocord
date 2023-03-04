export namespace ChainLinkTypes {

    export enum Event {
        MessageCreate = "MessageCreate",
        MessageReactionAdd = "MessageReactionAdd",
        ChannelCreate = "ChannelCreate",
        VoiceStateUpdate = "VoiceStateUpdate",
        GuildMemberAdd = "GuildMemberAdd",
    }

    export enum LinkType {
        EVENT = "EVENT",
        CONDITION = "CONDITION",
        TASK = "TASK",

    }

    export enum Task {
        SendMessage = "SendMessage",
        IncreaseStorageCounter = "IncreaseStorageCounter",
        AssignRole = 'AssignRole',
        AddMessageReaction = 'AddMessageReaction',
        CreateChannel = 'CreateChannel',
        DeleteChannel = 'DeleteChannel',
        SetStorageValue = 'SetStorageValue',
        UpdateChannel = 'UpdateChannel',

    }

    export enum Condition {
        Equals = "Equals",
        MatchesRegex = "MatchesRegex",
    }

    export enum Param {
        STRING = 'STRING',
        CHANNEL_ID = 'CHANNEL_ID',
        ROLE_ID = 'ROLE_ID',
        CHANNEL_TYPE = 'CHANNEL_TYPE',
        CATEGORY_ID = 'CATEGORY_ID',
        REGEX = 'REGEX',
    }

}
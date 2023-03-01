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
        BanUser = "BanUser",
        IncreaseCounter = "IncreaseCounter",
        AssignRole = 'AssignRole',
        AddMessageReaction = 'AddMessageReaction',

    }

    export enum Condition {
        IsMe = "IsMe",
        Equals = "Equals",
        MatchesRegex = "MatchesRegex",
    }

    export enum Param {
        STRING = 'STRING',
        CHANNEL_ID = 'CHANNEL_ID',
        ROLE_ID = 'ROLE_ID',
    }

}
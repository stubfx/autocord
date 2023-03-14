export namespace ChainLinkTypes {

    export namespace IDs {
        export enum Event {
            MessageCreate = "MessageCreate",
            MessageReactionAdd = "MessageReactionAdd",
            ChannelCreate = "ChannelCreate",
            VoiceStateUpdate = "VoiceStateUpdate",
            GuildMemberAdd = "GuildMemberAdd",
            EveryHour = 'EveryHour',
            EveryDay = 'EveryDay',
            Randomly = 'Randomly',
            COMMAND = 'COMMAND',
        }

        export enum UNKNOWN {
            UNKNOWN = 'UNKNOWN'
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
            RandomListElement = 'RandomListElement',
            MoveUserInChannel = 'MoveUserInChannel',
            DeleteMessage = 'DeleteMessage',

        }

        export enum SuperTask {
            CreateChannelAndMoveUser = 'CreateChannelAndMoveUser',
            DeleteChannelOnUserLeave = 'DeleteChannelOnUserLeave',
            TemporaryVoiceChannels = 'TemporaryVoiceChannels',

        }

        export enum Condition {
            Equals = "Equals",
            MatchesRegex = "MatchesRegex",
            Random = 'Random',
            Contains = 'Contains',
        }
    }

    export enum LinkType {
        EVENT = "EVENT",
        CONDITION = "CONDITION",
        TASK = "TASK",
        SUPERTASK = "SUPERTASK",
        UNKNOWN = 'UNKNOWN'
    }

    export enum Param {
        STRING = 'STRING',
        CHANNEL_ID = 'CHANNEL_ID',
        ROLE_ID = 'ROLE_ID',
        CHANNEL_TYPE = 'CHANNEL_TYPE',
        CATEGORY_ID = 'CATEGORY_ID',
        REGEX = 'REGEX',
        NUMBER = 'NUMBER',
        LIST = 'LIST',
    }

}
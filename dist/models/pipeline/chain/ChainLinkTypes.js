export var ChainLinkTypes;
(function (ChainLinkTypes) {
    let IDs;
    (function (IDs) {
        let Event;
        (function (Event) {
            Event["MessageCreate"] = "MessageCreate";
            Event["MessageReactionAdd"] = "MessageReactionAdd";
            Event["ChannelCreate"] = "ChannelCreate";
            Event["VoiceStateUpdate"] = "VoiceStateUpdate";
            Event["GuildMemberAdd"] = "GuildMemberAdd";
            Event["EveryHour"] = "EveryHour";
            Event["EveryDay"] = "EveryDay";
            Event["Randomly"] = "Randomly";
            Event["COMMAND"] = "COMMAND";
        })(Event = IDs.Event || (IDs.Event = {}));
        let UNKNOWN;
        (function (UNKNOWN) {
            UNKNOWN["UNKNOWN"] = "UNKNOWN";
        })(UNKNOWN = IDs.UNKNOWN || (IDs.UNKNOWN = {}));
        let Task;
        (function (Task) {
            Task["SendMessage"] = "SendMessage";
            Task["IncreaseStorageCounter"] = "IncreaseStorageCounter";
            Task["AssignRole"] = "AssignRole";
            Task["AddMessageReaction"] = "AddMessageReaction";
            Task["CreateChannel"] = "CreateChannel";
            Task["DeleteChannel"] = "DeleteChannel";
            Task["SetStorageValue"] = "SetStorageValue";
            Task["UpdateChannel"] = "UpdateChannel";
            Task["RandomListElement"] = "RandomListElement";
            Task["MoveUserInChannel"] = "MoveUserInChannel";
            Task["DeleteMessage"] = "DeleteMessage";
            Task["RandomRoleIdByName"] = "RandomRoleIdByName";
            Task["RemoveRolesFromUserByName"] = "RemoveRolesFromUserByName";
        })(Task = IDs.Task || (IDs.Task = {}));
        let SuperTask;
        (function (SuperTask) {
            SuperTask["CreateChannelAndMoveUser"] = "CreateChannelAndMoveUser";
            SuperTask["DeleteChannelOnUserLeave"] = "DeleteChannelOnUserLeave";
            SuperTask["TemporaryVoiceChannels"] = "TemporaryVoiceChannels";
        })(SuperTask = IDs.SuperTask || (IDs.SuperTask = {}));
        let Condition;
        (function (Condition) {
            Condition["Equals"] = "Equals";
            Condition["MatchesRegex"] = "MatchesRegex";
            Condition["Random"] = "Random";
            Condition["Contains"] = "Contains";
        })(Condition = IDs.Condition || (IDs.Condition = {}));
    })(IDs = ChainLinkTypes.IDs || (ChainLinkTypes.IDs = {}));
    let LinkType;
    (function (LinkType) {
        LinkType["EVENT"] = "EVENT";
        LinkType["CONDITION"] = "CONDITION";
        LinkType["TASK"] = "TASK";
        LinkType["SUPERTASK"] = "SUPERTASK";
        LinkType["UNKNOWN"] = "UNKNOWN";
    })(LinkType = ChainLinkTypes.LinkType || (ChainLinkTypes.LinkType = {}));
    let Param;
    (function (Param) {
        Param["STRING"] = "STRING";
        Param["CHANNEL_ID"] = "CHANNEL_ID";
        Param["ROLE_ID"] = "ROLE_ID";
        Param["CHANNEL_TYPE"] = "CHANNEL_TYPE";
        Param["CATEGORY_ID"] = "CATEGORY_ID";
        Param["REGEX"] = "REGEX";
        Param["NUMBER"] = "NUMBER";
        Param["LIST"] = "LIST";
    })(Param = ChainLinkTypes.Param || (ChainLinkTypes.Param = {}));
})(ChainLinkTypes || (ChainLinkTypes = {}));
//# sourceMappingURL=ChainLinkTypes.js.map
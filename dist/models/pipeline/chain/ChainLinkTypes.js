export var ChainLinkTypes;
(function (ChainLinkTypes) {
    let Event;
    (function (Event) {
        Event["MessageCreate"] = "MessageCreate";
        Event["MessageReactionAdd"] = "MessageReactionAdd";
        Event["ChannelCreate"] = "ChannelCreate";
        Event["VoiceStateUpdate"] = "VoiceStateUpdate";
        Event["GuildMemberAdd"] = "GuildMemberAdd";
    })(Event = ChainLinkTypes.Event || (ChainLinkTypes.Event = {}));
    let LinkType;
    (function (LinkType) {
        LinkType["EVENT"] = "EVENT";
        LinkType["CONDITION"] = "CONDITION";
        LinkType["TASK"] = "TASK";
    })(LinkType = ChainLinkTypes.LinkType || (ChainLinkTypes.LinkType = {}));
    let Task;
    (function (Task) {
        Task["SendMessage"] = "SendMessage";
        Task["IncreaseCounter"] = "IncreaseCounter";
        Task["AssignRole"] = "AssignRole";
        Task["AddMessageReaction"] = "AddMessageReaction";
        Task["CreateChannel"] = "CreateChannel";
        Task["DeleteChannel"] = "DeleteChannel";
    })(Task = ChainLinkTypes.Task || (ChainLinkTypes.Task = {}));
    let Condition;
    (function (Condition) {
        Condition["Equals"] = "Equals";
        Condition["MatchesRegex"] = "MatchesRegex";
    })(Condition = ChainLinkTypes.Condition || (ChainLinkTypes.Condition = {}));
    let Param;
    (function (Param) {
        Param["STRING"] = "STRING";
        Param["CHANNEL_ID"] = "CHANNEL_ID";
        Param["ROLE_ID"] = "ROLE_ID";
        Param["CHANNEL_TYPE"] = "CHANNEL_TYPE";
        Param["CATEGORY_ID"] = "CATEGORY_ID";
    })(Param = ChainLinkTypes.Param || (ChainLinkTypes.Param = {}));
})(ChainLinkTypes || (ChainLinkTypes = {}));
//# sourceMappingURL=ChainLinkTypes.js.map
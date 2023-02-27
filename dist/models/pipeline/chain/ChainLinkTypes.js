export var ChainLinkTypes;
(function (ChainLinkTypes) {
    let ChainLinkParamType;
    (function (ChainLinkParamType) {
        ChainLinkParamType["STRING"] = "STRING";
        ChainLinkParamType["BOOLEAN"] = "BOOLEAN";
        ChainLinkParamType["NUMBER"] = "NUMBER";
    })(ChainLinkParamType = ChainLinkTypes.ChainLinkParamType || (ChainLinkTypes.ChainLinkParamType = {}));
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
        Task["BanUser"] = "BanUser";
    })(Task = ChainLinkTypes.Task || (ChainLinkTypes.Task = {}));
    let Condition;
    (function (Condition) {
        Condition["IsMe"] = "IsMe";
        Condition["Equals"] = "Equals";
        Condition["MatchesRegex"] = "MatchesRegex";
    })(Condition = ChainLinkTypes.Condition || (ChainLinkTypes.Condition = {}));
})(ChainLinkTypes || (ChainLinkTypes = {}));
//# sourceMappingURL=ChainLinkTypes.js.map